from django.conf import settings
from django.db import models
from django.utils.text import slugify


class Course(models.Model):
    class Difficulty(models.TextChoices):
        BEGINNER = "beginner", "Beginner"
        INTERMEDIATE = "intermediate", "Intermediate"
        ADVANCED = "advanced", "Advanced"

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    description = models.TextField()
    difficulty = models.CharField(max_length=20, choices=Difficulty.choices)
    category = models.CharField(max_length=100)
    estimated_hours = models.PositiveIntegerField(default=8)
    thumbnail_url = models.URLField(blank=True)
    tags = models.JSONField(default=list, blank=True)
    is_published = models.BooleanField(default=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="created_courses",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("title",)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.title


class Module(models.Model):
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="modules"
    )
    title = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=1)
    summary = models.TextField(blank=True)

    class Meta:
        ordering = ("order", "id")

    def __str__(self) -> str:
        return self.title


class Lesson(models.Model):
    class LessonType(models.TextChoices):
        VIDEO = "video", "Video"
        READING = "reading", "Reading"
        CODING = "coding", "Coding"

    module = models.ForeignKey(
        Module, on_delete=models.CASCADE, related_name="lessons"
    )
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True)
    video_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=1)
    duration_minutes = models.PositiveIntegerField(default=20)
    lesson_type = models.CharField(
        max_length=20,
        choices=LessonType.choices,
        default=LessonType.READING,
    )
    coding_prompt = models.TextField(blank=True)

    class Meta:
        ordering = ("order", "id")

    def __str__(self) -> str:
        return self.title


class Quiz(models.Model):
    lesson = models.OneToOneField(
        Lesson, on_delete=models.CASCADE, related_name="quiz"
    )
    questions = models.JSONField(default=list, blank=True)
    answers = models.JSONField(default=dict, blank=True)
    passing_score = models.PositiveIntegerField(default=70)

    def __str__(self) -> str:
        return f"Quiz for {self.lesson.title}"


class CodingExercise(models.Model):
    lesson = models.OneToOneField(
        Lesson, on_delete=models.CASCADE, related_name="coding_exercise"
    )
    title = models.CharField(max_length=255)
    prompt = models.TextField()
    starter_code = models.TextField(blank=True)
    solution = models.TextField(blank=True)
    difficulty = models.CharField(
        max_length=20,
        choices=Course.Difficulty.choices,
        default=Course.Difficulty.BEGINNER,
    )

    def __str__(self) -> str:
        return self.title

