CV_EXTRACTION_PROMPT = """
You are an expert recruiter assistant.
Read the CV text below and extract a JSON object with these exact keys:
- skills: list of strings
- job_titles: list of previous and target job titles
- years_experience: integer
- education: list of strings
- location: string
- summary: 2 sentence professional summary

Return ONLY valid JSON and nothing else.

CV text:
{cv_text}
"""

SEARCH_QUERY_PROMPT = """
You are a job search strategist.
Using the candidate profile JSON below, generate 5 different job search queries.
Queries must be varied (some specific, some broad).

Return ONLY a JSON array of strings.

Candidate profile JSON:
{cv_profile_json}
"""

JOB_EVALUATION_PROMPT = """
You are evaluating job fit for a candidate.
Compare the job details and candidate profile, then return JSON with:
- match_score: integer 0-100
- reasoning: 2-3 sentence explanation
- key_matching_skills: list of matching skills
- is_good_match: boolean (true when score >= 60)
- company_name: string (extract from the job content if visible, otherwise empty string)

Use this strict scoring rubric:
- 90-100: 4+ skills match AND job title matches AND location matches
- 70-89: 2-3 skills match AND job title is relevant
- 50-69: 1-2 skills match OR job title partially matches
- 30-49: weak connection, different domain
- Below 30: no real match

Be strict and vary scores across different jobs. Never assign the same score to all jobs.

Return ONLY valid JSON.

Candidate profile JSON:
{cv_profile_json}

Job details:
Title: {job_title}
URL: {job_url}
Description:
{job_description}
"""
