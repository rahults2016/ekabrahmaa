'use client';

import { Header } from "@/components/sections/whatwehealsection/layout/header";
import { Footer } from "@/components/sections/whatwehealsection/layout/footer";
import { TreatmentCategories } from "@/components/sections/whatwehealsection/TreatmentCategories";
import { HealingApproach } from "@/components/sections/whatwehealsection/HealingApproach";
import { SuccessStories } from "@/components/sections/whatwehealsection/SuccessStories";
import { GettingStarted } from "@/components/sections/whatwehealsection/GettingStarted";
import { WhatWeDoHeroSection } from "@/components/sections/whatwehealsection/HeroSection";


export default function WhatWeHealPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      <Header />
      <WhatWeDoHeroSection />      
      <TreatmentCategories />
      <HealingApproach />
      <SuccessStories />
      <GettingStarted />
      
      <Footer />
    </div>
  );
}