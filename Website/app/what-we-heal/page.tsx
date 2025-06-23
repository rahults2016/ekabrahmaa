'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Leaf, 
  Heart, 
  Brain, 
  Utensils, 
  Activity, 
  Users, 
  ArrowRight, 
  CheckCircle,
  Star,
  Play,
  Calendar,
  MessageCircle,
  Sparkles,
  Target,
  Shield,
  Zap,
  Moon,
  Sun,
  Droplets
} from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const healthConditions = {
  womensHealth: {
    title: "Women's Health",
    icon: <Heart className="w-8 h-8" />,
    color: 'from-pink-500 to-rose-500',
    perspective: "Ayurveda views women's health through the lens of natural cycles and hormonal harmony. We address the root imbalances that manifest as reproductive challenges.",
    conditions: [
      { name: 'PCOS/PCOD', description: 'Polycystic ovarian syndrome treated through dosha balancing' },
      { name: 'Menstrual Disorders', description: 'Irregular cycles, painful periods, and hormonal imbalances' },
      { name: 'Fertility Support', description: 'Natural conception support and reproductive wellness' },
      { name: 'Menopause Management', description: 'Smooth transition through natural hormonal changes' },
      { name: 'Endometriosis', description: 'Managing inflammation and pain naturally' }
    ],
    image: 'https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  digestiveHealth: {
    title: "Digestive & Metabolic Health",
    icon: <Utensils className="w-8 h-8" />,
    color: 'from-orange-500 to-red-500',
    perspective: "In Ayurveda, digestion is the cornerstone of health. We strengthen your digestive fire (Agni) to transform food into nourishment rather than toxins.",
    conditions: [
      { name: 'IBS & IBD', description: 'Irritable bowel syndrome and inflammatory bowel conditions' },
      { name: 'Acid Reflux/GERD', description: 'Chronic heartburn and digestive inflammation' },
      { name: 'Chronic Bloating', description: 'Gas, distension, and digestive discomfort' },
      { name: 'Weight Management', description: 'Sustainable weight balance through metabolic healing' },
      { name: 'Food Sensitivities', description: 'Identifying and healing digestive triggers' }
    ],
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  mentalWellness: {
    title: "Mental & Emotional Wellness",
    icon: <Brain className="w-8 h-8" />,
    color: 'from-purple-500 to-indigo-500',
    perspective: "Mental health is inseparable from physical health in Ayurveda. We address the mind-body connection to restore emotional balance and mental clarity.",
    conditions: [
      { name: 'Anxiety Disorders', description: 'Chronic worry, panic attacks, and nervous system imbalance' },
      { name: 'Depression', description: 'Low mood, lack of motivation, and emotional heaviness' },
      { name: 'Sleep Disorders', description: 'Insomnia, restless sleep, and sleep quality issues' },
      { name: 'Stress Management', description: 'Chronic stress and burnout recovery' },
      { name: 'ADHD Support', description: 'Attention and focus challenges through natural methods' }
    ],
    image: 'https://images.pexels.com/photos/3759079/pexels-photo-3759079.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  hormonalBalance: {
    title: "Hormonal Balance",
    icon: <Activity className="w-8 h-8" />,
    color: 'from-teal-500 to-cyan-500',
    perspective: "Hormones are the body's messengers. We restore their natural rhythm through constitutional balancing and lifestyle harmony.",
    conditions: [
      { name: 'Thyroid Disorders', description: 'Hypo/hyperthyroidism and thyroid imbalances' },
      { name: 'Diabetes Type 2', description: 'Blood sugar regulation and insulin sensitivity' },
      { name: 'Metabolic Syndrome', description: 'Comprehensive metabolic dysfunction' },
      { name: 'Adrenal Fatigue', description: 'Chronic fatigue and stress hormone imbalance' },
      { name: 'Insulin Resistance', description: 'Pre-diabetes and metabolic dysfunction' }
    ],
    image: 'https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  lifestyleConditions: {
    title: "Lifestyle-Related Conditions",
    icon: <Zap className="w-8 h-8" />,
    color: 'from-green-500 to-teal-500',
    perspective: "Modern lifestyle creates unique imbalances. We address these through ancient wisdom adapted for contemporary living.",
    conditions: [
      { name: 'Hypertension', description: 'High blood pressure through natural regulation' },
      { name: 'Obesity', description: 'Sustainable weight loss and metabolic healing' },
      { name: 'Skin Conditions', description: 'Eczema, psoriasis, acne, and inflammatory skin issues' },
      { name: 'Chronic Fatigue', description: 'Energy depletion and vitality restoration' },
      { name: 'Autoimmune Support', description: 'Supporting immune system balance naturally' }
    ],
    image: 'https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
};

const healingApproach = [
  {
    title: 'Ayurveda Doctor',
    description: 'Diagnoses your constitution and root cause imbalances',
    icon: <Leaf className="w-6 h-6" />,
    color: 'from-green-500 to-teal-500'
  },
  {
    title: 'Nutritionist',
    description: 'Creates anti-inflammatory, constitution-based meal plans',
    icon: <Utensils className="w-6 h-6" />,
    color: 'from-orange-500 to-red-500'
  },
  {
    title: 'Yoga Therapist',
    description: 'Guides breath work and movement for energetic balance',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Functional Trainer',
    description: 'Restores physical vitality and strength',
    icon: <Activity className="w-6 h-6" />,
    color: 'from-blue-500 to-indigo-500'
  },
  {
    title: 'Psychologist',
    description: 'Supports emotional healing and mindset transformation',
    icon: <Brain className="w-6 h-6" />,
    color: 'from-teal-500 to-cyan-500'
  }
];

const successStories = [
  {
    name: 'Priya Sharma',
    age: 32,
    condition: 'PCOS & Weight Management',
    location: 'Mumbai',
    program: 'ekaSanskara - 14 Days',
    beforeAfter: {
      before: 'Irregular periods for 3 years, 15kg weight gain, constant fatigue',
      after: 'Regular cycles, 12kg weight loss, energy levels restored'
    },
    testimonial: "I had tried everything for my PCOS - medications, diets, gym routines. Nothing worked long-term. ekaBrahmaa's approach was different. They didn't just treat my symptoms; they helped me understand my body's unique needs. The 5-healer team worked together seamlessly. My Ayurveda doctor identified my Kapha imbalance, the nutritionist created meals I actually enjoyed, and the yoga therapist taught me practices that regulated my hormones naturally. In 14 days, I felt like a different person.",
    results: ['Regular menstrual cycles', '12kg sustainable weight loss', 'Improved insulin sensitivity', 'Better sleep quality', 'Increased energy levels'],
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 5,
    videoThumbnail: 'https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Rajesh Kumar',
    age: 45,
    condition: 'Type 2 Diabetes & Hypertension',
    location: 'Delhi',
    program: 'ekaUdaya - 28 Days',
    beforeAfter: {
      before: 'HbA1c: 9.2%, BP: 160/100, on multiple medications',
      after: 'HbA1c: 6.8%, BP: 130/85, reduced medication by 50%'
    },
    testimonial: "As a businessman, I thought I had no time for health. My diabetes was getting worse despite medications. The ekaBrahmaa team showed me how to integrate healing into my busy schedule. The functional trainer designed workouts I could do in my office, the nutritionist created meal plans that worked with my travel schedule, and the psychologist helped me manage work stress. The results speak for themselves.",
    results: ['HbA1c reduced from 9.2% to 6.8%', 'Blood pressure normalized', '50% reduction in medications', 'Lost 18kg sustainably', 'Improved work-life balance'],
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 5,
    videoThumbnail: 'https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Anita Patel',
    age: 28,
    condition: 'Anxiety & Digestive Issues',
    location: 'Bangalore',
    program: 'ekaSamanvaya - 21 Days',
    beforeAfter: {
      before: 'Daily panic attacks, chronic bloating, unable to work',
      after: 'Anxiety-free, perfect digestion, returned to full-time work'
    },
    testimonial: "My anxiety was so severe I couldn't leave my house. The digestive issues made everything worse. Traditional therapy and medications weren't helping. ekaBrahmaa's integrated approach was a revelation. The Ayurveda doctor explained how my Vata imbalance was causing both issues. The yoga therapist taught me breathing techniques that stopped panic attacks instantly. The nutritionist healed my gut, which dramatically improved my mental state. I got my life back.",
    results: ['Zero panic attacks', 'Complete digestive healing', 'Returned to work full-time', 'Improved relationships', 'Natural sleep patterns'],
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 5,
    videoThumbnail: 'https://images.pexels.com/photos/3759079/pexels-photo-3759079.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export default function WhatWeHealPage() {
  const [activeCategory, setActiveCategory] = useState('womensHealth');
  const [selectedStory, setSelectedStory] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-50 via-white to-pink-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-3 h-3 bg-teal-300 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-40 right-20 w-2 h-2 bg-pink-300 rounded-full animate-pulse opacity-40"></div>
          <div className="absolute bottom-32 left-20 w-4 h-4 bg-teal-400 rounded-full animate-pulse opacity-50"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-teal-900 mb-6 leading-tight">
                Healing Through Ancient Wisdom: Your Journey to Wholeness
              </h1>
              <p className="text-xl text-teal-700 mb-8 leading-relaxed">
                Ayurveda sees every symptom as a story. We address the root cause, not just the label.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-4 rounded-full">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Free Consultation
                </Button>
                <Link href="/quiz">
                  <Button variant="outline" size="lg" className="border-2 border-teal-600 text-teal-700 hover:bg-teal-50 px-8 py-4 rounded-full">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Take Dosha Assessment
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-teal-100 to-pink-100 rounded-3xl shadow-2xl overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/6663467/pexels-photo-6663467.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Holistic healing through Ayurveda"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-teal-900 mb-6">
              What We Heal
            </h2>
            <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
              Our holistic approach addresses the root causes of health conditions across all aspects of your well-being
            </p>
          </div>

          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-12 bg-white/50 p-2 rounded-2xl border border-teal-100">
              {Object.entries(healthConditions).map(([key, category]) => (
                <TabsTrigger 
                  key={key} 
                  value={key}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-teal-700 data-[state=active]:text-white rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5">
                      {category.icon}
                    </div>
                    <span className="hidden sm:inline">{category.title}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(healthConditions).map(([key, category]) => (
              <TabsContent key={key} value={key} className="mt-0">
                <Card className="border-teal-100 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="relative h-64 lg:h-auto">
                      <img 
                        src={category.image} 
                        alt={category.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 to-transparent"></div>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-full grid place-items-center text-white`}>
                          {category.icon}
                        </div>
                        <h3 className="text-3xl font-serif font-bold text-teal-900">
                          {category.title}
                        </h3>
                      </div>
                      
                      <p className="text-teal-700 leading-relaxed mb-6 text-lg">
                        {category.perspective}
                      </p>
                      
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-teal-800">Conditions We Treat:</h4>
                        <div className="grid gap-3">
                          {category.conditions.map((condition, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-teal-50 to-pink-50 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h5 className="font-medium text-teal-800">{condition.name}</h5>
                                <p className="text-sm text-teal-700">{condition.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full">
                          Learn More About Treatment
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Our Healing Approach */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-teal-900 mb-6">
              Our 5-Healer Integration Model
            </h2>
            <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
              Unlike traditional healthcare that treats symptoms in isolation, our integrated team addresses your whole being
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {healingApproach.map((healer, index) => (
              <Card key={index} className="border-teal-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm text-center group transform hover:scale-105">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${healer.color} rounded-full mx-auto mb-4 grid place-items-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {healer.icon}
                  </div>
                  <h3 className="text-lg font-bold text-teal-900 mb-3">
                    {healer.title}
                  </h3>
                  <p className="text-sm text-teal-700 leading-relaxed">
                    {healer.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-pink-600 text-white rounded-full shadow-lg">
              <Users className="w-5 h-5 mr-2" />
              <span className="font-medium">All 5 healers collaborate on your personalized treatment plan</span>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-teal-900 mb-6">
              Real Healing Stories
            </h2>
            <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
              See how our integrated approach has transformed lives and restored health
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {successStories.map((story, index) => (
              <Card 
                key={index} 
                className={`border-2 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  selectedStory === index 
                    ? 'border-teal-500 shadow-xl scale-105' 
                    : 'border-teal-100 shadow-lg hover:border-teal-300'
                } bg-white/80 backdrop-blur-sm`}
                onClick={() => setSelectedStory(index)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img 
                        src={story.image} 
                        alt={story.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-teal-900">{story.name}</h3>
                      <p className="text-sm text-teal-600">{story.age} years • {story.location}</p>
                      <Badge variant="secondary" className="mt-1 bg-teal-50 text-teal-700 text-xs">
                        {story.condition}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-teal-500 text-teal-500" />
                    ))}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 p-3 rounded-lg">
                      <h4 className="text-sm font-semibold text-red-800 mb-1">Before:</h4>
                      <p className="text-sm text-red-700">{story.beforeAfter.before}</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-teal-50 p-3 rounded-lg">
                      <h4 className="text-sm font-semibold text-green-800 mb-1">After:</h4>
                      <p className="text-sm text-green-700">{story.beforeAfter.after}</p>
                    </div>
                    
                    <Badge variant="outline" className="border-teal-200 text-teal-700">
                      {story.program}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Story View */}
          <Card className="border-teal-200 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                      <img 
                        src={successStories[selectedStory].image} 
                        alt={successStories[selectedStory].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-teal-900">{successStories[selectedStory].name}</h3>
                      <p className="text-teal-600">{successStories[selectedStory].condition}</p>
                      <p className="text-sm text-teal-500">{successStories[selectedStory].program}</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-teal-700 leading-relaxed italic text-lg mb-6 border-l-4 border-teal-200 pl-4">
                    "{successStories[selectedStory].testimonial}"
                  </blockquote>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-teal-800">Key Results:</h4>
                    {successStories[selectedStory].results.map((result, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-teal-700 text-sm">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="relative h-64 bg-gradient-to-br from-teal-100 to-pink-100 rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={successStories[selectedStory].videoThumbnail} 
                      alt="Video testimonial"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 grid place-items-center">
                      <Button size="lg" className="bg-white/90 hover:bg-white text-teal-700 rounded-full">
                        <Play className="w-6 h-6 mr-2" />
                        Watch Full Story
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Not Sure Where to Start */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-50 to-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-teal-900 mb-6">
            Not Sure Where to Start?
          </h2>
          <p className="text-xl text-teal-700 mb-12 leading-relaxed">
            We understand that every healing journey is unique. Let us guide you to the right path.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-teal-200 shadow-lg bg-white/80 backdrop-blur-sm text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full mx-auto mb-4 grid place-items-center text-white">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-teal-900 mb-3">Take Our Quiz</h3>
                <p className="text-teal-700 text-sm mb-4">Discover your constitution and get personalized recommendations</p>
                <Link href="/quiz">
                  <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full">
                    Start Quiz
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border-teal-200 shadow-lg bg-white/80 backdrop-blur-sm text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full mx-auto mb-4 grid place-items-center text-white">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-teal-900 mb-3">Free Consultation</h3>
                <p className="text-teal-700 text-sm mb-4">Speak with our Ayurveda doctor about your specific concerns</p>
                <Link href="/consultation">
                  <Button className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white rounded-full">
                    Book Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border-teal-200 shadow-lg bg-white/80 backdrop-blur-sm text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mx-auto mb-4 grid place-items-center text-white">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-teal-900 mb-3">Browse Programs</h3>
                <p className="text-teal-700 text-sm mb-4">Explore our healing programs designed for different needs</p>
                <Link href="/programs">
                  <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-full">
                    View Programs
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <p className="text-teal-600 mb-6">
              Still have questions? Our support team is here to help.
            </p>
            <Button variant="outline" size="lg" className="border-2 border-teal-600 text-teal-700 hover:bg-teal-50 px-8 py-3 rounded-full">
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat with Support
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}