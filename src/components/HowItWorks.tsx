import React from 'react';
import { Link } from 'react-router-dom';

const steps = [
  {
    title: '1. Start BhīrAI',
    description: 'Open the app and allow camera access. BhīrAI is ready instantly—no setup, no waiting.'
  },
  {
    title: '2. Real-Time Crowd Analysis',
    description: 'The system continuously monitors the scene, counting people and tracking movement patterns as they happen.'
  },
  {
    title: '3. Detect Early Warnings',
    description: 'BhīrAI looks for subtle changes—like sudden crowding or unusual motion—and calculates risk levels in real time.'
  },
  {
    title: '4. Instant Feedback',
    description: 'If a risk is detected, you see a clear alert and a live risk indicator, so you can act fast and stay in control.'
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-black text-gray-200">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-12 leading-tight" style={{ fontFamily: "'GT Planar', Arial, sans-serif" }}>
          How BhīrAI Works
        </h1>
        <div className="space-y-12 mb-20">
          {steps.map((step, idx) => (
            <div key={idx} className="">
              <h2 className="text-2xl font-bold mb-2 text-white">{step.title}</h2>
              <p className="text-lg text-gray-400 leading-relaxed">{step.description}</p>
              {idx < steps.length - 1 && <div className="w-full h-px bg-dark-700 my-8" />}
            </div>
          ))}
        </div>
        <div className="text-center bg-dark-800/30 border border-dark-700 rounded-lg p-12">
          <h3 className="text-2xl font-bold mb-4 text-white">See BhīrAI in Action</h3>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Try the live demo and experience real-time crowd awareness for yourself.
          </p>
          <Link
            to="/live"
            className="inline-block px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Start Live Demo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;