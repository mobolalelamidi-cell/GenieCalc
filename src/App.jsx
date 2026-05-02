import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Calculator from './pages/Calculator';
import History from './pages/History';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calculatrice" element={<Navigate replace to="/calculatrice/volume-beton" />} />
            <Route path="/calculatrice/:type" element={<Calculator />} />
            <Route path="/calculator/:type" element={<Calculator />} />
            <Route path="/historique" element={<History />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
