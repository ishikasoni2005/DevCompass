from __future__ import annotations

import io
import re

from pypdf import PdfReader
from sklearn.feature_extraction.text import TfidfVectorizer


ROLE_SKILLS = {
    "backend engineer": ["python", "django", "postgresql", "docker", "redis", "rest api"],
    "full stack engineer": ["javascript", "react", "node", "python", "postgresql", "docker"],
    "machine learning engineer": ["python", "pandas", "scikit-learn", "pytorch", "nlp", "docker"],
    "devops engineer": ["linux", "docker", "kubernetes", "aws", "terraform", "ci/cd"],
}


def _extract_text(file_bytes: bytes, filename: str) -> str:
    if filename.lower().endswith(".pdf"):
        reader = PdfReader(io.BytesIO(file_bytes))
        return "\n".join(page.extract_text() or "" for page in reader.pages)
    return file_bytes.decode("utf-8", errors="ignore")


def _extract_skills(text: str) -> list[str]:
    normalized = text.lower()
    vocabulary = sorted({skill for skills in ROLE_SKILLS.values() for skill in skills})
    return [
        skill.title()
        for skill in vocabulary
        if re.search(rf"\b{re.escape(skill)}\b", normalized)
    ]


def _closest_role(target_role: str) -> str:
    roles = list(ROLE_SKILLS)
    corpus = roles + [target_role.lower()]
    vectorizer = TfidfVectorizer(ngram_range=(1, 2))
    matrix = vectorizer.fit_transform(corpus)
    similarities = (matrix[:-1] @ matrix[-1].T).toarray().ravel()
    best_index = similarities.argmax() if similarities.size else 0
    return roles[best_index]


def analyze_resume_document(file_bytes: bytes, filename: str, target_role: str) -> dict:
    text = _extract_text(file_bytes=file_bytes, filename=filename)
    extracted_skills = _extract_skills(text)
    role = _closest_role(target_role)
    expected_skills = [skill.title() for skill in ROLE_SKILLS[role]]
    extracted_lower = {skill.lower() for skill in extracted_skills}

    missing_skills = [
        skill for skill in expected_skills if skill.lower() not in extracted_lower
    ]

    suggestions = []
    if "impact" not in text.lower() and "%" not in text:
        suggestions.append("Add measurable impact to each experience bullet.")
    if len(extracted_skills) < 5:
        suggestions.append("Expand the skills section to include your strongest tools.")
    if missing_skills:
        suggestions.append(f"Surface experience with {', '.join(missing_skills[:3])}.")
    if "github" not in text.lower():
        suggestions.append("Include a GitHub or portfolio link near the header.")

    coverage_ratio = 1 - (len(missing_skills) / max(len(expected_skills), 1))
    score = int(max(40, min(96, coverage_ratio * 100)))

    return {
        "text": text,
        "extracted_skills": extracted_skills,
        "missing_skills": missing_skills,
        "suggestions": suggestions,
        "score": score,
    }

