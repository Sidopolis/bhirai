import React from 'react';

const badges = [
  { name: 'Y Combinator', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#FF6600"/><text x="12" y="17" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">Y</text></svg> },
  { name: 'Product Hunt', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#DA552F"/><text x="12" y="17" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">P</text></svg> },
  { name: 'Indie Hackers', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#1A2B34"/><text x="12" y="17" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">IH</text></svg> },
];

const Footer = () => (
  <footer className="w-full py-10 bg-dark-900 border-t border-dark-700 text-center text-gray-500 text-sm flex flex-col items-center gap-3">
    <div className="w-12 h-px bg-dark-700 mb-2" />
    <div className="mb-2 flex flex-col items-center gap-1">
      <span className="font-bold tracking-widest text-gray-300 text-lg">BhīrAI</span>
      <span className="text-xs text-gray-400">For every crowd, for every person.<br/>Built by real people who care about safety, not hype.</span>
    </div>
    <div className="flex items-center gap-4 mt-2 mb-1 opacity-80">
      <span className="text-xs text-gray-500 mr-2">Trusted by:</span>
      {badges.map(badge => (
        <span key={badge.name} title={badge.name} className="inline-block align-middle">{badge.svg}</span>
      ))}
    </div>
    <div className="text-xs text-gray-600 mt-2">© 2024 BhīrAI. All rights reserved.</div>
  </footer>
);

export default Footer;