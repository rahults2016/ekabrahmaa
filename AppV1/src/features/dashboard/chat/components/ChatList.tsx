// features/chat/ChatList.tsx
import React from 'react';
import { Search } from 'lucide-react';
import type { ChatHealer } from '@/features/dashboard/Home/components/chat/chatData';
import { mockHealers } from '@/features/dashboard/Home/components/chat/chatData';

interface ChatListProps {
  onSelectHealer: (healer: ChatHealer) => void;
}

const ChatList: React.FC<ChatListProps> = ({ onSelectHealer }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredHealers = mockHealers.filter(healer => 
    healer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    healer.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
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
        {filteredHealers.map(healer => (
          <div 
            key={healer.id}
            onClick={() => onSelectHealer(healer)}
            className="p-3 flex items-center hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
          >
            <img 
              src={healer.avatar} 
              alt={healer.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
            />
            <div className="ml-4">
              <h3 className="font-medium text-charcoal-dark">Dr. {healer.name}</h3>
              <p className="text-sm text-charcoal-light">{healer.role}</p>
              <p className="text-xs text-charcoal-light truncate">{healer.lastMessage}</p>
            </div>
            <div className="ml-auto text-xs text-charcoal-light">
              {new Date(healer.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;