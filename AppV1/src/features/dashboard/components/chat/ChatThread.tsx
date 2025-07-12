import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatMessageTime } from '@/utils/dateUtils';
import { type Message, type ChatHealer } from './chatData';
import { CheckCheck, Check } from 'lucide-react';

interface ChatThreadProps {
  messages: Message[];
  isTyping: boolean;
  activeHealer: ChatHealer;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatThread: React.FC<ChatThreadProps> = ({ 
  messages, 
  isTyping, 
  activeHealer,
  messagesEndRef
}) => {
  // If no messages, show welcome message
  if (messages.length === 0) {
    return (
      <div className="flex-1 bg-ivory overflow-y-auto p-4 flex flex-col items-center justify-center text-center">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
          <img 
            src={activeHealer.avatar} 
            alt={activeHealer.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-teal mx-auto mb-4"
          />
          <h3 className="text-xl font-garamond font-semibold text-charcoal-dark mb-2">
            Dr. {activeHealer.name}
          </h3>
          <p className="text-sm text-teal mb-4">{activeHealer.role}</p>
          <p className="text-charcoal-light mb-6">
            {activeHealer.bio || `Welcome to your conversation with Dr. ${activeHealer.name}. Feel free to ask any questions about your wellness journey.`}
          </p>
          <p className="text-xs text-charcoal-light">
            Your conversations are private and secure
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-ivory-light overflow-y-auto p-4">
      <div className="space-y-4">
        {messages.map((message) => {
          const isUser = message.senderId === 'user';
          
          return (
            <div 
              key={message.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex flex-col max-w-[75%]">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-lg px-4 py-2 ${
                    isUser 
                      ? 'bg-teal text-white rounded-br-none' 
                      : 'bg-pink-light text-charcoal-dark rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </motion.div>
                
                <div className={`flex mt-1 text-xs text-charcoal-light ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <span>{formatMessageTime(message.timestamp)}</span>
                  
                  {isUser && (
                    <span className="ml-1 flex items-center">
                      {message.status === 'sent' ? (
                        <Check size={12} />
                      ) : (
                        <CheckCheck size={12} />
                      )}
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
              <div className="bg-pink-light text-charcoal-dark rounded-lg rounded-bl-none px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-charcoal-light/50 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-charcoal-light/50 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-charcoal-light/50 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Invisible div to scroll to */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatThread;