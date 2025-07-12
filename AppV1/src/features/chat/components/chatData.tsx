// features/chat/chatData.ts

export interface ChatHealer {
  id: string;
  name: string;
  avatar: string;
  role: string;
  lastMessage: string;
  lastMessageTime: Date;
  online: boolean;
  unread: number;
  status?: 'online' | 'offline' | 'dnd';
}

export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    text: string;
    timestamp: Date;
    status: 'sent' | 'delivered' | 'read';  // Note the exact values
}

export interface GroupMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole: string;
  text: string;
  timestamp: Date;
  category?: 'prescription' | 'advice' | 'general';
  saved?: boolean;
  attachment?: {
    type: 'image' | 'document';
    url: string;
    name: string;
  };
}

export const mockHealers: ChatHealer[] = [
  {
    id: 'doc1',
    name: 'Aparna Albert',
    avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'Ayurveda Doctor',
    lastMessage: 'I recommend continuing with your current routine',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
    online: true,
    unread: 0,
    status: 'online'
  },
  {
    id: 'doc2',
    name: 'Rahul Sharma',
    avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'Yoga Therapist',
    lastMessage: 'How are the breathing exercises going?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 120),
    online: false,
    unread: 2
  },
  {
    id: 'nut1',
    name: 'Shradha Kurup',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'Nutritionist',
    lastMessage: 'Your food journal looks great this week!',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 180),
    online: true,
    unread: 0,
    status: 'dnd'
  }
];

export const generateMockMessages = (healerId: string): Message[] => {
    const baseMessages: Message[] = [
      {
        id: '1',
        senderId: healerId,
        receiverId: 'user',
        text: 'Hello! How can I help you today?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        status: 'read' as const  // Using 'as const' tells TypeScript this is exactly 'read'
      },
      {
        id: '2',
        senderId: 'user',
        receiverId: healerId,
        text: 'I\'ve been having trouble sleeping lately',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        status: 'read' as const
      },
      {
        id: '3',
        senderId: healerId,
        receiverId: 'user',
        text: 'I understand. Let me suggest some relaxation techniques.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        status: 'read' as const
      }
    ];
  
    return baseMessages;
  };
export const mockGroupMessages: GroupMessage[] = [
  {
    id: '1',
    senderId: 'doc1', 
    senderName: 'Dr. Aparna Albert',
    senderAvatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150',
    senderRole: 'Ayurveda Doctor',
    text: 'Welcome to your healing journey! I\'ve reviewed your latest progress and I\'m impressed with your dedication.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    category: 'advice'
  },
  {
    id: '2',
    senderId: 'nut1',
    senderName: 'Shradha Kurup',
    senderAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    senderRole: 'Nutritionist',
    text: 'Your food journal shows great improvement in following the Pitta-pacifying diet. Keep it up!',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    category: 'advice'
  },
  {
    id: '3',
    senderId: 'user',
    senderName: 'You',
    senderAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    senderRole: 'Patient',
    text: 'Thank you both! I\'m feeling much more balanced lately. The morning routine has really helped.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    category: 'general'
  }
];

export const getHealerById = (id: string) => {
  const healers = [
    {
      id: 'doc1',
      name: 'Aparna Albert',
      role: 'Ayurveda Doctor',
      experience: 12,
      rating: 4.9,
      reviews: 245,
      consultations: 1200,
      location: 'Bangalore, India',
      specialties: ['PTSD', 'Anxiety Disorders', 'Stress Management'],
      languages: ['English', 'Hindi', 'Malayalam'],
      biography: 'Dr. Aparna Albert is a renowned Ayurveda specialist with over 12 years of experience in holistic healing. She combines traditional Ayurvedic principles with modern psychotherapy techniques to help patients achieve balance and wellness.',
      verified: true
    },
    {
      id: 'doc2',
      name: 'Rahul Sharma',
      role: 'Yoga Therapist',
      experience: 8,
      rating: 4.7,
      reviews: 182,
      consultations: 850,
      location: 'Delhi, India',
      specialties: ['Trauma Recovery', 'Pranayama', 'Meditation'],
      languages: ['English', 'Hindi'],
      biography: 'Rahul Sharma is a certified yoga therapist specializing in trauma recovery through movement and breathwork. His approach integrates classical yoga with contemporary somatic practices.',
      verified: true
    },
    {
      id: 'nut1',
      name: 'Shradha Kurup',
      role: 'Nutritionist',
      experience: 6,
      rating: 4.8,
      reviews: 156,
      consultations: 720,
      location: 'Mumbai, India',
      specialties: ['Ayurvedic Nutrition', 'Gut Health', 'Mindful Eating'],
      languages: ['English', 'Hindi', 'Marathi'],
      biography: 'Shradha Kurup is a clinical nutritionist with expertise in Ayurvedic dietary principles. She helps clients develop personalized nutrition plans that support both physical and mental wellbeing.',
      verified: true
    }
  ];

  return healers.find(healer => healer.id === id);
};