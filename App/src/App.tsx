import React from 'react';
import { createBrowserRouter, RouterProvider, Routes, Route, Navigate, createRoutesFromElements } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Referral from './pages/Referral';
import ReferralShare from './pages/ReferralShare';
import ReferralRewards from './pages/ReferralRewards';
import Dashboard from './pages/Dashboard';
import Programs from './pages/Programs'; 
import Tracker from './pages/MoodTracker';
import Journal from './pages/Journal';
import GroupChat from './components/chat/GroupChat';
import Appointments from './pages/Appointments';
import Chat from './pages/Chat';
import Resources from './pages/Resources';
import MedicalHistory from './pages/MedicalHistory';
import Prescriptions from './pages/Prescriptions';
import Invoices from './pages/Invoices';
import PaymentHistory from './pages/PaymentHistory';
import TalkToHealer from './pages/TalkToHealer';
import HealerDirectory from './pages/HealerDirectory';
import HealerProfile from './pages/HealerProfile';
import ConsultationBooking from './pages/ConsultationBooking';
import Cart from './pages/Cart';
import ProgramOnboarding from './pages/ProgramOnboarding';
import PrakritiQuiz from './components/auth/PrakritiQuiz';
import MorningSmile from './pages/MorningSmile';
import ProtectedRoute from './components/common/ProtectedRoute';
import Settings from './pages/Settings';
import MainLayout from './components/layouts/MainLayout';
import FloatingChat from './components/chat/FloatingChat';
import ErrorBoundary from './components/common/ErrorBoundary';
import { useAuth } from './contexts/AuthContext';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <>
      {isAuthenticated && <FloatingChat />}
      <RouterProvider router={router} />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/onboarding" element={<ProtectedRoute><ProgramOnboarding /></ProtectedRoute>} />
      <Route path="/assessment" element={<ProtectedRoute><PrakritiQuiz /></ProtectedRoute>} />
      <Route path="/morning-smile" element={<ProtectedRoute><MorningSmile /></ProtectedRoute>} />
      
      <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/edit" element={<EditProfile />} />
        <Route path="referral" element={<Referral />} />
        <Route path="referral/share" element={<ReferralShare />} />
        <Route path="referral/rewards" element={<ReferralRewards />} />
        <Route path="programs" element={<Programs />} />
        <Route path="tracker" element={<Tracker />} />
        <Route path="journal" element={<Journal />} />
        <Route path="chat/group" element={<GroupChat />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="prescriptions/*" element={<Prescriptions />} />
        <Route path="medical/*" element={<MedicalHistory />} />
        <Route path="resources/*" element={<Resources />} />
        <Route path="talk-to-healer" element={<TalkToHealer />} />
        <Route path="healers" element={<HealerDirectory />} />
        <Route path="healers/:id" element={<HealerProfile />} />
        <Route path="book-consultation/:id" element={<ConsultationBooking />} />
        <Route path="chat" element={<Chat />} />
        <Route path="cart" element={<Cart />} />
        <Route path="payments/invoices" element={<Invoices />} />
        <Route path="payments/history" element={<PaymentHistory />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/\" replace />} />
    </>
  ),
  {
    future: {
      v7_startTransition: true
    }
  }
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