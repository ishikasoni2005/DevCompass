try:
    from recommendation_models.project_matcher import rank_project_recommendations
except ImportError:  # pragma: no cover
    rank_project_recommendations = None


class RecommendationService:
    @staticmethod
    def rank_for_user(user, projects):
        project_list = list(projects)
        if rank_project_recommendations is None:
            return project_list

        ranked_ids = rank_project_recommendations(
            user_skills=user.skills,
            career_goal=user.career_goal,
            projects=[
                {
                    "id": project.id,
                    "title": project.title,
                    "description": project.description,
                    "tech_stack": project.tech_stack,
                    "target_skills": project.target_skills,
                    "featured": project.featured,
                }
                for project in project_list
            ],
        )
        ordered = {project_id: index for index, project_id in enumerate(ranked_ids)}
        return sorted(project_list, key=lambda project: ordered.get(project.id, 999))
