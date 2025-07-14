'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/website/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/website/ui/tabs';
import { Button } from '@/website/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { healthConditions } from '@/data/whatWehealConst';


export const TreatmentCategories = () => {
  const [activeCategory, setActiveCategory] = useState('womensHealth');

  return (
    <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl font-serif font-bold text-teal-900 mb-6">
            What We Heal
          </h2>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
            Our holistic approach addresses the root causes of health conditions across all aspects of your well-being
          </p>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8 lg:mb-12 bg-white/50 p-2 rounded-2xl border border-teal-100">
            {Object.entries(healthConditions).map(([key, category]) => (
              <TabsTrigger 
                key={key} 
                value={key}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-teal-700 data-[state=active]:text-white rounded-xl px-3 lg:px-4 py-2 lg:py-3 text-xs lg:text-sm font-medium transition-all duration-300"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5">
                    {category.icon}
                  </div>
                  <span className="hidden sm:inline">{category.title}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(healthConditions).map(([key, category]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <Card className="border-teal-100 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto order-2 lg:order-1">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                      {category.title}
                    </span>
                  </div>
                  
                  <div className="p-6 lg:p-8 order-1 lg:order-2">
                    <div className="mb-4">
                      <h3 className="text-2xl lg:text-3xl font-serif font-bold text-teal-900">
                        {category.title}
                      </h3>
                    </div>
                    
                    <p className="text-teal-700 leading-relaxed mb-6 text-base lg:text-lg">
                      {category.perspective}
                    </p>
                    
                    <div className="space-y-4 mb-6">
                      <h4 className="text-base lg:text-lg font-semibold text-teal-800">Conditions We Treat:</h4>
                      <div className="grid gap-3 max-h-80 overflow-y-auto">
                        {category.conditions.map((condition, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-teal-50 to-pink-50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h5 className="font-medium text-teal-800 text-sm lg:text-base">{condition.name}</h5>
                              <p className="text-xs lg:text-sm text-teal-700">{condition.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 lg:mt-8">
                      <Link to="/treatment">
                        <Button 
                          className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                          aria-label={`Learn more about ${category.title} treatment`}
                        >
                          Learn More About Treatment
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};