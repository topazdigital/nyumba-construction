import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import News from './pages/News';
import Features from './pages/Features';
import Projects from './pages/Projects';
import Events from './pages/Events';
import FlipCopy from './pages/FlipCopy';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Professionals from './pages/Professionals';
import Contractors from './pages/Contractors';
import Materials from './pages/Materials';
import AuthPage from './components/Auth/AuthPage';
import AdminDashboard from './pages/admin/Dashboard';

// Professional Pages
import Architects from './pages/professionals/Architects';
import StructuralEngineers from './pages/professionals/StructuralEngineers';
import SubmitListing from './pages/SubmitListing';

const basename = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

function App() {
  return (
    <AuthProvider>
      <Router basename={basename}>
        <div className="min-h-screen flex flex-col bg-white">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/news" element={<News />} />
              <Route path="/features" element={<Features />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/events" element={<Events />} />
              <Route path="/flip-copy" element={<FlipCopy />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:category" element={<Properties />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/professionals" element={<Professionals />} />
              <Route path="/professionals/:category" element={<Professionals />} />
              <Route path="/professionals/architects" element={<Architects />} />
              <Route path="/professionals/structural-engineers" element={<StructuralEngineers />} />
              <Route path="/contractors" element={<Contractors />} />
              <Route path="/contractors/:category" element={<Contractors />} />
              <Route path="/materials" element={<Materials />} />
              <Route path="/materials/:category" element={<Materials />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/submit-listing" element={<SubmitListing />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
