'use client';

import { useState, useEffect } from 'react';
import { AuthTabs } from '@/components/auth/auth-tabs';
import { LayoutWrapper } from '@/components/layout-wrapper';
import { Leaf } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLoading } from '@/contexts/loading-context';
import { useAuth } from '@/hooks/use-auth';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startPageLoading } = useLoading();
  const { isAuthenticated, isLoading } = useAuth();
  const [defaultTab, setDefaultTab] = useState<'signin' | 'signup'>('signin');

  useEffect(() => {
    const tab = searchParams?.get('tab');
    if (tab === 'signup') {
      setDefaultTab('signup');
    }
  }, [searchParams]);

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const redirectTo = searchParams?.get('redirect') || '/dashboard';
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, searchParams]);

  const handleAuthSuccess = (user: any) => {
    startPageLoading();
    
    // Redirect to dashboard or intended page
    const redirectTo = searchParams?.get('redirect') || '/dashboard';
    setTimeout(() => {
      router.push(redirectTo);
    }, 1500);
  };

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
              <Leaf className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="max-w-md mx-auto">
            <AuthTabs 
              defaultTab={defaultTab} 
              onSuccess={handleAuthSuccess} 
            />
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}