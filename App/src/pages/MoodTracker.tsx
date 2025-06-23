import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import MoodSelector from '../components/mood/MoodSelector';
import PeriodTracker from '../components/journal/PeriodTracker';
import VitalsTracker from '../components/tracker/VitalsTracker';
import SleepTracker from '../components/tracker/SleepTracker';
import WaterTracker from '../components/tracker/WaterTracker';
import SymptomsTracker from '../components/tracker/SymptomsTracker';
import StepsTracker from '../components/tracker/StepsTracker';

// Sample data for the last 7 days
const moodData = [
  { date: '04/20', mood: 4, energy: 3, sleep: 4 },
  { date: '04/21', mood: 3, energy: 2, sleep: 3 },
  { date: '04/22', mood: 5, energy: 4, sleep: 5 },
  { date: '04/23', mood: 4, energy: 3, sleep: 4 },
  { date: '04/24', mood: 2, energy: 2, sleep: 2 },
  { date: '04/25', mood: 3, energy: 4, sleep: 3 },
  { date: '04/26', mood: 4, energy: 5, sleep: 4 },
];

const tagOptions = [
  'Stressed', 'Anxious', 'Calm', 'Focused', 'Tired',
  'Energetic', 'Balanced', 'Irritable', 'Grateful', 'Creative'
];

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number>(3);
  const [moodNote, setMoodNote] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'mood' | 'period' | 'vitals' | 'sleep' | 'water' | 'symptoms' | 'steps'>('mood');
  const { user } = useAuth();
  
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const handleSaveMood = () => {
    // In a real app, this would save to a database
    alert('Mood saved successfully!');
    setMoodNote('');
    setSelectedTags([]);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Tracker tabs */}
      <div className="flex justify-center mb-6">
        <div className="bg-white rounded-lg shadow-sm flex p-1">
          <button
            onClick={() => setActiveTab('mood')}
            className={`px-6 py-2 rounded-lg transition-all ${
              activeTab === 'mood'
                ? 'bg-teal text-white'
                : 'text-charcoal hover:bg-gray-100'
            }`}
          >
            Mood & Energy
          </button>
          <button
            onClick={() => setActiveTab('vitals')}
            className={`px-6 py-2 rounded-lg transition-all ${
              activeTab === 'vitals'
                ? 'bg-teal text-white'
                : 'text-charcoal hover:bg-gray-100'
            }`}
          >
            Vitals
          </button>
          <button
            onClick={() => setActiveTab('sleep')}
            className={`px-6 py-2 rounded-lg transition-all ${
              activeTab === 'sleep'
                ? 'bg-teal text-white'
                : 'text-charcoal hover:bg-gray-100'
            }`}
          >
            Sleep
          </button>
          <button
            onClick={() => setActiveTab('water')}
            className={`px-6 py-2 rounded-lg transition-all ${
              activeTab === 'water'
                ? 'bg-teal text-white'
                : 'text-charcoal hover:bg-gray-100'
            }`}
          >
            Water
          </button>
          <button
            onClick={() => setActiveTab('steps')}
            className={`px-6 py-2 rounded-lg transition-all ${
              activeTab === 'steps'
                ? 'bg-teal text-white'
                : 'text-charcoal hover:bg-gray-100'
            }`}
          >
            Steps
          </button>
          {user?.gender === 'female' && (
            <button
              onClick={() => setActiveTab('period')}
              className={`px-6 py-2 rounded-lg transition-all ${
                activeTab === 'period'
                  ? 'bg-teal text-white'
                  : 'text-charcoal hover:bg-gray-100'
              }`}
            >
              Period Cycle
            </button>
          )}
        </div>
      </div>

      {activeTab === 'vitals' && <VitalsTracker />}
      {activeTab === 'sleep' && <SleepTracker />}
      {activeTab === 'water' && <WaterTracker />}
      {activeTab === 'steps' && <StepsTracker />}
      {activeTab === 'period' && <PeriodTracker />}
      {activeTab === 'mood' && (
        <div className="grid grid-cols-1 gap-8">
          {/* Existing mood tracking content */}

          {activeTab === 'mood' ? (
            <div className="grid grid-cols-1 gap-8">
              {/* Mood entry section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card"
              >
                <MoodSelector selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Select Tags (Optional)</h3>
                  <div className="flex flex-wrap gap-2">
                    {tagOptions.map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-teal text-white'
                            : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Add Notes (Optional)</h3>
                  <textarea
                    value={moodNote}
                    onChange={(e) => setMoodNote(e.target.value)}
                    placeholder="What's contributing to your mood today?"
                    className="w-full h-24 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
                  ></textarea>
                </div>
                
                <div className="flex justify-center">
                  <button onClick={handleSaveMood} className="btn-primary">
                    Save Today's Mood
                  </button>
                </div>
              </motion.div>
              
              {/* Mood history chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="card"
              >
                <h2 className="text-2xl font-garamond font-semibold mb-6">
                  Your 7-Day History
                </h2>
                
                <div className="h-64 md:h-80 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={moodData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12, fill: '#2E2E2E' }}
                      />
                      <YAxis 
                        domain={[1, 5]} 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12, fill: '#2E2E2E' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderRadius: '8px',
                          border: 'none',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Legend 
                        verticalAlign="top" 
                        height={36}
                        iconType="circle"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="mood" 
                        stroke="#3c7f87" 
                        strokeWidth={2}
                        dot={{ fill: '#3c7f87', r: 4 }}
                        activeDot={{ fill: '#3c7f87', r: 6, stroke: 'white', strokeWidth: 2 }}
                        name="Mood"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="energy" 
                        stroke="#E1C699" 
                        strokeWidth={2}
                        dot={{ fill: '#E1C699', r: 4 }}
                        activeDot={{ fill: '#E1C699', r: 6, stroke: 'white', strokeWidth: 2 }}
                        name="Energy"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="sleep" 
                        stroke="#F7CAC9" 
                        strokeWidth={2}
                        dot={{ fill: '#F7CAC9', r: 4 }}
                        activeDot={{ fill: '#F7CAC9', r: 6, stroke: 'white', strokeWidth: 2 }}
                        name="Sleep"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <button className="btn-secondary text-sm py-2">
                    View 30-Day History
                  </button>
                  <button className="btn-secondary text-sm py-2">
                    Export Data
                  </button>
                </div>
              </motion.div>
            </div>
          ) : (
            <PeriodTracker />
          )}
        </div>
      )}
    </div>
  );
};

export default MoodTracker;