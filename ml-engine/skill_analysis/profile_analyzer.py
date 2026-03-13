from __future__ import annotations

from collections import defaultdict

import pandas as pd


SKILL_TOPIC_MAP = {
    "python": {"arrays": 6, "graphs": 4, "dynamic_programming": 4},
    "django": {"backend": 10, "sql": 6, "system_design": 4},
    "react": {"frontend": 10, "system_design": 3},
    "docker": {"system_design": 8, "backend": 3},
    "postgresql": {"sql": 10, "backend": 4},
    "redis": {"system_design": 8, "backend": 2},
    "javascript": {"frontend": 8, "binary_search": 2},
    "c++": {"graphs": 8, "dynamic_programming": 10, "binary_search": 8},
}


def _normalize_topic_scores(raw_scores: dict[str, int]) -> dict[str, int]:
    frame = pd.DataFrame(
        [{"topic": topic, "score": score} for topic, score in raw_scores.items()]
    )
    if frame.empty:
        return {}

    max_score = frame["score"].max() or 1
    frame["normalized"] = (frame["score"] / max_score * 100).round().clip(15, 100)
    return {
        row.topic: int(row.normalized)
        for row in frame.itertuples(index=False)
    }


def analyze_coding_profile(
    skills: list[str],
    handles: dict[str, str],
    experience_level: str,
    previous_snapshot: dict[str, int] | None = None,
) -> dict:
    topic_scores = defaultdict(int)

    for skill in skills:
        for topic, boost in SKILL_TOPIC_MAP.get(skill.lower(), {}).items():
            topic_scores[topic] += boost

    if handles.get("leetcode"):
        topic_scores["arrays"] += 8
        topic_scores["binary_search"] += 6
        topic_scores["dynamic_programming"] += 5
    if handles.get("codeforces"):
        topic_scores["graphs"] += 8
        topic_scores["dynamic_programming"] += 8
    if handles.get("github"):
        topic_scores["system_design"] += 6
        topic_scores["backend"] += 4

    if experience_level == "beginner":
        topic_scores["arrays"] += 6
        topic_scores["sql"] += 3
    elif experience_level == "advanced":
        topic_scores["system_design"] += 10

    if previous_snapshot:
        for topic, score in previous_snapshot.items():
            topic_scores[topic] = int((topic_scores[topic] + score) / 2)

    normalized_scores = _normalize_topic_scores(topic_scores)

    weakest_topics = sorted(normalized_scores, key=normalized_scores.get)[:3]
    recommendations = [
        f"Schedule 2 focused sessions on {topic.replace('_', ' ')} this week."
        for topic in weakest_topics
    ]
    recommendations.append("Ship one portfolio project milestone every weekend.")

    weekly_activity = [
        {"week": "Week 1", "problems": 9},
        {"week": "Week 2", "problems": 11},
        {"week": "Week 3", "problems": 7},
        {"week": "Week 4", "problems": 13},
    ]

    solved_estimate = int(sum(normalized_scores.values()) / 6) if normalized_scores else 0
    consistency_score = int(sum(item["problems"] for item in weekly_activity) / len(weekly_activity) * 6)

    return {
        "overview": {
            "problems_solved": solved_estimate,
            "consistency_score": min(consistency_score, 100),
        },
        "topic_heatmap": normalized_scores,
        "recommendations": recommendations,
        "weekly_activity": weekly_activity,
    }

