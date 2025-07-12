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
    status: 'sent' | 'delivered' | 'read';
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
  
  export interface DetailedHealer {
    id: string;
    name: string;
    role: string;
    experience: number;
    rating: number;
    reviews: number;
    consultations: number;
    location: string;
    specialties: string[];
    languages: string[];
    biography: string;
    verified: boolean;
  }