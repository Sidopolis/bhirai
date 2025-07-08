import React from 'react';
import { Upload, Eye, AlertTriangle, Shield } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Drop your video',
      description: 'Any crowd footage works. Phone camera, security cam, whatever you got.',
      color: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      icon: Eye,
      title: 'AI goes to work',
      description: 'Our system scans every frame, tracking movement patterns and crowd density.',
      color: 'bg-green-500/10 border-green-500/20'
    },
    {
      icon: AlertTriangle,
      title: 'Risk assessment',
      description: 'If something looks sketchy, we calculate the threat level in real-time.',
      color: 'bg-yellow-500/10 border-yellow-500/20'
    },
    {
      icon: Shield,
      title: 'You get alerted',
      description: 'Instant notification if danger is detected. No waiting, no guessing.',
      color: 'bg-red-500/10 border-red-500/20'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-dark-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block bg-dark-900 px-4 py-2 rounded-full text-sm text-gray-400 mb-4">
            The process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Four steps to safety
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            It's really that simple. No complicated setup, no training required.
          </p>
        </div>

        {/* Unique timeline layout */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-dark-700 transform -translate-x-1/2"></div>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                {/* Step number and icon */}
                <div className="flex-shrink-0">
          <div className="relative">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-dark-700 text-white text-2xl font-bold mb-4 fadeInUp">
                      {step.icon ? <step.icon className="w-7 h-7" /> : index + 1}
                    </div>
                    {/* Timeline dot */}
                    <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-dark-600 rounded-full border-2 border-dark-800"></div>
                  </div>
                </div>

                {/* Content card */}
                <div className="flex-1 max-w-md">
                  <div className={`p-6 rounded-xl border ${step.color} relative`}>
                    {/* Icon in corner */}
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 bg-dark-800 rounded-lg flex items-center justify-center">
                        <step.icon className="w-4 h-4 text-gray-300" />
                  </div>
                </div>

                    <h3 className="text-xl font-bold text-white mb-3 pr-12">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unique demo section */}
        <div className="text-center mt-20">
          <div className="bg-dark-900 rounded-2xl p-8 border border-dark-700 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400 font-mono">LIVE DEMO</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Want to see it in action?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Don't take my word for it. Upload your own video and watch BhīrAI do its thing.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById('live-demo');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-dark-700 hover:bg-dark-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-dark-600 hover:border-dark-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Let's test it out
            </button>
          </div>
        </div>
      </div>
      <style>{`
      .fadeInUp {
        opacity: 0;
        transform: translateY(24px);
        animation: fadeInUp 0.7s cubic-bezier(.4,0,.2,1) forwards;
        animation-delay: 0.2s;
      }
      @keyframes fadeInUp {
        to {
          opacity: 1;
          transform: none;
        }
      }
      `}</style>
    </section>
  );
};

export default HowItWorks;