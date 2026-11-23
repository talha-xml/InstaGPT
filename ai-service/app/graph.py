from typing import TypedDict
from langgraph.graph import StateGraph, START, END
from langchain_ollama import ChatOllama

# Connect to our local Qwen model
llm = ChatOllama(model="qwen2.5:0.5b", temperature=0.7)


class AgentState(TypedDict):
    message: str
    processed_message: str
    response: str


def receive_message(state: AgentState):
    print("Receiving message...")
    return {}


def process_message(state: AgentState):
    print("Processing message...")

    return {"processed_message": state["message"].strip()}


def generate_response(state: AgentState):
    print("Generating AI response...")

    result = llm.invoke(state["processed_message"])

    return {"response": result.content}


# Build the LangGraph workflow
builder = StateGraph(AgentState)

builder.add_node("receive_message", receive_message)
builder.add_node("process_message", process_message)
builder.add_node("generate_response", generate_response)

builder.add_edge(START, "receive_message")
builder.add_edge("receive_message", "process_message")
builder.add_edge("process_message", "generate_response")
builder.add_edge("generate_response", END)

graph = builder.compile()
