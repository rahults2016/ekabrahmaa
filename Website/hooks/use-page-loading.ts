'use client';

import { useEffect } from 'react';
import { useLoading } from '@/contexts/loading-context';

/**
 * Hook to automatically trigger loading state during async operations
 */
export function usePageLoading() {
  const { startLoading, stopLoading, isLoading } = useLoading();

  /**
   * Wrap an async operation with loading state
   */
  const withLoading = async <T>(operation: () => Promise<T>): Promise<T> => {
    try {
      startLoading();
      const result = await operation();
      return result;
    } catch (error) {
      throw error;
    } finally {
      stopLoading();
    }
  };

  /**
   * Start loading manually
   */
  const startPageLoading = () => {
    startLoading();
  };

  /**
   * Stop loading manually
   */
  const stopPageLoading = () => {
    stopLoading();
  };

  return {
    isLoading,
    startPageLoading,
    stopPageLoading,
    withLoading,
  };
}

/**
 * Hook to show loading during component mount/data fetching
 */
export function useAsyncLoading(asyncOperation: () => Promise<void>, dependencies: any[] = []) {
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const executeAsync = async () => {
      try {
        startLoading();
        await asyncOperation();
      } catch (error) {
        console.error('Async loading error:', error);
      } finally {
        stopLoading();
      }
    };

    executeAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}