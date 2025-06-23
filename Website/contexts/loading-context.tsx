'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { PageTransitionLoading } from '@/components/page-transition-loading';

interface LoadingContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  setLoadingState: (loading: boolean) => void;
  startPageLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

interface LoadingProviderProps {
  children: React.ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const setLoadingState = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const startPageLoading = useCallback(() => {
    startLoading();
  }, [startLoading]);

  // Handle route changes
  useEffect(() => {
    // Stop loading when route changes (navigation completed)
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, searchParams]);

  // Auto-stop loading after maximum time
  useEffect(() => {
    if (isLoading) {
      const maxTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(maxTimeout);
    }
  }, [isLoading]);

  const contextValue: LoadingContextType = {
    isLoading,
    startLoading,
    stopLoading,
    setLoadingState,
    startPageLoading,
  };

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
      <PageTransitionLoading 
        isLoading={isLoading} 
        onComplete={() => setIsLoading(false)}
      />
    </LoadingContext.Provider>
  );
}