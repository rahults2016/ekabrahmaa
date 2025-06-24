// src/components/layout/layout.tsx


// src/components/sections/homesection/layout/layout.tsx
import { Outlet } from 'react-router-dom';
import { Navbar } from './navBar';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="app">
    <Navbar />
      
      <main className="main-content">
        <Outlet /> {/* This is where route components will render */}
      </main>
      
      <Footer />
    </div>
  );
}