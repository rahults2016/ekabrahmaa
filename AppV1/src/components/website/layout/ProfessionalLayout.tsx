import { Outlet } from 'react-router-dom';
import { ProfessionalHeader } from './ProfessionalHeader';
import { ProfessionalFooter } from './ProfessionalFooter';
import type { ReactNode } from 'react';

interface ProfessionalLayoutProps {
  children?: ReactNode;
}

export function ProfessionalLayout({ children }: ProfessionalLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <ProfessionalHeader />
      
      {/* Main content with proper spacing for fixed header */}
      <main className="flex-1" style={{ paddingTop: window.innerWidth >= 1200 ? '72px' : '56px' }}>
        {children || <Outlet />}
      </main>
      
      <ProfessionalFooter />
    </div>
  );
}