backend 
# 🤖 JobScout AI — Backend

> Autonomous AI career agent that analyzes your CV and hunts real jobs for you.

![Python](https://img.shields.io/badge/Python-3.11-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green)
![LangGraph](https://img.shields.io/badge/LangGraph-0.2-orange)
![Groq](https://img.shields.io/badge/LLM-Groq%20Llama3-red)
![Railway](https://img.shields.io/badge/Deploy-Railway-purple)

## 🧠 What It Does

JobScout AI is a true **agentic system** — not a simple search widget.
Upload a CV and the AI agent autonomously:

1. 📄 **Ingests** — Parses CV and extracts skills, titles, experience using RAG
2. 🧠 **Plans** — LLM generates optimized search queries for your profile
3. 🔍 **Searches** — Queries real-time job listings via Tavily Search API
4. ⚖️ **Evaluates** — Scores each job against the candidate profile
5. 🏆 **Ranks** — Returns top matches with AI reasoning per job

## ⚡ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | FastAPI |
| Agent | LangGraph + LangChain |
| LLM | Groq (Llama 3.3 70B) — Free |
| Search | Tavily Search API — Free |
| CV Parsing | PyMuPDF + python-docx |
| Embeddings | sentence-transformers (local) |
| Vector Store | FAISS (local) |
| Hosting | Railway |

## 🚀 Quick Start

### 1. Clone the repo
git clone https://github.com/YOURNAME/jobscout-backend.git
cd jobscout-backend

### 2. Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux

### 3. Install dependencies
pip install -r requirements.txt

### 4. Add API keys
cp .env.example .env
# Edit .env and add your keys:
# GROQ_API_KEY=your_key_here
# TAVILY_API_KEY=your_key_here

### 5. Run the server
python main.py
# Server runs at http://localhost:8000
# API docs at http://localhost:8000/docs

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Check server status |
| POST | /api/cv/upload | Upload PDF or DOCX CV |
| POST | /api/jobs/search | Run full AI agent |
| POST | /api/cv/sample | Load sample CV for demo |

## 🔑 Get Free API Keys

- **Groq**: https://console.groq.com (free, no credit card)
- **Tavily**: https://tavily.com (free tier available)

## 🌐 Live Demo
Backend: https://jobscout-backend.up.railway.app
Frontend: https://jobscout-frontend.vercel.app
```
GitHub Topics (add these tags to your repo):
```
langchain langgraph fastapi python groq llama3 tavily agentic-ai 
rag autonomous-agent job-search ai hackathon railway
```
---
🎨 REPO 2 — FRONTEND (jobscout-frontend)
GitHub Repo Name:
```
frontend
```
Short Description:
```
✨ JobScout AI — Beautiful React frontend for the autonomous AI job hunting agent. Built with Vite + React + Framer Motion. Features CV drag-drop upload, real-time AI loading states, animated job match cards with scores and reasoning. Deployed on Vercel.

README.md (paste this as your frontend README):
markdown
# ✨ JobScout AI — Frontend

> Beautiful, animated React dashboard for the JobScout AI career agent.

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-pink)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)

## ✨ Features

- 🎯 **Drag & Drop CV Upload** — PDF and DOCX support
- 🤖 **AI Loading Animation** — Step-by-step agent progress display
- 📊 **Animated Job Cards** — Match score rings, reasoning, skill tags
- 🔍 **Filter & Sort** — Filter by score, sort by best match
- 📱 **Fully Responsive** — Works on mobile, tablet, desktop
- ⚡ **Sample CV Demo** — One-click demo without uploading a file

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Animations | Framer Motion |
| HTTP Client | Axios |
| File Upload | React Dropzone |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| Hosting | Vercel |

## 🚀 Quick Start

### 1. Clone the repo
git clone https://github.com/YOURNAME/jobscout-frontend.git
cd jobscout-frontend

### 2. Install dependencies
npm install

### 3. Set backend URL
# Open src/api/client.js
# Change BASE_URL to your backend URL:
# const BASE_URL = "http://localhost:8000";  ← for local
# const BASE_URL = "https://your-backend.up.railway.app";  ← for production

### 4. Run dev server
npm run dev
# Opens at http://localhost:5173


