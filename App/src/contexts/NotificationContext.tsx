import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'appointment' | 'message' | 'program' | 'system';
  timestamp: Date;
  read: boolean;
  link?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  clearNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Load initial notifications (mock data)
  useEffect(() => {
    const initialNotifications: Notification[] = [
      {
        id: '1',
        title: 'Upcoming Appointment',
        message: 'You have an appointment with Dr. Anjali Sharma tomorrow at 2:00 PM',
        type: 'appointment',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: false,
        link: '/appointments'
      },
      {
        id: '2',
        title: 'New Message',
        message: 'Dr. Shradha Kurup sent you a message about your diet plan',
        type: 'message',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        read: false,
        link: '/chat'
      },
      {
        id: '3',
        title: 'Program Milestone',
        message: 'Congratulations! You\'ve completed Week 1 of your ekaSamanvaya Program',
        type: 'program',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: true,
        link: '/programs'
      }
    ];
    setNotifications(initialNotifications);
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      addNotification,
      clearNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
};