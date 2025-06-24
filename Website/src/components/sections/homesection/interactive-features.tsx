'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Users, ArrowRight, CheckCircle } from 'lucide-react';

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
    <section id="features-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl font-serif font-bold text-teal-900 mb-6">
            Choose Your Healing Path
          </h2>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
            Whether you prefer guided support or independent exploration, we have programs designed for your healing style
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Program Display */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <Card className="border-teal-200 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
              <div className="relative">
                <div className={`h-2 bg-gradient-to-r ${programs[activeProgram].color} transition-all duration-1000`}>
                  <div 
                    className="h-full bg-white/30 transition-all duration-100 ease-linear"
                    style={{ width: `${100 - progress}%` }}
                  />
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${programs[activeProgram].color} rounded-full flex items-center justify-center text-white shadow-lg animate-pulse`}>
                      {programs[activeProgram].icon}
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-teal-900">{programs[activeProgram].price}</div>
                      <div className="text-sm text-teal-600">{programs[activeProgram].duration}</div>
                    </div>
                  </div>

                  <Badge 
                    variant="secondary" 
                    className="mb-4 bg-gradient-to-r from-teal-50 to-pink-50 text-teal-700 border-teal-200"
                  >
                    {programs[activeProgram].type}
                  </Badge>

                  <h3 className="text-3xl font-serif font-bold text-teal-900 mb-2">
                    {programs[activeProgram].title}
                  </h3>
                  
                  <h4 className="text-xl font-medium text-pink-600 mb-4">
                    {programs[activeProgram].subtitle}
                  </h4>
                  
                  <p className="text-teal-700 leading-relaxed mb-6">
                    {programs[activeProgram].description}
                  </p>

                  <div className="flex items-center space-x-6 mb-6 text-sm text-teal-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{programs[activeProgram].duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{programs[activeProgram].healers} Expert Healers</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
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
                        <span className="text-teal-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className={`w-full bg-gradient-to-r ${programs[activeProgram].color} text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    Start {programs[activeProgram].title}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Program Selection Grid */}
          <div className={`space-y-4 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            {programs.map((program, index) => (
              <Card 
                key={index}
                className={`border-2 cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
                  index === activeProgram 
                    ? 'border-teal-500 shadow-xl scale-105' 
                    : 'border-teal-100 hover:border-teal-300'
                } bg-white/80 backdrop-blur-sm`}
                onClick={() => setActiveProgram(index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${program.color} rounded-full flex items-center justify-center text-white shadow-lg`}>
                      {program.icon}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-bold text-teal-900">{program.title}</h4>
                      <p className="text-pink-600 font-medium">{program.subtitle}</p>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-teal-600">
                        <span>{program.duration}</span>
                        <span>{program.healers} Healers</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xl font-bold text-teal-900">{program.price}</div>
                      <Badge variant="outline" className="text-xs border-teal-200 text-teal-700">
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

        <div className="text-center mt-12">
          <Button size="lg" className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-3 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            View All Programs
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}