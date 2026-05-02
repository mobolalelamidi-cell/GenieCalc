# Backend GenieCalc

API Django REST pour l'application GenieCalc avec PostgreSQL.

## Architecture MVC

- **Models** (`api/models.py`) : `CustomUser`, `Calculation`
- **Views** (`api/views.py`) : `AuthViewSet`, `UserViewSet`, `CalculationViewSet`
- **Serializers** (`api/serializers.py`) : Sérialisation des données JSON
- **URLs** (`api/urls.py`) : Routage des endpoints API

## Installation

### 1. Prérequis

- Python 3.8+
- PostgreSQL 12+
- pip

### 2. Configuration

```bash
# Naviguer vers le dossier server
cd server

# Créer un environnement virtuel (optionnel)
python -m venv venv

# Installer les dépendances
pip install -r requirements.txt

# Copier le fichier .env
cp .env.example .env

# Éditer .env avec vos paramètres PostgreSQL
```

### 3. Base de données

```bash
# Créer la base de données PostgreSQL
createdb geniecalc_db

# Faire les migrations
python manage.py migrate

# Créer un utilisateur administrateur
python manage.py createsuperuser
```

### 4. Lancer le serveur

```bash
python manage.py runserver
```

Le serveur démarre sur `http://localhost:8000`

## Endpoints API

### Authentication

- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion

### Utilisateurs

- `GET /api/users/me/` - Infos utilisateur connecté

### Calculs

- `GET /api/calculations/` - Liste des calculs
- `POST /api/calculations/` - Créer un calcul
- `GET /api/calculations/{id}/` - Détails d'un calcul
- `DELETE /api/calculations/{id}/` - Supprimer un calcul
- `GET /api/calculations/history/` - Historique complet
- `POST /api/calculations/clear_history/` - Effacer l'historique
- `GET /api/calculations/stats/` - Statistiques des calculs

## Modèles

### User (Django Default)
- id
- username
- email
- password
- first_name
- last_name

### Calculation
- id
- user (FK)
- calculation_type
- inputs (JSON)
- result
- unit
- created_at
- updated_at

## Authentication

L'API utilise **Token Authentication**. À chaque requête, inclure le header :

```
Authorization: Token YOUR_TOKEN_HERE
```

## Technologies

- Django 6.0
- Django REST Framework 3.17
- PostgreSQL 12+
- python-jose (JWT)
- passlib (Password hashing)
