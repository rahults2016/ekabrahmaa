import React from 'react';
import { motion } from 'framer-motion';
import { Receipt, Download, ExternalLink, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Invoice {
  id: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  items: {
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }[];
  doctor: {
    name: string;
    specialty: string;
  };
}

const invoices: Invoice[] = [
  {
    id: 'INV-2025-001',
    date: '2025-04-15',
    dueDate: '2025-04-30',
    amount: 2500,
    status: 'pending',
    items: [
      {
        description: 'Ayurvedic Consultation',
        quantity: 1,
        rate: 2000,
        amount: 2000
      },
      {
        description: 'Herbal Medicine Kit',
        quantity: 1,
        rate: 500,
        amount: 500
      }
    ],
    doctor: {
      name: 'Dr. Anjali Sharma',
      specialty: 'Ayurvedic Doctor'
    }
  },
  {
    id: 'INV-2025-002',
    date: '2025-04-10',
    dueDate: '2025-04-25',
    amount: 1800,
    status: 'paid',
    items: [
      {
        description: 'Follow-up Consultation',
        quantity: 1,
        rate: 1500,
        amount: 1500
      },
      {
        description: 'Wellness Program Materials',
        quantity: 1,
        rate: 300,
        amount: 300
      }
    ],
    doctor: {
      name: 'Dr. Michael Chen',
      specialty: 'Nutritionist'
    }
  }
];

const Invoices: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-teal bg-teal-light/10';
      case 'pending':
        return 'text-gold bg-gold-light/10';
      case 'overdue':
        return 'text-pink bg-pink-light/10';
      default:
        return 'text-charcoal-light bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle size={16} className="text-teal" />;
      case 'pending':
        return <Clock size={16} className="text-gold" />;
      case 'overdue':
        return <AlertCircle size={16} className="text-pink" />;
      default:
        return null;
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
          <h2 className="text-2xl font-garamond font-semibold">Invoices</h2>
          <button className="btn-primary py-2">
            <Download size={18} className="mr-2" />
            Export All
          </button>
        </div>

        <div className="space-y-4">
          {invoices.map((invoice) => (
            <div 
              key={invoice.id}
              className="card hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-teal-light/20 flex items-center justify-center mr-4">
                    <Receipt size={20} className="text-teal" />
                  </div>
                  <div>
                    <h3 className="font-medium">{invoice.id}</h3>
                    <p className="text-sm text-charcoal-light">
                      {invoice.doctor.name} - {invoice.doctor.specialty}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-medium">₹{invoice.amount}</div>
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(invoice.status)}`}>
                    {getStatusIcon(invoice.status)}
                    <span className="capitalize">{invoice.status}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-charcoal-light">
                      <th className="text-left py-2">Description</th>
                      <th className="text-right py-2">Quantity</th>
                      <th className="text-right py-2">Rate</th>
                      <th className="text-right py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, index) => (
                      <tr key={index}>
                        <td className="py-2">{item.description}</td>
                        <td className="text-right py-2">{item.quantity}</td>
                        <td className="text-right py-2">₹{item.rate}</td>
                        <td className="text-right py-2">₹{item.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <div className="text-sm text-charcoal-light">
                  <div>Date: {new Date(invoice.date).toLocaleDateString()}</div>
                  <div>Due Date: {new Date(invoice.dueDate).toLocaleDateString()}</div>
                </div>
                <div className="space-x-2">
                  <button className="btn-secondary text-sm py-1">
                    <Download size={16} className="mr-1" />
                    Download
                  </button>
                  {invoice.status === 'pending' && (
                    <button className="btn-primary text-sm py-1">
                      <ExternalLink size={16} className="mr-1" />
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Invoices;