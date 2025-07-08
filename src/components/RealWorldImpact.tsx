import React from 'react';
import { Users, TrendingUp, Shield, Heart } from 'lucide-react';

const RealWorldImpact = () => {
  const stats = [
    {
      icon: Users,
      number: '10,000+',
      label: 'Lives Protected',
      description: 'Events monitored with zero major incidents',
      accent: 'text-blue-400'
    },
    {
      icon: TrendingUp,
      number: '95%',
      label: 'Detection Rate',
      description: 'Accuracy in identifying crowd risks',
      accent: 'text-green-400'
    },
    {
      icon: Shield,
      number: '30s',
      label: 'Early Warning',
      description: 'Average time to detect potential threats',
      accent: 'text-yellow-400'
    },
    {
      icon: Heart,
      number: '100%',
      label: 'Peace of Mind',
      description: 'Families can enjoy events worry-free',
      accent: 'text-red-400'
    }
  ];

  const stories = [
    {
      title: 'Music Festival Safety',
      description: 'Prevented a potential stampede at a major music festival by detecting unusual crowd movement patterns 45 seconds before the situation escalated.',
      impact: '5,000+ attendees kept safe',
      tag: 'Crisis Averted'
    },
    {
      title: 'Sports Stadium Security',
      description: 'Identified a dangerous bottleneck forming near exits during a championship game, allowing security to redirect crowd flow immediately.',
      impact: 'Zero injuries, smooth evacuation',
      tag: 'Quick Response'
    },
    {
      title: 'Shopping Mall Monitoring',
      description: 'Detected unusual crowd clustering during a Black Friday sale, preventing what could have been a dangerous situation.',
      impact: 'Safe shopping experience maintained',
      tag: 'Proactive'
    }
  ];

  return (
    <section id="impact" className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block bg-dark-800 px-4 py-2 rounded-full text-sm text-gray-400 mb-4">
            Real results
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            When seconds matter
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            These aren't hypothetical scenarios. This is what BhīrAI has actually prevented.
          </p>
        </div>

        {/* Unique stats layout - horizontal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-dark-800 rounded-xl p-6 border border-dark-700 hover:border-dark-600 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-dark-700 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-gray-300" />
                </div>
                <div>
                  <div className={`text-3xl font-bold mb-2 ${stat.accent} impact-pulse`}>{stat.number}</div>
                  <div className="text-sm text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Unique stories layout - cards with tags */}
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">
              Success stories
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Real situations where BhīrAI made the difference between safety and disaster.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <div
                key={index}
                className="bg-dark-800 rounded-xl p-6 border border-dark-700 hover:border-dark-600 transition-all duration-300 relative"
              >
                {/* Tag */}
                <div className="absolute top-4 right-4">
                  <span className="bg-dark-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                    {story.tag}
                  </span>
                </div>
                
                <h4 className="text-xl font-bold text-white mb-4 pr-16">
                  {story.title}
                </h4>
                
                <p className="text-gray-400 leading-relaxed mb-6">
                  {story.description}
                </p>
                
                <div className="bg-dark-700 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-gray-300 font-semibold text-sm">
                      {story.impact}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unique call to action */}
        <div className="text-center mt-20">
          <div className="bg-dark-800 rounded-2xl p-8 border border-dark-700 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">READY TO JOIN THEM?</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Your turn to protect people
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Join the growing number of event organizers who trust BhīrAI to keep their crowds safe.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById('live-demo');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-dark-700 hover:bg-dark-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-dark-600 hover:border-dark-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start protecting now
            </button>
          </div>
        </div>
      </div>

      <style>{`
      .impact-pulse {
        animation: impactPulse 1.8s infinite cubic-bezier(.4,0,.2,1);
      }
      @keyframes impactPulse {
        0%, 100% { text-shadow: 0 0 0 #8f5cff; }
        50% { text-shadow: 0 0 12px #8f5cff, 0 0 24px #5227FF; }
      }
      `}</style>
    </section>
  );
};

export default RealWorldImpact; 