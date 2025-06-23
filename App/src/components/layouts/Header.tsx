import React, { useState } from 'react';
import { Menu, Bell, ArrowLeft, HelpCircle, Star, Gift } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../contexts/NotificationContext';
import { useAuth } from '../../contexts/AuthContext';
import NotificationPanel from '../notifications/NotificationPanel';

interface HeaderProps {
  title: string;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const showBackButton = location.pathname !== '/';
  
  // Check if user is new
  const isNewUser = !user?.bio;
  
  // Quick help tips for new users
  const helpTips = [
    {
      title: 'Complete Your Profile',
      description: 'Add your details to get personalized recommendations',
      action: () => navigate('/profile/edit'),
      icon: '👤'
    },
    {
      title: 'Find Your Dosha',
      description: 'Take our assessment to discover your unique constitution',
      action: () => navigate('#'),
      icon: '🧘‍♀️'
    },
    {
      title: 'Book a Session',
      description: 'Connect with our certified wellness experts',
      action: () => navigate('/talk-to-healer'),
      icon: '👩‍⚕️'
    }
  ];

  return (
    <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm shadow-brand border-b border-slate-100">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showBackButton ? (
            <button
              onClick={() => navigate(-1)}
              className="text-slate-600 hover:text-teal-600 focus:outline-none p-2 rounded-lg hover:bg-slate-50 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={24} />
            </button>
          ) : (
            <button 
              onClick={toggleSidebar}
              className="text-slate-600 hover:text-teal-600 focus:outline-none p-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Menu size={24} />
            </button>
          )}
          <div>
            <h1 className="text-xl md:text-2xl font-garamond font-semibold text-slate-800">
              {title}
            </h1>
            {isNewUser && location.pathname === '/' && (
              <p className="text-sm text-slate-600">Welcome to your wellness journey</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Help button for new users */}
          {isNewUser && (
            <div className="relative">
              <button 
                onClick={() => setShowHelp(!showHelp)}
                className="text-slate-600 hover:text-teal-600 focus:outline-none relative p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <HelpCircle size={22} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-teal-500 rounded-full animate-pulse"></span>
              </button>
              
              <AnimatePresence>
                {showHelp && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-brand-xl border border-slate-100 z-50"
                  >
                    <div className="p-4">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                          <Star size={16} className="text-teal-600" />
                        </div>
                        <h3 className="font-garamond font-semibold text-slate-800">Quick Start Guide</h3>
                      </div>
                      
                      <div className="space-y-3">
                        {helpTips.map((tip, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              tip.action();
                              setShowHelp(false);
                            }}
                            className="w-full flex items-start p-3 rounded-lg hover:bg-teal-50 transition-colors text-left"
                          >
                            <span className="text-xl mr-3 mt-0.5">{tip.icon}</span>
                            <div>
                              <h4 className="font-medium text-slate-800 mb-1">{tip.title}</h4>
                              <p className="text-sm text-slate-600">{tip.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <button
                          onClick={() => navigate('/chat')}
                          className="w-full flex items-center justify-center px-4 py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors"
                        >
                          Need more help? Chat with us
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          
          {/* Notifications */}
          <button 
            onClick={() => setShowNotifications(!showNotifications)} 
            className="text-slate-600 hover:text-teal-600 focus:outline-none relative p-2 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Bell size={22} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 w-5 h-5 rounded-full text-xs text-white flex items-center justify-center font-medium">
                {unreadCount}
              </span>
            )}
          </button>
          
          <NotificationPanel 
            isOpen={showNotifications} 
            onClose={() => setShowNotifications(false)} 
          />
        </div>
      </div>
      
      {/* Progress bar for new users */}
      {isNewUser && location.pathname === '/' && (
        <div className="px-4 pb-3">
          <div className="bg-teal-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-teal-800">Setup Progress</span>
              <span className="text-sm text-teal-600">2 of 6 steps</span>
            </div>
            <div className="h-2 bg-teal-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-teal-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '33%' }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;