'use client';

import { Card, CardContent } from '@/components/ui/card';
import { 
  Sparkles, 
  UserPlus, 
  Target, 
  Users, 
  Calendar, 
  Smartphone,
  ArrowRight
} from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Prakriti Quiz',
    description: 'Discover your unique mind-body constitution through our comprehensive 20-question assessment',
    icon: <Sparkles className="w-8 h-8" />,
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 2,
    title: 'Login/Signup',
    description: 'Create your account with basic information to begin your personalized journey',
    icon: <UserPlus className="w-8 h-8" />,
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 3,
    title: 'Dosha Analysis',
    description: 'Get detailed insights into your constitution and what it means for your health',
    icon: <Target className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 4,
    title: 'Matched Healers',
    description: 'Meet your personalized team of 5 expert healers selected for your unique needs',
    icon: <Users className="w-8 h-8" />,
    color: 'from-teal-500 to-green-500'
  },
  {
    id: 5,
    title: 'Program Selection',
    description: 'Choose the perfect healing program duration and intensity for your lifestyle',
    icon: <Calendar className="w-8 h-8" />,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 6,
    title: 'App Guidance',
    description: 'Access your personalized healing plan through our comprehensive mobile app',
    icon: <Smartphone className="w-8 h-8" />,
    color: 'from-teal-600 to-pink-500'
  }
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-teal-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-teal-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
            Your journey to personalized healing in 6 simple steps
          </p>
        </div>

        {/* Desktop: Horizontal Flow */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-pink-200 via-teal-200 to-pink-200 transform -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-6 gap-4 relative z-10">
              {steps.map((step, index) => (
                <div key={step.id} className="text-center">
                  <Card className="border-2 border-teal-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm mb-4">
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full mx-auto mb-4 flex items-center justify-center text-white shadow-lg`}>
                        {step.icon}
                      </div>
                      <h3 className="text-lg font-bold text-teal-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-teal-700 leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                  <div className="text-sm font-semibold text-teal-600">
                    Step {step.id}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical Flow */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center space-x-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                {step.icon}
              </div>
              <Card className="border-2 border-teal-100 shadow-lg bg-white/90 backdrop-blur-sm flex-1">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-teal-900">
                      {step.title}
                    </h3>
                    <span className="text-sm font-semibold text-teal-600">
                      Step {step.id}
                    </span>
                  </div>
                  <p className="text-sm text-teal-700 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-teal-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}