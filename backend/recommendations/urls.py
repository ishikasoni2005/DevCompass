from django.urls import path

from .views import ProjectRecommendationListView

urlpatterns = [
    path("projects", ProjectRecommendationListView.as_view(), name="projects"),
]

