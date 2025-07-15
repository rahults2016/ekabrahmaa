import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import Header from './Header';

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/app':
        return 'Dashboard';
      case '/programs':
        return 'My Programs';
      case '/tracker':
        return 'Tracker';
      case '/journal':
        return 'Journal';
      case '/appointments':
        return 'Appointments';
      case '/chat':
        return 'Chat with Healer';
      default:
        return 'ekaBrahmaa';
    }
  };
  
  return (
    <div className="flex h-screen bg-ivory-light">
      {/* Sidebar for tablet and desktop */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getPageTitle()} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
          <Outlet />
        </main>
        
        {/* Bottom navigation for mobile */}
        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;