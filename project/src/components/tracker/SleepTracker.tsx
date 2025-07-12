import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Star } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SleepRecord {
  date: Date;
  sleepTime: string;
  wakeTime: string;
  quality: 'deep' | 'light' | 'interrupted';
  duration: number;
}

const SleepTracker: React.FC = () => {
  const [records, setRecords] = useState<SleepRecord[]>([]);
  const [sleepTime, setSleepTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [quality, setQuality] = useState<'deep' | 'light' | 'interrupted'>('deep');

  const calculateDuration = (sleep: string, wake: string): number => {
    const sleepDate = new Date(`2000-01-01T${sleep}`);
    const wakeDate = new Date(`2000-01-01T${wake}`);
    if (wakeDate < sleepDate) wakeDate.setDate(wakeDate.getDate() + 1);
    return (wakeDate.getTime() - sleepDate.getTime()) / (1000 * 60 * 60);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const duration = calculateDuration(sleepTime, wakeTime);
    const newRecord: SleepRecord = {
      date: new Date(),
      sleepTime,
      wakeTime,
      quality,
      duration
    };
    setRecords([...records, newRecord]);
    setSleepTime('');
    setWakeTime('');
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-garamond font-semibold mb-6">Track Your Sleep</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-charcoal-dark mb-2">
                <div className="flex items-center">
                  <Moon size={16} className="mr-2 text-teal" />
                  Sleep Time
                </div>
              </label>
              <input
                type="time"
                value={sleepTime}
                onChange={(e) => setSleepTime(e.target.value)}
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal-dark mb-2">
                <div className="flex items-center">
                  <Sun size={16} className="mr-2 text-gold" />
                  Wake Time
                </div>
              </label>
              <input
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                className="input-field"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal-dark mb-2">
              <div className="flex items-center">
                <Star size={16} className="mr-2 text-pink" />
                Sleep Quality
              </div>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'deep', label: 'Deep' },
                { value: 'light', label: 'Light' },
                { value: 'interrupted', label: 'Interrupted' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setQuality(option.value as any)}
                  className={`p-2 rounded-lg transition-colors ${
                    quality === option.value
                      ? 'bg-teal text-white'
                      : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary w-full">
            Save Sleep Record
          </button>
        </form>
      </div>

      {/* Sleep Trends */}
      {records.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-garamond font-semibold mb-6">Sleep Trends</h2>
          
          <div className="h-64">
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
                  formatter={(value: any) => [`${value} hours`, 'Duration']}
                />
                <Line
                  type="monotone"
                  dataKey="duration"
                  stroke="#3c7f87"
                  name="Sleep Duration"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-4">Recent Sleep Records</h3>
            <div className="space-y-3">
              {records.slice(-5).reverse().map((record, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {new Date(record.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-charcoal-light">
                      {record.sleepTime} - {record.wakeTime}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {record.duration.toFixed(1)} hours
                    </p>
                    <p className="text-xs text-charcoal-light capitalize">
                      {record.quality} sleep
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SleepTracker;