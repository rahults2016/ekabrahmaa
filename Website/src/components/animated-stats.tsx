'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Award, Globe, Heart, Star, TrendingUp, Shield, Clock } from 'lucide-react';

const stats = [
  {
    icon: <Users className="w-8 h-8" />,
    number: 10000,
    suffix: '+',
    label: 'People Healed',
    description: 'Transformed lives across the globe',
    color: 'from-teal-500 to-teal-600'
  },
  {
    icon: <Award className="w-8 h-8" />,
    number: 98,
    suffix: '%',
    label: 'Success Rate',
    description: 'Proven healing outcomes',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: <Globe className="w-8 h-8" />,
    number: 50,
    suffix: '+',
    label: 'Countries',
    description: 'Global healing community',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: <Star className="w-8 h-8" />,
    number: 4.9,
    suffix: '/5',
    label: 'Rating',
    description: 'Outstanding client satisfaction',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    number: 87,
    suffix: '%',
    label: 'Improvement',
    description: 'Average health improvement',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    number: 100,
    suffix: '%',
    label: 'Natural',
    description: 'Chemical-free healing',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    icon: <Heart className="w-8 h-8" />,
    number: 24,
    suffix: '/7',
    label: 'Support',
    description: 'Round-the-clock care',
    color: 'from-pink-500 to-pink-600'
  },
  {
    icon: <Clock className="w-8 h-8" />,
    number: 14,
    suffix: ' days',
    label: 'Average',
    description: 'Time to see results',
    color: 'from-indigo-500 to-indigo-600'
  }
];

export function AnimatedStats() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState<number[]>(new Array(stats.length).fill(0));
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startNumberAnimation();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const startNumberAnimation = () => {
    stats.forEach((stat, index) => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = stat.number / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.number) {
          current = stat.number;
          clearInterval(timer);
        }
        
        setAnimatedNumbers(prev => {
          const newNumbers = [...prev];
          newNumbers[index] = current;
          return newNumbers;
        });
      }, duration / steps);
    });
  };

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl font-serif font-bold text-teal-900 mb-6">
            Proven Results, Real Impact
          </h2>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
            Numbers that tell the story of transformation and healing
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className={`border-teal-100 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm group transform hover:scale-105 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full mx-auto mb-4 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                
                <div className="mb-2">
                  <span className="text-3xl md:text-4xl font-bold text-teal-900">
                    {stat.number === 4.9 
                      ? animatedNumbers[index].toFixed(1) 
                      : Math.floor(animatedNumbers[index]).toLocaleString()}
                  </span>
                  <span className="text-2xl font-bold text-teal-700">{stat.suffix}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-teal-800 mb-2">
                  {stat.label}
                </h3>
                
                <p className="text-sm text-teal-600 leading-relaxed">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Bars */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {[
            { label: 'Energy Improvement', value: 94, color: 'bg-gradient-to-r from-green-500 to-green-600' },
            { label: 'Sleep Quality', value: 89, color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
            { label: 'Stress Reduction', value: 92, color: 'bg-gradient-to-r from-purple-500 to-purple-600' }
          ].map((item, index) => (
            <div 
              key={index}
              className={`transform transition-all duration-1000 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}
              style={{ transitionDelay: `${(index + 8) * 100}ms` }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-teal-800 font-medium">{item.label}</span>
                <span className="text-teal-600 font-bold">{item.value}%</span>
              </div>
              <div className="w-full bg-teal-100 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full ${item.color} rounded-full transition-all duration-2000 ease-out`}
                  style={{ 
                    width: isVisible ? `${item.value}%` : '0%',
                    transitionDelay: `${(index + 8) * 200}ms`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}