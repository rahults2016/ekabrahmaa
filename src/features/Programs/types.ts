export interface InternalMedicine {
    id: string;
    name: string;
    dosage: string;
    timing: string;
    duration: string;
    instructions: string;
    taken: boolean;
    prescriptionDate: string;
    stockDays?: number;
    reorderPoint?: number;
    price?: number;
  }
  
  export interface ExternalApplication {
    id: string;
    therapyName: string;
    bodyArea: string;
    timing: string;
    frequency: string;
    administeredBy: 'self' | 'therapist';
    instructions: string;
    completed: boolean;
  }
  
  export interface PanchakarmaPhase {
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
  
  export interface SOSMedication {
    id: string;
    medicineName: string;
    dosage: string;
    timing: string;
    targetSymptoms: string[];
    duration: string;
    prescriptionDate: string;
    used: boolean;
  }
  
  export interface Program {
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

  export const programs: Program[] = [
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