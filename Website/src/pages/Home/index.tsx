import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatedFAQ, AnimatedStats, AppDownloadSection, ModernHeroSection, NewsletterSignup, ParallaxSection, SocialFeed, UGCGallery } from "@/config/routeConfig";
import InteractiveFeaturesWrapper from "./InteractiveFeaturesWrapper";
import AnimatedTestimonialsWrapper from "./animatedTestimonialsWrapper";

export function Homepage() {
  return (
    <div>
      <ModernHeroSection />
      <Suspense fallback={<Skeleton className="w-full h-[300px] rounded-lg" />}>
        <AnimatedStats />
      </Suspense>
      <div className="mt-16 lg:mt-20 lazy-content">
        <Suspense fallback={<Skeleton className="w-full h-[300px] rounded-lg" />}>
          <ParallaxSection />
        </Suspense>
      </div>
      <Suspense fallback={<Skeleton className="w-full h-[300px] rounded-lg" />}>
        <InteractiveFeaturesWrapper />
      </Suspense>
      <div className="mt-16 lg:mt-20 lazy-content">
        <Suspense fallback={<Skeleton className="w-full h-[300px] rounded-lg" />}>
          <UGCGallery />
        </Suspense>
      </div>
      <div className="mt-16 lg:mt-20 lazy-content">
        <Suspense fallback={<Skeleton className="w-full h-[300px] rounded-lg" />}>
          <AnimatedTestimonialsWrapper />
        </Suspense>
      </div>
      <div className="mt-16 lg:mt-20 lazy-content">
        <Suspense fallback={<Skeleton className="w-full h-[300px] rounded-lg" />}>
          <SocialFeed />
        </Suspense>
      </div>
      <div className="mt-16 lg:mt-20 lazy-content">
        <Suspense fallback={<Skeleton className="w-full h-[300px] rounded-lg" />}>
          <AnimatedFAQ />
        </Suspense>
      </div>
      <div className="mt-16 lg:mt-20 lazy-content">
        <Suspense fallback={<Skeleton className="w-full h-[300px] rounded-lg" />}>
          <NewsletterSignup />
        </Suspense>
      </div>
      <div className="mt-16 lg:mt-20 lazy-content">
        <Suspense fallback={<Skeleton className="w-full h-[300px] rounded-lg" />}>
          <AppDownloadSection />
        </Suspense>
      </div>
    </div>
  );
}
