'use client';

import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AuthTabs } from '@/components/auth/auth-tabs';
import { X } from 'lucide-react';

interface AuthModalProps {
  trigger?: React.ReactNode;
  defaultOpen?: boolean;
  defaultTab?: 'signin' | 'signup';
  onOpenChange?: (open: boolean) => void;
  onSuccess?: (user: any) => void;
}

export function AuthModal({ 
  trigger, 
  defaultOpen = false, 
  defaultTab = 'signin',
  onOpenChange,
  onSuccess
}: AuthModalProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (onOpenChange) {
      onOpenChange(open);
    }
  };

  const handleSuccess = (user: any) => {
    if (onSuccess) {
      onSuccess(user);
    }
    // Close modal after successful authentication
    setTimeout(() => {
      setIsOpen(false);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl">
        <DialogHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0"
            onClick={() => handleOpenChange(false)}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <AuthTabs defaultTab={defaultTab} onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}