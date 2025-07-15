// src/App.tsx
import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useRoutesConfig } from '@/router/routesConfig';
import MainLayout from '@/components/dashboard/layouts/MainLayout';
import { useEffect } from 'react';
import { Loading } from './components/dashboard/common/Loading';
import { ResponsiveLayout } from './components/website/layout/ResponsiveLayout';
import { ProfessionalLayout } from './components/website/layout/ProfessionalLayout';
// import AuthGuard from './common/AuthGuard';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const { websiteRoutes, dashboardRoutes } = useRoutesConfig();

  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Website Routes with Responsive Layout */}
          <Route element={<ResponsiveLayout />}>
            {websiteRoutes
              .filter(route => !['/demo/professional'].includes(route.path))
              .map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
          </Route>

          {/* Demo route with professional layout */}
          <Route 
            path="/demo/professional" 
            element={
              <ProfessionalLayout>
                {websiteRoutes.find(r => r.path === '/demo/professional')?.element}
              </ProfessionalLayout>
            } 
          />

          {/* Dashboard Routes with MainLayout */}
          {/* <Route element={<AuthGuard><MainLayout /></AuthGuard>}> */}
          <Route element={<MainLayout />}>

            {dashboardRoutes.map((route) => {
              // Remove the '/app' prefix for nested routes
              const path = route.path.replace('/', '');
              
              return (
                <Route
                  key={route.path}
                  path={path}
                  element={route.element}
                >
                  {route.children?.map((childRoute) => (
                    <Route
                      key={childRoute.path}
                      path={childRoute.path}
                      element={childRoute.element}
                    />
                  ))}
                </Route>
              );
            })}
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;