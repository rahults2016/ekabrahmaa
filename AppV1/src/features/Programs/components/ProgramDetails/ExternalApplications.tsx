// src/features/programs/components/ProgramDetails/ExternalApplications.tsx
import React from 'react';
import { User, Check } from 'lucide-react';
import type { ExternalApplication } from '../../types';

interface ExternalApplicationsProps {
  applications: ExternalApplication[];
  status: {[key: string]: boolean};
  onApplicationCompleted: (applicationId: string) => void;
}

const ExternalApplications: React.FC<ExternalApplicationsProps> = ({ 
  applications, 
  status,
  onApplicationCompleted
}) => {
  return (
    <div className="card">
      <h3 className="text-xl font-garamond font-semibold mb-6 flex items-center">
        <User size={24} className="text-pink mr-3" />
        External Applications/Therapies
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left p-3 font-medium">Therapy Name</th>
              <th className="text-left p-3 font-medium">Body Area</th>
              <th className="text-left p-3 font-medium">🕗 Timing</th>
              <th className="text-left p-3 font-medium">Frequency</th>
              <th className="text-left p-3 font-medium">Administered By</th>
              <th className="text-left p-3 font-medium">Instructions</th>
              <th className="text-center p-3 font-medium">✅ Track</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-medium text-charcoal-dark">{application.therapyName}</td>
                <td className="p-3 text-charcoal">{application.bodyArea}</td>
                <td className="p-3 text-charcoal">{application.timing}</td>
                <td className="p-3 text-charcoal">{application.frequency}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    application.administeredBy === 'self' 
                      ? 'bg-teal-light/20 text-teal' 
                      : 'bg-pink-light/20 text-pink'
                  }`}>
                    {application.administeredBy === 'self' ? 'Self' : 'Therapist'}
                  </span>
                </td>
                <td className="p-3 text-charcoal-light text-xs max-w-xs">{application.instructions}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => onApplicationCompleted(application.id)}
                    className={`w-6 h-6 rounded border-2 transition-colors ${
                      status[application.id]
                        ? 'bg-pink border-pink text-white'
                        : 'border-gray-300 hover:border-pink'
                    }`}
                  >
                    {status[application.id] && <Check size={14} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExternalApplications;