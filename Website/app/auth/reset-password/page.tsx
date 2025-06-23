'use client';

import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import { LayoutWrapper } from '@/components/layout-wrapper';
import { Leaf } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/contexts/loading-context';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { startPageLoading } = useLoading();

  const handleSuccess = () => {
    startPageLoading();
    
    // Redirect to login page after successful password reset
    setTimeout(() => {
      router.push('/auth/login');
    }, 2000);
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
            <ResetPasswordForm onSuccess={handleSuccess} />
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}