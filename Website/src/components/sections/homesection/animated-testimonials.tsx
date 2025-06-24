'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Play, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// Optimize image URLs
const optimizeImageUrl = (url: string, width = 150) => {
  if (url.includes('pexels.com')) {
    return `${url}?auto=compress&cs=tinysrgb&w=${width}`;
  }
  return url;
};

interface Testimonial {
  name: string;
  location: string;
  program: string;
  rating: number;
  text: string;
  image: string;
  beforeAfter: {
    before: string;
    after: string;
  };
}

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[];
}

export function AnimatedTestimonials({ testimonials }: AnimatedTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      // Use requestAnimationFrame for smoother transitions
      requestAnimationFrame(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, testimonials.length]);

  const nextTestimonial = useCallback(() => {
    requestAnimationFrame(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    });
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    requestAnimationFrame(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    });
  }, [testimonials.length]);


  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-50 to-teal-50">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl font-serif font-bold text-teal-900 mb-6">
            Real Transformations
          </h2>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
            See how our personalized healing approach has changed lives
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Testimonial Carousel */}
          <div className="lg:col-span-2">
            <Card className="border-teal-200 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden relative">
              <div className="absolute top-4 right-4 z-10">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-white/80 hover:bg-white/90"
                >
                  <Play className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
                </Button>
              </div>

              <CardContent className="p-0">
                <div className="relative h-96 overflow-hidden">
                  <div 
                    className="flex transition-transform duration-700 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {testimonials.map((testimonial, index) => (
                      <div key={index} className="min-w-full h-full flex items-center p-8">
                        <div className="w-full">
                          <div className="flex items-start space-x-6 mb-6">
                            <div className="relative">
                              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-teal-200 relative">
                                <img
                                  src={optimizeImageUrl(testimonial.image)}
                                  alt={testimonial.name}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                  decoding="async"
                                />
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                                <Quote className="w-3 h-3 text-white" />
                              </div>
                            </div>
                            
                            <div className="flex-1">
                              <h3 className="font-bold text-teal-900 text-lg">{testimonial.name}</h3>
                              <p className="text-teal-600">{testimonial.location}</p>
                              <Badge variant="secondary" className="mt-1 bg-teal-50 text-teal-700">
                                {testimonial.program}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star 
                                key={i} 
                                className="w-5 h-5 fill-yellow-400 text-yellow-400 animate-pulse" 
                                style={{ animationDelay: `${i * 100}ms` }}
                              />
                            ))}
                          </div>
                          
                          <blockquote className="text-teal-800 text-lg leading-relaxed italic mb-6">
                            "{testimonial.text}"
                          </blockquote>

                          {/* Before/After */}
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                              <h4 className="font-semibold text-red-800 text-sm mb-1">Before:</h4>
                              <p className="text-red-700 text-sm">{testimonial.beforeAfter.before}</p>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                              <h4 className="font-semibold text-green-800 text-sm mb-1">After:</h4>
                              <p className="text-green-700 text-sm">{testimonial.beforeAfter.after}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevTestimonial}
                    className="bg-white/80 hover:bg-white/90 rounded-full"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentIndex ? 'bg-teal-600 w-8' : 'bg-teal-300'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextTestimonial}
                    className="bg-white/80 hover:bg-white/90 rounded-full"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Testimonial Grid */}
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className={`border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  index === currentIndex 
                    ? 'border-teal-500 shadow-lg scale-105' 
                    : 'border-teal-100 hover:border-teal-300'
                } bg-white/80 backdrop-blur-sm`}
                onClick={() => setCurrentIndex(index)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative">
                      <img 
                        src={optimizeImageUrl(testimonial.image)}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-teal-900">{testimonial.name}</h4>
                      <p className="text-sm text-teal-600">{testimonial.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-teal-700 text-sm line-clamp-2">
                    {testimonial.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}