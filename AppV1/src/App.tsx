// src/App.tsx
import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useRoutesConfig } from '@/router/routesConfig';
import { Loading } from '@/common/Loading';
import MainLayout from '@/components/layouts/MainLayout';

const App = () => {
  const { structuredRoutes, standaloneRoutes } = useRoutesConfig();

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Structured routes with MainLayout */}
          <Route element={<MainLayout />}>
            {structuredRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>

          {/* Standalone routes with MainLayout */}
          <Route element={<MainLayout />}>
            {standaloneRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;