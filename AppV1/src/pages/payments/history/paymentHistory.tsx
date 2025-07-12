import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, Download, CheckCircle, ArrowRight } from 'lucide-react';

interface Payment {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: 'success' | 'pending' | 'failed';
  description: string;
  transactionId: string;
}

const payments: Payment[] = [
  {
    id: 'PAY-2025-001',
    date: '2025-04-15',
    amount: 2500,
    method: 'Credit Card',
    status: 'success',
    description: 'Ayurvedic Consultation with Dr. Anjali Sharma',
    transactionId: 'TXN123456789'
  },
  {
    id: 'PAY-2025-002',
    date: '2025-04-10',
    amount: 1800,
    method: 'UPI',
    status: 'success',
    description: 'Follow-up Consultation with Dr. Michael Chen',
    transactionId: 'TXN987654321'
  }
];

const PaymentHistory: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-teal bg-teal-light/10';
      case 'pending':
        return 'text-gold bg-gold-light/10';
      case 'failed':
        return 'text-pink bg-pink-light/10';
      default:
        return 'text-charcoal-light bg-gray-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-garamond font-semibold">Payment History</h2>
            <p className="text-charcoal-light">View and download your payment receipts</p>
          </div>
          <button className="btn-primary py-2">
            <Download size={18} className="mr-2" />
            Export Statement
          </button>
        </div>

        {/* Payment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-teal-light/20 flex items-center justify-center mr-4">
                <CreditCard size={24} className="text-teal" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">₹4,300</h3>
                <p className="text-sm text-charcoal-light">Total Spent</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-pink-light/20 flex items-center justify-center mr-4">
                <Calendar size={24} className="text-pink" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">2</h3>
                <p className="text-sm text-charcoal-light">Transactions</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gold-light/20 flex items-center justify-center mr-4">
                <CheckCircle size={24} className="text-gold" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">100%</h3>
                <p className="text-sm text-charcoal-light">Success Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="card">
          <h3 className="text-xl font-garamond font-semibold mb-6">Recent Transactions</h3>
          
          <div className="space-y-4">
            {payments.map((payment) => (
              <div 
                key={payment.id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-teal-light transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-teal-light/20 flex items-center justify-center mr-4">
                    <CreditCard size={20} className="text-teal" />
                  </div>
                  
                  <div>
                    <h4 className="font-medium">{payment.description}</h4>
                    <div className="flex items-center text-sm text-charcoal-light mt-1">
                      <span>{new Date(payment.date).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{payment.method}</span>
                      <span className="mx-2">•</span>
                      <span className="font-mono">{payment.transactionId}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-medium">₹{payment.amount}</div>
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}>
                      <span className="capitalize">{payment.status}</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ArrowRight size={18} className="text-charcoal-light" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentHistory;