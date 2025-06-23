'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import Link from 'next/link';

// Program data (in a real app, this would come from a database)
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
    ],
    doshaFocus: {
      vata: 'High',
      pitta: 'Medium',
      kapha: 'Low'
    },
    doshaSpecificBenefits: {
      vata: 'Calms anxiety, reduces dryness, improves sleep quality',
      pitta: 'Cools excess heat, reduces inflammation, balances intensity',
      kapha: 'Stimulates metabolism, reduces congestion, increases energy'
    }
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
    ],
    doshaFocus: {
      vata: 'Medium',
      pitta: 'High',
      kapha: 'Medium'
    },
    doshaSpecificBenefits: {
      vata: 'Establishes grounding routines, reduces overwhelm, creates stability',
      pitta: 'Transforms anger into purpose, balances ambition, enhances leadership',
      kapha: 'Breaks through stagnation, releases emotional attachments, inspires change'
    }
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
    ],
    doshaFocus: {
      vata: 'Medium',
      pitta: 'Medium',
      kapha: 'High'
    },
    doshaSpecificBenefits: {
      vata: 'Creates comprehensive stability and routine for lasting balance',
      pitta: 'Channels intensity into purposeful transformation and leadership',
      kapha: 'Breaks through inertia and establishes dynamic, harmonious living'
    }
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
    ],
    doshaFocus: {
      vata: 'High',
      pitta: 'High',
      kapha: 'Medium'
    },
    doshaSpecificBenefits: {
      vata: 'Establishes deep stability while maintaining creative flow and vitality',
      pitta: 'Transforms intensity into radiant leadership and purposeful action',
      kapha: 'Ignites inner fire and motivation while maintaining groundedness'
    }
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
    ],
    doshaFocus: {
      vata: 'High',
      pitta: 'High',
      kapha: 'High'
    },
    doshaSpecificBenefits: {
      vata: 'Awakens intuitive wisdom while establishing profound inner stability',
      pitta: 'Transforms ambition into spiritual leadership and conscious service',
      kapha: 'Ignites spiritual fire while maintaining compassionate groundedness'
    }
  }
];

interface ProgramDetailClientProps {
  programId: string;
}

export default function ProgramDetailClient({ programId }: ProgramDetailClientProps) {
  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userDosha, setUserDosha] = useState<any>(null);

  useEffect(() => {
    // Find the program based on the programId
    const foundProgram = programs.find(p => p.id === programId);
    
    if (foundProgram) {
      setProgram(foundProgram);
    }
    
    // Try to get user's dosha from localStorage
    try {
      const doshaData = localStorage.getItem('userDosha');
      if (doshaData) {
        setUserDosha(JSON.parse(doshaData));
      }
    } catch (error) {
      console.error("Error retrieving dosha data:", error);
    }
    
    setLoading(false);
  }, [programId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-teal-700">Loading program details...</p>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 bg-gradient-to-r from-teal-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-10 h-10 text-teal-600" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-teal-900 mb-4">Program Not Found</h1>
          <p className="text-teal-700 mb-8">We couldn't find the program you're looking for. Please check the URL or explore our available programs.</p>
          <Link href="/programs">
            <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-3 rounded-full">
              View All Programs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Determine if this program is recommended for the user's dosha
  const getDoshaRecommendation = () => {
    if (!userDosha) return null;
    
    const dominantDosha = Object.keys(userDosha).reduce((a, b) => 
      userDosha[a] > userDosha[b] ? a : b
    );
    
    const isHighlyRecommended = program.doshaFocus[dominantDosha] === 'High';
    const isRecommended = program.doshaFocus[dominantDosha] === 'Medium';
    
    if (isHighlyRecommended) {
      return {
        label: 'Highly Recommended for Your Dosha',
        class: 'bg-gradient-to-r from-teal-500 to-teal-600 text-white'
      };
    } else if (isRecommended) {
      return {
        label: 'Recommended for Your Dosha',
        class: 'bg-gradient-to-r from-teal-400 to-teal-500 text-white'
      };
    }
    
    return null;
  };

  const doshaRecommendation = getDoshaRecommendation();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Card className="border-teal-100 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Program Image */}
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <img 
                src={program.image} 
                alt={program.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 to-transparent"></div>
              
              {doshaRecommendation && (
                <div className="absolute top-4 right-4">
                  <Badge className={`${doshaRecommendation.class} px-3 py-1 text-sm font-medium`}>
                    {doshaRecommendation.label}
                  </Badge>
                </div>
              )}
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

              {userDosha && (
                <div className="mb-6 p-4 bg-gradient-to-r from-teal-50 to-pink-50 rounded-lg">
                  <h4 className="font-medium text-teal-800 mb-2">Benefits for Your Dosha</h4>
                  <p className="text-teal-700 text-sm">
                    {Object.keys(userDosha).reduce((a, b) => userDosha[a] > userDosha[b] ? a : b) === 'vata' 
                      ? program.doshaSpecificBenefits.vata 
                      : Object.keys(userDosha).reduce((a, b) => userDosha[a] > userDosha[b] ? a : b) === 'pitta'
                        ? program.doshaSpecificBenefits.pitta
                        : program.doshaSpecificBenefits.kapha}
                  </p>
                </div>
              )}

              <Tabs defaultValue="features" className="mb-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="healers">Healers</TabsTrigger>
                </TabsList>
                
                <TabsContent value="features" className="space-y-2">
                  {program.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-teal-600" />
                      <span className="text-teal-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="timeline" className="space-y-3">
                  {program.healingFlow.map((phase, index: number) => (
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
                  {program.healers_info.map((healer, index: number) => (
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

        {/* Related Programs */}
        <div className="mt-16">
          <h3 className="text-2xl font-serif font-bold text-teal-900 mb-8 text-center">
            Other Programs You Might Like
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs
              .filter(p => p.id !== program.id)
              .slice(0, 3)
              .map(relatedProgram => (
                <Link href={`/programs/${relatedProgram.id}`} key={relatedProgram.id}>
                  <Card className="border-teal-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm h-full group transform hover:scale-105">
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img 
                        src={relatedProgram.image} 
                        alt={relatedProgram.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="text-xl font-serif font-bold text-white">{relatedProgram.title}</h4>
                        <p className="text-white/90 text-sm">{relatedProgram.subtitle}</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline" className="text-xs border-teal-200 text-teal-700">
                          {relatedProgram.type}
                        </Badge>
                        <span className="text-sm text-teal-600">{relatedProgram.duration}</span>
                      </div>
                      <p className="text-teal-700 text-sm line-clamp-2 mb-4">
                        {relatedProgram.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-teal-900">{relatedProgram.price}</span>
                        <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                          {relatedProgram.healers} Healers
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}