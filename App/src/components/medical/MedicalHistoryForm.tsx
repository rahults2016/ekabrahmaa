import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, Scale, Moon, Utensils, Heart, Baby, FileText } from 'lucide-react';

interface FormData {
  // Personal Biodata
  name: string;
  dateOfBirth: string;
  age: string;
  sex: 'male' | 'female' | 'other';
  nationality: string;
  country: string;
  city: string;
  email: string;
  whatsapp: string;

  // Lifestyle History
  weight: string;
  height: string;
  sleepHours: string;
  sleepQuality: string;
  sleepPattern: string;
  smoking: 'never' | 'occasional' | 'regular' | 'former';
  alcohol: 'never' | 'occasional' | 'regular' | 'former';

  // Medical History
  presentingComplaint: string;
  pastIllnesses: string;
  surgeries: string;
  medications: string;
  allergies: string;
  familyHistory: string;
  emotionalState: string;

  // Digestive Health
  acidity: boolean;
  bloating: boolean;
  bowelFrequency: string;
  stoolConsistency: string;
  constipation: boolean;
  tongueCoating: string;

  // Menstrual History (for females)
  menstrualRegularity: string;
  menstrualDuration: string;
  menstrualFlow: string;
  cycleLength: string;
  lastPeriod: string;

  // Diet History
  dietType: string;
  foodAllergies: string;
  mealTimings: string;
  snackingHabits: string;

  // Treatment Goal
  treatmentGoal: string;

  // Pregnancy Section
  isPregnant: boolean;
  dueDate?: string;
  pregnancyWeeks?: string;
  conceptionMethod?: string;
  pregnancyHistory?: string;

  // Post-Natal Section
  isPostNatal: boolean;
  deliveryType?: string;
  healingStatus?: string;
  deliveryDate?: string;
  nicuStatus?: string;
}

// Helper function to capitalize first letter of each word
const capitalizeWords = (str: string) => {
  return str.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const MedicalHistoryForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    name: user?.name || '',
    dateOfBirth: user?.dateOfBirth || '',
    age: user?.age || '',
    sex: user?.gender || 'female',
    nationality: '', 
    country: '', 
    city: user?.city || '',
    email: user?.email || '',
    whatsapp: '',
    weight: '',
    height: '',
    sleepHours: '',
    sleepQuality: '',
    sleepPattern: '',
    smoking: 'never',
    alcohol: 'never',
    presentingComplaint: '',
    pastIllnesses: '',
    surgeries: '',
    medications: '',
    allergies: '',
    familyHistory: '',
    emotionalState: '',
    acidity: false,
    bloating: false,
    bowelFrequency: '',
    stoolConsistency: '',
    constipation: false,
    tongueCoating: '',
    menstrualRegularity: '',
    menstrualDuration: '',
    menstrualFlow: '',
    cycleLength: '',
    lastPeriod: '',
    dietType: '',
    foodAllergies: '',
    mealTimings: '',
    snackingHabits: '',
    treatmentGoal: '',
    isPregnant: false,
    isPostNatal: false
  });
  const [progress, setProgress] = useState(0);
  const [showPregnancySection, setShowPregnancySection] = useState(false);
  const [showPostNatalSection, setShowPostNatalSection] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');
  
  // Load existing data if available
  useEffect(() => {
    // In a real app, this would fetch from an API
    const savedData = localStorage.getItem('medicalHistory');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const countryCodes = [
    { code: '+91', country: 'India' },
    { code: '+1', country: 'United States' },
    { code: '+44', country: 'United Kingdom' },
    { code: '+971', country: 'UAE' },
    { code: '+65', country: 'Singapore' },
    { code: '+61', country: 'Australia' },
    { code: '+81', country: 'Japan' },
    { code: '+86', country: 'China' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' }
  ];
  
  // Calculate age from date of birth
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age.toString();
  };

  useEffect(() => {
    // Update form data when user data changes
    if (user) {
      const capitalizedName = user.name ? user.name.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ') : '';
      const capitalizedCity = user.city ? user.city.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ') : '';

      setFormData(prev => ({
        ...prev,
        name: capitalizedName || prev.name,
        dateOfBirth: user.dateOfBirth || prev.dateOfBirth,
        age: user.age || prev.age,
        sex: user.gender || prev.sex,
        email: user.email || prev.email,
        city: capitalizedCity || prev.city
      }));
    }
  }, [user]);

  useEffect(() => {
    // Calculate form completion progress
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(value => value !== '').length;
    setProgress((filledFields / totalFields) * 100);
  }, [formData]);

  const validateSection = (sectionFields: string[]) => {
    let errors: Partial<Record<keyof FormData, string>> = {};
    
    sectionFields.forEach((field) => {
      const value = formData[field as keyof FormData];
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        errors[field as keyof FormData] = 'This field is required';
      }
    });
    
    return errors;
  };

  const handleNext = () => {
    const errors = validateSection(sections[currentSection].fields);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Show error message
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setFormErrors({});
    setCurrentSection(prev => prev + 1);
  };

  const sections = [
    {
      title: 'Personal Information',
      icon: <User className="text-teal\" size={24} />,
      fields: ['name', 'dateOfBirth', 'age', 'sex', 'nationality', 'country', 'city', 'email', 'whatsapp']
    },
    {
      title: 'Lifestyle History',
      icon: <Scale className="text-teal\" size={24} />,
      fields: ['weight', 'height', 'sleepHours', 'sleepQuality', 'sleepPattern', 'smoking', 'alcohol']
    },
    {
      title: 'Medical History',
      icon: <FileText className="text-teal\" size={24} />,
      fields: ['presentingComplaint', 'pastIllnesses', 'surgeries', 'medications', 'allergies', 'familyHistory', 'emotionalState']
    },
    {
      title: 'Digestive Health',
      icon: <Heart className="text-teal\" size={24} />,
      fields: ['acidity', 'bloating', 'bowelFrequency', 'stoolConsistency', 'constipation', 'tongueCoating']
    },
    {
      title: 'Diet History',
      icon: <Utensils className="text-teal\" size={24} />,
      fields: ['dietType', 'foodAllergies', 'mealTimings', 'snackingHabits']
    },
    {
      title: 'Treatment Goals',
      icon: <Calendar className="text-teal\" size={24} />,
      fields: ['treatmentGoal']
    },
    showPregnancySection && {
      title: 'Pregnancy Details',
      icon: <Baby className="text-pink\" size={24} />,
      fields: ['dueDate', 'pregnancyWeeks', 'conceptionMethod', 'pregnancyHistory']
    },
    showPostNatalSection && {
      title: 'Post-Natal Details',
      icon: <Baby className="text-pink\" size={24} />,
      fields: ['deliveryType', 'healingStatus', 'deliveryDate', 'nicuStatus']
    }
  ].filter(Boolean);

  const handleInputChange = (field: keyof FormData, value: any) => {
    // Capitalize words for name, city, nationality, and country fields
    if (['name', 'city', 'nationality', 'country'].includes(field)) {
      value = value.split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }

    if (field === 'dateOfBirth') {
      const age = calculateAge(value);
      setFormData(prev => ({ 
        ...prev, 
        [field]: value,
        age: age
      }));
      return;
    }

    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const errors = validateSection(sections[currentSection].fields);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Validate all sections before submitting
      let hasErrors = false;
      sections.forEach((section) => {
        const sectionErrors = validateSection(section.fields);
        if (Object.keys(sectionErrors).length > 0) {
          hasErrors = true;
          setFormErrors(prev => ({ ...prev, ...sectionErrors }));
        }
      });

      if (hasErrors) {
        throw new Error('Please fill in all required fields');
      }

      // Save form data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem('medicalHistory', JSON.stringify(formData));
      navigate('/medical');
    } catch (error) {
      setFormErrors(prev => ({
        ...prev,
        submit: (error as Error).message
      }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: keyof FormData) => {
    switch (field) {
      case 'presentingComplaint':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-charcoal-dark">
              What Brings You Here Today?*
            </label>
            <textarea
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
              placeholder="E.g., Digestive issues, Sleep problems, Stress and anxiety, Joint pain, etc. Please describe your symptoms and how long you've been experiencing them."
              required
            />
          </div>
        );

      case 'pastIllnesses':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-charcoal-dark">
              Past Medical History*
            </label>
            <textarea
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
              placeholder="List any previous illnesses, hospitalizations, or significant health events. Include approximate dates if known."
              required
            />
          </div>
        );

      case 'familyHistory':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-charcoal-dark">
              Family Medical History*
            </label>
            <textarea
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
              placeholder="E.g., Diabetes in parents, Heart disease in grandparents, etc. Include any hereditary conditions or significant family health patterns."
              required
            />
          </div>
        );

      case 'emotionalState':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-charcoal-dark">
              Emotional Well-Being*
            </label>
            <textarea
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
              placeholder="Describe your current emotional state, stress levels, and any significant life changes or challenges affecting your well-being."
              required
            />
          </div>
        );

      case 'treatmentGoal':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-charcoal-dark">
              What Are Your Health Goals?*
            </label>
            <textarea
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
              placeholder="What do you hope to achieve through this treatment? E.g., Better sleep, Digestive health, Stress management, Weight management, etc."
              required
            />
          </div>
        );

      case 'nationality':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-charcoal-dark">
              Nationality*
            </label>
            <input
              type="text"
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              placeholder="E.g., Indian, American, etc."
              required
            />
          </div>
        );

      case 'dietType':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-charcoal-dark">
              Diet Type*
            </label>
            <input
              type="text"
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              placeholder="E.g., Vegetarian, Vegan, Non-vegetarian, etc."
              required
            />
          </div>
        );

      case 'mealTimings':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-charcoal-dark">
              Usual Meal Timings*
            </label>
            <input
              type="text"
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              placeholder="E.g., Breakfast 8 AM, Lunch 1 PM, Dinner 7 PM"
              required
            />
          </div>
        );

      case 'snackingHabits':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-charcoal-dark">
              Snacking Habits*
            </label>
            <input
              type="text"
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              placeholder="Describe your typical snacks and timing between meals"
              required
            />
          </div>
        );

      case 'sex':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-charcoal-dark">Sex*</label>
            <div className="flex space-x-4">
              {['male', 'female', 'other'].map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleInputChange('sex', option)}
                  className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                    formData.sex === option
                      ? 'border-teal bg-teal-light/10 text-teal'
                      : 'border-gray-200 text-charcoal-light hover:border-teal-light'
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>
        );

      case 'smoking':
      case 'alcohol':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-charcoal-dark">
              {field.charAt(0).toUpperCase() + field.slice(1)}*
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['never', 'occasional', 'regular', 'former'].map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleInputChange(field, option)}
                  className={`py-2 px-4 rounded-lg border-2 transition-colors ${
                    formData[field] === option
                      ? 'border-teal bg-teal-light/10 text-teal'
                      : 'border-gray-200 text-charcoal-light hover:border-teal-light'
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>
        );

      case 'acidity':
      case 'bloating':
      case 'constipation':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-charcoal-dark">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleInputChange(field, true)}
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                  formData[field]
                    ? 'border-teal bg-teal-light/10 text-teal'
                    : 'border-gray-200 text-charcoal-light hover:border-teal-light'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleInputChange(field, false)}
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                  !formData[field]
                    ? 'border-teal bg-teal-light/10 text-teal'
                    : 'border-gray-200 text-charcoal-light hover:border-teal-light'
                }`}
              >
                No
              </button>
            </div>
          </div>
        );

      // case 'presentingComplaint':
      // case 'pastIllnesses':
      // case 'familyHistory':
      // case 'emotionalState':
      // case 'treatmentGoal':
      //   return (
      //     <div className="space-y-2">
      //       <label className="block text-sm font-medium text-charcoal-dark">
      //         {field.split(/(?=[A-Z])/).join(' ')}*
      //       </label>
      //       <textarea
      //         value={formData[field]}
      //         onChange={(e) => handleInputChange(field, e.target.value)}
      //         className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
      //         required
      //       />
      //     </div>
      //   );

      case 'whatsapp':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-charcoal-dark">
              WhatsApp Number*
            </label>
            <div className="flex space-x-2">
              <select
                value={selectedCountryCode}
                onChange={(e) => setSelectedCountryCode(e.target.value)}
                className="input-field w-32"
              >
                {countryCodes.map(({ code, country }) => (
                  <option key={code} value={code}>
                    {code} ({country})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                value={formData[field]}
                onChange={(e) => {
                  // Only allow numbers
                  const value = e.target.value.replace(/\D/g, '');
                  handleInputChange(field, value);
                }}
                className="input-field flex-1"
                placeholder="Enter WhatsApp number"
                maxLength={10}
                required
              />
            </div>
            <p className="text-xs text-charcoal-light mt-1">
              Enter your number without country code (e.g., 9876543210)
            </p>
          </div>
        );

      default:
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-charcoal-dark">
              {field.split(/(?=[A-Z])/).join(' ')}*
            </label>
            <input
              type={field === 'dateOfBirth' || field === 'lastPeriod' ? 'date' : 'text'}
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={
                field === 'weight' ? 'Enter in kg (e.g., 65)' :
                field === 'height' ? 'Enter in cm (e.g., 170)' :
                field === 'sleepHours' ? 'Average hours per night (e.g., 7-8)' :
                field === 'sleepQuality' ? 'E.g., Good, Fair, Poor, Interrupted' :
                field === 'sleepPattern' ? 'E.g., Regular, Irregular, Difficulty falling asleep' :
                field === 'bowelFrequency' ? 'Times per day' :
                field === 'stoolConsistency' ? 'E.g., Normal, Hard, Loose' :
                field === 'tongueCoating' ? 'E.g., Pink, White, Yellow' :
                ''
              }
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              required
            />
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Error message */}
        {formErrors.submit && (
          <div className="mb-6 p-4 bg-pink-light/20 text-pink rounded-lg">
            {formErrors.submit}
          </div>
        )}

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-charcoal-light mb-2">
            <span>Form Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-teal rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center mb-6">
            {sections[currentSection].icon}
            <h2 className="text-xl font-garamond font-semibold ml-3">
              {sections[currentSection].title}
            </h2>
          </div>

          <div className="space-y-6">
            {sections[currentSection].fields.map((field) => (
              <div key={field} className="space-y-4">
                {field === 'sex' ? (
                  <div className="space-y-4">
                    {renderField(field as keyof FormData)}
                    {formData.sex === 'female' && (
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={showPregnancySection}
                              onChange={(e) => setShowPregnancySection(e.target.checked)}
                              className="form-checkbox h-4 w-4 text-teal rounded border-gray-300 focus:ring-teal"
                            />
                            <span>I am pregnant</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={showPostNatalSection}
                              onChange={(e) => setShowPostNatalSection(e.target.checked)}
                              className="form-checkbox h-4 w-4 text-teal rounded border-gray-300 focus:ring-teal"
                            />
                            <span>I am in post-natal period</span>
                          </label>
                        </div>
                      </div>
                    )}
                    {formErrors[field as keyof FormData] && (
                      <p className="text-pink text-sm mt-1">
                        {formErrors[field as keyof FormData]}
                      </p>
                    )}
                  </div>
                ) : (
                  renderField(field as keyof FormData)
                )}
                {formErrors[field as keyof FormData] && (
                  <p className="text-pink text-sm mt-1">
                    {formErrors[field as keyof FormData]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={() => setCurrentSection(prev => prev - 1)}
              className="btn-secondary"
              disabled={currentSection === 0}
            >
              Previous
            </button>
            
            {currentSection === sections.length - 1 ? (
              <button
                type="button"
                onClick={handleSubmit}
                className={`btn-primary ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MedicalHistoryForm;