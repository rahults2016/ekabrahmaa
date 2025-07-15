// src/features/programs/components/ProgramDetails/SOSMedications.tsx
import React from 'react';
import { AlertCircle, Check } from 'lucide-react';
import type { SOSMedication } from '../../types';

interface SOSMedicationsProps {
  medications: SOSMedication[];
  status: {[key: string]: boolean};
  onSOSUsed: (sosId: string) => void;
}

const SOSMedications: React.FC<SOSMedicationsProps> = ({ 
  medications, 
  status,
  onSOSUsed
}) => {
  return (
    <div className="card">
      <h3 className="text-xl font-garamond font-semibold mb-6 flex items-center">
        <AlertCircle size={24} className="text-gold mr-3" />
        SOS Medications (As Needed)
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left p-3 font-medium">Medicine Name</th>
              <th className="text-left p-3 font-medium">Dosage</th>
              <th className="text-left p-3 font-medium">🕗 Timing</th>
              <th className="text-left p-3 font-medium">Target Symptoms</th>
              <th className="text-left p-3 font-medium">Duration</th>
              <th className="text-left p-3 font-medium">Prescribed Date</th>
              <th className="text-center p-3 font-medium">✅ Used</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((sos) => (
              <tr key={sos.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-medium text-charcoal-dark">{sos.medicineName}</td>
                <td className="p-3 text-charcoal">{sos.dosage}</td>
                <td className="p-3 text-charcoal">{sos.timing}</td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {sos.targetSymptoms.map((symptom, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gold-light/20 text-gold text-xs rounded-full">
                        {symptom}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-3 text-charcoal">{sos.duration}</td>
                <td className="p-3 text-charcoal-light">{sos.prescriptionDate}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => onSOSUsed(sos.id)}
                    className={`w-6 h-6 rounded border-2 transition-colors ${
                      status[sos.id]
                        ? 'bg-gold border-gold text-white'
                        : 'border-gray-300 hover:border-gold'
                    }`}
                  >
                    {status[sos.id] && <Check size={14} />}
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

export default SOSMedications;