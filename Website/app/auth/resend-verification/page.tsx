'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, AlertCircle, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import { LoadingLink } from '@/components/loading-link';
import { CaptchaChallenge } from '@/components/auth/captcha-challenge';
import { LayoutWrapper } from '@/components/layout-wrapper';
import { useRouter } from 'next/navigation';

export default function ResendVerificationPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [captchaData, setCaptchaData] = useState<{ id: string; answer: string } | null>(null);

  const handleCaptchaComplete = (id: string, answer: string) => {
    setCaptchaData({ id, answer });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (!captchaData) {
      setError('Please complete the CAPTCHA verification');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          captchaId: captchaData.id,
          captchaAnswer: captchaData.answer
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to process your request');
        return;
      }

      setSuccess(data.message || 'Verification email sent successfully! Please check your inbox.');
      setEmail(''); // Clear form after success

    } catch (error) {
      console.error('Resend verification error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <Card className="w-full max-w-md mx-auto border-teal-200 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif text-teal-900">Resend Verification Email</CardTitle>
              <CardDescription className="text-teal-600">
                Enter your email to receive a new verification link
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
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="border-teal-200 focus:border-teal-400 focus:ring-teal-400"
                    required
                    disabled={isLoading}
                    autoComplete="email"
                  />
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
                  disabled={isLoading || !email || !captchaData}
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Verification Email'
                  )}
                </Button>

                {/* Back to Sign In */}
                <div className="text-center">
                  <LoadingLink
                    href="/auth/login"
                    className="inline-flex items-center text-sm text-teal-600 hover:text-teal-800 hover:underline"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Sign In
                  </LoadingLink>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </LayoutWrapper>
  );
}