// features/cart/OrderSummary.tsx
import React from 'react';
import { 
  Package, Pill, Truck, Shield, Gift, CreditCard, ArrowRight 
} from 'lucide-react';
import type { CartProgram, CartMedicine } from './cartData';

interface OrderSummaryProps {
  programs: CartProgram[];
  medicines: CartMedicine[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ programs, medicines }) => {
  const programsInCart = programs.filter(p => p.inCart);
  const programsTotal = programsInCart.reduce((sum, prog) => 
    sum + (prog.discountPrice || prog.originalPrice), 0
  );
  
  const medicinesInCart = medicines.filter(m => m.quantity > 0);
  const medicinesTotal = medicinesInCart.reduce((sum, med) => 
    sum + (med.price * med.quantity), 0
  );
  
  const totalAmount = programsTotal + medicinesTotal;
  const totalItems = programsInCart.length + medicinesInCart.reduce((sum, med) => sum + med.quantity, 0);

  return (
    <div className="sticky top-6">
      <div className="card bg-gradient-to-br from-teal-light/10 to-pink-light/10">
        <h3 className="text-xl font-garamond font-semibold mb-6">Order Summary</h3>
        
        {programsInCart.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium mb-3 flex items-center">
              <Package size={16} className="mr-2 text-teal" />
              Programs ({programsInCart.length})
            </h4>
            <div className="space-y-2">
              {programsInCart.map(program => (
                <div key={program.id} className="flex justify-between text-sm">
                  <span className="truncate mr-2">{program.name}</span>
                  <span className="font-medium">
                    ₹{(program.discountPrice || program.originalPrice).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t mt-3 pt-3 flex justify-between font-medium">
              <span>Programs Total</span>
              <span>₹{programsTotal.toLocaleString()}</span>
            </div>
          </div>
        )}

        {medicinesInCart.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium mb-3 flex items-center">
              <Pill size={16} className="mr-2 text-pink" />
              Medicines ({medicinesInCart.length})
            </h4>
            <div className="space-y-2">
              {medicinesInCart.map(medicine => (
                <div key={medicine.id} className="flex justify-between text-sm">
                  <span className="truncate mr-2">
                    {medicine.name} × {medicine.quantity}
                  </span>
                  <span className="font-medium">
                    ₹{(medicine.price * medicine.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t mt-3 pt-3 flex justify-between font-medium">
              <span>Medicines Total</span>
              <span>₹{medicinesTotal.toLocaleString()}</span>
            </div>
          </div>
        )}

        <div className="border-t pt-4 mb-6">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total Amount</span>
            <span className="text-teal">₹{totalAmount.toLocaleString()}</span>
          </div>
        </div>

        <div className="mb-6 space-y-3">
          <div className="flex items-center text-sm text-charcoal-light">
            <Truck size={16} className="mr-2 text-teal" />
            Free delivery on orders above ₹500
          </div>
          <div className="flex items-center text-sm text-charcoal-light">
            <Shield size={16} className="mr-2 text-teal" />
            Secure payment & authentic medicines
          </div>
          <div className="flex items-center text-sm text-charcoal-light">
            <Gift size={16} className="mr-2 text-teal" />
            Earn healing points on every purchase
          </div>
        </div>

        <button
          disabled={totalItems === 0}
          className={`w-full py-4 rounded-lg font-medium transition-all ${
            totalItems > 0
              ? 'bg-teal text-white hover:bg-teal-dark shadow-lg hover:shadow-xl'
              : 'bg-gray-200 text-charcoal-light cursor-not-allowed'
          }`}
        >
          {totalItems > 0 ? (
            <span className="flex items-center justify-center">
              <CreditCard size={20} className="mr-2" />
              Place Order
              <ArrowRight size={16} className="ml-2" />
            </span>
          ) : (
            'Add items to cart'
          )}
        </button>

        {totalItems > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h5 className="font-medium mb-3 text-sm">Quick Options</h5>
            <div className="space-y-2">
              <button className="w-full text-left p-2 rounded-lg hover:bg-gray-100 text-sm">
                Order medicines only
              </button>
              <button className="w-full text-left p-2 rounded-lg hover:bg-gray-100 text-sm">
                Order programs only
              </button>
              <button className="w-full text-left p-2 rounded-lg hover:bg-gray-100 text-sm">
                Schedule recurring delivery
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;