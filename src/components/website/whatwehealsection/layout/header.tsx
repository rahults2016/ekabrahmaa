import { Activity, Brain, Zap } from "lucide-react";

// Type definitions for navigation structure
interface NavSubItem {
  title: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

interface NavSection {
  title: string;
  items: NavSubItem[];
}

interface NavFeatured {
  title: string;
  items: { title: string; href: string; description: string }[];
}

interface NavItem {
  title: string;
  href: string;
  description: string;
  featured?: NavFeatured;
  sections?: NavSection[];
}

// Navigation items for the header
export const navigationItems: NavItem[] = [
  {
    title: 'Home',
    href: '/',
    description: 'Return to homepage'
  },
  {
    title: 'What We Heal',
    href: '/what-we-heal',
    description: 'Conditions we treat',
    featured: {
      title: 'Featured Conditions',
      items: [
        { title: "Women's Health", href: '/what-we-heal#womens-health', description: 'PCOS, fertility, hormonal balance' },
        { title: 'Digestive Health', href: '/what-we-heal#digestive-health', description: 'IBS, bloating, metabolism' }
      ]
    },
    sections: [
      {
        title: 'Health Categories',
        items: [
          { title: 'Mental Wellness', href: '/what-we-heal#mental-wellness', icon: <Brain className="w-4 h-4" />, description: 'Anxiety, depression, stress' },
          { title: 'Hormonal Balance', href: '/what-we-heal#hormonal-balance', icon: <Activity className="w-4 h-4" />, description: 'Thyroid, diabetes, metabolism' },
          { title: 'Lifestyle Conditions', href: '/what-we-heal#lifestyle-conditions', icon: <Zap className="w-4 h-4" />, description: 'Hypertension, obesity, fatigue' }
        ]
      }
    ]
  },
  {
    title: 'Programs',
    href: '/programs',
    description: 'Healing programs',
    featured: {
      title: 'Popular Programs',
      items: [
        { title: 'ekaPavana', href: '/programs/ekapavana', description: '7-day gentle cleansing program' },
        { title: 'ekaSanskara', href: '/programs/ekasanskara', description: '14-day deep transformation' }
      ]
    },
    sections: [
      {
        title: 'Program Types',
        items: [
          { title: 'Self-Guided', href: '/programs?type=self-guided', description: 'Independent healing journey' },
          { title: 'Healer-Guided', href: '/programs?type=healer-guided', description: 'Personalized support' },
          { title: 'Comprehensive', href: '/programs?type=comprehensive', description: 'Full integration approach' }
        ]
      }
    ]
  },
  {
    title: 'About Us',
    href: '/about',
    description: 'Our story and mission',
    sections: [
      {
        title: 'Learn More',
        items: [
          { title: 'Our Healers', href: '/healers', description: 'Meet our expert team' },
          { title: 'Our Approach', href: '/approach', description: '5-healer integration model' },
          { title: 'Success Stories', href: '/stories', description: 'Real transformation stories' }
        ]
      }
    ]
  },
  {
    title: 'Contact',
    href: '/contact',
    description: 'Get in touch',
    sections: [
      {
        title: 'Support',
        items: [
          { title: 'Help Center', href: '/help', description: 'Find answers to common questions' },
          { title: 'Live Chat', href: '/chat', description: 'Instant support' },
          { title: 'Book Consultation', href: '/consultation', description: 'Free 15-minute consultation' }
        ]
      }
    ]
  }
];