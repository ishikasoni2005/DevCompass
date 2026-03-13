from django.conf import settings
from django.db import models


class LearningProgress(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="learning_progress",
    )
    course = models.ForeignKey(
        "courses.Course",
        on_delete=models.CASCADE,
        related_name="progress_entries",
    )
    completion_percentage = models.PositiveIntegerField(default=0)
    completed_lessons = models.JSONField(default=list, blank=True)
    last_activity_at = models.DateTimeField(auto_now=True)
    is_completed = models.BooleanField(default=False)

    class Meta:
        unique_together = ("user", "course")
        ordering = ("-last_activity_at",)

    def __str__(self) -> str:
        return f"{self.user.email} - {self.course.title}"


class SkillSnapshot(models.Model):
    class Source(models.TextChoices):
        LEETCODE = "leetcode", "LeetCode"
        CODEFORCES = "codeforces", "Codeforces"
        GITHUB = "github", "GitHub"
        MANUAL = "manual", "Manual"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="skill_snapshots"
    )
    source = models.CharField(max_length=20, choices=Source.choices)
    summary = models.JSONField(default=dict, blank=True)
    topic_scores = models.JSONField(default=dict, blank=True)
    weekly_activity = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self) -> str:
        return f"{self.user.email} - {self.source}"

