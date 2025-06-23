// src/components/layout/layout.tsx
import { Footer } from "./Footer";
import { Navbar } from "./navBar";
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* This will render the matched child route */}
      </main>
      <Footer />
    </div>
  );
}