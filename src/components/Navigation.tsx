import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Circle } from 'lucide-react';
import emailjs from 'emailjs-com';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'TECHNOLOGY', href: '#technology' },
    { name: 'FEATURES', href: '#features' },
  ];

  // Add a scroll handler for Watch Demo
  const handleWatchDemo = (e?: React.MouseEvent) => {
    e?.preventDefault();
    const el = document.getElementById('live-demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Contact form modal logic
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // TODO: Replace these with your actual EmailJS keys
    const SERVICE_ID = 'service_v8xvi1j';
    const TEMPLATE_ID = 'template_ybbocqn';
    const USER_ID = 'eBTz2IOfEs64lemnu';
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        USER_ID
      );
      setSubmitted(true);
      setLoading(false);
      setTimeout(() => {
        setShowContact(false);
        setSubmitted(false);
        setForm({ name: '', email: '', message: '' });
      }, 2000);
    } catch (err) {
      setError('Sorry, something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-[95vw] max-w-5xl z-[100] bg-dark-900 border-b border-dark-700 shadow-xl rounded-b-2xl transition-all duration-300`}>
        {/* Enhanced subtle divider below navbar */}
        <div className="absolute left-0 right-0 bottom-0 h-px bg-dark-700 opacity-60" style={{zIndex: 51}} />
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
          {/* Enhanced Logo with hover effects */}
          <div className="flex items-center space-x-2 group cursor-pointer">
            <Link to="/">
              <span className="block w-auto h-7">
                <svg width="90" height="28" viewBox="0 0 90 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <text x="0" y="22" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="bold" fill="#e5e7eb" letter-spacing="2">BhīrAI</text>
                </svg>
              </span>
            </Link>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 ml-auto">
            {location.pathname === '/live' && (
              <>
                <a
                  href="#technology"
                  className="text-gray-300 hover:text-white transition-all duration-200 text-xs font-semibold tracking-widest uppercase border-b-2 border-transparent hover:border-gray-400 py-1 relative group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10">TECHNOLOGY</span>
                  <div className="absolute inset-0 bg-dark-700/30 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </a>
                <a
                  href="#features"
                  className="text-gray-300 hover:text-white transition-all duration-200 text-xs font-semibold tracking-widest uppercase border-b-2 border-transparent hover:border-gray-400 py-1 relative group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10">FEATURES</span>
                  <div className="absolute inset-0 bg-dark-700/30 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </a>
              </>
            )}
            {location.pathname === '/' && (
              <Link
                to="/story"
                className="text-gray-300 hover:text-white transition-all duration-200 text-xs font-semibold tracking-widest uppercase border-b-2 border-transparent hover:border-gray-400 py-1 relative group"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10">STORY</span>
                <div className="absolute inset-0 bg-dark-700/30 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </Link>
            )}
            <Link
              to="/live"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 border border-blue-500 hover:border-purple-500 ml-2"
            >
              Live AI Demo
            </Link>
            <button
              className="bg-dark-800 text-white px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest hover:bg-dark-700 transition-all duration-300 border border-dark-700 hover:border-dark-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              onClick={() => setShowContact(true)}
            >
              Get Started
            </button>
            {/* Enhanced System Status Indicator */}
            <div className="flex items-center ml-6 text-xs text-gray-400 group">
              <Circle className="w-3 h-3 text-gray-400 mr-1 group-hover:animate-pulse transition-all duration-300" fill="#9ca3af" />
              <span className="group-hover:text-gray-300 transition-colors duration-300">Operational</span>
            </div>
            {location.pathname === '/' && (
              <span className="ml-8 text-xs text-gray-500 italic hidden md:inline-block">Check out the demo to see how BhīrAI works.</span>
            )}
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-dark-800/50 border border-dark-700 text-gray-300 hover:text-white hover:bg-dark-700/50 transition-all duration-200"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Enhanced Contact Form Modal */}
      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-dark-900 border border-dark-700 rounded-2xl p-8 w-full max-w-md shadow-2xl relative transform transition-all duration-300 scale-100">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-dark-700/50 transition-all duration-200"
              onClick={() => setShowContact(false)}
              aria-label="Close contact form"
            >
              <X className="w-5 h-5" />
              </button>
            <h2 className="text-xl font-bold text-white mb-6 text-center">Contact BhīrAI</h2>
            {submitted ? (
              <div className="text-gray-300 text-center py-8 flex items-center justify-center">
                <div className="w-4 h-4 bg-gray-400 rounded-full mr-2 animate-pulse"></div>
                Thank you! I'll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="Your Name"
                  className="w-full bg-dark-800/50 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500/20 transition-all duration-200"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  placeholder="Your Email"
                  className="w-full bg-dark-800/50 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500/20 transition-all duration-200"
                  required
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleFormChange}
                  placeholder="Your Message"
                  className="w-full bg-dark-800/50 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500/20 transition-all duration-200"
                  rows={4}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-dark-700 hover:bg-dark-600 text-white py-3 rounded-lg font-semibold border border-dark-600 hover:border-dark-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
              </button>
                {error && <div className="text-red-400 text-center mt-2 text-sm">{error}</div>}
              </form>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-8 md:hidden transition-all duration-300">
          <button
            className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-lg hover:bg-dark-700/50 transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>
          <nav className="flex flex-col items-center space-y-6 mt-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={`/${item.href}`}
                className="text-white text-xl font-semibold tracking-widest uppercase py-2 px-6 rounded-lg hover:bg-dark-800/60 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/live"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 border border-blue-500 hover:border-purple-500 ml-2"
            >
              Live AI Demo
            </Link>
            <button
              className="w-full bg-dark-800 text-white px-8 py-4 rounded-xl text-lg font-semibold uppercase tracking-widest hover:bg-dark-700 transition-all duration-300 border border-dark-700 hover:border-dark-600 shadow-lg hover:shadow-xl"
              onClick={() => { setShowContact(true); setIsMenuOpen(false); }}
            >
              Get Started
            </button>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navigation;