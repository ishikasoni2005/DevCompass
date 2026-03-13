from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .services import DashboardService


class DashboardView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        return Response(DashboardService.build_for_user(request.user))

