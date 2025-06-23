'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Leaf, 
  ArrowRight, 
  User, 
  Heart, 
  Utensils, 
  Activity,
  Moon,
  Sun,
  Droplets,
  Calendar,
  CheckCircle,
  Star,
  Brain,
  Sparkles
} from 'lucide-react';
import { LayoutWrapper } from '@/components/layout-wrapper';
import { LoadingLink } from '@/components/loading-link';
import { motion } from 'framer-motion';
import { DoshaInfoCard } from '@/components/dosha-info-card';

export default function FullResultPage() {
  const [results, setResults] = useState<{vata: number, pitta: number, kapha: number}>({vata: 0, pitta: 0, kapha: 0});
  const [personalData, setPersonalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('diet');
  const [showRecommendations, setShowRecommendations] = useState(false);

  useEffect(() => {
    // Get results from localStorage
    const storedResults = localStorage.getItem('prakritiResults');
    const storedPersonalData = localStorage.getItem('personalData');
    
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
    
    if (storedPersonalData) {
      setPersonalData(JSON.parse(storedPersonalData));
    }
    
    setLoading(false);
    
    // Animate recommendations after a delay
    const timer = setTimeout(() => {
      setShowRecommendations(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const getDominantDosha = () => {
    const max = Math.max(results.vata, results.pitta, results.kapha);
    if (results.vata === max) return 'vata';
    if (results.pitta === max) return 'pitta';
    return 'kapha';
  };

  const getSecondaryDosha = () => {
    const doshas = Object.entries(results).sort((a, b) => b[1] - a[1]);
    return doshas[1][0];
  };

  const getTertiaryDosha = () => {
    const doshas = Object.entries(results).sort((a, b) => b[1] - a[1]);
    return doshas[2][0];
  };

  const isDualDosha = () => {
    const scores = [results.vata, results.pitta, results.kapha];
    scores.sort((a, b) => b - a);
    return scores[0] - scores[1] <= 10;
  };

  const getDoshaInfo = (dosha: string) => {
    const info = {
      vata: {
        name: 'Vata',
        element: 'Air & Space',
        qualities: 'Movement, Creativity, Flexibility',
        description: 'You are naturally creative, energetic, and love variety. You thrive on movement and change.',
        characteristics: [
          'Quick thinking and creative',
          'Enthusiastic and energetic',
          'Loves variety and change',
          'Light sleeper',
          'Irregular appetite'
        ],
        recommendations: {
          diet: ['Warm, cooked foods', 'Regular meal times', 'Sweet, sour, and salty tastes', 'Avoid cold drinks', 'Nourishing soups and stews', 'Healthy oils and fats', 'Warming spices like ginger and cinnamon'],
          lifestyle: ['Regular routine', 'Adequate rest', 'Gentle exercise', 'Stress management', 'Early bedtime', 'Oil massage (abhyanga)', 'Meditation for anxiety'],
          herbs: ['Ashwagandha', 'Brahmi', 'Jatamansi', 'Shankhpushpi', 'Calamus', 'Licorice', 'Shatavari'],
          yoga: ['Gentle, grounding poses', 'Pranayama for calming', 'Meditation', 'Restorative yoga', 'Forward bends', 'Child\'s pose', \'Supported inversions']
        },
        color: 'from-blue-500 to-purple-500',
        icon: <Moon className="w-8 h-8" />
      },
      pitta: {
        name: 'Pitta',
        element: 'Fire & Water',
        qualities: 'Transformation, Intelligence, Leadership',
        description: 'You are naturally focused, ambitious, and have strong digestion. You excel at leadership and goal achievement.',
        characteristics: [
          'Sharp intellect and focus',
          'Natural leadership qualities',
          'Strong digestion',
          'Competitive nature',
          'Organized and efficient'
        ],
        recommendations: {
          diet: ['Cooling foods', 'Sweet, bitter, and astringent tastes', 'Avoid spicy and fried foods', 'Regular meals', 'Fresh fruits and vegetables', 'Moderate dairy', 'Cooling herbs like mint and coriander'],
          lifestyle: ['Moderate exercise', 'Avoid overheating', 'Stress management', 'Work-life balance', 'Cooling activities', 'Moonlight walks', 'Nature time'],
          herbs: ['Amla', 'Aloe Vera', 'Neem', 'Shatavari', 'Coriander', 'Guduchi', 'Sandalwood'],
          yoga: ['Cooling pranayama', 'Moon salutations', 'Gentle backbends', 'Meditation', 'Forward folds', 'Twists', 'Supported shoulder stand']
        },
        color: 'from-red-500 to-orange-500',
        icon: <Sun className="w-8 h-8" />
      },
      kapha: {
        name: 'Kapha',
        element: 'Earth & Water',
        qualities: 'Stability, Strength, Compassion',
        description: 'You are naturally calm, stable, and have strong immunity. You provide grounding and support to others.',
        characteristics: [
          'Calm and stable nature',
          'Strong immunity',
          'Loyal and compassionate',
          'Steady energy',
          'Good long-term memory'
        ],
        recommendations: {
          diet: ['Light, warm foods', 'Pungent, bitter, and astringent tastes', 'Avoid heavy, oily foods', 'Smaller portions', 'Spicy foods in moderation', 'Honey as sweetener', 'Warming spices like black pepper'],
          lifestyle: ['Regular vigorous exercise', 'Variety in routine', 'Early rising', 'Social activities', 'New challenges', 'Dry brushing', 'Stimulating environments'],
          herbs: ['Ginger', 'Turmeric', 'Trikatu', 'Guggulu', 'Black pepper', 'Pippali', 'Cardamom'],
          yoga: ['Energizing poses', 'Sun salutations', 'Backbends', 'Vigorous practice', 'Kapalabhati breathing', 'Standing poses', 'Arm balances']
        },
        color: 'from-green-500 to-teal-500',
        icon: <Leaf className="w-8 h-8" />
      }
    };
    return info[dosha as keyof typeof info];
  };

  if (loading) {
    return (
      <LayoutWrapper>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-teal-700">Loading your complete analysis...</p>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  const dominantDosha = getDominantDosha();
  const secondaryDosha = getSecondaryDosha();
  const tertiaryDosha = getTertiaryDosha();
  const dominantDoshaInfo = getDoshaInfo(dominantDosha);
  const secondaryDoshaInfo = getDoshaInfo(secondaryDosha);
  const tertiaryDoshaInfo = getDoshaInfo(tertiaryDosha);

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-serif font-bold text-teal-900 mb-4">
              Your Complete Prakriti Analysis
            </h1>
            <p className="text-xl text-teal-700">
              Deep insights into your unique constitution and personalized healing path
            </p>
          </motion.div>

          {/* Constitution Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-teal-200 shadow-xl bg-white/80 backdrop-blur-sm mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-serif text-teal-900">
                  Your Constitution: {dominantDoshaInfo.name}
                  {isDualDosha() && <span className="text-xl text-pink-600 block">with {secondaryDoshaInfo.name} influence</span>}
                </CardTitle>
                <CardDescription className="text-lg text-teal-600">
                  {dominantDoshaInfo.element} • {dominantDoshaInfo.qualities}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Dosha Percentages */}
                <div className="grid md:grid-cols-3 gap-6">
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white">
                      <Moon className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-teal-900">Vata</h3>
                    <div className="text-2xl font-bold text-blue-600">{results.vata}%</div>
                    <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden mt-2">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${results.vata}%` }}
                        transition={{ duration: 1, delay: 0.4 }}
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white">
                      <Sun className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-teal-900">Pitta</h3>
                    <div className="text-2xl font-bold text-red-600">{results.pitta}%</div>
                    <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden mt-2">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${results.pitta}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white">
                      <Leaf className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-teal-900">Kapha</h3>
                    <div className="text-2xl font-bold text-green-600">{results.kapha}%</div>
                    <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden mt-2">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${results.kapha}%` }}
                        transition={{ duration: 1, delay: 0.6 }}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Constitution Description */}
                <motion.div 
                  className={`p-6 rounded-2xl bg-gradient-to-r ${dominantDoshaInfo.color} text-white`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <div className="flex items-center mb-4">
                    {dominantDoshaInfo.icon}
                    <h3 className="text-2xl font-bold ml-3">{dominantDoshaInfo.name} Constitution</h3>
                  </div>
                  <p className="text-lg mb-4">{dominantDoshaInfo.description}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Key Characteristics:</h4>
                      <ul className="text-sm space-y-1 opacity-90">
                        {dominantDoshaInfo.characteristics.map((char, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{char}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {isDualDosha() && (
                      <div>
                        <h4 className="font-semibold mb-2">{secondaryDoshaInfo.name} Influence:</h4>
                        <p className="text-sm opacity-90">
                          Your secondary {secondaryDoshaInfo.name} nature adds {secondaryDoshaInfo.qualities.toLowerCase()} to your constitution.
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Dosha Breakdown Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="grid md:grid-cols-3 gap-6 mb-8"
          >
            <DoshaInfoCard 
              dosha="vata"
              percentage={results.vata}
              rank={dominantDosha === 'vata' ? 'primary' : secondaryDosha === 'vata' ? 'secondary' : 'tertiary'}
            />
            <DoshaInfoCard 
              dosha="pitta"
              percentage={results.pitta}
              rank={dominantDosha === 'pitta' ? 'primary' : secondaryDosha === 'pitta' ? 'secondary' : 'tertiary'}
            />
            <DoshaInfoCard 
              dosha="kapha"
              percentage={results.kapha}
              rank={dominantDosha === 'kapha' ? 'primary' : secondaryDosha === 'kapha' ? 'secondary' : 'tertiary'}
            />
          </motion.div>

          {/* Detailed Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showRecommendations ? 1 : 0, y: showRecommendations ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card className="border-teal-200 shadow-xl bg-white/80 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-teal-900">Personalized Recommendations</CardTitle>
                <CardDescription className="text-teal-600">
                  Tailored guidance for your {dominantDoshaInfo.name} constitution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-8">
                    <TabsTrigger value="diet" className="flex items-center">
                      <Utensils className="w-4 h-4 mr-2" />
                      Diet
                    </TabsTrigger>
                    <TabsTrigger value="lifestyle" className="flex items-center">
                      <Activity className="w-4 h-4 mr-2" />
                      Lifestyle
                    </TabsTrigger>
                    <TabsTrigger value="herbs" className="flex items-center">
                      <Leaf className="w-4 h-4 mr-2" />
                      Herbs
                    </TabsTrigger>
                    <TabsTrigger value="yoga" className="flex items-center">
                      <Heart className="w-4 h-4 mr-2" />
                      Yoga
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="bg-gradient-to-r from-teal-50 to-pink-50 p-6 rounded-xl">
                    <TabsContent value="diet" className="space-y-4 mt-0">
                      <div className="flex items-center mb-4">
                        <Utensils className="w-6 h-6 text-teal-600 mr-3" />
                        <h3 className="text-xl font-semibold text-teal-900">Dietary Guidelines</h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-medium text-teal-800 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            Recommended Foods
                          </h4>
                          <ul className="space-y-2">
                            {dominantDoshaInfo.recommendations.diet.slice(0, 4).map((item, index) => (
                              <motion.li 
                                key={index} 
                                className="flex items-center text-teal-700 bg-white/70 p-3 rounded-lg shadow-sm"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * index }}
                              >
                                <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-medium text-teal-800 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            Additional Recommendations
                          </h4>
                          <ul className="space-y-2">
                            {dominantDoshaInfo.recommendations.diet.slice(4).map((item, index) => (
                              <motion.li 
                                key={index} 
                                className="flex items-center text-teal-700 bg-white/70 p-3 rounded-lg shadow-sm"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * (index + 4) }}
                              >
                                <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="lifestyle" className="space-y-4 mt-0">
                      <div className="flex items-center mb-4">
                        <Activity className="w-6 h-6 text-teal-600 mr-3" />
                        <h3 className="text-xl font-semibold text-teal-900">Lifestyle Practices</h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-medium text-teal-800 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            Daily Practices
                          </h4>
                          <ul className="space-y-2">
                            {dominantDoshaInfo.recommendations.lifestyle.slice(0, 4).map((item, index) => (
                              <motion.li 
                                key={index} 
                                className="flex items-center text-teal-700 bg-white/70 p-3 rounded-lg shadow-sm"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * index }}
                              >
                                <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-medium text-teal-800 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            Additional Recommendations
                          </h4>
                          <ul className="space-y-2">
                            {dominantDoshaInfo.recommendations.lifestyle.slice(4).map((item, index) => (
                              <motion.li 
                                key={index} 
                                className="flex items-center text-teal-700 bg-white/70 p-3 rounded-lg shadow-sm"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * (index + 4) }}
                              >
                                <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="herbs" className="space-y-4 mt-0">
                      <div className="flex items-center mb-4">
                        <Leaf className="w-6 h-6 text-teal-600 mr-3" />
                        <h3 className="text-xl font-semibold text-teal-900">Beneficial Herbs</h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-medium text-teal-800 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            Primary Herbs
                          </h4>
                          <ul className="space-y-2">
                            {dominantDoshaInfo.recommendations.herbs.slice(0, 4).map((item, index) => (
                              <motion.li 
                                key={index} 
                                className="flex items-center text-teal-700 bg-white/70 p-3 rounded-lg shadow-sm"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * index }}
                              >
                                <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-medium text-teal-800 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            Supporting Herbs
                          </h4>
                          <ul className="space-y-2">
                            {dominantDoshaInfo.recommendations.herbs.slice(4).map((item, index) => (
                              <motion.li 
                                key={index} 
                                className="flex items-center text-teal-700 bg-white/70 p-3 rounded-lg shadow-sm"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * (index + 4) }}
                              >
                                <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="yoga" className="space-y-4 mt-0">
                      <div className="flex items-center mb-4">
                        <Heart className="w-6 h-6 text-teal-600 mr-3" />
                        <h3 className="text-xl font-semibold text-teal-900">Yoga & Movement</h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-medium text-teal-800 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            Recommended Practices
                          </h4>
                          <ul className="space-y-2">
                            {dominantDoshaInfo.recommendations.yoga.slice(0, 4).map((item, index) => (
                              <motion.li 
                                key={index} 
                                className="flex items-center text-teal-700 bg-white/70 p-3 rounded-lg shadow-sm"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * index }}
                              >
                                <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-medium text-teal-800 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            Additional Practices
                          </h4>
                          <ul className="space-y-2">
                            {dominantDoshaInfo.recommendations.yoga.slice(4).map((item, index) => (
                              <motion.li 
                                key={index} 
                                className="flex items-center text-teal-700 bg-white/70 p-3 rounded-lg shadow-sm"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * (index + 4) }}
                              >
                                <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Card className="border-teal-200 shadow-xl bg-gradient-to-r from-teal-50 to-pink-50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-teal-900">Ready for Your Healing Journey?</CardTitle>
                <CardDescription className="text-teal-700">
                  Now that you understand your constitution, let's select your start date and begin your transformation
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <LoadingLink href="/booking/start-date">
                    <Button size="lg" className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-3 rounded-full">
                      <Calendar className="w-5 h-5 mr-2" />
                      Select Start Date
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </LoadingLink>
                  <LoadingLink href="/quiz/suggested-programs">
                    <Button variant="outline" size="lg" className="border-teal-600 text-teal-700 hover:bg-teal-50 px-8 py-3 rounded-full">
                      View Suggested Programs
                    </Button>
                  </LoadingLink>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </LayoutWrapper>
  );
}