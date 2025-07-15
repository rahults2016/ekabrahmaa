// src/features/programs/components/ProgramDetails/InternalMedicines.tsx
import React from 'react';
import { Pill, AlertCircle, ShoppingCart, Check } from 'lucide-react';
import type { InternalMedicine } from '../../types';

interface InternalMedicinesProps {
  medicines: InternalMedicine[];
  status: {[key: string]: boolean};
  onMedicineTaken: (medicineId: string) => void;
}

const InternalMedicines: React.FC<InternalMedicinesProps> = ({ 
  medicines, 
  status,
  onMedicineTaken
}) => {
  const getStockStatus = (stockDays: number, reorderPoint: number) => {
    if (stockDays === 0) return { status: 'out-of-stock', color: 'text-pink bg-pink-light/20', text: 'Out of Stock' };
    if (stockDays <= reorderPoint * 0.5) return { status: 'critical', color: 'text-pink bg-pink-light/20 animate-pulse', text: 'Critical Low' };
    if (stockDays <= reorderPoint) return { status: 'low-stock', color: 'text-gold bg-gold-light/20', text: 'Low Stock' };
    return { status: 'good', color: 'text-teal bg-teal-light/10', text: 'Good Stock' };
  };

  return (
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
            {medicines.map((medicine) => {
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
                            onClick={() => console.log('Reorder:', medicine.name)}
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
                      onClick={() => onMedicineTaken(medicine.id)}
                      className={`w-6 h-6 rounded border-2 transition-colors ${
                        status[medicine.id]
                          ? 'bg-teal border-teal text-white'
                          : 'border-gray-300 hover:border-teal'
                      }`}
                    >
                      {status[medicine.id] && <Check size={14} />}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InternalMedicines;