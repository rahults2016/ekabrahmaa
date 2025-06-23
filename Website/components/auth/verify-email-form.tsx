'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Loader2, Mail } from 'lucide-react';
import { LoadingLink } from '@/components/loading-link';
import { useSearchParams } from 'next/navigation';

interface VerifyEmailFormProps {
  onSuccess?: () => void;
}

export function VerifyEmailForm({ onSuccess }: VerifyEmailFormProps) {
  const searchParams = useSearchParams();
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const tokenFromUrl = searchParams?.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      verifyEmail(tokenFromUrl);
    }
  }, [searchParams]);

  const verifyEmail = async (verificationToken: string) => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: verificationToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Email verification failed');
        return;
      }

      setSuccess(data.message || 'Email verified successfully! You can now sign in to your account.');
      setIsVerified(true);
      
      // Call success callback
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }

    } catch (error) {
      console.error('Email verification error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-teal-200 shadow-xl bg-white/90 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-teal-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Mail className="w-8 h-8 text-teal-600" />
        </div>
        <CardTitle className="text-2xl font-serif text-teal-900">Email Verification</CardTitle>
        <CardDescription className="text-teal-600">
          {isVerified 
            ? 'Your email has been successfully verified'
            : 'Verifying your email address...'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-4">
            <Loader2 className="h-8 w-8 animate-spin text-teal-600 mb-4" />
            <p className="text-teal-700">Verifying your email address...</p>
          </div>
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

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          {isVerified ? (
            <LoadingLink href="/auth/login">
              <Button 
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Sign In to Your Account
              </Button>
            </LoadingLink>
          ) : error ? (
            <div className="space-y-3">
              <p className="text-sm text-teal-700 text-center">
                If your verification link has expired or is invalid, you can request a new one.
              </p>
              <LoadingLink href="/auth/resend-verification">
                <Button 
                  variant="outline"
                  className="w-full border-teal-200 text-teal-700 hover:bg-teal-50 py-3 rounded-full"
                >
                  Request New Verification Link
                </Button>
              </LoadingLink>
            </div>
          ) : null}
          
          <LoadingLink href="/" className="text-center text-sm text-teal-600 hover:text-teal-800 hover:underline">
            Return to Homepage
          </LoadingLink>
        </div>
      </CardContent>
    </Card>
  );
}