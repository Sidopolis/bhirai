import Logo from './Logo';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="w-full bg-dark-900 border-t border-dark-700 text-gray-300 pt-12 pb-6">
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
      {/* Left: Brand & Mission */}
      <div className="flex flex-col gap-2">
        <Logo style={{ height: 32, width: 90 }} />
        <span className="text-xs text-gray-400 mt-2">
          Crowd safety, reimagined.<br />
          Built by real people for real peace of mind.
        </span>
        <span className="text-xs text-gray-500 mt-2">Serving safety worldwide</span>
      </div>
      {/* Center: Navigation */}
      <div className="flex flex-col gap-1 items-center">
        <Link to="/story" className="hover:text-blue-400 transition">Story</Link>
        <Link to="/live" className="hover:text-blue-400 transition">Live AI Demo</Link>
        <Link to="/how" className="hover:text-blue-400 transition">How It Works</Link>
        <Link to="/" className="hover:text-blue-400 transition">Homepage</Link>
        <a href="mailto:hello@bhirai.com" className="hover:text-red-400 transition mt-2">Contact</a>
      </div>
      {/* Right: Social/Region */}
      <div className="flex flex-col gap-2 md:items-end items-center">
        <span className="text-xs text-gray-400">Made with <span className="text-red-500">&#10084;</span> in India</span>
        <div className="flex gap-3 mt-2">
          <a href="https://www.linkedin.com/in/sidhant-patro-581905233/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition" aria-label="LinkedIn">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v5.62z"/></svg>
          </a>
        </div>
      </div>
    </div>
    {/* Divider */}
    <div className="w-full h-px bg-dark-700 my-6" />
    {/* Bottom: Copyright, Policies */}
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex flex-col md:flex-row items-center gap-2 text-xs text-gray-500">
        <span>© 2025 Bhīr.ai. All rights reserved</span>
        <span className="hidden md:inline">•</span>
        <Link to="#" className="hover:text-blue-400 transition">Privacy Policy</Link>
        <span className="hidden md:inline">•</span>
        <Link to="#" className="hover:text-blue-400 transition">Cookies Policy</Link>
      </div>
      {/* Optional: Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="text-xs text-gray-400 hover:text-blue-400 transition px-3 py-1 rounded border border-dark-700 bg-dark-800"
        aria-label="Back to top"
      >
        ↑ Back to top
      </button>
    </div>
  </footer>
);

export default Footer;