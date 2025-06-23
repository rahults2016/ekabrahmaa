import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Paperclip, Send, Image, FileText, Moon, Circle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ChatList from './ChatList';
import ChatThread from './ChatThread';
import { mockHealers } from './chatData';

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'online':
      return <Circle size={8} className="text-green-500 fill-current" />;
    case 'dnd':
      return <Moon size={8} className="text-pink" />;
    default:
      return <Circle size={8} className="text-gray-400 fill-current" />;
  }
};

const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHealer, setActiveHealer] = useState(mockHealers[0]);
  const [showAttachOptions, setShowAttachOptions] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // Handle sending message
    setNewMessage('');
  };

  const handleAttachFile = (type: 'image' | 'document') => {
    setShowAttachOptions(false);
    // Handle file attachment
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-20 md:bottom-6 right-6 z-50 w-14 h-14 bg-teal rounded-full shadow-xl flex items-center justify-center hover:bg-teal-dark transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal"
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : activeHealer ? (
          <div className="relative">
            <div className="relative w-10 h-10">
              <img 
                src={activeHealer.avatar} 
                alt={activeHealer.name}
                className="w-full h-full rounded-full object-cover border-2 border-white"
              />
              <div className="absolute -bottom-1 -right-1">
                {getStatusIcon(activeHealer.status)}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex -space-x-2">
            {mockHealers.slice(0, 3).map((healer) => (
              <div key={healer.id} className="relative w-6 h-6 first:z-30 last:z-10">
                <img 
                  src={healer.avatar} 
                  alt={healer.name}
                  className="w-full h-full rounded-full object-cover border-2 border-white"
                />
              </div>
            ))}
          </div>
        )}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-36 md:bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-10rem)] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b">
              <div className="flex items-center">
                <h2 className="text-xl font-garamond font-semibold text-charcoal-dark">
                  Your Healing Team
                </h2>
                <div className="ml-auto">
                  <button 
                    onClick={toggleChat}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <X size={20} className="text-charcoal-light" />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto">
              {activeHealer ? (
                <ChatThread
                  messages={[]}
                  isTyping={false}
                  activeHealer={activeHealer}
                  messagesEndRef={null}
                />
              ) : (
                <ChatList 
                  healers={mockHealers} 
                  onSelectHealer={setActiveHealer} 
                />
              )}
            </div>

            {/* Input Area */}
            {activeHealer && <div className="p-3 border-t bg-white">
              <div className="flex items-center">
                <div className="relative">
                  <button
                    onClick={() => setShowAttachOptions(!showAttachOptions)}
                    className="p-2 rounded-full hover:bg-gray-100 text-charcoal-light"
                  >
                    <Paperclip size={20} />
                  </button>

                  {/* Attachment Options */}
                  <AnimatePresence>
                    {showAttachOptions && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg overflow-hidden"
                      >
                        <button
                          onClick={() => handleAttachFile('image')}
                          className="flex items-center w-full p-3 hover:bg-gray-50"
                        >
                          <Image size={18} className="mr-2 text-teal" />
                          <span>Image</span>
                        </button>
                        <button
                          onClick={() => handleAttachFile('document')}
                          className="flex items-center w-full p-3 hover:bg-gray-50"
                        >
                          <FileText size={18} className="mr-2 text-teal" />
                          <span>Document</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 mx-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                />

                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className={`p-2 rounded-full ${
                    newMessage.trim()
                      ? 'bg-teal text-white'
                      : 'bg-gray-100 text-charcoal-light'
                  }`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChat;