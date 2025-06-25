'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link } from 'react-router-dom';
import { 
  Leaf, Menu, ChevronDown, Calendar, Sparkles, 
} from 'lucide-react';

// Navigation items for the header
const navigationItems = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'What We Heal',
    href: '/what-we-heal',
  },
  {
    title: 'Programs',
    href: '/programs',
  },
  {
    title: 'About Us',
    href: '/about',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
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

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 w-full ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg border-b border-teal-100 shadow-lg' 
        : 'bg-white/80 backdrop-blur-md border-b border-teal-100'
    }`}>
      <div className="mx-auto px-4 sm:px-6 w-full max-w-screen-2xl">
        <div className="flex justify-between items-center py-4 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-pink-400 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-serif font-bold text-teal-800 group-hover:text-teal-900 transition-colors">
                ekaBrahmaa
              </span>
              <p className="text-xs text-teal-600 -mt-1">Ancient Wisdom • Modern Healing</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 flex-1 justify-center max-w-4xl">
            {navigationItems.map((item : any) => (
              <div
                key={item.title}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(item.title)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActivePath(item.href)
                      ? 'text-teal-700 bg-teal-50'
                      : 'text-teal-600 hover:text-teal-700 hover:bg-teal-50'
                  }`}
                >
                  {item.icon}
                  <span className="whitespace-nowrap">{item.title}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === item.title ? 'rotate-180' : ''
                  }`} />
                </Link>

                {/* Enhanced Dropdown Menu */}
                <div 
                  className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[90vw] max-w-2xl bg-white rounded-2xl shadow-2xl border border-teal-100 overflow-hidden transition-all duration-300 ${
                    activeDropdown === item.title 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible -translate-y-2'
                  }`}
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {/* Featured Section */}
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-teal-900 mb-2 sm:mb-4 flex items-center">
                          <Sparkles className="w-5 h-5 mr-2 text-pink-500" />
                          {item.featured?.title}
                        </h3>
                        {item.featured?.items.map((featuredItem : any, index : any) => (
                          <Link
                            key={index}
                            to={featuredItem.href}
                            className="block p-2 sm:p-3 rounded-xl hover:bg-gradient-to-r hover:from-teal-50 hover:to-pink-50 transition-all duration-200 group border border-transparent hover:border-teal-100"
                          >
                            <h4 className="font-medium text-teal-800 group-hover:text-teal-900 mb-1">
                              {featuredItem.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-teal-600 group-hover:text-teal-700">
                              {featuredItem.description}
                            </p>
                          </Link>
                        ))}
                      </div>

                      {/* Sections */}
                      <div className="space-y-4 sm:space-y-6">
                        {item.sections?.map((section : any, sectionIndex : any) => (
                          <div key={sectionIndex}>
                            <h4 className="font-semibold text-teal-800 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wide">
                              {section.title}
                            </h4>
                            <div className="space-y-1 sm:space-y-2">
                              {section.items.map((sectionItem : any, itemIndex : any) => (
                                <Link
                                  key={itemIndex}
                                  to={sectionItem.href}
                                  className="flex items-center space-x-2 sm:space-x-3 p-1 sm:p-2 rounded-lg hover:bg-teal-50 transition-colors duration-200 group"
                                >
                                  {sectionItem.icon && (
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 text-teal-500 group-hover:text-teal-600 transition-colors">
                                      {sectionItem.icon}
                                    </div>
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-teal-800 group-hover:text-teal-900 text-xs sm:text-sm truncate">
                                      {sectionItem.title}
                                    </div>
                                    {sectionItem.description && (
                                      <div className="text-xs text-teal-600 group-hover:text-teal-700 truncate">
                                        {sectionItem.description}
                                      </div>
                                    )}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer CTA */}
                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-teal-100">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
                        <p className="text-xs sm:text-sm text-teal-600">
                          Ready to start your healing journey?
                        </p>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <Link to="/quiz">
                            <Button size="sm" className="text-xs sm:text-sm bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full">
                              Take Quiz
                            </Button>
                          </Link>
                          <Link to="/consultation">
                            <Button size="sm" variant="outline" className="text-xs sm:text-sm border-teal-200 text-teal-700 hover:bg-teal-50 rounded-full">
                              Book Consultation
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-2 sm:space-x-4 ml-auto">
            <Button 
              variant="outline" 
              size="sm"
              className="border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-300 transition-all duration-300 rounded-full whitespace-nowrap"
            >
              Sign In
            </Button>
            <Link to="/quiz">
              <Button 
                size="sm"
                className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Take Quiz
              </Button>
            </Link>
            <Link to="/consultation">
              <Button 
                size="sm"
                className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2 hover:bg-teal-50 rounded-full ml-2"
              >
                <Menu className="w-6 h-6 text-teal-700" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-96 bg-white border-l border-teal-100 overflow-y-auto">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-teal-100 sticky top-0 bg-white z-10">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-pink-400 rounded-full flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-serif font-bold text-teal-800">ekaBrahmaa</span>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 p-4">
                  <div className="space-y-2">
                    {navigationItems.map((item : any) => (
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
                          <div className="w-8 h-8 bg-gradient-to-r from-teal-100 to-pink-100 rounded-lg flex items-center justify-center">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-xs opacity-75">{item.description}</p>
                          </div>
                        </Link>

                        {/* Mobile Submenu */}
                        {item.sections && (
                          <div className="ml-4 pl-6 border-l border-teal-100 space-y-1">
                            {item.sections.flatMap((section : any) => 
                              section.items.map((subItem : any) => (
                                <Link
                                  key={subItem.title}
                                  to={subItem.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-teal-50 text-teal-600 text-sm transition-colors duration-200"
                                >
                                  {subItem.icon && subItem.icon}
                                  <span>{subItem.title}</span>
                                </Link>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </nav>

                {/* Mobile CTA Buttons */}
                <div className="p-4 border-t border-teal-100 sticky bottom-0 bg-white space-y-2">
                  <Link to="/quiz" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Take Dosha Quiz
                    </Button>
                  </Link>
                  <Link to="/consultation" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white rounded-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Free Consultation
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
    </header>
  );
}