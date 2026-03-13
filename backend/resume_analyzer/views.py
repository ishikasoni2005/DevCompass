import redis
from django.conf import settings
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import ResumeAnalysisSerializer, ResumeUploadSerializer
from .services import ResumeAnalyzerService
from .tasks import refresh_resume_score


def can_enqueue_resume_refresh() -> bool:
    try:
        client = redis.Redis.from_url(
            settings.CELERY_BROKER_URL,
            socket_connect_timeout=0.2,
            socket_timeout=0.2,
        )
        return bool(client.ping())
    except Exception:
        return False


class ResumeAnalysisView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        serializer = ResumeUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        analysis = ResumeAnalyzerService.analyze(
            user=request.user,
            uploaded_file=serializer.validated_data["resume"],
            target_role=serializer.validated_data["target_role"],
        )
        if can_enqueue_resume_refresh():
            refresh_resume_score.delay(analysis.id)
        return Response(
            ResumeAnalysisSerializer(analysis).data,
            status=status.HTTP_201_CREATED,
        )
