import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Footer from './components/Footer';
import LiveWebcamDemo from './components/LiveWebcamDemo';
import StoryPage from './components/StoryPage';

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
      {window.location.pathname === '/' && (
        <div className="w-full flex justify-end pr-10 mt-2">
          <span className="text-xs text-gray-500 italic">Check out the demo to see how BhīrAI works.</span>
        </div>
      )}
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
    </BrowserRouter>
  );
}

export default App;