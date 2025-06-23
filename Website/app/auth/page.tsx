'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LayoutWrapper } from '@/components/layout-wrapper';
import { AuthTabs } from '@/components/auth/auth-tabs';
import { Leaf } from 'lucide-react';
import { useLoading } from '@/contexts/loading-context';
import { useAuth } from '@/hooks/use-auth';

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startPageLoading } = useLoading();
  const { isAuthenticated, isLoading } = useAuth();

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

  // Get default tab from URL
  const defaultTab = searchParams?.get('tab') === 'signup' ? 'signup' : 'signin';

  if (isLoading || isAuthenticated) {
    return (
      <LayoutWrapper>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-teal-700">Loading...</p>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

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
              defaultTab={defaultTab as 'signin' | 'signup'} 
              onSuccess={handleAuthSuccess} 
            />
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}