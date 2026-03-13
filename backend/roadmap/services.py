from dataclasses import asdict

from .models import Roadmap, RoadmapMilestone

try:
    from recommendation_models.roadmap_engine import generate_learning_roadmap
except ImportError:  # pragma: no cover
    generate_learning_roadmap = None


class RoadmapService:
    @staticmethod
    def generate_for_user(user, career_goal: str, current_skills: list[str], experience_level: str):
        if generate_learning_roadmap is None:
            roadmap_payload = {
                "summary": f"A focused roadmap to transition into {career_goal}.",
                "recommended_technologies": ["Python", "Django", "PostgreSQL", "Docker"],
                "milestones": [
                    {
                        "title": "Core Foundations",
                        "description": "Strengthen language fundamentals, Git, and data structures.",
                        "week_start": 1,
                        "week_end": 2,
                        "resources": ["Python practice", "NeetCode arrays & strings"],
                        "order": 1,
                    }
                ],
            }
        else:
            roadmap_plan = generate_learning_roadmap(
                goal=career_goal,
                current_skills=current_skills,
                experience_level=experience_level,
            )
            roadmap_payload = asdict(roadmap_plan)

        roadmap = Roadmap.objects.create(
            user=user,
            goal=career_goal,
            summary=roadmap_payload["summary"],
            experience_level=experience_level,
            recommended_technologies=roadmap_payload["recommended_technologies"],
        )

        milestones = [
            RoadmapMilestone(
                roadmap=roadmap,
                title=milestone["title"],
                description=milestone["description"],
                week_start=milestone["week_start"],
                week_end=milestone["week_end"],
                resources=milestone.get("resources", []),
                order=milestone["order"],
            )
            for milestone in roadmap_payload["milestones"]
        ]
        RoadmapMilestone.objects.bulk_create(milestones)
        return roadmap

