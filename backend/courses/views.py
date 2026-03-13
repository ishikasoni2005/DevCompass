from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from analytics.models import LearningProgress
from analytics.serializers import LearningProgressSerializer

from .models import Course
from .serializers import (
    CourseCreateUpdateSerializer,
    CourseDetailSerializer,
    CourseListSerializer,
)


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.filter(is_published=True).prefetch_related(
        "modules__lessons__quiz", "modules__lessons__coding_exercise"
    )

    def get_permissions(self):
        if self.action in {"create", "update", "partial_update", "destroy"}:
            permission_classes = (permissions.IsAdminUser,)
        else:
            permission_classes = (permissions.IsAuthenticated,)
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.action in {"create", "update", "partial_update"}:
            return CourseCreateUpdateSerializer
        if self.action == "retrieve":
            return CourseDetailSerializer
        return CourseListSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=True, methods=["get"], url_path="progress")
    def progress(self, request, pk=None):
        progress, _ = LearningProgress.objects.get_or_create(
            user=request.user, course=self.get_object()
        )
        return Response(LearningProgressSerializer(progress).data)

