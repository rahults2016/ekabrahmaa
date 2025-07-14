// src/components/layout/layout.tsx
import { Outlet } from 'react-router-dom';
import { Header } from '@/website/layout/Header';
import { UniversalFooter } from '@/website/layout/UniversalFooter';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Outlet /> {/* This is where route components will render */}
      </main>
      
      <UniversalFooter />
    </div>
  );
}