from pydantic import BaseModel
from fastapi import APIRouter, File, HTTPException, UploadFile
from fastapi.responses import JSONResponse

from app.agent.graph import job_scout_graph
from app.agent.profile_utils import normalize_cv_profile
from app.config import settings
from app.cv_processor.parser import parse_cv
from app.models.schemas import CVProfile, ErrorResponse, JobMatch, JobSearchResponse

router = APIRouter(tags=["jobscout"])
MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024

SAMPLE_CV_TEXT = (
    "Muhammad Ali Khan - Senior Software Engineer. Location: Lahore Pakistan. "
    "4 years experience. Skills: Python FastAPI Django React PostgreSQL Redis Docker AWS "
    "REST APIs TypeScript Node.js MySQL Git. Experience: Senior Backend Developer at Arbisoft "
    "Lahore 2022-Present, built REST APIs with FastAPI serving 100k daily users. Backend Developer "
    "at Systems Limited 2021-2022, built Django fintech apps. Education: BS Software Engineering "
    "FAST-NUCES Lahore 2021. Certifications: AWS Solutions Architect 2023. Seeking Senior Backend "
    "Developer or Python Engineer role in Lahore or Remote."
)


class JobSearchRequest(BaseModel):
    cv_text: str


@router.get("/")
async def root():
    return {
        "message": "Welcome to JobScout AI",
        "endpoints": ["/api/health", "/api/cv/upload", "/api/cv/sample", "/api/jobs/search"],
    }


@router.post("/api/cv/upload")
async def upload_cv(file: UploadFile = File(...)):
    filename = file.filename or ""
    extension = filename.lower().rsplit(".", maxsplit=1)[-1] if "." in filename else ""

    if extension not in {"pdf", "docx"}:
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported.")

    file_bytes = await file.read()
    if len(file_bytes) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(status_code=400, detail="File too large. Max allowed size is 10MB.")

    try:
        cv_text = parse_cv(file_bytes=file_bytes, filename=filename)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to parse CV: {exc}") from exc

    return {
        "cv_text": cv_text,
        "cv_text_preview": cv_text[:500],
        "file_name": filename,
        "status": "parsed successfully",
    }


@router.post("/api/cv/sample")
async def sample_cv():
    return {
        "cv_text": SAMPLE_CV_TEXT,
        "cv_text_preview": SAMPLE_CV_TEXT[:500],
        "file_name": "sample_cv.pdf",
        "status": "parsed successfully",
    }


@router.post(
    "/api/jobs/search",
    response_model=JobSearchResponse,
    responses={500: {"model": ErrorResponse}},
)
async def search_jobs(payload: JobSearchRequest):
    cv_text = payload.cv_text.strip()
    if not cv_text:
        raise HTTPException(status_code=400, detail="cv_text must not be empty.")

    missing_keys = settings.missing_api_keys()
    if missing_keys:
        raise HTTPException(
            status_code=503,
            detail=(
                f"Missing API keys: {', '.join(missing_keys)}. "
                "Copy env/.env.example to env/.env (or backend .env) and add your keys."
            ),
        )

    try:
        state = {"cv_text": cv_text}
        result = await job_scout_graph.ainvoke(state)

        if result.get("error"):
            return JSONResponse(
                status_code=500,
                content=ErrorResponse(error="job_search_failed", detail=result["error"]).model_dump(),
            )

        cv_profile = CVProfile(**normalize_cv_profile(result.get("cv_profile")))
        jobs = [JobMatch(**job) for job in result.get("final_jobs", [])]
        queries = result.get("search_queries", [])
        return JobSearchResponse(
            cv_profile=cv_profile,
            jobs=jobs,
            total_found=len(jobs),
            search_queries_used=queries,
        )
    except Exception as exc:
        return JSONResponse(
            status_code=500,
            content=ErrorResponse(error="job_search_failed", detail=str(exc)).model_dump(),
        )


@router.get("/api/health")
async def health_check():
    missing_keys = settings.missing_api_keys()
    return {
        "status": "healthy" if not missing_keys else "degraded",
        "version": "1.0.0",
        "model": settings.model_name,
        "api_keys_configured": len(missing_keys) == 0,
        "missing_keys": missing_keys,
    }
