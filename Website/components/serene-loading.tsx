'use client';

import { useEffect, useState } from 'react';

export function SereneLoading() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Background ambient particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-200/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        {/* Main Heading */}
        <div className={`mb-16 transform transition-all duration-2000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-amber-500 leading-tight mb-4">
            One Source. Five Paths.
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-amber-500 to-blue-600 leading-tight">
            One Healing Journey.
          </h2>
        </div>

        {/* Lotus Mandala Animation */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 mx-auto mb-16">
          {/* Central circle */}
          <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-amber-300 to-amber-500 rounded-full shadow-lg animate-pulse">
            <div className="absolute inset-2 bg-gradient-to-r from-amber-100 to-amber-200 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>

          {/* Spinning container for petals */}
          <div className="absolute inset-0 animate-spin-slow">
            {/* 5 Lotus Petals */}
            {[...Array(5)].map((_, i) => {
              const rotation = (i * 72); // 360/5 = 72 degrees apart
              const colors = [
                'from-blue-400 via-blue-500 to-blue-600',
                'from-purple-400 via-purple-500 to-purple-600',
                'from-indigo-400 via-indigo-500 to-indigo-600',
                'from-violet-400 via-violet-500 to-violet-600',
                'from-amber-400 via-amber-500 to-amber-600'
              ];
              
              return (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  {/* Petal glow */}
                  <div 
                    className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-24 md:w-16 md:h-32 lg:w-20 lg:h-40 bg-gradient-to-b ${colors[i]} rounded-full opacity-60 animate-pulse-slow blur-sm`}
                    style={{ 
                      animationDelay: `${i * 0.4}s`,
                      transformOrigin: 'bottom center'
                    }}
                  />
                  
                  {/* Main petal */}
                  <div 
                    className={`absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-20 md:w-12 md:h-28 lg:w-16 lg:h-36 bg-gradient-to-b ${colors[i]} rounded-full shadow-lg animate-breathe`}
                    style={{ 
                      animationDelay: `${i * 0.4}s`,
                      transformOrigin: 'bottom center',
                      clipPath: 'ellipse(50% 70% at 50% 30%)'
                    }}
                  />
                  
                  {/* Inner petal highlight */}
                  <div 
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3 h-12 md:w-4 md:h-16 lg:w-6 lg:h-20 bg-gradient-to-b from-white/40 to-transparent rounded-full animate-pulse-slow"
                    style={{ 
                      animationDelay: `${i * 0.4 + 0.2}s`,
                      transformOrigin: 'bottom center'
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Outer energy rings */}
          <div className="absolute inset-0 animate-spin-reverse-slow">
            <div className="absolute inset-4 border-2 border-blue-200/30 rounded-full animate-pulse-slow"></div>
            <div className="absolute inset-8 border border-purple-200/30 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className={`transform transition-all duration-2000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <p className="text-lg md:text-xl text-gray-600 animate-fade-pulse">
            Loading your personalized healing space...
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center space-x-2 mt-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
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
        
        @keyframes spin-reverse-slow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { 
            opacity: 0.4;
            transform: scale(1);
          }
          50% { 
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        @keyframes breathe {
          0%, 100% { 
            transform: scale(1) translateX(-50%);
            opacity: 0.8;
          }
          50% { 
            transform: scale(1.1) translateX(-50%);
            opacity: 1;
          }
        }
        
        @keyframes fade-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        
        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 20s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-breathe {
          animation: breathe 4s ease-in-out infinite;
        }
        
        .animate-fade-pulse {
          animation: fade-pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}