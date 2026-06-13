import asyncio

from app.agent.graph import build_graph
from app.agent.nodes import rank_node
from app.agent.profile_utils import normalize_cv_profile


def test_graph_compiles():
    graph = build_graph()
    assert graph is not None


def test_rank_node_filters_low_scores_and_sorts_desc():
    state = {
        "evaluated_jobs": [
            {"match_score": 20, "job_title": "low"},
            {"match_score": 80, "job_title": "high"},
            {"match_score": 45, "job_title": "mid"},
        ]
    }
    result = asyncio.run(rank_node(state))
    scores = [job["match_score"] for job in result["final_jobs"]]
    assert scores == [80, 45]


def test_normalize_cv_profile_handles_partial_llm_output():
    profile = normalize_cv_profile({"skills": "Python", "years_experience": "4"})
    assert profile["skills"] == ["Python"]
    assert profile["years_experience"] == 4
    assert profile["job_titles"] == []
