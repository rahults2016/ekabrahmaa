import React from 'react';
import { motion } from 'framer-motion';
import { Bot as Lotus, MessageCircle, Moon, Droplet, Sun, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FirstTimeDashboard from '@/features/FristTimeDashboard/firstTimeDashboard';
import DailySoothingNote from '@/features/dashboard/DailySoothingNote';
import HealingTeamButtons from '@/features/dashboard/HealingTeamButtons';
import AnalyticsSummary from '@/features/dashboard/AnalyticsSummary';
import ProgramCard from '@/features/dashboard/ProgramCard';
import AppointmentCard from '@/features/dashboard/AppointmentCard';


interface CareTeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  online: boolean;
}

const careTeam: CareTeamMember[] = [
  {
    id: 'doc1',
    name: 'Dr. Aparna Albert',
    role: 'Ayurveda Doctor',
    avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150',
    online: true
  },
  {
    id: 'nut1',
    name: 'Shradha Kurup',
    role: 'Nutritionist',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    online: false
  }
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Check if user is new (no bio indicates incomplete profile)
  const isNewUser = false;
  
  if (isNewUser) {
    return <FirstTimeDashboard />;
  }

  // Check if user has shared morning smile today
  const hasSharedToday = () => {
    const today = new Date().toDateString();
    const lastShared = localStorage.getItem('lastMorningSmileDate');
    return lastShared === today;
  };

  // Check if it's morning time (6 AM - 10 AM)
  const isMorningTime = () => {
    const hour = new Date().getHours();
    return hour >= 6 && hour <= 10;
  };
  
  const getTimeBasedAffirmation = () => {
    const hour = new Date().getHours();
    const affirmations = {
      morning: [
        "I begin today with clarity, calm, and care.",
        "My energy flows where my breath leads.",
        "Every sunrise is a new chance to heal.",
        "I honor this day as a part of my sacred rhythm.",
        "Today, I move with grace and intention."
      ],
      midday: [
        "In stillness or motion, I remain centered.",
        "My body speaks with wisdom — I choose to listen.",
        "My digestion transforms not just food, but emotion.",
        "I pause to receive nourishment — on all levels.",
        "Healing is not a race. It is a remembering."
      ],
      evening: [
        "I release the weight of this day with ease.",
        "My body deserves rest. My mind welcomes peace.",
        "In silence, I hear the whispers of balance.",
        "As the moon rises, I soften into myself.",
        "My breath slows, my heart opens."
      ],
      gentle: [
        "You don't have to feel perfect to be healing.",
        "Your breath is your anchor. Inhale softness.",
        "Let the day unfold gently. You are enough."
      ]
    };

    if (hour < 12) return affirmations.morning;
    if (hour < 17) return affirmations.midday;
    return affirmations.evening;
  };

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };
  
  const getCurrentAffirmation = () => {
    const timeBasedAffirmations = getTimeBasedAffirmation();
    return timeBasedAffirmations[Math.floor(Math.random() * timeBasedAffirmations.length)];
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto"
    >
      {/* Morning Smile CTA - Prominent placement at top */}
      {!hasSharedToday() && isMorningTime() && (
        <motion.div variants={itemVariants} className="mb-6">
          <motion.button
            onClick={() => navigate('/morning-smile')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-teal-500 via-rose-400 to-teal-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4 backdrop-blur-sm">
                  <Camera size={28} className="text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-garamond font-semibold mb-1">Share Your Morning Smile</h3>
                  <p className="text-white/90 text-sm">Let your healing team see your beautiful energy today</p>
                </div>
              </div>
              <div className="flex items-center">
                <Sun size={24} className="text-white/70 mr-2" />
                <span className="text-white/80 text-sm">Perfect timing!</span>
              </div>
            </div>
          </motion.button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Welcome and Daily Note section */}
        <div className="lg:col-span-2">
          <motion.div variants={itemVariants} className="mb-6">
            <div className="bg-gradient-to-br from-teal-light/10 to-pink-light/10 rounded-xl p-6">
              <motion.h2 
                className="text-3xl font-garamond font-semibold text-charcoal-dark mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* {getTimeBasedGreeting()}, {user?.name.split(' ')[0] || 'User'} */}
                {getTimeBasedGreeting()}, {'User'}

              </motion.h2>
              <motion.p
                className="text-lg text-charcoal-light italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {getCurrentAffirmation()}
              </motion.p>
            </div>
          </motion.div>
          
          {/* Daily Soothing Note */}
          <motion.div variants={itemVariants}>
            <DailySoothingNote />
          </motion.div>
        </div>
        
        {/* Right sidebar with Morning Smile widget and Group Chat */}
        <div className="lg:col-span-1 space-y-6">
          {/* Morning Smile Widget */}
          <motion.div variants={itemVariants}>
            <div
              className="card hover:shadow-md cursor-pointer transition-all duration-300 relative overflow-hidden"
              onClick={() => navigate('/morning-smile')}
            >
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br from-teal-500/10 to-rose-500/10 -translate-y-6 translate-x-6"></div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-rose-400 flex items-center justify-center mr-3">
                      <Camera size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-charcoal-dark">Morning Smile</h3>
                      <p className="text-xs text-charcoal-light">Share your radiance</p>
                    </div>
                  </div>
                  
                  {hasSharedToday() ? (
                    <div className="bg-teal-100 text-teal-600 px-2 py-1 rounded-full text-xs">
                      ✓ Shared
                    </div>
                  ) : isMorningTime() ? (
                    <div className="bg-rose-100 text-rose-600 px-2 py-1 rounded-full text-xs animate-pulse">
                      Ready!
                    </div>
                  ) : (
                    <div className="bg-slate-100 text-slate-500 px-2 py-1 rounded-full text-xs">
                      Later
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-charcoal-light mb-3">
                  {hasSharedToday() 
                    ? 'Your morning smile brightened the team\'s day!'
                    : isMorningTime()
                    ? 'Perfect time to share your beautiful morning energy'
                    : 'Share your smile when you\'re ready'
                  }
                </p>
                
                <div className="flex items-center text-xs text-teal-600">
                  <span>Tap to {hasSharedToday() ? 'share another' : 'get started'}</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-2"
                  >
                    →
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Group Chat Widget */}
          <motion.div variants={itemVariants}>
            <div
              className="card hover:shadow-md bg-white cursor-pointer transition-all duration-300 relative overflow-hidden h-full"
              onClick={() => navigate('/chat/group')}
            >
            
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                <div className="w-12 h-12 rounded-full bg-teal-light/10 flex items-center justify-center mr-3">
                  <Lotus size={24} className="text-teal" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-charcoal-dark">Your Healing Room</h3>
                  <p className="text-xs text-charcoal-light mt-0.5">Connect with your care team</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <div className="flex -space-x-3">
                      {careTeam.map((member) => (
                        <div key={member.id} className="relative">
                          <img 
                            src={member.avatar} 
                            alt={member.name}
                            title={`Dr. ${member.name} - ${member.role}`}
                            className="w-8 h-8 rounded-full border-2 border-white"
                          />
                          {member.online && (
                            <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="relative">
                  <button className="p-1.5 rounded-full bg-teal-light/10 text-teal hover:bg-teal-light/20">
                    <MessageCircle size={16} />
                  </button>
                  <span 
                    className="absolute -top-1 -right-1 w-4 h-4 bg-pink rounded-full text-[10px] flex items-center justify-center text-white"
                    title="New messages from your care team"
                  >
                    2
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-xs text-charcoal-light">Next Session:</span>
                  <span className="text-xs font-medium text-teal">Today, 2:00 PM</span>
                </div>
                <button className="text-xs text-teal hover:text-teal-dark transition-colors">
                  View Schedule
                </button>
              </div>
            </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Circular Healing Team Buttons */}
      <motion.div variants={itemVariants} className="mb-8">
        <HealingTeamButtons showInitially={false} maxTeamMembers={6} />
      </motion.div>

      {/* Analytics Summary */}
      <motion.div variants={itemVariants} className="mb-8">
        <AnalyticsSummary />
      </motion.div>
      
      {/* Active program */}
      <motion.div variants={itemVariants} className="mb-8">
        <h3 className="text-xl font-garamond font-semibold mb-4">Current Program</h3>
        <ProgramCard
          title="ekaSamanvaya Program"
          duration={21}
          currentDay={8}
          description="A comprehensive program designed to balance your Pitta-Vata dosha type through tailored yoga, breathwork, and nutrition."
        />
      </motion.div>
      
      {/* Mood and Today's Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div variants={itemVariants}>
          <div className="card hover:shadow-lg">
            <h3 className="text-xl font-garamond font-semibold mb-4">My Activity</h3>
            
            {/* Completed Activities */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-charcoal-light mb-3">Completed</h4>
              <div className="flex items-center p-3 bg-teal-light/10 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-charcoal-light mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-charcoal-light">Morning Pranayama</h4>
                  <p className="text-sm text-charcoal-light">Completed at 7:00 AM</p>
                </div>
              </div>
            </div>
            
            {/* Missed Activities */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-charcoal-light mb-3">Missed</h4>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-pink-light/10 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-pink-light flex items-center justify-center text-pink mr-3">
                    <Moon size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Evening Meditation</h4>
                    <p className="text-sm text-charcoal-light">Scheduled for 8:00 PM</p>
                  </div>
                  <button className="btn-secondary text-xs py-1 px-3">
                    Reschedule
                  </button>
                </div>
                
                <div className="flex items-center p-3 bg-pink-light/10 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-pink-light flex items-center justify-center text-pink mr-3">
                    <Droplet size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Afternoon Herbal Tea</h4>
                    <p className="text-sm text-charcoal-light">Scheduled for 3:00 PM</p>
                  </div>
                  <button className="btn-secondary text-xs py-1 px-3">
                    Reschedule
                  </button>
                </div>
              </div>
            </div>
            
            {/* Current Activities */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-charcoal-light mb-3">Current</h4>
              <div className="flex items-center p-3 bg-teal-light/10 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-white mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="M12 8v4l3 3"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Morning Meditation</h4>
                  <p className="text-sm text-charcoal-light">15 minutes</p>
                </div>
                <button className="ml-auto btn-primary text-xs py-1 px-3">
                  Start
                </button>
              </div>
            </div>
            
            {/* Upcoming Activities */}
            <div>
              <h4 className="text-sm font-medium text-charcoal-light mb-3">Upcoming</h4>
              <div className="flex items-center p-3 bg-pink-light/20 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-pink flex items-center justify-center text-charcoal mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z"></path>
                    <path d="M8 7h6"></path>
                    <path d="M8 11h8"></path>
                    <path d="M8 15h6"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Journal Reflection</h4>
                  <p className="text-sm text-charcoal-light">Express your thoughts</p>
                </div>
                <button className="ml-auto btn-secondary text-xs py-1 px-3">
                  Write
                </button>
              </div>
              
              <div className="flex items-center p-3 bg-gold-light/20 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-charcoal mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Evening Yoga</h4>
                  <p className="text-sm text-charcoal-light">30 minutes</p>
                </div>
                <button className="ml-auto btn-secondary text-xs py-1 px-3">
                  View
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Upcoming appointments */}
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-garamond font-semibold mb-4">Upcoming Appointments</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AppointmentCard
            title="Ayurvedic Consultation"
            doctorName="Anjali Sharma"
            doctorAvatar="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150"
            date="Today"
            time="2:00 PM"
            isUpcoming={true}
          />
          
          <AppointmentCard
            title="Nutrition Review"
            doctorName="Michael Chen"
            doctorAvatar="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150"
            date="Tomorrow"
            time="10:30 AM"
            isUpcoming={false}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;