from __future__ import annotations

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def rank_project_recommendations(
    user_skills: list[str],
    career_goal: str,
    projects: list[dict],
) -> list[int]:
    if not projects:
        return []

    user_text = " ".join([career_goal, *user_skills]).lower()
    project_texts = [
        " ".join(
            [
                project["title"],
                project["description"],
                " ".join(project.get("tech_stack") or []),
                " ".join(project.get("target_skills") or []),
            ]
        ).lower()
        for project in projects
    ]

    vectorizer = TfidfVectorizer(stop_words="english")
    matrix = vectorizer.fit_transform(project_texts + [user_text])
    project_matrix = matrix[:-1]
    user_vector = matrix[-1]
    scores = cosine_similarity(project_matrix, user_vector).ravel()

    ranked = sorted(
        zip(projects, scores),
        key=lambda item: (item[1], item[0].get("featured", False)),
        reverse=True,
    )
    return [item[0]["id"] for item in ranked]

