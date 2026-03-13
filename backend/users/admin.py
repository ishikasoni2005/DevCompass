from django.contrib import admin

from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("email", "name", "experience_level", "is_staff", "is_active")
    search_fields = ("email", "name", "career_goal")
    list_filter = ("experience_level", "is_staff", "is_active")

