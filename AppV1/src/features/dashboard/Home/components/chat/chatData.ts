import { detailedHealers, toChatHealer } from "@/data/dashboard/healers";


export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  attachment?: {
    type: 'image' | 'document';
    url: string;
    name: string;
  };
}

export interface ChatHealer {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio?: string;
  online: boolean;
  lastMessage: string;
  lastMessageTime: Date;
  unread: number;
  status?: 'online' | 'offline' | 'dnd';
}

// Mock healers data
export const mockHealers: ChatHealer[] = detailedHealers.map(healer => ({
  ...toChatHealer(healer),
  lastMessage: getLastMessageForHealer(healer.id),
  lastMessageTime: getLastMessageTimeForHealer(healer.id),
  unread: getUnreadCountForHealer(healer.id)
}));

// Helper functions for chat-specific data
function getLastMessageForHealer(healerId: string): string {
  const messages = {
    'h1': 'How are you feeling after the breathing exercises?',
    'h2': 'Remember to include more cooling foods in your diet this week.',
    'h3': 'Your progress with the morning sequence is excellent!',
    'h4': 'Try the new meditation I shared. It will help with anxiety.',
    'h5': 'Your latest journal entries show great progress!',
    'h6': 'The movement assessment shows significant improvement.',
    'h7': 'Let\'s explore that feeling in our next session.'
  };
  return messages[healerId as keyof typeof messages] || 'Welcome to your healing journey!';
}

function getLastMessageTimeForHealer(healerId: string): Date {
  const times = {
    'h1': new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    'h2': new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    'h3': new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    'h4': new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    'h5': new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    'h6': new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    'h7': new Date(Date.now() - 1000 * 60 * 60 * 6) // 6 hours ago
  };
  return times[healerId as keyof typeof times] || new Date();
}

function getUnreadCountForHealer(healerId: string): number {
  const counts = {
    'h1': 2,
    'h2': 0,
    'h3': 1,
    'h4': 0,
    'h5': 0,
    'h6': 1,
    'h7': 0
  };
  return counts[healerId as keyof typeof counts] || 0;
}

// Generate mock messages for a conversation
export function generateMockMessages(healerId: string): Message[] {
  const healer = mockHealers.find(h => h.id === healerId);
  if (!healer) return [];
  
  const now = new Date();
  const userId = 'user';
  
  // Template conversations based on specialty
  let conversation: { sender: string, text: string, minutesAgo: number }[] = [];
  
  if (healer.role.includes('Ayurveda')) {
    conversation = [
      { sender: healerId, text: `Hello! I hope you're doing well today. I've reviewed your recent dosha assessment.`, minutesAgo: 180 },
      { sender: userId, text: `Hi Dr. ${healer.name}! I'm feeling a bit better, but still experiencing some digestive discomfort.`, minutesAgo: 178 },
      { sender: healerId, text: `I understand. Based on your Pitta-Vata imbalance, I'd recommend avoiding spicy and fried foods for the next week.`, minutesAgo: 175 },
      { sender: userId, text: `Should I continue with the herbal supplements you prescribed?`, minutesAgo: 170 },
      { sender: healerId, text: `Yes, please continue with those, and I'd also like you to try adding some cooling foods like cucumber and mint to your diet.`, minutesAgo: 165 },
      { sender: userId, text: `I'll make those dietary changes. Would coconut water also help?`, minutesAgo: 160 },
      { sender: healerId, text: `Excellent suggestion! Coconut water is perfect for balancing Pitta. Please log your symptoms in the journal daily so we can track your progress.`, minutesAgo: 155 }
    ];
  } else if (healer.role.includes('Yoga')) {
    conversation = [
      { sender: healerId, text: `Hello! How have your morning yoga sessions been going?`, minutesAgo: 200 },
      { sender: userId, text: `Good morning, Dr. ${healer.name}! I've been consistent with the routine, but the shoulder stand is still challenging.`, minutesAgo: 195 },
      { sender: healerId, text: `That's common with Vata types. Try using a folded blanket under your shoulders for support. How's your breath work during the poses?`, minutesAgo: 190 },
      { sender: userId, text: `My breathing is improving, but I tend to hold my breath during difficult poses.`, minutesAgo: 185 },
      { sender: healerId, text: `Focus on maintaining ujjayi breath throughout. I'm adding a new sequence to your program that will help with this awareness.`, minutesAgo: 180 },
      { sender: userId, text: `Thank you! I'll practice the new sequence tomorrow morning.`, minutesAgo: 175 },
      { sender: healerId, text: `Perfect. Remember, consistency is more important than intensity. I'm looking forward to our session next week!`, minutesAgo: 170 }
    ];
  } else {
    conversation = [
      { sender: healerId, text: `Hello! I hope you're having a peaceful day. How have you been feeling since our last session?`, minutesAgo: 220 },
      { sender: userId, text: `Hi Dr. ${healer.name}! I've been implementing your suggestions and noticing some improvements in my energy levels.`, minutesAgo: 215 },
      { sender: healerId, text: `That's wonderful to hear! Have you been keeping up with your daily rituals?`, minutesAgo: 210 },
      { sender: userId, text: `Yes, the morning routine has been especially helpful. I've been more focused throughout the day.`, minutesAgo: 205 },
      { sender: healerId, text: `Excellent. Consistency with these practices will continue to bring balance. Is there anything specific you'd like to work on next?`, minutesAgo: 200 },
      { sender: userId, text: `I'd like to improve my sleep quality. I'm still waking up around 3 AM most nights.`, minutesAgo: 195 },
      { sender: healerId, text: `Early morning waking is often related to Pitta imbalance. Let's focus on evening cooling practices. I'll send you some specific recommendations later today.`, minutesAgo: 190 }
    ];
  }
  
  // Convert template to actual message objects
  return conversation.map((item, index) => ({
    id: `msg-${healerId}-${index}`,
    senderId: item.sender,
    receiverId: item.sender === healerId ? userId : healerId,
    text: item.text,
    timestamp: new Date(now.getTime() - item.minutesAgo * 60 * 1000),
    status: 'read'
  }));
}