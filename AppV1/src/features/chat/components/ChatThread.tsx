// features/chat/ChatThread.tsx
import type { ChatHealer } from '@/features/dashboard/components/chat/chatData';
import React from 'react';
import HealerProfileHeader from './HealerProfileHeader';
import MessageInput from './MessageInput';
import MessageList from './MessageList';


interface ChatThreadProps {
  healer: ChatHealer;
  onBack: () => void;
}

const ChatThread: React.FC<ChatThreadProps> = ({ healer, onBack }) => (
  <div className="flex flex-col h-full">
    <HealerProfileHeader healer={healer} onBack={onBack} />
    <MessageList healerId={healer.id} />
    <MessageInput />
  </div>
);

export default ChatThread;