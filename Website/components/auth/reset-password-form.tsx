'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  AlertCircle, 
  CheckCircle, 
  Loader2,
  Check,
  X
} from 'lucide-react';
import { LoadingLink } from '@/components/loading-link';
import { CaptchaChallenge } from '@/components/auth/captcha-challenge';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

interface ResetPasswordFormProps {
  onSuccess?: () => void;
}

interface PasswordStrength {
  score: number;
  feedback: string[];
  isValid: boolean;
}

export function ResetPasswordForm({ onSuccess }: ResetPasswordFormProps) {
  const { resetPassword } = useAuth();
  const searchParams = useSearchParams();
  const [token, setToken] = useState('');
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    feedback: [],
    isValid: false
  });
  const [captchaData, setCaptchaData] = useState<{ id: string; answer: string } | null>(null);

  useEffect(() => {
    const tokenFromUrl = searchParams?.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [searchParams]);

  const validatePassword = (password: string): PasswordStrength => {
    const feedback: string[] = [];
    let score = 0;

    if (password.length >= 8) {
      score += 20;
    } else {
      feedback.push('At least 8 characters');
    }

    if (/(?=.*[a-z])/.test(password)) {
      score += 20;
    } else {
      feedback.push('One lowercase letter');
    }

    if (/(?=.*[A-Z])/.test(password)) {
      score += 20;
    } else {
      feedback.push('One uppercase letter');
    }

    if (/(?=.*\d)/.test(password)) {
      score += 20;
    } else {
      feedback.push('One number');
    }

    if (/(?=.*[@$!%*?&])/.test(password)) {
      score += 20;
    } else {
      feedback.push('One special character (@$!%*?&)');
    }

    return {
      score,
      feedback,
      isValid: score === 100
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear error when user types

    // Validate password strength in real-time
    if (name === 'password') {
      setPasswordStrength(validatePassword(value));
    }
  };

  const handleCaptchaComplete = (id: string, answer: string) => {
    setCaptchaData({ id, answer });
  };

  const getPasswordStrengthColor = (score: number) => {
    if (score < 40) return 'bg-red-500';
    if (score < 60) return 'bg-orange-500';
    if (score < 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = (score: number) => {
    if (score < 40) return 'Weak';
    if (score < 60) return 'Fair';
    if (score < 80) return 'Good';
    return 'Strong';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (!token) {
      setError('Reset token is missing. Please use the link from your email.');
      setIsLoading(false);
      return;
    }

    if (!passwordStrength.isValid) {
      setError('Please ensure your password meets all requirements');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!captchaData) {
      setError('Please complete the CAPTCHA verification');
      setIsLoading(false);
      return;
    }

    try {
      const result = await resetPassword(token, formData.password, formData.confirmPassword);

      if (!result.success) {
        setError(result.error || 'Password reset failed');
        return;
      }

      setSuccess(result.message || 'Password reset successfully! You can now sign in with your new password.');
      setFormData({ password: '', confirmPassword: '' });
      
      // Call success callback
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }

    } catch (error) {
      console.error('Password reset error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-teal-200 shadow-xl bg-white/90 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-serif text-teal-900">Reset Password</CardTitle>
        <CardDescription className="text-teal-600">
          Create a new password for your account
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-teal-800 flex items-center">
              <Lock className="w-4 h-4 mr-2" />
              New Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a strong password"
                className="border-teal-200 focus:border-teal-400 focus:ring-teal-400 pr-10"
                required
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-600 hover:text-teal-800"
                disabled={isLoading}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="space-y-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-teal-700">
                    Password Strength: {getPasswordStrengthText(passwordStrength.score)}
                  </span>
                  <span className="text-xs font-medium" style={{ color: passwordStrength.score === 100 ? '#10b981' : '#f59e0b' }}>
                    {passwordStrength.score}%
                  </span>
                </div>
                <Progress 
                  value={passwordStrength.score} 
                  className="h-1.5" 
                />
                
                {/* Password Requirements */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {[
                    { test: /.{8,}/, label: 'At least 8 characters' },
                    { test: /(?=.*[a-z])/, label: 'One lowercase letter' },
                    { test: /(?=.*[A-Z])/, label: 'One uppercase letter' },
                    { test: /(?=.*\d)/, label: 'One number' },
                    { test: /(?=.*[@$!%*?&])/, label: 'One special character' }
                  ].map((req, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      {req.test.test(formData.password) ? (
                        <Check className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-red-500" />
                      )}
                      <span className="text-xs text-gray-600">{req.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-teal-800 flex items-center">
              <Lock className="w-4 h-4 mr-2" />
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your new password"
                className="border-teal-200 focus:border-teal-400 focus:ring-teal-400 pr-10"
                required
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-600 hover:text-teal-800"
                disabled={isLoading}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            {/* Password Match Indicator */}
            {formData.password && formData.confirmPassword && (
              <div className="flex items-center space-x-2 mt-1">
                {formData.password === formData.confirmPassword ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-xs text-green-600">Passwords match</span>
                  </>
                ) : (
                  <>
                    <X className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-xs text-red-600">Passwords don't match</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* CAPTCHA */}
          <CaptchaChallenge
            onComplete={handleCaptchaComplete}
            onError={(error) => setError(error)}
          />

          {/* Error Message */}
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Success Message */}
          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                {success}
              </AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || !captchaData}
            className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Resetting Password...
              </>
            ) : (
              'Reset Password'
            )}
          </Button>

          {/* Back to Sign In */}
          <div className="text-center text-sm text-teal-600">
            Remember your password?{' '}
            <LoadingLink
              href="/auth/login"
              className="text-teal-700 font-medium hover:underline"
            >
              Sign in
            </LoadingLink>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}