'use client';

import { Card, CardContent } from '@/components/website/ui/card';
import { healingApproach } from '@/data/website/whatWehealConst';
import { Users} from 'lucide-react';


export const HealingApproach = () => {
  return (
    <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl font-serif font-bold text-teal-900 mb-6">
            Our 5-Healer Integration Model
          </h2>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
            Unlike traditional healthcare that treats symptoms in isolation, our integrated team addresses your whole being
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 mb-8 lg:mb-12">
          {healingApproach.map((healer, index) => (
            <Card key={index} className="border-teal-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm text-center group transform hover:scale-105">
              <CardContent className="p-4 lg:p-6">
                <h3 className="text-base lg:text-lg font-bold text-teal-900 mb-3">
                  {healer.title}
                </h3>
                <p className="text-xs lg:text-sm text-teal-700 leading-relaxed">
                  {healer.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-teal-600 to-pink-600 text-white rounded-full shadow-lg">
            <Users className="w-5 h-5 mr-2" />
            <span className="font-medium text-sm lg:text-base">All 5 healers collaborate on your personalized treatment plan</span>
          </div>
        </div>
      </div>
    </section>
  );
}; 