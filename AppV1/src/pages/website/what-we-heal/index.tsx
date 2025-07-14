'use client';

import { Header } from "@/website/sections/whatwehealsection/layout/header";
import { UniversalFooter } from "@/website/layout/UniversalFooter";
import { TreatmentCategories } from "@/website/sections/whatwehealsection/TreatmentCategories";
import { HealingApproach } from "@/website/sections/whatwehealsection/HealingApproach";
import { SuccessStories } from "@/website/sections/whatwehealsection/SuccessStories";
import { GettingStarted } from "@/website/sections/whatwehealsection/GettingStarted";
import { WhatWeDoHeroSection } from "@/website/sections/whatwehealsection/HeroSection";


export default function WhatWeHealPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      <Header />
      <WhatWeDoHeroSection />      
      <TreatmentCategories />
      <HealingApproach />
      <SuccessStories />
      <GettingStarted />
      
      <UniversalFooter />
    </div>
  );
}