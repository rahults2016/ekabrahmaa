import React from 'react';
import HealingRoomHeader from './HealingRoomHeader';
import HealingRoomMessages from './HealingRoomMessages';
import MessageInput from './MessageInput';


const HealingRoom: React.FC = () => (
  <div className="flex flex-col h-full">
    <HealingRoomHeader />
    <HealingRoomMessages />
    <MessageInput isGroup />
  </div>
);

export default HealingRoom;