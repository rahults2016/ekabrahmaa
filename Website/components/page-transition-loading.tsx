'use client';

import { useEffect, useState, useCallback } from 'react';
import { Sparkles, Leaf } from 'lucide-react';

interface PageTransitionLoadingProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export function PageTransitionLoading({ isLoading, onComplete }: PageTransitionLoadingProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const completeLoading = useCallback(() => {
    setProgress(100);
    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 300);
  }, [onComplete]);

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
      setProgress(0);
      
      // Simulate loading progress
      let lastTimestamp: number;
      let progressInterval: number;
      
      const updateProgress = (timestamp: number) => {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const elapsed = timestamp - lastTimestamp;
        
        if (elapsed > 100) { // Update every 100ms
          lastTimestamp = timestamp;
          setProgress(prev => {
            if (prev >= 90) {
              return 90; // Keep at 90% until actual completion
            }
            return prev + Math.random() * 15;
          });
        }
        
        if (isVisible && progress < 90) {
          progressInterval = requestAnimationFrame(updateProgress);
        }
      };
      
      progressInterval = requestAnimationFrame(updateProgress);

      // Maximum loading time of 3 seconds
      const maxTimeout = setTimeout(() => {
        cancelAnimationFrame(progressInterval);
        completeLoading();
      }, 3000);

      return () => {
        cancelAnimationFrame(progressInterval);
        clearTimeout(maxTimeout);
      };
    } else {
      // Complete the loading when isLoading becomes false
      completeLoading();
    }
  }, [isLoading, completeLoading, isVisible, progress]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-md transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-teal-300 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-pink-300 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 w-2 h-2 bg-teal-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-32 w-1 h-1 bg-pink-400 rounded-full animate-pulse opacity-70" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Main Loading Animation */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          {/* Spinning Logo Container */}
          <div className="absolute inset-0 animate-spin-slow">
            <div className="w-full h-full bg-gradient-to-r from-teal-600 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Leaf className="w-8 h-8 text-teal-600 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Orbiting Elements */}
          <div className="absolute inset-0 animate-spin-reverse">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-gradient-to-r from-teal-400 to-pink-400 rounded-full"
                style={{
                  top: `${50 + 40 * Math.sin((i * 120 * Math.PI) / 180)}%`,
                  left: `${50 + 40 * Math.cos((i * 120 * Math.PI) / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>

          {/* Pulsing Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-300/20 to-pink-300/20 rounded-full animate-ping"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-teal-900 animate-fade-in">
            Preparing Your Journey
          </h3>
          <p className="text-teal-600 animate-fade-in-delay">
            Loading your personalized healing experience...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto mt-8 mb-4">
          <div className="w-full bg-teal-100 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Progress Percentage */}
        <p className="text-xs text-teal-500 font-medium">
          {Math.round(progress)}%
        </p>

        {/* Floating Icons */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <Sparkles
              key={i}
              className="absolute w-4 h-4 text-teal-400 animate-float opacity-60"
              style={{
                top: `${-60 + Math.random() * 120}px`,
                left: `${-60 + Math.random() * 120}px`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${2 + Math.random()}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-delay {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          25% { transform: translateY(-8px) rotate(90deg); opacity: 0.8; }
          50% { transform: translateY(-4px) rotate(180deg); opacity: 1; }
          75% { transform: translateY(-6px) rotate(270deg); opacity: 0.8; }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 4s linear infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in-delay 0.8s ease-out 0.3s both;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}