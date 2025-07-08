import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import './StoryPage.css';

const stories = [
  {
    en: 'Last year at a festival, panic spread before anyone realized. If BhīrAI had been there, the alert would have come before the rush. That\'s why we built it.',
    hi: 'पिछले साल एक मेले में, घबराहट फैल गई इससे पहले कि कोई समझ पाता। अगर BhīrAI वहाँ होता, तो भीड़ से पहले अलर्ट आ जाता। इसी लिए हमने इसे बनाया।'
  },
  {
    en: 'I was at a concert when the crowd started pushing. It was scary, and no one knew what to do. BhīrAI could have warned us before it got dangerous.',
    hi: 'मैं एक कॉन्सर्ट में था जब भीड़ ने धक्का-मुक्की शुरू कर दी। डरावना था, और कोई नहीं जानता था क्या करें। BhīrAI हमें खतरे से पहले सचेत कर सकता था।'
  },
  {
    en: 'During Rath Yatra, the crowd is massive. As a devotee of Jagannath Bhagwan, I want to feel safe while pulling the chariot. If BhīrAI was there, every devotee could focus on their faith, not on fear.',
    hi: 'रथ यात्रा के दौरान, भीड़ बहुत बड़ी होती है। मैं जगन्नाथ भगवान का भक्त हूँ और चाहता हूँ कि जब रथ खींचूं तो सुरक्षित महसूस करूं। अगर BhīrAI वहाँ होता, तो हर भक्त निडर होकर अपनी आस्था में डूब सकता था।'
  }
];

const StoryPage = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center py-16 px-4 pt-24">
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-10 text-center">Real Stories, Real Reasons</h1>
      <div className="flex flex-col gap-12 w-full max-w-2xl">
        {stories.map((story, idx) => (
          <div
            key={idx}
            className="story-reveal-container"
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            onTouchStart={() => setHovered(idx)}
            onTouchEnd={() => setHovered(null)}
          >
            <ScrollReveal baseOpacity={0.15} enableBlur={true} baseRotation={2} blurStrength={6}>
              {hovered === idx ? story.hi : story.en}
            </ScrollReveal>
          </div>
        ))}
      </div>
      <div className="mt-16 text-gray-500 text-xs text-center">Touch or hover a story to see it in Hindi.</div>
    </div>
  );
};

export default StoryPage; 