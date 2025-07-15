import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/website/ui/button';
import { Input } from '@/components/website/ui/input';
import { 
  Leaf, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  ArrowRight,
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Heart,
  Shield,
  Award,
  Users,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// Brand colors consistent with ekaBrahmaa
const brandColors = {
  primary: '#0d9488', // teal-600
  secondary: '#ec4899', // pink-500
  accent: '#06b6d4', // cyan-500
  neutral: '#374151', // gray-700
  light: '#f0fdfa', // teal-50
  white: '#ffffff',
  background: '#f8fafc', // slate-50
  textPrimary: '#1e293b', // slate-800
  textSecondary: '#64748b' // slate-500
};

// Footer data structure
interface FooterSection {
  title: string;
  links: Array<{ title: string; href: string; description?: string }>;
}

interface FooterData {
  company: {
    name: string;
    tagline: string;
    description: string;
    address: {
      street: string;
      city: string;
      country: string;
    };
    contact: {
      email: string;
      phone: string;
      hours: string;
    };
  };
  sections: Record<string, FooterSection>;
  socialLinks: Array<{ 
    platform: string; 
    href: string; 
    icon: React.ReactNode;
    color: string;
  }>;
  legalLinks: Array<{ title: string; href: string }>;
  trustIndicators: Array<{
    icon: React.ReactNode;
    text: string;
    color: string;
  }>;
}

// Footer data
const footerData: FooterData = {
  company: {
    name: 'ekaBrahmaa',
    tagline: 'One Source. Infinite Healing.',
    description: 'Ancient wisdom meets modern healing. We integrate 5,000-year-old Ayurvedic principles with contemporary wellness practices to address the root cause of your health challenges through personalized, holistic care.',
    address: {
      street: '123 Wellness Avenue, Bandra West',
      city: 'Mumbai, Maharashtra 400050',
      country: 'India'
    },
    contact: {
      email: 'hello@ekabrahmaa.com',
      phone: '+91 98765 43210',
      hours: 'Mon-Sat: 9:00 AM - 7:00 PM IST'
    }
  },
  sections: {
    quickLinks: {
      title: 'Quick Links',
      links: [
        { title: 'Home', href: '/' },
        { title: 'About Us', href: '/about' },
        { title: 'Our Healers', href: '/healers' },
        { title: 'Healing Stories', href: '/stories' },
        { title: 'Blog', href: '/blog' },
        { title: 'Contact', href: '/contact' }
      ]
    },
    services: {
      title: 'Our Services',
      links: [
        { title: 'Ayurvedic Consultation', href: '/services/ayurveda' },
        { title: 'Nutritional Therapy', href: '/services/nutrition' },
        { title: 'Yoga & Meditation', href: '/services/yoga' },
        { title: 'Functional Training', href: '/services/fitness' },
        { title: 'Psychological Support', href: '/services/psychology' },
        { title: 'Wellness Programs', href: '/programs' }
      ]
    }
  },
  socialLinks: [
    { 
      platform: 'LinkedIn', 
      href: 'https://linkedin.com/company/ekabrahmaa', 
      icon: <Linkedin className="w-5 h-5" />,
      color: '#0077B5'
    },
    { 
      platform: 'Twitter', 
      href: 'https://twitter.com/ekabrahmaa', 
      icon: <Twitter className="w-5 h-5" />,
      color: '#1DA1F2'
    },
    { 
      platform: 'Facebook', 
      href: 'https://facebook.com/ekabrahmaa', 
      icon: <Facebook className="w-5 h-5" />,
      color: '#1877F2'
    },
    { 
      platform: 'Instagram', 
      href: 'https://instagram.com/ekabrahmaa', 
      icon: <Instagram className="w-5 h-5" />,
      color: '#E4405F'
    }
  ],
  legalLinks: [
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Terms & Conditions', href: '/terms' },
    { title: 'Medical Disclaimer', href: '/disclaimer' },
    { title: 'Sitemap', href: '/sitemap' }
  ],
  trustIndicators: [
    { icon: <Shield className="w-5 h-5" />, text: 'HIPAA Compliant', color: brandColors.primary },
    { icon: <Award className="w-5 h-5" />, text: 'Certified Practitioners', color: brandColors.secondary },
    { icon: <Users className="w-5 h-5" />, text: '10,000+ Healed', color: brandColors.accent },
    { icon: <Heart className="w-5 h-5" />, text: '24/7 Support', color: brandColors.primary }
  ]
};

// Footer section component with collapsible functionality for mobile
function FooterSection({ title, links }: { title: string; links: Array<{ title: string; href: string }> }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="py-4 border-b border-teal-100 md:border-none md:py-0">
      <div 
        className="flex items-center justify-between mb-4 cursor-pointer md:cursor-default"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 
          className="text-lg font-semibold relative"
          style={{ color: brandColors.textPrimary }}
        >
          {title}
          <div 
            className="absolute bottom-0 left-0 w-8 h-0.5 mt-2 hidden md:block"
            style={{ backgroundColor: brandColors.primary }}
          />
        </h3>
        <button className="md:hidden text-teal-600">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>
      
      <ul className={`space-y-3 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        {links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.href}
              className="text-sm transition-all duration-300 hover:translate-x-1 hover:font-medium inline-block"
              style={{ 
                color: brandColors.textSecondary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = brandColors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = brandColors.textSecondary;
              }}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ResponsiveFooter() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubscriptionStatus('success');
      setEmail('');
    } catch (error) {
      setSubscriptionStatus('error');
    } finally {
      setIsSubscribing(false);
      // Reset status after 3 seconds
      setTimeout(() => setSubscriptionStatus('idle'), 3000);
    }
  };

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Company Info - Always visible */}
        <div className="mb-8 md:mb-12">
          <Link to="/" className="flex items-center space-x-3 group mb-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"
              style={{ 
                background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%)`
              }}
            >
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <div>
              <span 
                className="text-2xl font-serif font-bold group-hover:opacity-80 transition-opacity duration-300"
                style={{ color: brandColors.textPrimary }}
              >
                {footerData.company.name}
              </span>
              <p 
                className="text-sm font-medium -mt-1"
                style={{ color: brandColors.primary }}
              >
                {footerData.company.tagline}
              </p>
            </div>
          </Link>

          <p 
            className="text-sm leading-relaxed mb-6"
            style={{ color: brandColors.textSecondary }}
          >
            {footerData.company.description}
          </p>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            {footerData.socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${social.platform}`}
                className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center transition-all duration-300 hover:border-opacity-0 hover:shadow-lg hover:scale-110"
                style={{ 
                  color: brandColors.textSecondary,
                  '--hover-bg': social.color
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = social.color;
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = brandColors.textSecondary;
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Responsive Grid Layout */}
        <div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Footer Sections - Collapsible on Mobile */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
            {Object.entries(footerData.sections).map(([key, section]) => (
              <FooterSection key={key} title={section.title} links={section.links} />
            ))}
          </div>

          {/* Contact Information */}
          <div className="py-4 border-b border-teal-100 md:border-none md:py-0">
            <h3 
              className="text-lg font-semibold mb-6 relative"
              style={{ color: brandColors.textPrimary }}
            >
              Contact Info
              <div 
                className="absolute bottom-0 left-0 w-8 h-0.5 mt-2 hidden md:block"
                style={{ backgroundColor: brandColors.primary }}
              />
            </h3>

            {/* Address */}
            <div className="flex items-start space-x-3 mb-4">
              <MapPin 
                className="w-5 h-5 mt-0.5 flex-shrink-0" 
                style={{ color: brandColors.primary }}
              />
              <div>
                <p 
                  className="text-sm font-medium"
                  style={{ color: brandColors.textPrimary }}
                >
                  Office Address
                </p>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: brandColors.textSecondary }}
                >
                  {footerData.company.address.street}<br />
                  {footerData.company.address.city}<br />
                  {footerData.company.address.country}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-3 mb-4">
              <Mail 
                className="w-5 h-5 flex-shrink-0" 
                style={{ color: brandColors.primary }}
              />
              <div>
                <p 
                  className="text-sm font-medium"
                  style={{ color: brandColors.textPrimary }}
                >
                  Email Address
                </p>
                <a
                  href={`mailto:${footerData.company.contact.email}`}
                  className="text-sm transition-colors duration-300"
                  style={{ color: brandColors.textSecondary }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = brandColors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = brandColors.textSecondary;
                  }}
                >
                  {footerData.company.contact.email}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-3 mb-4">
              <Phone 
                className="w-5 h-5 flex-shrink-0" 
                style={{ color: brandColors.primary }}
              />
              <div>
                <p 
                  className="text-sm font-medium"
                  style={{ color: brandColors.textPrimary }}
                >
                  Phone Number
                </p>
                <a
                  href={`tel:${footerData.company.contact.phone}`}
                  className="text-sm transition-colors duration-300"
                  style={{ color: brandColors.textSecondary }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = brandColors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = brandColors.textSecondary;
                  }}
                >
                  {footerData.company.contact.phone}
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-center space-x-3">
              <Clock 
                className="w-5 h-5 flex-shrink-0" 
                style={{ color: brandColors.primary }}
              />
              <div>
                <p 
                  className="text-sm font-medium"
                  style={{ color: brandColors.textPrimary }}
                >
                  Business Hours
                </p>
                <p 
                  className="text-sm"
                  style={{ color: brandColors.textSecondary }}
                >
                  {footerData.company.contact.hours}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription Section */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="max-w-2xl mx-auto text-center">
            <h3 
              className="text-xl md:text-2xl font-serif font-bold mb-4"
              style={{ color: brandColors.textPrimary }}
            >
              Stay Connected to Your Healing Journey
            </h3>
            <p 
              className="text-base md:text-lg mb-6 md:mb-8"
              style={{ color: brandColors.textSecondary }}
            >
              Get weekly Ayurvedic wisdom, seasonal health tips, and exclusive insights delivered to your inbox.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 text-base border-2 border-gray-200 rounded-full focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
                disabled={isSubscribing}
              />
              <Button
                type="submit"
                disabled={isSubscribing || !email}
                className="px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%)`,
                  color: 'white'
                }}
              >
                {isSubscribing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Subscribing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>

            {/* Subscription Status */}
            {subscriptionStatus === 'success' && (
              <p className="mt-4 text-sm text-green-600 font-medium">
                ✓ Successfully subscribed! Welcome to our healing community.
              </p>
            )}
            {subscriptionStatus === 'error' && (
              <p className="mt-4 text-sm text-red-600 font-medium">
                ✗ Something went wrong. Please try again.
              </p>
            )}

            <p 
              className="mt-4 text-sm"
              style={{ color: brandColors.textSecondary }}
            >
              Join 50,000+ people on their healing journey. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Trust Indicators - Grid on desktop, scrollable on mobile */}
        <div className="mt-12 pt-8 border-t border-gray-100 overflow-x-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 min-w-[600px] md:min-w-0">
            {footerData.trustIndicators.map((indicator, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 group">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${indicator.color}20`, color: indicator.color }}
                >
                  {indicator.icon}
                </div>
                <span 
                  className="text-sm font-medium"
                  style={{ color: brandColors.textSecondary }}
                >
                  {indicator.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="border-t border-gray-100" style={{ backgroundColor: brandColors.background }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p 
                className="text-sm text-center md:text-left"
                style={{ color: brandColors.textSecondary }}
              >
                © 2024 ekaBrahmaa. All rights reserved. Healing through ancient wisdom.
              </p>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span 
                  className="text-sm"
                  style={{ color: brandColors.textSecondary }}
                >
                  Made with love in India
                </span>
              </div>
            </div>
            
            {/* Legal Links - Scrollable on mobile */}
            <div className="flex items-center space-x-6 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto justify-center md:justify-end">
              {footerData.legalLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="text-sm transition-colors duration-300 whitespace-nowrap"
                  style={{ color: brandColors.textSecondary }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = brandColors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = brandColors.textSecondary;
                  }}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}