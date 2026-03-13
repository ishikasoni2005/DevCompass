from django.db import models
from django.utils.text import slugify


class ProjectRecommendation(models.Model):
    class Difficulty(models.TextChoices):
        BEGINNER = "beginner", "Beginner"
        INTERMEDIATE = "intermediate", "Intermediate"
        ADVANCED = "advanced", "Advanced"

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    difficulty = models.CharField(max_length=20, choices=Difficulty.choices)
    description = models.TextField()
    tech_stack = models.JSONField(default=list, blank=True)
    estimated_duration_weeks = models.PositiveIntegerField(default=2)
    learning_outcomes = models.JSONField(default=list, blank=True)
    target_skills = models.JSONField(default=list, blank=True)
    featured = models.BooleanField(default=False)

    class Meta:
        ordering = ("difficulty", "title")

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.title

