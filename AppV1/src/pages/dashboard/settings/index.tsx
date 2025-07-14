import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Moon, Globe, Lock, Shield, CreditCard, HelpCircle } from 'lucide-react';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: 'appointments',
      title: 'Appointment Reminders',
      description: 'Get notified about upcoming appointments',
      enabled: true
    },
    {
      id: 'messages',
      title: 'Messages',
      description: 'Receive notifications for new messages',
      enabled: true
    },
    {
      id: 'programs',
      title: 'Program Updates',
      description: 'Stay updated about your program progress',
      enabled: true
    },
    {
      id: 'newsletter',
      title: 'Newsletter',
      description: 'Receive our weekly wellness newsletter',
      enabled: false
    }
  ]);

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('english');
  const [timeZone, setTimeZone] = useState('Asia/Kolkata');

  const toggleNotification = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, enabled: !notification.enabled }
          : notification
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-garamond font-semibold mb-6">Settings</h2>

        {/* Notifications */}
        <div className="card mb-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-lg bg-teal-light/20 flex items-center justify-center mr-4">
              <Bell size={20} className="text-teal" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Notifications</h3>
              <p className="text-sm text-charcoal-light">Manage your notification preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            {notifications.map(notification => (
              <div key={notification.id} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{notification.title}</h4>
                  <p className="text-sm text-charcoal-light">{notification.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notification.enabled}
                    onChange={() => toggleNotification(notification.id)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-light rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Appearance */}
        <div className="card mb-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-lg bg-pink-light/20 flex items-center justify-center mr-4">
              <Moon size={20} className="text-pink" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Appearance</h3>
              <p className="text-sm text-charcoal-light">Customize your app experience</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Dark Mode</h4>
              <p className="text-sm text-charcoal-light">Switch to dark theme</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-light rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal"></div>
            </label>
          </div>
        </div>

        {/* Language & Region */}
        <div className="card mb-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-lg bg-gold-light/20 flex items-center justify-center mr-4">
              <Globe size={20} className="text-gold" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Language & Region</h3>
              <p className="text-sm text-charcoal-light">Set your language and timezone preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal-dark mb-2">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="input-field"
              >
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="sanskrit">Sanskrit</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-dark mb-2">
                Time Zone
              </label>
              <select
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                className="input-field"
              >
                <option value="Asia/Kolkata">India (GMT+5:30)</option>
                <option value="America/New_York">New York (GMT-4)</option>
                <option value="Europe/London">London (GMT+1)</option>
                <option value="Asia/Dubai">Dubai (GMT+4)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-teal-light/20 flex items-center justify-center mr-4">
                <Lock size={20} className="text-teal" />
              </div>
              <div className="text-left">
                <h4 className="font-medium">Security</h4>
                <p className="text-sm text-charcoal-light">Password & authentication</p>
              </div>
            </div>
          </button>

          <button className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-pink-light/20 flex items-center justify-center mr-4">
                <Shield size={20} className="text-pink" />
              </div>
              <div className="text-left">
                <h4 className="font-medium">Privacy</h4>
                <p className="text-sm text-charcoal-light">Manage your data</p>
              </div>
            </div>
          </button>

          <button className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gold-light/20 flex items-center justify-center mr-4">
                <CreditCard size={20} className="text-gold" />
              </div>
              <div className="text-left">
                <h4 className="font-medium">Billing</h4>
                <p className="text-sm text-charcoal-light">Payment methods</p>
              </div>
            </div>
          </button>
        </div>

        {/* Help & Support */}
        <div className="card mt-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-teal-light/20 flex items-center justify-center mr-4">
              <HelpCircle size={20} className="text-teal" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Need Help?</h3>
              <p className="text-sm text-charcoal-light">Visit our help center or contact support</p>
            </div>
            <button className="ml-auto btn-secondary text-sm py-2">
              Get Support
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;