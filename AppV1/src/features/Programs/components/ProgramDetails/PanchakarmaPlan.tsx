// src/features/programs/components/ProgramDetails/PanchakarmaPlan.tsx
import React from 'react';
import { Flower, Droplet, Pill } from 'lucide-react';
import type { PanchakarmaPhase } from '../../types';

interface PanchakarmaPlanProps {
  phases: PanchakarmaPhase[];
}

const PanchakarmaPlan: React.FC<PanchakarmaPlanProps> = ({ phases }) => {
  return (
    <div className="card">
      <h3 className="text-xl font-garamond font-semibold mb-6 flex items-center">
        <Flower size={24} className="text-gold mr-3" />
        Panchakarma Treatment Plan
      </h3>
      
      <div className="space-y-6">
        {phases.map((phase, index) => (
          <div key={phase.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-charcoal-dark">{phase.phaseName}</h4>
                  <p className="text-sm text-charcoal-light">Duration: {phase.duration}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    phase.completed ? 'bg-teal text-white' : 'bg-gray-200 text-charcoal-light'
                  }`}>
                    {phase.completed ? 'Completed' : `Phase ${index + 1}`}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-medium mb-2">Medicines/Oils Used</h5>
                  <div className="space-y-1">
                    {phase.medicines.map((medicine, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <Pill size={14} className="text-teal mr-2" />
                        <span>{medicine}</span>
                      </div>
                    ))}
                    {phase.oils.map((oil, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <Droplet size={14} className="text-pink mr-2" />
                        <span>{oil}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium mb-2">Dosage & Timing</h5>
                  <p className="text-sm text-charcoal mb-2"><strong>Dosage:</strong> {phase.dosage}</p>
                  <p className="text-sm text-charcoal"><strong>🕗 Timing:</strong> {phase.timing}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h5 className="font-medium mb-2">Special Instructions</h5>
                <ul className="space-y-1">
                  {phase.specialInstructions.map((instruction, idx) => (
                    <li key={idx} className="flex items-start text-sm text-charcoal-light">
                      <span className="w-2 h-2 rounded-full bg-gold mr-2 mt-2 flex-shrink-0"></span>
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanchakarmaPlan;