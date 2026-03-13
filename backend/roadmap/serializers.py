from rest_framework import serializers

from .models import Roadmap, RoadmapMilestone


class RoadmapMilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoadmapMilestone
        fields = (
            "id",
            "title",
            "description",
            "week_start",
            "week_end",
            "resources",
            "order",
        )


class RoadmapSerializer(serializers.ModelSerializer):
    milestones = RoadmapMilestoneSerializer(many=True, read_only=True)

    class Meta:
        model = Roadmap
        fields = (
            "id",
            "goal",
            "summary",
            "experience_level",
            "recommended_technologies",
            "milestones",
            "created_at",
        )


class GenerateRoadmapSerializer(serializers.Serializer):
    career_goal = serializers.CharField(max_length=255)
    current_skills = serializers.ListField(
        child=serializers.CharField(max_length=100), allow_empty=True
    )
    experience_level = serializers.ChoiceField(
        choices=("beginner", "intermediate", "advanced")
    )

