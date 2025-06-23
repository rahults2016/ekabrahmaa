import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, MapPin } from 'lucide-react';

interface Appointment {
  id: string;
  title: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatar: string;
  date: string;
  time: string;
  duration: string;
  location: 'video' | 'in-person';
  address?: string;
  notes?: string;
}

const appointments: Appointment[] = [
  {
    id: '1',
    title: 'Ayurvedic Consultation',
    doctorName: 'Aparna Albert',
    doctorSpecialty: 'Senior Ayurvedic Practitioner',
    doctorAvatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150',
    date: 'Today',
    time: '2:00 PM',
    duration: '45 minutes',
    location: 'video',
    notes: 'Please have your recent diet journal ready to discuss.'
  },
  {
    id: '2',
    title: 'Nutrition Review',
    doctorName: 'Shradha Kurup',
    doctorSpecialty: 'Ayurvedic Nutritionist',
    doctorAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    date: 'Tomorrow',
    time: '10:30 AM',
    duration: '30 minutes',
    location: 'video'
  },
  {
    id: '3',
    title: 'Yoga Therapy',
    doctorName: 'Sarah Williams',
    doctorSpecialty: 'Yoga Therapist',
    doctorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    date: 'May 2, 2025',
    time: '4:15 PM',
    duration: '60 minutes',
    location: 'in-person',
    address: '123 Healing Center, New York, NY 10001'
  }
];

const Appointments: React.FC = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  
  const handleSelectAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-garamond font-semibold">
            Your Appointments
          </h2>
          <button className="btn-primary py-2">
            Schedule New
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Appointments list */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className={`card hover:shadow-lg cursor-pointer transition-all ${
                    selectedAppointment?.id === appointment.id
                      ? 'border-2 border-teal'
                      : ''
                  }`}
                  onClick={() => handleSelectAppointment(appointment)}
                >
                  <div className="flex items-start">
                    <img 
                      src={appointment.doctorAvatar} 
                      alt={appointment.doctorName}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-garamond font-semibold text-charcoal-dark">
                        {appointment.title}
                      </h3>
                      <p className="text-charcoal text-sm">with Dr. {appointment.doctorName}</p>
                      
                      <div className="mt-3 flex flex-wrap gap-3">
                        <div className="flex items-center text-sm text-charcoal-light">
                          <Calendar size={14} className="mr-1" />
                          <span>{appointment.date}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-charcoal-light">
                          <Clock size={14} className="mr-1" />
                          <span>{appointment.time}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-charcoal-light">
                          {appointment.location === 'video' ? (
                            <Video size={14} className="mr-1" />
                          ) : (
                            <MapPin size={14} className="mr-1" />
                          )}
                          <span>{appointment.location === 'video' ? 'Video Call' : 'In-Person'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Appointment details */}
          <div className="lg:col-span-5">
            {selectedAppointment ? (
              <div className="card h-full">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <h3 className="text-xl font-garamond font-semibold text-charcoal-dark mb-1">
                      {selectedAppointment.title}
                    </h3>
                    <p className="text-charcoal-light text-sm">
                      {selectedAppointment.duration} appointment
                    </p>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <img 
                      src={selectedAppointment.doctorAvatar} 
                      alt={selectedAppointment.doctorName}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-medium">Dr. {selectedAppointment.doctorName}</h4>
                      <p className="text-sm text-charcoal-light">{selectedAppointment.doctorSpecialty}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6 flex-1">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-teal-light/20 flex items-center justify-center mr-3">
                        <Calendar size={20} className="text-teal" />
                      </div>
                      <div>
                        <h5 className="font-medium">Date & Time</h5>
                        <p className="text-sm text-charcoal-light">
                          {selectedAppointment.date} at {selectedAppointment.time}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-teal-light/20 flex items-center justify-center mr-3">
                        {selectedAppointment.location === 'video' ? (
                          <Video size={20} className="text-teal" />
                        ) : (
                          <MapPin size={20} className="text-teal" />
                        )}
                      </div>
                      <div>
                        <h5 className="font-medium">Location</h5>
                        <p className="text-sm text-charcoal-light">
                          {selectedAppointment.location === 'video' 
                            ? 'Video Call' 
                            : selectedAppointment.address}
                        </p>
                      </div>
                    </div>
                    
                    {selectedAppointment.notes && (
                      <div className="mt-6">
                        <h5 className="font-medium mb-2">Notes</h5>
                        <p className="text-sm text-charcoal bg-gray-50 p-3 rounded-lg">
                          {selectedAppointment.notes}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-3">
                    {selectedAppointment.location === 'video' && (
                      <button className="btn-primary flex-1 flex items-center justify-center">
                        <Video size={18} className="mr-2" />
                        Join Now
                      </button>
                    )}
                    <button className="btn-secondary flex-1">
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card h-full flex flex-col items-center justify-center text-center p-10">
                <div className="w-16 h-16 rounded-full bg-teal-light/20 flex items-center justify-center mb-4">
                  <Calendar size={32} className="text-teal" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Appointment Selected</h3>
                <p className="text-charcoal-light mb-6">
                  Select an appointment to view details or schedule a new one.
                </p>
                <button className="btn-primary">
                  Schedule New Appointment
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Appointments;