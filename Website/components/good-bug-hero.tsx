'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

export function GoodBugHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="pt-32 pb-20 px-6 lg:px-8 bg-gradient-to-b from-cream-50 to-cream-100">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-display text-neutral-800 leading-tight">
                  Ancient wisdom for 
                  <span className="block text-sage-600">modern healing</span>
                </h1>
                <p className="text-body-large text-neutral-600 leading-relaxed max-w-lg">
                  Discover personalized Ayurvedic healing through our integrated team of five expert healers, designed for your unique constitution.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 py-4">
                <div className="text-center">
                  <div className="text-h3 font-bold text-neutral-800">10,000+</div>
                  <div className="text-small text-neutral-600">People healed</div>
                </div>
                <div className="w-px h-12 bg-neutral-300"></div>
                <div className="text-center">
                  <div className="text-h3 font-bold text-neutral-800">98%</div>
                  <div className="text-small text-neutral-600">Success rate</div>
                </div>
                <div className="w-px h-12 bg-neutral-300"></div>
                <div className="text-center">
                  <div className="text-h3 font-bold text-neutral-800">4.9★</div>
                  <div className="text-small text-neutral-600">Average rating</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quiz">
                  <Button className="bg-neutral-800 hover:bg-neutral-700 text-cream-100 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-medium">
                    Take Assessment
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-neutral-300 text-neutral-700 hover:bg-cream-200 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Story
                </Button>
              </div>

              {/* Additional Info */}
              <div className="pt-8 border-t border-cream-300">
                <p className="text-small text-neutral-600">
                  Join thousands who have transformed their health through personalized Ayurvedic healing
                </p>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="relative">
              {/* Main Image Container */}
              <div className="aspect-square bg-gradient-to-br from-sage-100 to-cream-200 rounded-3xl overflow-hidden shadow-large">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="w-32 h-32 bg-neutral-800 rounded-full mx-auto flex items-center justify-center">
                      <div className="w-24 h-24 bg-cream-100 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-sage-600 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-h4 text-neutral-800">Your healing journey</h3>
                      <p className="text-body text-neutral-600">Starts with understanding</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-sage-200 rounded-2xl flex items-center justify-center shadow-medium">
                <div className="w-8 h-8 bg-sage-600 rounded-lg"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-cream-300 rounded-2xl flex items-center justify-center shadow-medium">
                <div className="w-10 h-10 bg-neutral-800 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}