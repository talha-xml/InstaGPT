from fastapi import FastAPI
from pydantic import BaseModel

from app.graph import graph

app = FastAPI(
    title="InstaGPT AI Service",
    description="AI Agent service for InstaGPT",
    version="1.0.0",
)


# Request Model
class MessageRequest(BaseModel):
    message: str


# Home
@app.get("/")
def home():
    return {"message": "InstaGPT AI Service is running!", "status": "success"}


# Health Check
@app.get("/health")
def health():
    return {"service": "AI Service", "status": "healthy"}


# Test LangGraph
@app.post("/agent/test")
def test_agent(request: MessageRequest):

    result = graph.invoke(
        {"message": request.message, "processed_message": "", "response": ""}
    )

    return {
        "input": request.message,
        "response": result["response"],
        "status": "success",
    }
