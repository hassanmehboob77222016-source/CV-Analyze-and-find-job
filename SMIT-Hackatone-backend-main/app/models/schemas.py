from pydantic import BaseModel, Field


class CVProfile(BaseModel):
    skills: list[str] = Field(default_factory=list)
    job_titles: list[str] = Field(default_factory=list)
    years_experience: int = 0
    education: list[str] = Field(default_factory=list)
    location: str = ""
    summary: str = ""


class JobMatch(BaseModel):
    job_title: str = ""
    company: str = ""
    location: str = "Unknown"
    url: str = ""
    match_score: int = Field(default=0, ge=0, le=100)
    reasoning: str = ""
    key_matching_skills: list[str] = Field(default_factory=list)


class JobSearchResponse(BaseModel):
    cv_profile: CVProfile
    jobs: list[JobMatch]
    total_found: int
    search_queries_used: list[str]


class ErrorResponse(BaseModel):
    error: str
    detail: str
