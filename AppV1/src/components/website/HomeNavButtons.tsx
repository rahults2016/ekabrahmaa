import { useState } from 'react';
import { LoadingLink } from '@/website/loadingLink';
import { Sparkles, Calendar, ArrowRight, ExternalLink } from 'lucide-react';

interface HomeNavButtonProps {
  primary?: boolean;
  label: string;
  href: string;
  icon?: React.ReactNode;
  ariaLabel?: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  trackingCategory?: string;
}

export function HomeNavButton({
  primary = false,
  label,
  href,
  icon,
  ariaLabel,
  external = false,
  onClick,
  trackingCategory = 'navigation'
}: HomeNavButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Custom click handler if provided
    if (onClick) {
      onClick(e);
    }
    
    // Track the click event
    try {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'button_click', {
          button_label: label,
          destination: href,
          category: trackingCategory
        });
      }
    } catch (error) {
      console.error('Analytics error:', error);
    }
  };

  // For external links, use regular anchor tag
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel || `${label} (opens in new tab)`}
        onClick={handleClick}
        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 
          ${primary 
            ? 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl px-6 py-3' 
            : 'border-2 border-teal-600 text-teal-700 hover:bg-teal-50 px-6 py-3'
          } transform hover:scale-105 active:scale-95 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {icon && <span className={`transition-transform duration-300 ${isHovered ? 'animate-pulse' : ''}`}>{icon}</span>}
        <span>{label}</span>
        <ExternalLink className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
      </a>
    );
  }

  // For internal links, use LoadingLink for smooth transitions
  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inline-flex"
    >
      <LoadingLink
        to={href}
        aria-label={ariaLabel || label}
        onClick={handleClick}
        className={`flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 
          ${primary 
            ? 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl px-4 sm:px-6 py-2 sm:py-3' 
            : 'border-2 border-teal-600 text-teal-700 hover:bg-teal-50 px-4 sm:px-6 py-2 sm:py-3'
          } transform hover:scale-105 active:scale-95 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50`}
      >
        {icon && <span className={`transition-transform duration-300 ${isHovered ? 'animate-pulse' : ''}`}>{icon}</span>}
        <span>{label}</span>
        {primary && <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />}
      </LoadingLink>
    </span>
  );
}

export function HomepageNavButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <HomeNavButton
        primary
        label="Take the Quiz"
        href="/quiz"
        icon={<Sparkles className="w-4 h-4" />}
        ariaLabel="Take the dosha quiz to discover your constitution"
        trackingCategory="primary_cta"
      />
      
      <HomeNavButton
        label="Book Consultation"
        href="/consultation"
        icon={<Calendar className="w-4 h-4" />}
        ariaLabel="Book a free consultation with our healers"
        trackingCategory="secondary_cta"
      />
    </div>
  );
}

export function HomepageExternalButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
      <HomeNavButton
        primary
        label="Visit Our Blog"
        href="https://blog.ekabrahmaa.com"
        external
        ariaLabel="Visit our blog for Ayurvedic wisdom"
        trackingCategory="external_link"
      />
      
      <HomeNavButton
        label="Community Forum"
        href="https://community.ekabrahmaa.com"
        external
        ariaLabel="Join our healing community forum"
        trackingCategory="external_link"
      />
    </div>
  );
}