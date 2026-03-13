from django.contrib import admin

from .models import ProjectRecommendation


@admin.register(ProjectRecommendation)
class ProjectRecommendationAdmin(admin.ModelAdmin):
    list_display = ("title", "difficulty", "featured")
    search_fields = ("title", "description")
    list_filter = ("difficulty", "featured")

