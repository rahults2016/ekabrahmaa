import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Plus, Frown, Thermometer, Coffee, Bone, Droplet, Brain, Moon, Pizza as Dizzy, Flame, HeartPulse } from 'lucide-react';

interface Symptom {
  id: string;
  name: string;
  icon: React.ReactNode;
  intensity: number;
  timestamp: Date;
  notes?: string;
}

const commonSymptoms = [
  { name: 'Headache', icon: <Brain className="text-pink" size={20} /> },
  { name: 'Nausea', icon: <Frown className="text-teal\" size={20} /> },
  { name: 'Fatigue', icon: <Coffee className="text-gold" size={20} /> },
  { name: 'Joint Pain', icon: <Bone className="text-pink\" size={20} /> },
  { name: 'Bloating', icon: <Droplet className="text-teal" size={20} /> },
  { name: 'Anxiety', icon: <HeartPulse className="text-gold\" size={20} /> },
  { name: 'Insomnia', icon: <Moon className="text-pink" size={20} /> },
  { name: 'Dizziness', icon: <Dizzy className="text-teal\" size={20} /> },
  { name: 'Acid Reflux', icon: <Flame className="text-gold" size={20} /> },
  { name: 'Temperature', icon: <Thermometer className="text-pink\" size={20} /> }
];

const SymptomsTracker: React.FC = () => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [customSymptom, setCustomSymptom] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSymptom: Symptom = {
      id: Date.now().toString(),
      name: showCustomInput ? customSymptom : selectedSymptom,
      intensity,
      timestamp: new Date(),
      notes: notes.trim() || undefined
    };
    setSymptoms([...symptoms, newSymptom]);
    setSelectedSymptom('');
    setCustomSymptom('');
    setIntensity(5);
    setNotes('');
    setShowCustomInput(false);
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-garamond font-semibold mb-6">Track Symptoms</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Symptom Selection */}
          <div>
            <label className="block text-sm font-medium text-charcoal-dark mb-2">
              Select Symptom
            </label>
            {showCustomInput ? (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={customSymptom}
                  onChange={(e) => setCustomSymptom(e.target.value)}
                  className="input-field flex-1"
                  placeholder="Enter symptom name"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCustomInput(false)}
                  className="btn-secondary px-4"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {commonSymptoms.map((symptom) => (
                    <button
                      key={symptom.name}
                      type="button"
                      onClick={() => setSelectedSymptom(symptom.name)}
                      className={`p-2 rounded-lg transition-colors ${
                        selectedSymptom === symptom.name
                          ? 'bg-teal text-white'
                          : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        {symptom.icon}
                        <span>{symptom.name}</span>
                      </div>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setShowCustomInput(true)}
                    className="p-2 rounded-lg bg-gray-100 text-charcoal hover:bg-gray-200 flex items-center justify-center"
                  >
                    <Plus size={16} className="mr-1" />
                    Custom
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Intensity Slider */}
          {(selectedSymptom || customSymptom) && (
            <div>
              <label className="block text-sm font-medium text-charcoal-dark mb-2">
                Intensity
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal"
              />
              <div className="flex justify-between text-xs text-charcoal-light mt-1">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Severe</span>
              </div>
            </div>
          )}

          {/* Notes */}
          {(selectedSymptom || customSymptom) && (
            <div>
              <label className="block text-sm font-medium text-charcoal-dark mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="input-field h-24 resize-none"
                placeholder="Add any additional details or observations..."
              />
            </div>
          )}

          {(selectedSymptom || customSymptom) && (
            <button type="submit" className="btn-primary w-full">
              Log Symptom
            </button>
          )}
        </form>
      </div>

      {/* Symptom History */}
      {symptoms.length > 0 && (
        <div className="card">
          <h3 className="font-medium mb-4">Recent Symptoms</h3>
          <div className="space-y-3">
            {symptoms
              .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
              .map((symptom) => (
                <div
                  key={symptom.id}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {commonSymptoms.find(s => s.name === symptom.name)?.icon || 
                        <Activity size={20} className="text-teal mr-2" />}
                      <span className="font-medium">{symptom.name}</span>
                    </div>
                    <span className="text-sm text-charcoal-light">
                      {new Date(symptom.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-teal rounded-full"
                        style={{ width: `${(symptom.intensity / 10) * 100}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm font-medium">
                      {symptom.intensity}/10
                    </span>
                  </div>
                  {symptom.notes && (
                    <p className="text-sm text-charcoal-light mt-2">
                      {symptom.notes}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomsTracker;