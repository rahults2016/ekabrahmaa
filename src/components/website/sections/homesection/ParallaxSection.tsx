'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/website/ui/card';
import { Leaf, Sparkles, Users, Clock, Star } from 'lucide-react';
import { HomeNavButton } from '@/components/website/HomeNavButtons';

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
      className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-900 via-slate-800 to-teal-900 text-white relative overflow-hidden"
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
        <div className={`text-center mb-8 md:mb-12 lg:mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-4 md:mb-6 bg-gradient-to-r from-teal-300 to-pink-300 bg-clip-text text-transparent">
            Your Healing Transformation Awaits
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
            Join thousands who have discovered the power of integrated healing through our unique 5-healer approach
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">5-Healer Integration</h3>
                  <p className="text-teal-200 text-sm md:text-base">Ayurveda Doctor, Nutritionist, Yoga Therapist, Functional Trainer, and Psychologist working together for your complete wellness.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">Personalized Approach</h3>
                  <p className="text-teal-200 text-sm md:text-base">Every program is tailored to your unique constitution (Prakriti) and current health state for maximum effectiveness.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">Proven Results</h3>
                  <p className="text-teal-200 text-sm md:text-base">Most clients see significant improvements within 14 days, with lasting changes that transform their relationship with health.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-12">
              <HomeNavButton
                primary
                label="Start Your Journey Today"
                href="/quiz"
                ariaLabel="Begin your healing journey with ekaBrahmaa"
                trackingCategory="parallax_section"
              />
            </div>
          </div>

          {/* Right Visual */}
          <div className={`relative transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="relative">
              {/* Main Card */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6 md:p-8 text-center transform hover:scale-105 transition-all duration-500">
                <CardContent className="space-y-4 md:space-y-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-teal-300 to-pink-300 rounded-full mx-auto flex items-center justify-center shadow-2xl">
                    <Leaf className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white animate-pulse" />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-4">Begin Your Transformation</h3>
                  
                  <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
                    <div>
                      <div className="text-lg md:text-xl lg:text-2xl font-bold text-teal-300">10K+</div>
                      <div className="text-xs md:text-sm text-teal-200">Healed</div>
                    </div>
                    <div>
                      <div className="text-lg md:text-xl lg:text-2xl font-bold text-pink-300">98%</div>
                      <div className="text-xs md:text-sm text-pink-200">Success</div>
                    </div>
                    <div>
                      <div className="text-lg md:text-xl lg:text-2xl font-bold text-green-300">4.9★</div>
                      <div className="text-xs md:text-sm text-green-200">Rating</div>
                    </div>
                  </div>
                  
                  <p className="text-white/80 text-sm md:text-base">
                    Join our global community of healers and start your transformation today
                  </p>
                </CardContent>
              </Card>

              {/* Floating Elements */}
              <div 
                className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg animate-bounce"
                style={{ 
                  willChange: 'transform',
                  transform: `translateY(${scrollY * 0.1}px)`,
                  animationDelay: '0.5s'
                }}
              >
                <Star className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              
              <div 
                className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-14 h-14 md:w-20 md:h-20 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                style={{ 
                  willChange: 'transform',
                  transform: `translateY(${scrollY * -0.05}px) rotate(${scrollY * 0.1}deg)`
                }}
              >
                <Sparkles className="w-7 h-7 md:w-10 md:h-10 text-white animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}