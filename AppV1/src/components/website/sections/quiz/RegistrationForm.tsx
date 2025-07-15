import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/website/ui/card';
import { Button } from '@/components/website/ui/button';
import { Input } from '@/components/website/ui/input';
import { Label } from '@/components/website/ui/label';
import { CheckCircle } from 'lucide-react';

interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  city: string;
  country: string;
  whatsappOptIn: boolean;
}

interface RegistrationFormProps {
  results: { vata: number; pitta: number; kapha: number };
  onRegistrationSuccess: () => void;
}

export const RegistrationForm = ({ results, onRegistrationSuccess }: RegistrationFormProps) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    city: '',
    country: '',
    whatsappOptIn: false
  });
  
  const [isSubmittingRegistration, setIsSubmittingRegistration] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof RegistrationFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateRegistrationForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateRegistrationForm()) {
      return;
    }
    
    setIsSubmittingRegistration(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Auto-detect city and country (simulated)
      const detectedLocation = {
        city: 'Mumbai', // This would come from IP geolocation in real implementation
        country: 'India'
      };
      
      // Save registration data
      const registrationData = {
        ...formData,
        city: detectedLocation.city,
        country: detectedLocation.country,
        doshaResults: results,
        registeredAt: new Date().toISOString()
      };
      
      localStorage.setItem('userRegistration', JSON.stringify(registrationData));
      localStorage.setItem('prakritiResults', JSON.stringify(results));
      localStorage.setItem('userDosha', JSON.stringify(results));
      
      // Trigger success callback
      onRegistrationSuccess();
      
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmittingRegistration(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-teal-200 shadow-xl bg-white/80 backdrop-blur-sm mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-serif text-teal-900">
            Unlock Your Complete Prakriti Analysis
          </CardTitle>
          <p className="text-teal-600 mt-2">
            Get your detailed dosha breakdown and personalized recommendations
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegistrationSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-teal-800 font-medium mb-2">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`${formErrors.name ? 'border-red-500' : ''}`}
              />
              {formErrors.name && (
                <p className="text-sm text-red-600 mt-1">{formErrors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-teal-800 font-medium mb-2">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@gmail.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`${formErrors.email ? 'border-red-500' : ''}`}
              />
              <p className="text-xs text-teal-600 mt-1">
                We support Gmail, Yahoo, Outlook, and other providers
              </p>
              {formErrors.email && (
                <p className="text-sm text-red-600 mt-1">{formErrors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <Label className="text-teal-800 font-medium mb-2">
                Phone Number
              </Label>
              <div className="flex gap-3">
                <select
                  value={formData.countryCode}
                  onChange={(e) => handleInputChange('countryCode', e.target.value)}
                  className="w-20 h-9 px-2 text-sm border border-input rounded-md bg-transparent focus:border-ring focus:ring-ring/50 focus:ring-[3px] outline-none"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+61">+61</option>
                  <option value="+971">+971</option>
                </select>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`flex-1 ${formErrors.phone ? 'border-red-500' : ''}`}
                />
              </div>
              {formErrors.phone && (
                <p className="text-sm text-red-600 mt-1">{formErrors.phone}</p>
              )}
              
              {/* WhatsApp Opt-in */}
              <div className="flex items-center space-x-2 mt-3">
                <input
                  type="checkbox"
                  id="whatsapp"
                  checked={formData.whatsappOptIn}
                  onChange={(e) => handleInputChange('whatsappOptIn', e.target.checked)}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <Label htmlFor="whatsapp" className="text-sm text-teal-700">
                  Send updates via WhatsApp
                </Label>
              </div>
            </div>

            {/* Location (Auto-detected) */}
            <div className="bg-teal-50 p-4 rounded-lg">
              <Label className="text-teal-800 font-medium mb-2">
                Location (Auto-detected)
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="City will be auto-detected"
                  value="Mumbai"
                  disabled
                  className="bg-white/50"
                />
                <Input
                  placeholder="Country will be auto-detected"
                  value="India"
                  disabled
                  className="bg-white/50"
                />
              </div>
              <p className="text-xs text-teal-600 mt-2">
                We'll automatically detect your location for personalized recommendations
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmittingRegistration}
              className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isSubmittingRegistration ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Get My Complete Analysis
                </>
              )}
            </Button>
            
            <p className="text-xs text-center text-teal-600">
              By submitting, you agree to receive personalized health insights and program recommendations.
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};