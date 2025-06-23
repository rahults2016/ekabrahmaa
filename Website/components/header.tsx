'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Leaf, 
  Menu, 
  ChevronDown,
  Heart,
  Brain,
  Utensils,
  Activity,
  Zap,
  Calendar,
  MessageCircle,
  Sparkles,
  Droplets,
  Sun,
  Moon,
  BookOpen,
  Users,
  ArrowRight,
  Clock,
  Video,
  Phone,
  User,
  Star,
  Shield,
  Award,
  Target,
  Globe,
  Lightbulb,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface FeaturedItem {
  title: string;
  href: string;
  description: string;
}

interface SectionItem {
  title: string;
  href: string;
  description: string;
  icon?: React.ReactNode;
}

interface Section {
  title: string;
  items: SectionItem[];
}

interface NavigationItem {
  title: string;
  href: string;
  description: string;
  icon: React.ReactNode;
  featured?: {
    title: string;
    items: FeaturedItem[];
  };
  sections?: Section[];
}

const navigationItems: NavigationItem[] = [
  {
    title: 'Why ekaBrahmaa',
    href: '/why-ekabrahmaa',
    description: 'Our mission and unique approach',
    icon: <Star className="w-4 h-4" />,
    featured: {
      title: 'What Makes Us Different',
      items: [
        { title: '5-Healer Integration Model', href: '/why-ekabrahmaa#integration', description: 'Unique collaborative approach' },
        { title: '98% Success Rate', href: '/why-ekabrahmaa#results', description: 'Proven healing outcomes' },
        { title: 'Ancient Wisdom + Modern Science', href: '/why-ekabrahmaa#approach', description: 'Best of both worlds' }
      ]
    },
    sections: [
      {
        title: 'Our Philosophy',
        items: [
          { title: 'One Source, Infinite Healing', href: '/why-ekabrahmaa#mission', icon: <Lightbulb className="w-4 h-4" />, description: 'Our core mission' },
          { title: 'Root Cause Healing', href: '/why-ekabrahmaa#philosophy', icon: <Target className="w-4 h-4" />, description: 'Not just symptoms' },
          { title: 'Personalized Medicine', href: '/why-ekabrahmaa#personalized', icon: <User className="w-4 h-4" />, description: 'Your unique constitution' },
          { title: 'Holistic Integration', href: '/why-ekabrahmaa#holistic', icon: <Heart className="w-4 h-4" />, description: 'Mind, body, spirit' }
        ]
      },
      {
        title: 'Our Impact',
        items: [
          { title: '10,000+ Lives Transformed', href: '/why-ekabrahmaa#impact', description: 'Real people, real results' },
          { title: 'Global Healing Community', href: '/why-ekabrahmaa#community', description: '50+ countries served' },
          { title: 'Expert Healer Network', href: '/why-ekabrahmaa#team', description: 'Certified practitioners' }
        ]
      }
    ]
  },
  {
    title: 'What We Heal',
    href: '/what-we-heal',
    description: 'Conditions we treat with Ayurveda',
    icon: <Heart className="w-4 h-4" />,
    featured: {
      title: 'Most Common Conditions',
      items: [
        { title: 'PCOS & Hormonal Issues', href: '/what-we-heal#womens-health', description: '90% improvement rate' },
        { title: 'Digestive Disorders', href: '/what-we-heal#digestive-health', description: 'IBS, GERD, chronic bloating' },
        { title: 'Anxiety & Depression', href: '/what-we-heal#mental-wellness', description: 'Natural mental health support' }
      ]
    },
    sections: [
      {
        title: 'Health Categories',
        items: [
          { title: "Women's Health", href: '/what-we-heal#womens-health', icon: <Heart className="w-4 h-4" />, description: 'PCOS, fertility, menopause' },
          { title: 'Digestive Health', href: '/what-we-heal#digestive-health', icon: <Utensils className="w-4 h-4" />, description: 'IBS, GERD, weight management' },
          { title: 'Mental Wellness', href: '/what-we-heal#mental-wellness', icon: <Brain className="w-4 h-4" />, description: 'Anxiety, depression, sleep' },
          { title: 'Hormonal Balance', href: '/what-we-heal#hormonal-balance', icon: <Activity className="w-4 h-4" />, description: 'Thyroid, diabetes, adrenals' },
          { title: 'Lifestyle Conditions', href: '/what-we-heal#lifestyle-conditions', icon: <Zap className="w-4 h-4" />, description: 'Hypertension, obesity, fatigue' }
        ]
      },
      {
        title: 'Our Approach',
        items: [
          { title: '5-Healer Integration', href: '/what-we-heal#approach', description: 'Comprehensive team care' },
          { title: 'Success Stories', href: '/what-we-heal#stories', description: 'Real patient transformations' },
          { title: 'Free Consultation', href: '/consultation', description: 'Talk to our experts' }
        ]
      }
    ]
  },
  {
    title: 'Programs',
    href: '/programs',
    description: 'Healing programs for every need',
    icon: <Sparkles className="w-4 h-4" />,
    featured: {
      title: 'Most Popular Programs',
      items: [
        { title: 'ekaPavana - 7 Days', href: '/programs/ekapavana', description: 'Gentle cleansing & renewal' },
        { title: 'ekaSanskara - 14 Days', href: '/programs/ekasanskara', description: 'Deep transformation' },
        { title: 'ekaUdaya - 28 Days', href: '/programs/ekaudaya', description: 'Complete radiance' }
      ]
    },
    sections: [
      {
        title: 'Healing Programs',
        items: [
          { title: 'ekaPavana', href: '/programs/ekapavana', icon: <Droplets className="w-4 h-4" />, description: '7 days • Gentle cleansing • ₹3,999' },
          { title: 'ekaSanskara', href: '/programs/ekasanskara', icon: <Sun className="w-4 h-4" />, description: '14 days • Deep transformation • ₹7,999' },
          { title: 'ekaSamanvaya', href: '/programs/ekasamanvaya', icon: <Moon className="w-4 h-4" />, description: '21 days • Complete harmony • ₹7,999' },
          { title: 'ekaUdaya', href: '/programs/ekaudaya', icon: <Sun className="w-4 h-4" />, description: '28 days • Rise into radiance • ₹11,999' },
          { title: 'ekaPrabodha', href: '/programs/ekaprabodha', icon: <Sparkles className="w-4 h-4" />, description: '45 days • Awaken wisdom • ₹17,999' }
        ]
      },
      {
        title: 'Getting Started',
        items: [
          { title: 'Take Dosha Quiz', href: '/quiz', description: 'Find your constitution' },
          { title: 'Program Comparison', href: '/programs#comparison', description: 'Find the right fit' },
          { title: 'Healer Team', href: '/programs#healers', description: 'Meet your experts' }
        ]
      }
    ]
  },
  {
    title: 'Blogs',
    href: '/blogs',
    description: 'Ayurvedic wisdom and insights',
    icon: <BookOpen className="w-4 h-4" />,
    featured: {
      title: 'Popular Articles',
      items: [
        { title: 'Understanding Your Dosha', href: '/blogs#dosha-guide', description: 'Complete constitution guide' },
        { title: 'Seasonal Eating Guide', href: '/blogs#seasonal-eating', description: 'Align with nature' },
        { title: 'Daily Ayurvedic Routine', href: '/blogs#dinacharya', description: 'Ancient daily practices' }
      ]
    },
    sections: [
      {
        title: 'Article Categories',
        items: [
          { title: 'Ayurveda Basics', href: '/blogs#basics', description: 'Fundamental concepts' },
          { title: 'Nutrition', href: '/blogs#nutrition', description: 'Food as medicine' },
          { title: 'Lifestyle', href: '/blogs#lifestyle', description: 'Daily practices' },
          { title: 'Herbs & Remedies', href: '/blogs#herbs', description: 'Natural healing' },
          { title: 'Seasonal Wellness', href: '/blogs#seasonal', description: 'Adapting to seasons' },
          { title: 'Self-Care', href: '/blogs#self-care', description: 'Nurturing practices' }
        ]
      },
      {
        title: 'Resources',
        items: [
          { title: 'Newsletter', href: '/blogs#newsletter', description: 'Weekly wisdom' },
          { title: 'Podcast', href: '/blogs#podcast', description: 'Listen & learn' },
          { title: 'Video Library', href: '/blogs#videos', description: 'Visual guides' }
        ]
      }
    ]
  },
  {
    title: 'Consultations',
    href: '/consultation',
    description: 'Talk to our healers',
    icon: <MessageCircle className="w-4 h-4" />,
    featured: {
      title: 'Popular Consultation Types',
      items: [
        { title: 'Free Initial Consultation', href: '/consultation#free', description: '30 min • Get started' },
        { title: 'Comprehensive Assessment', href: '/consultation#comprehensive', description: '90 min • Full analysis' },
        { title: 'Follow-up Session', href: '/consultation#followup', description: '45 min • Progress review' }
      ]
    },
    sections: [
      {
        title: 'Consultation Types',
        items: [
          { title: 'Video Consultation', href: '/consultation#video', icon: <Video className="w-4 h-4" />, description: 'Face-to-face online' },
          { title: 'Phone Consultation', href: '/consultation#phone', icon: <Phone className="w-4 h-4" />, description: 'Voice-only session' },
          { title: 'Chat Consultation', href: '/consultation#chat', icon: <MessageCircle className="w-4 h-4" />, description: 'Text-based support' }
        ]
      },
      {
        title: 'Our Healers',
        items: [
          { title: 'Ayurveda Doctors', href: '/consultation#ayurveda', description: 'Constitutional experts' },
          { title: 'Nutritionists', href: '/consultation#nutrition', description: 'Diet specialists' },
          { title: 'Yoga Therapists', href: '/consultation#yoga', description: 'Movement & breath' },
          { title: 'Psychologists', href: '/consultation#psychology', description: 'Mental wellness' }
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
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActivePath = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
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
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg border-b border-teal-100 shadow-lg' 
        : 'bg-white/80 backdrop-blur-md border-b border-teal-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
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
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div
                key={item.title}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(item.title)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActivePath(item.href)
                      ? 'text-teal-700 bg-teal-50'
                      : 'text-teal-600 hover:text-teal-700 hover:bg-teal-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === item.title ? 'rotate-180' : ''
                  }`} />
                </Link>

                {/* Enhanced Dropdown Menu */}
                <div 
                  className={`absolute top-full left-0 mt-2 w-[600px] bg-white rounded-2xl shadow-2xl border border-teal-100 overflow-hidden transition-all duration-300 ${
                    activeDropdown === item.title 
                      ? 'opacity-100 visible transform translate-y-0' 
                      : 'opacity-0 invisible transform -translate-y-2'
                  }`}
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-8">
                      {/* Featured Section */}
                      <div>
                        <h3 className="text-lg font-semibold text-teal-900 mb-4 flex items-center">
                          <Sparkles className="w-5 h-5 mr-2 text-pink-500" />
                          {item.featured?.title}
                        </h3>
                        <div className="space-y-3">
                          {item.featured?.items.map((featuredItem, index) => (
                            <Link
                              key={index}
                              href={featuredItem.href}
                              className="block p-3 rounded-xl hover:bg-gradient-to-r hover:from-teal-50 hover:to-pink-50 transition-all duration-200 group border border-transparent hover:border-teal-100"
                            >
                              <h4 className="font-medium text-teal-800 group-hover:text-teal-900 mb-1">
                                {featuredItem.title}
                              </h4>
                              <p className="text-sm text-teal-600 group-hover:text-teal-700">
                                {featuredItem.description}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Sections */}
                      <div className="space-y-6">
                        {item.sections?.map((section, sectionIndex) => (
                          <div key={sectionIndex}>
                            <h4 className="font-semibold text-teal-800 mb-3 text-sm uppercase tracking-wide">
                              {section.title}
                            </h4>
                            <div className="space-y-2">
                              {section.items.map((sectionItem, itemIndex) => (
                                <Link
                                  key={itemIndex}
                                  href={sectionItem.href}
                                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-teal-50 transition-colors duration-200 group"
                                >
                                  {sectionItem.icon && (
                                    <div className="w-6 h-6 text-teal-500 group-hover:text-teal-600 transition-colors">
                                      {sectionItem.icon}
                                    </div>
                                  )}
                                  <div className="flex-1">
                                    <div className="font-medium text-teal-800 group-hover:text-teal-900 text-sm">
                                      {sectionItem.title}
                                    </div>
                                    {sectionItem.description && (
                                      <div className="text-xs text-teal-600 group-hover:text-teal-700">
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
                    <div className="mt-6 pt-6 border-t border-teal-100">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-teal-600">
                          Ready to start your healing journey?
                        </p>
                        <div className="flex items-center space-x-3">
                          <Link href="/quiz">
                            <Button size="sm" className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full">
                              Take Quiz
                            </Button>
                          </Link>
                          <Link href="/consultation">
                            <Button size="sm" variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50 rounded-full">
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
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-300 transition-all duration-300 rounded-full"
            >
              Sign In
            </Button>
            <Link href="/quiz">
              <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Sparkles className="w-4 h-4 mr-2" />
                Take Quiz
              </Button>
            </Link>
            <Link href="/consultation">
              <Button className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Calendar className="w-4 h-4 mr-2" />
                Book Consultation
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
              >
                <Menu className="w-6 h-6 text-teal-700" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 bg-white border-l border-teal-100">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-teal-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-pink-400 rounded-full flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-serif font-bold text-teal-800">ekaBrahmaa</span>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {navigationItems.map((item) => (
                      <div key={item.title} className="space-y-2">
                        <Link
                          href={item.href}
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
                          <div className="ml-6 space-y-1">
                            {item.sections.flatMap(section => 
                              section.items.map((subItem) => (
                                <Link
                                  key={subItem.title}
                                  href={subItem.href}
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
                <div className="p-4 border-t border-teal-100 space-y-3">
                  <Link href="/quiz" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Take Dosha Quiz
                    </Button>
                  </Link>
                  <Link href="/consultation" onClick={() => setIsMobileMenuOpen(false)}>
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