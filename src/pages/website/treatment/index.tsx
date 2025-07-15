import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  Leaf, 
  Utensils, 
  Brain, 
  Activity, 
  Heart,
  Calendar,
  Clock,
  Users,
  Star,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Treatment approaches for different conditions
const treatmentApproaches = [
  {
    id: 'digestive',
    title: 'Digestive Health',
    description: 'Our approach to digestive health focuses on strengthening Agni (digestive fire) and removing Ama (toxins) through personalized nutrition, herbal support, and mindful eating practices.',
    icon: <Utensils className="w-6 h-6" />,
    color: 'from-orange-500 to-red-500',
    keyPrinciples: [
      'Balancing digestive fire (Agni)',
      'Removing digestive toxins (Ama)',
      'Healing the gut lining',
      'Restoring healthy gut flora',
      'Establishing proper eating habits'
    ],
    treatments: [
      'Dosha-specific dietary adjustments',
      'Digestive herbal formulations',
      'Abdominal massage techniques',
      'Specific yoga postures for digestion',
      'Mindful eating practices'
    ],
    timeline: '14-28 days for significant improvement',
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'hormonal',
    title: 'Hormonal Balance',
    description: 'We address hormonal imbalances by regulating the endocrine system through targeted herbs, nutrition, stress management, and lifestyle optimization.',
    icon: <Activity className="w-6 h-6" />,
    color: 'from-pink-500 to-purple-500',
    keyPrinciples: [
      'Balancing the endocrine system',
      'Supporting liver detoxification',
      'Reducing endocrine disruptors',
      'Managing stress response',
      'Optimizing sleep cycles'
    ],
    treatments: [
      'Hormone-balancing herbs',
      'Anti-inflammatory nutrition',
      'Specific yoga sequences',
      'Stress reduction techniques',
      'Circadian rhythm optimization'
    ],
    timeline: '3-6 months for hormonal regulation',
    image: 'https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'mental',
    title: 'Mental Wellness',
    description: 'Our mental health approach integrates psychological support with physical practices, addressing the mind-body connection through meditation, breathwork, and nervous system regulation.',
    icon: <Brain className="w-6 h-6" />,
    color: 'from-blue-500 to-indigo-500',
    keyPrinciples: [
      'Balancing mind-body connection',
      'Regulating the nervous system',
      'Processing emotional patterns',
      'Building mental resilience',
      'Cultivating present-moment awareness'
    ],
    treatments: [
      'Personalized meditation practices',
      'Specific pranayama techniques',
      'Cognitive reframing exercises',
      'Nervous system regulation',
      'Mind-calming herbal support'
    ],
    timeline: '21-45 days for significant improvement',
    image: 'https://images.pexels.com/photos/3759079/pexels-photo-3759079.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'skin',
    title: 'Skin Health',
    description: 'We treat skin conditions by addressing internal imbalances, particularly in digestion and detoxification pathways, combined with external therapies for comprehensive healing.',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-teal-500 to-green-500',
    keyPrinciples: [
      'Addressing internal root causes',
      'Supporting detoxification pathways',
      'Reducing inflammation',
      'Balancing microbiome',
      'Nourishing skin tissues'
    ],
    treatments: [
      'Gut-skin connection protocols',
      'Liver-supporting herbs',
      'Anti-inflammatory nutrition',
      'Topical herbal applications',
      'Stress reduction practices'
    ],
    timeline: '1-3 months for visible improvement',
    image: 'https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

// Treatment phases common across conditions
const treatmentPhases = [
  {
    title: 'Assessment',
    description: 'Comprehensive evaluation of your constitution, current imbalances, and specific health concerns.',
    duration: '1-2 weeks',
    activities: [
      'Initial consultation with all five healers',
      'Prakriti (constitution) assessment',
      'Current imbalance analysis',
      'Health history review',
      'Baseline measurements'
    ],
    icon: <Leaf className="w-6 h-6" />,
    color: 'from-green-500 to-teal-500'
  },
  {
    title: 'Purification',
    description: 'Gentle detoxification to remove accumulated toxins and prepare the body for deeper healing.',
    duration: '1-3 weeks',
    activities: [
      'Digestive reset protocol',
      'Elimination of inflammatory triggers',
      'Gentle cleansing practices',
      'Detoxification support',
      'Preparation for deeper healing'
    ],
    icon: <Utensils className="w-6 h-6" />,
    color: 'from-blue-500 to-purple-500'
  },
  {
    title: 'Rejuvenation',
    description: 'Rebuilding strength and vitality through nourishing practices and targeted support.',
    duration: '2-4 weeks',
    activities: [
      'Tissue-building nutrition',
      'Strengthening herbs and formulations',
      'Energy-building practices',
      'Restorative movement',
      'Deep nourishment'
    ],
    icon: <Heart className="w-6 h-6" />,
    color: 'from-pink-500 to-red-500'
  },
  {
    title: 'Maintenance',
    description: 'Establishing sustainable daily practices to maintain balance and prevent recurrence.',
    duration: 'Ongoing',
    activities: [
      'Daily routine establishment',
      'Seasonal adjustments',
      'Preventative practices',
      'Self-monitoring tools',
      'Regular check-ins'
    ],
    icon: <Activity className="w-6 h-6" />,
    color: 'from-yellow-500 to-orange-500'
  }
];

export default function TreatmentPage() {
  const [selectedApproach, setSelectedApproach] = useState('digestive');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const currentApproach = treatmentApproaches.find(approach => approach.id === selectedApproach);

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
              <span className="text-teal-700 font-medium">Our Treatment Methodology</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-800 via-purple-800 to-pink-700 mb-6 leading-tight">
              Holistic Healing Approach
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Our comprehensive treatment methodology addresses the root causes of health conditions through personalized, integrated care
            </p>
          </div>
        </div>
      </section>

      {/* Treatment Approaches Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
              Condition-Specific Approaches
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              While each healing journey is unique, we've developed specialized approaches for common health concerns
            </p>
          </div>

          {/* Approach Selection */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {treatmentApproaches.map((approach) => (
              <button
                key={approach.id}
                onClick={() => setSelectedApproach(approach.id)}
                className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedApproach === approach.id
                    ? `bg-gradient-to-r ${approach.color} text-white shadow-lg`
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white shadow-md hover:shadow-lg'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {approach.icon}
                  <span>{approach.title}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Approach Details */}
          {currentApproach && (
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image Side */}
                <div className="relative h-80 lg:h-auto overflow-hidden">
                  <img
                    src={currentApproach.image}
                    alt={currentApproach.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${currentApproach.color} flex items-center justify-center text-white shadow-lg mb-3`}>
                      {currentApproach.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{currentApproach.title}</h3>
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-8 lg:p-12">
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                    {currentApproach.description}
                  </p>

                  <Tabs defaultValue="principles" className="mb-8">
                    <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl p-1">
                      <TabsTrigger 
                        value="principles" 
                        className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                      >
                        Key Principles
                      </TabsTrigger>
                      <TabsTrigger 
                        value="treatments" 
                        className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                      >
                        Treatments
                      </TabsTrigger>
                      <TabsTrigger 
                        value="timeline" 
                        className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                      >
                        Timeline
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="principles" className="mt-6">
                      <div className="space-y-3">
                        {currentApproach.keyPrinciples.map((principle, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gradient-to-r from-teal-50 to-pink-50">
                            <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{principle}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="treatments" className="mt-6">
                      <div className="space-y-3">
                        {currentApproach.treatments.map((treatment, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gradient-to-r from-teal-50 to-pink-50">
                            <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{treatment}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="timeline" className="mt-6">
                      <div className="p-6 bg-gradient-to-r from-teal-50 to-pink-50 rounded-xl">
                        <div className="flex items-center space-x-3 mb-4">
                          <Clock className="w-6 h-6 text-teal-600" />
                          <h4 className="text-lg font-semibold text-gray-800">Expected Timeline</h4>
                        </div>
                        <p className="text-gray-700 mb-4">{currentApproach.timeline}</p>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span>Initial improvements: 7-14 days</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span>Significant changes: 1-2 months</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                            <span>Long-term healing: 3-6 months</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/quiz">
                      <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-xl">
                        <Sparkles className="w-5 h-5 mr-2" />
                        Take Dosha Quiz
                      </Button>
                    </Link>
                    <Link to="/consultation">
                      <Button variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50 rounded-xl">
                        <Calendar className="w-5 h-5 mr-2" />
                        Book Consultation
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* Treatment Phases Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
              Our Treatment Phases
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Every healing journey follows these four essential phases, customized to your unique needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {treatmentPhases.map((phase, index) => (
              <Card 
                key={index}
                className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${phase.color} rounded-full flex items-center justify-center text-white mb-6`}>
                    {phase.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {phase.title}
                  </h3>
                  
                  <Badge className="mb-4 bg-gray-100 text-gray-700">
                    {phase.duration}
                  </Badge>
                  
                  <p className="text-gray-600 mb-6">
                    {phase.description}
                  </p>
                  
                  <div className="space-y-2">
                    {phase.activities.map((activity, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{activity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Five Healers Integration Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
              The Five Healers Integration
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              What makes our approach unique is how our five expert healers collaborate on your treatment
            </p>
          </div>

          <Card className="border-0 shadow-2xl bg-gradient-to-r from-teal-900 to-purple-900 text-white overflow-hidden">
            <CardContent className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-8">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-serif font-bold mb-6">
                    Collaborative Healing Approach
                  </h3>
                  
                  <p className="text-white/90 leading-relaxed mb-8">
                    Unlike conventional healthcare where specialists work in isolation, our five healers—Ayurvedic doctor, nutritionist, yoga therapist, functional trainer, and psychologist—collaborate closely on your case. This integration ensures all aspects of your health are addressed simultaneously, creating a synergistic effect that accelerates healing.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-teal-300 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white">Weekly Team Meetings</h4>
                        <p className="text-white/80 text-sm">Your healers meet regularly to discuss your progress and refine your protocol</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-teal-300 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white">Unified Treatment Plan</h4>
                        <p className="text-white/80 text-sm">A single, coherent protocol rather than fragmented recommendations</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-teal-300 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white">Continuous Communication</h4>
                        <p className="text-white/80 text-sm">Real-time updates between healers as your journey progresses</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { title: 'Ayurvedic Doctor', icon: <Leaf className="w-8 h-8" />, color: 'bg-green-500' },
                    { title: 'Nutritionist', icon: <Utensils className="w-8 h-8" />, color: 'bg-orange-500' },
                    { title: 'Yoga Therapist', icon: <Activity className="w-8 h-8" />, color: 'bg-blue-500' },
                    { title: 'Functional Trainer', icon: <Heart className="w-8 h-8" />, color: 'bg-red-500' },
                    { title: 'Psychologist', icon: <Brain className="w-8 h-8" />, color: 'bg-purple-500' }
                  ].map((healer, index) => (
                    <div 
                      key={index}
                      className={`${index === 4 ? 'col-span-2' : ''} bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105`}
                    >
                      <div className={`w-12 h-12 ${healer.color} rounded-full flex items-center justify-center mb-4`}>
                        {healer.icon}
                      </div>
                      <h4 className="font-semibold">{healer.title}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
              Our Success Metrics
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Measurable results that demonstrate the effectiveness of our approach
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Client Satisfaction', value: '98%', icon: <Star className="w-8 h-8" />, color: 'from-yellow-500 to-amber-500' },
              { label: 'Symptom Improvement', value: '92%', icon: <Heart className="w-8 h-8" />, color: 'from-red-500 to-pink-500' },
              { label: 'Lifestyle Integration', value: '87%', icon: <Activity className="w-8 h-8" />, color: 'from-blue-500 to-indigo-500' },
              { label: 'Long-term Results', value: '94%', icon: <CheckCircle className="w-8 h-8" />, color: 'from-green-500 to-teal-500' }
            ].map((metric, index) => (
              <Card 
                key={index}
                className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 text-center"
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${metric.color} rounded-full flex items-center justify-center text-white mx-auto mb-6`}>
                    {metric.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{metric.value}</div>
                  <div className="text-gray-600">{metric.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-900 via-purple-900 to-pink-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">
            Begin Your Healing Journey Today
          </h2>
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Experience the transformative power of our integrated healing approach and reclaim your health, vitality, and wellbeing
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quiz">
              <Button size="lg" className="bg-white text-purple-900 hover:bg-white/90 px-8 py-4 rounded-xl">
                <Sparkles className="w-5 h-5 mr-2" />
                Take Dosha Quiz
              </Button>
            </Link>
            <Link to="/consultation">
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl">
                <Calendar className="w-5 h-5 mr-2" />
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}