import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Paperclip, Send, Image, FileText, MoreVertical, ArrowLeft, 
  Check, CheckCheck, Users, Smile, Moon, Video, Phone, Star, Globe,
  Calendar, Award, BookmarkPlus, Filter, Download, Settings, ChevronDown,
  ChevronUp, MapPin, Languages, Clock, Shield, Heart, Archive, Pin,
  Mic, Camera, Stethoscope, User, MessageSquare, AlertCircle, Copy
} from 'lucide-react';
import ChatList from '../components/chat/ChatList';
import { useAuth } from '../contexts/AuthContext';
import { Message, ChatHealer, mockHealers, generateMockMessages } from '../components/chat/chatData';
import { getHealerById } from '../data/healers';

interface GroupMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole: string;
  text: string;
  timestamp: Date;
  category?: 'prescription' | 'advice' | 'general';
  saved?: boolean;
  attachment?: {
    type: 'image' | 'document';
    url: string;
    name: string;
  };
}

interface QuickReaction {
  emoji: string;
  count: number;
  users: string[];
}

const mockGroupMessages: GroupMessage[] = [
  {
    id: '1',
    senderId: 'doc1', 
    senderName: 'Dr. Aparna Albert',
    senderAvatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150',
    senderRole: 'Ayurveda Doctor',
    text: 'Welcome to your healing journey! I\'ve reviewed your latest progress and I\'m impressed with your dedication.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    category: 'advice'
  },
  {
    id: '2',
    senderId: 'nut1',
    senderName: 'Shradha Kurup',
    senderAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    senderRole: 'Nutritionist',
    text: 'Your food journal shows great improvement in following the Pitta-pacifying diet. Keep it up!',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    category: 'advice'
  },
  {
    id: '3',
    senderId: 'user',
    senderName: 'You',
    senderAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    senderRole: 'Patient',
    text: 'Thank you both! I\'m feeling much more balanced lately. The morning routine has really helped.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    category: 'general'
  }
];

const emojis = ['😊', '🙏', '❤️', '👍', '✨', '🌿', '🧘‍♀️', '💪', '🌟', '🙌'];
const quickReactions = ['👍', '❤️', '🙏', '✨', '💯'];

const Chat: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'healers' | 'healing-room'>('healers');
  const [activeHealer, setActiveHealer] = useState<ChatHealer | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [groupMessages, setGroupMessages] = useState<GroupMessage[]>(mockGroupMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isGroupTyping, setIsGroupTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageSearchQuery, setMessageSearchQuery] = useState('');
  const [showAttachOptions, setShowAttachOptions] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'prescription' | 'advice' | 'general'>('all');
  const [healers, setHealers] = useState<ChatHealer[]>(mockHealers);
  const [savedMessages, setSavedMessages] = useState<Set<string>>(new Set());
  const [showMessageActions, setShowMessageActions] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const groupMessagesEndRef = useRef<HTMLDivElement>(null);

  // Get detailed healer info
  const detailedHealer = activeHealer ? getHealerById(activeHealer.id) : null;

  // Filter healers based on search query
  const filteredHealers = healers.filter(healer => 
    healer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    healer.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter messages based on search and category
  const filteredGroupMessages = groupMessages.filter(message => {
    const matchesSearch = messageSearchQuery === '' || 
      message.text.toLowerCase().includes(messageSearchQuery.toLowerCase()) ||
      message.senderName.toLowerCase().includes(messageSearchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || message.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    // Scroll to bottom of messages when they change
    if (activeTab === 'healers') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      groupMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, groupMessages, activeTab]);

  // Load messages when selecting a healer
  useEffect(() => {
    if (activeHealer) {
      setMessages(generateMockMessages(activeHealer.id));
      
      // Mark this healer's messages as read
      setHealers(prevHealers => 
        prevHealers.map(h => 
          h.id === activeHealer.id 
            ? { ...h, unread: 0 } 
            : h
        )
      );
    }
  }, [activeHealer]);

  const handleSelectHealer = (healer: ChatHealer) => {
    setActiveHealer(healer);
    setActiveTab('healers');
    setShowProfile(false);
  };

  const handleBackToList = () => {
    setActiveHealer(null);
    setShowProfile(false);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    if (activeTab === 'healing-room') {
      // Add message to group chat
      const groupMessage: GroupMessage = {
        id: Date.now().toString(),
        senderId: user?.id || 'user',
        senderName: user?.name || 'You',
        senderAvatar: user?.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
        senderRole: 'Patient',
        text: newMessage,
        timestamp: new Date(),
        category: 'general'
      };
      
      setGroupMessages(prev => [...prev, groupMessage]);
      setNewMessage('');
      
      // Simulate team response in group chat
      setIsGroupTyping(true);
      const delay = 1500 + Math.random() * 2000;
      setTimeout(() => {
        setIsGroupTyping(false);
        
        const teamResponses = [
          "That's wonderful to hear! Keep up the excellent work.",
          "Your progress is inspiring. How are you feeling overall?",
          "Great insights! Let's discuss this further in our next session.",
          "Thank you for sharing. This helps us understand your journey better.",
          "Your dedication to healing is remarkable. Keep going!"
        ];
        
        const randomResponse = teamResponses[Math.floor(Math.random() * teamResponses.length)];
        const randomHealer = mockHealers[Math.floor(Math.random() * mockHealers.length)];
        
        const healerResponse: GroupMessage = {
          id: (Date.now() + 1).toString(),
          senderId: randomHealer.id,
          senderName: randomHealer.name,
          senderAvatar: randomHealer.avatar,
          senderRole: randomHealer.role,
          text: randomResponse,
          timestamp: new Date(),
          category: 'advice'
        };
        
        setGroupMessages(prev => [...prev, healerResponse]);
      }, delay);
    } else if (activeHealer) {
      // Handle individual healer chat
      const userMessage: Message = {
        id: Date.now().toString(),
        senderId: user?.id || 'user',
        receiverId: activeHealer.id,
        text: newMessage,
        timestamp: new Date(),
        status: 'sent'
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      
      // Simulate typing indicator
      setIsTyping(true);
      
      // Simulate healer response after delay
      const delay = 1500 + Math.random() * 2000;
      setTimeout(() => {
        setIsTyping(false);
        
        const healerResponses = [
          "I understand how you're feeling. Let's work on that together.",
          "That's good to hear. Have you been practicing the breathing exercises?",
          "I'll make a note of that for our next session.",
          "That's interesting. Could you tell me more about when this started?",
          "I recommend continuing with your current routine and we'll evaluate next week.",
          "Remember to stay hydrated and maintain your sleep schedule."
        ];
        
        const randomResponse = healerResponses[Math.floor(Math.random() * healerResponses.length)];
        
        const healerMessage: Message = {
          id: (Date.now() + 1).toString(),
          senderId: activeHealer.id,
          receiverId: user?.id || 'user',
          text: randomResponse,
          timestamp: new Date(),
          status: 'read'
        };
        
        setMessages(prev => [...prev, healerMessage]);
        
        // Update last message in healers list
        setHealers(prevHealers => 
          prevHealers.map(h => 
            h.id === activeHealer.id 
              ? { 
                  ...h, 
                  lastMessage: randomResponse,
                  lastMessageTime: new Date()
                } 
              : h
          )
        );
      }, delay);
    }
  };

  const handleAttachFile = (type: 'image' | 'document') => {
    setShowAttachOptions(false);
    
    // In a real app, this would open a file picker
    const fileMessage = type === 'image' 
      ? "I've shared an image with you." 
      : "I've shared a medical report with you.";
    
    setNewMessage(fileMessage);
  };

  const handleEmojiClick = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojis(false);
  };

  const handleSaveToMedicalRecords = (messageId: string) => {
    setSavedMessages(prev => new Set([...prev, messageId]));
    setShowMessageActions(null);
    // In a real app, this would save to the user's medical records
  };

  const handleVideoCall = () => {
    // In a real app, this would initiate a video call
    alert('Video call feature would be integrated here');
  };

  const handleVoiceCall = () => {
    // In a real app, this would initiate a voice call
    alert('Voice call feature would be integrated here');
  };

  const formatMessageTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatLastSeen = (date: Date): string => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'prescription': return 'bg-pink-light/20 text-pink';
      case 'advice': return 'bg-teal-light/20 text-teal';
      case 'general': return 'bg-gray-100 text-charcoal';
      default: return 'bg-gray-100 text-charcoal';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'dnd': return 'bg-gold';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="h-[calc(100vh-9rem)] md:h-[calc(100vh-7rem)] flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col h-full"
      >
        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex justify-center">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                onClick={() => setActiveTab('healers')}
                className={`px-6 py-2 rounded-lg transition-all ${
                  activeTab === 'healers'
                    ? 'bg-white text-teal shadow-sm'
                    : 'text-charcoal-light hover:text-charcoal'
                }`}
              >
                Individual Chats
              </button>
              <button
                onClick={() => setActiveTab('healing-room')}
                className={`px-6 py-2 rounded-lg transition-all flex items-center ${
                  activeTab === 'healing-room'
                    ? 'bg-white text-teal shadow-sm'
                    : 'text-charcoal-light hover:text-charcoal'
                }`}
              >
                <Users size={16} className="mr-2" />
                Healing Room
                <span className="ml-2 w-2 h-2 bg-teal rounded-full"></span>
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'healers' ? (
          // Individual Healers Chat Interface
          !activeHealer ? (
            // Chat list view
            <div className="flex flex-col h-full">
              <div className="p-4 bg-white border-b">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search healers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 pl-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-3 text-charcoal-light" size={20} />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                <ChatList 
                  healers={filteredHealers} 
                  onSelectHealer={handleSelectHealer} 
                />
              </div>
            </div>
          ) : (
            // Individual chat thread view
            <div className="flex flex-col h-full">
              {/* Enhanced Healer Profile Header */}
              <div className="bg-white border-b shadow-sm">
                {/* Main Header */}
                <div className="flex items-center p-4">
                  <button 
                    onClick={handleBackToList}
                    className="mr-3 p-2 rounded-full hover:bg-gray-100 md:hidden"
                  >
                    <ArrowLeft size={20} className="text-charcoal" />
                  </button>
                  
                  <div className="relative">
                    <img 
                      src={activeHealer.avatar} 
                      alt={activeHealer.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-teal"
                    />
                    <span 
                      className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(activeHealer.status || 'offline')} rounded-full border-2 border-white`}
                    />
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <div className="flex items-center">
                      <h3 className="font-garamond text-lg font-semibold text-charcoal-dark">
                        Dr. {activeHealer.name}
                      </h3>
                      {detailedHealer?.verified && (
                        <Shield size={16} className="ml-2 text-teal" />
                      )}
                    </div>
                    <p className="text-sm text-teal">{activeHealer.role}</p>
                    <p className="text-xs text-charcoal-light">
                      {activeHealer.online ? 'Online now' : `Last seen ${formatLastSeen(new Date())}`}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {/* Quick Action Buttons */}
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
              
              {/* Enhanced Chat Messages */}
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
              
              {/* Enhanced Message Input */}
              <div className="bg-white p-4 border-t border-gray-100">
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
                      placeholder="Type your message..."
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
            </div>
          )
        ) : (
          // Enhanced Healing Room Chat Interface
          <div className="flex flex-col h-full">
            {/* Healing Room Header with Search and Filters */}
            <div className="bg-white border-b shadow-sm">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-light/20 to-pink-light/20 flex items-center justify-center mr-4">
                      <Users size={24} className="text-teal" />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-garamond text-xl font-semibold text-charcoal-dark">Healing Room</h2>
                      <p className="text-sm text-charcoal-light">Your Care Team • 3 members online</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {mockHealers.slice(0, 3).map((healer) => (
                        <img
                          key={healer.id}
                          src={healer.avatar}
                          alt={healer.name}
                          className="w-8 h-8 rounded-full border-2 border-white object-cover"
                          title={`Dr. ${healer.name}`}
                        />
                      ))}
                    </div>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <Settings size={18} className="text-charcoal-light" />
                    </button>
                  </div>
                </div>

                {/* Message Search and Filters */}
                <div className="flex space-x-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Search messages..."
                      value={messageSearchQuery}
                      onChange={(e) => setMessageSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-light" size={16} />
                  </div>
                  
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value as any)}
                      className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent appearance-none pr-8"
                    >
                      <option value="all">All Messages</option>
                      <option value="prescription">Prescriptions</option>
                      <option value="advice">Medical Advice</option>
                      <option value="general">General</option>
                    </select>
                    <Filter size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-charcoal-light pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Group Messages */}
            <div className="flex-1 overflow-y-auto bg-ivory-light p-4">
              <div className="max-w-4xl mx-auto space-y-6">
                {filteredGroupMessages.map((message) => (
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
                          
                          {message.attachment && (
                            <div className="mt-3">
                              {message.attachment.type === 'image' ? (
                                <img 
                                  src={message.attachment.url} 
                                  alt={message.attachment.name}
                                  className="rounded-lg max-w-sm"
                                />
                              ) : (
                                <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
                                  <FileText size={16} className="text-teal" />
                                  <span className="text-sm">{message.attachment.name}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Quick Reactions */}
                          <div className="flex items-center space-x-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {quickReactions.map(emoji => (
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

            {/* Enhanced Group Message Input */}
            <div className="bg-white p-4 border-t">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-end space-x-3">
                  {/* Attachment Button */}
                  <div className="relative">
                    <button
                      onClick={() => setShowAttachOptions(!showAttachOptions)}
                      className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-charcoal-light transition-colors"
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
                            className="flex items-center w-full p-4 hover:bg-gray-50 transition-colors"
                          >
                            <Image size={20} className="mr-3 text-teal" />
                            <div>
                              <div className="font-medium">Photo</div>
                              <div className="text-xs text-charcoal-light">Share with team</div>
                            </div>
                          </button>
                          <button
                            onClick={() => handleAttachFile('document')}
                            className="flex items-center w-full p-4 hover:bg-gray-50 transition-colors"
                          >
                            <FileText size={20} className="mr-3 text-teal" />
                            <div>
                              <div className="font-medium">Document</div>
                              <div className="text-xs text-charcoal-light">Share medical records</div>
                            </div>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Emoji Button */}
                  <div className="relative">
                    <button
                      onClick={() => setShowEmojis(!showEmojis)}
                      className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-charcoal-light transition-colors"
                    >
                      <Smile size={20} />
                    </button>
                    
                    <AnimatePresence>
                      {showEmojis && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-200 p-4"
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
                  
                  {/* Message Input */}
                  <div className="flex-1">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Share with your healing team..."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                  </div>
                  
                  {/* Send Button */}
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className={`p-3 rounded-full transition-all ${
                      newMessage.trim() 
                        ? 'bg-teal text-white hover:bg-teal-dark shadow-lg hover:shadow-xl' 
                        : 'bg-gray-100 text-charcoal-light cursor-not-allowed'
                    }`}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Chat;