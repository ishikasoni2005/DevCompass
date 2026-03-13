from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("users.urls")),
    path("api/", include("courses.urls")),
    path("api/", include("roadmap.urls")),
    path("api/", include("recommendations.urls")),
    path("api/", include("analytics.urls")),
    path("api/", include("resume_analyzer.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

