import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/common';
import { ArrowRight } from 'lucide-react';

export const Dashboard = () => {
  const modules = [
    {
      id: 'volume-beton',
      icon: '📦',
      title: 'Volume de Béton',
      description: 'Calculez le volume de béton nécessaire pour vos coulages',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'poutres',
      icon: '🏗️',
      title: 'Poutres',
      description: 'Analyse et dimensionnement des poutres en acier et béton armé',
      color: 'from-amber-500 to-orange-600',
    },
    {
      id: 'poteaux',
      icon: '🌳',
      title: 'Poteaux',
      description: 'Calcul du dimensionnement des poteaux et colonnes',
      color: 'from-green-500 to-emerald-600',
    },
    {
      id: 'fondations',
      icon: '🔨',
      title: 'Fondations',
      description: 'Dimensionnement des fondations superficielles et profondes',
      color: 'from-red-500 to-rose-600',
    },
    {
      id: 'charges',
      icon: '⚖️',
      title: 'Charges',
      description: 'Distribution et analyse des charges structurelles',
      color: 'from-purple-500 to-violet-600',
    },
    {
      id: 'escaliers',
      icon: '🪜',
      title: 'Escaliers',
      description: 'Calcul des dimensions et des armatures d\'escalier',
      color: 'from-pink-500 to-rose-600',
    },
    {
      id: 'dalles',
      icon: '🧱',
      title: 'Dalles',
      description: 'Calcul du volume de dalle et de la surface de bétonnage',
      color: 'from-slate-500 to-slate-600',
    },
    {
      id: 'semelles',
      icon: '🦺',
      title: 'Semelles',
      description: 'Dimensionnement de semelles isolées selon charge et sol',
      color: 'from-cyan-500 to-teal-600',
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="content-width">
        <section className="hero-section">
          <div className="section-heading">
            <h1>Dashboard</h1>
            <p>Sélectionnez un module de calcul pour commencer</p>
          </div>
        </section>

        <div className="dashboard-grid">
          {modules.map((module) => (
            <Link key={module.id} to={`/calculatrice/${module.id}`}>
              <div className="module-card">
                <div className="module-icon">{module.icon}</div>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
                <div className="module-action">
                  Accéder <ArrowRight className="arrow-icon" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="stats-grid">
          <Card className="stat-card">
            <div className="stat-title">1,250+</div>
            <p>Calculs réalisés cette semaine</p>
          </Card>
          <Card className="stat-card">
            <div className="stat-title">98%</div>
            <p>Précision garantie</p>
          </Card>
          <Card className="stat-card">
            <div className="stat-title">24/7</div>
            <p>Disponibilité totale</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
