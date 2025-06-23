'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Sparkles, CheckCircle, ArrowRight, Gift, Calendar, Users } from 'lucide-react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 2000);
  };

  if (isSubscribed) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-50 to-pink-50">
        <div className="max-w-4xl mx-auto">
          <Card className="border-teal-200 shadow-2xl bg-white/90 backdrop-blur-sm text-center overflow-hidden">
            <CardContent className="p-12">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-serif font-bold text-teal-900 mb-4">
                Welcome to the ekaBrahmaa Family! 🎉
              </h3>
              
              <p className="text-xl text-teal-700 mb-8 leading-relaxed">
                Thank you for subscribing! You'll receive your first dose of healing wisdom within 24 hours.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg">
                  <Gift className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-teal-800">Free Guide</h4>
                  <p className="text-sm text-teal-700">5-Day Ayurvedic Morning Routine</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg">
                  <Calendar className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-pink-800">Weekly Tips</h4>
                  <p className="text-sm text-pink-700">Seasonal wellness insights</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                  <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-purple-800">Community</h4>
                  <p className="text-sm text-purple-700">Exclusive member events</p>
                </div>
              </div>
              
              <Button 
                onClick={() => setIsSubscribed(false)}
                variant="outline" 
                className="border-teal-200 text-teal-700 hover:bg-teal-50"
              >
                Back to Homepage
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-50 to-pink-50">
      <div className="max-w-4xl mx-auto">
        <Card className="border-teal-200 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Content Side */}
            <div className={`p-8 lg:p-12 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-teal-900">
                  Join Our Healing Community
                </h3>
              </div>
              
              <p className="text-xl text-teal-700 mb-8 leading-relaxed">
                Get weekly Ayurvedic wisdom, seasonal health tips, and exclusive insights from our team of healers delivered straight to your inbox.
              </p>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                {[
                  'Weekly personalized wellness tips',
                  'Seasonal Ayurvedic recipes',
                  'Exclusive member-only content',
                  'Early access to new programs',
                  'Free downloadable guides'
                ].map((benefit, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-3 transform transition-all duration-500 ${
                      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-teal-700">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg border-teal-200 focus:border-teal-400 focus:ring-teal-400 rounded-full"
                    required
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-500 w-5 h-5" />
                </div>
                
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-teal-600 to-pink-600 hover:from-teal-700 hover:to-pink-700 text-white py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Subscribing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Start Your Healing Journey
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </div>
                  )}
                </Button>
              </form>

              <p className="text-sm text-teal-600 text-center mt-4">
                Join 50,000+ people on their healing journey. Unsubscribe anytime.
              </p>
            </div>

            {/* Visual Side */}
            <div className={`bg-gradient-to-br from-teal-500 to-pink-500 p-8 lg:p-12 text-white flex items-center justify-center transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="text-center">
                <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-8 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-white animate-pulse" />
                  </div>
                </div>
                
                <h4 className="text-2xl font-bold mb-4">Ancient Wisdom, Modern Life</h4>
                <p className="text-lg opacity-90 leading-relaxed">
                  Discover the secrets of Ayurveda and how to apply them in your daily routine for lasting health and happiness.
                </p>
                
                <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">50K+</div>
                    <div className="text-sm opacity-80">Subscribers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">4.9★</div>
                    <div className="text-sm opacity-80">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}