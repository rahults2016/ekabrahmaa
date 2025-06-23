'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignInForm } from '@/components/auth/sign-in-form';
import { SignUpForm } from '@/components/auth/sign-up-form';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';
import { useSearchParams } from 'next/navigation';

interface AuthTabsProps {
  defaultTab?: 'signin' | 'signup';
  onSuccess?: (user: any) => void;
}

export function AuthTabs({ defaultTab = 'signin', onSuccess }: AuthTabsProps) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'forgot-password'>(defaultTab);

  useEffect(() => {
    // Check for tab parameter in URL
    const tabParam = searchParams?.get('tab');
    if (tabParam === 'signup') {
      setActiveTab('signup');
    } else if (tabParam === 'forgot-password') {
      setActiveTab('forgot-password');
    } else if (tabParam === 'signin') {
      setActiveTab('signin');
    }
  }, [searchParams]);

  const handleSwitchToSignIn = () => {
    setActiveTab('signin');
  };

  const handleSwitchToSignUp = () => {
    setActiveTab('signup');
  };

  const handleSwitchToForgotPassword = () => {
    setActiveTab('forgot-password');
  };

  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full max-w-md mx-auto">
      {activeTab !== 'forgot-password' && (
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
      )}
      
      <TabsContent value="signin" className="mt-0">
        <SignInForm 
          onSuccess={onSuccess} 
          onSwitchToSignUp={handleSwitchToSignUp} 
          onSwitchToForgotPassword={handleSwitchToForgotPassword}
        />
      </TabsContent>
      
      <TabsContent value="signup" className="mt-0">
        <SignUpForm 
          onSuccess={onSuccess} 
          onSwitchToSignIn={handleSwitchToSignIn} 
        />
      </TabsContent>
      
      <TabsContent value="forgot-password" className="mt-0">
        <ForgotPasswordForm 
          onBack={handleSwitchToSignIn} 
        />
      </TabsContent>
    </Tabs>
  );
}