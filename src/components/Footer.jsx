import React from 'react';
import { GitBranch, ExternalLink, Mail } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-mark">G</div>
              <span className="logo-text">GenieCalc</span>
            </div>
            <p className="footer-description">
              Outil de calcul moderne pour ingénieurs en génie civil. Précision, rapidité et fiabilité.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-btn" aria-label="GitHub">
                <GitBranch className="icon-sm" />
              </a>
              <a href="#" className="footer-social-btn" aria-label="LinkedIn">
                <ExternalLink className="icon-sm" />
              </a>
              <a href="#" className="footer-social-btn" aria-label="Email">
                <Mail className="icon-sm" />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-section">
              <h3 className="footer-title">Produit</h3>
              <ul className="footer-list">
                <li><a href="#" className="footer-link">Calculatrice</a></li>
                <li><a href="#" className="footer-link">Historique</a></li>
                <li><a href="#" className="footer-link">Paramètres</a></li>
                <li><a href="#" className="footer-link">API</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="footer-title">Entreprise</h3>
              <ul className="footer-list">
                <li><a href="#" className="footer-link">À propos</a></li>
                <li><a href="#" className="footer-link">Contact</a></li>
                <li><a href="#" className="footer-link">Aide</a></li>
                <li><a href="#" className="footer-link">Blog</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="footer-title">Ressources</h3>
              <ul className="footer-list">
                <li><a href="#" className="footer-link">Documentation</a></li>
                <li><a href="#" className="footer-link">Tutoriels</a></li>
                <li><a href="#" className="footer-link">FAQ</a></li>
                <li><a href="#" className="footer-link">Support</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} GenieCalc. Tous droits réservés.
          </p>
          <div className="footer-legal">
            <a href="#" className="footer-legal-link">Confidentialité</a>
            <a href="#" className="footer-legal-link">Conditions</a>
            <a href="#" className="footer-legal-link">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
