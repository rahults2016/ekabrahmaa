'use client';

import { Button } from '@/components/ui/button';
import { Calendar, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WhatWeDoHeroSection = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-50 via-white to-pink-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-3 h-3 bg-teal-300 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-pink-300 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-32 left-20 w-4 h-4 bg-teal-400 rounded-full animate-pulse opacity-50"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-teal-900 mb-6 leading-tight">
              Healing Through Ancient Wisdom: Your Journey to Wholeness
            </h1>
            <p className="text-xl text-teal-700 mb-8 leading-relaxed">
              Ayurveda sees every symptom as a story. We address the root cause, not just the label.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-4 rounded-full">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Free Consultation
              </Button>
              <Link to="/quiz">
                <Button variant="outline" size="lg" className="border-2 border-teal-600 text-teal-700 hover:bg-teal-50 px-8 py-4 rounded-full">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Take Dosha Assessment
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-teal-100 to-pink-100 rounded-3xl shadow-2xl overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/6663467/pexels-photo-6663467.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Holistic healing through Ayurveda"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};