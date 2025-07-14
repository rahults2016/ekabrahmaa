// features/chat/HealerProfileHeader.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Phone, Video, MoreVertical, Award, Star, 
  MessageSquare, MapPin, Stethoscope, Languages, Calendar, 
  Shield
} from 'lucide-react';
import type { ChatHealer } from '@/features/dashboard/Home/components/chat/chatData';
import { getHealerById } from './chatData';

interface HealerProfileHeaderProps {
  healer: ChatHealer;
  onBack: () => void;
}

const HealerProfileHeader: React.FC<HealerProfileHeaderProps> = ({ healer, onBack }) => {
  const [showProfile, setShowProfile] = useState(false);
  const detailedHealer = getHealerById(healer.id);

  const formatLastSeen = (date: Date): string => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const handleVideoCall = () => {
    alert('Video call feature would be integrated here');
  };

  const handleVoiceCall = () => {
    alert('Voice call feature would be integrated here');
  };

  return (
    <div className="bg-white border-b shadow-sm">
      {/* Main Header */}
      <div className="flex items-center p-4">
        <button 
          onClick={onBack}
          className="mr-3 p-2 rounded-full hover:bg-gray-100 md:hidden"
        >
          <ArrowLeft size={20} className="text-charcoal" />
        </button>
        
        <div className="relative">
          <img 
            src={healer.avatar} 
            alt={healer.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-teal"
          />
          <span 
            className={`absolute bottom-0 right-0 w-3 h-3 ${healer.online ? 'bg-green-500' : 'bg-gray-400'} rounded-full border-2 border-white`}
          />
        </div>
        
        <div className="ml-4 flex-1">
          <div className="flex items-center">
            <h3 className="font-garamond text-lg font-semibold text-charcoal-dark">
              Dr. {healer.name}
            </h3>
            {detailedHealer?.verified && (
              <Shield size={16} className="ml-2 text-teal" />
            )}
          </div>
          <p className="text-sm text-teal">{healer.role}</p>
          <p className="text-xs text-charcoal-light">
            {healer.online ? 'Online now' : `Last seen ${formatLastSeen(new Date())}`}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleVoiceCall}
            className="p-3 rounded-full bg-teal-light/20 text-teal hover:bg-teal-light/30 transition-colors"
            title="Voice Call"
          >
            <Phone size={20} />
          </button>
          <button 
            onClick={handleVideoCall}
            className="p-3 rounded-full bg-teal-light/20 text-teal hover:bg-teal-light/30 transition-colors"
            title="Video Call"
          >
            <Video size={20} />
          </button>
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
            title="View Profile"
          >
            <MoreVertical size={20} className="text-charcoal-light" />
          </button>
        </div>
      </div>

      {/* Collapsible Detailed Profile */}
      <AnimatePresence>
        {showProfile && detailedHealer && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t bg-gray-50"
          >
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Professional Info */}
                <div>
                  <h4 className="font-semibold text-charcoal-dark mb-3 flex items-center">
                    <Award size={16} className="mr-2 text-teal" />
                    Professional Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-2 text-charcoal-light" />
                      <span>{detailedHealer.experience}+ years experience</span>
                    </div>
                    <div className="flex items-center">
                      <Star size={14} className="mr-2 text-gold" />
                      <span>{detailedHealer.rating} rating ({detailedHealer.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare size={14} className="mr-2 text-charcoal-light" />
                      <span>{detailedHealer.consultations}+ consultations</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-2 text-charcoal-light" />
                      <span>{detailedHealer.location}</span>
                    </div>
                  </div>
                </div>

                {/* Specialties & Languages */}
                <div>
                  <h4 className="font-semibold text-charcoal-dark mb-3 flex items-center">
                    <Stethoscope size={16} className="mr-2 text-teal" />
                    Expertise
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-charcoal-light mb-1">Specialties</p>
                      <div className="flex flex-wrap gap-1">
                        {detailedHealer.specialties.slice(0, 3).map((specialty, idx) => (
                          <span key={idx} className="px-2 py-1 bg-teal-light/20 text-teal text-xs rounded-full">
                            {specialty}
                          </span>
                        ))}
                        {detailedHealer.specialties.length > 3 && (
                          <span className="px-2 py-1 bg-gray-200 text-charcoal text-xs rounded-full">
                            +{detailedHealer.specialties.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-charcoal-light mb-1 flex items-center">
                        <Languages size={12} className="mr-1" />
                        Languages
                      </p>
                      <p className="text-sm">{detailedHealer.languages.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6">
                <h4 className="font-semibold text-charcoal-dark mb-2">About</h4>
                <p className="text-sm text-charcoal-light leading-relaxed">
                  {detailedHealer.biography.substring(0, 200)}...
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex space-x-3">
                <button className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-dark transition-colors">
                  Book Consultation
                </button>
                <button className="px-4 py-2 border border-teal text-teal rounded-lg hover:bg-teal-light/10 transition-colors">
                  View Full Profile
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HealerProfileHeader;