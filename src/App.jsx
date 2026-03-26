import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Calculator from './pages/Calculator';
import History from './pages/History';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calculator/:type" element={<Calculator />} />
            <Route path="/historique" element={<History />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
