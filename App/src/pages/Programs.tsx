import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Lock, Flower, Calendar, Clock, Pill, Utensils, ShoppingCart, Moon, User, MapPin, CheckCircle, AlertCircle, Droplet } from 'lucide-react';
import ProgressRing from '../components/common/ProgressRing';

// Enhanced interfaces for Ayurvedic treatment schedule
interface InternalMedicine {
  id: string;
  name: string;
  dosage: string;
  timing: string; // e.g., "Before meals", "After meals", "Empty stomach"
  duration: string; // e.g., "21 days", "3 months"
  instructions: string;
  taken: boolean;
  prescriptionDate: string;
  // Added stock information
  stockDays?: number; // days of medicine remaining
  reorderPoint?: number; // when to reorder (in days)
  price?: number; // price for reordering
}

interface ExternalApplication {
  id: string;
  therapyName: string;
  bodyArea: string;
  timing: string;
  frequency: string; // e.g., "Daily", "Twice weekly"
  administeredBy: 'self' | 'therapist';
  instructions: string;
  completed: boolean;
}

interface PanchakarmaPhase {
  id: string;
  phaseName: string;
  duration: string;
  medicines: string[];
  oils: string[];
  dosage: string;
  timing: string;
  specialInstructions: string[];
  completed: boolean;
}

interface SOSMedication {
  id: string;
  medicineName: string;
  dosage: string;
  timing: string;
  targetSymptoms: string[];
  duration: string;
  prescriptionDate: string;
  used: boolean;
}

interface Program {
  id: string;
  title: string;
  description: string;
  duration: number;
  progress: number;
  unlocked: boolean;
  price?: number;
  activities?: {
    yoga: string[];
    meditation: string[];
    diet: {
      breakfast: string[];
      lunch: string[];
      dinner: string[];
    };
  };
  // Enhanced Ayurvedic treatment schedule
  internalMedicines?: InternalMedicine[];
  externalApplications?: ExternalApplication[];
  panchakarmaPlan?: PanchakarmaPhase[];
  sosMedications?: SOSMedication[];
  medications?: {
    name: string;
    dosage: string;
    timing: string;
    stock: number;
    reorderPoint: number;
    price: number;
  }[];
  appointments?: {
    date: string;
    time: string;
    type: string;
    doctor: string;
  }[];
  upcomingCleanses?: {
    name: string;
    startDate: string;
    duration: number;
    description: string;
  }[];
}

const programs: Program[] = [
  {
    id: '1',
    title: 'ekaSamanvaya – "In tune with you"',
    description: 'Come back to harmony with your inner nature through tailored yoga, breathwork, and nutrition.',
    duration: 21,
    progress: 38, // 8 days out of 21
    unlocked: true,
    activities: {
      yoga: [
        'Morning Sun Salutations - 20 mins',
        'Evening Restorative Flow - 30 mins'
      ],
      meditation: [
        'Pranayama Practice - 15 mins',
        'Mindfulness Meditation - 20 mins'
      ],
      diet: {
        breakfast: ['Warm lemon water', 'Oatmeal with cinnamon'],
        lunch: ['Kitchari', 'Steamed vegetables'],
        dinner: ['Light soup', 'Roasted root vegetables']
      }
    },
    // Comprehensive Ayurvedic treatment schedule
    internalMedicines: [
      {
        id: 'im1',
        name: 'Triphala Churna',
        dosage: '1 teaspoon (5g)',
        timing: 'Before bedtime with warm water',
        duration: '21 days',
        instructions: 'Mix with warm water, wait 10 minutes before consumption',
        taken: false,
        prescriptionDate: '2025-04-15',
        stockDays: 5, // Only 5 days left - low stock
        reorderPoint: 7,
        price: 450
      },
      {
        id: 'im2',
        name: 'Ashwagandha Capsules',
        dosage: '500mg (2 capsules)',
        timing: 'Morning and Evening after meals',
        duration: '3 months',
        instructions: 'Take with warm milk or water. Avoid during fever.',
        taken: false,
        prescriptionDate: '2025-04-15',
        stockDays: 12, // Good stock
        reorderPoint: 10,
        price: 750
      },
      {
        id: 'im3',
        name: 'Saraswatarishta',
        dosage: '15ml',
        timing: 'After lunch and dinner',
        duration: '1 month',
        instructions: 'Mix with equal amount of water. For mental clarity and memory.',
        taken: false,
        prescriptionDate: '2025-04-15',
        stockDays: 0, // Out of stock
        reorderPoint: 5,
        price: 320
      },
      {
        id: 'im4',
        name: 'Brahmi Ghrita',
        dosage: '1/2 teaspoon (2.5ml)',
        timing: 'Empty stomach in morning',
        duration: '21 days',
        instructions: 'Follow with warm water. Avoid cold foods for 1 hour.',
        taken: false,
        prescriptionDate: '2025-04-15',
        stockDays: 3, // Critical low stock
        reorderPoint: 7,
        price: 1200
      }
    ],
    externalApplications: [
      {
        id: 'ea1',
        therapyName: 'Abhyanga (Oil Massage)',
        bodyArea: 'Full body',
        timing: 'Morning before bath',
        frequency: 'Daily',
        administeredBy: 'self',
        instructions: 'Use sesame oil, massage for 15-20 minutes, follow with warm bath',
        completed: false
      },
      {
        id: 'ea2',
        therapyName: 'Shiropichu',
        bodyArea: 'Head and scalp',
        timing: 'Evening',
        frequency: 'Alternate days',
        administeredBy: 'therapist',
        instructions: 'Oil pooling on head for 30 minutes. Keep head covered after treatment.',
        completed: false
      },
      {
        id: 'ea3',
        therapyName: 'Nasya (Nasal drops)',
        bodyArea: 'Nasal passages',
        timing: 'Morning after brushing teeth',
        frequency: 'Daily',
        administeredBy: 'self',
        instructions: '2 drops Anu taila in each nostril. Inhale gently.',
        completed: false
      },
      {
        id: 'ea4',
        therapyName: 'Padabhyanga (Foot massage)',
        bodyArea: 'Both feet',
        timing: 'Before bedtime',
        frequency: 'Daily',
        administeredBy: 'self',
        instructions: 'Use warm sesame oil, massage for 10 minutes before sleep',
        completed: false
      }
    ],
    panchakarmaPlan: [
      {
        id: 'pk1',
        phaseName: 'Purvakarma (Pre-operative)',
        duration: '5 days',
        medicines: ['Triphala Churna', 'Castor Oil'],
        oils: ['Sesame Oil', 'Dhanwantharam Oil'],
        dosage: 'Triphala: 1 tsp, Castor oil: 10ml',
        timing: 'Evening with warm water',
        specialInstructions: [
          'Light vegetarian diet only',
          'Avoid cold and raw foods',
          'Daily abhyanga with warm oil',
          'Early sleep by 10 PM'
        ],
        completed: false
      },
      {
        id: 'pk2',
        phaseName: 'Pradhanakarma (Main operative)',
        duration: '7 days',
        medicines: ['Virechana Churna', 'Hingvastaka Churna'],
        oils: ['Mahanarayan Oil', 'Ksheerabala Oil'],
        dosage: 'As per daily prescription',
        timing: 'Early morning on empty stomach',
        specialInstructions: [
          'Complete bed rest during procedure days',
          'Liquid diet on procedure days',
          'Constant monitoring by therapist',
          'No physical exertion'
        ],
        completed: false
      },
      {
        id: 'pk3',
        phaseName: 'Paschatkarma (Post-operative)',
        duration: '7 days',
        medicines: ['Saraswatarishta', 'Chyawanprash'],
        oils: ['Brahmi Ghrita', 'Kumkumadi Oil'],
        dosage: 'Gradual increase as per tolerance',
        timing: 'After meals',
        specialInstructions: [
          'Gradual return to normal diet',
          'Light activities only',
          'Avoid heavy lifting',
          'Regular follow-up consultations'
        ],
        completed: false
      },
      {
        id: 'pk4',
        phaseName: 'Rasayana (Rejuvenation)',
        duration: '14 days',
        medicines: ['Brahma Rasayana', 'Amalaki Rasayana'],
        oils: ['Narayana Oil', 'Mahanarayana Oil'],
        dosage: '1 tsp twice daily',
        timing: 'Morning and evening',
        specialInstructions: [
          'Nutritious, balanced diet',
          'Gentle yoga and pranayama',
          'Adequate sleep and rest',
          'Positive mental attitude'
        ],
        completed: false
      }
    ],
    sosMedications: [
      {
        id: 'sos1',
        medicineName: 'Ajmodadi Churna',
        dosage: '1/2 teaspoon',
        timing: 'With warm water when needed',
        targetSymptoms: ['Gas', 'Bloating', 'Abdominal discomfort'],
        duration: 'As needed, max 3 times daily',
        prescriptionDate: '2025-04-15',
        used: false
      },
      {
        id: 'sos2',
        medicineName: 'Saraswata Churna',
        dosage: '1/4 teaspoon',
        timing: 'With honey before meals',
        targetSymptoms: ['Mental fatigue', 'Lack of concentration', 'Memory issues'],
        duration: 'As needed, max twice daily',
        prescriptionDate: '2025-04-15',
        used: false
      },
      {
        id: 'sos3',
        medicineName: 'Lavangadi Churna',
        dosage: '1 pinch',
        timing: 'With warm water',
        targetSymptoms: ['Nausea', 'Vomiting', 'Loss of appetite'],
        duration: 'As needed',
        prescriptionDate: '2025-04-15',
        used: false
      },
      {
        id: 'sos4',
        medicineName: 'Jatamansi Churna',
        dosage: '1/2 teaspoon',
        timing: 'With warm milk before bed',
        targetSymptoms: ['Anxiety', 'Restlessness', 'Sleep disturbances'],
        duration: 'As needed for sleep',
        prescriptionDate: '2025-04-15',
        used: false
      }
    ],
    medications: [
      {
        name: 'Triphala Churna',
        dosage: '1 tsp',
        timing: 'Before bed',
        stock: 15,
        reorderPoint: 10,
        price: 850
      },
      {
        name: 'Ashwagandha',
        dosage: '500mg',
        timing: 'Morning & Evening',
        stock: 20,
        reorderPoint: 15,
        price: 750
      }
    ],
    appointments: [
      {
        date: '2025-05-01',
        time: '10:00 AM',
        type: 'Consultation',
        doctor: 'Dr. Aparna Albert'
      }
    ],
    upcomingCleanses: [
      {
        name: 'Virechana',
        startDate: '2025-05-15',
        duration: 7,
        description: 'Gentle cleansing program to reset your system'
      }
    ]
  },
  {
    id: '2',
    title: 'ekaPavana – "Clear Within"',
    description: 'Reconnect with your body, breath, and being through powerful Ayurvedic practices.',
    duration: 14,
    progress: 0,
    unlocked: false,
    price: 4999
  },
  {
    id: '3',
    title: 'ekaSanskara – "Rewrite your Rhythm"',
    description: 'Reset your habits, calm your system, and realign with your truth through mindful practices.',
    duration: 14,
    progress: 0,
    unlocked: false
  },
  {
    id: '4',
    title: 'ekaUdaya – "Rise into Radiance"',
    description: 'Glow from within as you step into a lighter, brighter self through gentle detoxification and rejuvenation.',
    duration: 28,
    progress: 0,
    unlocked: false
  },
  {
    id: '5',
    title: 'ekaPrabodha – "Awaken the Wisdom Within"',
    description: 'Uncover deeper healing and intuitive strength through mindful living and advanced Ayurvedic practices.',
    duration: 45,
    progress: 0,
    unlocked: false
  }
];

const ProgramCard: React.FC<{ program: Program, onSelect: (program: Program) => void }> = ({ program, onSelect }) => {
  return (
    <div className={`card hover:shadow-lg ${program.unlocked ? '' : 'opacity-80'}`}>
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="md:mr-6 mb-4 md:mb-0 flex justify-center">
          <ProgressRing progress={program.progress}>
            {program.unlocked ? (
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-xs text-charcoal-light">Day</span>
                <span className="text-2xl font-semibold text-teal">
                  {Math.round(program.duration * program.progress / 100)}
                </span>
                <span className="text-xs text-charcoal-light">of {program.duration}</span>
              </div>
            ) : (
              <Lock size={28} className="text-charcoal-light" />
            )}
          </ProgressRing>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className="text-xl font-garamond font-semibold text-charcoal-dark">
              {program.title}
            </h3>
            {!program.unlocked && (
              <span className="ml-2 bg-charcoal-light/10 text-charcoal-light text-xs px-2 py-1 rounded-full">
                Locked
              </span>
            )}
          </div>
          
          <p className="text-charcoal-light text-sm mb-4">{program.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-charcoal-light">{program.duration} days</span>
            
            {program.unlocked ? (
              <button 
                onClick={() => onSelect(program)} 
                className="inline-flex items-center text-teal hover:text-teal-dark transition-colors"
              >
                <span className="mr-1">Continue</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button className="btn-primary text-sm py-1 px-4">
                Unlock for ₹{program.price}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Programs: React.FC = () => {
  const [currentProgram, setCurrentProgram] = useState<Program>(programs[0]);
  const [showProgramDetails, setShowProgramDetails] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [activityStatus, setActivityStatus] = useState<{[key: string]: boolean}>({});
  const [medicationStatus, setMedicationStatus] = useState<{[key: string]: boolean}>({});
  const [internalMedicineStatus, setInternalMedicineStatus] = useState<{[key: string]: boolean}>({});
  const [externalApplicationStatus, setExternalApplicationStatus] = useState<{[key: string]: boolean}>({});
  const [sosStatus, setSOSStatus] = useState<{[key: string]: boolean}>({});
  
  // Calculate program dates
  const startDate = new Date();
  const currentDay = Math.round(currentProgram.duration * currentProgram.progress / 100);
  startDate.setDate(startDate.getDate() - currentDay + 1);
  
  // Generate calendar days
  const calendarDays = Array.from({ length: currentProgram.duration }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    return {
      date,
      day: i + 1,
      isCompleted: i + 1 <= currentDay,
      isCurrent: i + 1 === currentDay
    };
  });
  
  const handleProgramSelect = (program: Program) => {
    setCurrentProgram(program);
    setShowProgramDetails(true);
    setSelectedPhase(null);
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Preparation': return 'bg-pink-light text-pink';
      case 'Foundation': return 'bg-teal-light/20 text-teal';
      case 'Transformation': return 'bg-gold-light/20 text-gold';
      case 'Integration': return 'bg-teal text-white';
      default: return 'bg-gray-100 text-charcoal-light';
    }
  };

  const programPhases = [
    {
      name: 'Preparation',
      days: '1-5',
      description: 'Building the foundation for your healing journey',
      activities: ['Initial consultation', 'Dosha assessment', 'Diet planning']
    },
    {
      name: 'Foundation',
      days: '6-10',
      description: 'Establishing daily wellness routines',
      activities: ['Morning practices', 'Herbal supplements', 'Gentle movement']
    },
    {
      name: 'Transformation',
      days: '11-15',
      description: 'Deepening your healing practices',
      activities: ['Advanced practices', 'Detoxification', 'Energy work']
    },
    {
      name: 'Integration',
      days: '16-21',
      description: 'Integrating learnings into daily life',
      activities: ['Lifestyle adjustments', 'Progress review', 'Future planning']
    }
  ];

  const handleReorderMedication = (medication: Program['medications'][0]) => {
    // Handle reordering logic here
    console.log('Reordering:', medication);
  };
  
  const handleActivityComplete = (activityName: string) => {
    setActivityStatus(prev => ({
      ...prev,
      [activityName]: !prev[activityName]
    }));
  };
  
  const handleMedicationTaken = (medicationName: string) => {
    setMedicationStatus(prev => ({
      ...prev,
      [medicationName]: !prev[medicationName]
    }));
  };

  const handleInternalMedicineTaken = (medicineId: string) => {
    setInternalMedicineStatus(prev => ({
      ...prev,
      [medicineId]: !prev[medicineId]
    }));
  };

  const handleExternalApplicationCompleted = (applicationId: string) => {
    setExternalApplicationStatus(prev => ({
      ...prev,
      [applicationId]: !prev[applicationId]
    }));
  };

  const handleSOSUsed = (sosId: string) => {
    setSOSStatus(prev => ({
      ...prev,
      [sosId]: !prev[sosId]
    }));
  };

  // Stock alert calculations
  const getAllMedicinesRequiringAttention = () => {
    const alerts: Array<{name: string, stock: number, reorderPoint: number, status: string, price: number}> = [];
    
    // Check current program medications
    if (currentProgram.medications) {
      currentProgram.medications.forEach(med => {
        if (med.stock <= med.reorderPoint) {
          const status = med.stock === 0 ? 'out-of-stock' : 
                       med.stock <= med.reorderPoint * 0.5 ? 'critical' : 'low-stock';
          alerts.push({
            name: med.name,
            stock: med.stock,
            reorderPoint: med.reorderPoint,
            status,
            price: med.price
          });
        }
      });
    }
    
    return alerts;
  };

  const medicineAlerts = getAllMedicinesRequiringAttention();

  // Helper function to get stock status for internal medicines
  const getStockStatus = (stockDays: number, reorderPoint: number) => {
    if (stockDays === 0) return { status: 'out-of-stock', color: 'text-pink bg-pink-light/20', text: 'Out of Stock' };
    if (stockDays <= reorderPoint * 0.5) return { status: 'critical', color: 'text-pink bg-pink-light/20 animate-pulse', text: 'Critical Low' };
    if (stockDays <= reorderPoint) return { status: 'low-stock', color: 'text-gold bg-gold-light/20', text: 'Low Stock' };
    return { status: 'good', color: 'text-teal bg-teal-light/10', text: 'Good Stock' };
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
          <h2 className="text-3xl font-garamond font-semibold text-charcoal-dark mb-2">
            Your Healing Programs
          </h2>
          <p className="text-charcoal-light">
            Continue your wellness journey with personalized healing programs
          </p>
          </div>
          {showProgramDetails && (
            <button 
              onClick={() => setShowProgramDetails(false)}
              className="btn-secondary"
            >
              Back to Programs
            </button>
          )}
        </div>
        
        {!showProgramDetails ? (
          <div className="space-y-6">
            {/* Unlocked Programs */}
            <div>
              <h3 className="text-2xl font-garamond font-semibold mb-4 text-charcoal-dark">
                Active Programs
              </h3>
              <div className="space-y-4">
                {programs.filter(p => p.unlocked).map((program) => (
                  <ProgramCard 
                    key={program.id} 
                    program={program}
                    onSelect={handleProgramSelect}
                  />
                ))}
              </div>
            </div>

            {/* Locked Programs */}
            <div>
              <h3 className="text-2xl font-garamond font-semibold mb-4 text-charcoal-dark">
                Available Programs
              </h3>
              <div className="space-y-4">
                {programs.filter(p => !p.unlocked).map((program) => (
                  <ProgramCard 
                    key={program.id} 
                    program={program}
                    onSelect={handleProgramSelect}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Program Header */}
            <div className="card">
              <h3 className="text-2xl font-garamond font-semibold text-charcoal-dark mb-2">
                {currentProgram.title}
              </h3>
              <p className="text-charcoal-light">{currentProgram.description}</p>
            </div>

            {/* Today's Activities - MOVED UP */}
            <div className="card">
              <h4 className="text-xl font-garamond font-semibold mb-6">Today's Activities</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Movement & Breath */}
                <div>
                  <h5 className="font-medium mb-4">Movement & Breath</h5>
                  <div className="space-y-3">
                    {currentProgram.activities?.yoga.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-teal-light/10 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center text-white mr-3">
                            <Flower size={16} />
                          </div>
                          <span>{activity}</span>
                        </div>
                        <button
                          onClick={() => handleActivityComplete(activity)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            activityStatus[activity]
                              ? 'bg-teal text-white'
                              : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                          }`}
                        >
                          {activityStatus[activity] ? 'Completed' : 'Mark Done'}
                        </button>
                      </div>
                    ))}
                    {currentProgram.activities?.meditation.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-pink-light/20 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-pink flex items-center justify-center text-white mr-3">
                            <Moon size={16} />
                          </div>
                          <span>{activity}</span>
                        </div>
                        <button
                          onClick={() => handleActivityComplete(activity)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            activityStatus[activity]
                              ? 'bg-pink text-white'
                              : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                          }`}
                        >
                          {activityStatus[activity] ? 'Completed' : 'Mark Done'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Diet Plan */}
                <div>
                  <h5 className="font-medium mb-4">Today's Diet Plan</h5>
                  <div className="space-y-4">
                    <div className="p-3 bg-gold-light/20 rounded-lg">
                      <h6 className="font-medium mb-2">Breakfast</h6>
                      <ul className="space-y-2">
                        {currentProgram.activities?.diet.breakfast.map((item, index) => (
                          <li key={index} className="flex items-center justify-between">
                            <span>{item}</span>
                            <button
                              onClick={() => handleActivityComplete(`breakfast-${item}`)}
                              className={`px-3 py-1 rounded-full text-xs ${
                                activityStatus[`breakfast-${item}`]
                                  ? 'bg-gold text-white'
                                  : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                              }`}
                            >
                              {activityStatus[`breakfast-${item}`] ? 'Taken' : 'Log'}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-gold-light/20 rounded-lg">
                      <h6 className="font-medium mb-2">Lunch</h6>
                      <ul className="space-y-2">
                        {currentProgram.activities?.diet.lunch.map((item, index) => (
                          <li key={index} className="flex items-center justify-between">
                            <span>{item}</span>
                            <button
                              onClick={() => handleActivityComplete(`lunch-${item}`)}
                              className={`px-3 py-1 rounded-full text-xs ${
                                activityStatus[`lunch-${item}`]
                                  ? 'bg-gold text-white'
                                  : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                              }`}
                            >
                              {activityStatus[`lunch-${item}`] ? 'Taken' : 'Log'}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-gold-light/20 rounded-lg">
                      <h6 className="font-medium mb-2">Dinner</h6>
                      <ul className="space-y-2">
                        {currentProgram.activities?.diet.dinner.map((item, index) => (
                          <li key={index} className="flex items-center justify-between">
                            <span>{item}</span>
                            <button
                              onClick={() => handleActivityComplete(`dinner-${item}`)}
                              className={`px-3 py-1 rounded-full text-xs ${
                                activityStatus[`dinner-${item}`]
                                  ? 'bg-gold text-white'
                                  : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                              }`}
                            >
                              {activityStatus[`dinner-${item}`] ? 'Taken' : 'Log'}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Internal Medicines */}
            {currentProgram.internalMedicines && currentProgram.internalMedicines.length > 0 && (
              <div className="card">
                <h3 className="text-xl font-garamond font-semibold mb-6 flex items-center">
                  <Pill size={24} className="text-teal mr-3" />
                  Internal Medicines
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left p-3 font-medium">Medicine Name</th>
                        <th className="text-left p-3 font-medium">Dosage</th>
                        <th className="text-left p-3 font-medium">🕗 Timing</th>
                        <th className="text-left p-3 font-medium">Duration</th>
                        <th className="text-left p-3 font-medium">📦 Stock Status</th>
                        <th className="text-left p-3 font-medium">Instructions</th>
                        <th className="text-center p-3 font-medium">✅ Track</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProgram.internalMedicines.map((medicine) => {
                        const stockInfo = medicine.stockDays !== undefined && medicine.reorderPoint !== undefined 
                          ? getStockStatus(medicine.stockDays, medicine.reorderPoint)
                          : null;
                        
                        return (
                          <tr key={medicine.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-3 font-medium text-charcoal-dark">{medicine.name}</td>
                            <td className="p-3 text-charcoal">{medicine.dosage}</td>
                            <td className="p-3 text-charcoal">{medicine.timing}</td>
                            <td className="p-3 text-charcoal">{medicine.duration}</td>
                            <td className="p-3">
                              {stockInfo ? (
                                <div className="flex flex-col space-y-1">
                                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${stockInfo.color}`}>
                                    <AlertCircle size={12} />
                                    <span>{stockInfo.text}</span>
                                  </div>
                                  <div className="text-xs text-charcoal-light">
                                    {medicine.stockDays === 0 ? 'Order now' : `${medicine.stockDays} days left`}
                                  </div>
                                  {(stockInfo.status === 'out-of-stock' || stockInfo.status === 'critical' || stockInfo.status === 'low-stock') && medicine.price && (
                                    <button
                                      onClick={() => handleReorderMedication({
                                        name: medicine.name,
                                        dosage: medicine.dosage,
                                        timing: medicine.timing,
                                        stock: medicine.stockDays || 0,
                                        reorderPoint: medicine.reorderPoint || 0,
                                        price: medicine.price
                                      })}
                                      className="text-xs bg-teal text-white px-2 py-1 rounded-full hover:bg-teal-dark transition-colors flex items-center"
                                    >
                                      <ShoppingCart size={10} className="mr-1" />
                                      ₹{medicine.price}
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <span className="text-xs text-charcoal-light">Stock info unavailable</span>
                              )}
                            </td>
                            <td className="p-3 text-charcoal-light text-xs max-w-xs">{medicine.instructions}</td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() => handleInternalMedicineTaken(medicine.id)}
                                className={`w-6 h-6 rounded border-2 transition-colors ${
                                  internalMedicineStatus[medicine.id]
                                    ? 'bg-teal border-teal text-white'
                                    : 'border-gray-300 hover:border-teal'
                                }`}
                              >
                                {internalMedicineStatus[medicine.id] && <Check size={14} />}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* External Applications/Therapies */}
            {currentProgram.externalApplications && currentProgram.externalApplications.length > 0 && (
              <div className="card">
                <h3 className="text-xl font-garamond font-semibold mb-6 flex items-center">
                  <User size={24} className="text-pink mr-3" />
                  External Applications/Therapies
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left p-3 font-medium">Therapy Name</th>
                        <th className="text-left p-3 font-medium">Body Area</th>
                        <th className="text-left p-3 font-medium">🕗 Timing</th>
                        <th className="text-left p-3 font-medium">Frequency</th>
                        <th className="text-left p-3 font-medium">Administered By</th>
                        <th className="text-left p-3 font-medium">Instructions</th>
                        <th className="text-center p-3 font-medium">✅ Track</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProgram.externalApplications.map((application) => (
                        <tr key={application.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-medium text-charcoal-dark">{application.therapyName}</td>
                          <td className="p-3 text-charcoal">{application.bodyArea}</td>
                          <td className="p-3 text-charcoal">{application.timing}</td>
                          <td className="p-3 text-charcoal">{application.frequency}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              application.administeredBy === 'self' 
                                ? 'bg-teal-light/20 text-teal' 
                                : 'bg-pink-light/20 text-pink'
                            }`}>
                              {application.administeredBy === 'self' ? 'Self' : 'Therapist'}
                            </span>
                          </td>
                          <td className="p-3 text-charcoal-light text-xs max-w-xs">{application.instructions}</td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => handleExternalApplicationCompleted(application.id)}
                              className={`w-6 h-6 rounded border-2 transition-colors ${
                                externalApplicationStatus[application.id]
                                  ? 'bg-pink border-pink text-white'
                                  : 'border-gray-300 hover:border-pink'
                              }`}
                            >
                              {externalApplicationStatus[application.id] && <Check size={14} />}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Panchakarma Treatment Plan */}
            {currentProgram.panchakarmaPlan && currentProgram.panchakarmaPlan.length > 0 && (
              <div className="card">
                <h3 className="text-xl font-garamond font-semibold mb-6 flex items-center">
                  <Flower size={24} className="text-gold mr-3" />
                  Panchakarma Treatment Plan
                </h3>
                
                <div className="space-y-6">
                  {currentProgram.panchakarmaPlan.map((phase, index) => (
                    <div key={phase.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-charcoal-dark">{phase.phaseName}</h4>
                            <p className="text-sm text-charcoal-light">Duration: {phase.duration}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-xs ${
                              phase.completed ? 'bg-teal text-white' : 'bg-gray-200 text-charcoal-light'
                            }`}>
                              {phase.completed ? 'Completed' : `Phase ${index + 1}`}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h5 className="font-medium mb-2">Medicines/Oils Used</h5>
                            <div className="space-y-1">
                              {phase.medicines.map((medicine, idx) => (
                                <div key={idx} className="flex items-center text-sm">
                                  <Pill size={14} className="text-teal mr-2" />
                                  <span>{medicine}</span>
                                </div>
                              ))}
                              {phase.oils.map((oil, idx) => (
                                <div key={idx} className="flex items-center text-sm">
                                  <Droplet size={14} className="text-pink mr-2" />
                                  <span>{oil}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium mb-2">Dosage & Timing</h5>
                            <p className="text-sm text-charcoal mb-2"><strong>Dosage:</strong> {phase.dosage}</p>
                            <p className="text-sm text-charcoal"><strong>🕗 Timing:</strong> {phase.timing}</p>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h5 className="font-medium mb-2">Special Instructions</h5>
                          <ul className="space-y-1">
                            {phase.specialInstructions.map((instruction, idx) => (
                              <li key={idx} className="flex items-start text-sm text-charcoal-light">
                                <span className="w-2 h-2 rounded-full bg-gold mr-2 mt-2 flex-shrink-0"></span>
                                {instruction}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SOS Medications */}
            {currentProgram.sosMedications && currentProgram.sosMedications.length > 0 && (
              <div className="card">
                <h3 className="text-xl font-garamond font-semibold mb-6 flex items-center">
                  <AlertCircle size={24} className="text-gold mr-3" />
                  SOS Medications (As Needed)
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left p-3 font-medium">Medicine Name</th>
                        <th className="text-left p-3 font-medium">Dosage</th>
                        <th className="text-left p-3 font-medium">🕗 Timing</th>
                        <th className="text-left p-3 font-medium">Target Symptoms</th>
                        <th className="text-left p-3 font-medium">Duration</th>
                        <th className="text-left p-3 font-medium">Prescribed Date</th>
                        <th className="text-center p-3 font-medium">✅ Used</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProgram.sosMedications.map((sos) => (
                        <tr key={sos.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-medium text-charcoal-dark">{sos.medicineName}</td>
                          <td className="p-3 text-charcoal">{sos.dosage}</td>
                          <td className="p-3 text-charcoal">{sos.timing}</td>
                          <td className="p-3">
                            <div className="flex flex-wrap gap-1">
                              {sos.targetSymptoms.map((symptom, idx) => (
                                <span key={idx} className="px-2 py-1 bg-gold-light/20 text-gold text-xs rounded-full">
                                  {symptom}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-3 text-charcoal">{sos.duration}</td>
                          <td className="p-3 text-charcoal-light">{sos.prescriptionDate}</td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => handleSOSUsed(sos.id)}
                              className={`w-6 h-6 rounded border-2 transition-colors ${
                                sosStatus[sos.id]
                                  ? 'bg-gold border-gold text-white'
                                  : 'border-gray-300 hover:border-gold'
                              }`}
                            >
                              {sosStatus[sos.id] && <Check size={14} />}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Stock Alerts Section - MOVED HERE AFTER SOS MEDICATIONS */}
            {medicineAlerts.length > 0 && (
              <div className="card border-2 border-pink-light bg-pink-light/5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-garamond font-semibold flex items-center text-pink">
                    <AlertCircle size={24} className="mr-3" />
                    Medicine Stock Alerts
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="bg-pink text-white text-sm px-3 py-1 rounded-full">
                      {medicineAlerts.length} Alert{medicineAlerts.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4 p-4 bg-pink-light/20 rounded-lg">
                  <h4 className="font-medium text-pink mb-2">⚠️ Medicine Restocking Required</h4>
                  <p className="text-sm text-charcoal-light">
                    The following prescribed medicines need to be reordered to ensure continuity of your treatment.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left p-3 font-medium">Medicine Name</th>
                        <th className="text-left p-3 font-medium">Current Stock</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-left p-3 font-medium">Price</th>
                        <th className="text-left p-3 font-medium">Next Delivery</th>
                        <th className="text-center p-3 font-medium">Quick Order</th>
                      </tr>
                    </thead>
                    <tbody>
                      {medicineAlerts.map((alert, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-medium text-charcoal-dark">{alert.name}</td>
                          <td className="p-3">
                            <div className="flex items-center">
                              <span className={`font-medium ${
                                alert.stock === 0 ? 'text-pink' : 
                                alert.status === 'critical' ? 'text-pink' : 'text-gold'
                              }`}>
                                {alert.stock} days remaining
                              </span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                              alert.status === 'out-of-stock' ? 'bg-pink text-white border border-pink' :
                              alert.status === 'critical' ? 'bg-pink-light/20 text-pink animate-pulse' :
                              'bg-gold-light/20 text-gold'
                            }`}>
                              <AlertCircle size={12} />
                              <span className="capitalize">
                                {alert.status === 'out-of-stock' ? 'Out of Stock' :
                                 alert.status === 'critical' ? 'Critical Low' : 'Low Stock'}
                              </span>
                            </div>
                          </td>
                          <td className="p-3 font-medium">₹{alert.price}</td>
                          <td className="p-3 text-charcoal-light">
                            {alert.status === 'out-of-stock' ? 'Order Now' : '2-3 days'}
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => handleReorderMedication({
                                name: alert.name,
                                dosage: '',
                                timing: '',
                                stock: alert.stock,
                                reorderPoint: alert.reorderPoint,
                                price: alert.price
                              })}
                              className="flex items-center justify-center px-3 py-1 bg-teal text-white rounded-full text-xs hover:bg-teal-dark transition-colors"
                            >
                              <ShoppingCart size={12} className="mr-1" />
                              Add to Cart
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-4 bg-teal-light/10 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-teal mb-1">💡 Quick Reorder Tip</h5>
                      <p className="text-sm text-charcoal-light">
                        Order medicines when stock reaches 7 days to avoid treatment interruption
                      </p>
                    </div>
                    <button className="btn-primary text-sm py-2 px-4 flex items-center">
                      <ShoppingCart size={16} className="mr-2" />
                      Order All ({medicineAlerts.length})
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Journey Calendar */}
            <div className="card">
              <h4 className="text-lg font-medium mb-4">Your Journey Calendar</h4>
              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm text-charcoal-light font-medium py-2">
                    {day}
                  </div>
                ))}
            
                {/* Add empty cells for proper calendar alignment */}
                {Array.from({ length: calendarDays[0].date.getDay() }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
            
                {calendarDays.map((day) => (
                  <div
                    key={day.day}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center relative ${
                      day.isCompleted
                        ? 'bg-teal text-white'
                        : day.isCurrent
                          ? 'bg-teal-light/30 text-teal border-2 border-teal'
                          : 'bg-gray-100 text-charcoal-light'
                    }`}
                  >
                    <span className="text-xs mb-1">
                      {day.date.getDate()}
                    </span>
                    <span className="text-[10px]">
                      Day {day.day}
                    </span>
                    {day.isCompleted && (
                      <motion.div 
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={`absolute bottom-1 ${day.day === currentDay ? 'text-teal' : 'text-pink'}`}
                      >
                        <Flower 
                          size={14} 
                          className={`animate-lotus-bloom ${
                            day.day === currentDay ? '' : 'opacity-70'
                          }`}
                        />
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Programs;