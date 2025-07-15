'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  FileText,
  CheckCircle,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface MedicalFormData {
  dateOfBirth: {
    day: string;
    month: string;
    year: string;
  };
  gender: string;
  weight: string;
  weightUnit: string;
  nationality: string;
  profession: string;
  existingConditions: string[];
  otherConditions: string;
  additionalNotes: string;
}

const commonConditions = [
  'Diabetes',
  'Hypertension',
  'Thyroid Disorders',
  'PCOS/PCOD',
  'Anxiety',
  'Depression',
  'Arthritis',
  'Asthma',
  'Heart Disease',
  'Digestive Issues',
  'Sleep Disorders',
  'Allergies',
  'Migraine',
  'Back Pain',
  'Obesity'
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function MedicalQuestionnaire() {
  const [formData, setFormData] = useState<MedicalFormData>({
    dateOfBirth: { day: '', month: '', year: '' },
    gender: '',
    weight: '',
    weightUnit: 'kg',
    nationality: '',
    profession: '',
    existingConditions: [],
    otherConditions: '',
    additionalNotes: ''
  });

  const [age, setAge] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate age when date of birth changes
  useEffect(() => {
    const { day, month, year } = formData.dateOfBirth;
    if (day && month && year) {
      const birthDate = new Date(parseInt(year), months.indexOf(month), parseInt(day));
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      
      setAge(calculatedAge);
    } else {
      setAge(null);
    }
  }, [formData.dateOfBirth]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleDateChange = (field: 'day' | 'month' | 'year', value: string) => {
    setFormData(prev => ({
      ...prev,
      dateOfBirth: {
        ...prev.dateOfBirth,
        [field]: value
      }
    }));
    
    // Clear date of birth error
    if (errors.dateOfBirth) {
      setErrors(prev => ({
        ...prev,
        dateOfBirth: ''
      }));
    }
  };

  const handleConditionToggle = (condition: string) => {
    setFormData(prev => ({
      ...prev,
      existingConditions: prev.existingConditions.includes(condition)
        ? prev.existingConditions.filter(c => c !== condition)
        : [...prev.existingConditions, condition]
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate date of birth
    const { day, month, year } = formData.dateOfBirth;
    if (!day || !month || !year) {
      newErrors.dateOfBirth = 'Please provide your complete date of birth';
    } else if (age === null || age < 0 || age > 120) {
      newErrors.dateOfBirth = 'Please provide a valid date of birth';
    }

    // Validate required fields
    if (!formData.gender) newErrors.gender = 'Please select your gender';
    if (!formData.weight) newErrors.weight = 'Please enter your weight';
    if (!formData.nationality) newErrors.nationality = 'Please enter your nationality';
    if (!formData.profession) newErrors.profession = 'Please enter your profession';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save to localStorage for demo purposes
      localStorage.setItem('medicalQuestionnaire', JSON.stringify({
        ...formData,
        age,
        submittedAt: new Date().toISOString()
      }));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-teal-200 shadow-xl bg-white/90 backdrop-blur-sm text-center">
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-serif font-bold text-teal-900 mb-4">
                Medical Information Submitted Successfully!
              </h2>
              
              <p className="text-xl text-teal-700 mb-8 leading-relaxed">
                Thank you for providing your medical information. Our healers will review your details and prepare a personalized treatment plan.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg">
                  <FileText className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-teal-800 text-sm mb-1">Next Step</h4>
                  <p className="text-teal-700 text-sm">Upload your lab reports and documents</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-pink-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-pink-800 text-sm mb-1">Then</h4>
                  <p className="text-pink-700 text-sm">Schedule your consultation</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/onboarding/upload-portal">
                  <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-3 rounded-full">
                    Upload Documents
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50 px-6 py-3 rounded-full">
                    Return to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-teal-900 mb-4">
            Medical Questionnaire
          </h1>
          <p className="text-xl text-teal-700 leading-relaxed">
            Help us understand your health profile for personalized care
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {/* Personal Information */}
            <Card className="border-teal-200 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-teal-900">
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date of Birth */}
                <div>
                  <Label className="text-teal-800 font-medium mb-3 block">
                    Date of Birth
                  </Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="day" className="text-sm text-teal-600">Day</Label>
                      <Input
                        id="day"
                        type="number"
                        min="1"
                        max="31"
                        placeholder="DD"
                        value={formData.dateOfBirth.day}
                        onChange={(e) => handleDateChange('day', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="month" className="text-sm text-teal-600">Month</Label>
                      <select
                        id="month"
                        value={formData.dateOfBirth.month}
                        onChange={(e) => handleDateChange('month', e.target.value)}
                        className="mt-1 w-full h-9 px-3 py-1 text-sm border border-input rounded-md bg-transparent focus:border-ring focus:ring-ring/50 focus:ring-[3px] outline-none"
                      >
                        <option value="">Select Month</option>
                        {months.map(month => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="year" className="text-sm text-teal-600">Year</Label>
                      <Input
                        id="year"
                        type="number"
                        min="1900"
                        max={new Date().getFullYear()}
                        placeholder="YYYY"
                        value={formData.dateOfBirth.year}
                        onChange={(e) => handleDateChange('year', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  {age !== null && (
                    <p className="text-sm text-teal-600 mt-2">
                      Age: <span className="font-medium">{age} years</span>
                    </p>
                  )}
                  {errors.dateOfBirth && (
                    <p className="text-sm text-red-600 mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <Label className="text-teal-800 font-medium mb-3 block">Gender</Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) => handleInputChange('gender', value)}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  >
                    {['Male', 'Female', 'Other', 'Prefer not to say'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="text-sm">{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.gender && (
                    <p className="text-sm text-red-600 mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.gender}
                    </p>
                  )}
                </div>

                {/* Weight */}
                <div>
                  <Label className="text-teal-800 font-medium mb-3 block">
                    Weight
                  </Label>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Enter weight"
                        value={formData.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                      />
                    </div>
                    <div className="w-24">
                      <select
                        value={formData.weightUnit}
                        onChange={(e) => handleInputChange('weightUnit', e.target.value)}
                        className="w-full h-9 px-3 py-1 text-sm border border-input rounded-md bg-transparent focus:border-ring focus:ring-ring/50 focus:ring-[3px] outline-none"
                      >
                        <option value="kg">kg</option>
                        <option value="lbs">lbs</option>
                      </select>
                    </div>
                  </div>
                  {errors.weight && (
                    <p className="text-sm text-red-600 mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.weight}
                    </p>
                  )}
                </div>

                {/* Nationality */}
                <div>
                  <Label htmlFor="nationality" className="text-teal-800 font-medium mb-3 block">
                    Nationality
                  </Label>
                  <Input
                    id="nationality"
                    placeholder="Enter your nationality"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                  />
                  {errors.nationality && (
                    <p className="text-sm text-red-600 mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.nationality}
                    </p>
                  )}
                </div>

                {/* Profession */}
                <div>
                  <Label htmlFor="profession" className="text-teal-800 font-medium mb-3 block">
                    Profession
                  </Label>
                  <Input
                    id="profession"
                    placeholder="Enter your profession"
                    value={formData.profession}
                    onChange={(e) => handleInputChange('profession', e.target.value)}
                  />
                  {errors.profession && (
                    <p className="text-sm text-red-600 mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.profession}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Medical History */}
            <Card className="border-teal-200 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-teal-900">
                  Medical History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Existing Conditions */}
                <div>
                  <Label className="text-teal-800 font-medium mb-3 block">
                    Existing Health Conditions
                  </Label>
                  <p className="text-sm text-teal-600 mb-4">
                    Select all conditions that apply to you:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {commonConditions.map((condition) => (
                      <Badge
                        key={condition}
                        variant={formData.existingConditions.includes(condition) ? "default" : "outline"}
                        className={`cursor-pointer transition-all duration-200 justify-center py-2 px-3 ${
                          formData.existingConditions.includes(condition)
                            ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800'
                            : 'border-teal-200 text-teal-700 hover:bg-teal-50'
                        }`}
                        onClick={() => handleConditionToggle(condition)}
                      >
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Other Conditions */}
                <div>
                  <Label htmlFor="otherConditions" className="text-teal-800 font-medium mb-3 block">
                    Other Conditions (if any)
                  </Label>
                  <textarea
                    id="otherConditions"
                    placeholder="Please describe any other health conditions not listed above..."
                    value={formData.otherConditions}
                    onChange={(e) => handleInputChange('otherConditions', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-input rounded-md bg-transparent focus:border-ring focus:ring-ring/50 focus:ring-[3px] outline-none resize-none"
                  />
                </div>

                <Separator className="bg-teal-100" />

                {/* Additional Notes */}
                <div>
                  <Label htmlFor="additionalNotes" className="text-teal-800 font-medium mb-3 block">
                    Additional Notes
                  </Label>
                  <textarea
                    id="additionalNotes"
                    placeholder="Any additional information you'd like to share about your health, symptoms, or concerns..."
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 text-sm border border-input rounded-md bg-transparent focus:border-ring focus:ring-ring/50 focus:ring-[3px] outline-none resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Medical Information
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
              
              <p className="text-sm text-teal-600 mt-4">
                Your information is secure and will only be shared with your assigned healers.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}