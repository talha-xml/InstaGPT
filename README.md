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
| LLM                            | Qwen / Llama via Ollama (planned)  |
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
├── backend/
│   ├── .auth/
│   │   └── instagram/
│   ├── src/
│   │   └── services/
│   │       └── instagramBrowser.js
│   ├── server.js
│   └── package.json
├── ai-service/
├── llm/
├── infrastructure/
├── docs/
├── .gitignore
├── .env.example
└── README.md
```

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

## Backend API

| Method | Endpoint                       | Purpose                 |
| ------ | ------------------------------ | ----------------------- |
| GET    | `/`                            | Backend health check    |
| POST   | `/api/instagram/browser/start` | Open Instagram browser  |
| POST   | `/api/instagram/browser/close` | Close Instagram browser |

## Running the Project

**Backend:**

```bash
cd backend
node server.js
```

**Mobile Application:**

```bash
cd mobile
npx expo start
```

Connect the Android device through Expo Go.

## Database Configuration

- Database: `instagpt`
- User: `instagpt_user`
- PostgreSQL: `14`
- pgvector: `0.8.1`

The database password should be configured securely through environment variables.

## Current Development Status

- [x] React Native application setup
- [x] Backend initialization
- [x] Mobile-to-backend communication
- [x] Instagram browser integration prototype
- [x] Persistent browser profile configuration
- [x] PostgreSQL setup
- [x] pgvector installation and activation
- [ ] Database schema and relationships
- [ ] Python AI service
- [ ] LangGraph agent workflow
- [ ] LLM integration
- [ ] Contextual memory implementation
- [ ] Instagram integration validation
- [ ] Background task scheduling
- [ ] Complete mobile-agent integration

## Important Notes

- Instagram authentication through Chromium is currently unresolved.
- Playwright integration is experimental and does not grant additional Instagram API permissions.
- Official Meta API permissions and restrictions must be respected.
- Automatic following/unfollowing and mass messaging are excluded.
- Follow-ups must be delayed approximately 2–4 weeks, never sent immediately or on the same day.
- Browser session data inside `.auth/` must never be committed to Git.

---

**Project:** InstaGPT – Instagram AI Agent  
**Status:** Active Development
