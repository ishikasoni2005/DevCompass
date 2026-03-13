from django.conf import settings
from django.db import models


class Roadmap(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="roadmaps"
    )
    goal = models.CharField(max_length=255)
    summary = models.TextField()
    experience_level = models.CharField(max_length=20)
    recommended_technologies = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self) -> str:
        return f"{self.user.email} - {self.goal}"


class RoadmapMilestone(models.Model):
    roadmap = models.ForeignKey(
        Roadmap, on_delete=models.CASCADE, related_name="milestones"
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    week_start = models.PositiveIntegerField()
    week_end = models.PositiveIntegerField()
    resources = models.JSONField(default=list, blank=True)
    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ("order", "week_start")

    def __str__(self) -> str:
        return self.title

