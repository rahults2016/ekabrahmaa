// features/cart/cartData.ts
export interface CartProgram {
    id: string;
    name: string;
    duration: number;
    originalPrice: number;
    discountPrice?: number;
    description: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    includes: string[];
    inCart: boolean;
  }
  
  export interface CartMedicine {
    id: string;
    name: string;
    dosage: string;
    stockStatus: 'in-stock' | 'out-of-stock' | 'low-stock';
    price: number;
    originalPrice?: number;
    quantity: number;
    maxQuantity: number;
    prescriptionRequired: boolean;
    expiryMonths: number;
    manufacturer: string;
    description: string;
    instructions: string;
    sideEffects?: string[];
  }
  
  export const savedPrograms: CartProgram[] = [
    {
      id: 'prog-1',
      name: 'ekaSamanvaya – Complete Wellness',
      duration: 21,
      originalPrice: 4999,
      discountPrice: 3999,
      description: 'Comprehensive program for mind-body balance through Ayurveda',
      level: 'Beginner',
      includes: ['Daily consultations', 'Personalized diet plan', 'Yoga sessions', 'Medicine kit'],
      inCart: true
    },
    // ... other programs
  ];
  
  export const savedMedicines: CartMedicine[] = [
    {
      id: 'med-1',
      name: 'Triphala Churna',
      dosage: '1 teaspoon with warm water',
      stockStatus: 'in-stock',
      price: 450,
      originalPrice: 550,
      quantity: 2,
      maxQuantity: 5,
      prescriptionRequired: false,
      expiryMonths: 24,
      manufacturer: 'Himalaya Wellness',
      description: 'Traditional Ayurvedic digestive tonic for regular bowel movements',
      instructions: 'Take 1 teaspoon with warm water before bedtime',
      sideEffects: ['Mild stomach upset in some cases']
    },
    // ... other medicines
  ];