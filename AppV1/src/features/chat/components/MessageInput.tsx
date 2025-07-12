// features/chat/MessageInput.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Paperclip, Send, Image, FileText, Smile, Mic, Camera } from 'lucide-react';

interface MessageInputProps {
  isGroup?: boolean;
  onSend?: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ isGroup = false }) => {
  const [newMessage, setNewMessage] = useState('');
  const [showAttachOptions, setShowAttachOptions] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  
  const emojis = ['😊', '🙏', '❤️', '👍', '✨', '🌿', '🧘‍♀️', '💪', '🌟', '🙌'];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // In a real app, this would send the message
    setNewMessage('');
  };

  const handleAttachFile = (type: 'image' | 'document') => {
    setShowAttachOptions(false);
    setNewMessage(prev => prev + (type === 'image' 
      ? "I've shared an image with you." 
      : "I've shared a document with you."));
  };

  const handleEmojiClick = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojis(false);
  };

  return (
    <div className={`bg-white p-4 border-t ${isGroup ? '' : 'border-gray-100'}`}>
      <div className="flex items-end space-x-3">
        {/* Attachment Button */}
        <div className="relative">
          <button 
            onClick={() => setShowAttachOptions(!showAttachOptions)}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none text-charcoal-light transition-colors"
          >
            <Paperclip size={20} />
          </button>
          
          <AnimatePresence>
            {showAttachOptions && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden min-w-[200px]"
              >
                <button 
                  onClick={() => handleAttachFile('image')}
                  className="flex items-center w-full p-4 hover:bg-gray-50 text-left transition-colors"
                >
                  <Image size={20} className="mr-3 text-teal" />
                  <div>
                    <div className="font-medium">Photo</div>
                    <div className="text-xs text-charcoal-light">Share an image</div>
                  </div>
                </button>
                <button 
                  onClick={() => handleAttachFile('document')}
                  className="flex items-center w-full p-4 hover:bg-gray-50 text-left transition-colors"
                >
                  <FileText size={20} className="mr-3 text-teal" />
                  <div>
                    <div className="font-medium">Document</div>
                    <div className="text-xs text-charcoal-light">Share a file</div>
                  </div>
                </button>
                {!isGroup && (
                  <button 
                    onClick={() => setShowAttachOptions(false)}
                    className="flex items-center w-full p-4 hover:bg-gray-50 text-left transition-colors"
                  >
                    <Camera size={20} className="mr-3 text-teal" />
                    <div>
                      <div className="font-medium">Camera</div>
                      <div className="text-xs text-charcoal-light">Take a photo</div>
                    </div>
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Voice Message Button */}
        <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none text-charcoal-light transition-colors">
          <Mic size={20} />
        </button>
        
        {/* Message Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={isGroup ? "Share with your healing team..." : "Type your message..."}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
          />
          
          {/* Emoji Button */}
          <button
            onClick={() => setShowEmojis(!showEmojis)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            <Smile size={18} className="text-charcoal-light" />
          </button>

          <AnimatePresence>
            {showEmojis && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-200 p-4"
              >
                <div className="grid grid-cols-5 gap-2">
                  {emojis.map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => handleEmojiClick(emoji)}
                      className="text-2xl p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Send Button */}
        <button 
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          className={`p-3 rounded-full focus:outline-none transition-all ${
            newMessage.trim() 
              ? 'bg-teal text-white hover:bg-teal-dark shadow-lg hover:shadow-xl' 
              : 'bg-gray-100 text-charcoal-light cursor-not-allowed'
          }`}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;