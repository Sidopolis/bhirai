import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Circle } from 'lucide-react';
import emailjs from 'emailjs-com';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showContact, setShowContact] = useState(false);

  // Contact form state and handlers
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
    // TODO: Add your emailjs logic here if needed
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setForm({ name: '', email: '', message: '' });
    }, 1500);
  };

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Remove old navItems and operational indicator
  // Add new 'How It Works' link
  return (
    <>
      <nav className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-[95vw] max-w-5xl z-[100] bg-dark-900 border-b border-dark-700 shadow-xl rounded-b-2xl transition-all duration-300`}>
        {/* Enhanced subtle divider below navbar */}
        <div className="absolute left-0 right-0 bottom-0 h-px bg-dark-700 opacity-60" style={{zIndex: 51}} />
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
          {/* Enhanced Logo with hover effects */}
          <div className="flex items-center group cursor-pointer">
            <Link to="/">
              <Logo style={{ height: 36, width: 110 }} />
            </Link>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 ml-auto">
            <Link
              to="/how"
              className="text-gray-300 hover:text-white transition-all duration-200 text-xs font-semibold tracking-widest uppercase border-b-2 border-transparent hover:border-gray-400 py-1 relative group"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="relative z-10">HOW IT WORKS</span>
              <div className="absolute inset-0 bg-dark-700/30 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </Link>
            <Link
              to="/story"
              className="text-gray-300 hover:text-white transition-all duration-200 text-xs font-semibold tracking-widest uppercase border-b-2 border-transparent hover:border-gray-400 py-1 relative group"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="relative z-10">STORY</span>
              <div className="absolute inset-0 bg-dark-700/30 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </Link>
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
            <h2 className="text-xl font-bold text-white mb-6 text-center">Contact Bhīr.ai</h2>
            {submitted ? (
              <div className="text-green-400 text-center py-8 flex flex-col items-center justify-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="#fff" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                </div>
                <span className="font-semibold">Thank you! We'll get back to you soon.</span>
                <button className="mt-4 px-4 py-2 bg-dark-700 text-white rounded hover:bg-dark-600 transition" onClick={() => setSubmitted(false)}>Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-300 mb-1" htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    placeholder="Enter your name"
                    className="w-full bg-dark-800/50 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1" htmlFor="email">Your Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleFormChange}
                    placeholder="Enter your email"
                    className="w-full bg-dark-800/50 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1" htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleFormChange}
                    placeholder="Type your message..."
                    className="w-full bg-dark-800/50 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all duration-200"
                    rows={4}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold border border-blue-700 hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
            <Link
              to="/how"
              className="text-white text-xl font-semibold tracking-widest uppercase py-2 px-6 rounded-lg hover:bg-dark-800/60 transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              HOW IT WORKS
            </Link>
            <Link
              to="/story"
              className="text-white text-xl font-semibold tracking-widest uppercase py-2 px-6 rounded-lg hover:bg-dark-800/60 transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              STORY
            </Link>
            <Link
              to="/live"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 border border-blue-500 hover:border-purple-500 ml-2"
              onClick={() => setIsMenuOpen(false)}
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