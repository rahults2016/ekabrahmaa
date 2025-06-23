'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

interface GoodBugTestimonialProps {
  name: string;
  role?: string;
  location?: string;
  text: string;
  rating: number;
  image: string;
  program?: string;
}

export function GoodBugTestimonial({
  name,
  role,
  location,
  text,
  rating,
  image,
  program
}: GoodBugTestimonialProps) {
  return (
    <Card className="bg-white border border-cream-300 rounded-2xl shadow-soft hover:shadow-medium 
                     transition-all duration-300 hover:scale-105 overflow-hidden">
      <CardContent className="p-8">
        {/* Quote Icon */}
        <div className="w-8 h-8 bg-sage-100 rounded-full flex items-center justify-center mb-6">
          <Quote className="w-4 h-4 text-sage-600" />
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        {/* Testimonial Text */}
        <blockquote className="text-body text-neutral-700 leading-relaxed mb-8 italic">
          "{text}"
        </blockquote>

        {/* User Info */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-sage-200 to-cream-300 rounded-full overflow-hidden relative">
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h4 className="text-body font-medium text-neutral-800">{name}</h4>
            <div className="flex items-center space-x-2 text-small text-neutral-600">
              {role && <span>{role}</span>}
              {role && location && <span>•</span>}
              {location && <span>{location}</span>}
            </div>
            {program && (
              <div className="mt-1">
                <span className="inline-block bg-sage-100 text-sage-700 text-small px-2 py-1 rounded-full">
                  {program}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}