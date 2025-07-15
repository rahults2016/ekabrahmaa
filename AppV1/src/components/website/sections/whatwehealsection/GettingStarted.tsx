'use client';

import { Card, CardContent } from '@/components/website/ui/card';  
import { Button } from '@/components/website/ui/button';
import { Link } from 'react-router-dom';

export const GettingStarted = () => {
  return (
    <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-50 to-pink-50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-teal-900 mb-6">
            Not Sure Where to Start?
          </h2>
          <p className="text-lg lg:text-xl text-teal-700 mb-8 lg:mb-12 leading-relaxed">
            We understand that every healing journey is unique. Let us guide you to the right path.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-12">
          <Card className="border-teal-200 shadow-lg bg-white/80 backdrop-blur-sm text-center hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 lg:p-6">
              <h3 className="text-base lg:text-lg font-bold text-teal-900 mb-3">Take Our Quiz</h3>
              <p className="text-teal-700 text-xs lg:text-sm mb-4">Discover your constitution and get personalized recommendations</p>
              <Link to="/quiz">
                <Button 
                 
                  className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full text-sm transform transition-all duration-300 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                  aria-label="Start the dosha quiz"
                  onClick={() => {
                    // Track quiz start from getting started section
                    try {
                      if (typeof window !== 'undefined' && window.gtag) {
                        window.gtag('event', 'quiz_start', {
                          source: 'getting_started_section'
                        });
                      }
                    } catch (error) {
                      console.error('Analytics error:', error);
                    }
                  }}
                >
                  Start Quiz
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="border-teal-200 shadow-lg bg-white/80 backdrop-blur-sm text-center hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 lg:p-6">
              <h3 className="text-base lg:text-lg font-bold text-teal-900 mb-3">Free Consultation</h3>
              <p className="text-teal-700 text-xs lg:text-sm mb-4">Speak with our Ayurveda doctor about your specific concerns</p>
              <Link to="/consultation">
                <Button 
                  
                  className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white rounded-full text-sm transform transition-all duration-300 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                  aria-label="Book a free consultation"
                  onClick={() => {
                    // Track consultation booking from getting started section
                    try {
                      if (typeof window !== 'undefined' && window.gtag) {
                        window.gtag('event', 'consultation_booking', {
                          source: 'getting_started_section'
                        });
                      }
                    } catch (error) {
                      console.error('Analytics error:', error);
                    }
                  }}
                >
                  Book Now
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="border-teal-200 shadow-lg bg-white/80 backdrop-blur-sm text-center hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 lg:p-6">
              <h3 className="text-base lg:text-lg font-bold text-teal-900 mb-3">Browse Programs</h3>
              <p className="text-teal-700 text-xs lg:text-sm mb-4">Explore our healing programs designed for different needs</p>
              <Link to="/programs">
                <Button 
                  
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-full text-sm transform transition-all duration-300 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                  aria-label="View all healing programs"
                  onClick={() => {
                    // Track program view from getting started section
                    try {
                      if (typeof window !== 'undefined' && window.gtag) {
                        window.gtag('event', 'program_view', {
                          source: 'getting_started_section'
                        });
                      }
                    } catch (error) {
                      console.error('Analytics error:', error);
                    }
                  }}
                >
                  View Programs
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <p className="text-sm lg:text-base text-teal-600 mb-4 lg:mb-6">
            Still have questions? Our support team is here to help.
          </p>
          <Link to="/consultation">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-teal-600 text-teal-700 hover:bg-teal-50 px-6 lg:px-8 py-2 lg:py-3 rounded-full text-sm lg:text-base transform transition-all duration-300 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
              aria-label="Chat with our support team"
              onClick={() => {
                // Track support chat from getting started section
                try {
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'support_chat', {
                      source: 'getting_started_section'
                    });
                  }
                } catch (error) {
                  console.error('Analytics error:', error);
                }
              }}
            >
              Chat with our support team
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};