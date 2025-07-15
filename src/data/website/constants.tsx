
import { Users, Award, Globe, Heart, Star, TrendingUp, Shield, Clock } from 'lucide-react';

export const faqs = [
  {
    id: 1,
    question: 'How does the 5-healer integration model work?',
    answer: 'Our unique approach brings together an Ayurveda doctor, nutritionist, yoga therapist, functional trainer, and psychologist who collaborate on your personalized healing plan. Each healer contributes their expertise while maintaining constant communication to ensure a holistic approach to your wellness journey.',
    category: 'General'
  },
  {
    id: 2,
    question: 'What makes ekaBrahmaa different from other wellness programs?',
    answer: 'Unlike traditional wellness programs that focus on single aspects of health, ekaBrahmaa addresses your mind, body, and spirit simultaneously. Our team-based approach, personalized constitution analysis (Prakriti), and integration of ancient wisdom with modern practices creates a truly comprehensive healing experience.',
    category: 'General'
  },
  {
    id: 3,
    question: 'How is my program personalized to my unique constitution?',
    answer: 'We start with a comprehensive Prakriti (constitution) assessment that determines your unique Vata, Pitta, and Kapha balance. Based on these results, each of our 5 healers creates specific recommendations - from meal plans and exercise routines to meditation practices and herbal supplements - all tailored to your constitutional needs.',
    category: 'Personalization'
  },
  {
    id: 4,
    question: 'What can I expect in terms of results and timeline?',
    answer: 'Most clients begin experiencing improvements within the first week, with significant changes typically visible by day 14. However, healing is a personal journey and timelines vary. Our programs range from 7 to 45 days, allowing for different depths of transformation based on your goals and availability.',
    category: 'Results'
  },
  {
    id: 5,
    question: 'Do I need any prior experience with Ayurveda or yoga?',
    answer: 'Absolutely not! Our programs are designed for complete beginners as well as advanced practitioners. Your healer team will guide you step-by-step, providing clear instructions, educational materials, and constant support throughout your journey. We meet you exactly where you are.',
    category: 'Getting Started'
  },
  {
    id: 6,
    question: 'How do I access my healers and get support?',
    answer: 'You\'ll have multiple ways to conxnect with your team: through our mobile app for daily check-ins, scheduled video/phone consultations, emergency support chat, and access to your healer dashboard. Most programs include daily touchpoints with at least one team member.',
    category: 'Support'
  },
  {
    id: 7,
    question: 'What if I have dietary restrictions or health conditions?',
    answer: 'Our team specializes in working with various health conditions and dietary needs. During your initial assessment, we carefully review your medical history, current medications, allergies, and preferences to create a completely safe and effective program tailored to your specific situation.',
    category: 'Health Concerns'
  },
  {
    id: 8,
    question: 'Is there ongoing support after my program ends?',
    answer: 'Yes! Depending on your program, you receive 1-3 months of follow-up support. This includes maintenance guidelines, check-in consultations, access to our community platform, and the option to book additional sessions with any of your healers as needed.',
    category: 'After Program'
  }
];

export const categories = ['All', 'General', 'Personalization', 'Results', 'Getting Started', 'Support', 'Health Concerns', 'After Program'];


export const stats = [
  {
    icon: <Users className="w-8 h-8" />,
    number: 10000,
    suffix: '+',
    label: 'People Healed',
    description: 'Transformed lives across the globe',
    color: 'from-teal-500 to-teal-600'
  },
  {
    icon: <Award className="w-8 h-8" />,
    number: 98,
    suffix: '%',
    label: 'Success Rate',
    description: 'Proven healing outcomes',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: <Globe className="w-8 h-8" />,
    number: 50,
    suffix: '+',
    label: 'Countries',
    description: 'Global healing community',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: <Star className="w-8 h-8" />,
    number: 4.9,
    suffix: '/5',
    label: 'Rating',
    description: 'Outstanding client satisfaction',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    number: 87,
    suffix: '%',
    label: 'Improvement',
    description: 'Average health improvement',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    number: 100,
    suffix: '%',
    label: 'Natural',
    description: 'Chemical-free healing',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    icon: <Heart className="w-8 h-8" />,
    number: 24,
    suffix: '/7',
    label: 'Support',
    description: 'Round-the-clock care',
    color: 'from-pink-500 to-pink-600'
  },
  {
    icon: <Clock className="w-8 h-8" />,
    number: 14,
    suffix: ' days',
    label: 'Average',
    description: 'Time to see results',
    color: 'from-indigo-500 to-indigo-600'
  }
];

export const features = [
    'Real-time healer support',
    'Personalized meal plans',
    'Guided meditations',
    'Progress tracking',
    'Yoga & exercise videos',
    'Offline content access'
  ];

export const appstats = [
    { number: '50,000+', label: 'App Downloads' },
    { number: '4.8★', label: 'App Store Rating' },
    { number: '24/7', label: 'Healer Support' }
  ];


  
export const socialPosts = [
  {
    id: 1,
    platform: 'instagram',
    user: '@ekabrahmaa_official',
    content: 'Morning meditation session with our community! ✨ Starting the day with intention and gratitude. #MorningRitual #Ayurveda',
    image: 'https://images.pexels.com/photos/3759079/pexels-photo-3759079.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: 1234,
    comments: 56,
    shares: 23,
    timestamp: '2h ago',
    link: 'https://instagram.com/ekabrahmaa'
  },
  {
    id: 2,
    platform: 'twitter',
    user: '@ekaBrahmaa',
    content: 'Quick tip for better digestion: Drink warm water with lemon and ginger first thing in the morning. Your Agni (digestive fire) will thank you! 🔥',
    likes: 567,
    comments: 34,
    shares: 89,
    timestamp: '4h ago',
    link: 'https://twitter.com/ekabrahmaa'
  },
  {
    id: 3,
    platform: 'facebook',
    user: 'ekaBrahmaa Healing',
    content: 'Incredible transformation story from our community member Sarah! 💚 From chronic fatigue to boundless energy in just 21 days.',
    image: 'https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: 892,
    comments: 67,
    shares: 145,
    timestamp: '6h ago',
    link: 'https://facebook.com/ekabrahmaa'
  },
  {
    id: 4,
    platform: 'instagram',
    user: '@ekabrahmaa_official',
    content: 'Today\'s Ayurvedic recipe: Golden milk turmeric latte! 🌟 Perfect for winding down and supporting immunity.',
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: 734,
    comments: 45,
    shares: 67,
    timestamp: '8h ago',
    link: 'https://instagram.com/ekabrahmaa'
  },
  {
    id: 5,
    platform: 'twitter',
    user: '@ekaBrahmaa',
    content: 'Remember: Healing is not about quick fixes. It\'s about understanding your unique constitution and working with your body\'s natural wisdom. 🌿',
    likes: 445,
    comments: 28,
    shares: 56,
    timestamp: '10h ago',
    link: 'https://twitter.com/ekabrahmaa'
  },
  {
    id: 6,
    platform: 'facebook',
    user: 'ekaBrahmaa Healing',
    content: 'Join us for our live webinar tomorrow: "Understanding Your Dosha for Better Health" - Free for all community members! 📚',
    likes: 623,
    comments: 89,
    shares: 112,
    timestamp: '12h ago',
    link: 'https://facebook.com/ekabrahmaa'
  }
];


export const ugcPosts = [
  {
    id: 1,
    type: 'review',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true
    },
    content: 'Amazing transformation in just 2 weeks! My energy levels are through the roof and my skin is glowing. Thank you ekaBrahmaa! 🙏',
    rating: 5,
    image: 'https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg',
    program: 'ekaSanskara',
    likes: 234,
    comments: 18,
    shares: 45,
    platform: 'instagram'
  },
  {
    id: 2,
    type: 'before-after',
    user: {
      name: 'Mike Chen',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true
    },
    content: 'Lost 15kg and gained so much confidence! The personalized approach really works.',
    rating: 5,
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
    program: 'ekaUdaya',
    likes: 456,
    comments: 32,
    shares: 67,
    platform: 'facebook'
  },
  {
    id: 3,
    type: 'video',
    user: {
      name: 'Priya Sharma',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true
    },
    content: 'My daily morning routine has completely changed my life. Watch my journey!',
    rating: 5,
    image: 'https://images.pexels.com/photos/3759079/pexels-photo-3759079.jpeg',
    program: 'ekaPavana',
    likes: 789,
    comments: 56,
    shares: 123,
    platform: 'instagram',
    isVideo: true
  },
  {
    id: 4,
    type: 'review',
    user: {
      name: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true
    },
    content: 'The personalized meal plans were a game changer. I never felt restricted, just nourished! 🌱',
    rating: 5,
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
    program: 'ekaSamanvaya',
    likes: 345,
    comments: 24,
    shares: 38,
    platform: 'twitter'
  },
  {
    id: 5,
    type: 'milestone',
    user: {
      name: 'David Lee',
      avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true
    },
    content: '100 days smoke-free thanks to the holistic approach! Mind, body, and spirit aligned.',
    rating: 5,
    image: 'https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg',
    program: 'ekaPrabodha',
    likes: 567,
    comments: 78,
    shares: 89,
    platform: 'instagram'
  },
  {
    id: 6,
    type: 'transformation',
    user: {
      name: 'Lisa Rodriguez',
      avatar: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true
    },
    content: 'From chronic fatigue to feeling energized every day. This program saved my life! 💚',
    rating: 5,
    image: 'https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg',
    program: 'ekaUdaya',
    likes: 892,
    comments: 134,
    shares: 156,
    platform: 'facebook'
  }
];