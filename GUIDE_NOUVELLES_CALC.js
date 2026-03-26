/**
 * ============================================
 * GUIDE: AJOUTER UNE NOUVELLE CALCULATRICE
 * ============================================
 */

/**
 * Le système est déjà prêt pour accueillir de nouvelles calculatrices!
 * Voici comment ajouter une nouvelle sans modifier le code existant.
 */

// ============================================
// ÉTAPE 1: Ajouter la calculatrice à Calculator.jsx
// ============================================

/*
Ouvrez: src/pages/Calculator.jsx

Trouvez: const calculatorDefinitions = { ... }

Ajoutez votre calculatrice AVANT la dernière accolade:

  'ma-nouvelle-calc': {
    title: 'Titre de ma calculatrice',
    description: 'Description courte',
    fields: [
      { name: 'field1', label: 'Libellé 1', type: 'number', step: 0.01 },
      { name: 'field2', label: 'Libellé 2', type: 'number', step: 0.1 },
    ],
    calculate: (values) => {
      const { field1, field2 } = values;
      const result = field1 * field2;
      return result.toFixed(2);
    },
    unit: 'unité',
  },
*/

// ============================================
// ÉTAPE 2: Ajouter le module au Dashboard
// ============================================

/*
Ouvrez: src/pages/Dashboard.jsx

Trouvez: const modules = [ ... ]

Ajoutez votre module AVANT la dernière accolade:

  {
    id: 'ma-nouvelle-calc',
    icon: '📊', // Emoji ou autre
    title: 'Titre de ma calculatrice',
    description: 'Description courte',
    color: 'from-teal-500 to-cyan-600', // Classes Tailwind gradient
  },
*/

// ============================================
// EXEMPLE COMPLET: Calculatrice de Béton Armé
// ============================================

const betonArmeExample = {
  // 1. Pour Calculator.jsx - dans calculatorDefinitions:
  'beton-arme': {
    title: 'Béton Armé - Dimensionnement',
    description: 'Calcul des armatures pour béton armé',
    fields: [
      { name: 'moment', label: 'Moment de flexion (kN.m)', type: 'number', step: 0.1 },
      { name: 'fck', label: 'Résistance béton fck (MPa)', type: 'number', step: 1, placeholder: '25' },
      { name: 'fy', label: 'Limite élastique fy (MPa)', type: 'number', step: 1, placeholder: '500' },
      { name: 'd', label: 'Hauteur utile d (cm)', type: 'number', step: 0.5 },
    ],
    calculate: (values) => {
      const { moment, fck, fy, d } = values;
      if (!moment || !fck || !fy || !d) return '0';
      
      // Formule simplifiée (réelle = plus complexe)
      const M = moment * 1e6; // Conversion en N.mm
      const Ast = (M / (0.87 * fy * d * 10)) / 100; // Résultat en cm²
      
      return Ast.toFixed(2);
    },
    unit: 'cm²',
  },

  // 2. Pour Dashboard.jsx - dans modules:
  dashboard: {
    id: 'beton-arme',
    icon: '🧱',
    title: 'Béton Armé',
    description: 'Dimensionnement des armatures BA',
    color: 'from-lime-500 to-green-600',
  },
};

// ============================================
// EXEMPLE 2: Calcul de Tassement de Sol
// ============================================

const tasementSolExample = {
  // Pour Calculator.jsx:
  'tassement-sol': {
    title: 'Tassement de Sol',
    description: 'Estimation du tassement du sol sous charge',
    fields: [
      { name: 'charge', label: 'Charge (kN/m²)', type: 'number', step: 1 },
      { name: 'profondeur', label: 'Profondeur de la couche (m)', type: 'number', step: 0.1 },
      { name: 'ei', label: 'Indice des vides initial (e₀)', type: 'number', step: 0.01, placeholder: '0.8' },
      { name: 'cc', label: 'Coefficient de compression (Cc)', type: 'number', step: 0.01, placeholder: '0.35' },
      { name: 'sigma_init', label: 'Contrainte initiale (kPa)', type: 'number', step: 1 },
    ],
    calculate: (values) => {
      const { charge, profondeur, ei, cc, sigma_init } = values;
      if (!charge || !profondeur || !ei || !cc || !sigma_init) return '0';
      
      const sigma_final = sigma_init + charge;
      const delta_h = (cc * profondeur * 1000 / (1 + ei)) * 
                      Math.log10(sigma_final / sigma_init);
      
      return Math.max(0, delta_h).toFixed(3);
    },
    unit: 'mm',
  },

  // Pour Dashboard.jsx:
  dashboard: {
    id: 'tassement-sol',
    icon: '🌏',
    title: 'Tassement de Sol',
    description: 'Calcul du tassement du sol',
    color: 'from-yellow-500 to-orange-600',
  },
};

// ============================================
// BONNES PRATIQUES
// ============================================

/*
✅ À FAIRE:
  - Garder les formules simples et testées
  - Ajouter des validations (valeurs > 0, etc.)
  - Utiliser .toFixed(2) pour 2 décimales
  - Choisir des emojis appropriés
  - Utiliser des couleurs de gradient cohérentes
  - Ajouter des placeholders utiles

❌ À ÉVITER:
  - Formules complexes non documentées
  - Ne pas valider les inputs
  - Résultats avec trop de décimales
  - Noms de variables peu clairs
  - Oublier de mettre à jour le Dashboard
*/

// ============================================
// COULEURS DE GRADIENT DISPONIBLES (Tailwind)
// ============================================

const gradients = `
  from-blue-500 to-blue-600
  from-red-500 to-rose-600
  from-green-500 to-emerald-600
  from-amber-500 to-orange-600
  from-purple-500 to-violet-600
  from-pink-500 to-rose-600
  from-cyan-500 to-blue-600
  from-teal-500 to-cyan-600
  from-lime-500 to-green-600
  from-yellow-500 to-orange-600
  from-indigo-500 to-purple-600
  from-fuchsia-500 to-pink-600
`;

// ============================================
// ÉTAPES POUR TESTER
// ============================================

/*
1. Modifiez Calculator.jsx et Dashboard.jsx
2. Sauvegardez (Ctrl+S)
3. L'app va hot-reload automatiquement
4. Allez sur http://localhost:5173/dashboard
5. Cliquez sur votre nouveau module pour tester
6. Vérifiez que la calculatrice fonctionne correctement
7. Testez les cas limites (zéro, valeurs négatives, etc.)
*/

// ============================================
// AIDE POUR LES FORMULES GÉNIE CIVIL
// ============================================

/*
RÉSISTANCE DES MATÉRIAUX:
  - Flexion: M = (σ × I) / y
  - Torsion: τ = (T × r) / Ip
  - Contrainte: σ = F / A

BÉTON ARMÉ:
  - Ast = M / (0.87 × fy × d)
  - Mu = 0.33 × fck × b × d²
  - Shear: Vu = τc × b × d

GÉOTECHNIQUE:
  - Tassement: Δh = (Cc × H) / (1+e₀) × log(σ'/σ₀)
  - Capacité portante: qf = (p × Nc) + (γ × H × Nq) + (0.5 × γ × B × Nγ)
  - Indice de stabilité: FS = Somme résistances / Somme moteurs

HYDRAULIQUE:
  - Débit: Q = V × A
  - Perte: hf = f × (L/D) × (V²/2g)
  - Reynolds: Re = (ρ × V × D) / μ
*/

export default { betonArmeExample, tasementSolExample, gradients };
