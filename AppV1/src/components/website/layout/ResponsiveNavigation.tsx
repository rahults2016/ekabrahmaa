import { useState, useEffect } from 'react';
import { Button } from '@/components/website/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/website/ui/sheet';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Sparkles, 
  Calendar,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { LoadingLink } from '@/components/website/loadingLink';

interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

interface ResponsiveNavigationProps {
  items: NavItem[];
  logo: React.ReactNode;
  ctaButtons?: React.ReactNode;
}

export function ResponsiveNavigation({ items, logo, ctaButtons }: ResponsiveNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
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

  const toggleExpandedItem = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title) 
        : [...prev, title]
    );
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg border-b border-teal-100 shadow-lg' 
          : 'bg-white/80 backdrop-blur-md border-b border-teal-100'
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 w-full max-w-screen-2xl">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
            {logo}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {items.map((item) => (
              <div key={item.title} className="relative group">
                <Link
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActivePath(item.href)
                      ? 'text-teal-700 bg-teal-50 font-bold'
                      : 'text-teal-600 hover:text-teal-700 hover:bg-teal-50 font-normal'
                  }`}
                >
                  <span>{item.title}</span>
                  {item.children && (
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </Link>

                {/* Dropdown for Desktop */}
                {item.children && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-teal-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                    <div className="py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.title}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-teal-600 hover:bg-teal-50 transition-colors duration-200"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {ctaButtons}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2 hover:bg-teal-50 rounded-full"
                aria-label="Toggle mobile menu"
              >
                <Menu className="w-6 h-6 text-teal-700" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-full sm:w-80 bg-white border-l border-teal-100 p-0 overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-teal-100 sticky top-0 bg-white z-10">
                  <Link to="/" onClick={closeMenu} className="flex items-center space-x-3">
                    {logo}
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-teal-50 rounded-full"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-teal-700" />
                  </Button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 p-4">
                  <div className="space-y-1">
                    {items.map((item) => (
                      <div key={item.title} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Link
                            to={item.href}
                            onClick={() => !item.children && closeMenu()}
                            className={`flex-1 flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                              isActivePath(item.href)
                                ? 'bg-teal-50 text-teal-700 font-medium'
                                : 'hover:bg-teal-50 text-teal-600'
                            }`}
                          >
                            <span>{item.title}</span>
                          </Link>
                          
                          {item.children && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleExpandedItem(item.title)}
                              className="p-2 hover:bg-teal-50 rounded-full"
                            >
                              {expandedItems.includes(item.title) ? (
                                <ChevronDown className="w-5 h-5 text-teal-600" />
                              ) : (
                                <ChevronRight className="w-5 h-5 text-teal-600" />
                              )}
                            </Button>
                          )}
                        </div>

                        {/* Mobile Submenu */}
                        {item.children && expandedItems.includes(item.title) && (
                          <div className="ml-4 pl-4 border-l border-teal-100 space-y-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.title}
                                to={child.href}
                                onClick={closeMenu}
                                className="block p-3 rounded-lg hover:bg-teal-50 text-teal-600 text-sm transition-colors duration-200"
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

                {/* Mobile CTA Buttons */}
                <div className="p-4 border-t border-teal-100 space-y-3">
                  <LoadingLink
                    to="/quiz"
                    className="flex items-center justify-center w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                    onClick={closeMenu}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    <span>Take Dosha Quiz</span>
                  </LoadingLink>
                  
                  <LoadingLink
                    to="/consultation"
                    className="flex items-center justify-center w-full border-2 border-teal-600 text-teal-700 hover:bg-teal-50 px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                    onClick={closeMenu}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Book Consultation</span>
                  </LoadingLink>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}