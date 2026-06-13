from langgraph.graph import END, START, StateGraph

from app.agent.nodes import (
    evaluate_node,
    ingest_node,
    plan_node,
    rank_node,
    search_node,
)
from app.agent.state import AgentState


def _route_on_error(state: AgentState) -> str:
    return END if state.get("error") else "continue"


def build_graph():
    workflow = StateGraph(AgentState)
    workflow.add_node("ingest", ingest_node)
    workflow.add_node("plan", plan_node)
    workflow.add_node("search", search_node)
    workflow.add_node("evaluate", evaluate_node)
    workflow.add_node("rank", rank_node)

    workflow.add_edge(START, "ingest")
    workflow.add_conditional_edges("ingest", _route_on_error, {"continue": "plan", END: END})
    workflow.add_conditional_edges("plan", _route_on_error, {"continue": "search", END: END})
    workflow.add_conditional_edges("search", _route_on_error, {"continue": "evaluate", END: END})
    workflow.add_conditional_edges("evaluate", _route_on_error, {"continue": "rank", END: END})
    workflow.add_edge("rank", END)
    return workflow.compile()


job_scout_graph = build_graph()
