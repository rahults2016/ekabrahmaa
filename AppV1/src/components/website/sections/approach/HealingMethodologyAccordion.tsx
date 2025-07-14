import { useState } from 'react';
import { Card } from '@/website/ui/card';
import { Button } from '@/website/ui/button';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

// Healing methodology steps with detailed information
const healingSteps = [
  {
    id: 'assessment',
    title: 'Comprehensive Assessment',
    summary: 'Understanding your unique constitution and current imbalances',
    content: 'We begin with a thorough analysis of your Prakriti (natural constitution) and Vikriti (current imbalances). This personalized assessment combines traditional pulse diagnosis with modern health metrics to create a complete picture of your health. Our team identifies the root causes of your concerns rather than just addressing symptoms.',
    outcomes: [
      'Clear understanding of your unique mind-body type',
      'Identification of root imbalances causing symptoms',
      'Baseline measurements for tracking progress'
    ]
  },
  {
    id: 'fiveHealersIntegration',
    title: 'Five Healers Integration',
    summary: 'A collaborative team approach to your healing journey',
    content: 'Our unique methodology brings together five expert healers—Ayurvedic doctor, nutritionist, yoga therapist, functional trainer, and psychologist—who collaborate on your case. Unlike conventional approaches where specialists work in isolation, our team meets regularly to ensure all aspects of your treatment work in harmony, addressing your physical, mental, and emotional wellbeing simultaneously.',
    outcomes: [
      'Truly holistic care with no contradictory advice',
      'Comprehensive approach to complex health challenges',
      'Support for both body and mind throughout healing'
    ]
  },
  {
    id: 'personalization',
    title: 'Personalized Protocol Design',
    summary: 'Custom healing plan tailored to your unique needs',
    content: 'Based on your assessment, we create a personalized healing protocol that addresses your specific imbalances and health goals. This includes custom dietary recommendations, herbal formulations, yoga and movement practices, and lifestyle modifications. Every element is carefully calibrated to your constitution and current state, ensuring optimal effectiveness and comfort.',
    outcomes: [
      'Constitution-specific nutrition and herbal support',
      'Customized movement and breathwork practices',
      'Targeted lifestyle adjustments for lasting change'
    ]
  },
  {
    id: 'implementation',
    title: 'Guided Implementation',
    summary: 'Step-by-step support throughout your healing journey',
    content: 'Implementation is where transformation happens. Our team provides daily guidance through our app, regular check-ins, and on-demand support. We help you navigate challenges, answer questions, and make real-time adjustments to your protocol. This ensures you\'re never alone on your healing journey and can implement changes at a pace that works for you.',
    outcomes: [
      'Daily support and accountability',
      'Real-time protocol adjustments based on your progress',
      'Educational resources to deepen your understanding'
    ]
  },
  {
    id: 'lifestyleIntegration',
    title: 'Lifestyle Integration',
    summary: 'Embedding healing practices into your daily life',
    content: 'True healing isn\'t a temporary fix but a lifestyle transformation. In this phase, we help you integrate your new practices into daily life for lasting results. We focus on habit formation, routine establishment, and creating supportive environments. This ensures your healing journey continues long after your formal program ends, empowering you with the tools for lifelong wellness.',
    outcomes: [
      'Sustainable lifestyle changes that last',
      'Tools to maintain balance in challenging situations',
      'Gradual transition to self-sufficiency and empowerment'
    ]
  }
];

export function HealingMethodologyAccordion() {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const toggleStep = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {healingSteps.map((step, index) => (
        <Card 
          key={step.id}
          className={`border-teal-100 shadow-lg hover:shadow-xl transition-all duration-300 ${
            expandedStep === step.id ? 'shadow-xl border-teal-200' : ''
          }`}
        >
          <div 
            className={`p-6 sm:p-8 cursor-pointer ${
              expandedStep === step.id ? 'bg-gradient-to-r from-teal-50 to-pink-50' : ''
            }`}
            onClick={() => toggleStep(step.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                  expandedStep === step.id 
                    ? 'bg-gradient-to-r from-teal-600 to-teal-700' 
                    : 'bg-gradient-to-r from-teal-500 to-teal-600'
                }`}>
                  {index + 1}
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-teal-900">
                  {step.title}
                </h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-full h-8 w-8 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStep(step.id);
                }}
              >
                {expandedStep === step.id ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </Button>
            </div>
            
            {/* Always visible summary */}
            <p className="text-teal-600 mt-3 ml-14">
              {step.summary}
            </p>
            
            {/* Expanded content */}
            <div className={`mt-6 ml-14 overflow-hidden transition-all duration-300 ${
              expandedStep === step.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <p className="text-gray-700 mb-6 leading-relaxed text-base">
                {step.content}
              </p>
              
              <div className="bg-white rounded-lg p-6 border border-teal-100 shadow-sm">
                <h4 className="font-medium text-teal-800 mb-4">Expected Outcomes:</h4>
                <div className="space-y-2">
                  {step.outcomes.map((outcome, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}