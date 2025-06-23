'use client';

import { useEffect, useState } from 'react';
import { SereneLoading } from '@/components/serene-loading';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SereneLoading />;
  }

  return <>{children}</>;
}