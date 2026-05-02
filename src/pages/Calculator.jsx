import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Button, Card, Input } from '../components/common';
import { ArrowLeft, Copy, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

// Définition des calculatrices par type
const calculatorDefinitions = {
  'volume-beton': {
    title: 'Volume de Béton',
    description: 'Calculez le volume de béton nécessaire pour vos coulages',
    fields: [
      { name: 'length', label: 'Longueur (m)', type: 'number', step: 0.01 },
      { name: 'width', label: 'Largeur (m)', type: 'number', step: 0.01 },
      { name: 'height', label: 'Hauteur (m)', type: 'number', step: 0.01 },
    ],
    calculate: (values) => {
      const { length, width, height } = values;
      return (length * width * height).toFixed(2);
    },
    unit: 'm³',
  },
  'poutres': {
    title: 'Calcul de Poutres',
    description: 'Analyse de poutres en acier et béton armé',
    fields: [
      { name: 'length', label: 'Portée (m)', type: 'number', step: 0.01 },
      { name: 'load', label: 'Charge (kN/m)', type: 'number', step: 0.1 },
      { name: 'width', label: 'Largeur (cm)', type: 'number', step: 0.1 },
    ],
    calculate: (values) => {
      const { length, load } = values;
      const moment = (load * length * length) / 8;
      return moment.toFixed(2);
    },
    unit: 'kN.m',
  },
  'poteaux': {
    title: 'Dimensionnement de Poteaux',
    description: 'Calcul du diamètre et des armatures des poteaux',
    fields: [
      { name: 'load', label: 'Charge (kN)', type: 'number', step: 1 },
      { name: 'height', label: 'Hauteur (m)', type: 'number', step: 0.1 },
      { name: 'coverage', label: 'Enrobage (cm)', type: 'number', step: 0.5 },
    ],
    calculate: (values) => {
      const { load } = values;
      const area = (load / 20).toFixed(2);
      return area;
    },
    unit: 'cm²',
  },
  'fondations': {
    title: 'Fondations',
    description: 'Dimensionnement des fondations superficielles',
    fields: [
      { name: 'load', label: 'Charge (kN)', type: 'number', step: 1 },
      { name: 'bearing_capacity', label: 'Capacité portante (kPa)', type: 'number', step: 5 },
      { name: 'safety_factor', label: 'Coefficient de sécurité', type: 'number', step: 0.1, placeholder: '3.0' },
    ],
    calculate: (values) => {
      const { load, bearing_capacity, safety_factor = 3 } = values;
      const area = (load * 1000) / (bearing_capacity / safety_factor);
      return (area / 10000).toFixed(2);
    },
    unit: 'm²',
  },
  'charges': {
    title: 'Analyse de Charges',
    description: 'Distribution et analyse des charges structurelles',
    fields: [
      { name: 'dead_load', label: 'Charge permanente (kN/m²)', type: 'number', step: 0.1 },
      { name: 'live_load', label: 'Charge d\'exploitation (kN/m²)', type: 'number', step: 0.1 },
      { name: 'area', label: 'Surface (m²)', type: 'number', step: 1 },
    ],
    calculate: (values) => {
      const { dead_load, live_load, area } = values;
      const total = ((dead_load + live_load) * area).toFixed(2);
      return total;
    },
    unit: 'kN',
  },
  'escaliers': {
    title: 'Calcul d\'Escaliers',
    description: 'Détermine la hauteur, la profondeur et la longueur de limon',
    fields: [
      { name: 'step_height', label: 'Hauteur de marche (cm)', type: 'number', step: 0.5 },
      { name: 'tread_depth', label: 'Profondeur de marche (cm)', type: 'number', step: 0.5 },
      { name: 'steps', label: 'Nombre de marches', type: 'number', step: 1 },
      { name: 'width', label: 'Largeur de l\'escalier (m)', type: 'number', step: 0.01 },
    ],
    calculate: (values) => {
      const { step_height, tread_depth, steps, width } = values;
      const totalRise = (step_height * steps) / 100;
      const totalRun = (tread_depth * steps) / 100;
      const stringerLength = Math.sqrt(totalRise ** 2 + totalRun ** 2).toFixed(2);
      return `${stringerLength} m / ${((totalRise * width) * totalRun).toFixed(2)}`;
    },
    unit: 'm / m²',
  },
  'dalles': {
    title: 'Dalles',
    description: 'Calcul du volume de dalle en béton selon l\'épaisseur',
    fields: [
      { name: 'length', label: 'Longueur (m)', type: 'number', step: 0.01 },
      { name: 'width', label: 'Largeur (m)', type: 'number', step: 0.01 },
      { name: 'thickness', label: 'Épaisseur (cm)', type: 'number', step: 0.5 },
    ],
    calculate: (values) => {
      const { length, width, thickness } = values;
      const volume = (length * width * (thickness / 100)).toFixed(2);
      return volume;
    },
    unit: 'm³',
  },
  'semelles': {
    title: 'Semelles isolées',
    description: 'Dimensionnement de semelles selon la charge et la pression admissible du sol',
    fields: [
      { name: 'load', label: 'Charge (kN)', type: 'number', step: 1 },
      { name: 'allowable_pressure', label: 'Pression admissible (kN/m²)', type: 'number', step: 5 },
      { name: 'width', label: 'Largeur semelle (m)', type: 'number', step: 0.01 },
    ],
    calculate: (values) => {
      const { load, allowable_pressure, width } = values;
      const requiredArea = load / allowable_pressure;
      const requiredLength = width > 0 ? (requiredArea / width).toFixed(2) : 0;
      return `${requiredArea.toFixed(2)} / ${requiredLength}`;
    },
    unit: 'm² / m',
  },
};

export const Calculator = () => {
  const { type } = useParams();
  const location = useLocation();
  const preset = location.state?.preset?.typeId === type ? location.state.preset : null;

  const [values, setValues] = useState(preset?.inputs || {});
  const [result, setResult] = useState(preset?.result || null);
  const [copied, setCopied] = useState(false);
  const [historyMessage, setHistoryMessage] = useState('');

  const HISTORY_STORAGE_KEY = 'geniecalc_history';
  const calculator = calculatorDefinitions[type] || calculatorDefinitions['volume-beton'];

  const saveHistoryEntry = (entry) => {
    const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
    const existing = raw ? JSON.parse(raw) : [];
    const updated = [entry, ...existing].slice(0, 50);
    window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleCalculate = () => {
    const result = calculator.calculate(values);
    setResult(result);

    saveHistoryEntry({
      id: Date.now(),
      type: calculator.title,
      typeId: type,
      inputs: values,
      result,
      unit: calculator.unit,
      timestamp: new Date().toISOString(),
    });

    setHistoryMessage('Calcul ajouté à l\'historique');
    setTimeout(() => setHistoryMessage(''), 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${result} ${calculator.unit}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setValues({});
    setResult(null);
  };

  return (
    <div className="calculator-page">
      <div className="content-width">
        {/* Header */}
        <Link to="/dashboard">
          <button className="text-link-return">
            <ArrowLeft className="small-icon" />
            Retour au Dashboard
          </button>
        </Link>

        <section className="hero-section">
          <div className="section-heading">
            <h1>{calculator.title}</h1>
            <p>{calculator.description}</p>
          </div>
        </section>

        <div className="calculator-main-grid">
          {/* Formulaire */}
          <Card className="calculator-card-main">
            <h2>Paramètres</h2>

            <div className="form-fields">
              {calculator.fields.map(field => (
                <Input
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  type={field.type || 'number'}
                  step={field.step || 0.01}
                  placeholder={field.placeholder || '0'}
                  value={values[field.name] || ''}
                  onChange={handleInputChange}
                  required
                />
              ))}
            </div>

            <div className="action-row">
              <Button onClick={handleCalculate}>Calculer</Button>
              <Button onClick={handleReset} variant="secondary">Réinitialiser</Button>
            </div>
          </Card>

          {result && (
            <Card className="result-card result-appear">
              <h2>Résultat</h2>

              {historyMessage && <div className="history-toast">{historyMessage}</div>}

              <div className="result-value">
                <p>Valeur calculée</p>
                <div className="result-number">
                  <span>{result}</span>
                  <span>{calculator.unit}</span>
                </div>
              </div>

              <div className="action-row">
                <Button onClick={handleCopy} variant="primary">{copied ? 'Copié!' : 'Copier'}</Button>
                <Button variant="secondary">Télécharger PDF</Button>
              </div>
            </Card>
          )}
        </div>

        <Card className="info-box">
          <h3>💡 Conseil</h3>
          <p>
            Vérifiez toujours vos résultats avec des calculs manuels pour les applications critiques.
            Les valeurs fournies sont à titre informatif.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Calculator;
