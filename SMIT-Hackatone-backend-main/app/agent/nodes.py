import json
from urllib.parse import urlparse

from langchain_groq import ChatGroq
from tavily import TavilyClient

from app.agent.profile_utils import normalize_cv_profile
from app.agent.prompts import CV_EXTRACTION_PROMPT, JOB_EVALUATION_PROMPT, SEARCH_QUERY_PROMPT
from app.agent.state import AgentState
from app.config import settings
from app.cv_processor.chunker import chunk_text
from app.cv_processor.embedder import create_vector_store


def _extract_json_block(raw_text: str) -> str:
    cleaned = raw_text.strip()
    if cleaned.startswith("```"):
        lines = cleaned.splitlines()
        lines = [line for line in lines if not line.strip().startswith("```")]
        cleaned = "\n".join(lines).strip()
    return cleaned


def _get_groq_llm() -> ChatGroq:
    return ChatGroq(api_key=settings.groq_api_key, model=settings.model_name, temperature=0)


def _domain_from_url(url: str) -> str:
    return (urlparse(url).netloc or "").lower().replace("www.", "")


def _platform_name_from_domain(domain: str) -> str:
    domain_map = {
        "linkedin.com": "LinkedIn",
        "glassdoor.com": "Glassdoor",
        "indeed.com": "Indeed",
        "rozee.pk": "Rozee",
        "mustakbil.com": "Mustakbil",
        "bayt.com": "Bayt",
        "naukri.com": "Naukri",
    }
    for key, value in domain_map.items():
        if key in domain:
            return value
    if not domain:
        return "Unknown"
    return domain.split(".")[0].capitalize()


def _company_from_url(url: str) -> str:
    return _platform_name_from_domain(_domain_from_url(url))


async def ingest_node(state: AgentState) -> AgentState:
    try:
        cv_text = state.get("cv_text", "").strip()
        if not cv_text:
            return {"error": "ingest_node: CV text is empty."}

        if len(cv_text) < 200:
            print(f"Warning: CV text is short ({len(cv_text)} chars). Proceeding with limited context.")

        chunks = chunk_text(cv_text)
        if not chunks:
            chunks = [cv_text]

        vector_store = create_vector_store(chunks)

        llm = _get_groq_llm()
        prompt = CV_EXTRACTION_PROMPT.format(cv_text=cv_text)
        response = await llm.ainvoke(prompt)
        cv_profile = normalize_cv_profile(json.loads(_extract_json_block(response.content)))

        return {"cv_chunks": chunks, "vector_store": vector_store, "cv_profile": cv_profile}
    except json.JSONDecodeError as exc:
        return {"error": f"ingest_node: Failed to parse CV profile JSON: {exc}"}
    except Exception as exc:
        return {"error": f"ingest_node: {exc}"}


async def plan_node(state: AgentState) -> AgentState:
    try:
        cv_profile = state.get("cv_profile")
        if not cv_profile:
            return {"error": "plan_node: Missing cv_profile in state."}

        llm = _get_groq_llm()
        prompt = SEARCH_QUERY_PROMPT.format(cv_profile_json=json.dumps(cv_profile, ensure_ascii=True))
        response = await llm.ainvoke(prompt)
        search_queries = json.loads(_extract_json_block(response.content))

        if not isinstance(search_queries, list) or not all(isinstance(q, str) for q in search_queries):
            return {"error": "plan_node: LLM returned invalid search query format."}

        return {"search_queries": search_queries}
    except json.JSONDecodeError as exc:
        return {"error": f"plan_node: Failed to parse search query JSON: {exc}"}
    except Exception as exc:
        return {"error": f"plan_node: {exc}"}


async def search_node(state: AgentState) -> AgentState:
    try:
        search_queries = state.get("search_queries", [])
        if not search_queries:
            return {"error": "search_node: No search queries were generated."}

        client = TavilyClient(api_key=settings.tavily_api_key)
        unique_unfiltered: dict[str, dict] = {}
        unique_filtered: dict[str, dict] = {}
        blocked_terms = {
            "udemy.com",
            "coursera.org",
            "youtube.com",
            "realpython.com",
            "medium.com",
            "github.com",
            "stackoverflow.com",
            "tutorial",
            "course",
            "blog",
            "learn",
        }
        preferred_domains = {
            "linkedin.com",
            "indeed.com",
            "glassdoor.com",
            "rozee.pk",
            "mustakbil.com",
            "bayt.com",
            "naukri.com",
        }

        for query in search_queries:
            response = client.search(query=query, search_depth="advanced", max_results=3)
            for item in response.get("results", []):
                url = item.get("url")
                if not url:
                    continue
                job_item = {
                    "title": item.get("title", ""),
                    "url": url,
                    "content": item.get("content", ""),
                    "score": item.get("score", 0),
                }
                if url not in unique_unfiltered:
                    unique_unfiltered[url] = job_item

                url_lower = url.lower()
                if any(term in url_lower for term in blocked_terms):
                    continue

                domain = _domain_from_url(url)
                is_preferred = any(platform in domain for platform in preferred_domains)
                has_jobs_hint = ("jobs" in url_lower) or ("career" in url_lower)
                if not (is_preferred or has_jobs_hint):
                    continue

                if url not in unique_filtered:
                    unique_filtered[url] = job_item

        filtered_results = list(unique_filtered.values())
        unfiltered_results = list(unique_unfiltered.values())
        if len(filtered_results) < 3:
            return {"raw_job_results": unfiltered_results}
        return {"raw_job_results": filtered_results}
    except Exception as exc:
        return {"error": f"search_node: {exc}"}


async def evaluate_node(state: AgentState) -> AgentState:
    try:
        jobs = state.get("raw_job_results", [])
        cv_profile = state.get("cv_profile", {})
        if not jobs:
            return {"evaluated_jobs": []}

        llm = _get_groq_llm()
        evaluated_jobs: list[dict] = []

        for job in jobs:
            prompt = JOB_EVALUATION_PROMPT.format(
                cv_profile_json=json.dumps(cv_profile, ensure_ascii=True),
                job_title=job.get("title", ""),
                job_url=job.get("url", ""),
                job_description=job.get("content", ""),
            )
            response = await llm.ainvoke(prompt)
            evaluation = json.loads(_extract_json_block(response.content))

            raw_score = evaluation.get("match_score", 0)
            try:
                match_score = max(0, min(100, int(raw_score)))
            except (TypeError, ValueError):
                match_score = 0

            skills = evaluation.get("key_matching_skills", [])
            if not isinstance(skills, list):
                skills = [str(skills)] if skills else []

            evaluated_jobs.append(
                {
                    "job_title": job.get("title", "") or "Job listing",
                    "company": evaluation.get("company_name") or _company_from_url(job.get("url", "")),
                    "location": "Unknown",
                    "url": job.get("url", ""),
                    "match_score": match_score,
                    "reasoning": str(evaluation.get("reasoning", "") or ""),
                    "key_matching_skills": [str(s) for s in skills if str(s).strip()],
                }
            )

        return {"evaluated_jobs": evaluated_jobs}
    except json.JSONDecodeError as exc:
        return {"error": f"evaluate_node: Failed to parse evaluation JSON: {exc}"}
    except Exception as exc:
        return {"error": f"evaluate_node: {exc}"}


async def rank_node(state: AgentState) -> AgentState:
    try:
        evaluated_jobs = state.get("evaluated_jobs", [])
        filtered = [job for job in evaluated_jobs if int(job.get("match_score", 0)) >= 30]
        ranked = sorted(filtered, key=lambda job: int(job.get("match_score", 0)), reverse=True)
        return {"final_jobs": ranked[: settings.max_search_results]}
    except Exception as exc:
        return {"error": f"rank_node: {exc}"}
