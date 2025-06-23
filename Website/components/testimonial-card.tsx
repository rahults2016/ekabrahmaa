'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  location: string;
  program: string;
  rating: number;
  text: string;
  image: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="border-teal-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden relative">
            <img 
              src={testimonial.image} 
              alt={testimonial.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-teal-900">{testimonial.name}</h3>
            <p className="text-sm text-teal-600">{testimonial.location}</p>
            <Badge variant="secondary" className="mt-1 bg-teal-50 text-teal-700 text-xs">
              {testimonial.program}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        
        <p className="text-teal-700 leading-relaxed italic">
          "{testimonial.text}"
        </p>
      </CardContent>
    </Card>
  );
}