// features/cart/CartTabs.tsx
import React from 'react';
import { Package, Pill } from 'lucide-react';

interface CartTabsProps {
  activeTab: 'programs' | 'medicines';
  setActiveTab: (tab: 'programs' | 'medicines') => void;
  programsInCart: number;
  medicinesInCart: number;
}

const CartTabs: React.FC<CartTabsProps> = ({
  activeTab,
  setActiveTab,
  programsInCart,
  medicinesInCart
}) => (
  <div className="flex justify-center mb-8">
    <div className="bg-white rounded-lg shadow-sm flex p-1 border border-gray-200">
      <button
        onClick={() => setActiveTab('programs')}
        className={`px-8 py-3 rounded-lg transition-all flex items-center ${
          activeTab === 'programs'
            ? 'bg-teal text-white shadow-md'
            : 'text-charcoal hover:bg-gray-100'
        }`}
      >
        <Package size={20} className="mr-2" />
        Saved Programs
        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
          activeTab === 'programs' ? 'bg-white/20' : 'bg-teal text-white'
        }`}>
          {programsInCart}
        </span>
      </button>
      
      <button
        onClick={() => setActiveTab('medicines')}
        className={`px-8 py-3 rounded-lg transition-all flex items-center ${
          activeTab === 'medicines'
            ? 'bg-teal text-white shadow-md'
            : 'text-charcoal hover:bg-gray-100'
        }`}
      >
        <Pill size={20} className="mr-2" />
        Saved Medicines
        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
          activeTab === 'medicines' ? 'bg-white/20' : 'bg-teal text-white'
        }`}>
          {medicinesInCart}
        </span>
      </button>
    </div>
  </div>
);

export default CartTabs;