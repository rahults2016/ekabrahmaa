'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { LoadingLink } from '@/components/loading-link';
import { CaptchaChallenge } from '@/components/auth/captcha-challenge';
import { OAuthButtons } from '@/components/auth/oauth-buttons';
import { useAuth } from '@/hooks/use-auth';

interface SignInFormProps {
  onSuccess?: (user: any) => void;
  onSwitchToSignUp?: () => void;
  onSwitchToForgotPassword?: () => void;
}

export function SignInForm({ onSuccess, onSwitchToSignUp, onSwitchToForgotPassword }: SignInFormProps) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaData, setCaptchaData] = useState<{ id: string; answer: string } | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear error when user types
  };

  const handleRememberMeChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, rememberMe: checked }));
  };

  const handleCaptchaComplete = (id: string, answer: string) => {
    setCaptchaData({ id, answer });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const payload: any = {
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe
      };

      // Include CAPTCHA if required
      if (showCaptcha && captchaData) {
        payload.captchaId = captchaData.id;
        payload.captchaAnswer = captchaData.answer;
      }

      const result = await login(formData.email, formData.password, formData.rememberMe);

      if (!result.success) {
        setError(result.error || 'Sign in failed');
        
        // Show CAPTCHA after failed attempts
        setAttemptCount(prev => prev + 1);
        if (attemptCount >= 2) {
          setShowCaptcha(true);
        }
        return;
      }

      setSuccess('Signed in successfully! Redirecting...');
      
      // Call success callback
      if (onSuccess) {
        onSuccess(result.user);
      }

    } catch (error) {
      console.error('Sign in error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-teal-200 shadow-xl bg-white/90 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-serif text-teal-900">Welcome Back</CardTitle>
        <CardDescription className="text-teal-600">
          Sign in to continue your healing journey
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-teal-800 flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="border-teal-200 focus:border-teal-400 focus:ring-teal-400"
              required
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-teal-800 flex items-center">
              <Lock className="w-4 h-4 mr-2" />
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="border-teal-200 focus:border-teal-400 focus:ring-teal-400 pr-10"
                required
                disabled={isLoading}
                autoComplete="current-password"
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
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={handleRememberMeChange}
                disabled={isLoading}
              />
              <Label htmlFor="rememberMe" className="text-sm text-teal-700 cursor-pointer">
                Remember me
              </Label>
            </div>
            {onSwitchToForgotPassword ? (
              <button
                type="button"
                onClick={onSwitchToForgotPassword}
                className="text-sm text-teal-600 hover:text-teal-800 hover:underline"
              >
                Forgot password?
              </button>
            ) : (
              <LoadingLink
                href="/auth/forgot-password"
                className="text-sm text-teal-600 hover:text-teal-800 hover:underline"
              >
                Forgot password?
              </LoadingLink>
            )}
          </div>

          {/* CAPTCHA */}
          {showCaptcha && (
            <CaptchaChallenge
              onComplete={handleCaptchaComplete}
              onError={(error) => setError(error)}
            />
          )}

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
            disabled={isLoading || (showCaptcha && !captchaData)}
            className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </Button>

          {/* OAuth Buttons */}
          <OAuthButtons isLoading={isLoading} />

          {/* Switch to Sign Up */}
          <div className="text-center text-sm text-teal-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignUp}
              className="text-teal-700 font-medium hover:underline"
              disabled={isLoading}
            >
              Sign up
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}