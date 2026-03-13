from rest_framework import serializers

from .models import CodingExercise, Course, Lesson, Module, Quiz


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ("id", "questions", "answers", "passing_score")


class CodingExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodingExercise
        fields = ("id", "title", "prompt", "starter_code", "solution", "difficulty")


class LessonSerializer(serializers.ModelSerializer):
    quiz = QuizSerializer(read_only=True)
    coding_exercise = CodingExerciseSerializer(read_only=True)

    class Meta:
        model = Lesson
        fields = (
            "id",
            "title",
            "content",
            "video_url",
            "order",
            "duration_minutes",
            "lesson_type",
            "coding_prompt",
            "quiz",
            "coding_exercise",
        )


class ModuleSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)

    class Meta:
        model = Module
        fields = ("id", "title", "order", "summary", "lessons")


class CourseListSerializer(serializers.ModelSerializer):
    modules_count = serializers.IntegerField(source="modules.count", read_only=True)

    class Meta:
        model = Course
        fields = (
            "id",
            "title",
            "slug",
            "description",
            "difficulty",
            "category",
            "estimated_hours",
            "thumbnail_url",
            "tags",
            "modules_count",
        )


class CourseDetailSerializer(serializers.ModelSerializer):
    modules = ModuleSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = (
            "id",
            "title",
            "slug",
            "description",
            "difficulty",
            "category",
            "estimated_hours",
            "thumbnail_url",
            "tags",
            "modules",
        )


class CourseCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = (
            "id",
            "title",
            "description",
            "difficulty",
            "category",
            "estimated_hours",
            "thumbnail_url",
            "tags",
            "is_published",
        )

