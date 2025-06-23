'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Moon, Sun, Droplets } from 'lucide-react';

interface DoshaInfoCardProps {
  dosha: 'vata' | 'pitta' | 'kapha';
  percentage: number;
  rank: 'primary' | 'secondary' | 'tertiary';
}

export function DoshaInfoCard({ dosha, percentage, rank }: DoshaInfoCardProps) {
  const doshaInfo = {
    vata: {
      name: 'Vata',
      element: 'Air & Space',
      description: 'The energy of movement and change',
      qualities: ['Light', 'Dry', 'Cold', 'Rough', 'Subtle', 'Mobile'],
      color: 'from-blue-500 to-purple-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      icon: <Moon className="w-6 h-6 text-blue-600" />
    },
    pitta: {
      name: 'Pitta',
      element: 'Fire & Water',
      description: 'The energy of transformation and metabolism',
      qualities: ['Hot', 'Sharp', 'Light', 'Liquid', 'Spreading', 'Oily'],
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      icon: <Sun className="w-6 h-6 text-red-600" />
    },
    kapha: {
      name: 'Kapha',
      element: 'Earth & Water',
      description: 'The energy of structure and cohesion',
      qualities: ['Heavy', 'Slow', 'Cold', 'Oily', 'Smooth', 'Dense', 'Soft', 'Stable'],
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      icon: <Droplets className="w-6 h-6 text-green-600" />
    }
  };

  const info = doshaInfo[dosha];
  
  const rankStyles = {
    primary: {
      scale: 1.05,
      shadow: 'shadow-xl',
      badge: 'bg-gradient-to-r from-teal-600 to-teal-700 text-white'
    },
    secondary: {
      scale: 1,
      shadow: 'shadow-lg',
      badge: 'bg-gradient-to-r from-teal-100 to-teal-200 text-teal-800'
    },
    tertiary: {
      scale: 0.98,
      shadow: 'shadow-md',
      badge: 'bg-gray-100 text-gray-800'
    }
  };

  const style = rankStyles[rank];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: style.scale }}
        transition={{ duration: 0.5, delay: rank === 'primary' ? 0.3 : rank === 'secondary' ? 0.4 : 0.5 }}
        className={`${style.shadow} transition-all duration-300 hover:scale-105`}
      >
        <Card className={`border-2 ${info.borderColor} overflow-hidden h-full`}>
          <div className={`h-2 bg-gradient-to-r ${info.color}`}></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full ${info.bgColor} flex items-center justify-center mr-3`}>
                  {info.icon}
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${info.textColor}`}>{info.name}</h3>
                  <p className="text-xs text-gray-600">{info.element}</p>
                </div>
              </div>
              <Badge className={style.badge}>
                {rank === 'primary' ? 'Dominant' : rank === 'secondary' ? 'Secondary' : 'Tertiary'}
              </Badge>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Presence in your constitution</span>
                <span className={`font-bold ${info.textColor}`}>{percentage}%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full bg-gradient-to-r ${info.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-4">{info.description}</p>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Key Qualities:</h4>
              <div className="flex flex-wrap gap-1">
                {info.qualities.map((quality, index) => (
                  <motion.span 
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 + (index * 0.05) }}
                    className={`text-xs ${info.bgColor} ${info.textColor} px-2 py-1 rounded-full`}
                  >
                    {quality}
                  </motion.span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}