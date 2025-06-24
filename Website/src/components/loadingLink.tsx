import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { type MouseEvent, type ReactNode } from 'react';

interface LoadingLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  replace?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
}

export function LoadingLink({
  to,
  children,
  className,
  replace = false,
  onClick,
  target,
  rel,
  ...props
}: LoadingLinkProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick handler if provided
    onClick?.(e);

    // Don't trigger loading for external links or if default was prevented
    if (e.defaultPrevented || target === '_blank' || to.startsWith('http')) {
      return;
    }

    // Check if it's a different route
    const currentPath = window.location.pathname;
    const linkPath = to.split('?')[0].split('#')[0];

    if (linkPath !== currentPath) {
      e.preventDefault(); // Prevent the default navigation
      setIsLoading(true); // Set loading state to true

      // Simulate loading delay
      setTimeout(() => {
        navigate(to, { replace });
        setIsLoading(false); // Reset loading state after navigation
      }, 1000); // Simulate a 1-second loading delay
    }
  };

  return (
    <>
      <Link
        to={to}
        className={className}
        replace={replace}
        onClick={handleClick}
        target={target}
        rel={rel}
        {...props}
      >
        {children}
      </Link>
      {isLoading && (
        <div className="loading-indicator">
          Loading...
        </div>
      )}
    </>
  );
}
