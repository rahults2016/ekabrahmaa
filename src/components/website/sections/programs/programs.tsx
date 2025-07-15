import { useState, useEffect } from 'react';
import { Button } from '@/components/website/ui/button';
import { Card } from '@/components/website/ui/card';
import { Badge } from '@/components/website/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/website/ui/tabs';
import { Progress } from '@/components/website/ui/progress';
import { Clock, Users, ArrowRight, CheckCircle, Star, Sparkles, Heart, Leaf,Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { programs } from '@/data/website/programConst';

// Enhanced program categories with visual elements
const programCategories = [
  { 
    id: 'all', 
    label: 'All Programs', 
    icon: <Sparkles className="w-5 h-5" />,
    gradient: 'from-purple-500 to-pink-500',
    count: programs.length
  },
  { 
    id: 'beginner', 
    label: 'Beginner Friendly', 
    icon: <Leaf className="w-5 h-5" />,
    gradient: 'from-green-500 to-teal-500',
    count: programs.filter(p => p.duration.includes('7') || p.duration.includes('14')).length
  },
  { 
    id: 'intensive', 
    label: 'Intensive', 
    icon: <Zap className="w-5 h-5" />,
    gradient: 'from-orange-500 to-red-500',
    count: programs.filter(p => p.duration.includes('21') || p.duration.includes('28')).length
  },
  { 
    id: 'mastery', 
    label: 'Mastery', 
    icon: <Star className="w-5 h-5" />,
    gradient: 'from-indigo-500 to-purple-500',
    count: programs.filter(p => p.duration.includes('45')).length
  }
];

// Enhanced program stats for visual appeal
const programStats = [
  { label: 'Success Rate', value: '98%', icon: <Star className="w-6 h-6" />, color: 'text-yellow-500' },
  { label: 'Avg. Improvement', value: '87%', icon: <Heart className="w-6 h-6" />, color: 'text-red-500' },
  { label: 'Client Satisfaction', value: '4.9/5', icon: <Sparkles className="w-6 h-6" />, color: 'text-purple-500' },
  { label: 'Programs Completed', value: '10K+', icon: <Users className="w-6 h-6" />, color: 'text-blue-500' }
];

export default function ProgramsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProgram, setHoveredProgram] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredPrograms = selectedCategory === 'all' 
    ? programs 
    : programs.filter(program => {
        switch (selectedCategory) {
          case 'beginner':
            return program.duration.includes('7') || program.duration.includes('14');
          case 'intensive':
            return program.duration.includes('21') || program.duration.includes('28');
          case 'mastery':
            return program.duration.includes('45');
          default:
            return true;
        }
      });

  const getDurationProgress = (duration: string) => {
    const days = parseInt(duration);
    return Math.min((days / 45) * 100, 100);
  };

  const getIntensityLevel = (duration: string) => {
    const days = parseInt(duration);
    if (days <= 7) return { level: 'Gentle', color: 'bg-green-500' };
    if (days <= 14) return { level: 'Moderate', color: 'bg-yellow-500' };
    if (days <= 28) return { level: 'Intensive', color: 'bg-orange-500' };
    return { level: 'Transformative', color: 'bg-red-500' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Hero Section with Floating Elements */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-teal-200/30 to-pink-200/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-200/30 to-blue-200/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-yellow-200/30 to-orange-200/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-100 to-pink-100 rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-teal-600 mr-2" />
              <span className="text-teal-700 font-medium">Personalized Healing Programs</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-800 via-purple-600 to-pink-600 mb-6 leading-tight">
              Your Healing Journey
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Choose from our carefully crafted programs designed to address your unique healing needs and constitution through our integrated 5-healer approach
            </p>

            {/* Program Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {programStats.map((stat, index) => (
                <div 
                  key={index}
                  className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`${stat.color} mb-3 flex justify-center`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program Categories Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {programCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white shadow-md hover:shadow-lg'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {category.icon}
                  <span>{category.label}</span>
                  <Badge 
                    variant="secondary" 
                    className={`ml-2 ${
                      selectedCategory === category.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {category.count}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 lg:gap-12">
            {filteredPrograms.map((program, index) => {
              const intensity = getIntensityLevel(program.duration);
              const durationProgress = getDurationProgress(program.duration);
              
              return (
                <Card 
                  key={program.id} 
                  className={`group border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  onMouseEnter={() => setHoveredProgram(program.id)}
                  onMouseLeave={() => setHoveredProgram(null)}
                >
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Visual Side */}
                    <div className="relative h-80 lg:h-auto overflow-hidden">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      
                      {/* Floating Program Icon */}
                      <div className="absolute top-6 left-6 w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                        <div className="text-white text-2xl">
                          {program.icon}
                        </div>
                      </div>
                      
                      {/* Program Type Badge */}
                      <div className="absolute top-6 right-6">
                        <Badge className={`${intensity.color} text-white border-0 px-3 py-1`}>
                          {intensity.level}
                        </Badge>
                      </div>
                      
                      {/* Duration Progress */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 border border-white/30">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-white font-medium">Program Duration</span>
                            <span className="text-white text-sm">{program.duration}</span>
                          </div>
                          <Progress value={durationProgress} className="h-2 bg-white/20" />
                        </div>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="p-8 lg:p-12 flex flex-col justify-between">
                      {/* Header */}
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-3">
                            <Badge variant="secondary" className="bg-gradient-to-r from-teal-50 to-pink-50 text-teal-700 border-teal-200 px-3 py-1">
                              {program.type}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                              <span className="text-sm text-gray-600 ml-2">(4.9)</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-gray-800">{program.price}</div>
                            <div className="text-sm text-gray-600">{program.duration}</div>
                          </div>
                        </div>

                        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-800 mb-3">
                          {program.title}
                        </h2>
                        <h3 className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
                          {program.subtitle}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                          {program.description}
                        </p>

                        {/* Program Metrics */}
                        <div className="flex items-center space-x-6 mb-8 text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-5 h-5 text-teal-600" />
                            <span className="font-medium">{program.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-5 h-5 text-teal-600" />
                            <span className="font-medium">{program.healers} Expert Healers</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Heart className="w-5 h-5 text-pink-600" />
                            <span className="font-medium">Personalized</span>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Tabs */}
                      <Tabs defaultValue="features" className="mb-8">
                        <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl p-1">
                          <TabsTrigger 
                            value="features" 
                            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                          >
                            Features
                          </TabsTrigger>
                          <TabsTrigger 
                            value="timeline" 
                            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                          >
                            Timeline
                          </TabsTrigger>
                          <TabsTrigger 
                            value="healers" 
                            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                          >
                            Healers
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="features" className="mt-6">
                          <div className="grid md:grid-cols-2 gap-3">
                            {program.features.map((feature, index) => (
                              <div 
                                key={index} 
                                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                                  hoveredProgram === program.id ? 'bg-teal-50' : 'hover:bg-gray-50'
                                }`}
                              >
                                <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                                <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="timeline" className="mt-6">
                          <div className="space-y-4">
                            {program.healingFlow.slice(0, 4).map((phase, index) => (
                              <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                  {phase.day}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-800 mb-1">{phase.title}</h4>
                                  <p className="text-sm text-gray-600">{phase.activities.slice(0, 2).join(', ')}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="healers" className="mt-6">
                          <div className="space-y-4">
                            {program.healers_info.slice(0, 3).map((healer, index) => (
                              <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                  {healer.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-800">{healer.name}</h4>
                                  <p className="text-sm text-gray-600 mb-1">{healer.specialization} • {healer.experience}</p>
                                  <p className="text-xs text-gray-500">{healer.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>

                      {/* Enhanced CTA */}
                      <div className="space-y-4">
                        <Link
                          to={`/programs/${program.id}`}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          <Button
                            size="lg"
                            className="w-full bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 hover:from-teal-700 hover:via-teal-800 hover:to-teal-900 text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group"
                          >
                            <span className="flex items-center justify-center">
                              Start {program.title}
                              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </Button>
                        </Link>
                        
                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                            Free consultation included
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-4 h-4 mr-1 text-red-500" />
                            Money-back guarantee
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-teal-200 to-pink-200 transform rotate-12 scale-150"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-6">
              Not Sure Which Program is Right for You?
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Take our Prakriti quiz to discover your unique constitution and get personalized program recommendations tailored to your healing journey
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link to="/quiz">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Take Prakriti Quiz
                </Button>
              </Link>
              <Link to="/consultation">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto border-2 border-teal-600 text-teal-700 hover:bg-teal-50 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Talk to a Healer
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-500">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                5-minute quiz
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Instant results
              </span>
              <span className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                Personalized recommendations
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}