import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from '../utils/dateUtils';
import { ChatHealer } from './chatData';

interface ChatListProps {
  healers: ChatHealer[];
  onSelectHealer: (healer: ChatHealer) => void;
}

const ChatList: React.FC<ChatListProps> = ({ healers, onSelectHealer }) => {
  // Animation variants for staggered list
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
        duration: 0.3
      }
    }
  };

  if (healers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="w-16 h-16 rounded-full bg-teal-light/20 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg\" className="h-8 w-8 text-teal\" viewBox="0 0 24 24\" fill="none\" stroke="currentColor\" strokeWidth="2\" strokeLinecap="round\" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-charcoal-dark mb-2">No healers found</h3>
        <p className="text-charcoal-light">
          Try adjusting your search or check back later
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      className="flex-1 overflow-y-auto space-y-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {healers.map((healer) => (
        <motion.div
          key={healer.id}
          variants={itemVariants}
          className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onSelectHealer(healer)}
        >
          <div className="flex items-start">
            <div className="relative">
              <img 
                src={healer.avatar} 
                alt={healer.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-teal"
              />
              {healer.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              )}
            </div>
            
            <div className="ml-3 flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-charcoal-dark">Dr. {healer.name}</h3>
                <span className="text-xs text-charcoal-light">
                  {formatDistanceToNow(healer.lastMessageTime)}
                </span>
              </div>
              
              <p className="text-xs text-teal mt-0.5">{healer.role}</p>
              
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-charcoal-light truncate max-w-[200px]">
                  {healer.lastMessage}
                </p>
                
                {healer.unread > 0 && (
                  <span className="bg-teal text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {healer.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ChatList;