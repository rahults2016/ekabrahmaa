import React from 'react';

interface ProgressRingProps {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number; 
  className?: string;
  children?: React.ReactNode;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 140,
  strokeWidth = 12,
  className = '',
  children,
}) => {
  // Calculate properties
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`} 
        className="transform -rotate-90 drop-shadow-lg"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
        />
        
        {/* Gradient definition with brand colors */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3c7f87" />
            <stop offset="50%" stopColor="#5eadb8" />
            <stop offset="100%" stopColor="#F7CAC9" />
          </linearGradient>
        </defs>
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="filter drop-shadow transition-all duration-500"
        />
      </svg>
      
      {/* Content inside the circle */}
      <div className="absolute inset-0 flex items-center justify-center transform scale-90">
        {children || (
          <span className="text-4xl font-bold bg-gradient-to-br from-teal-600 via-teal-500 to-rose-500 bg-clip-text text-transparent">
            {Math.round(progress)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default ProgressRing;