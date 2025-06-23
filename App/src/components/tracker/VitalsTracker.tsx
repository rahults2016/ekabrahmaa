import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Droplet } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface VitalReading {
  timestamp: Date;
  systolic: number;
  diastolic: number;
  bloodSugar: number;
  type: 'fasting' | 'postprandial';
  bowelMovements: number;
}

const VitalsTracker: React.FC = () => {
  const [readings, setReadings] = useState<VitalReading[]>([]);
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [appetite, setAppetite] = useState('normal');
  const [bowelFrequency, setBowelFrequency] = useState('');
  const [stoolType, setStoolType] = useState('');
  const [hasConstipation, setHasConstipation] = useState(false);
  const [readingType, setReadingType] = useState<'fasting' | 'postprandial'>('fasting');
  const [bowelMovements, setBowelMovements] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReading: VitalReading = {
      timestamp: new Date(),
      systolic: parseInt(systolic),
      diastolic: parseInt(diastolic),
      bloodSugar: parseFloat(bloodSugar),
      type: readingType,
      bowelMovements: parseInt(bowelMovements)
    };
    setReadings([...readings, newReading]);
    setSystolic('');
    setDiastolic('');
    setBloodSugar('');
    setBowelMovements('');
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-garamond font-semibold mb-6">Record Vitals</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Blood Pressure */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center">
                <Heart size={20} className="text-pink mr-2" />
                Blood Pressure
              </h3>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <label className="block text-sm text-charcoal-light mb-1">Systolic</label>
                  <input
                    type="number"
                    value={systolic}
                    onChange={(e) => setSystolic(e.target.value)}
                    className="input-field"
                    placeholder="120"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-charcoal-light mb-1">Diastolic</label>
                  <input
                    type="number"
                    value={diastolic}
                    onChange={(e) => setDiastolic(e.target.value)}
                    className="input-field"
                    placeholder="80"
                  />
                </div>
              </div>
            </div>

            {/* Blood Sugar */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center">
                <Droplet size={20} className="text-teal mr-2" />
                Blood Sugar
              </h3>
              <div>
                <input
                  type="number"
                  value={bloodSugar}
                  onChange={(e) => setBloodSugar(e.target.value)}
                  className="input-field mb-2"
                  placeholder="Enter blood sugar level"
                />
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setReadingType('fasting')}
                    className={`flex-1 py-2 px-3 rounded-lg transition-colors ${
                      readingType === 'fasting'
                        ? 'bg-teal text-white'
                        : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                    }`}
                  >
                    Fasting
                  </button>
                  <button
                    type="button"
                    onClick={() => setReadingType('postprandial')}
                    className={`flex-1 py-2 px-3 rounded-lg transition-colors ${
                      readingType === 'postprandial'
                        ? 'bg-teal text-white'
                        : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                    }`}
                  >
                    Post Meal
                  </button>
                </div>
              </div>
            </div>

            {/* Bowel Movements */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center">
                <Activity size={20} className="text-gold mr-2" />
                Bowel Movements
              </h3>
              <input
                type="number"
                value={bowelMovements}
                onChange={(e) => setBowelMovements(e.target.value)}
                className="input-field"
                placeholder="Number of movements today"
                min="0"
                max="10"
              />
            </div>
          </div>

          {/* Appetite */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center">Appetite</h3>
            <div className="grid grid-cols-3 gap-2">
              {['low', 'normal', 'high'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setAppetite(level)}
                  className={`py-2 px-3 rounded-lg transition-colors ${
                    appetite === level
                      ? 'bg-teal text-white'
                      : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Bowel Movement */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center">Bowel Movement</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-charcoal-light mb-1">Frequency</label>
                <div className="flex space-x-2">
                  <select
                    value={bowelFrequency === 'other' ? '' : bowelFrequency}
                    onChange={(e) => setBowelFrequency(e.target.value || 'other')}
                    className="input-field flex-1"
                  >
                    <option value="">Select frequency</option>
                    <option value="0">0 times/day</option>
                    <option value="1">1 time/day</option>
                    <option value="2">2 times/day</option>
                    <option value="3">3+ times/day</option>
                    <option value="other">Other</option>
                  </select>
                  {bowelFrequency === 'other' && (
                    <input
                      type="number"
                      value={bowelFrequency === 'other' ? '' : bowelFrequency}
                      onChange={(e) => setBowelFrequency(e.target.value)}
                      className="input-field w-24"
                      placeholder="#"
                      min="0"
                    />
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-charcoal-light mb-1">Stool Type</label>
                <select
                  value={stoolType}
                  onChange={(e) => setStoolType(e.target.value)}
                  className="input-field"
                >
                  <option value="">Select type</option>
                  <option value="hard">Hard</option>
                  <option value="normal">Normal</option>
                  <option value="loose">Loose</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="constipation"
                checked={hasConstipation}
                onChange={(e) => setHasConstipation(e.target.checked)}
                className="rounded border-gray-300 text-teal focus:ring-teal"
              />
              <label htmlFor="constipation" className="text-sm text-charcoal-light">
                Experiencing constipation
              </label>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full mt-6">
            Save Readings
          </button>
        </form>
      </div>

      {/* Trends */}
      {readings.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-garamond font-semibold mb-6">Trends</h2>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={readings}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(value) => new Date(value).toLocaleString()}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="systolic"
                  stroke="#F7CAC9"
                  name="Systolic"
                />
                <Line
                  type="monotone"
                  dataKey="diastolic"
                  stroke="#3c7f87"
                  name="Diastolic"
                />
                <Line
                  type="monotone"
                  dataKey="bloodSugar"
                  stroke="#E1C699"
                  name="Blood Sugar"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default VitalsTracker;