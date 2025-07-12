import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Leaf, Calendar, Clock } from 'lucide-react';

interface Prescription {
  id: string;
  title: string;
  doctor: string;
  date: string;
  duration: string;
  type: 'diet' | 'herbs' | 'lifestyle';
  status: 'active' | 'completed' | 'upcoming';
}

const prescriptions: Prescription[] = [
  {
    id: '1',
    title: 'Pitta-Pacifying Diet Plan',
    doctor: 'Dr. Anjali Sharma',
    date: 'Apr 15, 2025',
    duration: '3 months',
    type: 'diet',
    status: 'active'
  },
  {
    id: '2',
    title: 'Stress Relief Herbal Blend',
    doctor: 'Dr. Michael Chen',
    date: 'Apr 10, 2025',
    duration: '1 month',
    type: 'herbs',
    status: 'active'
  },
  {
    id: '3',
    title: 'Spring Cleanse Protocol',
    doctor: 'Dr. Sarah Williams',
    date: 'May 1, 2025',
    duration: '21 days',
    type: 'lifestyle',
    status: 'upcoming'
  }
];

const Prescriptions: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-garamond font-semibold mb-6">
          My Prescriptions
        </h2>

        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-teal-light/20 flex items-center justify-center mr-4">
                <Utensils size={24} className="text-teal" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">2</h3>
                <p className="text-sm text-charcoal-light">Active Diet Plans</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-pink-light/20 flex items-center justify-center mr-4">
                <Leaf size={24} className="text-pink" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">3</h3>
                <p className="text-sm text-charcoal-light">Herbal Remedies</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gold-light/20 flex items-center justify-center mr-4">
                <Calendar size={24} className="text-gold" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">1</h3>
                <p className="text-sm text-charcoal-light">Upcoming Cleanses</p>
              </div>
            </div>
          </div>
        </div>

        {/* Active prescriptions */}
        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <div 
              key={prescription.id}
              className={`card hover:shadow-lg border-l-4 ${
                prescription.status === 'active'
                  ? 'border-teal'
                  : prescription.status === 'upcoming'
                    ? 'border-gold'
                    : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-garamond font-semibold text-charcoal-dark">
                      {prescription.title}
                    </h3>
                    <span className={`ml-3 text-xs px-2 py-1 rounded-full ${
                      prescription.status === 'active'
                        ? 'bg-teal-light/10 text-teal'
                        : prescription.status === 'upcoming'
                          ? 'bg-gold-light/10 text-gold'
                          : 'bg-gray-100 text-charcoal-light'
                    }`}>
                      {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                    </span>
                  </div>

                  <p className="text-charcoal-light text-sm">
                    Prescribed by {prescription.doctor}
                  </p>

                  <div className="mt-4 flex items-center space-x-4 text-sm text-charcoal-light">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      <span>{prescription.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      <span>{prescription.duration}</span>
                    </div>
                  </div>
                </div>

                <button className="btn-secondary text-sm py-2">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Prescriptions;