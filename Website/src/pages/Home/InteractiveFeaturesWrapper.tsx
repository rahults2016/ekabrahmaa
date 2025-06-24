import { InteractiveFeatures } from "@/config/routeConfig";
import { Droplets, Moon, Sun } from "lucide-react";

  const programs = [
    {
      id: 'ekapavana',
      title: 'ekaPavana',
      subtitle: 'Clear Within',
      description: 'Reconnect with your body, breath, and being.',
      duration: '7 Days',
      price: '₹3,999',
      healers: 2,
      type: 'Self-Guided',
      icon: <Droplets className="w-6 h-6" />,
      features: ['Daily consultations', 'Personalized meal plan', 'Yoga sessions', 'Breathing exercises'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'ekasanskara',
      title: 'ekaSanskara',
      subtitle: 'Transform Deeply',
      description: 'Deep transformation through ancient wisdom.',
      duration: '14 Days',
      price: '₹7,999',
      healers: 3,
      type: 'Healer-Guided',
      icon: <Sun className="w-6 h-6" />,
      features: ['Intensive consultations', 'Custom herbal formulations', 'Lifestyle coaching', 'Emotional support'],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'ekanidra',
      title: 'ekaNidra',
      subtitle: 'Rest & Restore',
      description: 'Healing through restorative sleep and rest.',
      duration: '10 Days',
      price: '₹5,499',
      healers: 2,
      type: 'Ailment-Specific',
      icon: <Moon className="w-6 h-6" />,
      features: ['Sleep assessment', 'Meditation sessions', 'Herbal teas', 'Relaxation techniques'],
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const InteractiveFeaturesWrapper = () => {
  return (
      <div className="mt-16 lg:mt-20 lazy-content">
        <InteractiveFeatures programs={programs} />
      </div>
  )
  
};

export default InteractiveFeaturesWrapper;


