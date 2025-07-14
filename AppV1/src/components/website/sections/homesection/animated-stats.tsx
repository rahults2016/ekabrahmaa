'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/website/ui/card';
import { stats } from '@/data/constants';

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
    <section ref={sectionRef} className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-8 md:mb-12 lg:mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-teal-900 mb-4 md:mb-6">
            Proven Results, Real Impact
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
            Numbers that tell the story of transformation and healing
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-0">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className={`border-teal-100 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm group transform hover:scale-105 min-w-[140px] ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4 md:p-6 text-center">
                <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${stat.color} rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                
                <div className="mb-2">
                  <span className="text-xl md:text-2xl lg:text-3xl font-bold text-teal-900">
                    {stat.number === 4.9 
                      ? animatedNumbers[index].toFixed(1) 
                      : Math.floor(animatedNumbers[index]).toLocaleString()}
                  </span>
                  <span className="text-lg md:text-xl lg:text-2xl font-bold text-teal-700">{stat.suffix}</span>
                </div>
                
                <h3 className="text-base md:text-lg font-semibold text-teal-800 mb-1 md:mb-2">
                  {stat.label}
                </h3>
                
                <p className="text-xs md:text-sm text-teal-600 leading-relaxed">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Bars */}
        <div className="mt-8 md:mt-12 lg:mt-16 grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
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