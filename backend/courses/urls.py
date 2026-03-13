from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import CourseViewSet

router = DefaultRouter(trailing_slash=False)
router.register("courses", CourseViewSet, basename="courses")

course_detail = CourseViewSet.as_view({"get": "retrieve"})
course_progress = CourseViewSet.as_view({"get": "progress"})

urlpatterns = router.urls + [
    path("course/<int:pk>", course_detail, name="course-detail"),
    path("course/<int:pk>/progress", course_progress, name="course-progress"),
]

