'use client';

import { LayoutWrapper } from '@/components/layout-wrapper';
import { LoadingLink } from '@/components/loading-link';
import { LoadingButton } from '@/components/loading-button';

export function DemoPage() {
  return (
    <LayoutWrapper>
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-teal-900 mb-6">
              Modern Header & Footer Demo
            </h1>
            <p className="text-xl text-teal-700 leading-relaxed mb-8">
              Experience our professional, responsive navigation system with accessibility-first design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LoadingButton 
                href="/quiz"
                className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-4 rounded-lg shadow-lg"
              >
                Start Your Journey
              </LoadingButton>
              <LoadingButton 
                href="/consultation"
                className="border-2 border-teal-600 text-teal-700 hover:bg-teal-50 px-8 py-4 rounded-lg"
              >
                Book Consultation
              </LoadingButton>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-teal-100">
              <h3 className="text-xl font-semibold text-teal-900 mb-3">
                Responsive Design
              </h3>
              <p className="text-teal-700">
                Mobile-first design that works perfectly across all devices and screen sizes.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border border-teal-100">
              <h3 className="text-xl font-semibold text-teal-900 mb-3">
                Accessibility First
              </h3>
              <p className="text-teal-700">
                WCAG 2.1 compliant with proper ARIA labels, keyboard navigation, and screen reader support.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border border-teal-100">
              <h3 className="text-xl font-semibold text-teal-900 mb-3">
                Performance Optimized
              </h3>
              <p className="text-teal-700">
                Lightweight code with smooth animations and fast loading times under 1.5 seconds.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border border-teal-100">
              <h3 className="text-xl font-semibold text-teal-900 mb-3">
                Modern Interactions
              </h3>
              <p className="text-teal-700">
                Smooth hover effects, transitions, and micro-interactions for enhanced user experience.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border border-teal-100">
              <h3 className="text-xl font-semibold text-teal-900 mb-3">
                Loading States
              </h3>
              <p className="text-teal-700">
                Integrated with our page transition loading system for seamless navigation.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border border-teal-100">
              <h3 className="text-xl font-semibold text-teal-900 mb-3">
                Cross-Browser Support
              </h3>
              <p className="text-teal-700">
                Compatible with all modern browsers and includes fallbacks for older versions.
              </p>
            </div>
          </div>

          {/* Navigation Demo */}
          <div className="bg-gradient-to-r from-teal-50 to-pink-50 p-8 rounded-lg mb-16">
            <h2 className="text-2xl font-serif font-bold text-teal-900 mb-6">
              Test Navigation
            </h2>
            <p className="text-teal-700 mb-6">
              Try the loading states and transitions by clicking these navigation links:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <LoadingLink 
                href="/what-we-heal"
                className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 text-center text-teal-700 hover:text-teal-900"
              >
                What We Heal
              </LoadingLink>
              <LoadingLink 
                href="/programs"
                className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 text-center text-teal-700 hover:text-teal-900"
              >
                Programs
              </LoadingLink>
              <LoadingLink 
                href="/consultation"
                className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 text-center text-teal-700 hover:text-teal-900"
              >
                Consultations
              </LoadingLink>
              <LoadingLink 
                href="/blogs"
                className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 text-center text-teal-700 hover:text-teal-900"
              >
                Blogs
              </LoadingLink>
            </div>
          </div>

          {/* Newsletter Demo */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-teal-200">
            <h2 className="text-2xl font-serif font-bold text-teal-900 mb-4">
              Newsletter Integration
            </h2>
            <p className="text-teal-700 mb-6">
              The footer includes a fully functional newsletter subscription form with loading states and success feedback.
            </p>
            <div className="flex items-center justify-center">
              <p className="text-sm text-gray-600">
                ↓ Scroll down to test the newsletter subscription in the footer ↓
              </p>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}