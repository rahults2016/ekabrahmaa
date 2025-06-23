'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Star, 
  Heart, 
  Leaf,
  Video,
  Phone,
  MessageCircle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

const healers = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    specialization: 'Ayurveda Physician & Panchakarma Specialist',
    experience: '12 years',
    rating: 4.9,
    reviews: 248,
    languages: ['Hindi', 'English', 'Sanskrit'],
    expertise: ['Digestive Health', 'Women\'s Wellness', 'Stress Management', 'Detoxification'],
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300',
    consultationFee: '₹1,500',
    available: true,
    bio: 'Dr. Priya specializes in classical Ayurveda with a focus on digestive health and women\'s wellness. She combines traditional wisdom with modern understanding to create personalized healing plans.'
  },
  {
    id: 2,
    name: 'Dr. Rajesh Kumar',
    specialization: 'Senior Ayurveda Consultant',
    experience: '18 years',
    rating: 4.8,
    reviews: 312,
    languages: ['Hindi', 'English', 'Bengali'],
    expertise: ['Chronic Conditions', 'Joint Health', 'Respiratory Issues', 'Immunity'],
    image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300',
    consultationFee: '₹2,000',
    available: true,
    bio: 'With nearly two decades of experience, Dr. Rajesh specializes in treating chronic conditions through constitutional therapy and lifestyle modifications.'
  },
  {
    id: 3,
    name: 'Dr. Meera Patel',
    specialization: 'Ayurveda & Yoga Therapist',
    experience: '10 years',
    rating: 4.9,
    reviews: 189,
    languages: ['Hindi', 'English', 'Gujarati'],
    expertise: ['Mental Health', 'Sleep Disorders', 'Anxiety', 'Meditation'],
    image: 'https://images.pexels.com/photos/5327647/pexels-photo-5327647.jpeg?auto=compress&cs=tinysrgb&w=300',
    consultationFee: '₹1,200',
    available: false,
    bio: 'Dr. Meera integrates Ayurveda with yoga therapy, specializing in mental health and emotional well-being through holistic approaches.'
  }
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
];

export default function ConsultationPage() {
  const [selectedHealer, setSelectedHealer] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [consultationType, setConsultationType] = useState<string>('');
  const [step, setStep] = useState(1);

  const handleBooking = () => {
    // Handle booking logic here
    console.log('Booking details:', {
      healer: selectedHealer,
      date: selectedDate,
      time: selectedTime,
      type: consultationType
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-pink-400 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-serif font-bold text-teal-800">ekaBrahmaa</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-serif font-bold text-teal-900 mb-6">
            Talk to a Healer
          </h1>
          <p className="text-xl text-teal-700 leading-relaxed mb-8">
            Connect with experienced Ayurveda practitioners for personalized guidance on your healing journey
          </p>
        </div>
      </section>

      {/* Booking Steps */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                1
              </div>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                2
              </div>
              <div className={`w-16 h-1 ${step >= 3 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                3
              </div>
            </div>
          </div>

          {step === 1 && (
            <div>
              <h2 className="text-3xl font-serif font-bold text-teal-900 text-center mb-12">
                Choose Your Healer
              </h2>
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {healers.map((healer) => (
                  <Card 
                    key={healer.id} 
                    className={`border-2 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                      selectedHealer === healer.id 
                        ? 'border-teal-500 bg-teal-50' 
                        : 'border-teal-100 bg-white/80 hover:border-teal-300'
                    } ${!healer.available ? 'opacity-60' : ''}`}
                    onClick={() => healer.available && setSelectedHealer(healer.id)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden relative">
                          <img 
                            src={healer.image} 
                            alt={healer.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg text-teal-900">{healer.name}</CardTitle>
                          <CardDescription className="text-teal-600">{healer.specialization}</CardDescription>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-teal-500 text-teal-500" />
                              <span className="text-sm font-medium">{healer.rating}</span>
                            </div>
                            <span className="text-sm text-teal-600">({healer.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-teal-600">Experience</span>
                        <span className="text-sm font-medium text-teal-800">{healer.experience}</span>
                      </div>
                      
                      <div>
                        <span className="text-sm text-teal-600 block mb-2">Languages</span>
                        <div className="flex flex-wrap gap-1">
                          {healer.languages.map((lang, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-teal-100 text-teal-700">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-sm text-teal-600 block mb-2">Expertise</span>
                        <div className="flex flex-wrap gap-1">
                          {healer.expertise.slice(0, 2).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-teal-200 text-teal-700">
                              {skill}
                            </Badge>
                          ))}
                          {healer.expertise.length > 2 && (
                            <Badge variant="outline" className="text-xs border-teal-200 text-teal-700">
                              +{healer.expertise.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-teal-100">
                        <div className="text-xl font-bold text-teal-900">
                          {healer.consultationFee}
                        </div>
                        {!healer.available && (
                          <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                            Currently Unavailable
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Button 
                  size="lg" 
                  onClick={() => setStep(2)}
                  disabled={!selectedHealer}
                  className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-3 rounded-full"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-serif font-bold text-teal-900 text-center mb-12">
                Select Date & Time
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="border-teal-100 bg-white/80">
                  <CardHeader>
                    <CardTitle className="text-teal-900">Choose Date</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border-teal-200"
                    />
                  </CardContent>
                </Card>
                
                <Card className="border-teal-100 bg-white/80">
                  <CardHeader>
                    <CardTitle className="text-teal-900">Available Times</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedDate ? (
                      <div className="grid grid-cols-2 gap-3">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            className={`${
                              selectedTime === time 
                                ? 'bg-teal-600 hover:bg-teal-700 text-white' 
                                : 'border-teal-200 text-teal-700 hover:bg-teal-50'
                            }`}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-teal-600 text-center py-8">
                        Please select a date first
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-center space-x-4 mt-12">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)}
                  className="border-teal-200 text-teal-700 hover:bg-teal-50 px-8 py-3 rounded-full"
                >
                  Back
                </Button>
                <Button 
                  size="lg" 
                  onClick={() => setStep(3)}
                  disabled={!selectedDate || !selectedTime}
                  className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-3 rounded-full"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-serif font-bold text-teal-900 text-center mb-12">
                Consultation Details
              </h2>
              
              <Card className="border-teal-100 bg-white/80">
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-4">
                    <Label htmlFor="consultation-type" className="text-teal-800 font-medium">
                      Consultation Type
                    </Label>
                    <Select value={consultationType} onValueChange={setConsultationType}>
                      <SelectTrigger className="border-teal-200">
                        <SelectValue placeholder="Select consultation type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">
                          <div className="flex items-center space-x-2">
                            <Video className="w-4 h-4" />
                            <span>Video Call</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="phone">
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4" />
                            <span>Phone Call</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="chat">
                          <div className="flex items-center space-x-2">
                            <MessageCircle className="w-4 h-4" />
                            <span>Text Chat</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-4">
                    <Label htmlFor="concerns" className="text-teal-800 font-medium">
                      What would you like to discuss?
                    </Label>
                    <Textarea 
                      id="concerns"
                      placeholder="Describe your health concerns, symptoms, or what you'd like guidance on..."
                      className="border-teal-200 min-h-[120px]"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <Label htmlFor="additional-info" className="text-teal-800 font-medium">
                      Additional Information (Optional)
                    </Label>
                    <Textarea 
                      id="additional-info"
                      placeholder="Any medications you're taking, previous treatments, or other relevant information..."
                      className="border-teal-200"
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Booking Summary */}
              <Card className="border-teal-100 bg-gradient-to-r from-teal-50 to-pink-50 mt-8">
                <CardHeader>
                  <CardTitle className="text-teal-900">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-teal-700">Healer</span>
                    <span className="font-medium text-teal-900">
                      {healers.find(h => h.id === selectedHealer)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-700">Date</span>
                    <span className="font-medium text-teal-900">
                      {selectedDate ? format(selectedDate, 'PPP') : ''}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-700">Time</span>
                    <span className="font-medium text-teal-900">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-700">Type</span>
                    <span className="font-medium text-teal-900 capitalize">{consultationType}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-teal-200">
                    <span className="text-lg font-semibold text-teal-800">Total</span>
                    <span className="text-2xl font-bold text-teal-900">
                      {healers.find(h => h.id === selectedHealer)?.consultationFee}
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-center space-x-4 mt-8">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(2)}
                  className="border-teal-200 text-teal-700 hover:bg-teal-50 px-8 py-3 rounded-full"
                >
                  Back
                </Button>
                <Button 
                  size="lg" 
                  onClick={handleBooking}
                  disabled={!consultationType}
                  className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-3 rounded-full"
                >
                  Book Consultation
                  <CheckCircle className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}