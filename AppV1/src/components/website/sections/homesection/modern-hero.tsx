import { useState, useEffect, useRef, useCallback } from 'react';
import { HomeNavButton } from '@/components/website/HomeNavButtons';
import { Sparkles, ArrowDown, Heart, Users, Globe, Award } from 'lucide-react';
import {  useNavigate } from 'react-router-dom';


interface ModernHeroSectionProps {
  quotes?: string[];
  subtitle?: string;
  trustIndicators?: {
    icon: React.ReactNode;
    text: string;
    color: string;
  }[];
  primaryCta?: {
    text: string;
    onClick?: () => void;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  centralVisual?: {
    mainIcon: React.ReactNode;
    mainText: string;
    orbitingItems: {
      icon: string;
      label: string;
      angle: number;
    }[];
  };
  showScrollIndicator?: boolean;
  backgroundColors?: {
    from: string;
    via: string;
    to: string;
  };
  floatingCards?: {
    topRight?: {
      text: string;
    };
    bottomLeft?: {
      text: string;
    };
  };
}

export function ModernHeroSection({
  quotes = [
    "One Body. Five Paths. One Healing Journey.",
    "Your personalized team of 5 expert healers.",
    "Healing in harmony, not alone."
  ],
  subtitle = "Unlike anything you've seen before — ekaBrahmaa brings Ayurveda, Nutrition, Yoga, Psychology, and Functional Movement together, so you don't heal alone — you heal in harmony.",
  trustIndicators = [
    { icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />, text: '10,000+ Healed', color: 'from-teal-500 to-teal-600' },
    { icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" />, text: '98% Success Rate', color: 'from-green-500 to-green-600' },
    { icon: <Globe className="w-4 h-4 sm:w-5 sm:h-5" />, text: '50+ Countries', color: 'from-blue-500 to-blue-600' },
    { icon: <Heart className="w-4 h-4 sm:w-5 sm:h-5" />, text: '5-Star Rated', color: 'from-pink-500 to-pink-600' }
  ],
  primaryCta = {
    text: 'Discover Your Healing Team',
    
    
  },
  secondaryCta = {
    text: 'Take the Quiz to Begin',
    href: '/quiz'
  },
  centralVisual = {
    mainIcon: <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-teal-600 animate-pulse" />,
    mainText: 'Your healing journey starts here',
    orbitingItems: [
      { icon: '🧘‍⚕️', label: 'Ayurveda', angle: 0 },
      { icon: '🥗', label: 'Nutrition', angle: 72 },
      { icon: '🧘‍♀️', label: 'Yoga', angle: 144 },
      { icon: '🏃‍♂️', label: 'Fitness', angle: 216 },
      { icon: '🧠', label: 'Psychology', angle: 288 }
    ]
  },
  showScrollIndicator = true,
  backgroundColors = {
    from: 'teal-50',
    via: 'white',
    to: 'pink-50'
  },
  floatingCards = {
    topRight: { text: '5 Expert Healers' },
    bottomLeft: { text: 'Personalized Care' }
  }
}: ModernHeroSectionProps) {
  const navigate = useNavigate();
  
  primaryCta = {
    ...primaryCta,
    onClick: () => navigate('/#features')
  };

  const [currentQuote, setCurrentQuote] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [quotes.length]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!heroRef.current) return;
    
    window.requestAnimationFrame(() => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    });
  }, []);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, [handleMouseMove]);

  return (
    <section 
      ref={heroRef}
      className={`relative overflow-hidden bg-gradient-to-br from-${backgroundColors.from} via-${backgroundColors.via} to-${backgroundColors.to} pt-16 md:pt-24 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 min-h-[90vh] md:min-h-screen flex items-center`}
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-teal-200/30 to-pink-200/30 rounded-full blur-3xl transition-all duration-1000"
          style={{
            left: `${mousePosition.x * 100 - 20}%`,
            top: `${mousePosition.y * 100 - 20}%`,
            willChange: 'transform',
          }}
        ></div>
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-pink-200/20 to-teal-200/20 rounded-full blur-2xl transition-all duration-1500"
          style={{
            right: `${(1 - mousePosition.x) * 100 - 10}%`,
            bottom: `${(1 - mousePosition.y) * 100 - 10}%`,
            willChange: 'transform',
          }}
        ></div>
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-teal-300 rounded-full animate-pulse opacity-60`}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 2) * 60}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* Content */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'} order-2 lg:order-1`}>
            {/* Main Quote - Fixed height container to prevent layout shift */}
            <div className="mb-6 md:mb-8 min-h-[100px] sm:min-h-[120px] lg:min-h-[140px] flex items-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-800 to-pink-600 transition-all duration-1000 leading-[1.2] sm:leading-[1.1] lg:leading-[1.1] max-w-full">
                {quotes[currentQuote]}
              </h1>
            </div>

            {/* Subtitle with proper spacing */}
            <div className="mb-6 md:mb-10">
              <p className="text-base sm:text-lg lg:text-xl text-teal-700 leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            </div>

            {/* Trust Indicators with consistent spacing */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6 md:mb-10 overflow-x-auto pb-2 md:pb-0">
              {trustIndicators.map((item, index) => (
                <div 
                  key={index}
                  className={`text-center p-2 sm:p-3 rounded-lg bg-gradient-to-r ${item.color} text-white shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl min-w-[120px]`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex justify-center mb-1 sm:mb-2">
                    {item.icon}
                  </div>
                  <p className="text-xs sm:text-sm font-medium leading-tight">{item.text}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons with proper spacing */}
            <div className="mb-6 md:mb-8">
              <HomeNavButton
                primary
                label={primaryCta.text}
                href="/#features"
                icon={<ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />}
                ariaLabel="Discover your personalized healing team"
                onClick={primaryCta.onClick}
                trackingCategory="hero_section"
              />
              <HomeNavButton
                label={secondaryCta.text}
                href={secondaryCta.href}
                icon={<Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />}
                ariaLabel="Take the quiz to begin your healing journey"
                trackingCategory="hero_section"
              />
            </div>

            {/* Scroll Indicator */}
            {showScrollIndicator && (
              <div className="flex items-center space-x-2 text-teal-600 animate-pulse">
                <ArrowDown className="w-4 h-4" />
                <span className="text-sm">Scroll to explore</span>
              </div>
            )}
          </div>

          {/* Interactive Visual with contained size */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'} order-1 lg:order-2`}>
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
              {/* Main Circle - Fixed dimensions to prevent overflow */}
              <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-gradient-to-br from-teal-100 to-pink-100 rounded-full shadow-2xl overflow-hidden relative group hover:scale-105 transition-all duration-500 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-t from-teal-200/20 to-transparent"></div>
                
                {/* Central Element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center max-w-[80%]">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-r from-teal-300 to-pink-300 rounded-full mx-auto mb-2 sm:mb-3 flex items-center justify-center shadow-lg group-hover:animate-pulse">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 bg-white rounded-full flex items-center justify-center">
                        {centralVisual.mainIcon}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-teal-700 font-medium leading-tight">{centralVisual.mainText}</p>
                  </div>
                </div>

                {/* Orbiting Elements - Contained within circle */}
                {centralVisual.orbitingItems.map((item, index) => (
                  <div
                    key={index}
                    className="absolute w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-xs sm:text-sm md:text-base animate-pulse hover:scale-125 transition-all duration-300 cursor-pointer"
                    style={{
                      top: `${50 + 30 * Math.sin((item.angle * Math.PI) / 180)}%`,
                      left: `${50 + 30 * Math.cos((item.angle * Math.PI) / 180)}%`,
                      transform: 'translate(-50%, -50%)',
                      animationDelay: `${index * 0.2}s`
                    }}
                    title={item.label}
                  >
                    {item.icon}
                  </div>
                ))}
              </div>

              {/* Floating Cards */}
              {floatingCards.topRight && (
                <div className="absolute -top-2 -right-2 bg-white p-2 rounded-lg shadow-lg transform rotate-12 hover:rotate-0 transition-all duration-300 max-w-[100px] sm:max-w-[120px]">
                  <p className="text-xs text-teal-700 font-medium text-center">{floatingCards.topRight.text}</p>
                </div>
              )}
              
              {floatingCards.bottomLeft && (
                <div className="absolute -bottom-2 -left-2 bg-white p-2 rounded-lg shadow-lg transform -rotate-12 hover:rotate-0 transition-all duration-300 max-w-[100px] sm:max-w-[120px]">
                  <p className="text-xs text-teal-700 font-medium text-center">{floatingCards.bottomLeft.text}</p>
                </div>
              )}
            </div>
          </div>
        </div>
   
      </div>
    </section>
  );
}