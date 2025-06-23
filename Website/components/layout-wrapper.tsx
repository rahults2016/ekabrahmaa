'use client';

import { ModernHeader } from '@/components/modern-header';
import { ModernFooter } from '@/components/modern-footer';
import { ReactNode } from 'react';

interface LayoutWrapperProps {
  children: ReactNode;
  className?: string;
}

export function LayoutWrapper({ children, className = '' }: LayoutWrapperProps) {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <ModernHeader />
      <main className="flex-1 pt-20" role="main">
        {children}
      </main>
      <ModernFooter />
    </div>
  );
}