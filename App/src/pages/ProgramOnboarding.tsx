import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, CheckCircle, ArrowRight, Clock, Users, Book, 
  Calendar, Star, Lightbulb, Target, Play, User, FileText,
  Stethoscope, MessageCircle, Award, Shield, Gift, Phone,
  Bell, Settings, ChevronRight, Download, Video, Sparkles
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  estimatedTime: string;
  mandatory: boolean;
  completed: boolean;
  action?: () => void;
  content?: React.ReactNode;
}

const ProgramOnboarding: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showCongratsModal, setShowCongratsModal] = useState(false);

  const programDetails = {
    name: "ekaSamanvaya – Complete Wellness Program",
    duration: "21 Days",
    type: "Comprehensive Mind-Body Balance",
    enrollmentDate: new Date().toLocaleDateString(),
    startDate: new Date(Date.now() + 86400000).toLocaleDateString(), // Tomorrow
    price: "₹3,999",
    savings: "₹1,000"
  };

  const milestones = [
    { day: 1, title: "Foundation Setting", description: "Complete initial assessments and meet your team" },
    { day: 7, title: "First Week Check-in", description: "Review progress with your primary healer" },
    { day: 14, title: "Mid-program Adjustment", description: "Personalize your plan based on results" },
    { day: 21, title: "Program Completion", description: "Celebrate your transformation and plan ahead" }
  ];

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Your Healing Journey! 🎉',
      description: 'Congratulations on taking this important step toward holistic wellness',
      icon: <Heart className="text-rose-500\" size={24} />,
      estimatedTime: '2 min',
      mandatory: true,
      completed: false,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-teal-50 to-rose-50 rounded-xl p-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-br from-teal-500 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Sparkles size={32} className="text-white" />
            </motion.div>
            <h2 className="text-2xl font-garamond font-semibold text-slate-800 mb-3">
              Welcome to ekaSamanvaya, {user?.name?.split(' ')[0]}! 
            </h2>
            <p className="text-lg text-slate-600 mb-4">
              You've enrolled in our signature 21-day Complete Wellness Program
            </p>
            <div className="bg-white/70 rounded-lg p-4 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-500">Program:</span>
                  <div className="font-semibold text-slate-700">{programDetails.name}</div>
                </div>
                <div>
                  <span className="text-slate-500">Duration:</span>
                  <div className="font-semibold text-slate-700">{programDetails.duration}</div>
                </div>
                <div>
                  <span className="text-slate-500">Start Date:</span>
                  <div className="font-semibold text-slate-700">{programDetails.startDate}</div>
                </div>
                <div>
                  <span className="text-slate-500">Investment:</span>
                  <div className="font-semibold text-teal-600">{programDetails.price}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-teal-50 rounded-lg p-4">
            <h3 className="font-semibold text-teal-800 mb-2">What makes ekaSamanvaya special?</h3>
            <ul className="space-y-2 text-sm text-teal-700">
              <li className="flex items-center">
                <CheckCircle size={16} className="mr-2 text-teal-500" />
                Personalized Ayurvedic treatment based on your unique constitution
              </li>
              <li className="flex items-center">
                <CheckCircle size={16} className="mr-2 text-teal-500" />
                Daily guidance from certified practitioners
              </li>
              <li className="flex items-center">
                <CheckCircle size={16} className="mr-2 text-teal-500" />
                Comprehensive lifestyle transformation in just 21 days
              </li>
              <li className="flex items-center">
                <CheckCircle size={16} className="mr-2 text-teal-500" />
                24/7 support and community connection
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'profile-setup',
      title: 'Complete Your Wellness Profile',
      description: 'Help us understand your unique health needs and goals',
      icon: <User className="text-teal-600" size={24} />,
      estimatedTime: '8 min',
      mandatory: true,
      completed: false,
      action: () => navigate('/profile/edit'),
      content: (
        <div className="space-y-4">
          <p className="text-slate-600">
            Your wellness profile helps our practitioners create a personalized treatment plan that's perfectly suited to your body, mind, and lifestyle.
          </p>
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="font-semibold mb-3">What we'll ask you about:</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                Personal health history
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                Current symptoms
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                Lifestyle preferences
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                Wellness goals
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                Daily routines
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                Dietary preferences
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'dosha-assessment',
      title: 'Discover Your Ayurvedic Constitution',
      description: 'Take our comprehensive Prakriti assessment to reveal your unique dosha type',
      icon: <Target className="text-purple-600" size={24} />,
      estimatedTime: '12 min',
      mandatory: true,
      completed: false,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-2">Understanding Your Dosha</h4>
            <p className="text-sm text-purple-700">
              Your dosha (Vata, Pitta, or Kapha) determines your physical, mental, and emotional characteristics. 
              This knowledge is the foundation of your personalized treatment plan.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">🌬️</div>
              <div className="font-semibold text-sm text-blue-800">Vata</div>
              <div className="text-xs text-blue-600">Air & Space</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl mb-2">🔥</div>
              <div className="font-semibold text-sm text-red-800">Pitta</div>
              <div className="text-xs text-red-600">Fire & Water</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">🌍</div>
              <div className="font-semibold text-sm text-green-800">Kapha</div>
              <div className="text-xs text-green-600">Earth & Water</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'meet-team',
      title: 'Meet Your Healing Team',
      description: 'Connect with the certified practitioners who will guide your journey',
      icon: <Users className="text-teal-600" size={24} />,
      estimatedTime: '5 min',
      mandatory: true,
      completed: false,
      action: () => navigate('/healers'),
      content: (
        <div className="space-y-4">
          <p className="text-slate-600">
            Your personalized healing team has been carefully selected based on your needs and preferences.
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-white rounded-lg border border-slate-200">
              <img 
                src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150"
                alt="Dr. Aparna Albert"
                className="w-12 h-12 rounded-full object-cover mr-3"
              />
              <div>
                <div className="font-semibold text-slate-800">Dr. Aparna Albert</div>
                <div className="text-sm text-slate-600">Primary Ayurvedic Practitioner</div>
                <div className="text-xs text-teal-600">15+ years experience • Women's Health Specialist</div>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-white rounded-lg border border-slate-200">
              <img 
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150"
                alt="Shradha Kurup"
                className="w-12 h-12 rounded-full object-cover mr-3"
              />
              <div>
                <div className="font-semibold text-slate-800">Shradha Kurup</div>
                <div className="text-sm text-slate-600">Clinical Nutritionist</div>
                <div className="text-xs text-teal-600">8+ years experience • Dosha-based Nutrition</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'first-consultation',
      title: 'Schedule Your Welcome Consultation',
      description: 'Book your initial session to kick-start your transformation',
      icon: <Calendar className="text-rose-600" size={24} />,
      estimatedTime: '10 min',
      mandatory: true,
      completed: false,
      action: () => navigate('/talk-to-healer'),
      content: (
        <div className="space-y-4">
          <div className="bg-rose-50 rounded-lg p-4">
            <h4 className="font-semibold text-rose-800 mb-2">Your Welcome Consultation</h4>
            <p className="text-sm text-rose-700">
              This 45-minute session with Dr. Aparna will establish your baseline, review your assessment results, 
              and create your personalized 21-day roadmap.
            </p>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold">Recommended Time Slots</span>
              <span className="text-xs text-slate-500">Next 48 hours</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 bg-teal-50 rounded text-center">Tomorrow 10:00 AM</div>
              <div className="p-2 bg-teal-50 rounded text-center">Tomorrow 2:00 PM</div>
              <div className="p-2 bg-slate-50 rounded text-center">Day After 11:00 AM</div>
              <div className="p-2 bg-slate-50 rounded text-center">Day After 4:00 PM</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'app-tour',
      title: 'Explore Your Wellness Dashboard',
      description: 'Get familiar with the tools and features that will support your journey',
      icon: <Play className="text-indigo-600" size={24} />,
      estimatedTime: '7 min',
      mandatory: false,
      completed: false,
      content: (
        <div className="space-y-4">
          <p className="text-slate-600">
            Take a quick tour of your personalized dashboard and discover all the tools designed to support your transformation.
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded-lg border border-slate-200 text-center">
              <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Calendar size={16} className="text-teal-600" />
              </div>
              <div className="text-sm font-medium">Daily Schedule</div>
              <div className="text-xs text-slate-500">Track activities</div>
            </div>
            
            <div className="p-3 bg-white rounded-lg border border-slate-200 text-center">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Book size={16} className="text-purple-600" />
              </div>
              <div className="text-sm font-medium">Wellness Journal</div>
              <div className="text-xs text-slate-500">Reflect & record</div>
            </div>
            
            <div className="p-3 bg-white rounded-lg border border-slate-200 text-center">
              <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <MessageCircle size={16} className="text-rose-600" />
              </div>
              <div className="text-sm font-medium">Chat with Team</div>
              <div className="text-xs text-slate-500">24/7 support</div>
            </div>
            
            <div className="p-3 bg-white rounded-lg border border-slate-200 text-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Award size={16} className="text-green-600" />
              </div>
              <div className="text-sm font-medium">Progress Tracker</div>
              <div className="text-xs text-slate-500">Monitor growth</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'support-setup',
      title: 'Configure Your Support Preferences',
      description: 'Set up notifications and communication preferences for optimal support',
      icon: <Bell className="text-amber-600" size={24} />,
      estimatedTime: '3 min',
      mandatory: false,
      completed: false,
      action: () => navigate('/settings'),
      content: (
        <div className="space-y-4">
          <p className="text-slate-600">
            Customize how and when you'd like to receive guidance, reminders, and support from your healing team.
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center">
                <Bell size={16} className="text-amber-500 mr-2" />
                <span className="text-sm">Daily wellness reminders</span>
              </div>
              <div className="w-10 h-6 bg-teal-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center">
                <MessageCircle size={16} className="text-blue-500 mr-2" />
                <span className="text-sm">Team messages</span>
              </div>
              <div className="w-10 h-6 bg-teal-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center">
                <Calendar size={16} className="text-green-500 mr-2" />
                <span className="text-sm">Appointment reminders</span>
              </div>
              <div className="w-10 h-6 bg-teal-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const markStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const progress = (completedSteps.length / onboardingSteps.length) * 100;
  const mandatorySteps = onboardingSteps.filter(step => step.mandatory);
  const completedMandatory = mandatorySteps.filter(step => completedSteps.includes(step.id)).length;

  const handleStepAction = (step: OnboardingStep) => {
    if (step.action) {
      step.action();
    }
    markStepComplete(step.id);
  };

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowCongratsModal(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-200 via-teal-50/30 to-rose-50/30">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-garamond font-semibold text-slate-800 mb-2">
            Welcome to Your Wellness Journey
          </h1>
          <p className="text-lg text-slate-600">
            Let's get you set up for success in the ekaSamanvaya Program
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-brand-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-garamond font-semibold text-slate-800">Setup Progress</h2>
            <span className="text-sm text-slate-600">{completedSteps.length} of {onboardingSteps.length} completed</span>
          </div>
          
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-4">
            <motion.div 
              className="h-full bg-gradient-to-r from-teal-500 to-rose-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Mandatory steps: {completedMandatory}/{mandatorySteps.length}</span>
            <span>Estimated time remaining: {Math.max(0, 45 - (completedSteps.length * 7))} minutes</span>
          </div>
        </motion.div>

        {/* Current Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-xl shadow-brand-lg p-6 mb-8"
        >
          <div className="flex items-start mb-6">
            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
              {onboardingSteps[currentStep].icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-garamond font-semibold text-slate-800 mr-3">
                  {onboardingSteps[currentStep].title}
                </h3>
                {onboardingSteps[currentStep].mandatory && (
                  <span className="px-2 py-1 bg-rose-100 text-rose-600 text-xs font-medium rounded-full">
                    Required
                  </span>
                )}
              </div>
              <p className="text-slate-600 mb-2">{onboardingSteps[currentStep].description}</p>
              <div className="flex items-center text-sm text-slate-500">
                <Clock size={14} className="mr-1" />
                Estimated time: {onboardingSteps[currentStep].estimatedTime}
              </div>
            </div>
          </div>

          {onboardingSteps[currentStep].content}

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentStep === 0 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Previous
            </button>

            <div className="flex items-center space-x-2">
              {onboardingSteps[currentStep].action && (
                <button
                  onClick={() => handleStepAction(onboardingSteps[currentStep])}
                  className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center"
                >
                  Complete Step
                  <ArrowRight size={16} className="ml-2" />
                </button>
              )}
              
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors flex items-center"
              >
                {currentStep === onboardingSteps.length - 1 ? 'Finish Setup' : 'Next Step'}
                <ChevronRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Step Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-brand-lg p-6 mb-8"
        >
          <h3 className="text-lg font-garamond font-semibold text-slate-800 mb-4">All Setup Steps</h3>
          <div className="space-y-3">
            {onboardingSteps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center p-3 rounded-lg border-2 transition-all cursor-pointer ${
                  index === currentStep
                    ? 'border-teal-200 bg-teal-50'
                    : completedSteps.includes(step.id)
                    ? 'border-green-200 bg-green-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  {completedSteps.includes(step.id) ? (
                    <CheckCircle size={20} className="text-green-600" />
                  ) : index === currentStep ? (
                    <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-slate-300 rounded-full flex items-center justify-center text-xs text-slate-500">
                      {index + 1}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-slate-800">{step.title}</div>
                  <div className="text-sm text-slate-600">{step.estimatedTime} • {step.mandatory ? 'Required' : 'Optional'}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Program Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-brand-lg p-6 mb-8"
        >
          <h3 className="text-lg font-garamond font-semibold text-slate-800 mb-4">Your 21-Day Journey Ahead</h3>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-rose-400 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-4">
                  {milestone.day}
                </div>
                <div>
                  <div className="font-medium text-slate-800">{milestone.title}</div>
                  <div className="text-sm text-slate-600">{milestone.description}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Support Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-teal-50 to-rose-50 rounded-xl p-6"
        >
          <div className="flex items-center mb-4">
            <Shield size={24} className="text-teal-600 mr-3" />
            <h3 className="text-lg font-garamond font-semibold text-slate-800">We're Here to Support You</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <Phone size={32} className="text-teal-600 mx-auto mb-2" />
              <div className="font-medium text-slate-800">24/7 Support</div>
              <div className="text-sm text-slate-600">Emergency helpline available</div>
            </div>
            <div className="text-center">
              <MessageCircle size={32} className="text-rose-600 mx-auto mb-2" />
              <div className="font-medium text-slate-800">Live Chat</div>
              <div className="text-sm text-slate-600">Instant help from our team</div>
            </div>
            <div className="text-center">
              <Video size={32} className="text-purple-600 mx-auto mb-2" />
              <div className="font-medium text-slate-800">Video Calls</div>
              <div className="text-sm text-slate-600">Face-to-face consultations</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white/70 rounded-lg backdrop-blur-sm text-center">
            <p className="text-sm text-slate-600 mb-3">
              Questions or need help? Our wellness specialists are always ready to assist you.
            </p>
            <button className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
              Get Help Now
            </button>
          </div>
        </motion.div>
      </div>

      {/* Congratulations Modal */}
      <AnimatePresence>
        {showCongratsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-800/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl shadow-brand-xl max-w-md w-full p-6 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-br from-teal-500 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Gift size={32} className="text-white" />
              </motion.div>
              
              <h2 className="text-2xl font-garamond font-semibold text-slate-800 mb-3">
                Congratulations! 🎉
              </h2>
              <p className="text-slate-600 mb-6">
                You've successfully completed the onboarding process. Your healing journey begins now!
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium"
                >
                  Go to My Dashboard
                </button>
                <button
                  onClick={() => setShowCongratsModal(false)}
                  className="w-full px-6 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Continue Setup Later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProgramOnboarding;