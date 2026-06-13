from typing import TypedDict


class AgentState(TypedDict, total=False):
    cv_text: str
    cv_chunks: list[str]
    vector_store: object
    cv_profile: dict
    search_queries: list[str]
    raw_job_results: list[dict]
    evaluated_jobs: list[dict]
    final_jobs: list[dict]
    error: str
