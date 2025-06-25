'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { healthConditions } from '@/config/whatWehealConst';


export const TreatmentCategories = () => {
  const [activeCategory, setActiveCategory] = useState('womensHealth');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-teal-900 mb-6">
            What We Heal
          </h2>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
            Our holistic approach addresses the root causes of health conditions across all aspects of your well-being
          </p>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-12 bg-white/50 p-2 rounded-2xl border border-teal-100">
            {Object.entries(healthConditions).map(([key, category]) => (
              <TabsTrigger 
                key={key} 
                value={key}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-teal-700 data-[state=active]:text-white rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300"
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
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="relative h-64 lg:h-auto">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 to-transparent"></div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-full grid place-items-center text-white`}>
                        {category.icon}
                      </div>
                      <h3 className="text-3xl font-serif font-bold text-teal-900">
                        {category.title}
                      </h3>
                    </div>
                    
                    <p className="text-teal-700 leading-relaxed mb-6 text-lg">
                      {category.perspective}
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-teal-800">Conditions We Treat:</h4>
                      <div className="grid gap-3">
                        {category.conditions.map((condition, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-teal-50 to-pink-50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h5 className="font-medium text-teal-800">{condition.name}</h5>
                              <p className="text-sm text-teal-700">{condition.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full">
                        Learn More About Treatment
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
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