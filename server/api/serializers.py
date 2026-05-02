from rest_framework import serializers
from django.contrib.auth.models import User
from .models import CustomUser, Calculation


class UserSerializer(serializers.ModelSerializer):
    """Serializer pour User"""
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id']


class CustomUserSerializer(serializers.ModelSerializer):
    """Serializer pour CustomUser"""
    user = UserSerializer(read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'user', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class CalculationSerializer(serializers.ModelSerializer):
    """Serializer pour Calculation"""
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Calculation
        fields = ['id', 'username', 'calculation_type', 'inputs', 'result', 'unit', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class RegistrationSerializer(serializers.Serializer):
    """Serializer pour l'inscription"""
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(min_length=6, write_only=True)
    password_confirm = serializers.CharField(min_length=6, write_only=True)

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Les mots de passe ne correspondent pas"})
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        CustomUser.objects.create(user=user)
        return user


class LoginSerializer(serializers.Serializer):
    """Serializer pour la connexion"""
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
