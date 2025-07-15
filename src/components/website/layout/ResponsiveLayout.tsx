import { Outlet } from 'react-router-dom';
import { ResponsiveNavigation } from './ResponsiveNavigation';
import { UniversalFooter } from './UniversalFooter';
import { Calendar, Leaf, Sparkles } from 'lucide-react';
import { HomeNavButton } from '../HomeNavButtons';
// import { HomeNavButton } from '@/components/website/layout/HomeNavButtons';

// Main navigation items
const navigationItems = [
  {
    title: 'Home',
    href: '/'
  },
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
    title: 'Our Approach',
    href: '/approach',
    children: [
      { title: 'Five Healers System', href: '/approach/five-healers' },
      { title: 'Daily Rituals', href: '/approach/daily-rituals' }
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
    title: 'Stories',
    href: '/stories'
  }
];

// Logo component
const Logo = () => (
  <>
    <div 
      className="bg-gradient-to-r from-teal-600 to-pink-400 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 w-10 h-10 md:w-12 md:h-12"
    >
      <Leaf className="text-white w-5 h-5 md:w-6 md:h-6" />
    </div>
    <div className="hidden sm:block">
      <span 
        className="font-serif font-bold text-teal-800 group-hover:text-teal-900 transition-colors text-xl md:text-2xl"
        style={{ letterSpacing: '0.5px' }}
      >
        ekaBrahmaa
      </span>
      <p className="text-xs text-teal-600 -mt-1 font-medium">One Source • Infinite Healing</p>
    </div>
  </>
);

// CTA Buttons
const CTAButtons = () => (
  <>
    <HomeNavButton
      label="Take Quiz"
      href="/quiz"
      icon={<Sparkles className="w-4 h-4" />}
      ariaLabel="Take the dosha quiz to discover your constitution"
    />
    <HomeNavButton
      label="Book Consultation"
      href="/consultation"
      icon={<Calendar className="w-4 h-4" />}
      ariaLabel="Book a free consultation with our healers"
      primary
    />
  </>
);

export function ResponsiveLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ResponsiveNavigation 
        items={navigationItems} 
        logo={<Logo />}
        ctaButtons={<CTAButtons />}
      />
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <UniversalFooter />
    </div>
  );
}