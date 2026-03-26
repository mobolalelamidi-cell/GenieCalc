import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common';
import { Calculator, TrendingUp, Zap, Shield } from 'lucide-react';

export const Home = () => {
  const features = [
    {
      icon: Calculator,
      title: 'Calculs Rapides',
      description: 'Effectuez des calculs techniques complexes en quelques secondes avec précision.',
    },
    {
      icon: Zap,
      title: 'Interface Intuitive',
      description: 'Une interface moderne et facile à utiliser, sans complications inutiles.',
    },
    {
      icon: TrendingUp,
      title: 'Historique Complet',
      description: 'Conservez un historique de tous vos calculs pour une traçabilité totale.',
    },
    {
      icon: Shield,
      title: 'Données Sécurisées',
      description: 'Vos données sont protégées et restent confidentielles.',
    },
  ];

  const calculators = [
    {
      icon: '📦',
      title: 'Volume de Béton',
      description: 'Calcul du volume de béton pour vos projets',
    },
    {
      icon: '🏗️',
      title: 'Poutres',
      description: 'Analyse et calcul des poutres acier et béton',
    },
    {
      icon: '🌳',
      title: 'Poteaux',
      description: 'Dimensionnement des poteaux et colonnes',
    },
    {
      icon: '🔨',
      title: 'Fondations',
      description: 'Calculs pour les fondations superficielles et profondes',
    },
    {
      icon: '⚖️',
      title: 'Charges',
      description: 'Distribution et analyse des charges',
    },
    {
      icon: '📐',
      title: 'Plus de Calculs',
      description: 'Accédez à tous les modules disponibles',
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="content-width centered text-center">
          <h1 className="hero-title">
            Calculs Techniques
            <span className="hero-title-highlight"> Simplifiés</span>
          </h1>
          <p className="hero-subtitle">
            GenieCalc est votre assistant de calcul pour le génie civil. Des formules complexes et des résultats précis en quelques clics.
          </p>

          {/* CTA Buttons */}
          <div className="cta-row">
            <Link to="/dashboard">
              <Button size="lg" className="cta-button">
                Commencer Maintenant
              </Button>
            </Link>
            <Button variant="secondary" size="lg" className="cta-button">
              En Savoir Plus
            </Button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="hero-image">
            <div className="hero-image-inner">
              <Calculator className="hero-icon" />
              <p className="hero-caption">Interface moderne et intuitive</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="content-width centered">
          <div className="section-header">
            <h2>Pourquoi Choisir GenieCalc?</h2>
            <p>Les meilleures fonctionnalités pour les ingénieurs modernes</p>
          </div>

          <div className="features-grid">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div key={feature.title} className="feature-card">
                  <div className="feature-icon-container">
                    <IconComponent className="feature-icon" />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Calculators Section */}
      <section className="calculators-section">
        <div className="content-width centered">
          <div className="section-header">
            <h2>Nos Modules de Calcul</h2>
            <p>Une suite complète d'outils pour tous vos besoins en génie civil</p>
          </div>

          <div className="calculators-grid">
            {calculators.map((calc) => (
              <Link key={calc.title} to={`/calculator/${calc.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                <div className="calculator-card">
                  <div className="calculator-icon">{calc.icon}</div>
                  <h3>{calc.title}</h3>
                  <p>{calc.description}</p>
                  <div className="calculator-link">Accéder →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="content-width centered text-center">
          <h2>Prêt à Commencer?</h2>
          <p>Accédez à tous les modules de calcul et simplifiez votre travail d'ingénieur.</p>
          <Link to="/dashboard">
            <Button variant="secondary" size="lg">Accéder au Dashboard</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
