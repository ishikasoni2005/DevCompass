from django.contrib import admin

from .models import CodingExercise, Course, Lesson, Module, Quiz


class LessonInline(admin.TabularInline):
    model = Lesson
    extra = 1


class ModuleInline(admin.TabularInline):
    model = Module
    extra = 1


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("title", "difficulty", "category", "is_published")
    search_fields = ("title", "category", "description")
    list_filter = ("difficulty", "category", "is_published")
    inlines = [ModuleInline]


@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ("title", "course", "order")
    inlines = [LessonInline]


admin.site.register(Lesson)
admin.site.register(Quiz)
admin.site.register(CodingExercise)

