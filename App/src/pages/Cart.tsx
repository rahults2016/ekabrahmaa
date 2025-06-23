import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, Plus, Minus, Trash2, Clock, Check, AlertCircle, 
  Package, Pill, Calendar, CreditCard, Bell, Star, ArrowRight,
  Info, Truck, Shield, Gift
} from 'lucide-react';

interface CartProgram {
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

interface CartMedicine {
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

const savedPrograms: CartProgram[] = [
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
  {
    id: 'prog-2',
    name: 'ekaPavana – Detox & Cleanse',
    duration: 14,
    originalPrice: 6999,
    description: 'Deep cleansing program with Panchakarma principles',
    level: 'Intermediate',
    includes: ['Panchakarma guidance', 'Herbal preparations', 'Lifestyle coaching'],
    inCart: false
  },
  {
    id: 'prog-3',
    name: 'ekaUdaya – Stress Relief',
    duration: 28,
    originalPrice: 5499,
    discountPrice: 4299,
    description: 'Comprehensive stress management through Ayurvedic practices',
    level: 'Beginner',
    includes: ['Meditation sessions', 'Breathwork training', 'Stress-relief herbs'],
    inCart: false
  }
];

const savedMedicines: CartMedicine[] = [
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
  {
    id: 'med-2',
    name: 'Ashwagandha Capsules',
    dosage: '500mg twice daily',
    stockStatus: 'low-stock',
    price: 899,
    quantity: 1,
    maxQuantity: 3,
    prescriptionRequired: false,
    expiryMonths: 36,
    manufacturer: 'Organic India',
    description: 'Premium ashwagandha for stress relief and energy',
    instructions: 'Take 1 capsule with milk or water after meals',
    sideEffects: ['May cause drowsiness', 'Avoid during pregnancy']
  },
  {
    id: 'med-3',
    name: 'Brahmi Ghrita',
    dosage: '1/2 teaspoon empty stomach',
    stockStatus: 'out-of-stock',
    price: 1200,
    quantity: 0,
    maxQuantity: 2,
    prescriptionRequired: true,
    expiryMonths: 12,
    manufacturer: 'Kerala Ayurveda',
    description: 'Medicated ghee for enhanced memory and cognitive function',
    instructions: 'Take on empty stomach, follow with warm water',
    sideEffects: ['Not suitable for high cholesterol patients']
  },
  {
    id: 'med-4',
    name: 'Saraswatarishta',
    dosage: '15ml with equal water',
    stockStatus: 'in-stock',
    price: 320,
    quantity: 3,
    maxQuantity: 6,
    prescriptionRequired: false,
    expiryMonths: 60,
    manufacturer: 'Baidyanath',
    description: 'Ayurvedic brain tonic for mental clarity',
    instructions: 'Mix with equal amount of water after meals',
    sideEffects: ['Contains natural alcohol', 'Avoid if diabetic']
  }
];

const Cart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'programs' | 'medicines'>('programs');
  const [programs, setPrograms] = useState<CartProgram[]>(savedPrograms);
  const [medicines, setMedicines] = useState<CartMedicine[]>(savedMedicines);
  const [showNotifications, setShowNotifications] = useState(false);
  const [expandedMedicine, setExpandedMedicine] = useState<string | null>(null);

  // Calculate totals
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

  const toggleProgramInCart = (programId: string) => {
    setPrograms(prev => prev.map(prog => 
      prog.id === programId ? { ...prog, inCart: !prog.inCart } : prog
    ));
  };

  const updateMedicineQuantity = (medicineId: string, change: number) => {
    setMedicines(prev => prev.map(med => {
      if (med.id === medicineId) {
        const newQuantity = Math.max(0, Math.min(med.maxQuantity, med.quantity + change));
        return { ...med, quantity: newQuantity };
      }
      return med;
    }));
  };

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

  const notifications = [
    { id: '1', message: 'Ashwagandha Capsules - Only 3 left in stock!', type: 'warning' },
    { id: '2', message: 'Limited time: 20% off on wellness programs', type: 'offer' },
    { id: '3', message: 'Brahmi Ghrita will be restocked tomorrow', type: 'info' }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-garamond font-semibold text-charcoal-dark mb-2">
              Your Cart
            </h1>
            <p className="text-charcoal-light">
              {totalItems} items • ₹{totalAmount.toLocaleString()} total
            </p>
          </div>

          {/* Notifications Bell */}
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

        {/* Tabs */}
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
                {programsInCart.length}
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
                {medicinesInCart.length}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'programs' ? (
              /* Programs Tab */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-garamond font-semibold">Wellness Programs</h2>
                  <div className="text-sm text-charcoal-light">
                    {programsInCart.length} of {programs.length} selected
                  </div>
                </div>

                {programs.map((program) => (
                  <motion.div
                    key={program.id}
                    layout
                    className={`card border-2 transition-all ${
                      program.inCart ? 'border-teal bg-teal-light/5' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-garamond font-semibold text-charcoal-dark mb-1">
                              {program.name}
                            </h3>
                            <div className="flex items-center space-x-4 mb-2">
                              <div className="flex items-center text-sm text-charcoal-light">
                                <Calendar size={14} className="mr-1" />
                                {program.duration} days
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                program.level === 'Beginner' ? 'bg-teal-light/20 text-teal' :
                                program.level === 'Intermediate' ? 'bg-gold-light/20 text-gold' :
                                'bg-pink-light/20 text-pink'
                              }`}>
                                {program.level}
                              </span>
                            </div>
                            <p className="text-charcoal-light text-sm mb-3">
                              {program.description}
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              {program.discountPrice && (
                                <span className="text-sm text-charcoal-light line-through">
                                  ₹{program.originalPrice.toLocaleString()}
                                </span>
                              )}
                              <span className="text-xl font-semibold text-teal">
                                ₹{(program.discountPrice || program.originalPrice).toLocaleString()}
                              </span>
                            </div>
                            {program.discountPrice && (
                              <div className="text-xs text-pink font-medium">
                                Save ₹{(program.originalPrice - program.discountPrice).toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-charcoal-dark mb-2">Includes:</h4>
                          <div className="flex flex-wrap gap-2">
                            {program.includes.map((item, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-charcoal text-xs rounded-full">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => toggleProgramInCart(program.id)}
                          className={`w-full md:w-auto px-6 py-2 rounded-lg transition-colors ${
                            program.inCart
                              ? 'bg-pink-light/20 text-pink border border-pink-light hover:bg-pink-light/30'
                              : 'bg-teal text-white hover:bg-teal-dark'
                          }`}
                        >
                          {program.inCart ? (
                            <span className="flex items-center justify-center">
                              <Trash2 size={16} className="mr-2" />
                              Remove from Cart
                            </span>
                          ) : (
                            <span className="flex items-center justify-center">
                              <Plus size={16} className="mr-2" />
                              Add to Cart
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Medicines Tab */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-garamond font-semibold">Prescribed Medicines</h2>
                  <div className="text-sm text-charcoal-light">
                    {medicinesInCart.length} items in cart
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
                      {/* Header */}
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

                      {/* Quantity Controls */}
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

                      {/* Expanded Details */}
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
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="card bg-gradient-to-br from-teal-light/10 to-pink-light/10">
                <h3 className="text-xl font-garamond font-semibold mb-6">Order Summary</h3>
                
                {/* Programs Summary */}
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

                {/* Medicines Summary */}
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

                {/* Total */}
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total Amount</span>
                    <span className="text-teal">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Benefits */}
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

                {/* Checkout Button */}
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

                {/* Order Options */}
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
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Cart;