'use client';

import { Button } from '@/website/ui/button';
import { Input } from '@/website/ui/input';
import { 
  Leaf, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Linkedin,
  ArrowRight,
  Heart,
  Shield,
  Award,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';


const footerSections = {
  programs: {
    title: 'Healing Programs',
    links: [
      { title: 'ekaPavana - 7 Days', href: '/programs/ekapavana', description: 'Gentle cleansing' },
      { title: 'ekaSanskara - 14 Days', href: '/programs/ekasanskara', description: 'Deep transformation' },
      { title: 'ekaSamanvaya - 21 Days', href: '/programs/ekasamanvaya', description: 'Complete harmony' },
      { title: 'ekaUdaya - 28 Days', href: '/programs/ekaudaya', description: 'Rise into radiance' },
      { title: 'ekaPrabodha - 45 Days', href: '/programs/ekaprabodha', description: 'Awaken wisdom' }
    ]
  },
  conditions: {
    title: 'What We Heal',
    links: [
      { title: "Women's Health", href: '/what-we-heal#womens-health', description: '' },
      { title: 'Digestive Health', href: '/what-we-heal#digestive-health', description: '' },
      { title: 'Mental Wellness', href: '/what-we-heal#mental-wellness', description: '' },
      { title: 'Hormonal Balance', href: '/what-we-heal#hormonal-balance', description: '' },
      { title: 'Lifestyle Conditions', href: '/what-we-heal#lifestyle-conditions', description: '' }
    ]
  },
  support: {
    title: 'Support & Resources',
    links: [
      { title: 'Free Consultation', href: '/consultation', description: '' },
      { title: 'Dosha Quiz', href: '/quiz', description: '' },
      { title: 'Ayurvedic Blogs', href: '/blogs', description: '' },
      { title: 'Healing Stories', href: '/stories', description: '' },
      { title: 'Help Center', href: '/help', description: '' },
      { title: 'Contact Us', href: '/contact', description: '' }
    ]
  },
  company: {
    title: 'Company',
    links: [
      { title: 'About Us', href: '/about', description: '' },
      { title: 'Our Healers', href: '/healers', description: '' },
      { title: 'Careers', href: '/careers', description: '' },
      { title: 'Press', href: '/press', description: '' },
      { title: 'Partnerships', href: '/partnerships', description: '' }
    ]
  },
  legal: {
    title: 'Legal',
    links: [
      { title: 'Privacy Policy', href: '/privacy', description: '' },
      { title: 'Terms of Service', href: '/terms', description: '' },
      { title: 'Medical Disclaimer', href: '/disclaimer', description: '' },
      { title: 'Refund Policy', href: '/refund', description: '' },
      { title: 'Cookie Policy', href: '/cookies', description: '' }
    ]
  }
};

const socialLinks = [
  { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
  { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
  { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
  { icon: <Youtube className="w-5 h-5" />, href: '#', label: 'YouTube' },
  { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' }
];

const trustIndicators = [
  { icon: <Shield className="w-5 h-5" />, text: 'HIPAA Compliant' },
  { icon: <Award className="w-5 h-5" />, text: 'Certified Practitioners' },
  { icon: <Heart className="w-5 h-5" />, text: '10,000+ Healed' },
  { icon: <Clock className="w-5 h-5" />, text: '24/7 Support' }
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-teal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-4">
                Stay Connected to Your Healing Journey
              </h3>
              <p className="text-teal-200 leading-relaxed">
                Get weekly Ayurvedic wisdom, seasonal health tips, and exclusive insights from our healers delivered to your inbox.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 bg-white/10 border-teal-600 text-white placeholder:text-teal-300 focus:border-teal-400 focus:ring-teal-400 rounded-full"
                />
                <Button className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <p className="text-xs text-teal-300">
                Join 50,000+ people on their healing journey. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-serif font-bold">ekaBrahmaa</span>
                <p className="text-sm text-teal-300">One Source • Infinite Healing</p>
              </div>
            </div>
            
            <p className="text-teal-200 leading-relaxed mb-6">
              One Source. Infinite Healing. We integrate 5,000-year-old Ayurvedic wisdom with modern healing practices to address the root cause of your health challenges.
            </p>

            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-teal-200">
                <Mail className="w-4 h-4 text-teal-400" />
                <span className="text-sm">info@ekabrahmaa.com</span>
              </div>
              <div className="flex items-center space-x-3 text-teal-200">
                <Phone className="w-4 h-4 text-teal-400" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 text-teal-200">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span className="text-sm">Mumbai, Delhi, Bangalore</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-teal-700 hover:bg-teal-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(footerSections).map(([key, section]) => (
              <div key={key}>
                <h4 className="font-semibold text-lg mb-4 text-white">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.href}
                        className="text-teal-200 hover:text-white transition-colors duration-200 text-sm group flex items-start"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {link.title}
                        </span>
                      </Link>
                      {link.description && (
                        <p className="text-xs text-teal-400 mt-1">{link.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-teal-700">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center space-x-3 text-teal-200">
                <div className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center">
                  {indicator.icon}
                </div>
                <span className="text-sm font-medium">{indicator.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-teal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-teal-200 text-sm">
                &copy; 2024 ekaBrahmaa. All rights reserved. Healing through ancient wisdom.
              </p>
              <p className="text-teal-400 text-xs mt-1">
                This website is not intended to diagnose, treat, cure, or prevent any disease. Always consult with a qualified healthcare provider.
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-teal-200 hover:text-white transition-colors duration-200">
                Privacy
              </Link>
              <Link to="/terms" className="text-teal-200 hover:text-white transition-colors duration-200">
                Terms
              </Link>
              <Link to="/disclaimer" className="text-teal-200 hover:text-white transition-colors duration-200">
                Disclaimer
              </Link>
              <div className="flex items-center space-x-2 text-teal-300">
                <Heart className="w-4 h-4" />
                <span>Made with love in India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}