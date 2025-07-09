import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Footer from './components/Footer';
import LiveWebcamDemo from './components/LiveWebcamDemo';
import StoryPage from './components/StoryPage';

function AppContent() {
  const [lastAlert, setLastAlert] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      const hash = window.location.hash;
      if (hash) {
        const el = document.getElementById(hash.replace('#', ''));
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    }
  }, [location.pathname]);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Footer />
          </>
        } />
        <Route path="/live" element={
          <>
            <LiveWebcamDemo />
            <Footer />
          </>
        } />
        <Route path="/story" element={
          <>
            <StoryPage />
            <Footer />
          </>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;