import { Layout } from '@/components/sections/homesection/layout/layout';
import { Routes, Route } from 'react-router-dom';
import { ProgramPageSection, QuizPage, QuizPage2, WhatWeHealPageSection } from './routeConfig';
import { Homepage } from '@/pages/Home';
import ProgramDetailPage from '@/pages/Home/ProgramDetailPage';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';


export function AppRoutes() {

  const { pathname } = useLocation();
  
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);



  return (
    <Routes>
      {/* Routes with Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/programs" element={<ProgramPageSection />} />
        <Route path="/programs/:programId" element={<ProgramDetailPage />} />
        <Route path="/quiz2" element={<QuizPage2 />} />
      </Route>

      {/* Standalone routes (without layout) */}
      <Route path="/what-we-heal" element={<WhatWeHealPageSection />} />
    </Routes>
  );
}
