import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Stethoscope, Users, Heart, Brain, Utensils, Activity, 
  Star, Calendar, MessageCircle, Video, ChevronDown, 
  Award, MapPin, Languages, X 
} from 'lucide-react';
import { detailedHealers } from '../../../data/dashboard/healers';

interface HealingTeamButtonsProps {
  showInitially?: boolean;
  maxTeamMembers?: number;
}

const HealingTeamButtons: React.FC<HealingTeamButtonsProps> = ({ 
  showInitially = false, 
  maxTeamMembers = 4 
}) => {
  const [isVisible, setIsVisible] = useState(showInitially);
  const [selectedHealer, setSelectedHealer] = useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  // Select a subset of healers for the team
  const teamMembers = detailedHealers.slice(0, maxTeamMembers);

  const getSpecialtyIcon = (role: string) => {
    if (role.includes('Ayurveda')) return Stethoscope;
    if (role.includes('Nutrition')) return Utensils;
    if (role.includes('Yoga') || role.includes('Movement')) return Activity;
    if (role.includes('Psychologist') || role.includes('Mental')) return Brain;
    return Heart;
  };

  const getSpecialtyColor = (role: string) => {
    if (role.includes('Ayurveda')) return 'from-teal-500 to-teal-600';
    if (role.includes('Nutrition')) return 'from-rose-500 to-rose-600';
    if (role.includes('Yoga') || role.includes('Movement')) return 'from-purple-500 to-purple-600';
    if (role.includes('Psychologist') || role.includes('Mental')) return 'from-blue-500 to-blue-600';
    return 'from-green-500 to-green-600';
  };

  const handleButtonClick = (healerId: string) => {
    if (selectedHealer === healerId) {
      setSelectedHealer(null);
    } else {
      setSelectedHealer(healerId);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent, healerId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleButtonClick(healerId);
    }
  };

  const selectedHealerData = selectedHealer 
    ? teamMembers.find(h => h.id === selectedHealer) 
    : null;

  return (
    <div className="w-full">
      {/* Trigger Button */}
      {!isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-8"
        >
          <button
            onClick={() => setIsVisible(true)}
            className="px-8 py-4 bg-gradient-to-r from-teal-500 to-rose-500 text-white font-garamond font-semibold text-lg rounded-full shadow-brand-lg hover:shadow-brand-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-300"
            aria-label="Show Your Healing Team"
          >
            <div className="flex items-center">
              <Users size={24} className="mr-3" />
              Your Healing Team
              <ChevronDown size={20} className="ml-3" />
            </div>
          </button>
        </motion.div>
      )}

      {/* Team Buttons */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-6">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <h3 className="text-2xl font-garamond font-semibold text-slate-800 mb-2">
                  Your Healing Team
                </h3>
                <p className="text-slate-600">
                  Click on any team member to learn more about their expertise
                </p>
              </motion.div>

              {/* Circular Buttons Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center gap-6 mb-8"
              >
                {teamMembers.map((healer, index) => {
                  const SpecialtyIcon = getSpecialtyIcon(healer.title);
                  const isSelected = selectedHealer === healer.id;
                  const isHovered = hoveredButton === healer.id;

                  return (
                    <motion.div
                      key={healer.id}
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: 0.6 + index * 0.1,
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                      }}
                      className="relative"
                    >
                      <button
                        onClick={() => handleButtonClick(healer.id)}
                        onKeyDown={(e) => handleKeyPress(e, healer.id)}
                        onMouseEnter={() => setHoveredButton(healer.id)}
                        onMouseLeave={() => setHoveredButton(null)}
                        className={`
                          relative w-24 h-24 sm:w-28 sm:h-28 rounded-full 
                          bg-gradient-to-br ${getSpecialtyColor(healer.title)}
                          shadow-brand-lg hover:shadow-brand-xl
                          transform transition-all duration-300
                          focus:outline-none focus:ring-4 focus:ring-teal-300 focus:ring-offset-2
                          ${isSelected ? 'scale-110 ring-4 ring-white ring-offset-2' : 'hover:scale-105'}
                        `}
                        aria-label={`View details for ${healer.fullName}, ${healer.title}`}
                        aria-expanded={isSelected}
                      >
                        {/* Background Image */}
                        <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-white/20">
                          <img
                            src={healer.avatar}
                            alt={healer.fullName}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>

                        {/* Icon Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            animate={{ 
                              scale: isHovered ? 1.2 : 1,
                              rotate: isSelected ? 360 : 0
                            }}
                            transition={{ duration: 0.3 }}
                            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                          >
                            <SpecialtyIcon size={16} className="text-white" />
                          </motion.div>
                        </div>

                        {/* Pulse effect when selected */}
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 1, opacity: 1 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className={`absolute inset-0 rounded-full bg-gradient-to-br ${getSpecialtyColor(healer.title)}`}
                          />
                        )}
                      </button>

                      {/* Name Label */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="mt-3 text-center"
                      >
                        <div className="text-sm font-semibold text-slate-800">
                          Dr. {healer.preferredName}
                        </div>
                        <div className="text-xs text-slate-600 max-w-20 mx-auto truncate">
                          {healer.title.split(' ').slice(0, 2).join(' ')}
                        </div>
                      </motion.div>

                      {/* Hover Tooltip */}
                      <AnimatePresence>
                        {isHovered && !isSelected && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10"
                          >
                            <div className="bg-slate-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                              <div className="font-medium">{healer.fullName}</div>
                              <div className="text-slate-300">{healer.title}</div>
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2">
                                <div className="border-4 border-transparent border-b-slate-800"></div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Selected Healer Details */}
              <AnimatePresence mode="wait">
                {selectedHealerData && (
                  <motion.div
                    key={selectedHealerData.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="bg-white rounded-2xl shadow-brand-xl border border-slate-100 overflow-hidden"
                  >
                    {/* Header */}
                    <div className={`bg-gradient-to-r ${getSpecialtyColor(selectedHealerData.title)} p-6 text-white relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                        <div className="w-full h-full rounded-full bg-white transform translate-x-8 -translate-y-8"></div>
                      </div>
                      
                      <div className="relative flex items-start justify-between">
                        <div className="flex items-center">
                          <img
                            src={selectedHealerData.avatar}
                            alt={selectedHealerData.fullName}
                            className="w-20 h-20 rounded-full object-cover border-4 border-white/20 mr-4"
                          />
                          <div>
                            <h4 className="text-2xl font-garamond font-semibold mb-1">
                              {selectedHealerData.fullName}
                            </h4>
                            <p className="text-white/90 mb-2">{selectedHealerData.title}</p>
                            <div className="flex items-center text-sm text-white/80">
                              <Star size={14} className="mr-1 fill-current" />
                              <span>{selectedHealerData.rating}</span>
                              <span className="mx-2">•</span>
                              <span>{selectedHealerData.experience}+ years</span>
                              <span className="mx-2">•</span>
                              <span>{selectedHealerData.consultations}+ consultations</span>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => setSelectedHealer(null)}
                          className="p-2 hover:bg-white/20 rounded-full transition-colors"
                          aria-label="Close healer details"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                          {/* Biography */}
                          <div>
                            <h5 className="font-semibold text-slate-800 mb-3 flex items-center">
                              <Heart size={16} className="mr-2 text-rose-500" />
                              About
                            </h5>
                            <p className="text-slate-600 text-sm leading-relaxed">
                              {selectedHealerData.biography.substring(0, 300)}...
                            </p>
                          </div>

                          {/* Key Specialties */}
                          <div>
                            <h5 className="font-semibold text-slate-800 mb-3 flex items-center">
                              <Award size={16} className="mr-2 text-teal-500" />
                              Key Specialties
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {selectedHealerData.specialties.slice(0, 4).map((specialty, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs"
                                >
                                  {specialty}
                                </span>
                              ))}
                              {selectedHealerData.specialties.length > 4 && (
                                <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs">
                                  +{selectedHealerData.specialties.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                          {/* Contact Info */}
                          <div>
                            <h5 className="font-semibold text-slate-800 mb-3 flex items-center">
                              <MapPin size={16} className="mr-2 text-blue-500" />
                              Practice Details
                            </h5>
                            <div className="space-y-2 text-sm text-slate-600">
                              <div className="flex items-center">
                                <MapPin size={14} className="mr-2 text-slate-400" />
                                <span>{selectedHealerData.location}</span>
                              </div>
                              <div className="flex items-center">
                                <Languages size={14} className="mr-2 text-slate-400" />
                                <span>{selectedHealerData.languages.slice(0, 3).join(', ')}</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar size={14} className="mr-2 text-slate-400" />
                                <span>{selectedHealerData.available ? 'Available now' : selectedHealerData.nextSlot}</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="space-y-3">
                            <button className="w-full flex items-center justify-center px-4 py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors">
                              <Calendar size={16} className="mr-2" />
                              Book Consultation
                            </button>
                            <div className="grid grid-cols-2 gap-3">
                              <button className="flex items-center justify-center px-4 py-2 border-2 border-slate-200 text-slate-700 font-medium rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors">
                                <MessageCircle size={16} className="mr-2" />
                                Message
                              </button>
                              <button className="flex items-center justify-center px-4 py-2 border-2 border-slate-200 text-slate-700 font-medium rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors">
                                <Video size={16} className="mr-2" />
                                Video Call
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hide Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center"
              >
                <button
                  onClick={() => {
                    setIsVisible(false);
                    setSelectedHealer(null);
                  }}
                  className="px-6 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Hide Team
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HealingTeamButtons;