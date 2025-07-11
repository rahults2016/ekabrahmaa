import React from 'react';
import { createBrowserRouter, RouterProvider, Routes, Route, Navigate, createRoutesFromElements } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import { NotificationProvider } from './components/contexts/NotificationContext';
import { AuthProvider } from './components/contexts/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import Dashboard from './pages/dashboard'; // Import the Dashboard component
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';

const AppContent: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
        {/* Set Dashboard as the index route */}
        <Route index element={<Dashboard />} />
        
        {/* Add other routes here as needed */}
        {/* <Route path="programs" element={<Programs />} /> */}
        {/* <Route path="tracker" element={<Tracker />} /> */}
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  ),
);

function App() {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <AuthProvider>
          <NotificationProvider>
            <AppContent />
          </NotificationProvider>
        </AuthProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default App;