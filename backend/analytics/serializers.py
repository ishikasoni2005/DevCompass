from rest_framework import serializers

from .models import LearningProgress, SkillSnapshot


class LearningProgressSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source="course.title", read_only=True)

    class Meta:
        model = LearningProgress
        fields = (
            "id",
            "course",
            "course_title",
            "completion_percentage",
            "completed_lessons",
            "last_activity_at",
            "is_completed",
        )


class SkillSnapshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillSnapshot
        fields = ("id", "source", "summary", "topic_scores", "weekly_activity", "created_at")

