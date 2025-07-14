'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/website/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/website/ui/sheet';
import { Link, useLocation } from 'react-router-dom';
import { 
  Leaf, 
  Menu, 
  Calendar, 
  Sparkles, 
  ChevronDown, 
  ExternalLink,
  X,
  Clock,
  Users,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { QuizModal } from '@/website/layout/QuizModal';

// Brand Colors - Exact match with Home page
const brandColors = {
  primary: '#0d9488', // teal-600
  secondary: '#ec4899', // pink-500
  accent: '#06b6d4', // cyan-500
  neutral: '#374151', // gray-700
  light: '#f0fdfa', // teal-50
  white: '#ffffff'
};

// Type definitions for navigation structure - Exact match with Home page
interface NavSubItem {
  title: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
  testimonial?: string;
}

interface NavSection {
  title: string;
  items: NavSubItem[];
}

interface NavFeatured {
  title: string;
  items: { title: string; href: string; description: string; badge?: string }[];
}

interface NavItem {
  title: string;
  href: string;
  description: string;
  featured?: NavFeatured;
  sections?: NavSection[];
}

// Enhanced navigation items - Exact match with Home page
const navigationItems: NavItem[] = [
  {
    title: 'What We Heal',
    href: '/what-we-heal',
    description: 'Conditions we treat with compassion',
    featured: {
      title: 'Most Sought After Healing',
      items: [
        { 
          title: "Gut Health", 
          href: '/conditions/gut-health', 
          description: 'Digestive harmony through ancient wisdom',
          badge: 'Popular'
        },
        { 
          title: 'Hormonal Balance', 
          href: '/conditions/hormonal-balance', 
          description: 'Natural hormone regulation and vitality',
          badge: 'Trending'
        }
      ]
    },
    sections: [
      {
        title: 'Physical Wellness',
        items: [
          { 
            title: 'Gut Health', 
            href: '/conditions/gut-health', 
            description: 'IBS, bloating, digestive disorders',
            testimonial: '"My gut issues disappeared in 2 weeks" - Sarah M.'
          },
          { 
            title: 'Hormonal Balance', 
            href: '/conditions/hormonal-balance', 
            description: 'PCOS, thyroid, menopause support',
            testimonial: '"Finally found hormonal peace" - Priya K.'
          },
          { 
            title: 'Skin Health', 
            href: '/conditions/skin-health', 
            description: 'Acne, eczema, psoriasis healing',
            testimonial: '"Clear skin, clear confidence" - Maya R.'
          }
        ]
      },
      {
        title: 'Mental & Emotional Wellness',
        items: [
          { 
            title: 'Mental Wellness', 
            href: '/conditions/mental-wellness', 
            description: 'Anxiety, depression, stress relief',
            testimonial: '"Found inner peace again" - Rajesh S.'
          },
          { 
            title: 'Chronic Illness Management', 
            href: '/conditions/chronic-illness', 
            description: 'Diabetes, autoimmune, chronic pain',
            testimonial: '"Living fully despite chronic illness" - Anita P.'
          }
        ]
      }
    ]
  },
  {
    title: 'Our Approach',
    href: '/approach',
    description: 'How we heal differently',
    featured: {
      title: 'Our Unique Methodology',
      items: [
        { 
          title: 'The Five Healers System', 
          href: '/approach/five-healers', 
          description: 'Ayurveda, Nutrition, Yoga, Psychology, Fitness - working as one team for you'
        },
        { 
          title: 'Personalized Prakriti Assessment', 
          href: '/quiz', 
          description: 'Discover your unique mind-body constitution in 5 minutes'
        }
      ]
    },
    sections: [
      {
        title: 'Our Methodology',
        items: [
          { 
            title: 'Five Healers Integration', 
            href: '/approach/five-healers', 
            description: 'Collaborative healing approach',
            icon: <Users className="w-4 h-4" />
          },
          { 
            title: 'Prakriti Assessment Quiz', 
            href: '/quiz', 
            description: 'Discover your constitution',
            icon: <Sparkles className="w-4 h-4" />
          },
          { 
            title: 'Daily Wellness Rituals', 
            href: '/approach/daily-rituals', 
            description: 'Simple practices, profound results',
            icon: <Clock className="w-4 h-4" />
          }
        ]
      },
      {
        title: 'Trust & Expertise',
        items: [
          { 
            title: 'Expert Credentials', 
            href: '/healers', 
            description: 'Meet our certified practitioners',
            icon: <Star className="w-4 h-4" />
          },
          { 
            title: 'Success Stories', 
            href: '/stories', 
            description: 'Real transformations, real people',
            icon: <CheckCircle className="w-4 h-4" />
          }
        ]
      }
    ]
  },
  {
    title: 'Programs',
    href: '/programs',
    description: 'Your healing journey options',
    featured: {
      title: 'Most Popular Programs',
      items: [
        { 
          title: 'ekaSanskara - 14 Days', 
          href: '/programs/ekasanskara', 
          description: 'Deep transformation program - ₹7,999',
          badge: 'Best Value'
        },
        { 
          title: 'ekaPavana - 7 Days', 
          href: '/programs/ekapavana', 
          description: 'Gentle cleansing program - ₹3,999',
          badge: 'Quick Start'
        }
      ]
    },
    sections: [
      {
        title: 'Short-Term Programs (3-14 Days)',
        items: [
          { 
            title: 'ekaPavana - 7 Days', 
            href: '/programs/ekapavana', 
            description: 'Gentle cleansing & renewal - ₹3,999',
            badge: 'Beginner Friendly'
          },
          { 
            title: 'ekaSanskara - 14 Days', 
            href: '/programs/ekasanskara', 
            description: 'Deep transformation - ₹7,999',
            badge: 'Most Popular'
          }
        ]
      },
      {
        title: 'Intensive Programs (21-45 Days)',
        items: [
          { 
            title: 'ekaSamanvaya - 21 Days', 
            href: '/programs/ekasamanvaya', 
            description: 'Complete harmony - ₹11,999',
            badge: 'Comprehensive'
          },
          { 
            title: 'ekaUdaya - 28 Days', 
            href: '/programs/ekaudaya', 
            description: 'Rise into radiance - ₹15,999',
            badge: 'Transformative'
          },
          { 
            title: 'ekaPrabodha - 45 Days', 
            href: '/programs/ekaprabodha', 
            description: 'Awaken wisdom - ₹24,999',
            badge: 'Master Level'
          }
        ]
      }
    ]
  }
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [quizButtonRef, setQuizButtonRef] = useState<HTMLElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg border-b border-teal-100 shadow-lg' 
          : 'bg-white/80 backdrop-blur-md border-b border-teal-100'
      }`}
      style={{ height: window.innerWidth >= 1024 ? '80px' : '60px' }}
    >
      <div className="mx-auto px-6 w-full max-w-screen-2xl h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo - Exact match with Home page */}
          <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
            <div 
              className="bg-gradient-to-r from-teal-600 to-pink-400 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"
              style={{ 
                width: window.innerWidth >= 1024 ? '48px' : '40px',
                height: window.innerWidth >= 1024 ? '48px' : '40px'
              }}
            >
              <Leaf className={`text-white ${window.innerWidth >= 1024 ? 'w-7 h-7' : 'w-6 h-6'}`} />
            </div>
            <div className="hidden sm:block">
              <span 
                className="font-serif font-bold text-teal-800 group-hover:text-teal-900 transition-colors"
                style={{ 
                  fontSize: window.innerWidth >= 1024 ? '28px' : '24px',
                  letterSpacing: '0.5px'
                }}
              >
                ekaBrahmaa
              </span>
              <p className="text-xs text-teal-600 -mt-1 font-medium">One Source • Infinite Healing</p>
            </div>
          </Link>

          {/* Desktop Navigation - Exact match with Home page */}
          <nav className="hidden lg:flex items-center flex-1 justify-center max-w-4xl">
            <div className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div
                  key={item.title}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(item.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActivePath(item.href)
                        ? 'text-teal-700 bg-teal-50 font-bold'
                        : 'text-teal-600 hover:text-teal-700 hover:bg-teal-50 font-normal'
                    }`}
                    style={{ letterSpacing: '0.5px' }}
                  >
                    <span className="whitespace-nowrap">{item.title}</span>
                    {(item.featured || item.sections) && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.title ? 'rotate-180' : ''
                      }`} />
                    )}
                  </Link>

                  {/* Enhanced Dropdown Menu - Exact match with Home page */}
                  {(item.featured || item.sections) && (
                    <div 
                      className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[95vw] max-w-4xl bg-white rounded-2xl shadow-2xl border border-teal-100 overflow-hidden transition-all duration-300 ${
                        activeDropdown === item.title 
                          ? 'opacity-100 visible translate-y-0' 
                          : 'opacity-0 invisible -translate-y-2'
                      }`}
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="p-8">
                        {/* Featured Section */}
                        {item.featured && (
                          <div className="mb-8">
                            <h3 className="text-xl font-semibold text-teal-900 mb-6 flex items-center">
                              <Sparkles className="w-6 h-6 mr-3 text-pink-500" />
                              {item.featured.title}
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                              {item.featured.items.map((featuredItem, index) => (
                                <Link
                                  key={index}
                                  to={featuredItem.href}
                                  className="block p-6 rounded-xl hover:bg-gradient-to-r hover:from-teal-50 hover:to-pink-50 transition-all duration-200 group border border-transparent hover:border-teal-100 hover:shadow-lg"
                                >
                                  <div className="flex items-start justify-between mb-3">
                                    <h4 className="font-semibold text-teal-800 group-hover:text-teal-900 text-lg">
                                      {featuredItem.title}
                                    </h4>
                                    {featuredItem.badge && (
                                      <span className="bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                                        {featuredItem.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-teal-600 group-hover:text-teal-700 leading-relaxed">
                                    {featuredItem.description}
                                  </p>
                                  <div className="mt-4 flex items-center text-teal-500 group-hover:text-teal-600">
                                    <span className="text-sm font-medium">Learn more</span>
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Sections */}
                        {item.sections && (
                          <div className="grid md:grid-cols-2 gap-8">
                            {item.sections.map((section, sectionIndex) => (
                              <div key={sectionIndex}>
                                <h4 className="font-semibold text-teal-800 mb-4 text-sm uppercase tracking-wide border-b border-teal-100 pb-2">
                                  {section.title}
                                </h4>
                                <div className="space-y-3">
                                  {section.items.map((sectionItem, itemIndex) => (
                                    <Link
                                      key={itemIndex}
                                      to={sectionItem.href}
                                      className="block p-4 rounded-lg hover:bg-teal-50 transition-colors duration-200 group"
                                    >
                                      <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center space-x-3">
                                          {sectionItem.icon && (
                                            <div className="w-6 h-6 text-teal-500 group-hover:text-teal-600 transition-colors">
                                              {sectionItem.icon}
                                            </div>
                                          )}
                                          <div className="font-medium text-teal-800 group-hover:text-teal-900 truncate">
                                            {sectionItem.title}
                                          </div>
                                        </div>
                                        {sectionItem.badge && (
                                          <span className="bg-teal-100 text-teal-700 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ml-2">
                                            {sectionItem.badge}
                                          </span>
                                        )}
                                      </div>
                                      <div className="text-sm text-teal-600 group-hover:text-teal-700 mb-2">
                                        {sectionItem.description}
                                      </div>
                                      {sectionItem.testimonial && (
                                        <div className="text-xs text-teal-500 italic">
                                          {sectionItem.testimonial}
                                        </div>
                                      )}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Footer CTA */}
                        <div className="mt-8 pt-6 border-t border-teal-100">
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-teal-600 text-center sm:text-left">
                              Ready to begin your healing journey?
                            </p>
                            <div className="flex items-center space-x-3">
                              <Link to="/quiz">
                                <Button size="sm" className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full">
                                  <Sparkles className="w-4 h-4 mr-2" />
                                  Take Quiz
                                </Button>
                              </Link>
                              <Link to="/consultation">
                                <Button size="sm" variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50 rounded-full">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  Book Consultation
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Desktop CTA Buttons - Exact match with Home page */}
          <div className="hidden lg:flex items-center space-x-4 ml-auto">
            <Button 
              variant="outline" 
              size="sm"
              className="border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-300 transition-all duration-300 rounded-full whitespace-nowrap font-medium"
              style={{ padding: '12px 20px', letterSpacing: '0.5px' }}
            >
              Sign In
            </Button>
            <Link to="/quiz">
              <Button
                onClick={openQuizModal}
                aria-label="Take the dosha quiz"
                size="sm"
                className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap font-medium"
                style={{ padding: '12px 20px', letterSpacing: '0.5px' }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Take Quiz
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button - Exact match with Home page */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2 hover:bg-teal-50 rounded-full ml-2"
                aria-label="Toggle mobile menu"
              >
                <Menu className="w-6 h-6 text-teal-700" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-full sm:w-96 bg-white border-l border-teal-100 overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <SheetHeader className="flex items-center justify-between p-4 border-b border-teal-100 sticky top-0 bg-white z-10">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-pink-400 rounded-full flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <SheetTitle className="text-xl font-serif font-bold text-teal-800">ekaBrahmaa</SheetTitle>
                  </div>
                </SheetHeader>

                {/* Mobile Navigation */}
                <nav className="flex-1 p-4">
                  <div className="space-y-2">
                    {navigationItems.map((item) => (
                      <div key={item.title} className="space-y-1">
                        <Link
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center space-x-3 p-3 rounded-xl transition-colors duration-200 ${
                            isActivePath(item.href)
                              ? 'bg-teal-50 text-teal-700'
                              : 'hover:bg-teal-50 text-teal-600'
                          }`}
                        >
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-xs opacity-75">{item.description}</p>
                          </div>
                        </Link>

                        {/* Mobile Submenu */}
                        {item.sections && (
                          <div className="ml-4 pl-6 border-l border-teal-100 space-y-1">
                            {item.sections.flatMap((section) => 
                              section.items.map((subItem) => (
                                <Link
                                  key={subItem.title}
                                  to={subItem.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-teal-50 text-teal-600 text-sm transition-colors duration-200"
                                >
                                  {subItem.icon && subItem.icon}
                                  <div>
                                    <span className="font-medium">{subItem.title}</span>
                                    {subItem.badge && (
                                      <span className="ml-2 bg-teal-100 text-teal-700 text-xs px-2 py-1 rounded-full">
                                        {subItem.badge}
                                      </span>
                                    )}
                                  </div>
                                </Link>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </nav>

                {/* Mobile CTA Buttons - Exact match with Home page */}
                <div className="p-4 border-t border-teal-100 sticky bottom-0 bg-white space-y-2">
                  <Link to="/quiz" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button 
                      className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full"
                      onClick={(e) => {
                        setIsMobileMenuOpen(false);
                        openQuizModal(e);
                      }}
                      aria-label="Take the dosha quiz"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Take Dosha Quiz
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full border-teal-200 text-teal-700 hover:bg-teal-50 rounded-full"
                  >
                    Sign In
                  </Button>
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