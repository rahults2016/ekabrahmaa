// features/chat/MessageList.tsx
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CheckCheck, BookmarkPlus, MoreVertical, Copy, Pin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { generateMockMessages } from './chatData';


interface MessageListProps {
  healerId: string;
}

const MessageList: React.FC<MessageListProps> = ({ healerId }) => {
  const { user } = useAuth();
  const [messages] = React.useState(generateMockMessages(healerId));
  const [isTyping] = React.useState(false);
  const [showMessageActions, setShowMessageActions] = React.useState<string | null>(null);
  const [savedMessages, setSavedMessages] = React.useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const formatMessageTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleSaveToMedicalRecords = (messageId: string) => {
    setSavedMessages(prev => new Set([...prev, messageId]));
    setShowMessageActions(null);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto bg-ivory-light p-4">
      <div className="space-y-4">
        {messages.map((message) => {
          const isUser = message.senderId === (user?.id || 'user');
          
          return (
            <div 
              key={message.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex flex-col max-w-[75%] group">
                <div
                  className={`relative rounded-xl px-4 py-3 ${
                    isUser 
                      ? 'bg-teal text-white' 
                      : 'bg-white text-charcoal-dark shadow-sm border border-gray-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                  
                  {/* Message Actions */}
                  <div className={`absolute top-2 ${isUser ? 'left-2' : 'right-2'} opacity-0 group-hover:opacity-100 transition-opacity`}>
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
                              <Pin size={14} className="mr-2 text-charcoal-light" />
                              Pin Message
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
                
                <div className={`flex mt-1 text-xs text-charcoal-light ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <span>{formatMessageTime(message.timestamp)}</span>
                  
                  {isUser && (
                    <span className="ml-2 flex items-center">
                      {message.status === 'sent' ? (
                        <Check size={12} />
                      ) : (
                        <CheckCheck size={12} className="text-teal" />
                      )}
                    </span>
                  )}
                  
                  {savedMessages.has(message.id) && (
                    <span className="ml-2 flex items-center text-teal">
                      <BookmarkPlus size={12} />
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white text-charcoal-dark rounded-xl px-4 py-3 shadow-sm border border-gray-100">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-charcoal-light/50 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-charcoal-light/50 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-charcoal-light/50 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;