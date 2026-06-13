# JobScout AI

JobScout AI is a FastAPI + LangGraph backend that parses CVs, extracts structured candidate profiles with Groq, searches jobs using Tavily, evaluates job fit, and returns ranked matches.

## Setup

1) Create and activate a virtual environment:

```bash
python -m venv .venv
.venv\Scripts\activate
```

2) Install dependencies:

```bash
pip install -r requirements.txt
```

3) Create environment file (either location works):

```bash
copy env\.env.example env\.env
```

Or in the backend folder:

```bash
copy .env.example .env
```

4) Add your API keys in `env\.env` or `.env`:

```env
GROQ_API_KEY=your_groq_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

## Get Free API Keys

- Groq: [https://console.groq.com/keys](https://console.groq.com/keys)
- Tavily: [https://app.tavily.com/home](https://app.tavily.com/home)

## Run The Project

```bash
python main.py
```

Server starts on `http://0.0.0.0:8000`.
Swagger docs: `http://127.0.0.1:8000/docs`

## API Endpoints

### `GET /`

Returns welcome message and available endpoints.

```bash
curl -X GET "http://127.0.0.1:8000/"
```

### `GET /api/health`

Returns service health, version, and model.

```bash
curl -X GET "http://127.0.0.1:8000/api/health"
```

### `POST /api/cv/upload`

Upload CV file (`.pdf` or `.docx`, max 10MB).

```bash
curl -X POST "http://127.0.0.1:8000/api/cv/upload" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@sample_cv.pdf"
```

### `POST /api/jobs/search`

Run full agent pipeline using CV text.

```bash
curl -X POST "http://127.0.0.1:8000/api/jobs/search" \
  -H "accept: application/json" \
  -H "Content-Type: application/json" \
  -d "{\"cv_text\":\"Python backend engineer with 4 years of experience in FastAPI and cloud deployments.\"}"
```

Successful response includes:
- `cv_profile` (structured profile)
- `jobs` (ranked job matches)
- `total_found`
- `search_queries_used`
