# GenieCalc - Calculatrice Technique pour Ingénieurs en Génie Civil

Une application web moderne, intuitive et professionnelle dédiée au calcul technique pour les ingénieurs en génie civil.

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 16+ installé
- npm ou yarn

### Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Accéder à l'application sur
# http://localhost:5173/
```

### Build pour Production

```bash
npm run build
npm run preview
```

## 📁 Structure du Projet

```
GenieCalc/
├── src/
│   ├── components/
│   │   ├── common/              # Composants réutilisables
│   │   │   ├── Button.jsx       # Boutons (3 variants, 3 sizes)
│   │   │   ├── Card.jsx         # Cartes avec shadow/hover
│   │   │   ├── Input.jsx        # Champs de saisie
│   │   │   └── index.js
│   │   ├── Navigation.jsx        # Barre de navigation responsive
│   │   └── Footer.jsx            # Pied de page
│   ├── pages/
│   │   ├── Home.jsx             # Accueil (hero + features)
│   │   ├── Dashboard.jsx        # Tableau de bord
│   │   ├── Calculator.jsx       # Calculatrice générique
│   │   └── History.jsx          # Historique
│   ├── hooks/                    # Réservé pour custom hooks
│   ├── utils/                    # Fonctions utilitaires
│   ├── App.jsx                   # Composant principal
│   ├── index.css                 # Styles globaux
│   ├── App.css                   # Styles personnalisés
│   └── main.jsx                  # Point d'entrée
├── tailwind.config.js            # Configuration Tailwind
├── postcss.config.js             # Configuration PostCSS
├── vite.config.js                # Configuration Vite
└── package.json                  # Dépendances
```

## 🎯 Pages Disponibles

### 🏠 Accueil (`/`)

- **Header Hero** - Présentation attrayante de l'application
- **Features Section** - 4 avantages principaux
- **Calculators Showcase** - Aperçu des 6 modules de calcul
- **CTA Section** - Appel à l'action vers le dashboard

### 📊 Dashboard (`/dashboard`)

- **Modules de Calcul** - 6 modules avec gradient colors:
  - 📦 Volume de Béton
  - 🏗️ Poutres
  - 🌳 Poteaux
  - 🔨 Fondations
  - ⚖️ Charges
  - 🪜 Escaliers
- **Statistiques Rapides** - KPIs d'utilisation

### 🧮 Calculatrice (`/calculator/:type`)

#### Volume de Béton

```
Inputs: Longueur (m), Largeur (m), Hauteur (m)
Résultat: Volume en m³
Formule: L × l × h
```

#### Poutres

```
Inputs: Portée (m), Charge (kN/m), Largeur (cm)
Résultat: Moment en kN.m
Formule: (Charge × Portée²) / 8
```

#### Poteaux

```
Inputs: Charge (kN), Hauteur (m), Enrobage (cm)
Résultat: Section d'acier en cm²
Formule: Charge / 20
```

#### Fondations

```
Inputs: Charge (kN), Capacité portante (kPa), Coefficient de sécurité
Résultat: Surface nécessaire en m²
Formule: (Charge × 1000) / (Capacité / Coef. Sécurité)
```

#### Charges

```
Inputs: Charge permanente (kN/m²), Charge exploitation (kN/m²), Surface (m²)
Résultat: Charge totale en kN
Formule: (Charge permanente + Charge exploitation) × Surface
```

### 📜 Historique (`/historique`)

- **Liste des Calculs** - Tous vos calculs précédents
- **Détails** - Type, paramètres, résultat, timestamp
- **Actions** - Copier résultat, télécharger PDF, supprimer
- **Statistiques** - Nombre de calculs, types, date de démarrage

## 🎨 Design System

### Couleurs

```
Primary (Bleu):
  - 50: #f0f9ff
  - 100: #e0f2fe
  - 500: #0ea5e9
  - 600: #0284c7 (main)
  - 700: #0369a1
  - 900: #082f49

Secondary (Violet):
  - 500: #8b5cf6
  - 600: #7c3aed
  - 700: #6d28d9
```

### Typographie

```
Font Family: Inter, Segoe UI, Roboto, sans-serif
h1: text-5xl md:text-6xl font-bold
h2: text-4xl font-bold
h3: text-xl font-semibold
body: text-base
```

### Composants

#### Button

```jsx
<Button variant="primary" size="lg">
  Texte du bouton
</Button>

// Variants: primary | secondary | tertiary
// Sizes: sm | md | lg
```

#### Card

```jsx
<Card className="p-6">Contenu de la carte</Card>
```

#### Input

```jsx
<Input
  label="Longueur"
  type="number"
  placeholder="Entrez une valeur"
  required
  onChange={handleChange}
/>
```

## 🌙 Dark Mode

L'application supporte automatiquement le mode sombre basé sur la préférence système.

## 📱 Responsive Design

- **Mobile** - Full responsive, hamburger menu
- **Tablet** - Layout optimisé
- **Desktop** - Layout complet avec navigation

## 🛠️ Technologies Utilisées

| Technologie  | Version | Usage               |
| ------------ | ------- | ------------------- |
| React        | 19.2.4  | Framework principal |
| Vite         | 8.0.0   | Build tool modern   |
| Tailwind CSS | Latest  | Styling             |
| React Router | Latest  | Navigation          |
| Lucide React | Latest  | Icônes              |
| PostCSS      | Latest  | CSS processing      |
| Autoprefixer | Latest  | Vendor prefixes     |

## 📦 Scripts Disponibles

```bash
# Développement
npm run dev        # Lancer dev server

# Production
npm run build      # Build optimisé
npm run preview    # Aperçu du build

# Qualité
npm run lint       # Vérifier linting
npm audit          # Check vulnerabilities
npm audit fix      # Fix vulnerabilities
```

## ✨ Fonctionnalités

✅ **Interface Moderne** - Design épuré avec Tailwind CSS  
✅ **Responsive** - Mobile-first, adapté tous les appareils  
✅ **Dark Mode** - Support du mode sombre  
✅ **Navigation Fluide** - React Router pour transitions rapides  
✅ **Calculs Dynamiques** - Formulaires adaptatifs par type  
✅ **Historique** - Sauvegarde locale des calculs  
✅ **Icônes Modernes** - Lucide React  
✅ **Composants Réutilisables** - Code DRY (Don't Repeat Yourself)  
✅ **Accessibilité** - Sémantique HTML5, ARIA labels  
✅ **Performance** - Vite + optimisations React

## 🔄 Fonctionnalités à Venir

- [ ] Persistance localStorage pour l'historique
- [ ] Intégration API backend
- [ ] Authentification utilisateur
- [ ] Export PDF des résultats
- [ ] Calculs plus avancés
- [ ] Système de notes/annotations
- [ ] Collaboration en temps réel
- [ ] Tests unitaires
- [ ] Analytics
- [ ] Notifications push

## 🐛 Support & Debugging

### Le serveur ne démarre pas?

```bash
# Vérifier Node.js
node --version

# Réinstaller dépendances
rm -r node_modules
npm install

# Vider cache Vite
rm -r .vite
npm run dev
```

### Problèmes Tailwind CSS?

Vérifiez que `tailwind.config.js` inclut tous les chemins vers vos fichiers JSX.

## 📝 Documentation Additionnelle

Voir `src/STRUCTURE.js` pour la documentation complète de la structure interne.

## 📄 Licence

MIT

## 👤 Auteur

Créé avec ❤️ pour les ingénieurs en génie civil.

---

**Besoin d'aide?** Consultez la documentation Tailwind (https://tailwindcss.com) ou React Router (https://reactrouter.com).
