'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Video, 
  Phone,
  MapPin,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  type: 'video' | 'phone' | 'in-person';
}

interface ConsultationDay {
  date: Date;
  dayName: string;
  dayNumber: number;
  month: string;
  available: boolean;
  timeSlots: TimeSlot[];
}

const generateTimeSlots = (available: boolean): TimeSlot[] => {
  const slots = [
    { time: '9:00 AM', type: 'video' as const },
    { time: '10:00 AM', type: 'video' as const },
    { time: '11:00 AM', type: 'phone' as const },
    { time: '2:00 PM', type: 'video' as const },
    { time: '3:00 PM', type: 'in-person' as const },
    { time: '4:00 PM', type: 'video' as const },
    { time: '5:00 PM', type: 'phone' as const },
  ];

  return slots.map((slot, index) => ({
    id: `slot-${index}`,
    time: slot.time,
    available: available && Math.random() > 0.3, // Randomly make some slots unavailable
    type: slot.type
  }));
};

const generateConsultationDays = (): ConsultationDay[] => {
  const days: ConsultationDay[] = [];
  const today = new Date();
  
  // Generate next 14 days
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const available = dayName !== 'Sun'; // No consultations on Sundays
    
    days.push({
      date,
      dayName,
      dayNumber,
      month,
      available,
      timeSlots: generateTimeSlots(available)
    });
  }
  
  return days;
};

export default function BookingScheduler() {
  const [consultationDays] = useState<ConsultationDay[]>(generateConsultationDays());
  const [selectedDay, setSelectedDay] = useState<ConsultationDay | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(0);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const daysPerWeek = 7;
  const currentWeekDays = consultationDays.slice(currentWeekStart, currentWeekStart + daysPerWeek);

  const nextWeek = () => {
    if (currentWeekStart + daysPerWeek < consultationDays.length) {
      setCurrentWeekStart(currentWeekStart + daysPerWeek);
    }
  };

  const prevWeek = () => {
    if (currentWeekStart > 0) {
      setCurrentWeekStart(Math.max(0, currentWeekStart - daysPerWeek));
    }
  };

  const handleDaySelect = (day: ConsultationDay) => {
    if (day.available) {
      setSelectedDay(day);
      setSelectedTimeSlot(null);
    }
  };

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedTimeSlot(slot);
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedDay || !selectedTimeSlot) return;
    
    setIsBooking(true);
    
    // Simulate booking process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save booking details
      const bookingDetails = {
        date: selectedDay.date.toISOString(),
        time: selectedTimeSlot.time,
        type: selectedTimeSlot.type,
        bookedAt: new Date().toISOString()
      };
      
      localStorage.setItem('consultationBooking', JSON.stringify(bookingDetails));
      setBookingComplete(true);
      
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsBooking(false);
    }
  };

  const getConsultationTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'phone':
        return <Phone className="w-4 h-4" />;
      case 'in-person':
        return <MapPin className="w-4 h-4" />;
      default:
        return <Video className="w-4 h-4" />;
    }
  };

  const getConsultationTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'phone':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in-person':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-teal-200 shadow-xl bg-white/90 backdrop-blur-sm text-center">
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-serif font-bold text-teal-900 mb-4">
                Consultation Booked Successfully!
              </h2>
              
              <p className="text-xl text-teal-700 mb-8 leading-relaxed">
                Your consultation has been scheduled. You'll receive a confirmation email with all the details.
              </p>
              
              <div className="bg-teal-50 p-6 rounded-lg mb-8">
                <h3 className="font-semibold text-teal-800 mb-4">Appointment Details:</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-teal-700">Date:</span>
                    <span className="font-medium text-teal-900">
                      {selectedDay?.date.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-teal-700">Time:</span>
                    <span className="font-medium text-teal-900">{selectedTimeSlot?.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-teal-700">Type:</span>
                    <Badge className={getConsultationTypeColor(selectedTimeSlot?.type || 'video')}>
                      {getConsultationTypeIcon(selectedTimeSlot?.type || 'video')}
                      <span className="ml-1 capitalize">{selectedTimeSlot?.type}</span>
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-3 rounded-full">
                    Return to Home
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50 px-6 py-3 rounded-full">
                  Add to Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-teal-900 mb-4">
            Schedule Your Consultation
          </h1>
          <p className="text-xl text-teal-700 leading-relaxed">
            Book a 2-day window for your initial consultation with our expert healers
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="border-teal-200 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-teal-900">
                    Select Date
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={prevWeek}
                      disabled={currentWeekStart === 0}
                      className="text-teal-600"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={nextWeek}
                      disabled={currentWeekStart + daysPerWeek >= consultationDays.length}
                      className="text-teal-600"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {currentWeekDays.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => handleDaySelect(day)}
                      disabled={!day.available}
                      className={`p-4 rounded-lg text-center transition-all duration-200 ${
                        selectedDay?.date.getTime() === day.date.getTime()
                          ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg'
                          : day.available
                            ? 'bg-white border-2 border-teal-100 hover:border-teal-300 hover:bg-teal-50 text-teal-700'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <div className="text-xs font-medium mb-1">{day.dayName}</div>
                      <div className="text-lg font-bold">{day.dayNumber}</div>
                      <div className="text-xs">{day.month}</div>
                      {!day.available && (
                        <div className="text-xs mt-1 text-red-500">Unavailable</div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Time Slots */}
                {selectedDay && (
                  <div>
                    <h3 className="font-semibold text-teal-900 mb-4">
                      Available Time Slots - {selectedDay.date.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {selectedDay.timeSlots.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => handleTimeSlotSelect(slot)}
                          disabled={!slot.available}
                          className={`p-3 rounded-lg text-left transition-all duration-200 border-2 ${
                            selectedTimeSlot?.id === slot.id
                              ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white border-teal-700 shadow-lg'
                              : slot.available
                                ? 'bg-white border-teal-100 hover:border-teal-300 hover:bg-teal-50 text-teal-700'
                                : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{slot.time}</span>
                            <div className={`p-1 rounded ${
                              selectedTimeSlot?.id === slot.id ? 'bg-white/20' : getConsultationTypeColor(slot.type)
                            }`}>
                              {getConsultationTypeIcon(slot.type)}
                            </div>
                          </div>
                          <div className="text-xs capitalize opacity-75">
                            {slot.type.replace('-', ' ')}
                          </div>
                          {!slot.available && (
                            <div className="text-xs text-red-500 mt-1">Booked</div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="border-teal-200 shadow-lg bg-white/90 backdrop-blur-sm sticky top-8">
              <CardHeader>
                <CardTitle className="text-teal-900">
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedDay ? (
                  <div className="p-4 bg-teal-50 rounded-lg">
                    <h4 className="font-semibold text-teal-800 mb-2">Selected Date</h4>
                    <p className="text-teal-700">
                      {selectedDay.date.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Select a date to continue</p>
                  </div>
                )}

                {selectedTimeSlot ? (
                  <div className="p-4 bg-teal-50 rounded-lg">
                    <h4 className="font-semibold text-teal-800 mb-2">Selected Time</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-teal-700 font-medium">{selectedTimeSlot.time}</span>
                      <Badge className={getConsultationTypeColor(selectedTimeSlot.type)}>
                        {getConsultationTypeIcon(selectedTimeSlot.type)}
                        <span className="ml-1 capitalize">{selectedTimeSlot.type}</span>
                      </Badge>
                    </div>
                  </div>
                ) : selectedDay ? (
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Select a time slot</p>
                  </div>
                ) : null}

                {/* Consultation Types Info */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-teal-800">Consultation Types:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Video className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-700">Video Call - Most popular</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Phone Call - Audio only</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-purple-600" />
                      <span className="text-gray-700">In-Person - Mumbai clinic</span>
                    </div>
                  </div>
                </div>

                {/* Important Note */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800 text-sm mb-1">Important Note</h4>
                      <p className="text-blue-700 text-xs leading-relaxed">
                        This is a 2-day consultation window. Our team will contact you within this period to confirm the exact time and provide joining details.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Book Button */}
                <Button
                  onClick={handleBookAppointment}
                  disabled={!selectedDay || !selectedTimeSlot || isBooking}
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isBooking ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Booking...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Book Consultation
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-teal-600">
                  Free 15-minute initial consultation. No payment required.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}