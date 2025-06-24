'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  Users, 
  ArrowRight, 
  CheckCircle,
  Leaf,
  Sun,
  Moon,
  Droplets,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const programs = [
  {
    id: 'ekapavana',
    title: 'ekaPavana',
    subtitle: 'Clear Within',
    description: 'A comprehensive 7-day cleansing program that reconnects you with your body, breath, and being through gentle detoxification and mindful practices.',
    duration: '7 Days',
    price: '₹3,999',
    healers: 2,
    type: 'Self-Guided',
    icon: <Droplets className="w-8 h-8" />,
    image: 'https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      'Daily virtual consultations with Ayurveda doctor',
      'Personalized cleansing meal plan',
      'Guided yoga and pranayama sessions',
      'Herbal tea blends for detoxification',
      'Meditation and mindfulness practices',
      'Progress tracking journal'
    ],
    healingFlow: [
      { day: 1, title: 'Preparation', activities: ['Initial consultation', 'Diet transition', 'Herbal tea introduction'] },
      { day: 2, title: 'Gentle Cleansing', activities: ['Morning yoga', 'Cleansing diet', 'Evening meditation'] },
      { day: 3, title: 'Deep Detox', activities: ['Pranayama practice', 'Oil pulling', 'Herbal steam'] },
      { day: 4, title: 'Renewal', activities: ['Body massage', 'Mindful eating', 'Journaling'] },
      { day: 5, title: 'Integration', activities: ['Energy assessment', 'Lifestyle planning', 'Gratitude practice'] },
      { day: 6, title: 'Stabilization', activities: ['Dosha balancing', 'Routine establishment', 'Community sharing'] },
      { day: 7, title: 'Completion', activities: ['Final consultation', 'Future planning', 'Celebration ritual'] }
    ],
    healers_info: [
      {
        name: 'Dr. Priya Sharma',
        specialization: 'Ayurveda Physician',
        experience: '12 years',
        description: 'Specialist in Panchakarma and detoxification therapies'
      },
      {
        name: 'Ravi Kumar',
        specialization: 'Yoga Therapist',
        experience: '8 years',
        description: 'Expert in pranayama and meditation techniques'
      }
    ]
  },
  {
    id: 'ekasanskara',
    title: 'ekaSanskara',
    subtitle: 'Rewrite Your Rhythm',
    description: 'A profound 14-day transformation program that addresses deep-rooted patterns and creates lasting change through intensive Ayurvedic practices.',
    duration: '14 Days',
    price: '₹7,999',
    healers: 4,
    type: 'Healer-Guided',
    icon: <Sun className="w-8 h-8" />,
    image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      'Intensive daily consultations',
      'Custom herbal formulations',
      'Personalized yoga therapy',
      'Emotional release practices',
      'Lifestyle and dietary counseling',
      'Ongoing support and follow-up'
    ],
    healingFlow: [
      { day: 1, title: 'Deep Assessment', activities: ['Comprehensive consultation', 'Dosha analysis', 'Goal setting'] },
      { day: 3, title: 'Foundation Building', activities: ['Routine establishment', 'Herbal medicine start', 'Yoga practice'] },
      { day: 5, title: 'Intensive Therapy', activities: ['Emotional work', 'Body therapies', 'Meditation deepening'] },
      { day: 7, title: 'Mid-point Review', activities: ['Progress assessment', 'Plan adjustment', 'Community connection'] },
      { day: 10, title: 'Integration Phase', activities: ['Lifestyle integration', 'Habit formation', 'Relationship healing'] },
      { day: 12, title: 'Stabilization', activities: ['Energy balancing', 'Future visioning', 'Support planning'] },
      { day: 14, title: 'Graduation', activities: ['Final assessment', 'Maintenance plan', 'Celebration'] }
    ],
    healers_info: [
      {
        name: 'Dr. Anjali Patel',
        specialization: 'Senior Ayurveda Physician',
        experience: '15 years',
        description: 'Expert in constitutional therapy and emotional healing'
      },
      {
        name: 'Meditation Master Suresh',
        specialization: 'Mindfulness Guide',
        experience: '20 years',
        description: 'Specialist in deep transformational practices'
      },
      {
        name: 'Nutritionist Kavya',
        specialization: 'Ayurvedic Nutrition',
        experience: '10 years',
        description: 'Expert in therapeutic diet planning'
      },
      {
        name: 'Dr. Rajesh Kumar',
        specialization: 'Functional Trainer',
        experience: '12 years',
        description: 'Expert in movement therapy and physical rehabilitation'
      }
    ]
  },
  {
    id: 'ekasamanvaya',
    title: 'ekaSamanvaya',
    subtitle: 'In Tune with You',
    description: 'A comprehensive 21-day program that brings all aspects of your being into harmony through integrated healing practices.',
    duration: '21 Days',
    price: '₹7,999',
    healers: 5,
    type: 'Comprehensive',
    icon: <Moon className="w-8 h-8" />,
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      'Complete 5-healer team integration',
      'Personalized Ayurvedic protocols',
      'Comprehensive nutrition planning',
      'Yoga and movement therapy',
      'Psychological support and counseling',
      'Daily routine optimization'
    ],
    healingFlow: [
      { day: 1, title: 'Comprehensive Assessment', activities: ['Full team consultation', 'Dosha analysis', 'Goal alignment'] },
      { day: 5, title: 'Foundation Phase', activities: ['Routine establishment', 'Diet implementation', 'Movement introduction'] },
      { day: 10, title: 'Integration Phase', activities: ['Emotional work', 'Habit formation', 'Energy balancing'] },
      { day: 15, title: 'Harmony Phase', activities: ['Advanced practices', 'Lifestyle optimization', 'Relationship healing'] },
      { day: 21, title: 'Mastery Phase', activities: ['Self-sufficiency', 'Long-term planning', 'Celebration'] }
    ],
    healers_info: [
      {
        name: 'Dr. Priya Sharma',
        specialization: 'Lead Ayurveda Physician',
        experience: '14 years',
        description: 'Expert in constitutional therapy and Panchakarma'
      },
      {
        name: 'Nutritionist Kavya',
        specialization: 'Ayurvedic Nutrition',
        experience: '9 years',
        description: 'Specialist in therapeutic diet and anti-inflammatory nutrition'
      },
      {
        name: 'Yoga Master Arjun',
        specialization: 'Yoga & Breathwork',
        experience: '12 years',
        description: 'Expert in pranayama and movement therapy'
      },
      {
        name: 'Dr. Meera Patel',
        specialization: 'Psychologist',
        experience: '10 years',
        description: 'Specialist in mind-body healing and emotional wellness'
      },
      {
        name: 'Trainer Vikram',
        specialization: 'Functional Movement',
        experience: '8 years',
        description: 'Expert in strength training and physical rehabilitation'
      }
    ]
  },
  {
    id: 'ekaudaya',
    title: 'ekaUdaya',
    subtitle: 'Rise into Radiance',
    description: 'A transformative 28-day program designed to elevate your entire being into radiant health and vitality.',
    duration: '28 Days',
    price: '₹11,999',
    healers: 5,
    type: 'Transformative',
    icon: <Sun className="w-8 h-8" />,
    image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      'Intensive 5-healer collaboration',
      'Advanced Panchakarma protocols',
      'Personalized herbal formulations',
      'Advanced yoga and meditation',
      'Comprehensive lifestyle transformation',
      '3-month follow-up support'
    ],
    healingFlow: [
      { day: 1, title: 'Deep Preparation', activities: ['Comprehensive assessment', 'Detox preparation', 'Team alignment'] },
      { day: 7, title: 'Purification Phase', activities: ['Panchakarma protocols', 'Deep cleansing', 'Energy work'] },
      { day: 14, title: 'Transformation Phase', activities: ['Intensive practices', 'Pattern breaking', 'New habit formation'] },
      { day: 21, title: 'Integration Phase', activities: ['Lifestyle mastery', 'Relationship healing', 'Purpose alignment'] },
      { day: 28, title: 'Radiance Phase', activities: ['Vitality optimization', 'Wisdom integration', 'Future visioning'] }
    ],
    healers_info: [
      {
        name: 'Dr. Anjali Patel',
        specialization: 'Senior Ayurveda Physician',
        experience: '15 years',
        description: 'Master of advanced Panchakarma and constitutional therapy'
      },
      {
        name: 'Nutritionist Kavya',
        specialization: 'Therapeutic Nutrition',
        experience: '10 years',
        description: 'Expert in healing foods and metabolic optimization'
      },
      {
        name: 'Yoga Master Suresh',
        specialization: 'Advanced Yoga Therapy',
        experience: '20 years',
        description: 'Master of pranayama, meditation, and energy work'
      },
      {
        name: 'Dr. Meera Patel',
        specialization: 'Transformational Psychology',
        experience: '12 years',
        description: 'Expert in deep healing and consciousness transformation'
      },
      {
        name: 'Master Trainer Vikram',
        specialization: 'Holistic Fitness',
        experience: '10 years',
        description: 'Expert in strength, flexibility, and vitality optimization'
      }
    ]
  },
  {
    id: 'ekaprabodha',
    title: 'ekaPrabodha',
    subtitle: 'Awaken the Wisdom Within',
    description: 'The ultimate 45-day journey of awakening, integrating ancient wisdom with modern healing for complete transformation.',
    duration: '45 Days',
    price: '₹17,999',
    healers: 5,
    type: 'Mastery',
    icon: <Sparkles className="w-8 h-8" />,
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      'Master-level 5-healer guidance',
      'Advanced spiritual practices',
      'Personalized wisdom teachings',
      'Complete lifestyle mastery',
      'Leadership development',
      '1-year ongoing mentorship'
    ],
    healingFlow: [
      { day: 1, title: 'Sacred Preparation', activities: ['Spiritual assessment', 'Intention setting', 'Sacred commitment'] },
      { day: 10, title: 'Purification Mastery', activities: ['Advanced cleansing', 'Energy purification', 'Mental clarity'] },
      { day: 20, title: 'Wisdom Awakening', activities: ['Ancient teachings', 'Intuition development', 'Inner guidance'] },
      { day: 30, title: 'Integration Mastery', activities: ['Lifestyle mastery', 'Relationship transformation', 'Service preparation'] },
      { day: 45, title: 'Wisdom Embodiment', activities: ['Teaching preparation', 'Leadership development', 'Sacred graduation'] }
    ],
    healers_info: [
      {
        name: 'Guru Dr. Rajesh',
        specialization: 'Master Ayurveda Physician',
        experience: '25 years',
        description: 'Master teacher of classical Ayurveda and spiritual healing'
      },
      {
        name: 'Master Nutritionist Priya',
        specialization: 'Consciousness Nutrition',
        experience: '15 years',
        description: 'Expert in food as medicine and consciousness elevation'
      },
      {
        name: 'Yoga Guru Ananda',
        specialization: 'Classical Yoga Master',
        experience: '30 years',
        description: 'Master of classical yoga, meditation, and spiritual practices'
      },
      {
        name: 'Dr. Wisdom Keeper Maya',
        specialization: 'Consciousness Psychology',
        experience: '18 years',
        description: 'Expert in consciousness transformation and wisdom integration'
      },
      {
        name: 'Master Trainer Arjun',
        specialization: 'Sacred Movement',
        experience: '15 years',
        description: 'Master of movement as spiritual practice and energy cultivation'
      }
    ]
  }
];

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-pink-400 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-serif font-bold text-teal-800">ekaBrahmaa</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-serif font-bold text-teal-900 mb-6">
            Healing Programs
          </h1>
          <p className="text-xl text-teal-700 leading-relaxed mb-8">
            Choose from our carefully crafted programs designed to address your unique healing needs and constitution
          </p>
        </div>
      </section>

      {/* Programs List */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {programs.map((program) => (
            <Card key={program.id} className="border-teal-100 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Program Image */}
                <div className="relative h-64 lg:h-auto">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 to-transparent"></div>
                </div>

                {/* Program Details */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-100 to-pink-100 rounded-full flex items-center justify-center">
                        {program.icon}
                      </div>
                      <Badge variant="secondary" className="bg-gradient-to-r from-teal-50 to-pink-50 text-teal-700 border-teal-200">
                        {program.type}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-teal-900">{program.price}</div>
                      <div className="text-sm text-teal-600">{program.duration}</div>
                    </div>
                  </div>

                  <h2 className="text-3xl font-serif font-bold text-teal-900 mb-2">
                    {program.title}
                  </h2>
                  <h3 className="text-xl font-medium text-pink-600 mb-4">
                    {program.subtitle}
                  </h3>
                  <p className="text-teal-700 leading-relaxed mb-6">
                    {program.description}
                  </p>

                  <div className="flex items-center space-x-6 mb-6 text-sm text-teal-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{program.healers} Expert Healers</span>
                    </div>
                  </div>

                  <Tabs defaultValue="features" className="mb-6">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="features">Features</TabsTrigger>
                      <TabsTrigger value="timeline">Timeline</TabsTrigger>
                      <TabsTrigger value="healers">Healers</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="features" className="space-y-2">
                      {program.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-teal-600" />
                          <span className="text-teal-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="timeline" className="space-y-3">
                      {program.healingFlow.map((phase, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-semibold text-sm">
                            {phase.day}
                          </div>
                          <div>
                            <h4 className="font-medium text-teal-800">{phase.title}</h4>
                            <p className="text-sm text-teal-600">{phase.activities.join(', ')}</p>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="healers" className="space-y-4">
                      {program.healers_info.map((healer, index) => (
                        <div key={index} className="border-l-4 border-teal-200 pl-4">
                          <h4 className="font-semibold text-teal-800">{healer.name}</h4>
                          <p className="text-sm text-teal-600">{healer.specialization} • {healer.experience}</p>
                          <p className="text-sm text-teal-700 mt-1">{healer.description}</p>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>

                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white"
                  >
                    Start {program.title}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-50 to-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-teal-900 mb-6">
            Not Sure Which Program is Right for You?
          </h2>
          <p className="text-xl text-teal-700 mb-8 leading-relaxed">
            Take our Prakriti quiz to discover your unique constitution and get personalized program recommendations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white px-8 py-3 rounded-full">
              Take Prakriti Quiz
            </Button>
            <Button variant="outline" size="lg" className="border-teal-600 text-teal-700 hover:bg-teal-50 px-8 py-3 rounded-full">
              Talk to a Healer
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}