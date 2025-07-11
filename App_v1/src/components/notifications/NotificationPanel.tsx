import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Calendar, MessageCircle, Award, X, Check } from 'lucide-react';
import { useNotifications, type Notification } from '.././contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from '../../utils/dateUtils';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { notifications, markAsRead, markAllAsRead, clearNotification } = useNotifications();
  const navigate = useNavigate();

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'appointment':
        return <Calendar size={16} className="text-teal" />;
      case 'message':
        return <MessageCircle size={16} className="text-pink" />;
      case 'program':
        return <Award size={16} className="text-gold" />;
      default:
        return <Bell size={16} className="text-charcoal-light" />;
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.link) {
      navigate(notification.link);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/20 z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 right-4 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl z-50"
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-garamond font-semibold">Notifications</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-teal hover:text-teal-dark"
                >
                  Mark all as read
                </button>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} className="text-charcoal-light" />
                </button>
              </div>
            </div>

            <div className="max-h-[70vh] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell size={32} className="text-charcoal-light mx-auto mb-3" />
                  <p className="text-charcoal-light">No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-teal-light/5' : ''
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start">
                        <div className="p-2 rounded-lg bg-gray-100 mr-3">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-charcoal-dark">
                            {notification.title}
                          </h3>
                          <p className="text-sm text-charcoal-light mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2 text-xs text-charcoal-light">
                            <span>{formatDistanceToNow(notification.timestamp)}</span>
                            {notification.read && (
                              <span className="flex items-center">
                                <Check size={12} className="mr-1" />
                                Read
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            clearNotification(notification.id);
                          }}
                          className="p-1 hover:bg-gray-200 rounded-full ml-2"
                        >
                          <X size={16} className="text-charcoal-light" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationPanel