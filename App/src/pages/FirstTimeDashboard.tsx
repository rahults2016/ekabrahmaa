import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Heart, Users, FileText, ArrowRight, Sparkles, 
  CheckCircle, Clock, Star, Gift, BookOpen, Calendar,
  Stethoscope, MessageCircle, Target, Play, ChevronRight,
  Award, Shield, Lightbulb, Compass
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const FirstTimeDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  
  // Extract first name for personalization
  const firstName = user?.name?.split(' ')[0] || 'there';
  
  const onboardingSteps = [
    {
      id: 'welcome',
      title: 'Welcome to Your Healing Journey',
      description: 'Let\'s get you started with personalized wellness',
      icon: Heart,
      link: '#',
      estimatedTime: '2 min',
      priority: 'intro',
      completed: false
    },
    {
      id: 'profile',
      title: 'Complete Your Wellness Profile',
      description: 'Help us understand your unique health needs and goals',
      icon: User,
      link: '/profile/edit',
      estimatedTime: '5 min',
      priority: 'high',
      completed: false
    },
    {
      id: 'dosha',
      title: 'Discover Your Ayurvedic Constitution',
      description: 'Take our comprehensive assessment to reveal your dosha type',
      icon: Compass,
      link: '/assessment',
      estimatedTime: '8 min',
      priority: 'high',
      completed: false
    },
    {
      id: 'healers',
      title: 'Meet Your Healing Team',
      description: 'Connect with certified practitioners matched to your needs',
      icon: Users,
      link: '/healers',
      estimatedTime: '3 min',
      priority: 'high',
      completed: false
    },
    {
      id: 'appointment',
      title: 'Schedule Your First Consultation',
      description: 'Book a personalized session with your chosen healer',
      icon: Calendar,
      link: '/talk-to-healer',
      estimatedTime: '4 min',
      priority: 'high',
      completed: false
    },
    {
      id: 'medical',
      title: 'Share Your Health History',
      description: 'Provide medical background for more accurate treatment',
      icon: FileText,
      link: '/medical/new',
      estimatedTime: '10 min',
      priority: 'medium',
      completed: false
    }
  ];

  const quickActions = [
    {
      title: 'Start Free Assessment',
      description: 'Discover your dosha in 5 minutes',
      icon: Compass,
      action: () => navigate('/assessment'),
      color: 'teal',
      featured: true
    },
    {
      title: 'Browse Healers',
      description: 'Find your perfect wellness match',
      icon: Stethoscope,
      action: () => navigate('/healers'),
      color: 'rose'
    },
    {
      title: 'Explore Programs',
      description: 'See our wellness journeys',
      icon: Target,
      action: () => navigate('/programs'),
      color: 'sage'
    },
    {
      title: 'Chat with Support',
      description: 'Get help from our team',
      icon: MessageCircle,
      action: () => navigate('/chat'),
      color: 'info'
    }
  ];

  const benefits = [
    {
      title: 'Personalized Care',
      description: 'Treatment plans based on your unique constitution and needs',
      icon: '🎯',
      features: ['Custom dosha assessment', 'Tailored treatment plans', 'Personal health tracking']
    },
    {
      title: 'Expert Guidance',
      description: 'Certified Ayurvedic practitioners with years of experience',
      icon: '👩‍⚕️',
      features: ['Board-certified healers', '24/7 support', 'Proven methodologies']
    },
    {
      title: 'Holistic Approach',
      description: 'Mind, body, and spirit wellness integrated seamlessly',
      icon: '✨',
      features: ['Complete wellness tracking', 'Lifestyle guidance', 'Spiritual practices']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      location: 'California',
      text: 'The personalized approach completely transformed my health. My energy levels are through the roof!',
      rating: 5,
      program: 'ekaSamanvaya Program'
    },
    {
      name: 'David L.',
      location: 'New York',
      text: 'Finding my dosha type was life-changing. The meal plans and herbs are perfectly matched to my body.',
      rating: 5,
      program: 'Digestive Wellness'
    }
  ];

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const handleContinueJourney = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const completionPercentage = (completedSteps.length / onboardingSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-200 via-teal-50/30 to-rose-50/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Hero Welcome Section */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center space-y-8"
          >
            {/* Animated welcome icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-teal-400 shadow-brand-xl mb-6"
            >
              <Sparkles size={40} className="text-white" />
            </motion.div>

            <div className="space-y-6 max-w-4xl mx-auto">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-5xl md:text-6xl font-garamond font-semibold text-slate-800 leading-tight"
              >
                Welcome to ekaBrahmaa,{' '}
                <span className="text-teal-600">{firstName}</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="text-2xl md:text-3xl text-slate-600 font-light leading-relaxed"
              >
                Your personalized journey to holistic wellness begins here
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-brand-lg border border-teal-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-garamond font-semibold text-slate-800">Your Progress</h3>
                  <span className="text-teal-600 font-semibold">{Math.round(completionPercentage)}%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 1.3 }}
                  />
                </div>
                <p className="text-sm text-slate-600 mt-3">
                  {completedSteps.length} of {onboardingSteps.length} steps completed - You're doing great!
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* Quick Actions Section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {quickActions.map((action, index) => (
              <motion.button
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={action.action}
                className={`card hover:shadow-brand-xl text-left relative overflow-hidden ${
                  action.featured ? 'bg-gradient-to-br from-teal-500 to-teal-400 text-white' : 'bg-white'
                }`}
              >
                {action.featured && (
                  <div className="absolute top-3 right-3">
                    <Star size={20} className="text-yellow-300 fill-current" />
                  </div>
                )}
                <div className={`w-12 h-12 rounded-xl ${
                  action.featured ? 'bg-white/20' : `bg-${action.color}-100`
                } flex items-center justify-center mb-4`}>
                  <action.icon size={24} className={
                    action.featured ? 'text-white' : `text-${action.color}-600`
                  } />
                </div>
                <h3 className={`font-garamond font-semibold text-lg mb-2 ${
                  action.featured ? 'text-white' : 'text-slate-800'
                }`}>
                  {action.title}
                </h3>
                <p className={`text-sm ${
                  action.featured ? 'text-white/90' : 'text-slate-600'
                }`}>
                  {action.description}
                </p>
                <div className="mt-4 flex items-center">
                  <span className={`text-sm font-medium ${
                    action.featured ? 'text-white' : 'text-teal-600'
                  }`}>
                    Get Started
                  </span>
                  <ArrowRight size={16} className={`ml-2 ${
                    action.featured ? 'text-white' : 'text-teal-600'
                  }`} />
                </div>
              </motion.button>
            ))}
          </motion.section>

          {/* Onboarding Steps */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-garamond font-semibold text-slate-800">
                Your Personalized Setup
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Follow these guided steps to unlock your full wellness potential
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {onboardingSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isCompleted = completedSteps.includes(step.id);
                const isCurrent = index === currentStep;
                
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.2 + index * 0.1 }}
                    className="group"
                  >
                    <Link
                      to={step.link === '#' ? '#' : step.link}
                      onClick={() => step.link === '#' ? null : handleStepComplete(step.id)}
                      className={`block relative overflow-hidden rounded-2xl transition-all duration-300 ${
                        isCompleted ? 
                          'bg-gradient-to-br from-teal-500 to-teal-400 text-white shadow-brand-lg' :
                        isCurrent ?
                          'bg-white shadow-brand-xl border-2 border-teal-200 hover:border-teal-300' :
                          'bg-white shadow-brand hover:shadow-brand-lg border border-slate-100 hover:border-teal-200'
                      }`}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className={`relative w-14 h-14 rounded-xl flex items-center justify-center ${
                              isCompleted ? 'bg-white/20' : 
                              isCurrent ? 'bg-teal-100' : 'bg-slate-100 group-hover:bg-teal-100'
                            } transition-colors duration-300`}>
                              {isCompleted ? (
                                <CheckCircle size={28} className="text-white" />
                              ) : (
                                <IconComponent size={28} className={
                                  isCurrent ? 'text-teal-600' : 'text-slate-600 group-hover:text-teal-600'
                                } />
                              )}
                              <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                                isCompleted ? 'bg-white text-teal-600' :
                                isCurrent ? 'bg-teal-600 text-white' :
                                'bg-slate-200 text-slate-600'
                              }`}>
                                {index + 1}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {step.priority === 'high' && !isCompleted && (
                              <span className="px-2 py-1 bg-rose-100 text-rose-600 text-xs font-medium rounded-full">
                                Essential
                              </span>
                            )}
                            {isCompleted && (
                              <span className="px-2 py-1 bg-white/20 text-white text-xs font-medium rounded-full">
                                Complete
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h3 className={`text-xl font-garamond font-semibold ${
                            isCompleted ? 'text-white' : 'text-slate-800'
                          }`}>
                            {step.title}
                          </h3>
                          
                          <p className={`text-sm leading-relaxed ${
                            isCompleted ? 'text-white/90' : 'text-slate-600'
                          }`}>
                            {step.description}
                          </p>
                          
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Clock size={14} className={isCompleted ? 'text-white/70' : 'text-slate-400'} />
                                <span className={`text-xs ${isCompleted ? 'text-white/70' : 'text-slate-500'}`}>
                                  {step.estimatedTime}
                                </span>
                              </div>
                            </div>
                            
                            <ChevronRight size={20} className={`${
                              isCompleted ? 'text-white/70' : 'text-teal-500 group-hover:translate-x-1'
                            } transition-transform duration-300`} />
                          </div>
                        </div>
                      </div>

                      {isCurrent && !isCompleted && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-teal-400"></div>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Benefits Section */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-garamond font-semibold text-slate-800">
                Why Choose ekaBrahmaa?
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Experience the power of personalized Ayurvedic wellness
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.7 + index * 0.2 }}
                  className="card hover:shadow-brand-xl text-center"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-garamond font-semibold text-slate-800 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {benefit.description}
                  </p>
                  <ul className="space-y-2">
                    {benefit.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-slate-600">
                        <CheckCircle size={14} className="text-teal-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Testimonials */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.0 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-garamond font-semibold text-slate-800">
                Real Stories, Real Results
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                See how others have transformed their lives
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.2 + index * 0.2 }}
                  className="card hover:shadow-brand-xl"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center text-white font-semibold mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                      <p className="text-sm text-slate-600">{testimonial.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-slate-700 italic mb-4">"{testimonial.text}"</p>
                  
                  <div className="text-xs text-teal-600 font-medium">
                    {testimonial.program}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.5 }}
            className="text-center"
          >
            <div className="card bg-gradient-to-br from-teal-500 to-teal-400 text-white hover:shadow-brand-xl">
              <div className="max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl md:text-4xl font-garamond font-semibold">
                  Ready to Begin Your Journey?
                </h2>
                <p className="text-xl text-white/90 leading-relaxed">
                  Take the first step towards personalized wellness. Your transformation starts with understanding your unique constitution.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/profile/edit"
                    className="inline-flex items-center px-8 py-4 bg-white text-teal-600 font-semibold rounded-xl shadow-brand hover:shadow-brand-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <Play size={20} className="mr-2" />
                    Start Your Profile
                  </Link>
                  <button
                    onClick={() => navigate('/healers')}
                    className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    <Users size={20} className="mr-2" />
                    Meet Your Team
                  </button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Help Section */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.8 }}
            className="text-center"
          >
            <div className="card bg-gradient-to-br from-slate-50 to-white">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center">
                  <Lightbulb size={32} className="text-teal-600" />
                </div>
              </div>
              <h3 className="text-2xl font-garamond font-semibold text-slate-800 mb-3">
                Need Guidance?
              </h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Our wellness experts are here to support you every step of the way. Get personalized help whenever you need it.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/chat"
                  className="inline-flex items-center px-6 py-3 bg-teal-500 text-white font-medium rounded-xl shadow-brand hover:shadow-brand-lg hover:bg-teal-600 transition-all duration-300"
                >
                  <MessageCircle size={18} className="mr-2" />
                  Chat with Support
                </Link>
                <Link
                  to="/resources"
                  className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-teal-500 text-teal-600 font-medium rounded-xl hover:bg-teal-50 transition-all duration-300"
                >
                  <BookOpen size={18} className="mr-2" />
                  Browse Resources
                </Link>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
};

export default FirstTimeDashboard;