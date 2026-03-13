from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Roadmap
from .serializers import GenerateRoadmapSerializer, RoadmapSerializer
from .services import RoadmapService


class GenerateRoadmapView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        serializer = GenerateRoadmapSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        roadmap = RoadmapService.generate_for_user(
            user=request.user,
            career_goal=serializer.validated_data["career_goal"],
            current_skills=serializer.validated_data["current_skills"],
            experience_level=serializer.validated_data["experience_level"],
        )
        return Response(
            RoadmapSerializer(roadmap).data,
            status=status.HTTP_201_CREATED,
        )


class UserRoadmapView(generics.ListAPIView):
    serializer_class = RoadmapSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Roadmap.objects.filter(user=self.request.user).prefetch_related(
            "milestones"
        )

