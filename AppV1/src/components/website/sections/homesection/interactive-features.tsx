'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/website/ui/card';
import { Button } from '@/website/ui/button';
import { Badge } from '@/website/ui/badge';
import { Progress } from '@/website/ui/progress';
import { Clock, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HomeNavButton } from '@/website/HomeNavButtons';

// Memoize expensive operations
const calculateProgressIncrement = (currentProgress: number) => {
  if (currentProgress >= 100) {
    return 100;
  }
  return currentProgress + 2.5;
};

interface Program {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  price: string;
  healers: number;
  type: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
}

interface InteractiveFeaturesProps {
  programs: Program[];
}

export function InteractiveFeatures({ programs }: InteractiveFeaturesProps) {
  const [activeProgram, setActiveProgram] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  useEffect(() => {
    // Use requestAnimationFrame for smoother transitions
    const interval = setInterval(() => {
      requestAnimationFrame(() => {
        setActiveProgram((prev) => (prev + 1) % programs.length);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [programs.length]);

  useEffect(() => {
    setProgress(0);
    
    let animationFrameId: number;
    let lastTimestamp: number;
    
    const updateProgress = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      
      if (elapsed > 100) { // Update every 100ms
        lastTimestamp = timestamp;
        setProgress(prev => calculateProgressIncrement(prev));
      }
      
      if (progress < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };
    
    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [activeProgram, progress]);

  return (
    <section id="features-section" className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-8 md:mb-12 lg:mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-teal-900 mb-4 md:mb-6">
            Choose Your Healing Path
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
            Whether you prefer guided support or independent exploration, we have programs designed for your healing style
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Interactive Program Display */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <Card className="border-teal-200 shadow-xl md:shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
              <div className="relative">
                <div className={`h-2 bg-gradient-to-r ${programs[activeProgram].color} transition-all duration-1000`}>
                  <div 
                    className="h-full bg-white/30 transition-all duration-100 ease-linear"
                    style={{ width: `${100 - progress}%` }}
                  />
                </div>
                
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${programs[activeProgram].color} rounded-full flex items-center justify-center text-white shadow-lg animate-pulse`}>
                      {programs[activeProgram].icon}
                    </div>
                    <div className="text-right">
                      <div className="text-xl md:text-2xl lg:text-3xl font-bold text-teal-900">{programs[activeProgram].price}</div>
                      <div className="text-xs md:text-sm text-teal-600">{programs[activeProgram].duration}</div>
                    </div>
                  </div>

                  <Badge 
                    variant="secondary" 
                    className="mb-4 bg-gradient-to-r from-teal-50 to-pink-50 text-teal-700 border-teal-200"
                  >
                    {programs[activeProgram].type}
                  </Badge>

                  <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-teal-900 mb-2">
                    {programs[activeProgram].title}
                  </h3>
                  
                  <h4 className="text-lg md:text-xl font-medium text-pink-600 mb-4">
                    {programs[activeProgram].subtitle}
                  </h4>
                  
                  <p className="text-sm md:text-base text-teal-700 leading-relaxed mb-4 md:mb-6">
                    {programs[activeProgram].description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mb-4 md:mb-6 text-xs md:text-sm text-teal-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{programs[activeProgram].duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{programs[activeProgram].healers} Expert Healers</span>
                    </div>
                  </div>

                  <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    <h5 className="font-semibold text-teal-800">Program Includes:</h5>
                    {programs[activeProgram].features.map((feature, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center space-x-2 transform transition-all duration-500 ${
                          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0'
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                        <span className="text-teal-700 text-xs md:text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={`/programs/${programs[activeProgram].id}`}>
                    <Button 
                      className={`w-full bg-gradient-to-r ${programs[activeProgram].color} text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                    >
                      Start {programs[activeProgram].title}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
              <Link 
                to={`/programs/${programs[activeProgram].id}`}
                onClick={() => {
                  // Track click event
                  try {
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'program_click', {
                        program_id: programs[activeProgram].id,
                        program_title: programs[activeProgram].title
                      });
                    }
                  } catch (error) {
                    console.error('Analytics error:', error);
                  }
                }}
              >
              </Link>
            </Card>
          </div>

          {/* Program Selection Grid */}
          <div className={`space-y-3 md:space-y-4 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'} overflow-y-auto max-h-[500px] md:max-h-none pr-1`}>
            {programs.map((program, index) => (
              <Card 
                key={index}
                className={`border-2 cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
                  index === activeProgram 
                    ? 'border-teal-500 shadow-xl scale-105' 
                    : 'border-teal-100 hover:border-teal-300'
                } bg-white/80 backdrop-blur-sm flex-shrink-0`}
                onClick={() => setActiveProgram(index)}
              >
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r ${program.color} rounded-full flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                      {program.icon}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-bold text-teal-900 text-sm md:text-base">{program.title}</h4>
                      <p className="text-pink-600 font-medium text-xs md:text-sm">{program.subtitle}</p>
                      <div className="flex items-center space-x-3 mt-1 text-xs md:text-sm text-teal-600">
                        <span className="whitespace-nowrap">{program.duration}</span>
                        <span className="whitespace-nowrap">{program.healers} Healers</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg md:text-xl font-bold text-teal-900">{program.price}</div>
                      <Badge variant="outline" className="text-xs border-teal-200 text-teal-700 whitespace-nowrap">
                        {program.type}
                      </Badge>
                    </div>
                  </div>

                  {/* Progress Bar for Active Program */}
                  {index === activeProgram && (
                    <div className="mt-4">
                      <Progress value={progress} className="h-1" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 md:mt-12">
          <HomeNavButton
            primary
            label="View All Programs"
            href="/programs"
            ariaLabel="Browse all healing programs"
            trackingCategory="features_section"
          />
        </div>
      </div>
    </section>
  );
}