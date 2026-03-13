from statistics import mean

from courses.models import Course
from recommendations.models import ProjectRecommendation
from roadmap.models import Roadmap

from .models import LearningProgress, SkillSnapshot

try:
    from skill_analysis.profile_analyzer import analyze_coding_profile
except ImportError:  # pragma: no cover
    analyze_coding_profile = None


class DashboardService:
    @staticmethod
    def build_for_user(user):
        roadmap_qs = Roadmap.objects.filter(user=user).prefetch_related("milestones")
        progress_qs = LearningProgress.objects.filter(user=user).select_related("course")
        latest_snapshot = SkillSnapshot.objects.filter(user=user).first()

        roadmap_completion = mean(
            [progress.completion_percentage for progress in progress_qs]
        ) if progress_qs else 0
        completed_courses = progress_qs.filter(is_completed=True).count()

        if analyze_coding_profile:
            coding_profile = analyze_coding_profile(
                skills=user.skills,
                handles={
                    "github": user.github_username,
                    "leetcode": user.leetcode_username,
                    "codeforces": user.codeforces_username,
                },
                experience_level=user.experience_level,
                previous_snapshot=latest_snapshot.topic_scores if latest_snapshot else None,
            )
        else:
            coding_profile = {
                "overview": {"problems_solved": 42, "consistency_score": 71},
                "topic_heatmap": {
                    "arrays": 82,
                    "graphs": 53,
                    "dynamic_programming": 38,
                    "binary_search": 68,
                    "system_design": 44,
                },
                "recommendations": [
                    "Push graph traversal practice twice a week.",
                    "Build one deployment-focused project this month.",
                ],
                "weekly_activity": [
                    {"week": "W1", "problems": 8},
                    {"week": "W2", "problems": 10},
                    {"week": "W3", "problems": 7},
                    {"week": "W4", "problems": 12},
                ],
            }

        suggested_projects = list(
            ProjectRecommendation.objects.filter(featured=True).values(
                "title", "difficulty", "tech_stack"
            )[:3]
        )
        latest_courses = list(
            Course.objects.filter(is_published=True).values(
                "id", "title", "difficulty", "category"
            )[:4]
        )

        return {
            "profile": {
                "name": user.name,
                "career_goal": user.career_goal,
                "experience_level": user.experience_level,
                "skills": user.skills,
            },
            "overview": {
                "roadmaps_created": roadmap_qs.count(),
                "completed_courses": completed_courses,
                "roadmap_completion": roadmap_completion,
                "active_skills": len(user.skills),
            },
            "progress": [
                {
                    "course": progress.course.title,
                    "completion_percentage": progress.completion_percentage,
                    "last_activity_at": progress.last_activity_at,
                }
                for progress in progress_qs
            ],
            "coding_activity": coding_profile,
            "featured_projects": suggested_projects,
            "recommended_courses": latest_courses,
        }

