from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .models import CustomUser, Calculation
from .serializers import (
    UserSerializer,
    CustomUserSerializer,
    CalculationSerializer,
    RegistrationSerializer,
    LoginSerializer
)


class AuthViewSet(viewsets.ViewSet):
    """ViewSet pour l'authentification"""
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'], url_path='register')
    def register(self, request):
        """Enregistrement d'un nouvel utilisateur"""
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'message': 'Utilisateur créé avec succès',
                'token': token.key,
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='login')
    def login(self, request):
        """Connexion d'un utilisateur"""
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                username=serializer.validated_data['username'],
                password=serializer.validated_data['password']
            )
            if user is not None:
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    'message': 'Connexion réussie',
                    'token': token.key,
                    'user': UserSerializer(user).data
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'error': 'Identifiants invalides'
                }, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def logout(self, request):
        """Déconnexion d'un utilisateur"""
        request.user.auth_token.delete()
        return Response({'message': 'Déconnexion réussie'}, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet pour les utilisateurs (lecture seule)"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def me(self, request):
        """Récupère les infos de l'utilisateur connecté"""
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class CalculationViewSet(viewsets.ModelViewSet):
    """ViewSet pour les calculs"""
    serializer_class = CalculationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Retourne les calculs de l'utilisateur connecté"""
        return Calculation.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Crée un calcul pour l'utilisateur connecté"""
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def history(self, request):
        """Récupère l'historique des calculs"""
        calculations = self.get_queryset()
        serializer = self.get_serializer(calculations, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def clear_history(self, request):
        """Efface l'historique des calculs"""
        self.get_queryset().delete()
        return Response({'message': 'Historique effacé'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Récupère les statistiques des calculs"""
        calculations = self.get_queryset()
        stats = {
            'total': calculations.count(),
            'by_type': {}
        }
        for calc_type in ['volume-beton', 'volume-sable', 'volume-ciment', 'surface', 'longueur', 'conversion']:
            count = calculations.filter(calculation_type=calc_type).count()
            if count > 0:
                stats['by_type'][calc_type] = count
        return Response(stats)
