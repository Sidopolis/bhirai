import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Footer from './components/Footer';
import LiveWebcamDemo from './components/LiveWebcamDemo';
import StoryPage from './components/StoryPage';
import HowItWorks from './components/HowItWorks';
import Logo from './components/Logo';

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
        <Route path="/how" element={
          <>
            <HowItWorks />
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
      {/* Removed the big, cropped logo at the bottom of the page */}
    </BrowserRouter>
  );
}

export default App;