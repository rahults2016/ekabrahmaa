'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface GoodBugCardProps {
  title: string;
  description: string;
  features?: string[];
  price?: string;
  duration?: string;
  action?: {
    text: string;
    href: string;
  };
  variant?: 'default' | 'featured';
  className?: string;
}

export function GoodBugCard({
  title,
  description,
  features = [],
  price,
  duration,
  action,
  variant = 'default',
  className = ''
}: GoodBugCardProps) {
  return (
    <Card className={`
      bg-white border border-cream-300 rounded-2xl shadow-soft hover:shadow-medium 
      transition-all duration-300 hover:scale-105 group overflow-hidden
      ${variant === 'featured' ? 'ring-2 ring-sage-300 shadow-medium' : ''}
      ${className}
    `}>
      {variant === 'featured' && (
        <div className="bg-sage-600 text-white text-center py-2">
          <span className="text-small font-medium">Most Popular</span>
        </div>
      )}
      
      <CardHeader className="p-8 pb-4">
        <div className="flex justify-between items-start mb-4">
          <CardTitle className="text-h3 text-neutral-800">{title}</CardTitle>
          {price && (
            <div className="text-right">
              <div className="text-h3 font-bold text-neutral-800">{price}</div>
              {duration && (
                <div className="text-small text-neutral-600">{duration}</div>
              )}
            </div>
          )}
        </div>
        <p className="text-body text-neutral-600 leading-relaxed">{description}</p>
      </CardHeader>

      <CardContent className="p-8 pt-0">
        {features.length > 0 && (
          <div className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-1.5 h-1.5 bg-sage-600 rounded-full mt-2.5 flex-shrink-0"></div>
                <span className="text-body text-neutral-700">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {action && (
          <Button 
            className="w-full bg-neutral-800 hover:bg-neutral-700 text-cream-100 py-3 rounded-full 
                     transition-all duration-300 group-hover:scale-105"
          >
            {action.text}
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}