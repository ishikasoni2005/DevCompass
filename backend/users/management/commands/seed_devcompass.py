from django.core.management.base import BaseCommand

from analytics.models import LearningProgress
from courses.models import CodingExercise, Course, Lesson, Module, Quiz
from recommendations.models import ProjectRecommendation
from users.models import User


class Command(BaseCommand):
    help = "Seed DevCompass with demo users, courses, progress, and project recommendations."

    def handle(self, *args, **options):
        admin_user, _ = User.objects.get_or_create(
            email="admin@devcompass.dev",
            defaults={
                "name": "DevCompass Admin",
                "career_goal": "Platform Admin",
                "experience_level": "advanced",
                "is_staff": True,
                "is_superuser": True,
                "skills": ["Django", "React", "PostgreSQL", "Docker"],
            },
        )
        admin_user.set_password("AdminPass123!")
        admin_user.save()

        demo_user, created = User.objects.get_or_create(
            email="demo@devcompass.dev",
            defaults={
                "name": "Demo Developer",
                "career_goal": "Backend Engineer",
                "experience_level": "intermediate",
                "skills": ["Python", "Django", "REST APIs", "Git"],
                "github_username": "demo-dev",
                "leetcode_username": "demo-dsa",
            },
        )
        demo_user.set_password("DemoPass123!")
        demo_user.save()

        course_data = [
            {
                "title": "Backend Engineer Sprint",
                "description": "Build robust APIs, model relational data, and ship with Docker and Celery.",
                "difficulty": "intermediate",
                "category": "Backend",
                "estimated_hours": 24,
                "tags": ["Python", "Django", "PostgreSQL", "Docker"],
                "modules": [
                    {
                        "title": "API Foundations",
                        "summary": "Authentication, serializers, and viewsets.",
                        "lessons": [
                            {
                                "title": "Designing RESTful APIs",
                                "content": "Model resources, status codes, and validation flows.",
                                "lesson_type": "reading",
                            },
                            {
                                "title": "JWT Authentication in Django",
                                "content": "Add secure access and refresh token flows to your API.",
                                "lesson_type": "video",
                                "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
                            },
                        ],
                    },
                    {
                        "title": "Scaling the Backend",
                        "summary": "Caching, task queues, and deployment ergonomics.",
                        "lessons": [
                            {
                                "title": "Redis and Celery",
                                "content": "Use background jobs to keep user-facing endpoints fast.",
                                "lesson_type": "coding",
                                "coding_prompt": "Create a Celery task that processes uploaded resumes.",
                            }
                        ],
                    },
                ],
            },
            {
                "title": "Full Stack Product Delivery",
                "description": "Pair React delivery skills with API integrations and analytics dashboards.",
                "difficulty": "intermediate",
                "category": "Full Stack",
                "estimated_hours": 20,
                "tags": ["React", "Routing", "Axios", "Recharts"],
                "modules": [
                    {
                        "title": "Frontend Architecture",
                        "summary": "Routing, state, and resilient data fetching.",
                        "lessons": [
                            {
                                "title": "Composing a Product Dashboard",
                                "content": "Use layouts, reusable cards, and chart-driven storytelling.",
                                "lesson_type": "reading",
                            }
                        ],
                    }
                ],
            },
        ]

        for course_item in course_data:
            course, _ = Course.objects.get_or_create(
                title=course_item["title"],
                defaults={
                    "description": course_item["description"],
                    "difficulty": course_item["difficulty"],
                    "category": course_item["category"],
                    "estimated_hours": course_item["estimated_hours"],
                    "tags": course_item["tags"],
                    "created_by": admin_user,
                },
            )

            if course.modules.exists():
                continue

            for module_index, module_item in enumerate(course_item["modules"], start=1):
                module = Module.objects.create(
                    course=course,
                    title=module_item["title"],
                    order=module_index,
                    summary=module_item["summary"],
                )

                for lesson_index, lesson_item in enumerate(module_item["lessons"], start=1):
                    lesson = Lesson.objects.create(
                        module=module,
                        title=lesson_item["title"],
                        content=lesson_item["content"],
                        video_url=lesson_item.get("video_url", ""),
                        order=lesson_index,
                        lesson_type=lesson_item["lesson_type"],
                        coding_prompt=lesson_item.get("coding_prompt", ""),
                    )
                    if lesson_index == 1:
                        Quiz.objects.get_or_create(
                            lesson=lesson,
                            defaults={
                                "questions": [
                                    {
                                        "question": "What does a serializer validate in DRF?",
                                        "options": ["Business objects", "Input/output payloads", "Docker images"],
                                    }
                                ],
                                "answers": {"0": "Input/output payloads"},
                            },
                        )
                    if lesson.lesson_type == "coding":
                        CodingExercise.objects.get_or_create(
                            lesson=lesson,
                            defaults={
                                "title": "Background Resume Processing",
                                "prompt": lesson.coding_prompt,
                                "starter_code": "from celery import shared_task\n\n@shared_task\ndef analyze_resume(file_path):\n    pass\n",
                                "difficulty": course.difficulty,
                            },
                        )

            LearningProgress.objects.get_or_create(
                user=demo_user,
                course=course,
                defaults={
                    "completion_percentage": 58 if course.category == "Backend" else 32,
                    "completed_lessons": [1],
                    "is_completed": False,
                },
            )

        project_data = [
            {
                "title": "Developer Habit Tracker API",
                "difficulty": "beginner",
                "description": "Build a REST API to log coding sessions, streaks, and habit insights.",
                "tech_stack": ["Python", "Django REST Framework", "PostgreSQL"],
                "learning_outcomes": ["CRUD APIs", "JWT auth", "relational modeling"],
                "target_skills": ["REST APIs", "Authentication"],
                "featured": True,
            },
            {
                "title": "Real-Time Pairing Board",
                "difficulty": "intermediate",
                "description": "Ship a collaborative planning board with presence indicators and async tasks.",
                "tech_stack": ["React", "Django", "Redis", "Docker"],
                "learning_outcomes": ["Realtime UX", "state management", "background jobs"],
                "target_skills": ["React", "Redis", "Celery"],
                "featured": True,
            },
            {
                "title": "Distributed Interview Simulator",
                "difficulty": "advanced",
                "description": "Design a multi-service interview practice platform with analytics and role-based prompts.",
                "tech_stack": ["Django", "PostgreSQL", "Redis", "Docker", "NLP"],
                "learning_outcomes": ["service boundaries", "observability", "ML integration"],
                "target_skills": ["System Design", "NLP", "Scalability"],
                "featured": True,
            },
        ]

        for project in project_data:
            ProjectRecommendation.objects.get_or_create(
                title=project["title"],
                defaults=project,
            )

        self.stdout.write(self.style.SUCCESS("DevCompass seed data created."))
