'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, ArrowRight } from 'lucide-react';

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
}

interface ProgramCardProps {
  program: Program;
}

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Card className="border-teal-100 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm group transform hover:scale-105">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-teal-100 to-pink-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            {program.icon}
          </div>
          <Badge 
            variant="secondary" 
            className="bg-gradient-to-r from-teal-50 to-pink-50 text-teal-700 border-teal-200"
          >
            {program.type}
          </Badge>
        </div>
        
        <CardTitle className="text-2xl font-serif text-teal-900 mb-2">
          {program.title}
        </CardTitle>
        <CardDescription className="text-lg font-medium text-pink-600 mb-3">
          {program.subtitle}
        </CardDescription>
        <p className="text-teal-700 leading-relaxed">
          {program.description}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-teal-600">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{program.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{program.healers} Healers</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-semibold text-teal-800 text-sm">What You'll Get:</h4>
          <ul className="text-sm text-teal-700 space-y-1">
            {program.features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center justify-between pt-4">
          <div className="text-2xl font-bold text-teal-900">
            {program.price}
          </div>
          <Button 
            className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full"
          >
            Start Program
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}