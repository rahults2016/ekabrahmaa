'use client';

import { Button as BaseButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface GoodBugButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export const GoodBugButton = forwardRef<HTMLButtonElement, GoodBugButtonProps>(
  ({ variant = 'primary', size = 'md', children, className, ...props }, ref) => {
    const baseClasses = 'rounded-full font-medium transition-all duration-300 hover:scale-105';
    
    const variants = {
      primary: 'bg-neutral-800 hover:bg-neutral-700 text-cream-100 shadow-soft hover:shadow-medium',
      secondary: 'border border-neutral-300 text-neutral-700 hover:bg-cream-200 bg-transparent',
      ghost: 'text-neutral-700 hover:text-neutral-800 hover:bg-cream-200/50 bg-transparent'
    };

    const sizes = {
      sm: 'px-4 py-2 text-small',
      md: 'px-6 py-3 text-body',
      lg: 'px-8 py-4 text-body'
    };

    return (
      <BaseButton
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </BaseButton>
    );
  }
);

GoodBugButton.displayName = 'GoodBugButton';