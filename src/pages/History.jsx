import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../components/common';
import { Trash2, Download } from 'lucide-react';

export const History = () => {
  const HISTORY_STORAGE_KEY = 'geniecalc_history';

  const mockHistoryData = [
    {
      id: 1,
      type: 'Volume de Béton',
      typeId: 'volume-beton',
      inputs: { length: 5, width: 3, height: 0.5 },
      result: 7.5,
      unit: 'm³',
      timestamp: new Date('2026-03-26T10:07:00'),
    },
    {
      id: 2,
      type: 'Poutres',
      typeId: 'poutres',
      inputs: { length: 8, load: 12 },
      result: 96.0,
      unit: 'kN.m',
      timestamp: new Date('2026-03-26T08:07:00'),
    },
    {
      id: 3,
      type: 'Fondations',
      typeId: 'fondations',
      inputs: { load: 500, bearing_capacity: 250 },
      result: 1.2,
      unit: 'm²',
      timestamp: new Date('2026-03-25T14:07:00'),
    },
  ];

  const navigate = useNavigate();

  const [history, setHistory] = useState(() => {
    const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw).map((item) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }));
      } catch {
        return mockHistoryData;
      }
    }
    return mockHistoryData;
  });

  const handleDelete = (id) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleClearAll = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer tout l\'historique?')) {
      setHistory([]);
      window.localStorage.removeItem(HISTORY_STORAGE_KEY);
    }
  };

  const handleRecalculate = (item) => {
    if (!item.typeId) {
      return;
    }

    navigate(`/calculatrice/${item.typeId}`, { state: { preset: item } });
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
          <div>
            <h1>Historique des Calculs</h1>
            <p className="history-subtitle">Consultez vos calculs précédents et réutilisez-les rapidement</p>
          </div>

          {history.length > 0 && (
            <Button onClick={handleClearAll} variant="secondary" className="btn-sm history-clear-btn">
              <Trash2 /> Effacer tout
            </Button>
          )}
        </div>

        {history.length > 0 && (
          <div className="history-summary">
            <Card className="history-stat">
              <div className="history-stat-value">{history.length}</div>
              <p>Calculs enregistrés</p>
            </Card>
            <Card className="history-stat">
              <div className="history-stat-value">{new Set(history.map(h => h.type)).size}</div>
              <p>Types différents</p>
            </Card>
            <Card className="history-stat">
              <div className="history-stat-value">
                {(() => {
                  const now = new Date();
                  const firstTime = Math.min(...history.map(h => h.timestamp.getTime()));
                  return Math.round((now.getTime() - firstTime) / 86400000);
                })()}d
              </div>
              <p>Depuis le premier calcul</p>
            </Card>
          </div>
        )}

        {history.length === 0 ? (
          <Card className="empty-history">
            <h2>Aucun calcul enregistré</h2>
            <p>Réalisez votre premier calcul pour qu'il apparaisse ici dans l'historique.</p>
          </Card>
        ) : (
          <div className="history-list">
            {history.map((item) => (
              <Card key={item.id} className="history-entry">
                <div className="history-entry-left">
                  <div className="history-entry-top">
                    <span className="history-badge">{item.type}</span>
                    <p className="timestamp">{formatDate(item.timestamp)}</p>
                  </div>

                  <div className="input-tags">
                    {Object.entries(item.inputs).map(([key, value]) => (
                      <span key={key} className="input-tag">{key}: {value}</span>
                    ))}
                  </div>
                </div>

                <div className="history-entry-right">
                  <div className="result-block">
                    <p className="history-result-value">{item.result}</p>
                    <span className="result-unit">{item.unit}</span>
                  </div>
                  <div className="entry-actions">
                    <Button variant="secondary" size="sm" onClick={() => handleRecalculate(item)}>Recalculer</Button>
                    <Button variant="secondary" size="sm">Télécharger</Button>
                    <Button variant="secondary" size="sm" onClick={() => handleDelete(item.id)}>Supprimer</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
