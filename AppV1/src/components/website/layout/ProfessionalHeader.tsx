'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/website/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/website/ui/sheet';
import { Link, useLocation } from 'react-router-dom';
import { 
  Leaf, 
  Menu,   
  ChevronDown, 
} from 'lucide-react';
import { QuizModal } from './QuizModal';

// Professional color scheme matching gabit.com aesthetic
const colors = {
  primary: '#007AFF',
  primaryHover: '#0056CC',
  text: '#1D1D1F',
  textSecondary: '#6E6E73',
  border: '#D2D2D7',
  background: '#FFFFFF',
  backgroundSecondary: '#F8F9FA'
};

interface NavItem {
  title: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    title: 'What We Heal',
    href: '/what-we-heal',
    children: [
      { title: "Women's Health", href: '/what-we-heal#womens-health' },
      { title: 'Digestive Health', href: '/what-we-heal#digestive-health' },
      { title: 'Mental Wellness', href: '/what-we-heal#mental-wellness' },
      { title: 'Hormonal Balance', href: '/what-we-heal#hormonal-balance' }
    ]
  },
  {
    title: 'Programs',
    href: '/programs',
    children: [
      { title: 'ekaPavana', href: '/programs/ekapavana' },
      { title: 'ekaSanskara', href: '/programs/ekasanskara' },
      { title: 'ekaSamanvaya', href: '/programs/ekasamanvaya' }
    ]
  },
  {
    title: 'Healing Stories',
    href: '/stories'
  },
  {
    title: 'About',
    href: '/about'
  }
];

export function ProfessionalHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [quizButtonRef, setQuizButtonRef] = useState<HTMLElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActivePath = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const handleMouseEnter = (itemTitle: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setActiveDropdown(itemTitle);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
    setDropdownTimeout(timeout);
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
  };

  // Find and store reference to the quiz button on the homepage
  useEffect(() => {
    if (location.pathname === '/') {
      const quizButton = document.getElementById('homepage-quiz-button');
      if (quizButton) {
        setQuizButtonRef(quizButton);
      }
    } else {
      setQuizButtonRef(null);
    }
  }, [location.pathname]);

  const openQuizModal = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    
    // If we're on the homepage and found the quiz button, scroll to it
    if (location.pathname === '/' && quizButtonRef) {
      e.preventDefault();
      quizButtonRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add a subtle highlight effect
      quizButtonRef.classList.add('animate-pulse');
      setTimeout(() => {
        quizButtonRef.classList.remove('animate-pulse');
      }, 2000);
    } else {
      // On other pages, open the quiz modal
      setIsQuizModalOpen(true);
    }
  }, [location.pathname, quizButtonRef]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-200 ease-in-out ${
        isScrolled 
          ? 'bg-white shadow-[0_2px_4px_rgba(0,0,0,0.08)]' 
          : 'bg-white'
      }`}
      style={{ 
        height: window.innerWidth >= 1200 ? '72px' : '56px'
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="flex items-center mr-4 group transition-all duration-200 ease-in-out hover:opacity-80"
          >
            <div 
              className="bg-gradient-to-r from-teal-600 to-pink-400 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200"
              style={{ 
                width: '32px',
                height: '32px'
              }}
            >
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="ml-3 hidden sm:block">
              <span 
                className="font-serif font-bold transition-colors duration-200"
                style={{ 
                  fontSize: '20px',
                  color: colors.text,
                  lineHeight: '1.2'
                }}
              >
                ekaBrahmaa
              </span>
              <p className="text-xs text-teal-600 -mt-1 font-medium">One Source • Infinite Healing</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-grow">
            <div className="flex items-center space-x-6">
              {navigationItems.map((item) => (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => item.children && handleMouseEnter(item.title)}
                  onMouseLeave={() => item.children && handleMouseLeave()}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-[15px] font-medium transition-all duration-200 ease-in-out ${
                      isActivePath(item.href)
                        ? `font-semibold`
                        : 'font-normal hover:opacity-70'
                    }`}
                    style={{ 
                      color: colors.text,
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                    }}
                  >
                    <span>{item.title}</span>
                    {item.children && (
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.title ? 'rotate-180' : ''
                        }`} 
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.children && (
                    <div 
                      className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden transition-all duration-200 ease-in-out ${
                        activeDropdown === item.title 
                          ? 'opacity-100 visible translate-y-0' 
                          : 'opacity-0 invisible -translate-y-2'
                      }`}
                      style={{ minWidth: '200px' }}
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="py-2">
                        {item.children.map((child, index) => (
                          <Link
                            key={index}
                            to={child.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link to="/quiz">
              <Button
                onClick={openQuizModal}
                aria-label="Take the dosha quiz"
                className="text-white text-[14px] font-medium rounded-md transition-all duration-200 ease-in-out hover:brightness-105"
                style={{
                  backgroundColor: colors.primary,
                  padding: '12px 24px',
                  borderRadius: '6px'
                }}
              >
                Take Quiz
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2 hover:bg-gray-50 rounded-md"
                aria-label="Toggle mobile menu"
              >
                <Menu className="w-6 h-6" style={{ color: colors.text }} />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-full sm:w-96 bg-white border-l border-gray-200"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <SheetHeader className="flex items-center justify-between p-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-pink-400 rounded-full flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <SheetTitle className="text-xl font-serif font-bold" style={{ color: colors.text }}>
                      ekaBrahmaa
                    </SheetTitle>
                  </div>
                </SheetHeader>

                {/* Mobile Navigation */}
                <nav className="flex-1 p-4">
                  <div className="space-y-1">
                    {navigationItems.map((item) => (
                      <div key={item.title}>
                        <Link
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block px-4 py-3 rounded-lg transition-colors duration-200 ${
                            isActivePath(item.href)
                              ? 'bg-gray-50 font-semibold'
                              : 'hover:bg-gray-50'
                          }`}
                          style={{ color: colors.text }}
                        >
                          {item.title}
                        </Link>
                        
                        {/* Mobile Submenu */}
                        {item.children && (
                          <div className="ml-4 mt-1 space-y-1">
                            {item.children.map((child, index) => (
                              <Link
                                key={index}
                                to={child.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                style={{ color: colors.textSecondary }}
                              >
                                {child.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </nav>

                {/* Mobile CTA */}
                <div className="p-4 border-t border-gray-100">
                  <Link to="/quiz" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      onClick={(e) => {
                        setIsMobileMenuOpen(false);
                        openQuizModal(e);
                      }}
                      aria-label="Take the dosha quiz"
                      className="w-full text-white font-medium rounded-md"
                      style={{
                        backgroundColor: colors.primary,
                        padding: '12px 24px'
                      }}
                    >
                      Take Quiz
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Quiz Modal */}
      <QuizModal isOpen={isQuizModalOpen} onClose={() => setIsQuizModalOpen(false)} />
    </header>
  );
}
