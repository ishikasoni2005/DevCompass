from rest_framework import generics, permissions
from rest_framework.response import Response

from .models import ProjectRecommendation
from .serializers import ProjectRecommendationSerializer
from .services import RecommendationService


class ProjectRecommendationListView(generics.ListAPIView):
    serializer_class = ProjectRecommendationSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        queryset = ProjectRecommendation.objects.all()
        difficulty = self.request.query_params.get("difficulty")
        if difficulty:
            queryset = queryset.filter(difficulty=difficulty)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = list(self.get_queryset())
        ranked = RecommendationService.rank_for_user(request.user, queryset)
        serializer = self.get_serializer(ranked, many=True)
        return Response(serializer.data)

