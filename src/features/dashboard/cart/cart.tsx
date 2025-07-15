// features/cart/Cart.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CartHeader from './CartHeader';
import CartTabs from './CartTabs';
import ProgramsTab from './ProgramsTab';
import MedicinesTab from './MedicinesTab';
import OrderSummary from './OrderSummary';
import { savedMedicines, savedPrograms, type CartMedicine, type CartProgram } from './cartData';


const Cart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'programs' | 'medicines'>('programs');
  const [programs, setPrograms] = useState(savedPrograms);
  const [medicines, setMedicines] = useState(savedMedicines);
  const [showNotifications, setShowNotifications] = useState(false);
  const [expandedMedicine, setExpandedMedicine] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CartHeader 
          totalItems={calculateTotalItems(programs, medicines)}
          totalAmount={calculateTotalAmount(programs, medicines)}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
        />
        
        <CartTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          programsInCart={programs.filter(p => p.inCart).length}
          medicinesInCart={medicines.filter(m => m.quantity > 0).length}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'programs' ? (
             <ProgramsTab 
             programs={programs}
             toggleProgramInCart={(id) => toggleProgramInCart(id, setPrograms)}
           />
            ) : (
              <MedicinesTab 
                medicines={medicines}
                expandedMedicine={expandedMedicine}
                setExpandedMedicine={setExpandedMedicine}
                updateMedicineQuantity={(id, change) => updateMedicineQuantity(id, change, setMedicines)}
              />
            )}
          </div>

          <div className="lg:col-span-1">
            <OrderSummary 
              programs={programs}
              medicines={medicines}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Helper functions
function calculateTotalItems(programs: CartProgram[], medicines: CartMedicine[]): number {
  const programsInCart = programs.filter(p => p.inCart).length;
  const medicinesInCart = medicines.reduce((sum, med) => sum + med.quantity, 0);
  return programsInCart + medicinesInCart;
}

function calculateTotalAmount(programs: CartProgram[], medicines: CartMedicine[]): number {
  const programsTotal = programs
    .filter(p => p.inCart)
    .reduce((sum, prog) => sum + (prog.discountPrice || prog.originalPrice), 0);
  
  const medicinesTotal = medicines
    .filter(m => m.quantity > 0)
    .reduce((sum, med) => sum + (med.price * med.quantity), 0);
  
  return programsTotal + medicinesTotal;
}

function toggleProgramInCart(
  programId: string,
  setPrograms: React.Dispatch<React.SetStateAction<CartProgram[]>>
) {
  setPrograms(prev => prev.map(prog => 
    prog.id === programId ? { ...prog, inCart: !prog.inCart } : prog
  ));
}

const updateMedicineQuantity = (
  medicineId: string,
  change: number,
  setMedicines: React.Dispatch<React.SetStateAction<CartMedicine[]>>
) => {
  setMedicines(prevMedicines =>
    prevMedicines.map(medicine =>
      medicine.id === medicineId
        ? {
            ...medicine,
            quantity: Math.max(0, medicine.quantity + change),
            total: medicine.price * Math.max(0, medicine.quantity + change)
          }
        : medicine
    )
  );
};

export default Cart;