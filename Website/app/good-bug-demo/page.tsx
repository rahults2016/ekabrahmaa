'use client';

import { GoodBugHeader } from '@/components/good-bug-header';
import { GoodBugHero } from '@/components/good-bug-hero';
import { GoodBugCard } from '@/components/good-bug-card';
import { GoodBugTestimonial } from '@/components/good-bug-testimonial';
import { GoodBugButton } from '@/components/good-bug-button';

const programs = [
  {
    title: 'ekaPavana',
    description: 'A gentle 7-day cleansing program that reconnects you with your body through mindful detoxification.',
    features: [
      'Daily Ayurveda consultations',
      'Personalized cleansing protocols', 
      'Guided meditation sessions',
      'Herbal support blend'
    ],
    price: '₹3,999',
    duration: '7 days',
    action: { text: 'Begin cleanse', href: '/programs/ekapavana' }
  },
  {
    title: 'ekaSanskara',
    description: 'Transform deeply rooted patterns through our comprehensive 14-day healing program.',
    features: [
      'Intensive healer support',
      'Custom herbal formulations',
      'Lifestyle transformation',
      'Emotional healing practices'
    ],
    price: '₹7,999',
    duration: '14 days',
    action: { text: 'Start transformation', href: '/programs/ekasanskara' },
    variant: 'featured' as const
  },
  {
    title: 'ekaNidra',
    description: 'Restore balance through restorative sleep practices and deep relaxation techniques.',
    features: [
      'Sleep pattern analysis',
      'Relaxation protocols',
      'Herbal sleep support',
      'Stress reduction techniques'
    ],
    price: '₹5,499',
    duration: '10 days',
    action: { text: 'Improve sleep', href: '/programs/ekanidra' }
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Marketing Director',
    location: 'Singapore',
    text: 'The personalized approach completely transformed my relationship with food and stress. I feel more balanced than I have in years.',
    rating: 5,
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    program: 'ekaSanskara'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Software Engineer',
    location: 'San Francisco',
    text: 'Finally found a holistic approach that actually works. The team of healers working together made all the difference.',
    rating: 5,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    program: 'ekaPavana'
  }
];

export default function GoodBugDemo() {
  return (
    <div className="min-h-screen bg-cream-50">
      <GoodBugHeader />
      
      <main>
        {/* Hero Section */}
        <GoodBugHero />
        
        {/* Programs Section */}
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-h2 text-neutral-800 mb-6">
                Choose your healing path
              </h2>
              <p className="text-body-large text-neutral-600 max-w-2xl mx-auto">
                Each program is carefully designed to address specific aspects of your wellness journey through integrated healing.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <GoodBugCard
                  key={index}
                  title={program.title}
                  description={program.description}
                  features={program.features}
                  price={program.price}
                  duration={program.duration}
                  action={program.action}
                  variant={program.variant}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 px-6 lg:px-8 bg-cream-100">
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-h2 text-neutral-800 mb-6">
                Stories of transformation
              </h2>
              <p className="text-body-large text-neutral-600 max-w-2xl mx-auto">
                Real people sharing their journey to better health through personalized Ayurvedic healing.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <GoodBugTestimonial
                  key={index}
                  name={testimonial.name}
                  role={testimonial.role}
                  location={testimonial.location}
                  text={testimonial.text}
                  rating={testimonial.rating}
                  image={testimonial.image}
                  program={testimonial.program}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-screen-xl mx-auto">
            <div className="bg-sage-50 rounded-3xl p-12 lg:p-16 text-center">
              <h2 className="text-h2 text-neutral-800 mb-6">
                Ready to begin your healing journey?
              </h2>
              <p className="text-body-large text-neutral-600 mb-8 max-w-2xl mx-auto">
                Take our comprehensive assessment to discover your unique constitution and receive personalized program recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GoodBugButton size="lg">
                  Take assessment
                </GoodBugButton>
                <GoodBugButton variant="secondary" size="lg">
                  Talk to healer
                </GoodBugButton>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-neutral-800 text-cream-100 py-16 px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2">
              <h3 className="text-h4 mb-4">ekaBrahmaa</h3>
              <p className="text-body text-cream-200 leading-relaxed max-w-md">
                Ancient wisdom for modern healing. Personalized Ayurvedic programs designed for your unique constitution.
              </p>
            </div>
            <div>
              <h4 className="text-body font-medium mb-4">Programs</h4>
              <nav className="space-y-2">
                <a href="#" className="block text-body text-cream-200 hover:text-cream-100 transition-colors">ekaPavana</a>
                <a href="#" className="block text-body text-cream-200 hover:text-cream-100 transition-colors">ekaSanskara</a>
                <a href="#" className="block text-body text-cream-200 hover:text-cream-100 transition-colors">ekaNidra</a>
              </nav>
            </div>
            <div>
              <h4 className="text-body font-medium mb-4">Support</h4>
              <nav className="space-y-2">
                <a href="#" className="block text-body text-cream-200 hover:text-cream-100 transition-colors">Help Center</a>
                <a href="#" className="block text-body text-cream-200 hover:text-cream-100 transition-colors">Contact</a>
                <a href="#" className="block text-body text-cream-200 hover:text-cream-100 transition-colors">Resources</a>
              </nav>
            </div>
          </div>
          <div className="border-t border-neutral-700 pt-8 text-center">
            <p className="text-small text-cream-200">
              © 2024 ekaBrahmaa. All rights reserved. Ancient wisdom for modern healing.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}