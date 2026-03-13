from django.conf import settings
from django.db import models


class ResumeAnalysis(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="resume_analyses"
    )
    resume = models.FileField(upload_to="resumes/")
    original_filename = models.CharField(max_length=255)
    extracted_text = models.TextField(blank=True)
    extracted_skills = models.JSONField(default=list, blank=True)
    missing_skills = models.JSONField(default=list, blank=True)
    suggested_improvements = models.JSONField(default=list, blank=True)
    score = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self) -> str:
        return f"{self.user.email} - {self.original_filename}"

