// src/features/programs/components/ProgramDetails/StockAlerts.tsx
import React from 'react';
import { AlertCircle, ShoppingCart } from 'lucide-react';
import type { Program } from '../../types';

interface StockAlertsProps {
  program: Program;
}

const StockAlerts: React.FC<StockAlertsProps> = ({ program }) => {
  const getAllMedicinesRequiringAttention = () => {
    const alerts: Array<{name: string, stock: number, reorderPoint: number, status: string, price: number}> = [];
    
    if (program.medications) {
      program.medications.forEach(med => {
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

  if (medicineAlerts.length === 0) return null;

  return (
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
                    onClick={() => console.log('Reorder:', alert.name)}
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
  );
};

export default StockAlerts;