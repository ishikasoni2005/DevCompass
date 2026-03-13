from rest_framework import serializers

from .models import ResumeAnalysis


class ResumeAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeAnalysis
        fields = (
            "id",
            "original_filename",
            "extracted_skills",
            "missing_skills",
            "suggested_improvements",
            "score",
            "created_at",
        )


class ResumeUploadSerializer(serializers.Serializer):
    resume = serializers.FileField()
    target_role = serializers.CharField(max_length=255)

