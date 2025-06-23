'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { 
  Leaf, 
  ArrowRight, 
  User, 
  Calendar, 
  Weight, 
  MessageCircle,
  Mail,
  Briefcase,
  Globe,
  Heart
} from 'lucide-react';
import Link from 'next/link';

const healthConditions = [
  'Diabetes',
  'Hypertension',
  'Heart Disease',
  'Thyroid Disorders',
  'PCOS/PCOD',
  'Arthritis',
  'Digestive Issues',
  'Anxiety/Depression',
  'Allergies',
  'Asthma',
  'Kidney Disease',
  'Liver Disease',
  'Cancer (any type)',
  'Autoimmune Conditions',
  'Sleep Disorders',
  'Chronic Pain',
  'Other'
];

const professions = [
  'Software Engineer/IT',
  'Doctor/Healthcare',
  'Teacher/Educator',
  'Business Owner',
  'Manager/Executive',
  'Student',
  'Homemaker',
  'Consultant',
  'Artist/Creative',
  'Sales/Marketing',
  'Finance/Banking',
  'Government Employee',
  'Retired',
  'Other'
];

const countries = [
  'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
  'Germany', 'France', 'Singapore', 'UAE', 'Other'
];

export default function DataInputPage() {
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    age: '',
    sex: '',
    currentWeight: '',
    whatsappNumber: '',
    hasWhatsapp: false,
    email: '',
    profession: '',
    nationality: '',
    existingConditions: [] as string[],
    otherCondition: '',
    additionalNotes: ''
  });

  const handleConditionChange = (condition: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        existingConditions: [...formData.existingConditions, condition]
      });
    } else {
      setFormData({
        ...formData,
        existingConditions: formData.existingConditions.filter(c => c !== condition)
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Personal data submitted:', formData);
    // Save data and redirect to full results
    localStorage.setItem('personalData', JSON.stringify(formData));
    window.location.href = '/quiz/full-result';
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
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-teal-900 mb-4">
              Complete Your Profile
            </h1>
            <p className="text-teal-700">
              Help us personalize your healing journey with some additional information
            </p>
          </div>

          <Card className="border-teal-200 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-teal-900">Personal Information</CardTitle>
              <CardDescription className="text-teal-600">
                This information helps our healers create the most effective program for you
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dob" className="text-teal-800 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Date of Birth
                    </Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                      className="border-teal-200 focus:border-teal-400"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-teal-800 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Age
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Your age"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      className="border-teal-200 focus:border-teal-400"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sex" className="text-teal-800">
                      Sex
                    </Label>
                    <Select value={formData.sex} onValueChange={(value) => setFormData({...formData, sex: value})}>
                      <SelectTrigger className="border-teal-200">
                        <SelectValue placeholder="Select sex" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-teal-800 flex items-center">
                      <Weight className="w-4 h-4 mr-2" />
                      Current Weight (kg)
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Weight in kg"
                      value={formData.currentWeight}
                      onChange={(e) => setFormData({...formData, currentWeight: e.target.value})}
                      className="border-teal-200 focus:border-teal-400"
                      required
                    />
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasWhatsapp"
                      checked={formData.hasWhatsapp}
                      onCheckedChange={(checked) => setFormData({...formData, hasWhatsapp: checked as boolean})}
                    />
                    <Label htmlFor="hasWhatsapp" className="text-teal-800 flex items-center cursor-pointer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      I have WhatsApp
                    </Label>
                  </div>

                  {formData.hasWhatsapp && (
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp" className="text-teal-800">
                        WhatsApp Number
                      </Label>
                      <Input
                        id="whatsapp"
                        type="tel"
                        placeholder="WhatsApp number with country code"
                        value={formData.whatsappNumber}
                        onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})}
                        className="border-teal-200 focus:border-teal-400"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-teal-800 flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="border-teal-200 focus:border-teal-400"
                      required
                    />
                  </div>
                </div>

                {/* Professional Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="profession" className="text-teal-800 flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Profession
                    </Label>
                    <Select value={formData.profession} onValueChange={(value) => setFormData({...formData, profession: value})}>
                      <SelectTrigger className="border-teal-200">
                        <SelectValue placeholder="Select profession" />
                      </SelectTrigger>
                      <SelectContent>
                        {professions.map((profession) => (
                          <SelectItem key={profession} value={profession}>
                            {profession}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nationality" className="text-teal-800 flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      Nationality
                    </Label>
                    <Select value={formData.nationality} onValueChange={(value) => setFormData({...formData, nationality: value})}>
                      <SelectTrigger className="border-teal-200">
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Health Conditions */}
                <div className="space-y-4">
                  <Label className="text-teal-800 flex items-center">
                    <Heart className="w-4 h-4 mr-2" />
                    Existing Health Conditions (Select all that apply)
                  </Label>
                  <div className="grid md:grid-cols-2 gap-3 max-h-48 overflow-y-auto p-4 border border-teal-200 rounded-lg">
                    {healthConditions.map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox
                          id={condition}
                          checked={formData.existingConditions.includes(condition)}
                          onCheckedChange={(checked) => handleConditionChange(condition, checked as boolean)}
                        />
                        <Label htmlFor={condition} className="text-sm text-teal-700 cursor-pointer">
                          {condition}
                        </Label>
                      </div>
                    ))}
                  </div>

                  {formData.existingConditions.includes('Other') && (
                    <div className="space-y-2">
                      <Label htmlFor="otherCondition" className="text-teal-800">
                        Please specify other condition
                      </Label>
                      <Input
                        id="otherCondition"
                        type="text"
                        placeholder="Describe your condition"
                        value={formData.otherCondition}
                        onChange={(e) => setFormData({...formData, otherCondition: e.target.value})}
                        className="border-teal-200 focus:border-teal-400"
                      />
                    </div>
                  )}
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-teal-800">
                    Additional Notes (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional information you'd like to share with your healers..."
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                    className="border-teal-200 focus:border-teal-400 min-h-[100px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-3 rounded-full"
                >
                  Complete Profile
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}