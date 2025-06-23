'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function ModernHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    // Use requestAnimationFrame for smoother scrolling
    requestAnimationFrame(() => {
      setIsScrolled(window.scrollY > 20);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const isActivePath = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const navigationItems = [
    {
      title: 'What We Heal',
      href: '/what-we-heal',
      description: 'Conditions we treat with Ayurveda',
      hasDropdown: true,
      dropdownItems: [
        { title: "Women's Health", href: '/what-we-heal#womens-health' },
        { title: 'Digestive Health', href: '/what-we-heal#digestive-health' },
        { title: 'Mental Wellness', href: '/what-we-heal#mental-wellness' },
        { title: 'Hormonal Balance', href: '/what-we-heal#hormonal-balance' },
        { title: 'Lifestyle Conditions', href: '/what-we-heal#lifestyle-conditions' }
      ]
    },
    {
      title: 'Programs',
      href: '/programs',
      description: 'Healing programs for every need',
      hasDropdown: true,
      dropdownItems: [
        { title: 'ekaPavana - 7 Days', href: '/programs/ekapavana' },
        { title: 'ekaSanskara - 14 Days', href: '/programs/ekasanskara' },
        { title: 'ekaSamanvaya - 21 Days', href: '/programs/ekasamanvaya' },
        { title: 'ekaUdaya - 28 Days', href: '/programs/ekaudaya' },
        { title: 'ekaPrabodha - 45 Days', href: '/programs/ekaprabodha' }
      ]
    },
    {
      title: 'Blogs',
      href: '/blogs',
      description: 'Ayurvedic wisdom and insights',
      hasDropdown: false
    },
    {
      title: 'Consultations',
      href: '/consultation',
      description: 'Talk to our healers',
      hasDropdown: false
    }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-teal-100 shadow-lg will-change-transform' 
        : 'bg-white/80 backdrop-blur-md border-b border-teal-100 will-change-transform'
    }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-pink-400 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <span className="text-2xl font-serif font-bold text-teal-800 group-hover:text-teal-900 transition-colors">ekaBrahmaa</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div
                key={item.title}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center space-x-1 text-sm font-medium transition-all duration-300 ${
                    isActivePath(item.href)
                      ? 'text-teal-700'
                      : 'text-teal-600 hover:text-teal-700'
                  }`}
                >
                  <span>{item.title}</span>
                  {item.hasDropdown && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === item.title ? 'rotate-180' : ''
                    }`} />
                  )}
                </Link>

                {item.hasDropdown && item.dropdownItems && (
                  <div
                    className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 transition-all duration-300 ${
                      activeDropdown === item.title
                        ? 'opacity-100 visible transform translate-y-0'
                        : 'opacity-0 invisible transform -translate-y-2'
                    }`}
                  >
                    {item.dropdownItems.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.title}
                        href={dropdownItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors duration-300"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {dropdownItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="hidden sm:flex border-teal-200 text-teal-700 hover:bg-teal-50 hover:scale-105 transition-all duration-300">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Started
            </Button>
            <button
              className="md:hidden p-2 text-teal-700 hover:text-teal-900 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 top-20 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <nav className="space-y-6">
              {navigationItems.map((item) => (
                <div key={item.title} className="space-y-2">
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-lg font-medium text-teal-700 hover:text-teal-900 hover:bg-teal-50 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                  {item.hasDropdown && item.dropdownItems && (
                    <div className="ml-4 space-y-1">
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.title}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-base text-teal-600 hover:text-teal-800 hover:bg-teal-50 rounded-lg transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {dropdownItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
          <div className="border-t border-gray-200 p-4 space-y-3">
            <Button variant="outline" className="w-full border-teal-200 text-teal-700 hover:bg-teal-50">
              Sign In
            </Button>
            <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}