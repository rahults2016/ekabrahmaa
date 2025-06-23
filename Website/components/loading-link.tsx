'use client';

import Link from 'next/link';
import { useLoading } from '@/contexts/loading-context';
import { useRouter } from 'next/navigation';
import { MouseEvent, ReactNode } from 'react';

interface LoadingLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  replace?: boolean;
  scroll?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
  prefetch?: boolean;
}

export function LoadingLink({
  href,
  children,
  className,
  replace = false,
  scroll = true,
  onClick,
  target,
  rel,
  prefetch,
  ...props
}: LoadingLinkProps) {
  const { startLoading } = useLoading();
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick handler if provided
    onClick?.(e);

    // Don't trigger loading for external links or if default was prevented
    if (e.defaultPrevented || target === '_blank' || href.startsWith('http')) {
      return;
    }

    // Check if it's a different route
    const currentPath = window.location.pathname;
    const linkPath = href.split('?')[0].split('#')[0];
    
    if (linkPath !== currentPath) {
      startLoading();
    }
  };

  return (
    <Link
      href={href}
      className={className}
      replace={replace}
      scroll={scroll}
      target={target}
      rel={rel}
      prefetch={prefetch}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
}