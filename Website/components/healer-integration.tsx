'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Utensils, Heart, Dumbbell, Brain, HeartPulse, IceCreamBowl, Bot, Sparkles } from 'lucide-react';

const healers = [
  {
    id: 1,
    title: 'Ayurveda Doctor',
    icon: <div className="flex items-center"><Leaf className="w-6 h-6" /><HeartPulse className="w-4 h-4 ml-1" /></div>,
    tagline: 'Diagnoses your Dosha and prescribes healing',
    color: 'from-green-500 to-teal-500',
    emoji: '🧘‍⚕️'
  },
  {
    id: 2,
    title: 'Nutritionist',
    icon: <div className="flex items-center"><IceCreamBowl className="w-6 h-6" /><Leaf className="w-4 h-4 ml-1" /></div>,
    tagline: 'Crafts an anti-inflammatory, Prakriti-based diet',
    color: 'from-orange-500 to-red-500',
    emoji: '🥗'
  },
  {
    id: 3,
    title: 'Yoga Coach',
    icon: <div className="flex items-center"><Bot className="w-6 h-6" /><Heart className="w-4 h-4 ml-1" /></div>,
    tagline: 'Guides breath & posture for energetic balance',
    color: 'from-purple-500 to-pink-500',
    emoji: '🧘‍♀️'
  },
  {
    id: 4,
    title: 'Functional Trainer',
    icon: <div className="flex items-center"><Dumbbell className="w-6 h-6" /><Heart className="w-4 h-4 ml-1" /></div>,
    tagline: 'Helps restore physical vitality & strength',
    color: 'from-blue-500 to-indigo-500',
    emoji: '🏃‍♂️'
  },
  {
    id: 5,
    title: 'Psychologist',
    icon: <div className="flex items-center"><Brain className="w-6 h-6" /><Sparkles className="w-4 h-4 ml-1" /></div>,
    tagline: 'Supports your emotions and healing mindset',
    color: 'from-teal-500 to-cyan-500',
    emoji: '🧠'
  }
];

export function HealerIntegration() {
  const [hoveredHealer, setHoveredHealer] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-teal-900 mb-6">
            Your 5-Healer Dream Team
          </h2>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
            Each healer brings their unique expertise to create a comprehensive, personalized healing experience just for you.
          </p>
        </div>

        {/* Animated Horizontal Card Stack */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {healers.map((healer, index) => (
            <Card
              key={healer.id}
              className={`border-2 cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
                hoveredHealer === healer.id 
                  ? 'border-teal-400 shadow-2xl scale-105' 
                  : 'border-teal-100 shadow-lg hover:border-teal-300'
              }`}
              onMouseEnter={() => setHoveredHealer(healer.id)}
              onMouseLeave={() => setHoveredHealer(null)}
              style={{
                animationDelay: `${index * 200}ms`,
                animation: 'fade-in 0.8s ease-out forwards'
              }}
            >
              <CardContent className="p-6 text-center h-full flex flex-col justify-between">
                <div>
                  <div className={`w-20 h-20 bg-gradient-to-r ${healer.color} rounded-full mx-auto mb-4 flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 ${
                    hoveredHealer === healer.id ? 'scale-110 animate-glow' : ''
                  }`}>
                    {healer.icon}
                  </div>
                  
                  <div className="text-4xl mb-3">{healer.emoji}</div>
                  
                  <h3 className="text-lg font-bold text-teal-900 mb-3">
                    {healer.title}
                  </h3>
                </div>
                
                <div className={`transition-all duration-300 ${
                  hoveredHealer === healer.id 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-70 transform translate-y-2'
                }`}>
                  <p className="text-sm text-teal-700 leading-relaxed">
                    {healer.tagline}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-50 to-pink-50 rounded-full border border-teal-200">
            <Sparkles className="w-5 h-5 text-teal-600 mr-2" />
            <span className="text-teal-800 font-medium">
              All 5 healers work together on your personalized program
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}