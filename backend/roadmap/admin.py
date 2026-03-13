from django.contrib import admin

from .models import Roadmap, RoadmapMilestone


class RoadmapMilestoneInline(admin.TabularInline):
    model = RoadmapMilestone
    extra = 1


@admin.register(Roadmap)
class RoadmapAdmin(admin.ModelAdmin):
    list_display = ("goal", "user", "experience_level", "created_at")
    search_fields = ("goal", "user__email", "user__name")
    inlines = [RoadmapMilestoneInline]

