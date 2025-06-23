'use client';

import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  Leaf, 
  Users, 
  Clock, 
  Star, 
  ArrowRight, 
  Sparkles,
  Sun,
  Moon,
  Droplets,
  Apple,
  Play,
  Smartphone,
  QrCode,
  CheckCircle,
  Download,
  ChevronDown,
  Instagram,
  Twitter,
  Facebook,
  MessageCircle,
  Mail,
  Zap,
  Target,
  TrendingUp,
  Award,
  Shield,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ModernHeroSection } from '@/components/modern-hero-section';

// Lazy load components that are below the fold
const AnimatedTestimonials = lazy(() => import('@/components/animated-testimonials').then(mod => ({ default: mod.AnimatedTestimonials })));
const InteractiveFeatures = lazy(() => import('@/components/interactive-features').then(mod => ({ default: mod.InteractiveFeatures })));
const UGCGallery = lazy(() => import('@/components/ugc-gallery').then(mod => ({ default: mod.UGCGallery })));
const AnimatedStats = lazy(() => import('@/components/animated-stats').then(mod => ({ default: mod.AnimatedStats })));
const SocialFeed = lazy(() => import('@/components/social-feed').then(mod => ({ default: mod.SocialFeed })));
const AnimatedFAQ = lazy(() => import('@/components/animated-faq').then(mod => ({ default: mod.AnimatedFAQ })));
const ParallaxSection = lazy(() => import('@/components/parallax-section').then(mod => ({ default: mod.ParallaxSection })));
const NewsletterSignup = lazy(() => import('@/components/newsletter-signup').then(mod => ({ default: mod.NewsletterSignup })));

// Dynamically import FloatingElements with SSR disabled
const FloatingElements = dynamic(() => import('@/components/floating-elements').then(mod => ({ default: mod.FloatingElements })), {
  ssr: false
});

const programs = [
  {
    id: 'ekapavana',
    title: 'ekaPavana',
    subtitle: 'Clear Within',
    description: 'Reconnect with your body, breath, and being.',
    duration: '7 Days',
    price: '₹3,999',
    healers: 2,
    type: 'Self-Guided',
    icon: <Droplets className="w-6 h-6" />,
    features: ['Daily consultations', 'Personalized meal plan', 'Yoga sessions', 'Breathing exercises'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'ekasanskara',
    title: 'ekaSanskara',
    subtitle: 'Transform Deeply',
    description: 'Deep transformation through ancient wisdom.',
    duration: '14 Days',
    price: '₹7,999',
    healers: 3,
    type: 'Healer-Guided',
    icon: <Sun className="w-6 h-6" />,
    features: ['Intensive consultations', 'Custom herbal formulations', 'Lifestyle coaching', 'Emotional support'],
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'ekanidra',
    title: 'ekaNidra',
    subtitle: 'Rest & Restore',
    description: 'Healing through restorative sleep and rest.',
    duration: '10 Days',
    price: '₹5,499',
    healers: 2,
    type: 'Ailment-Specific',
    icon: <Moon className="w-6 h-6" />,
    features: ['Sleep assessment', 'Meditation sessions', 'Herbal teas', 'Relaxation techniques'],
    color: 'from-purple-500 to-indigo-500'
  }
];

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    program: 'ekaPavana',
    rating: 5,
    text: 'The 7-day cleanse was transformative. I feel lighter, more energetic, and deeply connected to my body again.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    beforeAfter: {
      before: 'Constant fatigue, digestive issues',
      after: 'Energetic, clear skin, better sleep'
    }
  },
  {
    name: 'Rajesh Kumar',
    location: 'Delhi',
    program: 'ekaSanskara',
    rating: 5,
    text: 'Two weeks of personalized healing changed my life. The healers understood my unique constitution perfectly.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    beforeAfter: {
      before: 'High stress, irregular eating',
      after: 'Balanced lifestyle, improved focus'
    }
  },
  {
    name: 'Anita Patel',
    location: 'Bangalore',
    program: 'ekaNidra',
    rating: 5,
    text: 'Finally found peace with my sleep patterns. The holistic approach addressed root causes, not just symptoms.',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
    beforeAfter: {
      before: 'Insomnia, anxiety',
      after: 'Deep sleep, mental clarity'
    }
  }
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProgram, setActiveProgram] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate programs
    const interval = setInterval(() => {
      setActiveProgram(prev => (prev + 1) % programs.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 relative overflow-hidden">
      <FloatingElements />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-teal-100 shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-pink-400 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-serif font-bold text-teal-800 group-hover:text-teal-900 transition-colors">ekaBrahmaa</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/what-we-heal" className="text-teal-700 hover:text-teal-900 transition-all duration-300 hover:scale-105">What We Heal</Link>
              <Link href="/programs" className="text-teal-700 hover:text-teal-900 transition-all duration-300 hover:scale-105">Programs</Link>
              <Link href="/stories" className="text-teal-700 hover:text-teal-900 transition-all duration-300 hover:scale-105">Healing Stories</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="hidden sm:flex border-teal-200 text-teal-700 hover:bg-teal-50 hover:scale-105 transition-all duration-300">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Modern Hero Section with proper spacing */}
      <ModernHeroSection />
      
      <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div></div>}>
        {/* Animated Stats Section with top margin */}
        <div className="mt-16 lg:mt-20 lazy-content">
          <AnimatedStats />
        </div>

        {/* Interactive Features Section */}
        <div className="mt-16 lg:mt-20 lazy-content">
          <InteractiveFeatures programs={programs} />
        </div>

        {/* Parallax Program Showcase */}
        <div className="mt-16 lg:mt-20 lazy-content">
          <ParallaxSection />
        </div>

        {/* UGC Gallery */}
        <div className="mt-16 lg:mt-20 lazy-content">
          <UGCGallery />
        </div>

        {/* Animated Testimonials */}
        <div className="mt-16 lg:mt-20 lazy-content">
          <AnimatedTestimonials testimonials={testimonials} />
        </div>

        {/* Social Media Feed */}
        <div className="mt-16 lg:mt-20 lazy-content">
          <SocialFeed />
        </div>

        {/* Animated FAQ */}
        <div className="mt-16 lg:mt-20 lazy-content">
          <AnimatedFAQ />
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 lg:mt-20 lazy-content">
          <NewsletterSignup />
        </div>
      </Suspense>

      {/* App Download Section with Parallax */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 text-white relative overflow-hidden mt-16 lg:mt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-teal-300 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-pink-300 rounded-full animate-pulse opacity-40 animation-delay-1000"></div>
          <div className="absolute bottom-32 left-20 w-2 h-2 bg-teal-400 rounded-full animate-pulse opacity-50 animation-delay-2000"></div>
          <div className="absolute bottom-20 right-32 w-1 h-1 bg-pink-400 rounded-full animate-pulse opacity-70 animation-delay-3000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="flex items-center mb-6">
                <Smartphone className="w-8 h-8 text-teal-400 mr-3" />
                <h2 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">
                  Your Healing Journey, Always Within Reach
                </h2>
              </div>
              
              <p className="text-lg sm:text-xl text-teal-100 mb-8 leading-relaxed">
                Take your personalized healing program with you everywhere. The ekaBrahmaa app puts your healers, 
                meal plans, meditation sessions, and progress tracking right in your pocket.
              </p>

              {/* App Features with Animation */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  'Real-time healer support',
                  'Personalized meal plans',
                  'Guided meditations',
                  'Progress tracking',
                  'Yoga & exercise videos',
                  'Offline content access'
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-3 transform transition-all duration-500 hover:scale-105 ${
                      isVisible ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle className="w-5 h-5 text-teal-400" />
                    <span className="text-teal-100">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button className="bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Apple className="w-5 h-5 mr-2" />
                  <div className="text-left">
                    <div className="text-xs opacity-80">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </Button>
                
                <Button className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Play className="w-5 h-5 mr-2" />
                  <div className="text-left">
                    <div className="text-xs opacity-80">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </Button>
              </div>

              {/* QR Code Link */}
              <div className="flex items-center space-x-3 text-teal-300">
                <QrCode className="w-5 h-5" />
                <span className="text-sm">Scan QR code to download instantly</span>
              </div>
            </div>

            {/* Visual Element */}
            <div className={`relative transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="relative">
                {/* QR Code Card */}
                <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8 text-center hover:scale-105 transition-all duration-500">
                  <div className="w-48 h-48 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-500">
                    <div className="text-center">
                      <QrCode className="w-20 h-20 text-teal-600 mx-auto mb-3 animate-pulse" />
                      <p className="text-sm text-teal-700 font-medium">Scan to Download</p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">Quick Download</h3>
                  <p className="text-teal-200 text-sm">
                    Point your camera at the QR code to instantly download the ekaBrahmaa app
                  </p>
                </Card>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-teal-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Download className="w-6 h-6 text-white" />
                </div>
                
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-pink-400 to-teal-400 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-8 h-8 text-white animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            {[
              { number: '50,000+', label: 'App Downloads' },
              { number: '4.8★', label: 'App Store Rating' },
              { number: '24/7', label: 'Healer Support' }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`transform transition-all duration-1000 hover:scale-110 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-teal-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer with top margin */}
      <footer className="bg-teal-900 text-white py-16 px-4 sm:px-6 lg:px-8 mt-16 lg:mt-20">
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
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <div className="space-y-2">
                <Link href="/privacy" className="block text-teal-200 hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="block text-teal-200 hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/disclaimer" className="block text-teal-200 hover:text-white transition-colors">Medical Disclaimer</Link>
              </div>
            </div>
          </div>
          
          <Separator className="bg-teal-700 mb-8" />
          
          <div className="text-center text-teal-200">
            <p>&copy; 2024 ekaBrahmaa. All rights reserved. Healing through ancient wisdom.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}