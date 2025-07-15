// features/chat/HealingRoomMessages.tsx
import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookmarkPlus, MoreVertical, Copy, Archive } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockGroupMessages } from './chatData';


const HealingRoomMessages: React.FC = () => {
  const { user } = useAuth();
  const [groupMessages] = React.useState(mockGroupMessages);
  const [isGroupTyping] = React.useState(false);
  const [showMessageActions, setShowMessageActions] = React.useState<string | null>(null);
  const [savedMessages, setSavedMessages] = React.useState<Set<string>>(new Set());
  const groupMessagesEndRef = useRef<HTMLDivElement>(null);

  const formatMessageTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'prescription': return 'bg-pink-light/20 text-pink';
      case 'advice': return 'bg-teal-light/20 text-teal';
      case 'general': return 'bg-gray-100 text-charcoal';
      default: return 'bg-gray-100 text-charcoal';
    }
  };

  const handleSaveToMedicalRecords = (messageId: string) => {
    setSavedMessages(prev => new Set([...prev, messageId]));
    setShowMessageActions(null);
  };

  React.useEffect(() => {
    groupMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [groupMessages]);

  return (
    <div className="flex-1 overflow-y-auto bg-ivory-light p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {groupMessages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.senderId === (user?.id || 'user') ? 'justify-end' : 'justify-start'} group`}
          >
            <div className="flex max-w-[80%]">
              {message.senderId !== (user?.id || 'user') && (
                <div className="mr-3">
                  <img 
                    src={message.senderAvatar}
                    alt={message.senderName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                </div>
              )}
              
              <div className="flex-1">
                {message.senderId !== (user?.id || 'user') && (
                  <div className="mb-2 flex items-center space-x-2">
                    <span className="font-medium text-sm text-charcoal-dark">{message.senderName}</span>
                    <span className="text-xs text-teal bg-teal-light/20 px-2 py-1 rounded-full">{message.senderRole}</span>
                    {message.category && (
                      <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(message.category)}`}>
                        {message.category}
                      </span>
                    )}
                  </div>
                )}
                
                <div className={`relative rounded-xl px-4 py-3 ${
                  message.senderId === (user?.id || 'user')
                    ? 'bg-teal text-white'
                    : 'bg-white shadow-sm border border-gray-100'
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  
                  {/* Quick Reactions */}
                  <div className="flex items-center space-x-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {['👍', '❤️', '🙏', '✨', '💯'].map(emoji => (
                      <button
                        key={emoji}
                        className="text-xs p-1 hover:bg-white/20 rounded transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>

                  {/* Message Actions */}
                  <div className={`absolute top-2 ${message.senderId === (user?.id || 'user') ? 'left-2' : 'right-2'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    <div className="relative">
                      <button
                        onClick={() => setShowMessageActions(showMessageActions === message.id ? null : message.id)}
                        className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                      >
                        <MoreVertical size={14} />
                      </button>
                      
                      <AnimatePresence>
                        {showMessageActions === message.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-10 min-w-[160px]"
                          >
                            <button
                              onClick={() => handleSaveToMedicalRecords(message.id)}
                              className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center text-sm"
                            >
                              <BookmarkPlus size={14} className="mr-2 text-teal" />
                              Save to Records
                            </button>
                            <button
                              onClick={() => navigator.clipboard.writeText(message.text)}
                              className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center text-sm"
                            >
                              <Copy size={14} className="mr-2 text-charcoal-light" />
                              Copy Text
                            </button>
                            <button
                              onClick={() => setShowMessageActions(null)}
                              className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center text-sm"
                            >
                              <Archive size={14} className="mr-2 text-charcoal-light" />
                              Archive
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
                
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs text-charcoal-light">
                    {formatMessageTime(message.timestamp)}
                  </span>
                  
                  {savedMessages.has(message.id) && (
                    <span className="flex items-center text-teal text-xs">
                      <BookmarkPlus size={12} className="mr-1" />
                      Saved
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        
        {isGroupTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-3 text-charcoal-light"
          >
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="text-sm">Team is typing...</span>
          </motion.div>
        )}
        
        <div ref={groupMessagesEndRef} />
      </div>
    </div>
  );
};

export default HealingRoomMessages;