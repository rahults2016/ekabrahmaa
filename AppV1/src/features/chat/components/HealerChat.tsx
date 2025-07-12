// features/chat/HealerChat.tsx
import type { ChatHealer } from '@/features/dashboard/components/chat/chatData';
import React from 'react';
import ChatList from './ChatList';
import ChatThread from './ChatThread';

interface HealerChatProps {
  activeHealer: ChatHealer | null;
  setActiveHealer: (healer: ChatHealer | null) => void;
}

const HealerChat: React.FC<HealerChatProps> = ({ activeHealer, setActiveHealer }) => {
  if (!activeHealer) {
    return <ChatList onSelectHealer={setActiveHealer} />;
  }

  return <ChatThread healer={activeHealer} onBack={() => setActiveHealer(null)} />;
};

export default HealerChat;