import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Send, ArrowLeft, Paperclip, Image, FileText, Smile } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { formatMessageTime } from '../utils/dateUtils';

interface GroupMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole: string;
  text: string;
  timestamp: Date;
  attachment?: {
    type: 'image' | 'document';
    url: string;
    name: string;
  };
}

const emojis = ['😊', '🙏', '❤️', '👍', '✨', '🌿', '🧘‍♀️', '💪', '🌟', '🙌'];

const mockMessages: GroupMessage[] = [
  {
    id: '1',
    senderId: 'doc1', 
    senderName: 'Dr. Aparna Albert',
    senderAvatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150',
    senderRole: 'Ayurveda Doctor',
    text: 'Welcome to your healing journey! I\'ve reviewed your latest progress and I\'m impressed with your dedication.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60)
  },
  {
    id: '2',
    senderId: 'nut1',
    senderName: 'Shradha Kurup',
    senderAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    senderRole: 'Nutritionist',
    text: 'Your food journal shows great improvement in following the Pitta-pacifying diet. Keep it up!',
    timestamp: new Date(Date.now() - 1000 * 60 * 30)
  }
];

const GroupChat: React.FC = () => {
  const [messages, setMessages] = useState<GroupMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showAttachOptions, setShowAttachOptions] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: GroupMessage = {
      id: Date.now().toString(),
      senderId: user?.id || 'user',
      senderName: user?.name || 'Rebecca Johnson',
      senderAvatar: user?.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      senderRole: 'Patient',
      text: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate team response
    setIsTyping(true);
    setTimeout(() => {
      const response: GroupMessage = {
        id: (Date.now() + 1).toString(),
        senderId: 'doc1',
        senderName: 'Dr. Anjali Sharma',
        senderAvatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150',
        senderRole: 'Ayurveda Doctor',
        text: 'Thank you for sharing. I\'ll discuss this with the team and provide detailed recommendations in our next session.',
        timestamp: new Date()
      };
      setIsTyping(false);
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const handleAttachFile = (type: 'image' | 'document') => {
    setShowAttachOptions(false);
    // Simulate file attachment
    const attachment = type === 'image' 
      ? { type, url: 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=800', name: 'wellness-progress.jpg' }
      : { type, url: '#', name: 'health-report.pdf' };

    const message: GroupMessage = {
      id: Date.now().toString(),
      senderId: user?.id || 'user',
      senderName: user?.name || 'You',
      senderAvatar: user?.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      senderRole: 'Patient',
      text: `Shared ${type === 'image' ? 'an image' : 'a document'}: ${attachment.name}`,
      timestamp: new Date(),
      attachment
    };

    setMessages(prev => [...prev, message]);
  };

  const handleEmojiClick = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojis(false);
  };

  return (
    <div className="h-[calc(100vh-9rem)] md:h-[calc(100vh-7rem)] flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 border-b flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={20} className="text-charcoal" />
        </button>
        
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-teal-light/20 flex items-center justify-center mr-3">
            <Users size={20} className="text-teal" />
          </div>
          <div>
            <h2 className="font-medium text-lg">Healing Room</h2>
            <p className="text-sm text-charcoal-light">Your Care Team</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-ivory-light p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex max-w-[80%]">
                {message.senderId !== 'user' && (
                  <img 
                    src={message.senderAvatar}
                    alt={message.senderName}
                    className="w-8 h-8 rounded-full object-cover mr-2 mt-2"
                  />
                )}
                
                <div>
                  {message.senderId !== 'user' && (
                    <div className="mb-1">
                      <span className="font-medium text-sm">{message.senderName}</span>
                      <span className="text-xs text-teal ml-2">{message.senderRole}</span>
                    </div>
                  )}
                  
                  <div className={`rounded-lg px-4 py-2 ${
                    message.senderId === 'user'
                      ? 'bg-teal text-white'
                      : 'bg-white'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    {message.attachment && (
                      <div className="mt-2">
                        {message.attachment.type === 'image' ? (
                          <img 
                            src={message.attachment.url} 
                            alt={message.attachment.name}
                            className="rounded-lg max-w-sm"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                            <FileText size={16} className="text-teal" />
                            <span className="text-sm">{message.attachment.name}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-1 text-xs text-charcoal-light">
                    {formatMessageTime(message.timestamp)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <div className="flex items-center space-x-2 text-charcoal-light">
              <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white p-4 border-t">
        <div className="max-w-3xl mx-auto flex items-center">
          <div className="relative mr-2">
            <button
              onClick={() => setShowAttachOptions(!showAttachOptions)}
              className="p-2 rounded-full hover:bg-gray-100 text-charcoal-light"
            >
              <Paperclip size={20} />
            </button>
            
            {showAttachOptions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
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
          </div>
          
          <div className="relative mr-2">
            <button
              onClick={() => setShowEmojis(!showEmojis)}
              className="p-2 rounded-full hover:bg-gray-100 text-charcoal-light"
            >
              <Smile size={20} />
            </button>
            
            {showEmojis && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg p-2"
              >
                <div className="flex flex-wrap gap-2">
                  {emojis.map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => handleEmojiClick(emoji)}
                      className="text-xl hover:bg-gray-100 p-1 rounded"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
          
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`ml-2 p-2 rounded-full ${
              newMessage.trim() ? 'bg-teal text-white' : 'bg-gray-100 text-charcoal-light'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;