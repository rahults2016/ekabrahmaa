// src/config/routes.jsx
import { Layout } from '@/components/sections/homesection/layout/layout';
import { Routes, Route } from 'react-router-dom';
import { AnimatedFAQ, AnimatedStats, AppDownloadSection, NewsletterSignup, ParallaxSection, ProgramPageSection, QuizPage, SocialFeed, UGCGallery, WhatWeHealPageSection } from './routeConfig';
import InteractiveFeaturesWrapper from '@/pages/Home/InteractiveFeaturesWrapper';
import AnimatedTestimonialsWrapper from '@/pages/Home/animatedTestimonialsWrapper';
import { Homepage } from '@/pages/Home';

export function AppRoutes() {
  return (
    <Routes>
      {/* Routes with Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/stats" element={<AnimatedStats />} />
        <Route path="/features" element={<InteractiveFeaturesWrapper />} />
        <Route path="/parallax" element={<ParallaxSection />} />
        <Route path="/gallery" element={<UGCGallery />} />
        <Route path="/testimonials" element={<AnimatedTestimonialsWrapper />} />
        <Route path="/social" element={<SocialFeed />} />
        <Route path="/faq" element={<AnimatedFAQ />} />
        <Route path="/newsletter" element={<NewsletterSignup />} />
        <Route path="/download" element={<AppDownloadSection />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Route>

      {/* Standalone routes (without layout) */}
      <Route path="/what-we-heal" element={<WhatWeHealPageSection />} />
      <Route path="/programs" element={<ProgramPageSection />} />
    </Routes>
  );
}