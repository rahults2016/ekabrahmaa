import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/website/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/website/ui/sheet';
import { Link, useLocation } from 'react-router-dom';
import { 
  Leaf, 
  Menu, 
  Calendar, 
  Sparkles, 
  ChevronDown, 
  ArrowRight,
  X
} from 'lucide-react';
import { QuizModal } from './QuizModal';

// Brand colors from your existing styles
const brandColors = {
  primary: '#0d9488', // teal-600
  secondary: '#ec4899', // pink-500
  accent: '#06b6d4', // cyan-500
  neutral: '#374151', // gray-700
  light: '#f0fdfa', // teal-50
  white: '#ffffff'
};

// Navigation items structure
interface NavSubItem {
  title: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
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
  description?: string;
  featured?: NavFeatured;
  sections?: NavSection[];
}

// Main navigation items
const navigationItems: NavItem[] = [
  {
    title: 'What We Heal',
    href: '/what-we-heal',
    description: 'Conditions we treat with compassion',
    featured: {
      title: 'Featured Healing Approaches',
      items: [
        { 
          title: "Women's Health", 
          href: '/what-we-heal#womens-health', 
          description: 'PCOS, fertility, hormonal balance',
          badge: 'Popular'
        },
        { 
          title: 'Mental Wellness', 
          href: '/what-we-heal#mental-wellness', 
          description: 'Anxiety, depression, stress management',
          badge: 'Trending'
        }
      ]
    },
    sections: [
      {
        title: 'Health Categories',
        items: [
          { title: 'Digestive Health', href: '/what-we-heal#digestive-health', description: 'IBS, bloating, gut health' },
          { title: 'Hormonal Balance', href: '/what-we-heal#hormonal-balance', description: 'Thyroid, diabetes, PCOS' },
          { title: 'Lifestyle Conditions', href: '/what-we-heal#lifestyle-conditions', description: 'Hypertension, obesity, fatigue' }
        ]
      }
    ]
  },
  {
    title: 'Our Approach',
    href: '/approach',
    description: 'How we heal differently',
    sections: [
      {
        title: 'Our Methodology',
        items: [
          { title: 'Five Healers Integration', href: '/approach/five-healers', description: 'Our unique collaborative model' },
          { title: 'Personalized Care', href: '/approach', description: 'Tailored to your constitution' },
          { title: 'Holistic Treatment', href: '/approach', description: 'Mind, body, and spirit healing' }
        ]
      }
    ]
  },
  {
    title: 'Programs',
    href: '/programs',
    description: 'Your healing journey options',
    featured: {
      title: 'Featured Programs',
      items: [
        { 
          title: 'ekaSanskara - 14 Days', 
          href: '/programs/ekasanskara', 
          description: 'Deep transformation program',
          badge: 'Best Value'
        },
        { 
          title: 'ekaPavana - 7 Days', 
          href: '/programs/ekapavana', 
          description: 'Gentle cleansing program',
          badge: 'Quick Start'
        }
      ]
    }
  },
  {
    title: 'Contact',
    href: '/contact',
    description: 'Get in touch with us'
  }
];

export function ModernHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if current path matches navigation item
  const isActivePath = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  // Dropdown menu handlers
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

  // Open quiz modal
  const openQuizModal = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsQuizModalOpen(true);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
          : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-teal-600 to-pink-400 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 w-10 h-10 md:w-12 md:h-12">
              <Leaf className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="hidden sm:block">
              <span className="font-serif font-bold text-teal-800 group-hover:text-teal-900 transition-colors text-xl md:text-2xl">
                ekaBrahmaa
              </span>
              <p className="text-xs text-teal-600 -mt-1 font-medium">One Source • Infinite Healing</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <div
                key={item.title}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(item.title)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActivePath(item.href)
                      ? 'text-teal-700 bg-teal-50'
                      : 'text-teal-600 hover:text-teal-700 hover:bg-teal-50'
                  }`}
                >
                  <span>{item.title}</span>
                  {(item.featured || item.sections) && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === item.title ? 'rotate-180' : ''
                    }`} />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {(item.featured || item.sections) && (
                  <div 
                    className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-screen max-w-md bg-white rounded-xl shadow-xl border border-teal-100 overflow-hidden transition-all duration-300 ${
                      activeDropdown === item.title 
                        ? 'opacity-100 visible translate-y-0' 
                        : 'opacity-0 invisible -translate-y-2'
                    }`}
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="p-6">
                      {/* Featured Section */}
                      {item.featured && (
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-teal-900 mb-4 flex items-center">
                            <Sparkles className="w-5 h-5 mr-2 text-pink-500" />
                            {item.featured.title}
                          </h3>
                          <div className="grid gap-4">
                            {item.featured.items.map((featuredItem, index) => (
                              <Link
                                key={index}
                                to={featuredItem.href}
                                className="block p-4 rounded-lg hover:bg-gradient-to-r hover:from-teal-50 hover:to-pink-50 transition-all duration-200 group border border-transparent hover:border-teal-100 hover:shadow-md"
                              >
                                <div className="flex items-start justify-between mb-1">
                                  <h4 className="font-semibold text-teal-800 group-hover:text-teal-900">
                                    {featuredItem.title}
                                  </h4>
                                  {featuredItem.badge && (
                                    <span className="bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                                      {featuredItem.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-teal-600 group-hover:text-teal-700">
                                  {featuredItem.description}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sections */}
                      {item.sections && (
                        <div className="space-y-6">
                          {item.sections.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                              <h4 className="font-semibold text-teal-800 mb-3 text-sm uppercase tracking-wide border-b border-teal-100 pb-2">
                                {section.title}
                              </h4>
                              <div className="space-y-2">
                                {section.items.map((sectionItem, itemIndex) => (
                                  <Link
                                    key={itemIndex}
                                    to={sectionItem.href}
                                    className="block p-3 rounded-lg hover:bg-teal-50 transition-colors duration-200 group"
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="font-medium text-teal-800 group-hover:text-teal-900">
                                        {sectionItem.title}
                                      </div>
                                      <ArrowRight className="w-4 h-4 text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    {sectionItem.description && (
                                      <p className="text-xs text-teal-600 mt-1">
                                        {sectionItem.description}
                                      </p>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              className="border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-300 transition-all duration-300 rounded-full"
            >
              Sign In
            </Button>
            <Link to="/quiz">
              <Button
                onClick={openQuizModal}
                size="sm"
                className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Sparkles className="w-4 h-4 mr-2" />
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
                className="lg:hidden p-2 hover:bg-teal-50 rounded-full"
                aria-label="Toggle mobile menu"
              >
                <Menu className="w-6 h-6 text-teal-700" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-full sm:w-80 bg-white border-l border-teal-100 p-0"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-teal-100">
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-pink-400 rounded-full flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-serif font-bold text-teal-800">ekaBrahmaa</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 hover:bg-teal-50 rounded-full"
                  >
                    <X className="w-5 h-5 text-teal-700" />
                  </Button>
                </div>

                {/* Mobile Navigation */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 space-y-4">
                    {navigationItems.map((item) => (
                      <div key={item.title} className="space-y-2">
                        <Link
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block px-4 py-3 rounded-lg transition-colors ${
                            isActivePath(item.href)
                              ? 'bg-teal-50 text-teal-700 font-medium'
                              : 'hover:bg-teal-50 text-teal-600'
                          }`}
                        >
                          {item.title}
                        </Link>
                        
                        {/* Mobile Submenu */}
                        {item.sections && (
                          <div className="ml-4 pl-4 border-l border-teal-100 space-y-2">
                            {item.sections.flatMap(section => 
                              section.items.map((subItem, idx) => (
                                <Link
                                  key={`${item.title}-${idx}`}
                                  to={subItem.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block px-4 py-2 rounded-lg hover:bg-teal-50 text-teal-600 text-sm"
                                >
                                  {subItem.title}
                                </Link>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile CTA Buttons */}
                <div className="p-4 border-t border-teal-100 space-y-3">
                  <Link to="/quiz" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button 
                      className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full"
                      onClick={openQuizModal}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Take Dosha Quiz
                    </Button>
                  </Link>
                  <Link to="/consultation" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button 
                      variant="outline" 
                      className="w-full border-teal-200 text-teal-700 hover:bg-teal-50 rounded-full"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Consultation
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