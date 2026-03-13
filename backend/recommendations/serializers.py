from rest_framework import serializers

from .models import ProjectRecommendation


class ProjectRecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectRecommendation
        fields = (
            "id",
            "title",
            "slug",
            "difficulty",
            "description",
            "tech_stack",
            "estimated_duration_weeks",
            "learning_outcomes",
            "target_skills",
            "featured",
        )

