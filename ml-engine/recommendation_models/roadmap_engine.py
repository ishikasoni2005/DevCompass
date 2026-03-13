from __future__ import annotations

from dataclasses import dataclass

from sklearn.feature_extraction.text import TfidfVectorizer


@dataclass
class RoadmapMilestonePlan:
    title: str
    description: str
    week_start: int
    week_end: int
    resources: list[str]
    order: int


@dataclass
class RoadmapPlan:
    summary: str
    recommended_technologies: list[str]
    milestones: list[dict]


ROADMAP_TEMPLATES = {
    "backend engineer": {
        "summary": "Build strong API fundamentals, databases, backend scaling, and delivery habits.",
        "technologies": ["Python", "Django", "PostgreSQL", "Redis", "Docker", "Celery"],
        "milestones": [
            ("Python + DSA Foundations", "Strengthen Python fluency and problem-solving patterns.", 1, 2),
            ("Django REST APIs", "Design production-ready APIs with auth, validation, and testing.", 3, 4),
            ("Data Layer", "Model relational data, optimize queries, and introduce caching.", 5, 6),
            ("Deployment", "Containerize the stack, add background jobs, and deploy safely.", 7, 8),
        ],
    },
    "full stack engineer": {
        "summary": "Balance product-focused frontend delivery with strong backend implementation skills.",
        "technologies": ["React", "TypeScript", "Node.js", "Python", "PostgreSQL", "Docker"],
        "milestones": [
            ("Frontend Foundations", "Master React state, routing, forms, and API integration.", 1, 2),
            ("Backend APIs", "Build secure CRUD APIs and connect them to a SQL database.", 3, 4),
            ("Product Delivery", "Add auth, dashboards, analytics, and responsive UX.", 5, 6),
            ("Deployment + Observability", "Ship with Docker, CI, monitoring, and environment management.", 7, 8),
        ],
    },
    "machine learning engineer": {
        "summary": "Strengthen the path from data handling and modeling to deployment and MLOps.",
        "technologies": ["Python", "Pandas", "Scikit-learn", "PyTorch", "FastAPI", "Docker"],
        "milestones": [
            ("Data Foundations", "Practice Pandas, feature engineering, and data cleaning.", 1, 2),
            ("Classical ML", "Train and evaluate models with scikit-learn.", 3, 4),
            ("Deep Learning", "Implement neural networks and experiment tracking.", 5, 6),
            ("Production ML", "Deploy inference services and automate pipelines.", 7, 8),
        ],
    },
    "devops engineer": {
        "summary": "Combine infrastructure, automation, and reliability practices into a deployable roadmap.",
        "technologies": ["Linux", "Docker", "Kubernetes", "Terraform", "AWS", "CI/CD"],
        "milestones": [
            ("Linux + Networking", "Build shell fluency and networking fundamentals.", 1, 2),
            ("Containers + CI", "Package apps with Docker and automate delivery.", 3, 4),
            ("Cloud + IaC", "Provision production infrastructure with Terraform.", 5, 6),
            ("Scaling + Reliability", "Work with Kubernetes, monitoring, and incident response.", 7, 8),
        ],
    },
}


def _match_goal(goal: str) -> str:
    roles = list(ROADMAP_TEMPLATES)
    corpus = roles + [goal.lower()]
    vectorizer = TfidfVectorizer(ngram_range=(1, 2))
    matrix = vectorizer.fit_transform(corpus)
    similarities = (matrix[:-1] @ matrix[-1].T).toarray().ravel()
    best_index = similarities.argmax() if similarities.size else 0
    return roles[best_index]


def generate_learning_roadmap(
    goal: str,
    current_skills: list[str],
    experience_level: str,
) -> RoadmapPlan:
    template_key = _match_goal(goal)
    template = ROADMAP_TEMPLATES[template_key]
    current_skill_set = {skill.lower() for skill in current_skills}
    recommended_technologies = [
        tech for tech in template["technologies"] if tech.lower() not in current_skill_set
    ]
    if len(recommended_technologies) < 4:
        recommended_technologies = template["technologies"]

    pace_hint = {
        "beginner": "Start with shorter daily sessions and a weekend project sprint.",
        "intermediate": "Push for one project milestone every 10 days.",
        "advanced": "Anchor each milestone to a production-style project deliverable.",
    }[experience_level]

    milestones = []
    for index, item in enumerate(template["milestones"], start=1):
        title, description, week_start, week_end = item
        resources = [
            f"{title} practice plan",
            f"{goal.title()} project checkpoint {index}",
            pace_hint,
        ]
        milestones.append(
            {
                "title": title,
                "description": description,
                "week_start": week_start,
                "week_end": week_end,
                "resources": resources,
                "order": index,
            }
        )

    return RoadmapPlan(
        summary=f"{template['summary']} {pace_hint}",
        recommended_technologies=recommended_technologies,
        milestones=milestones,
    )

