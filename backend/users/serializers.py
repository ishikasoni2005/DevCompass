from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "name",
            "email",
            "skills",
            "career_goal",
            "experience_level",
            "bio",
            "github_username",
            "leetcode_username",
            "codeforces_username",
            "date_joined",
        )
        read_only_fields = ("id", "email", "date_joined")


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = (
            "id",
            "name",
            "email",
            "password",
            "skills",
            "career_goal",
            "experience_level",
            "bio",
            "github_username",
            "leetcode_username",
            "codeforces_username",
        )
        read_only_fields = ("id",)

    def create(self, validated_data):
        password = validated_data.pop("password")
        return User.objects.create_user(password=password, **validated_data)


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "name",
            "skills",
            "career_goal",
            "experience_level",
            "bio",
            "github_username",
            "leetcode_username",
            "codeforces_username",
        )


class DevCompassTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["name"] = user.name
        token["career_goal"] = user.career_goal
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["user"] = UserSerializer(self.user).data
        return data

