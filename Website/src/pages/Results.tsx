import { lazy, Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Droplets, Moon, Sun } from 'lucide-react';

const programs = [
    {
        id: 'ekapavana',
        title: 'ekaPavana',
        subtitle: 'Clear Within',
        description: 'Reconnect with your body, breath, and being.',
        duration: '7 Days',
        price: '₹3,999',
        healers: 2,
        type: 'Self-Guided',
        icon: <Droplets className="w-6 h-6" />,
        features: ['Daily consultations', 'Personalized meal plan', 'Yoga sessions', 'Breathing exercises'],
        color: 'from-blue-500 to-cyan-500'
    },
    {
        id: 'ekasanskara',
        title: 'ekaSanskara',
        subtitle: 'Transform Deeply',
        description: 'Deep transformation through ancient wisdom.',
        duration: '14 Days',
        price: '₹7,999',
        healers: 3,
        type: 'Healer-Guided',
        icon: <Sun className="w-6 h-6" />,
        features: ['Intensive consultations', 'Custom herbal formulations', 'Lifestyle coaching', 'Emotional support'],
        color: 'from-orange-500 to-red-500'
    },
    {
        id: 'ekanidra',
        title: 'ekaNidra',
        subtitle: 'Rest & Restore',
        description: 'Healing through restorative sleep and rest.',
        duration: '10 Days',
        price: '₹5,499',
        healers: 2,
        type: 'Ailment-Specific',
        icon: <Moon className="w-6 h-6" />,
        features: ['Sleep assessment', 'Meditation sessions', 'Herbal teas', 'Relaxation techniques'],
        color: 'from-purple-500 to-indigo-500'
    }
];


const testimonials = [
    {
        name: 'Priya Sharma',
        location: 'Mumbai',
        program: 'ekaPavana',
        rating: 5,
        text: 'The 7-day cleanse was transformative. I feel lighter, more energetic, and deeply connected to my body again.',
        image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        beforeAfter: {
            before: 'Constant fatigue, digestive issues',
            after: 'Energetic, clear skin, better sleep'
        }
    },
    {
        name: 'Rajesh Kumar',
        location: 'Delhi',
        program: 'ekaSanskara',
        rating: 5,
        text: 'Two weeks of personalized healing changed my life. The healers understood my unique constitution perfectly.',
        image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        beforeAfter: {
            before: 'High stress, irregular eating',
            after: 'Balanced lifestyle, improved focus'
        }
    },
    {
        name: 'Anita Patel',
        location: 'Bangalore',
        program: 'ekaNidra',
        rating: 5,
        text: 'Finally found peace with my sleep patterns. The holistic approach addressed root causes, not just symptoms.',
        image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
        beforeAfter: {
            before: 'Insomnia, anxiety',
            after: 'Deep sleep, mental clarity'
        }
    }
];

// 1. Define the lazy-loaded component (at module level, not inside another component)
const AnimatedStats = lazy(() =>
    import('@/components/animated-stats')
        .then(module => ({ default: module.AnimatedStats }))
);
const InteractiveFeatures = lazy(() => import('@/components/interactive-features').then(mod => ({ default: mod.InteractiveFeatures })));

const ParallaxSection = lazy(() => import('@/components/ParallaxSection').then(mod => ({ default: mod.ParallaxSection })));

const UGCGallery = lazy(() => import('@/components/ugc-gallery').then(mod => ({ default: mod.UGCGallery })));


const AnimatedTestimonials = lazy(() => import('@/components/animated-testimonials').then(mod => ({ default: mod.AnimatedTestimonials })));

const SocialFeed = lazy(() => import('@/components/social-feed').then(mod => ({ default: mod.SocialFeed })));


const AnimatedFAQ = lazy(() => import('@/components/animated-faq').then(mod => ({ default: mod.AnimatedFAQ })));

const NewsletterSignup = lazy(() => import('@/components/newsletter-signup').then(mod => ({ default: mod.NewsletterSignup })));

const  AppDownloadSection   = lazy(() => import('@/components/app-download').then(mod => ({ default: mod.AppDownloadSection })));



// 2. Use it directly in your ModernHeroSection
export function HeroSection() {
    return (
        <section>
            {/* Other content */}

            {/* Lazy-loaded component with Suspense */}
            <Suspense fallback={<Skeleton className="w-full h-[300px] rounded-lg" />}>
                <AnimatedStats />


            </Suspense>

            <div className="mt-16 lg:mt-20 lazy-content">
                <InteractiveFeatures programs={programs} />
            </div>

            <div className="mt-16 lg:mt-20 lazy-content">
                <ParallaxSection />
            </div>
            <div className="mt-16 lg:mt-20 lazy-content">
                <UGCGallery />
            </div>

            <div className="mt-16 lg:mt-20 lazy-content">
                <AnimatedTestimonials testimonials={testimonials} />
            </div>

            <div className="mt-16 lg:mt-20 lazy-content">
                <SocialFeed />
            </div>

             <div className="mt-16 lg:mt-20 lazy-content">
          <AnimatedFAQ />
        </div>

          <div className="mt-16 lg:mt-20 lazy-content">
          <NewsletterSignup />
        </div>

          <div className="mt-16 lg:mt-20 lazy-content">
          <AppDownloadSection />
        </div>

            {/* More content */}
        </section>
    );
}