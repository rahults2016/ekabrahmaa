import { Card, CardContent } from '@/website/ui/card';
import { Badge } from '@/website/ui/badge';
import { 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  ArrowRight, 
  Heart, 
  Brain, 
  Activity, 
  Utensils, 
  Leaf 
} from 'lucide-react';

// Component for the Users icon since it's not imported above
const Users = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// Healing methodology steps with detailed information and images
const healingSteps = [
  {
    id: 'assessment',
    title: 'Comprehensive Assessment',
    description: 'We begin with a thorough understanding of your unique constitution (Prakriti) and current imbalances (Vikriti) through traditional pulse diagnosis and modern health metrics.',
    duration: '60-90 minutes',
    precautions: 'Come well-rested and avoid caffeine for 4 hours before your assessment for accurate readings.',
    sensations: 'You may experience a sense of being deeply understood as we connect your symptoms to root patterns.',
    image: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: <Leaf className="w-6 h-6" />,
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'integration',
    title: 'Five Healers Integration',
    description: 'Our unique approach brings together five expert healers who collaborate on your personalized treatment plan, addressing physical, mental, and emotional aspects simultaneously.',
    duration: 'Throughout your healing journey',
    precautions: 'Be prepared to share your health history with multiple practitioners for a comprehensive approach.',
    sensations: 'Many clients report feeling a sense of relief knowing a team of experts is working together on their behalf.',
    image: 'https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: <Users className="w-6 h-6" />,
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'personalization',
    title: 'Personalized Protocol Design',
    description: 'We create a custom healing protocol tailored to your unique constitution, current imbalances, and lifestyle, including diet, herbs, yoga, and lifestyle modifications.',
    duration: '7-10 days after assessment',
    precautions: 'Your protocol will evolve as you progress; follow the current recommendations rather than skipping ahead.',
    sensations: "Expect to feel a natural alignment with your protocol as it's designed specifically for your constitution.",
    image: 'https://images.pexels.com/photos/4098226/pexels-photo-4098226.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-pink-500 to-red-500'
  },
  {
    id: 'implementation',
    title: 'Guided Implementation',
    description: 'We provide step-by-step guidance and support as you implement your healing protocol, with daily check-ins, adjustments, and educational resources.',
    duration: 'Throughout your program (7-45 days)',
    precautions: 'Healing isn\'t always linear; temporary intensification of symptoms can sometimes occur as part of the healing process.',
    sensations: 'Most clients experience initial improvements within 7-14 days, with continued progress throughout the program.',
    image: 'https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: <Activity className="w-6 h-6" />,
    color: 'from-orange-500 to-yellow-500'
  },
  {
    id: 'lifestyleIntegration',
    title: 'Lifestyle Integration',
    description: 'We help you integrate healing practices into your daily life for lasting transformation, focusing on habit formation, routine establishment, and creating supportive environments.',
    duration: 'Final week of your program + follow-up support',
    precautions: 'Gradual integration is key; focus on consistency rather than perfection as you build new habits.',
    sensations: 'A sense of empowerment and confidence in managing your health independently, with new practices feeling natural and sustainable.',
    image: 'https://images.pexels.com/photos/3759079/pexels-photo-3759079.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: <Brain className="w-6 h-6" />,
    color: 'from-purple-500 to-violet-500'
  }
];

export function HealingMethodologyGuide() {
  return (
    <div className="space-y-16 max-w-5xl mx-auto">
      {healingSteps.map((step, index) => (
        <div key={`step-${step.id}`} className="group">
          <div className="flex items-center mb-6">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white shadow-lg`}>
              {index + 1}
            </div>
            <h2 className="text-2xl font-serif font-bold text-gray-800 ml-4">
              {step.title}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Side */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-80 md:h-auto">
              <img 
                src={step.image} 
                alt={step.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white shadow-lg mb-3`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
              </div>
            </div>
            
            {/* Content Side */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Detailed Instructions</h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <Card className="border-teal-100">
                  <CardContent className="p-4 flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-teal-800 text-sm">Duration</h4>
                      <p className="text-gray-600 text-sm">{step.duration}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-amber-100">
                  <CardContent className="p-4 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-amber-800 text-sm">Precautions</h4>
                      <p className="text-gray-600 text-sm">{step.precautions}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-purple-100">
                  <CardContent className="p-4 flex items-start space-x-3">
                    <Heart className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-purple-800 text-sm">What to Expect</h4>
                      <p className="text-gray-600 text-sm">{step.sensations}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="pt-4">
                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  Key Benefits
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Personalized Care',
                    'Expert Guidance',
                    'Holistic Approach',
                    'Sustainable Results'
                  ].map((benefit, i) => (
                    <Badge 
                      key={`${step.id}-benefit-${i}`}
                      className="bg-gradient-to-r from-teal-50 to-green-50 text-teal-700 border-teal-200"
                    >
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Divider except for last item */}
          {index < healingSteps.length - 1 && (
            <div className="flex justify-center my-12">
              <ArrowRight className="w-6 h-6 text-teal-500" />
            </div>
          )}
        </div>
      ))}
      
      {/* Healing Team Section */}
      <div className="mt-16 pt-16 border-t border-gray-200">
        <h2 className="text-3xl font-serif font-bold text-gray-800 mb-8 text-center">
          Your Healing Team
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { title: 'Ayurvedic Doctor', icon: <Leaf className="w-8 h-8" />, color: 'from-green-500 to-teal-500' },
            { title: 'Nutritionist', icon: <Utensils className="w-8 h-8" />, color: 'from-orange-500 to-red-500' },
            { title: 'Yoga Therapist', icon: <Activity className="w-8 h-8" />, color: 'from-blue-500 to-indigo-500' },
            { title: 'Functional Trainer', icon: <Users className="w-8 h-8" />, color: 'from-purple-500 to-pink-500' },
            { title: 'Psychologist', icon: <Brain className="w-8 h-8" />, color: 'from-pink-500 to-rose-500' }
          ].map((healer, index) => (
            <Card key={`healer-${index}`} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${healer.color} flex items-center justify-center text-white`}>
                  {healer.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{healer.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}