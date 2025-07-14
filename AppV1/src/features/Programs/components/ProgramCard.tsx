import React from 'react';
import { ArrowRight, Lock } from 'lucide-react';
import ProgressRing from '@/components/dashboard/common/ProgressRing';
import type { Program } from '../types';

interface ProgramCardProps {
  program: Program;
  onSelect: (program: Program) => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, onSelect }) => {
  return (
    <div className={`card hover:shadow-lg ${program.unlocked ? '' : 'opacity-80'}`}>
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="md:mr-6 mb-4 md:mb-0 flex justify-center">
          <ProgressRing progress={program.progress}>
            {program.unlocked ? (
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-xs text-charcoal-light">Day</span>
                <span className="text-2xl font-semibold text-teal">
                  {Math.round(program.duration * program.progress / 100)}
                </span>
                <span className="text-xs text-charcoal-light">of {program.duration}</span>
              </div>
            ) : (
              <Lock size={28} className="text-charcoal-light" />
            )}
          </ProgressRing>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className="text-xl font-garamond font-semibold text-charcoal-dark">
              {program.title}
            </h3>
            {!program.unlocked && (
              <span className="ml-2 bg-charcoal-light/10 text-charcoal-light text-xs px-2 py-1 rounded-full">
                Locked
              </span>
            )}
          </div>
          
          <p className="text-charcoal-light text-sm mb-4">{program.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-charcoal-light">{program.duration} days</span>
            
            {program.unlocked ? (
              <button 
                onClick={() => onSelect(program)} 
                className="inline-flex items-center text-teal hover:text-teal-dark transition-colors"
              >
                <span className="mr-1">Continue</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button className="btn-primary text-sm py-1 px-4">
                Unlock for ₹{program.price}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;