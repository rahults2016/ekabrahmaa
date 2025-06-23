'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';
import { useAuth } from '@/hooks/use-auth';
import { 
  User, 
  LogOut, 
  ChevronDown, 
  Settings, 
  HelpCircle, 
  UserCircle 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoadingLink } from '@/components/loading-link';
import { LoadingButton } from '@/components/loading-button';

export function AuthButtons() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin');

  const handleSignInClick = () => {
    setAuthModalTab('signin');
    setIsAuthModalOpen(true);
  };

  const handleSignUpClick = () => {
    setAuthModalTab('signup');
    setIsAuthModalOpen(true);
  };

  const handleLogout = async () => {
    await logout();
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          className="border-teal-200 text-teal-700 hover:bg-teal-50 opacity-50"
          disabled
        >
          <div className="w-4 h-4 rounded-full border-2 border-teal-600 border-t-transparent animate-spin mr-2"></div>
          Loading...
        </Button>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="border-teal-200 text-teal-700 hover:bg-teal-50 hover:scale-105 transition-all duration-300"
            >
              <UserCircle className="w-4 h-4 mr-2" />
              {user.name.split(' ')[0]}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <LoadingLink href="/profile">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </LoadingLink>
              <LoadingLink href="/settings">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </LoadingLink>
              <LoadingLink href="/help">
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
              </LoadingLink>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <LoadingButton
          href="/dashboard"
          className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Dashboard
        </LoadingButton>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          className="hidden sm:flex border-teal-200 text-teal-700 hover:bg-teal-50 hover:scale-105 transition-all duration-300"
          onClick={handleSignInClick}
        >
          Sign In
        </Button>
        <Button 
          className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          onClick={handleSignUpClick}
        >
          Get Started
        </Button>
      </div>

      <AuthModal 
        open={isAuthModalOpen} 
        defaultTab={authModalTab}
        onOpenChange={setIsAuthModalOpen}
      />
    </>
  );
}