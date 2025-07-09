import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="w-full bg-dark-900 border-t border-dark-700 text-gray-300 pt-12 pb-6">
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
      {/* Left: Brand & Mission */}
      <div className="flex flex-col gap-2">
        <span className="font-bold text-lg" style={{ fontFamily: "'GT Planar', Arial, sans-serif" }}>BhīrAI</span>
        <span className="text-xs text-gray-400">
          Crowd safety, reimagined.<br />
          Built by real people for real peace of mind.
        </span>
        <span className="text-xs text-gray-500 mt-2">Serving safety worldwide</span>
      </div>
      {/* Middle: Navigation */}
      <div className="flex flex-col gap-1 md:items-center">
        <Link to="/story" className="hover:text-blue-400 transition">Story</Link>
        <Link to="/live" className="hover:text-blue-400 transition">Live AI Demo</Link>
        <a href="mailto:hello@bhirai.com" className="hover:text-blue-400 transition">Contact</a>
      </div>
      {/* Right: Homepage */}
      <div className="flex flex-col gap-1 md:items-end">
        <Link to="/" className="hover:text-blue-400 transition">Homepage</Link>
      </div>
    </div>
    {/* Divider */}
    <div className="w-full h-px bg-dark-700 my-6" />
    {/* Bottom: Copyright, Policies */}
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex flex-col md:flex-row items-center gap-2 text-xs text-gray-500">
        <span>© 2025 BhīrAI. All rights reserved</span>
        <span className="hidden md:inline">•</span>
        <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
        <span className="hidden md:inline">•</span>
        <a href="#" className="hover:text-blue-400 transition">Cookies Policy</a>
      </div>
    </div>
    {/* Large Logo */}
    <div className="w-full flex justify-center mt-8 overflow-hidden" style={{height: '90px', maxHeight: '18vw'}}>
      <span
        className="text-[80px] md:text-[140px] font-bold text-gray-500 select-none"
        style={{ fontFamily: "'GT Planar', Arial, sans-serif", letterSpacing: '0.01em', lineHeight: 1, textTransform: 'lowercase', display: 'block', marginBottom: '-0.18em' }}
      >
        bhīrai
      </span>
    </div>
  </footer>
);

export default Footer;