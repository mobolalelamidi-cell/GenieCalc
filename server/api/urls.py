from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AuthViewSet, UserViewSet, CalculationViewSet

# Création du routeur
router = DefaultRouter()
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'users', UserViewSet, basename='users')
router.register(r'calculations', CalculationViewSet, basename='calculations')

# URLs
urlpatterns = [
    path('', include(router.urls)),
]
