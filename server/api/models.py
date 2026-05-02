from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class CustomUser(models.Model):
    """Utilisateur personnalisé pour GenieCalc"""
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.user.email


class Calculation(models.Model):
    """Historique des calculs"""
    CALCULATION_TYPES = [
        ('volume-beton', 'Volume Béton'),
        ('volume-sable', 'Volume Sable'),
        ('volume-ciment', 'Volume Ciment'),
        ('surface', 'Surface'),
        ('longueur', 'Longueur'),
        ('conversion', 'Conversion'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='calculations')
    calculation_type = models.CharField(max_length=50, choices=CALCULATION_TYPES)
    inputs = models.JSONField()  # Ex: {'longueur': 10, 'largeur': 5, 'hauteur': 2}
    result = models.FloatField()
    unit = models.CharField(max_length=20, default='m3')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', '-created_at']),
        ]

    def __str__(self):
        return f"{self.user.email} - {self.calculation_type} ({self.created_at})"
