# InstaGPT – Instagram AI Agent

An AI-powered Instagram management agent designed to analyze content, assist with publishing, organize follower information, generate personalized messages, and manage supported Instagram activities.

## Tech Stack

| Component                      | Technology                         |
| ------------------------------ | ---------------------------------- |
| Mobile App                     | React Native + Expo                |
| Language                       | JavaScript                         |
| Backend                        | Node.js + Express.js               |
| Browser Automation (Prototype) | Playwright                         |
| AI Service                     | Python + FastAPI                   |
| Agent Framework                | LangGraph                          |
| LLM Integration                | LangChain + Ollama                 |
| Local LLM                      | Qwen 2.5 (0.5B)                    |
| Database                       | PostgreSQL 14                      |
| Vector Search                  | pgvector 0.8.1                     |
| Background Jobs                | Redis + BullMQ (planned)           |
| Notifications                  | Firebase Cloud Messaging (planned) |

## Project Structure

```text
Instagram AI Agent/
├── mobile/
│   ├── App.js
│   └── src/
│       ├── screens/
│       │   ├── auth/
│       │   ├── dashboard/
│       │   └── instagram/
│       └── services/
│
├── backend/
│   ├── .auth/
│   │   └── instagram/
│   ├── src/
│   │   └── services/
│   │       └── instagramBrowser.js
│   ├── server.js
│   └── package.json
│
├── ai-service/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   └── graph.py
│   └── requirements.txt
│
├── llm/
├── infrastructure/
├── docs/
├── .gitignore
├── .env.example
└── README.md
```

_The Python virtual environment (`venv/`) is local to the AI service and should not be committed to Git._

## Implemented So Far

### Mobile Application

- React Native + Expo initialized.
- Login and registration screens created.
- Dashboard implemented.
- Backend connection status displayed.
- Instagram connection screen created.
- Open and close Instagram browser controls integrated.

### Backend

- Node.js + Express initialized.
- CORS and dotenv configured.
- Backend health-check endpoint implemented.
- Playwright installed with Chromium.
- Persistent browser context configured.
- Instagram browser start and close endpoints implemented.

### Database

- PostgreSQL 14 installed and running.
- Dedicated database user created.
- `instagpt` database created.
- pgvector 0.8.1 installed and enabled.

### Python AI Service

- Python virtual environment configured.
- FastAPI application initialized.
- Health-check endpoints implemented.
- LangGraph installed and configured.
- Three-node agent workflow created:
  - Receive message
  - Process message
  - Generate response
- LangChain Ollama integration installed.
- Local Qwen 2.5 (0.5B) model connected through Ollama.
- Actual AI-generated responses successfully tested through FastAPI.

## Backend API

| Method | Endpoint                       | Purpose                 |
| ------ | ------------------------------ | ----------------------- |
| GET    | `/`                            | Backend health check    |
| POST   | `/api/instagram/browser/start` | Open Instagram browser  |
| POST   | `/api/instagram/browser/close` | Close Instagram browser |

## AI Service API

| Method | Endpoint      | Purpose                                                                            |
| ------ | ------------- | ---------------------------------------------------------------------------------- |
| GET    | `/`           | AI service health check                                                            |
| GET    | `/health`     | AI service status                                                                  |
| POST   | `/agent/test` | Send a message through the LangGraph workflow and receive an AI-generated response |

### AI Agent Workflow

```text
        User Message
              |
              v
           FastAPI
              |
              v
       LangGraph Workflow
              |
              v
       Receive Message
              |
              v
       Process Message
              |
              v
      Generate Response
              |
              v
      Ollama + Qwen 2.5
              |
              v
       AI-Generated Reply
```

## Running the Project

### Backend

```bash
cd backend
node server.js
```

### Mobile Application

```bash
cd mobile
npx expo start
```

Connect the Android device through Expo Go.

### Ollama (Global Terminal)

Start the local Ollama server:

```bash
ollama serve
```

The Qwen model used by the AI service is:

```bash
ollama run qwen2.5:0.5b
```

### Python AI Service

Open a separate terminal and navigate to the AI service:

```bash
cd ai-service
```

Activate the virtual environment:

```bash
source venv/bin/activate
```

Install dependencies when required:

```bash
pip install -r requirements.txt
```

Start FastAPI:

```bash
uvicorn app.main:app --reload
```

Access the API documentation:

```text
http://127.0.0.1:8000/docs
```

## Database Configuration

- Database: `instagpt`
- User: `instagpt_user`
- PostgreSQL: `14`
- pgvector: `0.8.1`

The database password should be configured securely through environment variables.

## Current Development Status

### Completed

- [x] React Native application setup
- [x] Backend initialization
- [x] Mobile-to-backend communication
- [x] Instagram browser integration prototype
- [x] Persistent browser profile configuration
- [x] PostgreSQL setup
- [x] pgvector installation and activation
- [x] Python AI service initialization
- [x] FastAPI endpoints
- [x] LangGraph installation and workflow
- [x] LangChain Ollama integration
- [x] Local Qwen 2.5 model integration
- [x] AI response generation tested through FastAPI

### Pending

- [ ] Database schema and relationships
- [ ] Agent-specific system prompt and instructions
- [ ] Contextual memory implementation
- [ ] Instagram integration validation
- [ ] Instagram message and content analysis workflows
- [ ] Contact information extraction
- [ ] Personalized message generation
- [ ] Background task scheduling
- [ ] Delayed follow-up management
- [ ] Official Meta API integration validation
- [ ] Complete mobile-agent integration
- [ ] Firebase Cloud Messaging integration

## Important Notes

- Instagram authentication through Chromium is currently unresolved.
- Playwright integration is experimental and does not grant additional Instagram API permissions.
- Official Meta API permissions and restrictions must be respected.
- Automatic following and unfollowing are excluded.
- Mass messaging is excluded.
- Follow-up messages must be delayed approximately 2–4 weeks, never sent immediately or on the same day.
- Follow-ups must comply with Instagram messaging permissions and anti-spam restrictions.
- Browser session data inside `.auth/` must never be committed to Git.
- Local LLM inference currently uses Qwen 2.5 (0.5B) through Ollama.

---

**Project:** InstaGPT – Instagram AI Agent  
**Status:** Active Development
