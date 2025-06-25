'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Sparkles, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GettingStarted = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-50 to-pink-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-serif font-bold text-teal-900 mb-6">
          Not Sure Where to Start?
        </h2>
        <p className="text-xl text-teal-700 mb-12 leading-relaxed">
          We understand that every healing journey is unique. Let us guide you to the right path.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="border-teal-200 shadow-lg bg-white/80 backdrop-blur-sm text-center hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full mx-auto mb-4 grid place-items-center text-white">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-teal-900 mb-3">Take Our Quiz</h3>
              <p className="text-teal-700 text-sm mb-4">Discover your constitution and get personalized recommendations</p>
              <Link to="/quiz">
                <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full">
                  Start Quiz
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="border-teal-200 shadow-lg bg-white/80 backdrop-blur-sm text-center hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full mx-auto mb-4 grid place-items-center text-white">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-teal-900 mb-3">Free Consultation</h3>
              <p className="text-teal-700 text-sm mb-4">Speak with our Ayurveda doctor about your specific concerns</p>
              <Link to="/consultation">
                <Button className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white rounded-full">
                  Book Now
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="border-teal-200 shadow-lg bg-white/80 backdrop-blur-sm text-center hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mx-auto mb-4 grid place-items-center text-white">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-teal-900 mb-3">Browse Programs</h3>
              <p className="text-teal-700 text-sm mb-4">Explore our healing programs designed for different needs</p>
              <Link to="/programs">
                <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-full">
                  View Programs
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <p className="text-teal-600 mb-6">
            Still have questions? Our support team is here to help.
          </p>
          <Button variant="outline" size="lg" className="border-2 border-teal-600 text-teal-700 hover:bg-teal-50 px-8 py-3 rounded-full">
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat with Support
          </Button>
        </div>
      </div>
    </section>
  );
};