import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activity, Heart, Moon, Droplet, Footprints, Brain, ChevronDown } from 'lucide-react';
import ProgressRing from '@/components/dashboard/common/ProgressRing';

type StatType = 'mood' | 'sleep' | 'steps' | 'vitals' | 'water';

// Sample data - in a real app, this would come from your backend
const analyticsData = {
  mood: {
    today: 4,
    weekAvg: 3.8,
    trend: [
      { date: '04/20', value: 4 },
      { date: '04/21', value: 3 },
      { date: '04/22', value: 5 },
      { date: '04/23', value: 4 },
      { date: '04/24', value: 2 },
      { date: '04/25', value: 3 },
      { date: '04/26', value: 4 }
    ]
  },
  vitals: {
    bp: { systolic: 120, diastolic: 80 },
    bloodSugar: 95,
    trend: [
      { date: '04/20', systolic: 118, diastolic: 78, sugar: 92 },
      { date: '04/21', systolic: 122, diastolic: 82, sugar: 95 },
      { date: '04/22', systolic: 120, diastolic: 80, sugar: 94 },
      { date: '04/23', systolic: 118, diastolic: 78, sugar: 93 },
      { date: '04/24', systolic: 121, diastolic: 81, sugar: 96 },
      { date: '04/25', systolic: 119, diastolic: 79, sugar: 94 },
      { date: '04/26', systolic: 120, diastolic: 80, sugar: 95 }
    ]
  },
  sleep: {
    lastNight: 7.5,
    weekAvg: 7.2,
    quality: 'Good',
    trend: [
      { date: '04/20', hours: 7.0, quality: 3 },
      { date: '04/21', hours: 6.5, quality: 2 },
      { date: '04/22', hours: 8.0, quality: 4 },
      { date: '04/23', hours: 7.5, quality: 4 },
      { date: '04/24', hours: 7.0, quality: 3 },
      { date: '04/25', hours: 7.5, quality: 3 },
      { date: '04/26', hours: 7.5, quality: 4 }
    ]
  },
  water: {
    today: 1800,
    goal: 2000,
    trend: [
      { date: '04/20', intake: 2100 },
      { date: '04/21', intake: 1900 },
      { date: '04/22', intake: 2000 },
      { date: '04/23', intake: 1700 },
      { date: '04/24', intake: 1800 },
      { date: '04/25', intake: 2200 },
      { date: '04/26', intake: 1800 }
    ]
  },
  steps: {
    today: 8500,
    goal: 10000,
    trend: [
      { date: '04/20', count: 9200 },
      { date: '04/21', count: 8800 },
      { date: '04/22', count: 10500 },
      { date: '04/23', count: 7500 },
      { date: '04/24', count: 9000 },
      { date: '04/25', count: 8200 },
      { date: '04/26', count: 8500 }
    ]
  }
};

const AnalyticsSummary: React.FC = () => {
  const [selectedStat, setSelectedStat] = useState<StatType>('mood');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [weeklyGoalProgress, setWeeklyGoalProgress] = useState(65);
  const [dailyWisdom, setDailyWisdom] = useState({
    quote: "The journey of a thousand miles begins with a single step.",
    author: "Lao Tzu"
  });

  const stats = [
    { type: 'mood', label: 'Mood & Energy', icon: <Brain className="text-teal-600\" size={20} /> },
    { type: 'sleep', label: 'Sleep', icon: <Moon className="text-rose-600" size={20} /> },
    { type: 'steps', label: 'Steps', icon: <Footprints className="text-sage-600\" size={20} /> },
    { type: 'vitals', label: 'Vitals', icon: <Heart className="text-teal-600" size={20} /> },
    { type: 'water', label: 'Water', icon: <Droplet className="text-info-500\" size={20} /> }
  ] as const;

  const handleStatSelect = (type: StatType) => {
    setSelectedStat(type);
    setIsDropdownOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-garamond font-semibold text-slate-800">Weekly Analytics</h2>
        
        {/* Stat Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 shadow-brand hover:shadow-brand-md transition-all"
          >
            <span className="flex items-center">
              {stats.find(s => s.type === selectedStat)?.icon}
              <span className="ml-2 text-slate-700">{stats.find(s => s.type === selectedStat)?.label}</span>
            </span>
            <ChevronDown size={16} className={`transition-transform text-slate-400 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-brand-lg py-2 z-10 border border-slate-100">
              {stats.map(stat => (
                <button
                  key={stat.type}
                  onClick={() => handleStatSelect(stat.type)}
                  className={`w-full flex items-center px-4 py-2 hover:bg-teal-50 transition-colors ${
                    selectedStat === stat.type ? 'text-teal-600 bg-teal-50' : 'text-slate-700'
                  }`}
                >
                  {stat.icon}
                  <span className="ml-2">{stat.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Weekly Goals Progress */}
      <div className="card hover:shadow-brand-lg mb-6 bg-gradient-to-br from-teal-50/50 to-rose-50/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-slate-800">Weekly Goals Progress</h3>
          <span className="text-teal-600 font-medium">{weeklyGoalProgress}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
          <motion.div 
            className="h-full bg-teal-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${weeklyGoalProgress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="text-sm text-slate-600 text-center italic">
          "{dailyWisdom.quote}"
          <div className="text-xs mt-1 text-slate-500">- {dailyWisdom.author}</div>
        </div>
      </div>
      
      <div className="card hover:shadow-brand-lg">
        {selectedStat === 'mood' && (
          <>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center mr-3">
                <Brain size={20} className="text-teal-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800">Mood & Energy Trends</h3>
                <p className="text-sm text-slate-600">Weekly Analysis</p>
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.mood.trend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis domain={[0, 5]} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgba(60, 127, 135, 0.1)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3c7f87" 
                    name="Mood"
                    strokeWidth={2}
                    dot={{ fill: '#3c7f87', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="p-3 bg-teal-50 rounded-lg">
                <div className="text-sm text-slate-600 mb-1">Today's Mood</div>
                <motion.div 
                  className="text-2xl font-semibold text-teal-600"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {analyticsData.mood.today}/5
                  {analyticsData.mood.today >= 4 && (
                    <motion.span
                      initial={{ rotate: -45 }}
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.5 }}
                      className="inline-block ml-2"
                    >
                      ✨
                    </motion.span>
                  )}
                </motion.div>
              </div>
              <div className="p-3 bg-sage-50 rounded-lg">
                <div className="text-sm text-slate-600 mb-1">Weekly Average</div>
                <div className="text-2xl font-semibold text-sage-600">
                  {analyticsData.mood.weekAvg}/5
                </div>
              </div>
            </div>
          </>
        )}

        {selectedStat === 'sleep' && (
          <div className="card hover:shadow-brand-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center mr-3">
                <Moon size={20} className="text-rose-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800">Sleep Pattern</h3>
                <p className="text-sm text-slate-600">Hours & Quality</p>
              </div>
            </div>
            
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.sleep.trend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="hours" stroke="#F7CAC9" name="Hours" strokeWidth={2} />
                  <Line type="monotone" dataKey="quality" stroke="#3c7f87" name="Quality" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {selectedStat === 'vitals' && (
          <div className="card hover:shadow-brand-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center mr-3">
                <Heart size={20} className="text-teal-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800">Vitals</h3>
                <p className="text-sm text-slate-600">Blood Pressure & Sugar</p>
              </div>
            </div>
            
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.vitals.trend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="systolic" stroke="#3c7f87" name="Systolic" strokeWidth={2} />
                  <Line type="monotone" dataKey="diastolic" stroke="#F7CAC9" name="Diastolic" strokeWidth={2} />
                  <Line type="monotone" dataKey="sugar" stroke="#E1C699" name="Blood Sugar" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {selectedStat === 'water' && (
          <div className="card hover:shadow-brand-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center mr-3">
                <Activity size={20} className="text-teal-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800">Activity</h3>
                <p className="text-sm text-slate-600">Steps & Hydration</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <ProgressRing 
                  progress={(analyticsData.steps.today / analyticsData.steps.goal) * 100}
                  size={120}
                >
                  <div className="flex flex-col items-center">
                    <Footprints size={20} className="text-teal-600 mb-1" />
                    <span className="text-sm font-medium">
                      {Math.round((analyticsData.steps.today / analyticsData.steps.goal) * 100)}%
                    </span>
                  </div>
                </ProgressRing>
                <p className="text-center text-sm text-slate-600 mt-2">Steps Goal</p>
              </div>

              <div>
                <ProgressRing 
                  progress={(analyticsData.water.today / analyticsData.water.goal) * 100}
                  size={120}
                >
                  <div className="flex flex-col items-center">
                    <Droplet size={20} className="text-teal-600 mb-1" />
                    <span className="text-sm font-medium">
                      {Math.round((analyticsData.water.today / analyticsData.water.goal) * 100)}%
                    </span>
                  </div>
                </ProgressRing>
                <p className="text-center text-sm text-slate-600 mt-2">Water Goal</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsSummary;