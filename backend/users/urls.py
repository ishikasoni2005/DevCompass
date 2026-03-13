from django.urls import path

from .views import LoginView, ProfileView, RefreshTokenView, RegisterView

urlpatterns = [
    path("register", RegisterView.as_view(), name="register"),
    path("login", LoginView.as_view(), name="login"),
    path("login/refresh", RefreshTokenView.as_view(), name="login-refresh"),
    path("profile", ProfileView.as_view(), name="profile"),
]
