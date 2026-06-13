from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

BACKEND_ROOT = Path(__file__).resolve().parents[1]
PROJECT_ROOT = BACKEND_ROOT.parent
ENV_FILES = (
    BACKEND_ROOT / ".env",
    PROJECT_ROOT / "env" / ".env",
)
_existing_env_files = tuple(str(path) for path in ENV_FILES if path.is_file())


class Settings(BaseSettings):
    groq_api_key: str = ""
    tavily_api_key: str = ""
    model_name: str = "llama-3.3-70b-versatile"
    max_search_results: int = 10

    model_config = SettingsConfigDict(
        env_file=_existing_env_files or (str(ENV_FILES[0]), str(ENV_FILES[1])),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    def missing_api_keys(self) -> list[str]:
        missing: list[str] = []
        if not self.groq_api_key.strip():
            missing.append("GROQ_API_KEY")
        if not self.tavily_api_key.strip():
            missing.append("TAVILY_API_KEY")
        return missing


settings = Settings()
