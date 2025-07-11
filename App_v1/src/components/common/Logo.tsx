import React from 'react';
import { Flower } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', showTagline = false }) => {
  let iconSize: number;
  let textSize: string;
  
  switch (size) {
    case 'small':
      iconSize = 24;
      textSize = 'text-xl';
      break;
    case 'large':
      iconSize = 48;
      textSize = 'text-4xl';
      break;
    case 'medium':
    default:
      iconSize = 36;
      textSize = 'text-3xl';
      break;
  }
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <Flower size={iconSize} className="text-teal mr-2" />
        <h1 className={`font-garamond font-semibold ${textSize} text-charcoal`}>
          ekaBrahmaa
        </h1>
      </div>
      {showTagline && (
        <p className="text-sm text-charcoal-light mt-1 font-lato">
          One Source. Infinite Healing.
        </p>
      )}
    </div>
  );
};

export default Logo;