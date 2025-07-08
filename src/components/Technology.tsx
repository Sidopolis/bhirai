import React from 'react';
import { Cpu, Radar, Activity } from 'lucide-react';

const Technology = () => (
  <section id="technology" className="py-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 border-b border-dark-800">
    <div className="max-w-5xl mx-auto px-6 text-center">
      <div className="inline-block bg-dark-800 px-4 py-2 rounded-full text-sm text-gray-400 mb-4">
        The Technology
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
        How BhīrAI Sees the Crowd
      </h2>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
        We don't just count heads. We actually watch how people move, how they cluster, and how the energy in a crowd shifts. Everything happens right on your device—no cloud, no lag, no privacy worries. If something feels off, BhīrAI flags it instantly. You get the heads-up before things go sideways.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        <div className="flex flex-col items-center">
          <Cpu className="w-10 h-10 text-blue-400 mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Edge AI</h3>
          <p className="text-gray-400 text-sm">All the number crunching happens on your machine. Your video never leaves your computer.</p>
        </div>
        <div className="flex flex-col items-center">
          <Radar className="w-10 h-10 text-purple-400 mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Crowd Dynamics</h3>
          <p className="text-gray-400 text-sm">We track not just people, but how they move together. It's about patterns, not just numbers.</p>
        </div>
        <div className="flex flex-col items-center">
          <Activity className="w-10 h-10 text-pink-400 mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Instant Alerts</h3>
          <p className="text-gray-400 text-sm">If the system senses trouble, you know right away. No waiting, no guessing.</p>
        </div>
      </div>
    </div>
  </section>
);

export default Technology; 