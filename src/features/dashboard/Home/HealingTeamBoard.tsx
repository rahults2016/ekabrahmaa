import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, FileText, Video, ChevronDown, Award, Calendar, MapPin, Languages, Plus, ArrowRight, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { detailedHealers } from '../../../data/dashboard/healers';

// Convert detailed healers to healing team format
const healingTeam = detailedHealers.slice(0, 3).map(healer => ({
  id: healer.id,
  name: healer.preferredName,
  fullName: healer.fullName,
  role: healer.role || healer.title.split(' ')[0] + ' ' + healer.title.split(' ')[1],
  title: healer.title,
  specialty: healer.specialties[0],
  specialties: healer.specialties,
  avatar: healer.avatar,
  status: healer.status || (healer.available ? 'online' : 'offline'),
  available: healer.available,
  nextAppointmentTime: new Date(Date.now() + Math.random() * 1000 * 60 * 60 * 4), // Random time within 4 hours
  pastSessionsCount: Math.floor(Math.random() * 20) + 5,
  quote: getQuoteForHealer(healer.id),
  hasNotes: Math.random() > 0.5,
  experience: healer.experience,
  rating: healer.rating,
  consultations: healer.consultations,
  location: healer.location,
  languages: healer.languages,
  credentials: healer.credentials,
  uniqueApproaches: healer.uniqueApproaches,
  biography: healer.biography
}));

function getQuoteForHealer(healerId: string): string {
  const quotes = {
    'h1': 'Here for your gut and glow',
    'h2': 'Nourishing your unique nature',
    'h3': 'Move with mindfulness',
    'h4': 'Healing mind and spirit',
    'h5': 'Your wellness journey starts here',
    'h6': 'Move with mindfulness',
    'h7': 'Healing mind and spirit'
  };
  return quotes[healerId as keyof typeof quotes] || 'Here for your healing journey';
}

const HealingTeamBoard: React.FC = () => {
  const [expandedHealer, setExpandedHealer] = useState<string | null>(null);
  const user = 'Ajith';
  const isNewUser = !user;

  const isWithinTenMinutes = (date: Date) => {
    const diff = date.getTime() - Date.now();
    return diff > 0 && diff <= 1000 * 60 * 10; // 10 minutes in milliseconds
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'busy':
        return 'bg-yellow-500';
      default:
        return 'bg-slate-300';
    }
  };

  // const getSpecialtyIcon = (role: string) => {
  //   switch (role) {
  //     case 'Ayurveda Doctor':
  //       return <Stethoscope size={16} className="text-teal-600" />;
  //     case 'Nutritionist':
  //       return <Utensils size={16} className="text-rose-600" />;
  //     case 'Functional Movement Trainer':
  //       return <Activity size={16} className="text-sage-600" />;
  //     case 'Movement / Yoga Expert':
  //     case 'Yoga Therapist':
  //       return <Heart size={16} className="text-rose-600" />;
  //     case 'Psychologist':
  //       return <Brain size={16} className="text-teal-600" />;
  //     default:
  //       return <Heart size={16} className="text-rose-600" />;
  //   }
  // };

  const toggleHealer = (healerId: string) => {
    setExpandedHealer(expandedHealer === healerId ? null : healerId);
  };

  return (
    <div className="card hover:shadow-brand-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-garamond font-semibold text-slate-800">
            {isNewUser ? 'Meet Your Future Healing Team' : 'Your Healing Team'}
          </h3>
          <p className="text-slate-600 text-sm italic mt-1">
            {isNewUser 
              ? 'These expert practitioners are ready to guide your wellness journey'
              : 'Your curated circle of care. You\'re never healing alone.'
            }
          </p>
        </div>
        <Link 
          to="/healers"
          className="text-sm text-teal-600 hover:text-teal-700 transition-colors flex items-center"
        >
          {isNewUser ? 'Browse All Healers' : 'View All Healers'}
          <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>

      {isNewUser && (
        <div className="mb-6 p-4 bg-gradient-to-br from-teal-50 to-rose-50 rounded-xl border border-teal-100">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center mr-3">
              <Star size={16} className="text-white" />
            </div>
            <h4 className="font-garamond font-semibold text-slate-800">Ready to Start?</h4>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Complete your wellness profile and book your first consultation to unlock personalized care from these expert healers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              to="/profile/edit"
              className="flex-1 flex items-center justify-center px-4 py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors"
            >
              <Users size={16} className="mr-2" />
              Complete Profile
            </Link>
            <Link 
              to="/talk-to-healer"
              className="flex-1 flex items-center justify-center px-4 py-2 bg-transparent border-2 border-teal-500 text-teal-600 font-medium rounded-lg hover:bg-teal-50 transition-colors"
            >
              <Calendar size={16} className="mr-2" />
              Book Session
            </Link>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {healingTeam.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-slate-100 rounded-xl overflow-hidden hover:border-teal-200 shadow-brand hover:shadow-brand-md transition-all"
          >
            {/* Collapsed View - Always Visible */}
            <div 
              className="p-4 cursor-pointer bg-gradient-to-br from-teal-50/30 via-white to-rose-50/30"
              onClick={() => toggleHealer(member.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className={`w-14 h-14 rounded-full object-cover border-2 shadow-brand ${
                        member.status === 'offline' ? 'grayscale border-slate-200' : 'border-white'
                      } ${member.status === 'online' ? 'ring-2 ring-teal-200 ring-offset-2' : ''}`}
                    />
                    <span 
                      className={`absolute bottom-0 right-0 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-white`}
                    />
                  </div>

                  <div className="ml-4 flex-1">
                    <div className="flex items-center mb-1">
                      <h4 className="font-garamond text-lg font-semibold text-slate-800">
                        {member.fullName === 'Dr. Aparna Albert' ? `Dr. ${member.name}` : member.name}
                      </h4>
                      <span className="ml-2 text-xs bg-teal-50 text-teal-600 px-2 py-1 rounded-full border border-teal-200">
                        {member.experience}+ years
                      </span>
                    </div>
                    <p className="text-sm font-medium text-teal-600">{member.role}</p>
                    <p className="text-xs text-slate-500 italic mt-1">{member.quote}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {!isNewUser && (
                    <div className="text-right text-sm">
                      <div className="text-slate-600">
                        {isWithinTenMinutes(member.nextAppointmentTime) ? (
                          <span className="text-teal-600 font-medium">Starting soon</span>
                        ) : (
                          `Next: ${member.nextAppointmentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                        )}
                      </div>
                    </div>
                  )}
                  
                  <motion.div
                    animate={{ rotate: expandedHealer === member.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={20} className="text-slate-400" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Expanded View - Detailed Information */}
            <AnimatePresence>
              {expandedHealer === member.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-6 bg-white border-t border-slate-100">
                    {/* Professional Summary */}
                    <div className="mb-6">
                      <h5 className="font-medium text-slate-800 mb-2 flex items-center">
                        <FileText size={16} className="mr-2 text-teal-600" />
                        Professional Summary
                      </h5>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {member.biography.substring(0, 200)}...
                      </p>
                    </div>

                    {/* Key Information Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Specialties */}
                      <div>
                        <h5 className="font-medium text-slate-800 mb-3 flex items-center">
                          <Award size={16} className="mr-2 text-teal-600" />
                          Key Specialties
                        </h5>
                        <div className="space-y-2">
                          {member.specialties.slice(0, 4).map((specialty, index) => (
                            <div key={index} className="flex items-center text-sm">
                              <div className="w-2 h-2 rounded-full bg-teal-500 mr-2" />
                              <span className="text-slate-600">{specialty}</span>
                            </div>
                          ))}
                          {member.specialties.length > 4 && (
                            <div className="text-xs text-teal-600">
                              +{member.specialties.length - 4} more specialties
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Professional Details */}
                      <div>
                        <h5 className="font-medium text-slate-800 mb-3 flex items-center">
                          <Calendar size={16} className="mr-2 text-teal-600" />
                          Professional Details
                        </h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Star size={14} className="mr-2 text-yellow-400" />
                            <span className="text-slate-600">{member.rating} rating ({member.consultations}+ consultations)</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin size={14} className="mr-2 text-slate-400" />
                            <span className="text-slate-600">{member.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Languages size={14} className="mr-2 text-slate-400" />
                            <span className="text-slate-600">{member.languages.slice(0, 3).join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center space-x-4 text-sm text-slate-600">
                        {!isNewUser && member.pastSessionsCount > 0 && (
                          <div className="flex items-center">
                            <Check size={12} className="mr-1 text-teal-500" />
                            <span>{member.pastSessionsCount} sessions completed</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {!isNewUser && isWithinTenMinutes(member.nextAppointmentTime) && (
                          <button className="btn-primary text-xs py-2 px-4 flex items-center">
                            <Video size={12} className="mr-1" />
                            Join Live
                          </button>
                        )}
                        <Link
                          to={`/healers/${member.id}`}
                          className="text-xs text-teal-600 hover:text-teal-700 transition-colors px-3 py-2 border border-teal-200 rounded-lg hover:bg-teal-50"
                        >
                          View Profile
                        </Link>
                        <Link
                          to={isNewUser ? '/talk-to-healer' : `/book-consultation/${member.id}`}
                          className="btn-primary text-xs py-2 px-4"
                        >
                          {isNewUser ? 'Learn More' : 'Book Session'}
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      
      {/* Show all healers CTA */}
      <div className="mt-6 pt-6 border-t border-slate-100">
        <Link 
          to="/healers"
          className="flex items-center justify-center w-full p-4 bg-gradient-to-br from-teal-50 to-rose-50 rounded-xl border border-teal-100 hover:border-teal-200 transition-all group"
        >
          <Plus size={20} className="text-teal-600 mr-2 group-hover:scale-110 transition-transform" />
          <span className="text-teal-600 font-medium">
            {isNewUser ? 'Explore All Our Expert Healers' : 'Discover More Healing Experts'}
          </span>
          <ArrowRight size={16} className="text-teal-600 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default HealingTeamBoard;