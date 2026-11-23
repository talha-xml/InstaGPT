from fastapi import FastAPI

app = FastAPI(
    title="InstaGPT AI Service",
    description="AI Agent service for InstaGPT",
    version="1.0.0",
)


@app.get("/")
def home():
    return {"message": "InstaGPT AI Service is running!", "status": "success"}


@app.get("/health")
def health():
    return {"service": "AI Service", "status": "healthy"}
