'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/website/ui/card';
import { Button } from '@/components/website/ui/button';
import { Input } from '@/components/website/ui/input';
import { HomeNavButton } from '@/components/website/HomeNavButtons';
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
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-50 to-pink-50">
        <div className="max-w-4xl mx-auto">
          <Card className="border-teal-200 shadow-xl md:shadow-2xl bg-white/90 backdrop-blur-sm text-center overflow-hidden">
            <CardContent className="p-6 md:p-8 lg:p-12">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full mx-auto mb-4 md:mb-6 flex items-center justify-center animate-pulse">
                <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              
              <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-teal-900 mb-3 md:mb-4">
                Welcome to the ekaBrahmaa Family! 🎉
              </h3>
              
              <p className="text-base md:text-lg lg:text-xl text-teal-700 mb-6 md:mb-8 leading-relaxed">
                Thank you for subscribing! You'll receive your first dose of healing wisdom within 24 hours.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="text-center p-3 md:p-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg">
                  <Gift className="w-6 h-6 md:w-8 md:h-8 text-teal-600 mx-auto mb-1 md:mb-2" />
                  <h4 className="font-semibold text-teal-800 text-sm md:text-base">Free Guide</h4>
                  <p className="text-xs md:text-sm text-teal-700">5-Day Ayurvedic Morning Routine</p>
                </div>
                <div className="text-center p-3 md:p-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg">
                  <Calendar className="w-6 h-6 md:w-8 md:h-8 text-pink-600 mx-auto mb-1 md:mb-2" />
                  <h4 className="font-semibold text-pink-800 text-sm md:text-base">Weekly Tips</h4>
                  <p className="text-xs md:text-sm text-pink-700">Seasonal wellness insights</p>
                </div>
                <div className="text-center p-3 md:p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                  <Users className="w-6 h-6 md:w-8 md:h-8 text-purple-600 mx-auto mb-1 md:mb-2" />
                  <h4 className="font-semibold text-purple-800 text-sm md:text-base">Community</h4>
                  <p className="text-xs md:text-sm text-purple-700">Exclusive member events</p>
                </div>
              </div>
              
              <Button 
                onClick={() => setIsSubscribed(false)}
                variant="outline" 
                className="border-teal-200 text-teal-700 hover:bg-teal-50 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                aria-label="Subscribe to our newsletter"
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
    <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-50 to-pink-50">
      <div className="max-w-4xl mx-auto">
        <Card className="border-teal-200 shadow-xl md:shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0 flex-col-reverse lg:flex-row">
            {/* Content Side */}
            <div className={`p-6 md:p-8 lg:p-12 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'} order-2 lg:order-1`}>
              <div className="mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-teal-900">
                  Join Our Healing Community
                </h3>
              </div>
              
              <p className="text-base md:text-lg lg:text-xl text-teal-700 mb-6 md:mb-8 leading-relaxed">
                Get weekly Ayurvedic wisdom, seasonal health tips, and exclusive insights from our team of healers delivered straight to your inbox.
              </p>

              {/* Benefits */}
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
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
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    </div>
                    <span className="text-teal-700 text-sm md:text-base">{benefit}</span>
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
                    className="pl-10 md:pl-12 pr-4 py-3 md:py-4 text-base md:text-lg border-teal-200 focus:border-teal-400 focus:ring-teal-400 rounded-full"
                    required
                  />
                  <Mail className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-teal-500 w-4 h-4 md:w-5 md:h-5" />
                </div>
                
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-teal-600 to-pink-600 hover:from-teal-700 hover:to-pink-700 text-white py-3 md:py-4 text-base md:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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

              <p className="text-xs md:text-sm text-teal-600 text-center mt-3 md:mt-4">
                Join 50,000+ people on their healing journey. Unsubscribe anytime.
              </p>
              
              <div className="mt-8">
                <HomeNavButton
                  label="Explore Our Programs"
                  href="/programs"
                  ariaLabel="View our healing programs"
                  trackingCategory="newsletter_section"
                />
              </div>
            </div>

            {/* Visual Side */}
            <div className={`bg-gradient-to-br from-teal-500 to-pink-500 p-6 md:p-8 lg:p-12 text-white flex items-center justify-center transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'} order-1 lg:order-2 min-h-[200px] md:min-h-[300px] lg:min-h-0`}>
              <div className="text-center">
                <div className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-white/20 rounded-full mx-auto mb-4 md:mb-6 lg:mb-8 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white/30 rounded-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white animate-pulse" />
                  </div>
                </div>
                
                <h4 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Ancient Wisdom, Modern Life</h4>
                <p className="text-base md:text-lg opacity-90 leading-relaxed">
                  Discover the secrets of Ayurveda and how to apply them in your daily routine for lasting health and happiness.
                </p>
                
                <div className="mt-4 md:mt-6 lg:mt-8 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl md:text-2xl font-bold">50K+</div>
                    <div className="text-xs md:text-sm opacity-80">Subscribers</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold">4.9★</div>
                    <div className="text-xs md:text-sm opacity-80">Rating</div>
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