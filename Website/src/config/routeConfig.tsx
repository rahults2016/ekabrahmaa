import { lazy } from 'react';




export const ModernHeroSection = lazy(() =>
    import('@/components/sections/homesection/modern-hero')
        .then(module => ({ default: module.ModernHeroSection }))
);


export const AnimatedStats = lazy(() => import('@/components/sections/homesection/animated-stats').then(module => ({ default: module.AnimatedStats })));

export const InteractiveFeatures = lazy(() => import('@/components/sections/homesection/interactive-features').then(mod => ({ default: mod.InteractiveFeatures })));;

export const ParallaxSection = lazy(() => import('@/components/sections/homesection/ParallaxSection').then(mod => ({ default: mod.ParallaxSection })));

export const UGCGallery = lazy(() => import('@/components/sections/homesection/ugc-gallery').then(mod => ({ default: mod.UGCGallery })));


export const AnimatedTestimonials = lazy(() => import('@/components/sections/homesection/animated-testimonials').then(mod => ({ default: mod.AnimatedTestimonials })));

export const SocialFeed = lazy(() => import('@/components/sections/homesection/social-feed').then(mod => ({ default: mod.SocialFeed })));


export const AnimatedFAQ = lazy(() => import('@/components/sections/homesection/animated-faq').then(mod => ({ default: mod.AnimatedFAQ })));

export const NewsletterSignup = lazy(() => import('@/components/sections/homesection/newsletter-signup').then(mod => ({ default: mod.NewsletterSignup })));

export const  AppDownloadSection   = lazy(() => import('@/components/sections/homesection/app-download').then(mod => ({ default: mod.AppDownloadSection })));

export const WhatWeHealPageSection = lazy(() =>
  import('@/components/sections/whatwehealsection/whatweheal').then(module => ({
    default: module.default
  }))
);


export const ProgramPageSection = lazy(() =>
  import('@/components/sections//programs/programs').then(module => ({
    default: module.default
  }))
);


export const QuizPage = lazy(() =>
  import('@/components/sections/quiz/quiz').then(module => ({
    default: module.default
  }))
);
