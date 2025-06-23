'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  ArrowRight, 
  Calendar as CalendarIcon, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { addDays, format, isAfter, isBefore } from 'date-fns';

export default function StartDatePage() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  
  // Calculate available date range (7 days after payment to 30 days window)
  const paymentDate = new Date(); // In real app, this would come from payment data
  const earliestDate = addDays(paymentDate, 7);
  const latestDate = addDays(paymentDate, 37); // 30-day window starting 7 days after payment

  const isDateDisabled = (date: Date) => {
    return isBefore(date, earliestDate) || isAfter(date, latestDate);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date && !isDateDisabled(date)) {
      setSelectedDate(date);
    }
  };

  const handleConfirm = () => {
    if (selectedDate) {
      // Save start date and redirect to app download
      localStorage.setItem('programStartDate', selectedDate.toISOString());
      window.location.href = '/app-download';
    }
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
          </div>
        </div>
      </nav>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-teal-900 mb-4">
              Choose Your Start Date
            </h1>
            <p className="text-xl text-teal-700">
              Select when you'd like to begin your healing journey
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calendar */}
            <Card className="border-teal-200 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-teal-900 flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Select Your Start Date
                </CardTitle>
                <CardDescription className="text-teal-600">
                  Choose any date within your 30-day window
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={isDateDisabled}
                  className="rounded-md border-teal-200"
                />
              </CardContent>
            </Card>

            {/* Information Panel */}
            <div className="space-y-6">
              <Card className="border-teal-200 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-teal-900">Important Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-teal-800">Preparation Period</h4>
                      <p className="text-sm text-teal-700">
                        Your program starts 7 days after payment to allow time for preparation and kit delivery.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-teal-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-teal-800">Available Window</h4>
                      <p className="text-sm text-teal-700">
                        You can start your program between {format(earliestDate, 'MMM dd')} and {format(latestDate, 'MMM dd, yyyy')}.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-teal-800">What Happens Next</h4>
                      <p className="text-sm text-teal-700">
                        After selecting your date, you'll receive your app access and preparation materials.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {selectedDate && (
                <Card className="border-teal-200 shadow-lg bg-gradient-to-r from-teal-50 to-pink-50">
                  <CardHeader>
                    <CardTitle className="text-xl text-teal-900">Selected Date</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-teal-900 mb-2">
                        {format(selectedDate, 'EEEE, MMMM dd, yyyy')}
                      </div>
                      <Badge variant="secondary" className="bg-teal-100 text-teal-700 mb-4">
                        {format(selectedDate, 'dd')} days from payment
                      </Badge>
                      <p className="text-teal-700 mb-6">
                        Your healing journey begins on this date. You'll receive all preparation materials and app access before then.
                      </p>
                      <Button 
                        onClick={handleConfirm}
                        className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-3 rounded-full"
                      >
                        Confirm Start Date
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {!selectedDate && (
                <Card className="border-gray-200 shadow-lg bg-gray-50">
                  <CardContent className="text-center py-8">
                    <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Please select a date from the calendar to continue
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}