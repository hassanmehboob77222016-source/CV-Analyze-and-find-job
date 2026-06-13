# API keys (environment variables)

Put your API keys in **`env/.env`** (copy from `.env.example` first).

The backend loads keys from (in order):

1. `SMIT-Hackatone-backend-main/.env`
2. `env/.env` (this folder)

## Setup

```powershell
copy "env\.env.example" "env\.env"
```

Edit `env\.env` and set:

- `GROQ_API_KEY` — [Groq console](https://console.groq.com/keys)
- `TAVILY_API_KEY` — [Tavily](https://app.tavily.com/home)

Optional: copy the same file to `SMIT-Hackatone-backend-main\.env` if you prefer keys next to the backend.

**Never commit `env/.env`** — it is gitignored.
