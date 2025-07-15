'use client';

import { Link } from 'react-router-dom';
import { Button } from '@/components/website/ui/button';
import { Input } from '@/components/website/ui/input';
import { Leaf, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const colors = {
  background: '#F8F9FA',
  text: '#1D1D1F',
  textSecondary: '#6E6E73',
  border: '#D2D2D7',
  primary: '#007AFF'
};

const footerSections = {
  company: {
    title: 'Company',
    links: [
      { title: 'About Us', href: '/about' },
      { title: 'Our Healers', href: '/healers' },
      { title: 'Careers', href: '/careers' },
      { title: 'Press', href: '/press' }
    ]
  },
  programs: {
    title: 'Programs',
    links: [
      { title: 'ekaPavana', href: '/programs/ekapavana' },
      { title: 'ekaSanskara', href: '/programs/ekasanskara' },
      { title: 'ekaSamanvaya', href: '/programs/ekasamanvaya' },
      { title: 'All Programs', href: '/programs' }
    ]
  },
  resources: {
    title: 'Resources',
    links: [
      { title: 'Healing Stories', href: '/stories' },
      { title: 'Blog', href: '/blog' },
      { title: 'Help Center', href: '/help' },
      { title: 'Contact', href: '/contact' }
    ]
  }
};

const socialLinks = [
  { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
  { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
  { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
  { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' }
];

export function ProfessionalFooter() {
  return (
    <footer style={{ backgroundColor: colors.background }}>
      {/* Main Footer Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-pink-400 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <span 
                  className="text-xl font-serif font-bold"
                  style={{ color: colors.text }}
                >
                  ekaBrahmaa
                </span>
              </div>
            </div>
            
            <p 
              className="text-sm leading-relaxed mb-6"
              style={{ color: colors.textSecondary }}
            >
              Ancient wisdom meets modern healing. Personalized wellness programs designed by expert healers for your unique constitution.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center transition-all duration-200 hover:border-gray-300 hover:shadow-sm"
                  style={{ color: colors.textSecondary }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key} className="lg:col-span-1">
              <h4 
                className="font-semibold text-sm mb-4"
                style={{ color: colors.text }}
              >
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-sm transition-colors duration-200 hover:opacity-70"
                      style={{ color: colors.textSecondary }}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Signup */}
          <div className="lg:col-span-1">
            <h4 
              className="font-semibold text-sm mb-4"
              style={{ color: colors.text }}
            >
              Stay Updated
            </h4>
            <p 
              className="text-sm mb-4"
              style={{ color: colors.textSecondary }}
            >
              Get weekly wellness tips and program updates.
            </p>
            
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md bg-white focus:border-gray-300 focus:ring-1 focus:ring-gray-300 outline-none"
              />
              <Button
                className="w-full text-white text-sm font-medium rounded-md transition-all duration-200 hover:brightness-105"
                style={{
                  backgroundColor: colors.primary,
                  padding: '8px 16px'
                }}
              >
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p 
                className="text-sm"
                style={{ color: colors.textSecondary }}
              >
                © 2024 ekaBrahmaa. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <Link 
                  to="/privacy" 
                  className="text-sm transition-colors duration-200 hover:opacity-70"
                  style={{ color: colors.textSecondary }}
                >
                  Privacy Policy
                </Link>
                <Link 
                  to="/terms" 
                  className="text-sm transition-colors duration-200 hover:opacity-70"
                  style={{ color: colors.textSecondary }}
                >
                  Terms of Service
                </Link>
                <Link 
                  to="/disclaimer" 
                  className="text-sm transition-colors duration-200 hover:opacity-70"
                  style={{ color: colors.textSecondary }}
                >
                  Medical Disclaimer
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span 
                className="text-sm"
                style={{ color: colors.textSecondary }}
              >
                Made with
              </span>
              <span className="text-red-500">♥</span>
              <span 
                className="text-sm"
                style={{ color: colors.textSecondary }}
              >
                in India
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}