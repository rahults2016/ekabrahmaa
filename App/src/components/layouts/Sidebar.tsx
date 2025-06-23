import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Calendar, User, BookOpen, Smile, FileText, MessageCircle, Activity, CreditCard, Receipt, History,
  BookOpenText, Settings, X, Utensils, Scroll, Upload, Heart, Bookmark, Share2, Gift, UserCircle, Bot as Lotus, Stethoscope, ShoppingCart, 
  HelpCircle, Star, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../common/Logo';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showGettingStarted, setShowGettingStarted] = useState(true);
  
  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 31 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 31 } }
  };

  // Check if user is new (simplified check)
  const isNewUser = !user?.bio;
  
  // Getting started items for new users
  const gettingStartedItems = [
    { 
      name: 'Complete Profile', 
      path: '/profile/edit', 
      icon: <User size={16} className="text-teal-600" />,
      completed: !!user?.bio,
      priority: 'high'
    },
    { 
      name: 'Find Your Dosha', 
      path: '#', 
      icon: <Heart size={16} className="text-rose-600" />,
      completed: !!user?.doshaType,
      priority: 'high'
    },
    { 
      name: 'Meet Healers', 
      path: '/healers', 
      icon: <Stethoscope size={16} className="text-teal-600" />,
      completed: false,
      priority: 'medium'
    },
    { 
      name: 'Book First Session', 
      path: '/talk-to-healer', 
      icon: <Calendar size={16} className="text-sage-600" />,
      completed: false,
      priority: 'high'
    }
  ];

  const completedCount = gettingStartedItems.filter(item => item.completed).length;
  const progressPercentage = (completedCount / gettingStartedItems.length) * 100;
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'My Programs', path: '/programs', icon: <Activity size={20} /> },
    { 
      name: 'Medical History', 
      path: '/medical', 
      icon: <FileText size={20} className="text-teal-600" />,
      children: [
        { name: 'View/Edit Health Profile', path: '/medical/new', icon: <User size={20} /> },
        { name: 'Upload Reports', path: '/medical/upload', icon: <Upload size={20} /> }
      ]
    },
    { name: 'Tracker', path: '/tracker', icon: <Activity size={20} /> },
    { name: 'Journal', path: '/journal', icon: <BookOpenText size={20} /> },
    { name: 'Appointments', path: '/appointments', icon: <Calendar size={20} /> },
    { name: 'Talk to a Healer', path: '/talk-to-healer', icon: <Stethoscope size={20} /> },
    { name: 'Chat', path: '/chat', icon: <MessageCircle size={20} /> },
    { name: 'Cart', path: '/cart', icon: <ShoppingCart size={20} /> },
    { 
      name: 'Payments', 
      path: '/payments', 
      icon: <CreditCard size={20} />,
      children: [
        { name: 'Invoices', path: '/payments/invoices', icon: <Receipt size={20} /> },
        { name: 'Payment History', path: '/payments/history', icon: <History size={20} /> }
      ]
    },
    { 
      name: 'Resources', 
      path: '/resources', 
      icon: <BookOpen size={20} />,
      children: [
        { name: 'Explore', path: '/resources/explore', icon: <Activity size={20} /> },
        { name: 'Bookmarks', path: '/resources/bookmarks', icon: <Bookmark size={20} /> }
      ]
    },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (path: string) => {
    setExpandedItems(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };
  
  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-800 bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <motion.div 
        className="fixed md:relative w-80 h-full bg-white shadow-brand-lg z-30 md:flex flex-col border-r border-slate-100"
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        style={{ display: isOpen ? 'flex' : 'none' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <Logo size="small" />
          <button 
            onClick={toggleSidebar} 
            className="md:hidden text-slate-600 hover:text-teal-600 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* User profile section */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <img 
              src={user?.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'} 
              alt="Profile" 
              className="w-12 h-12 rounded-full object-cover border-2 border-teal-200 shadow-brand"
            />
            <div className="flex-1">
              <h3 className="font-medium text-slate-800">{user?.name || 'User'}</h3>
              {user?.doshaType ? (
                <span className="text-xs text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
                  {user.doshaType}
                </span>
              ) : (
                <span className="text-xs text-slate-500">Getting started...</span>
              )}
            </div>
          </div>
        </div>
        
        {/* Getting Started Section for New Users */}
        {isNewUser && showGettingStarted && (
          <div className="p-6 border-b border-slate-100">
            <div className="bg-gradient-to-br from-teal-50 to-rose-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-garamond font-semibold text-slate-800">Getting Started</h3>
                <button 
                  onClick={() => setShowGettingStarted(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Progress</span>
                  <span className="text-sm font-medium text-teal-600">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                {gettingStartedItems.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.path === '#' ? '#' : item.path}
                    onClick={() => toggleSidebar()}
                    className={`flex items-center p-2 rounded-lg transition-colors ${
                      item.completed 
                        ? 'bg-white/50 text-slate-500' 
                        : 'hover:bg-white/70 text-slate-700'
                    }`}
                  >
                    <div className="mr-3">
                      {item.completed ? (
                        <CheckCircle size={16} className="text-teal-500" />
                      ) : (
                        item.icon
                      )}
                    </div>
                    <span className={`text-sm flex-1 ${item.completed ? 'line-through' : ''}`}>
                      {item.name}
                    </span>
                    {item.priority === 'high' && !item.completed && (
                      <span className="text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full">
                        Essential
                      </span>
                    )}
                    {!item.completed && (
                      <ArrowRight size={14} className="text-slate-400" />
                    )}
                  </Link>
                ))}
              </div>
              
              {completedCount < gettingStartedItems.length && (
                <div className="mt-4 p-3 bg-white/60 rounded-lg">
                  <div className="flex items-center text-xs text-slate-600">
                    <Star size={12} className="text-teal-500 mr-1" />
                    <span>Complete setup to unlock all features</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Navigation links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-4">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              const isExpanded = expandedItems.includes(item.path);
              
              return (
                <li key={item.path} className="space-y-1">
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleExpand(item.path)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'bg-teal-500 text-white shadow-brand-md'
                            : 'hover:bg-slate-50 text-slate-700 hover:text-teal-600'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {item.icon}
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.ul 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-12 space-y-1 overflow-hidden"
                          >
                            {item.children.map((child) => {
                              const isChildActive = location.pathname === child.path;
                              return (
                                <li key={child.path}>
                                  <Link
                                    to={child.path}
                                    className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                                      isChildActive
                                        ? 'bg-teal-50 text-teal-600 font-medium'
                                        : 'hover:bg-slate-50 text-slate-600 hover:text-teal-600'
                                    }`}
                                    onClick={() => toggleSidebar()}
                                  >
                                    {child.icon}
                                    <span>{child.name}</span>
                                  </Link>
                                </li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-teal-500 text-white shadow-brand-md'
                          : 'hover:bg-slate-50 text-slate-700 hover:text-teal-600'
                      }`}
                      onClick={() => toggleSidebar()}
                    >
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Help section for new users */}
        {isNewUser && (
          <div className="p-4 border-t border-slate-100">
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                  <HelpCircle size={16} className="text-teal-600" />
                </div>
                <h4 className="font-medium text-slate-800">Need Help?</h4>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                Our wellness experts are here to guide you through your journey.
              </p>
              <Link
                to="/chat"
                onClick={() => toggleSidebar()}
                className="flex items-center justify-center w-full px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-colors"
              >
                <MessageCircle size={14} className="mr-2" />
                Chat with Support
              </Link>
            </div>
          </div>
        )}
        
        {/* Logout button */}
        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors"
          >
            <span>Logout</span>
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;