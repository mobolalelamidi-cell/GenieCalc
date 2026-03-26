import React, { useState } from 'react';
import { Card, Button } from '../components/common';
import { Trash2, Download } from 'lucide-react';

export const History = () => {
  // Initialize history with mock data (using static values to avoid impure function calls)
  const mockHistoryData = [
    {
      id: 1,
      type: 'Volume de Béton',
      inputs: { length: 5, width: 3, height: 0.5 },
      result: 7.5,
      unit: 'm³',
      timestamp: new Date('2026-03-26T10:07:00'),
    },
    {
      id: 2,
      type: 'Poutres',
      inputs: { length: 8, load: 12 },
      result: 96.0,
      unit: 'kN.m',
      timestamp: new Date('2026-03-26T08:07:00'),
    },
    {
      id: 3,
      type: 'Fondations',
      inputs: { load: 500, bearing_capacity: 250 },
      result: 1.2,
      unit: 'm²',
      timestamp: new Date('2026-03-25T14:07:00'),
    },
  ];

  const [history, setHistory] = useState(mockHistoryData);

  const handleDelete = (id) => {
    setHistory(history.filter(item => item.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer tout l\'historique?')) {
      setHistory([]);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="history-page">
      <div className="content-width">
        <div className="history-header">
          <h1>Historique des Calculs</h1>
          {history.length > 0 && (
            <Button onClick={handleClearAll} variant="secondary" className="btn-sm">
              <Trash2 /> Effacer tout
            </Button>
          )}
        </div>
        <p className="history-subtitle">Consultez vos calculs précédents et réutilisez-les</p>

        {/* History List */}
        {history.length === 0 ? (
          <Card className="empty-history">
            <p>Aucun calcul dans l'historique pour le moment</p>
            <p>Vos calculs apparaîtront ici une fois que vous en aurez effectué</p>
          </Card>
        ) : (
          <div className="history-list">
            {history.map((item) => (
              <Card key={item.id} className="history-entry">
                <div>
                  <h3>{item.type}</h3>
                  <div>
                    <p>Paramètres:</p>
                    <div className="input-tags">
                      {Object.entries(item.inputs).map(([key, value]) => (
                        <span key={key} className="input-tag">{key}: {value}</span>
                      ))}
                    </div>
                  </div>
                  <p className="timestamp">{formatDate(item.timestamp)}</p>
                </div>

                <div className="entry-right">
                  <div className="result-block">
                    <p>{item.result}</p>
                    <p>{item.unit}</p>
                  </div>
                  <div className="entry-actions">
                    <Button variant="secondary" size="sm">Télécharger</Button>
                    <Button variant="secondary" size="sm" onClick={() => handleDelete(item.id)}>Supprimer</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Statistics */}
        {history.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {history.length}
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Calculs effectués
              </p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {new Set(history.map(h => h.type)).size}
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Types différents
              </p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {(() => {
                  const now = new Date();
                  const firstTime = Math.min(...history.map(h => h.timestamp.getTime()));
                  return Math.round((now.getTime() - firstTime) / 86400000);
                })()}d
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Depuis le premier calcul
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
