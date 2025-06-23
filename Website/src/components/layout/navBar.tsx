// src/components/navbar.tsx
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-teal-100 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <LogoLink />
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/what-we-heal">What We Heal</NavLink>
            <NavLink to="/programs">Programs</NavLink>
            <NavLink to="/stories">Healing Stories</NavLink>
          </div>
          
          {/* Auth Buttons */}
          <AuthButtons />
        </div>
      </div>
    </nav>
  );
}

// Sub-components for better organization
function LogoLink() {
  return (
    <Link 
      to="/" 
      className="flex items-center space-x-2 group"
    >
      <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-pink-400 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
        <Leaf className="w-5 h-5 text-white" />
      </div>
      <span className="text-2xl font-serif font-bold text-teal-800 group-hover:text-teal-900 transition-colors">
        ekaBrahmaa
      </span>
    </Link>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link 
      to={to}
      className="text-teal-700 hover:text-teal-900 transition-all duration-300 hover:scale-105 text-sm font-medium"
    >
      {children}
    </Link>
  );
}

function AuthButtons() {
  return (
    <div className="flex items-center space-x-4">
      <Button 
        variant="outline" 
        className="hidden sm:flex border-teal-200 text-teal-700 hover:bg-teal-50 hover:scale-105 transition-all duration-300 text-sm"
      >
        Sign In
      </Button>
      <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm">
        Get Started
      </Button>
    </div>
  );
}