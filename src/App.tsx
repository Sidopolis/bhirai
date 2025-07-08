import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Footer from './components/Footer';
import { Landmark, Users, Train, Megaphone, ShoppingCart, Music } from 'lucide-react';
import LiveWebcamDemo from './components/LiveWebcamDemo';
import Technology from './components/Technology';

function App() {
  // We'll keep track of the last alert from the Live Demo here
  const [lastAlert, setLastAlert] = useState<string | null>(null);

  useEffect(() => {
    if (window.location.pathname === '/') {
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
  }, []);

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Technology />
            <Features />
            <Footer />
          </>
        } />
        <Route path="/live" element={<LiveWebcamDemo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;