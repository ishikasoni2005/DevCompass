from django.urls import path

from .views import GenerateRoadmapView, UserRoadmapView

urlpatterns = [
    path("generate-roadmap", GenerateRoadmapView.as_view(), name="generate-roadmap"),
    path("user-roadmap", UserRoadmapView.as_view(), name="user-roadmap"),
]

