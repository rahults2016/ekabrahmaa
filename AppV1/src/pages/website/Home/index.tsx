// src/pages/Home/index.jsx
import { Suspense, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Skeleton } from "@/website/ui/skeleton";
import { HomepageNavButtons } from "@/website/HomeNavButtons";
import { 
  AnimatedFAQ, 
  AnimatedStats, 
  AppDownloadSection, 
  ModernHeroSection, 
  NewsletterSignup, 
  ParallaxSection, 
  SocialFeed, 
  UGCGallery 
} from "@/config/routeConfig";
import InteractiveFeaturesWrapper from "./InteractiveFeaturesWrapper";
import AnimatedTestimonialsWrapper from "./animatedTestimonialsWrapper";

export function Homepage() {
  const location = useLocation();
  const testimonialsRef = useRef<HTMLDivElement>(null);
  // Add refs for other sections if you want to support deep linking to them
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const ugcRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const appDownloadRef = useRef<HTMLDivElement>(null);

  // ... other section refs

  useEffect(() => {
    // Scroll to section based on hash
    const scrollToSection = () => {
      const hash = location.hash;
      if (!hash) return;

      // Remove # from hash
      const sectionId = hash.substring(1);
      
      // Get the corresponding ref
      let sectionRef;
      switch(sectionId) {
        case 'testimonials':
          sectionRef = testimonialsRef;
          break;
        case 'stats':
          sectionRef = statsRef;
          break;
        case 'features':
          sectionRef = featuresRef;
          break;
        case 'parallax':
          sectionRef = parallaxRef;
          break;
        case 'ugc':
          sectionRef = ugcRef;
          break;
        case 'social':
          sectionRef = socialRef;
          break;
        case 'faq':
          sectionRef = faqRef;
          break;
        case 'newsletter':
          sectionRef = newsletterRef;
          break;
        case 'app-download':
          sectionRef = appDownloadRef;
          break;
        
        // Add cases for other sections
        default:
          return;
      }

     if (sectionRef?.current) {
        sectionRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    // Add slight delay to ensure components are rendered
    const timer = setTimeout(scrollToSection, 100);
    return () => clearTimeout(timer);
  }, [location.hash]);
  

  return (
    <div>
      
      <ModernHeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <HomepageNavButtons />
      </div>
      
      <div ref={statsRef}>
        <Suspense fallback={<Skeleton className="w-full h-[300px] rounded-lg" />}>
          <AnimatedStats />
        </Suspense>
      </div>
      
      <div className="mt-16 lg:mt-20 lazy-content" ref={featuresRef}>
        <Suspense fallback={<Skeleton className="w-full h-[300px] rounded-lg" />}>
          <InteractiveFeaturesWrapper />
        </Suspense>
      </div>
      
      <div className="mt-16 lg:mt-20 lazy-content" ref={parallaxRef}>
        <Suspense fallback={<Skeleton className="w-full h-[300px] rounded-lg" />}>
          <ParallaxSection />
        </Suspense>
      </div>
      
      <div className="mt-16 lg:mt-20 lazy-content" ref={ugcRef}>
        <Suspense fallback={<Skeleton className="w-full h-[300px] rounded-lg" />}>
          <UGCGallery />
        </Suspense>
      </div>
      
      <div 
        className="mt-16 lg:mt-20 lazy-content" 
        ref={testimonialsRef}
        id="testimonials" // Add ID for direct linking
      >
        <Suspense fallback={<Skeleton className="w-full h-[300px] rounded-lg" />}>
          <AnimatedTestimonialsWrapper />
        </Suspense>
      </div>
      
      <div className="mt-16 lg:mt-20 lazy-content" ref={socialRef}>
        <Suspense fallback={<Skeleton className="w-full h-[300px] rounded-lg" />}>
          <SocialFeed />
        </Suspense>
      </div>
      
      <div className="mt-16 lg:mt-20 lazy-content" ref={faqRef}>
        <Suspense fallback={<Skeleton className="w-full h-[300px] rounded-lg" />}>
          <AnimatedFAQ />
        </Suspense>
      </div>
      
      <div className="mt-16 lg:mt-20 lazy-content" ref={newsletterRef}>
        <Suspense fallback={<Skeleton className="w-full h-[300px] rounded-lg" />}>
          <NewsletterSignup />
        </Suspense>
      </div>
      
      <div className="mt-16 lg:mt-20 lazy-content" ref={appDownloadRef}>
        <Suspense fallback={<Skeleton className="w-full h-[300px] rounded-lg" />}>
          <AppDownloadSection />
        </Suspense>
      </div>
    </div>
  );
}