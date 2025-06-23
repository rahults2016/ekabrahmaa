'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Sparkles, ArrowRight, Users, Clock, Star } from 'lucide-react';

// Throttle scroll events for better performance
const useThrottledScrollY = () => {
  const [scrollY, setScrollY] = useState(0);
  const lastScrollTime = useRef(0);
  
  const handleScroll = useCallback(() => {
    const now = Date.now();
    if (now - lastScrollTime.current > 16) { // ~60fps
      lastScrollTime.current = now;
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    }
  }, []);
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  
  return scrollY;
};

export function ParallaxSection() {
  const scrollY = useThrottledScrollY();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-900 via-slate-800 to-teal-900 text-white relative overflow-hidden"
    >
      {/* Parallax Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"
          style={{
            willChange: 'transform',
            transform: `translateY(${scrollY * 0.3}px) translateX(${scrollY * 0.1}px)`,
            left: '10%',
            top: '20%'
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-pink-500/20 rounded-full blur-2xl"
          style={{
            willChange: 'transform',
            transform: `translateY(${scrollY * -0.2}px) translateX(${scrollY * -0.05}px)`,
            right: '15%',
            bottom: '30%'
          }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              willChange: 'transform',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translateY(${scrollY * (0.1 + Math.random() * 0.2)}px)`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 bg-gradient-to-r from-teal-300 to-pink-300 bg-clip-text text-transparent">
            Your Healing Transformation Awaits
          </h2>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
            Join thousands who have discovered the power of integrated healing through our unique 5-healer approach
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">5-Healer Integration</h3>
                  <p className="text-teal-200">Ayurveda Doctor, Nutritionist, Yoga Therapist, Functional Trainer, and Psychologist working together for your complete wellness.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Personalized Approach</h3>
                  <p className="text-teal-200">Every program is tailored to your unique constitution (Prakriti) and current health state for maximum effectiveness.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Proven Results</h3>
                  <p className="text-teal-200">Most clients see significant improvements within 14 days, with lasting changes that transform their relationship with health.</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Your Journey Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Right Visual */}
          <div className={`relative transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="relative">
              {/* Main Card */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-8 text-center transform hover:scale-105 transition-all duration-500">
                <CardContent className="space-y-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-teal-300 to-pink-300 rounded-full mx-auto flex items-center justify-center shadow-2xl">
                    <Leaf className="w-12 h-12 text-white animate-pulse" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">Begin Your Transformation</h3>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-teal-300">10K+</div>
                      <div className="text-sm text-teal-200">Healed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-pink-300">98%</div>
                      <div className="text-sm text-pink-200">Success</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-300">4.9★</div>
                      <div className="text-sm text-green-200">Rating</div>
                    </div>
                  </div>
                  
                  <p className="text-white/80">
                    Join our global community of healers and start your transformation today
                  </p>
                </CardContent>
              </Card>

              {/* Floating Elements */}
              <div 
                className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg animate-bounce"
                style={{ 
                  willChange: 'transform',
                  transform: `translateY(${scrollY * 0.1}px)`,
                  animationDelay: '0.5s'
                }}
              >
                <Star className="w-8 h-8 text-white" />
              </div>
              
              <div 
                className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                style={{ 
                  willChange: 'transform',
                  transform: `translateY(${scrollY * -0.05}px) rotate(${scrollY * 0.1}deg)`
                }}
              >
                <Sparkles className="w-10 h-10 text-white animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}