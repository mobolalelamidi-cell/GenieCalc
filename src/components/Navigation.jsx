import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navigation = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/calculatrice') {
      return location.pathname.startsWith('/calculatrice');
    }
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/calculatrice', label: 'Calculatrice' },
    { path: '/historique', label: 'Historique' },
  ];

  const authLinks = [
    { path: '/login', label: 'Login' },
    { path: '/signup', label: 'Signup' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <div className="logo-mark">G</div>
          <span className="logo-text">GenieCalc</span>
        </Link>

        <div className="nav-center">
          <div className="nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="auth-actions">
          <Link
            to="/login"
            className={`nav-link auth-link ${isActive('/login') ? 'active' : ''}`}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className={`nav-link cta-button ${isActive('/signup') ? 'active' : ''}`}
          >
            Signup
          </Link>
        </div>

        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="icon" /> : <Menu className="icon" />}
        </button>
      </div>

      {isOpen && (
        <div className="mobile-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {authLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
