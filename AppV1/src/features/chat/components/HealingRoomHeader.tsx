// features/chat/HealingRoomHeader.tsx
import React from 'react';
import { Search, Users, Settings, Filter } from 'lucide-react';
import { mockHealers } from './chatData';

const HealingRoomHeader: React.FC = () => {
  const [messageSearchQuery, setMessageSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<'all' | 'prescription' | 'advice' | 'general'>('all');

  return (
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
  );
};

export default HealingRoomHeader;