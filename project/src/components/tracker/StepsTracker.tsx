import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Footprints, Smartphone, PencilLine } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StepRecord {
  date: Date;
  steps: number;
  source: 'manual' | 'google_fit' | 'apple_health';
}

const StepsTracker: React.FC = () => {
  const [records, setRecords] = useState<StepRecord[]>([]);
  const [manualSteps, setManualSteps] = useState('');
  const [connected, setConnected] = useState({
    googleFit: false,
    appleHealth: false
  });

  const dailyGoal = 10000;

  const handleConnect = (platform: 'googleFit' | 'appleHealth') => {
    // In a real app, this would initiate OAuth flow
    setConnected(prev => ({ ...prev, [platform]: true }));
  };

  const handleManualEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualSteps) return;

    const newRecord: StepRecord = {
      date: new Date(),
      steps: parseInt(manualSteps),
      source: 'manual'
    };
    setRecords([...records, newRecord]);
    setManualSteps('');
  };

  const todaySteps = records
    .filter(record => 
      new Date(record.date).toDateString() === new Date().toDateString()
    )
    .reduce((sum, record) => sum + record.steps, 0);

  const progress = Math.min((todaySteps / dailyGoal) * 100, 100);

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-garamond font-semibold mb-6">Step Counter</h2>
        
        {/* Progress Ring */}
        <div className="flex justify-center mb-8">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#3c7f87"
                strokeWidth="10"
                strokeDasharray={`${progress * 2.827} 282.7`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Footprints size={32} className="text-teal mb-2" />
              <div className="text-2xl font-semibold text-teal">
                {todaySteps.toLocaleString()}
              </div>
              <div className="text-sm text-charcoal-light">
                of {dailyGoal.toLocaleString()} steps
              </div>
            </div>
          </div>
        </div>

        {/* Connect Health Apps */}
        <div className="space-y-4 mb-8">
          <h3 className="font-medium">Connect Health Apps</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => handleConnect('googleFit')}
              className={`flex items-center p-4 rounded-lg border-2 transition-colors ${
                connected.googleFit
                  ? 'border-teal bg-teal-light/10'
                  : 'border-gray-200 hover:border-teal'
              }`}
            >
              <Smartphone size={24} className="text-teal mr-3" />
              <div className="text-left">
                <div className="font-medium">Google Fit</div>
                <div className="text-sm text-charcoal-light">
                  {connected.googleFit ? 'Connected' : 'Connect your account'}
                </div>
              </div>
            </button>

            <button
              onClick={() => handleConnect('appleHealth')}
              className={`flex items-center p-4 rounded-lg border-2 transition-colors ${
                connected.appleHealth
                  ? 'border-teal bg-teal-light/10'
                  : 'border-gray-200 hover:border-teal'
              }`}
            >
              <Smartphone size={24} className="text-teal mr-3" />
              <div className="text-left">
                <div className="font-medium">Apple Health</div>
                <div className="text-sm text-charcoal-light">
                  {connected.appleHealth ? 'Connected' : 'Connect your account'}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Manual Entry */}
        <div>
          <h3 className="font-medium mb-4">Manual Entry</h3>
          <form onSubmit={handleManualEntry} className="flex space-x-2">
            <div className="flex-1">
              <div className="relative">
                <PencilLine size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-light" />
                <input
                  type="number"
                  value={manualSteps}
                  onChange={(e) => setManualSteps(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Enter steps manually"
                  min="0"
                  step="100"
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn-primary px-6"
              disabled={!manualSteps}
            >
              Add
            </button>
          </form>
        </div>
      </div>

      {/* Step History */}
      {records.length > 0 && (
        <div className="card">
          <h3 className="font-medium mb-6">Step History</h3>
          
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={records}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(value) => new Date(value).toLocaleString()}
                  formatter={(value: any) => [value.toLocaleString(), 'Steps']}
                />
                <Line
                  type="monotone"
                  dataKey="steps"
                  stroke="#3c7f87"
                  name="Steps"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {records
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .slice(0, 5)
              .map((record, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {new Date(record.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-charcoal-light capitalize">
                      Source: {record.source.replace('_', ' ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {record.steps.toLocaleString()} steps
                    </p>
                    <p className="text-xs text-charcoal-light">
                      {((record.steps / dailyGoal) * 100).toFixed(1)}% of goal
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StepsTracker;