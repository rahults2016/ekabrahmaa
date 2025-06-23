'use client';

import { useEffect, useState, useCallback } from 'react';
import { Sparkles, Leaf, Heart, Sun, Moon, Star } from 'lucide-react';

export function FloatingElements() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Throttle mouse move events
    if (!window.requestAnimationFrame) {
      setMousePosition({ x: e.clientX, y: e.clientY });
      return;
    }
    
    window.requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  const handleResize = useCallback(() => {
    // Throttle resize events
    if (!window.requestAnimationFrame) {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
      return;
    }
    
    window.requestAnimationFrame(() => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    });
  }, []);

  useEffect(() => {
    // Initialize window dimensions
    // Set initial dimensions
    handleResize();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleMouseMove, handleResize]);

  const elements = [
    { 
      Icon: Sparkles, 
      delay: 0, 
      color: 'text-pink-400', 
      size: 'w-4 h-4',
      initialX: '10%',
      initialY: '20%'
    },
    { 
      Icon: Leaf, 
      delay: 1000, 
      color: 'text-teal-400', 
      size: 'w-5 h-5',
      initialX: '85%',
      initialY: '15%'
    },
    { 
      Icon: Heart, 
      delay: 2000, 
      color: 'text-pink-300', 
      size: 'w-3 h-3',
      initialX: '15%',
      initialY: '70%'
    },
    { 
      Icon: Sun, 
      delay: 3000, 
      color: 'text-yellow-400', 
      size: 'w-4 h-4',
      initialX: '80%',
      initialY: '60%'
    },
    { 
      Icon: Moon, 
      delay: 4000, 
      color: 'text-blue-300', 
      size: 'w-4 h-4',
      initialX: '25%',
      initialY: '40%'
    },
    { 
      Icon: Star, 
      delay: 5000, 
      color: 'text-purple-300', 
      size: 'w-3 h-3',
      initialX: '70%',
      initialY: '80%'
    }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden will-change-transform">
      {elements.map((element, index) => {
        const { Icon, delay, color, size, initialX, initialY } = element;
        
        // Calculate floating movement based on mouse position using state values
        const moveX = windowDimensions.width > 0 ? (mousePosition.x / windowDimensions.width - 0.5) * 50 : 0;
        const moveY = windowDimensions.height > 0 ? (mousePosition.y / windowDimensions.height - 0.5) * 50 : 0;
        
        return (
          <div
            key={index}
            className={`absolute ${color} ${size} opacity-30 animate-pulse will-change-transform`}
            style={{
              left: initialX,
              top: initialY,
              transform: `translate(${moveX * (index + 1) * 0.1}px, ${moveY * (index + 1) * 0.1}px)`,
              transition: 'transform 2s ease-out',
              animationDelay: `${delay}ms`,
              animationDuration: `${3 + index}s`
            }}
          >
            <Icon className="w-full h-full" />
          </div>
        );
      })}
    </div>
  );
}