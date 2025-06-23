'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, RefreshCw } from 'lucide-react';

interface CaptchaChallengeProps {
  onComplete: (id: string, answer: string) => void;
  onError: (error: string) => void;
  type?: 'math' | 'visual';
}

export function CaptchaChallenge({ onComplete, onError, type = 'math' }: CaptchaChallengeProps) {
  const [captchaId, setCaptchaId] = useState('');
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [captchaSvg, setCaptchaSvg] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loadCaptcha = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/auth/captcha?type=${type}`);
      
      if (!response.ok) {
        throw new Error('Failed to load CAPTCHA');
      }
      
      const data = await response.json();
      
      setCaptchaId(data.id);
      
      if (data.type === 'visual') {
        setCaptchaSvg(data.svg);
        setCaptchaQuestion('Enter the text shown in the image');
      } else {
        setCaptchaQuestion(data.question);
      }
      
      setAnswer('');
      
    } catch (error) {
      console.error('CAPTCHA loading error:', error);
      onError('Failed to load CAPTCHA verification. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCaptcha();
  }, [type]);

  const handleRefresh = () => {
    loadCaptcha();
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
    
    // Auto-submit if answer is provided
    if (e.target.value.trim()) {
      onComplete(captchaId, e.target.value.trim());
    }
  };

  return (
    <div className="space-y-3 p-4 bg-teal-50 rounded-lg border border-teal-100">
      <div className="flex items-center justify-between">
        <Label htmlFor="captcha-answer" className="text-sm font-medium text-teal-800">
          Security Verification
        </Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          disabled={isLoading}
          className="h-8 w-8 p-0"
          aria-label="Refresh CAPTCHA"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-teal-600" />
        </div>
      ) : (
        <>
          {type === 'visual' && captchaSvg ? (
            <div 
              className="flex justify-center py-2"
              dangerouslySetInnerHTML={{ __html: captchaSvg }}
              aria-label="Visual CAPTCHA challenge"
            />
          ) : (
            <div className="text-sm font-medium text-teal-700 py-2">
              {captchaQuestion}
            </div>
          )}
          
          <Input
            id="captcha-answer"
            type="text"
            value={answer}
            onChange={handleAnswerChange}
            placeholder="Enter your answer"
            className="border-teal-200 focus:border-teal-400 focus:ring-teal-400"
            required
            aria-label="CAPTCHA answer"
          />
          
          <p className="text-xs text-teal-600">
            This helps us protect your account and prevent automated access.
          </p>
        </>
      )}
    </div>
  );
}