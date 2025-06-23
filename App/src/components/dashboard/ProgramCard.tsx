import React from 'react';
import { ArrowRight } from 'lucide-react';
import ProgressRing from '../common/ProgressRing';
import { Link } from 'react-router-dom';

interface ProgramCardProps {
  title: string;
  duration: number;
  currentDay: number;
  description: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  title,
  duration,
  currentDay,
  description,
}) => {
  const progress = Math.min(Math.round((currentDay / duration) * 100), 100);
  
  return (
    <div className="card hover:shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="md:mr-6 mb-4 md:mb-0 flex justify-center">
          <ProgressRing progress={progress}>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-xs text-charcoal-light">Day</span>
              <span className="text-2xl font-semibold text-teal">{currentDay}</span>
              <span className="text-xs text-charcoal-light">of {duration}</span>
            </div>
          </ProgressRing>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-garamond font-semibold text-charcoal-dark mb-2">
            {title}
          </h3>
          <p className="text-charcoal-light text-sm mb-4">{description}</p>
          
          <Link
            to="/programs"
            className="inline-flex items-center text-teal hover:text-teal-dark transition-colors"
          >
            <span className="mr-1">View Program</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;