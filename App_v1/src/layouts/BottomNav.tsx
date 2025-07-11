import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Smile, BookOpenText, ShoppingCart } from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive }) => (
  <Link
    to={to}
    className={`flex flex-col items-center justify-center space-y-1 ${
      isActive ? 'text-teal' : 'text-charcoal-light'
    }`}
  >
    {icon}
    <span className="text-xs font-medium">{label}</span>
  </Link>
);

const BottomNav: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4">
      <div className="flex justify-around items-center">
        <NavItem
          to="/"
          icon={<Home size={20} />}
          label="Home"
          isActive={location.pathname === '/'}
        />
        <NavItem
          to="/appointments"
          icon={<Calendar size={20} />}
          label="Calendar"
          isActive={location.pathname === '/appointments'}
        />
        <NavItem
          to="/tracker"
          icon={<Smile size={20} />}
          label="Tracker"
          isActive={location.pathname === '/tracker'}
        />
        <NavItem
          to="/journal"
          icon={<BookOpenText size={20} />}
          label="Journal"
          isActive={location.pathname === '/journal'}
        />
        <NavItem
          to="/cart"
          icon={<ShoppingCart size={20} />}
          label="Cart"
          isActive={location.pathname === '/cart'}
        />
      </div>
    </div>
  );
};

export default BottomNav;