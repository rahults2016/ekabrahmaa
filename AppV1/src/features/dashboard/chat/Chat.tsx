import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { ChatHealer } from './components/chatData';
import ChatTabs from './components/ChatTabs';
import HealerChat from './components/HealerChat';
import HealingRoom from './components/HealingRoom';


const Chat: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'healers' | 'healing-room'>('healers');
  const [activeHealer, setActiveHealer] = useState<ChatHealer | null>(null);

  return (
    <div className="h-[calc(100vh-9rem)] md:h-[calc(100vh-7rem)] flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col h-full"
      >
        <ChatTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {activeTab === 'healers' ? (
          <HealerChat 
            activeHealer={activeHealer} 
            setActiveHealer={setActiveHealer}
          />
        ) : (
          <HealingRoom />
        )}
      </motion.div>
    </div>
  );
};

export default Chat;