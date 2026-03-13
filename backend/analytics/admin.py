from django.contrib import admin

from .models import LearningProgress, SkillSnapshot

admin.site.register(LearningProgress)
admin.site.register(SkillSnapshot)

