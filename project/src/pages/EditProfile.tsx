import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/common/Toast';
import ConfirmationDialog from '../components/common/ConfirmationDialog';
import { 
  User, Mail, Phone, Calendar, MapPin, Camera, Save, 
  ArrowLeft, Trash2, Loader, 
  AlertTriangle
} from 'lucide-react';

interface FormData {
  name: string;
  bio: string;
  email: string;
  phone: string;
  whatsapp: string;
  dateOfBirth: string;
  age: string;
  address: string;
  city: string;
  gender: 'male' | 'female';
  avatar?: string;
}

interface FormErrors {
  [key: string]: string;
}

const EditProfile: React.FC = () => {
  const { user, updateProfile, removeDoshaResult, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toasts, removeToast, success, error, warning } = useToast();
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(
    user?.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
  );
  const [formData, setFormData] = useState<FormData>({
    name: user?.name || '',
    bio: user?.bio || '',
    email: user?.email || '',
    phone: user?.phone || '',
    whatsapp: user?.whatsapp || '',
    dateOfBirth: user?.dateOfBirth || '',
    age: user?.age || '',
    address: user?.address || '',
    city: user?.city || '',
    gender: user?.gender || 'female',
    avatar: user?.avatar || ''
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showDoshaDialog, setShowDoshaDialog] = useState(false);
  const [saveAttempted, setSaveAttempted] = useState(false);

  // Calculate age from date of birth
  const calculateAge = (dob: string): string => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age.toString();
  };

  // Form validation
  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (formData.whatsapp && !/^\+?[\d\s\-\(\)]+$/.test(formData.whatsapp)) {
      errors.whatsapp = 'Please enter a valid WhatsApp number';
    }

    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      if (birthDate > today) {
        errors.dateOfBirth = 'Birth date cannot be in the future';
      }
    }

    return errors;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    // Auto-calculate age when date of birth changes
    if (field === 'dateOfBirth') {
      const age = calculateAge(value);
      setFormData(prev => ({ 
        ...prev, 
        [field]: value,
        age: age
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }

    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        error('Invalid File', 'Please select a valid image file');
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        error('File Too Large', 'Please select an image smaller than 5MB');
        return;
      }

      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveAttempted(true);

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      error('Validation Error', 'Please fix the errors below');
      return;
    }

    try {
      // In a real app, you would upload the image first and get a URL
      const profileData = { ...formData };
      if (selectedImage) {
        // Simulate image upload - in production, upload to your storage service
        profileData.avatar = previewUrl;
      }

      await updateProfile(profileData);
      success('Profile Updated', 'Your profile has been saved successfully');
      
      // Navigate back after a short delay
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      error('Update Failed', errorMessage);
    }
  };

  const handleRemoveDoshaResult = async () => {
    try {
      await removeDoshaResult();
      success('Dosha Result Removed', 'Your dosha information has been removed from your profile');
      setShowDoshaDialog(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove dosha result';
      error('Removal Failed', errorMessage);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/profile')}
            className="p-2 rounded-full hover:bg-gray-100 text-charcoal transition-colors mr-4"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-garamond font-semibold text-charcoal-dark">
              Edit Profile
            </h1>
            <p className="text-charcoal-light">
              Update your personal information and preferences
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture Section */}
          <div className="lg:col-span-1">
            <div className="card sticky top-6">
              <h3 className="text-lg font-garamond font-semibold mb-6">
                Profile Picture
              </h3>
              
              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  <img
                    src={previewUrl}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-teal shadow-lg"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="profile-image"
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById('profile-image')?.click()}
                    className="absolute bottom-0 right-0 bg-teal text-white p-3 rounded-full shadow-lg hover:bg-teal-dark transition-colors"
                  >
                    <Camera size={20} />
                  </button>
                </div>
                
                <p className="text-sm text-charcoal-light text-center mb-4">
                  Click the camera icon to upload a new photo
                </p>
                
                <div className="text-xs text-charcoal-light text-center">
                  <p>• Maximum file size: 5MB</p>
                  <p>• Supported formats: JPG, PNG</p>
                  <p>• Recommended: Square image</p>
                </div>
              </div>

              {/* Dosha Removal Section */}
              {user?.doshaType && (
                <div className="mt-8 pt-6 border-t">
                  <h4 className="font-medium mb-3 text-charcoal-dark">
                    Legacy Data
                  </h4>
                  <div className="bg-gold-light/20 p-4 rounded-lg mb-4">
                    <div className="flex items-center mb-2">
                      <AlertTriangle size={16} className="text-gold mr-2" />
                      <span className="text-sm font-medium text-gold">
                        Dosha Result Found
                      </span>
                    </div>
                    <p className="text-sm text-charcoal-light">
                      Current result: <strong>{user.doshaType}</strong>
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDoshaDialog(true)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-pink-light/20 text-pink border border-pink-light rounded-lg hover:bg-pink-light/30 transition-colors"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Remove Dosha Result
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="card">
                <h3 className="text-lg font-garamond font-semibold mb-6">
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-charcoal-dark mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-light" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`input-field pl-10 ${formErrors.name ? 'border-pink' : ''}`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {formErrors.name && (
                      <p className="text-pink text-sm mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal-dark mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-light" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`input-field pl-10 ${formErrors.email ? 'border-pink' : ''}`}
                        placeholder="Enter your email"
                      />
                    </div>
                    {formErrors.email && (
                      <p className="text-pink text-sm mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal-dark mb-2">
                      Gender *
                    </label>
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => handleInputChange('gender', 'male')}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                          formData.gender === 'male'
                            ? 'border-teal bg-teal-light/10 text-teal'
                            : 'border-gray-200 text-charcoal-light hover:border-teal-light'
                        }`}
                      >
                        Male
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInputChange('gender', 'female')}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                          formData.gender === 'female'
                            ? 'border-teal bg-teal-light/10 text-teal'
                            : 'border-gray-200 text-charcoal-light hover:border-teal-light'
                        }`}
                      >
                        Female
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal-dark mb-2">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-light" />
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className={`input-field pl-10 ${formErrors.dateOfBirth ? 'border-pink' : ''}`}
                      />
                    </div>
                    {formErrors.dateOfBirth && (
                      <p className="text-pink text-sm mt-1">{formErrors.dateOfBirth}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal-dark mb-2">
                      Age
                    </label>
                    <input
                      type="text"
                      value={formData.age}
                      readOnly
                      className="input-field bg-gray-50 cursor-not-allowed"
                      placeholder="Auto-calculated from date of birth"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-charcoal-dark mb-2">
                      Bio
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="input-field h-24 resize-none"
                      placeholder="Tell us about yourself..."
                      maxLength={500}
                    />
                    <p className="text-xs text-charcoal-light mt-1">
                      {formData.bio.length}/500 characters
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="card">
                <h3 className="text-lg font-garamond font-semibold mb-6">
                  Contact Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-dark mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-light" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`input-field pl-10 ${formErrors.phone ? 'border-pink' : ''}`}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-pink text-sm mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal-dark mb-2">
                      WhatsApp Number
                    </label>
                    <div className="relative">
                      <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-light" />
                      <input
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                        className={`input-field pl-10 ${formErrors.whatsapp ? 'border-pink' : ''}`}
                        placeholder="Enter your WhatsApp number"
                      />
                    </div>
                    {formErrors.whatsapp && (
                      <p className="text-pink text-sm mt-1">{formErrors.whatsapp}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal-dark mb-2">
                      City
                    </label>
                    <div className="relative">
                      <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-light" />
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="input-field pl-10"
                        placeholder="Enter your city"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-charcoal-dark mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <MapPin size={20} className="absolute left-3 top-3 text-charcoal-light" />
                      <textarea
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="input-field pl-10 h-24 resize-none"
                        placeholder="Enter your full address"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate('/profile')}
                  disabled={isLoading}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className={`btn-primary ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <Loader size={16} className="mr-2 animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Dosha Removal Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showDoshaDialog}
        title="Remove Dosha Result"
        message="Are you sure you want to remove your dosha result from your profile? This action cannot be undone, and you'll need to retake the assessment if you want to restore this information."
        confirmText="Remove Result"
        cancelText="Keep Result"
        onConfirm={handleRemoveDoshaResult}
        onCancel={() => setShowDoshaDialog(false)}
        type="warning"
      />
    </div>
  );
};

export default EditProfile;