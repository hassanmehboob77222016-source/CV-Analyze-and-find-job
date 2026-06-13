def normalize_cv_profile(raw: dict | None) -> dict:
    """Coerce LLM output into a shape safe for CVProfile validation."""
    if not isinstance(raw, dict):
        raw = {}

    def as_str_list(value: object) -> list[str]:
        if value is None:
            return []
        if isinstance(value, str):
            return [value.strip()] if value.strip() else []
        if isinstance(value, list):
            return [str(item).strip() for item in value if str(item).strip()]
        return [str(value).strip()] if str(value).strip() else []

    years = raw.get("years_experience", 0)
    try:
        years_int = int(years)
    except (TypeError, ValueError):
        years_int = 0

    return {
        "skills": as_str_list(raw.get("skills")),
        "job_titles": as_str_list(raw.get("job_titles")),
        "years_experience": max(0, years_int),
        "education": as_str_list(raw.get("education")),
        "location": str(raw.get("location") or "").strip(),
        "summary": str(raw.get("summary") or "").strip(),
    }
