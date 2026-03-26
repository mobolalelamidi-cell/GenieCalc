# GUIDE DE PERSONNALISATION - GenieCalc

## 🎨 Personnaliser les Couleurs

### Modifier la couleur primaire

**Fichier:** `tailwind.config.js`

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        500: '#0ea5e9',  // ← Modifier cette couleur
        600: '#0284c7',  // ← Ou celle-ci (main)
        700: '#0369a1',
        900: '#082f49',
      },
```

**Exemples de palettes:**

```javascript
// Palette Orange (Moderne)
primary: {
  600: '#f97316',  // Orange vibrant
}

// Palette Vert (Nature)
primary: {
  600: '#16a34a',  // Vert frais
}

// Palette Violet (Premium)
primary: {
  600: '#9333ea',  // Violet sophistiqué
}

// Palette Teal (Tech)
primary: {
  600: '#0891b2',  // Teal moderne
}
```

## 🏢 Personnaliser l'Identité de l'Entreprise

### Changer le nom du logo

**Fichier:** `src/components/Navigation.jsx` (ligne ~20)

```javascript
// Avant:
<span className="text-xl font-bold text-slate-900 dark:text-white hidden sm:inline">
  GenieCalc
</span>

// Après:
<span className="text-xl font-bold text-slate-900 dark:text-white hidden sm:inline">
  Mon Entreprise
</span>
```

### Changer le logo (icône G)

Modifier la `<div>` avec la classe `bg-gradient-to-br`:

```javascript
// Avant:
<div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
  G
</div>

// Après (avec image):
<img src="/logo.png" alt="Logo" className="w-8 h-8" />
```

## 🎯 Modifier le Contenu de la Page d'Accueil

### Changer le titre principal

**Fichier:** `src/pages/Home.jsx` (ligne ~27)

```javascript
// Avant:
<h1 className="text-5xl md:text-6xl font-bold...">
  Calculs Techniques
  <span className="text-primary-600">Simplifiés</span>
</h1>

// Après:
<h1 className="text-5xl md:text-6xl font-bold...">
  Solutions d'Ingénierie
  <span className="text-primary-600">Professionnelles</span>
</h1>
```

### Changer la description

```javascript
// Avant:
<p className="text-xl text-slate-600...">
  GenieCalc est votre assistant de calcul...
</p>

// Après:
<p className="text-xl text-slate-600...">
  La plateforme #1 pour les ingénieurs en génie civil en France...
</p>
```

### Modifier les fonctionnalités (features)

**Fichier:** `src/pages/Home.jsx` (ligne ~51)

```javascript
const features = [
  {
    icon: Calculator,
    title: "Calculs Rapides", // ← À changer
    description:
      "Effectuez des calculs techniques complexes en quelques secondes avec précision.",
  },
  // Ajouter plus d'éléments...
];
```

## 📊 Ajouter des Modules de Calcul Personnalisés

### Exemple: Ajouter "Calcul de Dalle"

**Fichier:** `src/pages/Calculator.jsx`

```javascript
const calculatorDefinitions = {
  // ... calculatrices existantes ...

  dalle: {
    title: "Calcul de Dalle",
    description: "Dimensionnement des dalles béton",
    fields: [
      { name: "length", label: "Longueur (m)", type: "number", step: 0.01 },
      { name: "width", label: "Largeur (m)", type: "number", step: 0.01 },
      { name: "load", label: "Charge (kN/m²)", type: "number", step: 0.1 },
    ],
    calculate: (values) => {
      const { length, width, load } = values;
      const moment = (load * Math.pow(Math.min(length, width), 2)) / 12;
      return moment.toFixed(2);
    },
    unit: "kN.m/m",
  },
};
```

**Puis dans Dashboard.jsx, ajouter:**

```javascript
const modules = [
  // ... modules existants ...
  {
    id: "dalle",
    icon: "⬜",
    title: "Dalle",
    description: "Dimensionnement des dalles béton",
    color: "from-slate-500 to-slate-600",
  },
];
```

## 🌙 Personnaliser le Mode Sombre

### Forcer le mode sombre par défaut

**Fichier:** `tailwind.config.js`

```javascript
export default {
  darkMode: "class", // ← Autoriser la classe .dark
  // ... rest of config
};
```

Puis dans `src/App.jsx`:

```javascript
export default function App() {
  return (
    <div className="dark">
      {" "}
      {/* ← Ajouter la classe dark */}
      <Router>{/* ... rest of app ... */}</Router>
    </div>
  );
}
```

## 📱 Personnaliser la Navigation

### Ajouter des liens de navigation

**Fichier:** `src/components/Navigation.jsx` (ligne ~13)

```javascript
const navLinks = [
  { path: "/", label: "Accueil" },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/calculatrice", label: "Calculatrice" },
  { path: "/historique", label: "Historique" },
  { path: "/contact", label: "Contact" }, // ← Ajouter
  { path: "/docs", label: "Documentation" }, // ← Ajouter
];
```

## 🔤 Changer les Polices

### Modifier la police par défaut

**Fichier:** `src/index.css`

```css
body {
  font-family: "Monospace New", monospace; /* ← Changer */
}
```

Ou via **tailwind.config.js**:

```javascript
theme: {
  extend: {
    fontFamily: {
      sans: ['Poppins', 'system-ui', 'sans-serif'],  // ← Ajouter Poppins
      serif: ['Playfair Display', 'serif'],
      mono: ['Fira Code', 'monospace'],
    },
  },
}
```

## 🎬 Ajouter des Animations Personnalisées

**Fichier:** `src/App.css` ou `tailwind.config.js`

```css
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in-left {
  animation: slideInLeft 0.6s ease-out;
}
```

## 🚀 Déployer l'Application

### Build pour production

```bash
npm run build
```

Cela crée un dossier `dist/` prêt pour le déploiement.

### Options de déploiement

**Vercel** (Recommandé):

```bash
npm install -g vercel
vercel
```

**Netlify**:
Connectez votre repo GitHub et Netlify fera le déploiement automatique.

**GitHub Pages**:

```bash
npm install --save-dev gh-pages
# Puis configurer package.json
```

## 📝 Personnaliser le Pied de Page

**Fichier:** `src/components/Footer.jsx`

```javascript
// Modifier les liens
<a href="https://monsite.com">À propos</a>;

// Modifier les valeurs
const currentYear = new Date().getFullYear();

// Ajouter des sections
<div>
  <h3>Rubrique Personnalisée</h3>
  <ul>
    <li>
      <a href="#">Lien 1</a>
    </li>
    <li>
      <a href="#">Lien 2</a>
    </li>
  </ul>
</div>;
```

## 🎯 Verifier les Changements

Après chaque modification:

1. **Sauvegardez** le fichier (Ctrl+S)
2. **L'app hot-reload automatiquement** (grâce à Vite)
3. **Vérifiez** dans le navigateur
4. **Lintez** si nécessaire: `npm run lint`

## 🔗 Ressources Utiles

- **Tailwind Colors**: https://tailwindcss.com/docs/customizing-colors
- **Font Awesome Icons**: https://fontawesome.com/
- **Lucide Icons**: https://lucide.dev/
- **Color Picker**: https://color.adobe.com/

## 💡 Conseils Pro

✅ Toujours tester sur mobile  
✅ Vérifier le contraste des couleurs  
✅ Utiliser les variables CSS pour les couleurs  
✅ Garder une cohérence design  
✅ Documenter vos changements  
✅ Tester les performances

---

**Besoin d'aide?** Consultez les documentations:

- Tailwind CSS: https://tailwindcss.com/docs
- React Router: https://reactrouter.com/
- Vite: https://vitejs.dev/
