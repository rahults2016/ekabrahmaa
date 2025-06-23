'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Leaf, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Facebook, 
  Twitter, 
  Instagram, 
  Heart 
} from 'lucide-react';
import Link from 'next/link';

export function ModernFooter() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);
    
    // Simulate newsletter subscription
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubscriptionSuccess(true);
      setEmail('');
      setTimeout(() => setSubscriptionSuccess(false), 3000);
    } catch (error) {
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-teal-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-pink-400 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-serif font-bold">ekaBrahmaa</span>
            </div>
            <p className="text-teal-200 leading-relaxed">
              One Source. Infinite Healing. Your journey to wellness begins here.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Programs</h3>
            <div className="space-y-2">
              <Link href="/programs/ekapavana" className="block text-teal-200 hover:text-white transition-colors">ekaPavana</Link>
              <Link href="/programs/ekasanskara" className="block text-teal-200 hover:text-white transition-colors">ekaSanskara</Link>
              <Link href="/programs/ekanidra" className="block text-teal-200 hover:text-white transition-colors">ekaNidra</Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <div className="space-y-2">
              <Link href="/consultation" className="block text-teal-200 hover:text-white transition-colors">Consultations</Link>
              <Link href="/blogs" className="block text-teal-200 hover:text-white transition-colors">Blogs</Link>
              <Link href="/stories" className="block text-teal-200 hover:text-white transition-colors">Healing Stories</Link>
              <Link href="/contact" className="block text-teal-200 hover:text-white transition-colors">Contact Us</Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-teal-200">
                <Mail className="w-4 h-4 text-teal-400" />
                <span>hello@ekabrahmaa.com</span>
              </div>
              <div className="flex items-center space-x-3 text-teal-200">
                <Phone className="w-4 h-4 text-teal-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 text-teal-200">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>Mumbai, Delhi, Bangalore</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium text-sm mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-teal-200 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-teal-200 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-teal-200 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-teal-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <form onSubmit={handleNewsletterSubmit} className="flex max-w-md">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-teal-800 border-teal-700 text-white placeholder:text-teal-300 rounded-l-full focus:ring-teal-500 focus:border-teal-500"
                  required
                />
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-r-full"
                  disabled={isSubscribing}
                >
                  {isSubscribing ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </span>
                  ) : subscriptionSuccess ? (
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Subscribed!
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Subscribe
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="text-teal-200 hover:text-white transition-colors text-sm">
                Privacy
              </Link>
              <Link href="/terms" className="text-teal-200 hover:text-white transition-colors text-sm">
                Terms
              </Link>
              <Link href="/disclaimer" className="text-teal-200 hover:text-white transition-colors text-sm">
                Disclaimer
              </Link>
            </div>
          </div>
          
          <Separator className="bg-teal-800 my-6" />
          
          <div className="text-center text-teal-300 text-sm flex items-center justify-center">
            <span>&copy; 2024 ekaBrahmaa. All rights reserved.</span>
            <Heart className="w-4 h-4 mx-2 text-pink-400" />
            <span>Made with love in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}