'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Clock, 
  Users, 
  ArrowRight, 
  Leaf,
  Sun,
  Moon,
  Droplets,
  ArrowLeft,
  Sparkles,
  Star,
  CheckCircle
} from 'lucide-react';
import { LayoutWrapper } from '@/components/layout-wrapper';
import { LoadingLink } from '@/components/loading-link';
import { motion } from 'framer-motion';

// Program data with dosha recommendations
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
    recommendedFor: ['vata', 'pitta'], // Doshas this program is recommended for
    benefits: {
      vata: 'Helps ground scattered energy and calm the nervous system',
      pitta: 'Cools excess heat and reduces inflammation in the body',
      kapha: 'Stimulates metabolism and reduces heaviness'
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
    recommendedFor: ['pitta', 'kapha'], // Doshas this program is recommended for
    benefits: {
      vata: 'Creates stability and routine for lasting transformation',
      pitta: 'Channels determination and focus into positive change',
      kapha: 'Breaks through resistance and establishes new patterns'
    }
  },
  {
    id: 'ekanidra',
    title: 'ekaNidra',
    subtitle: 'Rest & Restore',
    description: 'A specialized 10-day program focused on healing through restorative sleep and deep relaxation practices.',
    duration: '10 Days',
    price: '₹5,499',
    healers: 2,
    type: 'Ailment-Specific',
    icon: <Moon className="w-8 h-8" />,
    image: 'https://images.pexels.com/photos/3760778/pexels-photo-3760778.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      'Sleep pattern analysis',
      'Customized bedtime routines',
      'Herbal sleep aids',
      'Stress reduction techniques',
      'Evening yoga nidra sessions',
      'Sleep environment optimization'
    ],
    recommendedFor: ['vata', 'kapha'], // Doshas this program is recommended for
    benefits: {
      vata: 'Calms an overactive mind and reduces anxiety for better sleep',
      pitta: 'Cools the system and releases tension for deeper rest',
      kapha: 'Establishes energizing morning routines to balance excess sleep'
    }
  }
];

export default function SuggestedProgramsPage() {
  const [dominantDosha, setDominantDosha] = useState<string | null>(null);
  const [secondaryDosha, setSecondaryDosha] = useState<string | null>(null);
  const [doshaPercentages, setDoshaPercentages] = useState<{[key: string]: number}>({});
  const [recommendedPrograms, setRecommendedPrograms] = useState<typeof programs>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get dosha results from localStorage
    const storedResults = localStorage.getItem('prakritiResults');
    
    if (storedResults) {
      const results = JSON.parse(storedResults) as {[key: string]: number};
      setDoshaPercentages(results);
      
      // Determine dominant and secondary doshas
      const doshas = Object.entries(results).sort((a, b) => b[1] - a[1]);
      if (doshas.length > 0) {
        setDominantDosha(doshas[0][0]);
        if (doshas.length > 1) {
          setSecondaryDosha(doshas[1][0]);
        }
      }
    } else {
      // If no results, redirect to quiz
      window.location.href = '/quiz';
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    if (dominantDosha) {
      // Filter programs that are recommended for the dominant dosha
      const filtered = programs.filter(program => 
        program.recommendedFor.includes(dominantDosha) || 
        (secondaryDosha && program.recommendedFor.includes(secondaryDosha))
      );
      
      // Sort by relevance (programs that match both doshas come first)
      filtered.sort((a, b) => {
        const aMatchesBoth = secondaryDosha && 
          a.recommendedFor.includes(dominantDosha) && 
          a.recommendedFor.includes(secondaryDosha);
        
        const bMatchesBoth = secondaryDosha && 
          b.recommendedFor.includes(dominantDosha) && 
          b.recommendedFor.includes(secondaryDosha);
        
        if (aMatchesBoth && !bMatchesBoth) return -1;
        if (!aMatchesBoth && bMatchesBoth) return 1;
        return 0;
      });
      
      setRecommendedPrograms(filtered);
    }
  }, [dominantDosha, secondaryDosha]);

  const getDoshaColor = (dosha: string) => {
    switch(dosha) {
      case 'vata': return 'from-blue-500 to-purple-500';
      case 'pitta': return 'from-red-500 to-orange-500';
      case 'kapha': return 'from-green-500 to-teal-500';
      default: return 'from-teal-500 to-teal-700';
    }
  };

  const getDoshaName = (dosha: string) => {
    switch(dosha) {
      case 'vata': return 'Vata';
      case 'pitta': return 'Pitta';
      case 'kapha': return 'Kapha';
      default: return dosha;
    }
  };

  const getDoshaIcon = (dosha: string) => {
    switch(dosha) {
      case 'vata': return <Moon className="w-5 h-5" />;
      case 'pitta': return <Sun className="w-5 h-5" />;
      case 'kapha': return <Leaf className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <LayoutWrapper>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-teal-700">Finding your perfect programs...</p>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-serif font-bold text-teal-900 mb-6">
              Your Personalized Program Recommendations
            </h1>
            <p className="text-xl text-teal-700 leading-relaxed mb-8">
              Based on your {dominantDosha && getDoshaName(dominantDosha)}-dominant constitution, we've selected these programs to support your unique healing journey
            </p>
            
            {dominantDosha && (
              <motion.div 
                className="mb-12 max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className={`p-4 rounded-xl bg-gradient-to-r ${getDoshaColor(dominantDosha)} text-white shadow-lg`}>
                  <div className="flex items-center mb-2">
                    {getDoshaIcon(dominantDosha)}
                    <h2 className="text-xl font-bold ml-2">Your Dominant Dosha: {getDoshaName(dominantDosha)}</h2>
                  </div>
                  <p className="mb-3 opacity-90">
                    {dominantDosha === 'vata' && "Creative, energetic, and quick. You benefit from grounding practices and routine."}
                    {dominantDosha === 'pitta' && "Focused, determined, and passionate. You benefit from cooling practices and moderation."}
                    {dominantDosha === 'kapha' && "Steady, nurturing, and calm. You benefit from stimulating practices and variety."}
                  </p>
                  <div className="flex justify-between text-sm">
                    <LoadingLink href="/quiz">
                      <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-none">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Results
                      </Button>
                    </LoadingLink>
                    <LoadingLink href="/consultation">
                      <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-none">
                        Talk to a Healer
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </LoadingLink>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Programs List */}
          <div className="mb-16">
            <motion.h2 
              className="text-3xl font-serif font-bold text-teal-900 mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Recommended Programs for You
            </motion.h2>
            
            {recommendedPrograms.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendedPrograms.map((program, index) => (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                  >
                    <Card className="border-teal-100 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm group transform hover:scale-105 h-full flex flex-col">
                      <div className="h-48 relative overflow-hidden rounded-t-lg">
                        <img 
                          src={program.image} 
                          alt={program.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
                          <Badge 
                            variant="secondary" 
                            className="bg-gradient-to-r from-teal-50 to-pink-50 text-teal-700 border-teal-200"
                          >
                            {program.type}
                          </Badge>
                        </div>
                        
                        {dominantDosha && program.recommendedFor.includes(dominantDosha) && (
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-gradient-to-r from-teal-600 to-teal-700 text-white border-none">
                              <Star className="w-3 h-3 mr-1 fill-yellow-300 text-yellow-300" />
                              Recommended for You
                            </Badge>
                          </div>
                        )}
                      </div>
                      
                      <CardHeader className="pb-2 flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <div className="w-12 h-12 bg-gradient-to-r from-teal-100 to-pink-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            {program.icon}
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-teal-900">{program.price}</div>
                            <div className="text-sm text-teal-600">{program.duration}</div>
                          </div>
                        </div>
                        
                        <CardTitle className="text-2xl font-serif text-teal-900 mb-1">
                          {program.title}
                        </CardTitle>
                        <CardDescription className="text-lg font-medium text-pink-600">
                          {program.subtitle}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-4 pt-0">
                        <p className="text-teal-700 text-sm">
                          {program.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-teal-600">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{program.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{program.healers} Healers</span>
                          </div>
                        </div>
                        
                        {dominantDosha && (
                          <div className="bg-gradient-to-r from-teal-50 to-pink-50 p-3 rounded-lg">
                            <h4 className="font-medium text-teal-800 text-sm mb-1 flex items-center">
                              <Sparkles className="w-4 h-4 mr-1" />
                              Perfect for your {getDoshaName(dominantDosha)} constitution:
                            </h4>
                            <p className="text-xs text-teal-700">
                              {program.benefits[dominantDosha as keyof typeof program.benefits]}
                            </p>
                          </div>
                        )}
                        
                        <LoadingLink href={`/programs/${program.id}`} className="block mt-4">
                          <Button 
                            className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full"
                          >
                            Learn More
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </LoadingLink>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-teal-700 mb-4">Loading your personalized recommendations...</p>
              </div>
            )}
          </div>

          {/* Program Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mb-16"
          >
            <Card className="border-teal-200 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-teal-900">What Makes Our Programs Special</CardTitle>
                <CardDescription className="text-teal-600">
                  Comprehensive healing through our unique 5-healer integration model
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-5 rounded-xl">
                    <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white mb-4">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-teal-900 mb-2">5-Healer Integration</h3>
                    <p className="text-teal-700 text-sm">
                      Our unique approach brings together Ayurveda, Nutrition, Yoga, Psychology, and Functional Movement for complete healing.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-5 rounded-xl">
                    <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white mb-4">
                      <User className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-pink-900 mb-2">Personalized Approach</h3>
                    <p className="text-pink-700 text-sm">
                      Every program is tailored to your unique constitution and current imbalances for maximum effectiveness.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-5 rounded-xl">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white mb-4">
                      <Brain className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-purple-900 mb-2">Root Cause Healing</h3>
                    <p className="text-purple-700 text-sm">
                      We address the underlying causes of your health challenges, not just the symptoms.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: <CheckCircle className="w-4 h-4 mr-2 text-teal-600" />, text: "Daily healer support" },
                    { icon: <CheckCircle className="w-4 h-4 mr-2 text-teal-600" />, text: "Personalized meal plans" },
                    { icon: <CheckCircle className="w-4 h-4 mr-2 text-teal-600" />, text: "Custom herbal formulations" },
                    { icon: <CheckCircle className="w-4 h-4 mr-2 text-teal-600" />, text: "Guided meditation sessions" },
                    { icon: <CheckCircle className="w-4 h-4 mr-2 text-teal-600" />, text: "Yoga and movement therapy" },
                    { icon: <CheckCircle className="w-4 h-4 mr-2 text-teal-600" />, text: "Emotional healing support" },
                    { icon: <CheckCircle className="w-4 h-4 mr-2 text-teal-600" />, text: "Progress tracking" },
                    { icon: <CheckCircle className="w-4 h-4 mr-2 text-teal-600" />, text: "Post-program follow-up" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center text-teal-700 text-sm">
                      {feature.icon}
                      {feature.text}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.section 
            className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-50 to-pink-50 rounded-3xl shadow-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold text-teal-900 mb-6">
                Ready to Begin Your Healing Journey?
              </h2>
              <p className="text-xl text-teal-700 mb-8 leading-relaxed">
                Connect with our expert healers for personalized guidance based on your unique constitution
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <LoadingLink href="/consultation">
                  <Button size="lg" className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-3 rounded-full">
                    Book a Consultation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </LoadingLink>
                <LoadingLink href="/programs">
                  <Button variant="outline" size="lg" className="border-teal-600 text-teal-700 hover:bg-teal-50 px-8 py-3 rounded-full">
                    View All Programs
                  </Button>
                </LoadingLink>
              </div>
            </div>
          </motion.section>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-teal-900 mb-4">
                Success Stories
              </h2>
              <p className="text-teal-700">
                See how others with your constitution have transformed their health
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Priya M.",
                  dosha: dominantDosha || "vata",
                  program: "ekaPavana",
                  quote: "The program was perfectly tailored to my Vata nature. I feel grounded and balanced for the first time in years.",
                  image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
                },
                {
                  name: "Rahul S.",
                  dosha: dominantDosha || "pitta",
                  program: "ekaSanskara",
                  quote: "As a Pitta dominant person, I needed help with my intensity. This program transformed my relationship with stress.",
                  image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
                },
                {
                  name: "Anjali K.",
                  dosha: dominantDosha || "kapha",
                  program: "ekaUdaya",
                  quote: "The program gave me the motivation and energy I needed. My Kapha tendencies are now my strengths, not limitations.",
                  image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + (index * 0.1) }}
                >
                  <Card className="border-teal-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-teal-900">{testimonial.name}</h4>
                          <div className="flex items-center">
                            <Badge variant="outline" className="mr-2 text-xs border-teal-200 text-teal-700">
                              {getDoshaName(testimonial.dosha)}
                            </Badge>
                            <Badge variant="secondary" className="text-xs bg-teal-100 text-teal-700">
                              {testimonial.program}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      
                      <p className="text-teal-700 italic">
                        "{testimonial.quote}"
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </LayoutWrapper>
  );
}