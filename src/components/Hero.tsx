import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import MagnetLines from './MagnetLines';
import './MagnetLines.css';

const HEADLINE_LANGUAGES = [
  { text: 'See panic before it starts', lang: 'English' },
  { text: 'ଭୟ ଆସିବା ପୂର୍ବରୁ ଦେଖନ୍ତୁ', lang: 'Odia' },
  { text: 'खतरा दिखने से पहले देखें', lang: 'Hindi' },
  { text: 'భయం మొదలయ్యే ముందు చూడండి', lang: 'Telugu' },
  { text: 'ভয় শুরু হওয়ার আগে দেখুন', lang: 'Bengali' },
  { text: 'பயம் தொடங்கும் முன் பாருங்கள்', lang: 'Tamil' },
  { text: 'ಭಯ ಆರಂಭವಾಗುವ ಮೊದಲು ನೋಡಿ', lang: 'Kannada' },
  { text: 'ભય શરૂ થાય તે પહેલાં જુઓ', lang: 'Gujarati' },
  { text: 'ਡਰ ਸ਼ੁਰੂ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਵੇਖੋ', lang: 'Punjabi' },
  { text: 'ഭയം തുടങ്ങുന്നതിന് മുമ്പ് കാണുക', lang: 'Malayalam' },
  { text: 'भीती सुरू होण्यापूर्वी पहा', lang: 'Marathi' },
  { text: 'خوف شروع ہونے سے پہلے دیکھیں', lang: 'Urdu' },
  { text: 'ভয় আৰম্ভ হোৱাৰ আগতে চাওক', lang: 'Assamese' },
];

const SUBHEADING =
  'Because every crowd is someone"s family. Safety for all, powered by BhīrAI.';

const Hero = () => {
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setHeadlineIdx((prev) => (prev + 1) % HEADLINE_LANGUAGES.length);
        setFade(true);
      }, 200); // fade out duration
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-dark-900 overflow-hidden">
      {/* MagnetLines animated background */}
      <MagnetLines
        rows={12}
        columns={12}
        containerSize="140%"
        lineColor="#6b6bff"
        lineWidth="3px"
        lineHeight="32px"
        baseAngle={0}
        className="opacity-40"
        style={{ zIndex: 0, position: 'absolute', inset: 0 }}
      />
      {/* Unique animated light wave background (optional, can be removed if too much) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-radial from-dark-900 via-dark-800/80 to-dark-900 opacity-90" />
        <div className="absolute left-1/2 top-1/2 w-[120vw] h-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-500/10 via-transparent to-transparent blur-3xl animate-pulse-slow" />
        <div className="absolute left-1/2 top-1/2 w-[80vw] h-[10vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-white/10 via-white/0 to-white/10 blur-2xl opacity-40 animate-move-x" />
      </div>
      <div className="relative z-10 flex flex-col items-center w-full px-6 max-w-3xl mx-auto">
        {/* Subtle launch badge */}
        <div className="mb-8 text-sm text-gray-400 tracking-widest uppercase font-mono bg-dark-800/80 px-6 py-2 rounded-full border border-dark-700 shadow-sm">
          BhīrAI 1.0 is live
        </div>
        {/* Animated headline */}
        <h1 className={`text-4xl md:text-6xl font-extrabold text-center mb-8 leading-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent drop-shadow-xl transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
            key={headlineIdx}
        >
          {HEADLINE_LANGUAGES[headlineIdx].text}
        </h1>
        {/* Heartwarming subheading */}
        <p className="text-lg md:text-2xl text-gray-400 text-center max-w-2xl mb-6">
          {SUBHEADING}
        </p>
        {/* Trusted by badge row */}
        <div className="flex items-center justify-center gap-4 mb-8 opacity-80">
          <span className="text-xs text-gray-500 mr-2">Trusted by:</span>
          <span title="Y Combinator" className="inline-block align-middle"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#FF6600"/><text x="12" y="17" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">Y</text></svg></span>
          <span title="Product Hunt" className="inline-block align-middle"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#DA552F"/><text x="12" y="17" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">P</text></svg></span>
          <span title="Indie Hackers" className="inline-block align-middle"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#1A2B34"/><text x="12" y="17" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">IH</text></svg></span>
        </div>
      </div>
      {/* Custom animation keyframes for background */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.22; }
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        @keyframes move-x {
          0% { transform: translate(-50%, -50%) scaleX(1); }
          50% { transform: translate(-50%, -50%) scaleX(1.08); }
          100% { transform: translate(-50%, -50%) scaleX(1); }
        }
        .animate-move-x { animation: move-x 6s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Hero;