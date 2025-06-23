import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, MessageCircle, CreditCard } from 'lucide-react';

interface ConsultationDetails {
  date: string;
  time: string;
  duration: '15' | '30' | '45';
  mode: 'video' | 'audio';
  concerns: string;
}

const ConsultationBooking: React.FC = () => {
  const [details, setDetails] = useState<ConsultationDetails>({
    date: '',
    time: '',
    duration: '30',
    mode: 'video',
    concerns: ''
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission
    console.log('Booking details:', details);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Booking form */}
          <div className="md:col-span-2">
            <div className="card">
              <h2 className="text-2xl font-garamond font-semibold mb-6">
                Book Your Consultation
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-charcoal-dark font-medium mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={details.date}
                    onChange={(e) => setDetails({ ...details, date: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-charcoal-dark font-medium mb-2">
                    Select Time
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setDetails({ ...details, time })}
                        className={`p-2 text-sm border rounded-lg transition-colors ${
                          details.time === time
                            ? 'border-teal bg-teal-light/10 text-teal'
                            : 'border-gray-200 hover:border-teal hover:bg-teal-light/10'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-charcoal-dark font-medium mb-2">
                    Consultation Duration
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: '15', label: '15 mins' },
                      { value: '30', label: '30 mins' },
                      { value: '45', label: '45 mins' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setDetails({ ...details, duration: option.value as '15' | '30' | '45' })}
                        className={`p-2 text-sm border rounded-lg transition-colors ${
                          details.duration === option.value
                            ? 'border-teal bg-teal-light/10 text-teal'
                            : 'border-gray-200 hover:border-teal hover:bg-teal-light/10'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-charcoal-dark font-medium mb-2">
                    Consultation Mode
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setDetails({ ...details, mode: 'video' })}
                      className={`flex items-center justify-center p-3 border rounded-lg transition-colors ${
                        details.mode === 'video'
                          ? 'border-teal bg-teal-light/10 text-teal'
                          : 'border-gray-200 hover:border-teal hover:bg-teal-light/10'
                      }`}
                    >
                      <Video size={20} className="mr-2" />
                      Video Call
                    </button>
                    <button
                      type="button"
                      onClick={() => setDetails({ ...details, mode: 'audio' })}
                      className={`flex items-center justify-center p-3 border rounded-lg transition-colors ${
                        details.mode === 'audio'
                          ? 'border-teal bg-teal-light/10 text-teal'
                          : 'border-gray-200 hover:border-teal hover:bg-teal-light/10'
                      }`}
                    >
                      <MessageCircle size={20} className="mr-2" />
                      Audio Call
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-charcoal-dark font-medium mb-2">
                    Health Concerns
                  </label>
                  <textarea
                    value={details.concerns}
                    onChange={(e) => setDetails({ ...details, concerns: e.target.value })}
                    placeholder="Describe your health concerns and what you'd like to discuss..."
                    className="input-field h-32 resize-none"
                    required
                  />
                </div>
                
                <button type="submit" className="btn-primary w-full">
                  Proceed to Payment
                </button>
              </form>
            </div>
          </div>
          
          {/* Summary sidebar */}
          <div className="md:col-span-1">
            <div className="card sticky top-6">
              <h3 className="text-xl font-garamond font-semibold mb-4">
                Consultation Summary
              </h3>
              
              <div className="flex items-center mb-6">
                <img
                  src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt="Dr. Anjali Sharma"
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <h4 className="font-medium">Dr. Anjali Sharma</h4>
                  <p className="text-sm text-charcoal-light">Senior Ayurvedic Practitioner</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-sm">
                  <Calendar size={16} className="text-teal mr-2" />
                  <span>{details.date || 'Select date'}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock size={16} className="text-teal mr-2" />
                  <span>{details.time || 'Select time'}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Video size={16} className="text-teal mr-2" />
                  <span>{details.mode === 'video' ? 'Video Call' : 'Audio Call'}</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-charcoal-light">Consultation Fee</span>
                  <span className="font-medium">₹2,500</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-charcoal-light">Platform Fee</span>
                  <span className="font-medium">₹100</span>
                </div>
                <div className="flex justify-between items-center text-lg font-medium">
                  <span>Total</span>
                  <span>₹2,600</span>
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-teal-light/10 rounded-lg">
                <div className="flex items-center text-teal">
                  <CreditCard size={16} className="mr-2" />
                  <span className="text-sm">Secure payment with Razorpay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConsultationBooking;