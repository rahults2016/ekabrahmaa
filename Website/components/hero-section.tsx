'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { HealerIntegration } from '@/components/healer-integration';

export function HeroSection() {
  const [currentQuote, setCurrentQuote] = useState(0);
  
  const quotes = [
    "One Body. Five Paths. One Healing Journey.",
    "Your personalized team of 5 expert healers.",
    "Healing in harmony, not alone."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const scrollToHealers = () => {
    const healersSection = document.getElementById('healing-team');
    if (healersSection) {
      healersSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-pink-50 py-20 px-4 sm:px-6 lg:px-8">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-teal-300 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-pink-300 rounded-full animate-pulse opacity-40 animation-delay-1000"></div>
        <div className="absolute bottom-32 left-20 w-2 h-2 bg-teal-400 rounded-full animate-pulse opacity-50 animation-delay-2000"></div>
        <div className="absolute bottom-20 right-32 w-1 h-1 bg-pink-400 rounded-full animate-pulse opacity-70 animation-delay-3000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          {/* Main Quote */}
          <div className="mb-8 h-20 flex items-center justify-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-800 to-pink-600 transition-all duration-1000 leading-tight">
              {quotes[currentQuote]}
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-teal-700 mb-12 max-w-4xl mx-auto leading-relaxed">
            Unlike anything you've seen before — ekaBrahmaa brings Ayurveda, Nutrition, Yoga, Psychology, and Functional Movement together, so you don't heal alone — you heal in harmony.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              onClick={scrollToHealers}
              size="lg" 
              className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <ArrowDown className="w-5 h-5 mr-2" />
              Discover Your Healing Team
            </Button>
            
            <Link href="/quiz">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-teal-600 text-teal-700 hover:bg-teal-50 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Take the Quiz to Begin
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="w-full max-w-4xl mx-auto h-96 bg-gradient-to-br from-teal-100 to-pink-100 rounded-3xl shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-teal-200/20 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-teal-300 to-pink-300 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-teal-600" />
                    </div>
                  </div>
                  <p className="text-teal-700 font-medium">Your healing journey starts here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Healer Integration Section */}
      <div id="healing-team" className="mt-20">
        <HealerIntegration />
      </div>
    </section>
  );
}