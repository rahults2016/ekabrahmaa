// features/cart/CartHeader.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';

interface CartHeaderProps {
  totalItems: number;
  totalAmount: number;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
}

const notifications = [
  { id: '1', message: 'Ashwagandha Capsules - Only 3 left in stock!', type: 'warning' },
  { id: '2', message: 'Limited time: 20% off on wellness programs', type: 'offer' },
  { id: '3', message: 'Brahmi Ghrita will be restocked tomorrow', type: 'info' }
];

const CartHeader: React.FC<CartHeaderProps> = ({
  totalItems,
  totalAmount,
  showNotifications,
  setShowNotifications
}) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
    <div className="mb-4 md:mb-0">
      <h1 className="text-3xl font-garamond font-semibold text-charcoal-dark mb-2">
        Your Cart
      </h1>
      <p className="text-charcoal-light">
        {totalItems} items • ₹{totalAmount.toLocaleString()} total
      </p>
    </div>

    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="flex items-center px-4 py-2 bg-gold-light/20 text-gold rounded-lg hover:bg-gold-light/30 transition-colors"
      >
        <Bell size={20} className="mr-2" />
        Alerts
        <span className="ml-2 bg-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          3
        </span>
      </button>

      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-10"
          >
            <div className="p-4">
              <h3 className="font-medium mb-3">Stock & Offer Updates</h3>
              <div className="space-y-3">
                {notifications.map(notification => (
                  <div key={notification.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                      notification.type === 'warning' ? 'bg-gold' :
                      notification.type === 'offer' ? 'bg-pink' : 'bg-teal'
                    }`} />
                    <p className="text-sm text-charcoal">{notification.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
);

export default CartHeader;