'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';
import { faqs,categories } from '@/config/constants';


export function AnimatedFAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredFAQs = activeCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl font-serif font-bold text-teal-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-teal-700 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about your healing journey with ekaBrahmaa
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white' 
                  : 'border-teal-200 text-teal-700 hover:bg-teal-50'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4 mb-12">
          {filteredFAQs.map((faq, index) => (
            <Card 
              key={faq.id}
              className={`border-teal-100 shadow-lg hover:shadow-xl transition-all duration-500 bg-white/90 backdrop-blur-sm overflow-hidden ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardHeader 
                className="cursor-pointer hover:bg-teal-50 transition-colors duration-300"
                onClick={() => toggleFAQ(faq.id)}
              >
                <CardTitle className="flex items-center justify-between text-lg text-teal-900">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span>{faq.question}</span>
                  </div>
                  <div className={`transform transition-transform duration-300 ${
                    openFAQ === faq.id ? 'rotate-180' : ''
                  }`}>
                    <ChevronDown className="w-5 h-5 text-teal-600" />
                  </div>
                </CardTitle>
              </CardHeader>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openFAQ === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <CardContent className="pt-0 pb-6">
                  <div className="border-l-4 border-teal-200 pl-6 ml-4">
                    <p className="text-teal-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Contact Support */}
        <Card className="border-teal-200 shadow-xl bg-gradient-to-r from-teal-50 to-pink-50">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-serif font-bold text-teal-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-teal-700 mb-8 leading-relaxed">
              Our support team is here to help you every step of the way. Get in touch with us for personalized assistance.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="border-teal-200 text-teal-700 hover:bg-teal-50 p-6 h-auto flex flex-col items-center space-y-2 hover:scale-105 transition-all duration-300"
              >
                <MessageCircle className="w-6 h-6" />
                <span className="font-medium">Live Chat</span>
                <span className="text-sm opacity-75">Instant support</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="border-teal-200 text-teal-700 hover:bg-teal-50 p-6 h-auto flex flex-col items-center space-y-2 hover:scale-105 transition-all duration-300"
              >
                <Phone className="w-6 h-6" />
                <span className="font-medium">Call Us</span>
                <span className="text-sm opacity-75">+91 98765 43210</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="border-teal-200 text-teal-700 hover:bg-teal-50 p-6 h-auto flex flex-col items-center space-y-2 hover:scale-105 transition-all duration-300"
              >
                <Mail className="w-6 h-6" />
                <span className="font-medium">Email Us</span>
                <span className="text-sm opacity-75">hello@ekabrahmaa.com</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}