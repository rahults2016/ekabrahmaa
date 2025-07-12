// features/chat/ChatTabs.tsx
import React from 'react';
import { Users } from 'lucide-react';

interface ChatTabsProps {
  activeTab: 'healers' | 'healing-room';
  setActiveTab: (tab: 'healers' | 'healing-room') => void;
}

const ChatTabs: React.FC<ChatTabsProps> = ({ activeTab, setActiveTab }) => (
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
);

export default ChatTabs;