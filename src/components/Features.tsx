import React from 'react';
import { CheckCircle, Eye, Shield, Zap, Users, Clock, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Real-time Detection',
    description: 'I wanted to know if something was wrong, right now—not after it was too late. So BhīrAI spots trouble before it happens.'
  },
  {
    icon: Shield,
    title: 'Early Warning System',
    description: "A few seconds can change everything. That's why BhīrAI gives you a heads-up, not just a report."
  },
  {
    icon: Zap,
    title: 'Lightning Fast',  
    description: "I've seen how fast things can go wrong in a crowd. BhīrAI reacts in milliseconds, not minutes."
  },
  {
    icon: Users,
    title: 'Crowd Intelligence',
    description: "It's not just about numbers. BhīrAI understands how people move together, so it can spot patterns that don't feel right."
  },
  {
    icon: Clock,
    title: '24/7 Monitoring',
    description: 'No one can watch a crowd all day. BhīrAI never gets tired, never looks away.'
  },
  {
    icon: BarChart3,
    title: 'Smart Analytics',
    description: 'I wanted to learn from every event. BhīrAI turns crowd data into lessons for next time.'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-dark-900">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block bg-dark-800/80 px-4 py-2 rounded-full text-xs font-semibold tracking-widest text-blue-400 mb-4 uppercase">
            Core Advantages
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What really sets BhīrAI apart
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Not just features—these are the reasons BhīrAI is trusted by people who care about safety, speed, and real results.
          </p>
        </div>

        {/* Story-driven checklist */}
        <ol className="space-y-10 relative border-l-2 border-dark-700 pl-8">
          {features.map((feature, idx) => (
            <li key={feature.title} className="relative">
              <span className="absolute -left-5 top-1.5">
                <CheckCircle className="w-6 h-6 text-green-500 bg-dark-900 rounded-full" />
              </span>
              <div className="flex items-center gap-3 mb-2 group">
                <feature.icon className="w-6 h-6 text-gray-300" />
                <span className="text-lg font-bold text-white relative animated-underline">{feature.title}</span>
              </div>
              <p className="text-gray-400 text-base pl-9">
                {feature.description}
              </p>
            </li>
          ))}
        </ol>

        {/* Unique call to action */}
        <div className="text-center mt-20">
          <div className="bg-dark-800 rounded-2xl p-8 border border-dark-700 max-w-2xl mx-auto relative">
            <h3 className="text-2xl font-bold text-white mb-4">
              Want to see it for yourself?
            </h3>
            <p className="text-gray-400 mb-6">
              Try BhīrAI on your own video. No sales pitch, just real results.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById('live-demo');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-dark-700 hover:bg-dark-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-dark-600 hover:border-dark-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Show me the demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

<style>{`
.animated-underline::after {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #5227FF 0%, #8f5cff 100%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(.4,0,.2,1);
  border-radius: 1px;
}
.group:hover .animated-underline::after {
  transform: scaleX(1);
}
`}</style>