// features/cart/MedicinesTab.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Info, Plus, Minus } from 'lucide-react';
import type { CartMedicine } from './cartData';

interface MedicinesTabProps {
  medicines: CartMedicine[];
  expandedMedicine: string | null;
  setExpandedMedicine: (id: string | null) => void;
  updateMedicineQuantity: (id: string, change: number) => void;
}

const MedicinesTab: React.FC<MedicinesTabProps> = ({
  medicines,
  expandedMedicine,
  setExpandedMedicine,
  updateMedicineQuantity
}) => {
  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'text-teal bg-teal-light/10';
      case 'low-stock': return 'text-gold bg-gold-light/20';
      case 'out-of-stock': return 'text-pink bg-pink-light/20';
      default: return 'text-charcoal-light bg-gray-100';
    }
  };

  const getStockStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock': return <Check size={14} />;
      case 'low-stock': return <AlertCircle size={14} />;
      case 'out-of-stock': return <AlertCircle size={14} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-garamond font-semibold">Prescribed Medicines</h2>
        <div className="text-sm text-charcoal-light">
          {medicines.filter(m => m.quantity > 0).length} items in cart
        </div>
      </div>

      {medicines.map((medicine) => (
        <motion.div
          key={medicine.id}
          layout
          className={`card border-2 transition-all ${
            medicine.quantity > 0 ? 'border-teal bg-teal-light/5' : 'border-gray-200'
          }`}
        >
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-garamond font-semibold text-charcoal-dark">
                      {medicine.name}
                    </h3>
                    <p className="text-sm text-charcoal-light">{medicine.manufacturer}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      {medicine.originalPrice && (
                        <span className="text-sm text-charcoal-light line-through">
                          ₹{medicine.originalPrice}
                        </span>
                      )}
                      <span className="text-lg font-semibold text-teal">
                        ₹{medicine.price}
                      </span>
                    </div>
                    {medicine.originalPrice && (
                      <div className="text-xs text-pink font-medium">
                        Save ₹{medicine.originalPrice - medicine.price}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-3">
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStockStatusColor(medicine.stockStatus)}`}>
                    {getStockStatusIcon(medicine.stockStatus)}
                    <span className="capitalize">{medicine.stockStatus.replace('-', ' ')}</span>
                  </div>
                  <div className="text-sm text-charcoal-light">
                    <strong>Dosage:</strong> {medicine.dosage}
                  </div>
                  {medicine.prescriptionRequired && (
                    <div className="px-2 py-1 bg-pink-light/20 text-pink text-xs rounded-full">
                      Prescription Required
                    </div>
                  )}
                </div>

                <p className="text-sm text-charcoal-light mb-3">
                  {medicine.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {medicine.stockStatus !== 'out-of-stock' && (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-charcoal-light">Quantity:</span>
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        onClick={() => updateMedicineQuantity(medicine.id, -1)}
                        disabled={medicine.quantity <= 0}
                        className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center font-medium">
                        {medicine.quantity}
                      </span>
                      <button
                        onClick={() => updateMedicineQuantity(medicine.id, 1)}
                        disabled={medicine.quantity >= medicine.maxQuantity}
                        className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <span className="text-xs text-charcoal-light">
                      Max: {medicine.maxQuantity}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setExpandedMedicine(
                    expandedMedicine === medicine.id ? null : medicine.id
                  )}
                  className="text-sm text-teal hover:text-teal-dark flex items-center"
                >
                  <Info size={14} className="mr-1" />
                  Details
                </button>
                
                {medicine.quantity > 0 && (
                  <div className="text-sm text-charcoal-light">
                    Total: ₹{(medicine.price * medicine.quantity).toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            <AnimatePresence>
              {expandedMedicine === medicine.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t pt-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium text-charcoal-dark mb-2">Instructions</h5>
                      <p className="text-charcoal-light">{medicine.instructions}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-charcoal-dark mb-2">Additional Info</h5>
                      <p className="text-charcoal-light">Expiry: {medicine.expiryMonths} months</p>
                      {medicine.sideEffects && (
                        <div className="mt-2">
                          <p className="font-medium text-pink text-xs">Side Effects:</p>
                          <ul className="text-xs text-charcoal-light">
                            {medicine.sideEffects.map((effect, idx) => (
                              <li key={idx}>• {effect}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MedicinesTab;