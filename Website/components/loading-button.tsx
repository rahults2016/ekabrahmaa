'use client';

import { Button } from '@/components/ui/button';
import { useLoading } from '@/contexts/loading-context';
import { useRouter } from 'next/navigation';
import { ReactNode, MouseEvent } from 'react';

interface LoadingButtonProps {
  href?: string;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  replace?: boolean;
  loadingText?: string;
}

export function LoadingButton({
  href,
  children,
  onClick,
  className,
  variant = 'default',
  size = 'default',
  disabled = false,
  type = 'button',
  replace = false,
  loadingText,
  ...props
}: LoadingButtonProps) {
  const { startLoading, isLoading } = useLoading();
  const router = useRouter();

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      // Execute custom onClick handler if provided
      if (onClick) {
        startLoading();
        await onClick(e);
      }

      // Handle navigation if href is provided and not prevented
      if (href && !e.defaultPrevented) {
        const currentPath = window.location.pathname;
        const targetPath = href.split('?')[0].split('#')[0];
        
        if (targetPath !== currentPath) {
          startLoading();
          if (replace) {
            router.replace(href);
          } else {
            router.push(href);
          }
        }
      }
    } catch (error) {
      console.error('LoadingButton error:', error);
      // Loading will auto-stop due to timeout or context logic
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={className}
      variant={variant}
      size={size}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {isLoading && loadingText ? loadingText : children}
    </Button>
  );
}