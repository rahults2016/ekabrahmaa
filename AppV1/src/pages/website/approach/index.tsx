import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { 
  Users, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 

  Heart, 
  Clock, 
  Brain, 
  Utensils, 
  Activity, 
  Leaf, 
  Calendar, 
  ChevronDown,
  ChevronUp,
  Play,
  Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { HealingMethodologyGuide } from '@/components/website/sections/approach/HealingMethodologyGuide';

// Methodology steps with detailed information
export const methodologySteps = [
  {
    id: 'assessment',
    title: 'Comprehensive Assessment',
    description: 'We begin with a thorough understanding of your unique constitution (Prakriti) and current imbalances (Vikriti).',
    detailedDescription: 'Our assessment goes beyond symptoms to understand the root causes of your health challenges. We analyze your physical, mental, and emotional patterns through the lens of Ayurvedic doshas (Vata, Pitta, Kapha) while incorporating modern diagnostic approaches.',
    benefits: [
      'Personalized understanding of your unique constitution',
      'Identification of root causes, not just symptoms',
      'Comprehensive health history analysis',
      'Integration of traditional wisdom with modern diagnostics'
    ],
    duration: '60-90 minutes',
    image: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'integration',
    title: 'Five Healers Integration',
    description: 'Our unique approach brings together five expert healers who collaborate on your personalized treatment plan.',
    detailedDescription: 'Unlike conventional approaches where specialists work in isolation, our five healers—Ayurvedic doctor, nutritionist, yoga therapist, functional trainer, and psychologist—work as a unified team. They collaborate to create a holistic treatment plan that addresses all aspects of your being.',
    benefits: [
      'Truly holistic care addressing body, mind, and spirit',
      'Seamless communication between all healers',
      'No contradictory advice or treatment conflicts',
      'Comprehensive approach to complex health challenges'
    ],
    duration: 'Throughout your healing journey',
    image: 'https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'personalization',
    title: 'Personalized Protocol Design',
    description: 'We create a custom healing protocol tailored to your unique constitution, current imbalances, and lifestyle.',
    detailedDescription: 'Your healing protocol is meticulously designed to address your specific needs. It includes personalized dietary recommendations, herbal formulations, yoga and movement practices, psychological support, and lifestyle modifications—all working in harmony to restore balance.',
    benefits: [
      'Custom protocols based on your unique constitution',
      'Adaptable to your lifestyle and preferences',
      'Progressive approach that evolves with your healing',
      'Sustainable practices you can maintain long-term'
    ],
    duration: '7-10 days after assessment',
    image: 'https://images.pexels.com/photos/4098226/pexels-photo-4098226.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'implementation',
    title: 'Guided Implementation',
    description: 'We provide step-by-step guidance and support as you implement your healing protocol.',
    detailedDescription: 'Implementation is where transformation happens. Our team provides daily guidance, answering questions, making adjustments, and offering encouragement. Through our app and regular check-ins, we ensure you\'re never alone on your healing journey.',
    benefits: [
      'Daily support and guidance from your healing team',
      'Real-time adjustments based on your progress',
      'Educational resources to deepen your understanding',
      'Community support from others on similar journeys'
    ],
    duration: 'Throughout your program (7-45 days)',
    image: 'https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'lifestyleIntegration',
    title: 'Lifestyle Integration',
    description: 'We help you integrate healing practices into your daily life for lasting transformation.',
    detailedDescription: 'True healing isn\'t a temporary fix but a lifestyle transformation. We help you integrate your new practices into daily life, ensuring sustainable results. This phase focuses on habit formation, routine establishment, and creating supportive environments for continued wellness.',
    benefits: [
      'Sustainable lifestyle changes that last',
      'Gradual transition to self-sufficiency',
      'Tools to maintain balance in challenging situations',
      'Community support for continued motivation'
    ],
    duration: 'Final week of your program + follow-up support',
    image: 'https://images.pexels.com/photos/3759079/pexels-photo-3759079.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

// Five healers team information
const healersTeam = [
  {
    title: 'Ayurvedic Doctor',
    description: 'Diagnoses your constitution and creates personalized treatment plans based on ancient wisdom.',
    responsibilities: [
      'Constitutional analysis (Prakriti & Vikriti)',
      'Herbal formulation recommendations',
      'Detoxification protocols',
      'Seasonal routine guidance'
    ],
    color: 'from-green-500 to-teal-500'
  },
  {
    title: 'Nutritionist',
    description: 'Designs personalized meal plans that balance your doshas and address specific health concerns.',
    responsibilities: [
      'Dosha-specific meal planning',
      'Food as medicine approach',
      'Anti-inflammatory nutrition',
      'Digestive fire (Agni) optimization'
    ],
    color: 'from-orange-500 to-red-500'
  },
  {
    title: 'Yoga Therapist',
    description: 'Creates custom yoga and breathwork practices to balance energy and promote healing.',
    responsibilities: [
      'Personalized asana sequences',
      'Pranayama (breathwork) techniques',
      'Meditation practices',
      'Energy balancing'
    ],
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Functional Trainer',
    description: 'Develops movement protocols that strengthen the body while respecting your constitution.',
    responsibilities: [
      'Constitution-appropriate exercise',
      'Functional movement patterns',
      'Strength and mobility training',
      'Injury prevention and rehabilitation'
    ],
    color: 'from-blue-500 to-indigo-500'
  },
  {
    title: 'Psychologist',
    description: 'Provides emotional and mental support, addressing the mind-body connection in healing.',
    responsibilities: [
      'Emotional pattern recognition',
      'Stress management techniques',
      'Mindset transformation',
      'Behavioral change support'
    ],
    color: 'from-pink-500 to-purple-500'
  }
];

// Core principles that guide our approach
const corePrinciples = [
  {
    title: 'Root Cause Focus',
    description: 'We address the underlying imbalances rather than merely suppressing symptoms.',
    icon: <Leaf className="w-6 h-6" />
  },
  {
    title: 'Constitutional Personalization',
    description: 'Every protocol is tailored to your unique mind-body constitution (Prakriti).',
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    title: 'Integrated Healing',
    description: 'Five healing modalities working in harmony for comprehensive transformation.',
    icon: <Users className="w-6 h-6" />
  },
  {
    title: 'Sustainable Practices',
    description: 'We focus on changes you can maintain for lifelong wellness, not quick fixes.',
    icon: <Clock className="w-6 h-6" />
  },
  {
    title: 'Ancient Wisdom, Modern Science',
    description: 'Blending time-tested Ayurvedic principles with contemporary research and technology.',
    icon: <Brain className="w-6 h-6" />
  },
  {
    title: 'Whole-Being Approach',
    description: 'Addressing physical, mental, emotional, and spiritual dimensions of health.',
    icon: <Heart className="w-6 h-6" />
  }
];

// Success metrics to demonstrate effectiveness
const successMetrics = [
  { label: 'Client Satisfaction', value: 98, color: 'bg-teal-500' },
  { label: 'Symptom Improvement', value: 92, color: 'bg-purple-500' },
  { label: 'Lifestyle Integration', value: 87, color: 'bg-pink-500' },
  { label: 'Long-term Results', value: 94, color: 'bg-blue-500' }
];

// Testimonials from clients
const testimonials = [
  {
    quote: "The Five Healers approach changed everything for me. Having a team of experts working together on my health was revolutionary. My digestion is completely transformed, and my anxiety is finally under control.",
    name: "Priya Sharma",
    location: "Mumbai",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    condition: "IBS & Anxiety"
  },
  {
    quote: "I've tried countless approaches for my chronic fatigue and hormonal issues. ekaBrahmaa's methodology was different—they didn't just treat symptoms but helped me understand the root causes and how to address them naturally.",
    name: "Rajesh Kumar",
    location: "Delhi",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
    condition: "Chronic Fatigue & Hormonal Imbalance"
  },
  {
    quote: "The personalization was incredible. My protocol was completely different from my husband's, even though we had similar symptoms. That's when I realized how truly personalized their approach is.",
    name: "Anita Patel",
    location: "Bangalore",
    image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150",
    condition: "Thyroid Disorder"
  }
];

// FAQs about our approach
const faqs = [
  {
    question: "How is your approach different from conventional healthcare?",
    answer: "Conventional healthcare often treats symptoms in isolation with different specialists working separately. Our Five Healers approach addresses root causes through a collaborative team of experts who work together on your case, creating a truly holistic treatment plan that addresses all aspects of your health simultaneously."
  },
  {
    question: "Do I need to believe in Ayurveda for this to work?",
    answer: "Not at all. While our approach incorporates Ayurvedic wisdom, it's integrated with modern science and nutrition. Many of our clients come with no prior knowledge of Ayurveda and experience significant benefits. We focus on practical results rather than requiring any particular belief system."
  },
  {
    question: "How long before I see results?",
    answer: "Most clients begin noticing initial improvements within 7-14 days of starting their protocol. These early changes might include better sleep, improved digestion, or increased energy. More significant transformations typically unfold over 1-3 months, depending on your condition and consistency with the protocol."
  },
  {
    question: "Will I need to make drastic lifestyle changes?",
    answer: "We believe in sustainable transformation, not extreme measures. Your protocol will be designed to work with your lifestyle, gradually introducing changes at a pace that works for you. Our goal is to help you create lasting habits that feel supportive rather than restrictive."
  },
  {
    question: "How do the five healers collaborate on my case?",
    answer: "After your initial assessment, your five healers meet to discuss your case and create an integrated treatment plan. They continue to communicate regularly throughout your healing journey, adjusting your protocol as needed based on your progress and feedback. This ensures all aspects of your treatment work in harmony."
  }
];

export default function OurApproachPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Create individual refs for each section
  const methodologyRef = useRef<HTMLDivElement>(null!);
  const healersRef = useRef<HTMLDivElement>(null!);
  const principlesRef = useRef<HTMLDivElement>(null!);
  const resultsRef = useRef<HTMLDivElement>(null!);
  const faqRef = useRef<HTMLDivElement>(null!);

  type SectionKey = 'methodology' | 'healers' | 'principles' | 'results' | 'faq';

  const sectionRefs: Record<SectionKey, React.RefObject<HTMLDivElement>> = {
    methodology: methodologyRef,
    healers: healersRef,
    principles: principlesRef,
    results: resultsRef,
    faq: faqRef,
  };

  useEffect(() => {
    setIsVisible(true);

    // Testimonial rotation
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isPlaying, testimonials.length]);

  const toggleFaqExpansion = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const scrollToSection = (sectionKey: SectionKey) => {
    const section = sectionRefs[sectionKey];
    if (section && section.current) {
      section.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-teal-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-100 to-pink-100 rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-teal-600 mr-2" />
              <span className="text-teal-700 font-medium">Our Unique Methodology</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-800 via-purple-800 to-pink-700 mb-6 leading-tight">
              The Five Healers Approach
            </h1>
            
            <div className="flex flex-wrap justify-center gap-4">
              {Object.keys(sectionRefs).map((key) => (
                <Button 
                  key={key}
                  variant="outline" 
                  onClick={() => scrollToSection(key as SectionKey)}
                  className="border-teal-200 text-teal-700 hover:bg-teal-50 rounded-full capitalize"
                >
                  {key}
                </Button>
              ))}
            </div>
          </div>

          {/* Video Preview */}
          <div className={`relative max-w-4xl mx-auto transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
            <div className="aspect-video bg-gradient-to-br from-teal-900 via-purple-900 to-pink-900 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/50 flex items-center justify-center">
                  <Play className="w-8 h-8 ml-1" />
                </Button>
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-black/30 backdrop-blur-sm rounded-xl p-4 text-white">
                <h3 className="text-xl font-bold mb-1">The Five Healers Methodology Explained</h3>
                <p className="text-white/80">Watch Dr. Anjali explain our unique integrated approach to holistic healing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Steps Section */}
      <section ref={methodologyRef} className="py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto px-0 sm:px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
              Our Healing Methodology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A step-by-step journey from assessment to transformation, guided by our expert team of healers
            </p>
          </div>

          <div className="space-y-8">
            <HealingMethodologyGuide />
          </div>
        </div>
      </section>

      {/* Five Healers Team Section */}
      <section ref={healersRef} className="py-20 px-6 sm:px-10 lg:px-16 bg-gradient-to-r from-teal-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-0 sm:px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
              The Five Healers Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A collaborative team of experts working in harmony to address all aspects of your health
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {healersTeam.map((healer, index) => (
              <Card 
                key={index}
                className={`border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${healer.color} rounded-full flex items-center justify-center text-white mb-4`}>
                      {index === 0 && <Leaf className="w-8 h-8" />}
                      {index === 1 && <Utensils className="w-8 h-8" />}
                      {index === 2 && <Activity className="w-8 h-8" />}
                      {index === 3 && <Heart className="w-8 h-8" />}
                      {index === 4 && <Brain className="w-8 h-8" />}
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                      {healer.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {healer.description}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                      Key Responsibilities:
                    </h4>
                    {healer.responsibilities.map((responsibility, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{responsibility}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Integration Card */}
            <Card className={`col-span-full lg:col-span-2 border-0 shadow-xl bg-gradient-to-r from-teal-900 to-purple-900 text-white overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`} style={{ transitionDelay: '500ms' }}>
              <CardContent className="p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold mb-4">
                      The Power of Integration
                    </h3>
                    <p className="text-white/90 leading-relaxed mb-6">
                      What makes our approach truly revolutionary is not just the expertise of each healer, but how they work together as a unified team. This integration ensures that all aspects of your health are addressed simultaneously, creating a synergistic effect that accelerates healing and produces profound transformations.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Collaborative Case Reviews</h4>
                        <p className="text-white/80 text-sm">Weekly team meetings to discuss your progress and refine your protocol</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Unified Treatment Plan</h4>
                        <p className="text-white/80 text-sm">A single, coherent protocol rather than fragmented recommendations</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Continuous Communication</h4>
                        <p className="text-white/80 text-sm">Real-time updates between healers as your journey progresses</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Holistic Progress Tracking</h4>
                        <p className="text-white/80 text-sm">Comprehensive monitoring of all aspects of your wellbeing</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Principles Section */}
      <section ref={principlesRef} className="py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto px-0 sm:px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
              Our Core Principles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The foundational philosophies that guide our healing methodology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {corePrinciples.map((principle, index) => (
              <Card 
                key={index}
                className={`border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:bg-gradient-to-br hover:from-teal-50 hover:to-pink-50 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-pink-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                    {principle.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {principle.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {principle.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Results & Testimonials Section */}
      <section ref={resultsRef} className="py-20 px-6 sm:px-10 lg:px-16 bg-gradient-to-r from-teal-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-0 sm:px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
              Proven Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our methodology has transformed thousands of lives with measurable, lasting results
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Success Metrics */}
            <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <h3 className="text-2xl font-serif font-bold text-gray-800 mb-8">
                Success Metrics
              </h3>
              
              {successMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{metric.label}</span>
                    <span className="text-gray-900 font-bold">{metric.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full ${metric.color} rounded-full transition-all duration-2000 ease-out`}
                      style={{ 
                        width: isVisible ? `${metric.value}%` : '0%',
                        transitionDelay: `${index * 200}ms`
                      }}
                    />
                  </div>
                </div>
              ))}
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">10,000+</div>
                  <div className="text-gray-600">Lives Transformed</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-pink-600 mb-2">5 Years</div>
                  <div className="text-gray-600">Average Results Retention</div>
                </div>
              </div>
            </div>
            
            {/* Testimonials */}
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <h3 className="text-2xl font-serif font-bold text-gray-800 mb-8">
                Client Testimonials
              </h3>
              
              <div className="relative bg-white rounded-2xl shadow-xl p-8 overflow-hidden">
                <div className="absolute top-4 right-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Play className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
                  </Button>
                </div>
                
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-pink-500 rounded-full flex items-center justify-center text-white mb-6">
                  <Quote className="w-8 h-8" />
                </div>
                
                <div className="relative h-[280px]">
                  {testimonials.map((testimonial, index) => (
                    <div 
                      key={index}
                      className={`absolute inset-0 transition-all duration-1000 ${
                        activeTestimonial === index 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 translate-x-20'
                      }`}
                    >
                      <blockquote className="text-gray-600 text-lg italic leading-relaxed mb-6">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{testimonial.name}</div>
                          <div className="text-gray-500 text-sm">{testimonial.location}</div>
                          <div className="text-teal-600 text-xs mt-1">{testimonial.condition}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center space-x-2 mt-6">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === activeTestimonial ? 'bg-teal-600 w-8' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-4xl mx-auto px-0 sm:px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Common questions about our unique healing methodology
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card 
                key={index}
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm overflow-hidden ${
                  expandedFaq === index ? 'shadow-xl' : ''
                } ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => toggleFaqExpansion(index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {faq.question}
                    </h3>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      {expandedFaq === index ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                  
                  <div className={`mt-4 text-gray-600 transition-all duration-300 overflow-hidden ${
                    expandedFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-gradient-to-r from-teal-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg?auto=compress&cs=tinysrgb&w=800')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-teal-900 via-purple-900/80 to-pink-900/80"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-0 sm:px-4 text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl font-serif font-bold mb-6">
              Begin Your Healing Journey Today
            </h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Experience the transformative power of our Five Healers approach and reclaim your health, vitality, and wellbeing
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <Card className="border-0 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Discover Your Constitution</h3>
                  <p className="text-white/80 mb-6">Take our comprehensive Prakriti quiz to understand your unique mind-body type</p>
                  <Link to="/quiz">
                    <Button className="w-full bg-white text-purple-900 hover:bg-white/90">
                      Take the Quiz
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Free Consultation</h3>
                  <p className="text-white/80 mb-6">Schedule a complimentary call with one of our expert healers to discuss your health goals</p>
                  <Link to="/consultation">
                    <Button className="w-full bg-white text-purple-900 hover:bg-white/90">
                      Book Consultation
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
            
            <p className="mt-8 text-white/60 text-sm">
              Join over 10,000 people who have transformed their health with our unique approach
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}