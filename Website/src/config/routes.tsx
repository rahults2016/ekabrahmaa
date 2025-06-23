// src/routes.jsx or src/config/routes.tsx
import { Layout } from '@/components/layout/layout';
import { ModernHeroSection } from '@/pages/Home';
import { Routes, Route } from 'react-router-dom';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ModernHeroSection />} />
      </Route>
    </Routes>
  );
}