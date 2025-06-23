'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Leaf, Menu, X } from 'lucide-react';
import Link from 'next/link';

export function GoodBugHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { title: 'What We Heal', href: '/what-we-heal' },
    { title: 'Programs', href: '/programs' },
    { title: 'Stories', href: '/stories' },
    { title: 'Resources', href: '/resources' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-cream-100/95 backdrop-blur-md border-b border-cream-200 shadow-soft' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 lg:py-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Leaf className="w-5 h-5 text-cream-100" />
            </div>
            <span className="text-h4 font-medium text-neutral-800">ekaBrahmaa</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="text-body text-neutral-700 hover:text-neutral-800 transition-colors duration-300 font-medium relative group"
              >
                {item.title}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neutral-800 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-neutral-700 hover:text-neutral-800 hover:bg-cream-200/50 transition-all duration-300"
            >
              Sign In
            </Button>
            <Button className="bg-neutral-800 hover:bg-neutral-700 text-cream-100 px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-medium">
              Start Healing
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-neutral-800" />
            ) : (
              <Menu className="w-6 h-6 text-neutral-800" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen 
          ? 'max-h-screen opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="bg-cream-100 border-t border-cream-200 px-6 py-6">
          <nav className="space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="block text-body text-neutral-700 hover:text-neutral-800 transition-colors duration-300 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="mt-6 space-y-3">
            <Button 
              variant="outline" 
              className="w-full border-neutral-300 text-neutral-700 hover:bg-cream-200"
            >
              Sign In
            </Button>
            <Button className="w-full bg-neutral-800 hover:bg-neutral-700 text-cream-100">
              Start Healing
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}