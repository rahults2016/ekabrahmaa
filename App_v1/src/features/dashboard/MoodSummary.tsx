import React from 'react';
import { Smile, Frown, Meh } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, CartesianGrid 
} from 'recharts';

// Sample mood data for the chart
const moodData = [
  { day: 'Mon', mood: 4 },
  { day: 'Tue', mood: 3 },
  { day: 'Wed', mood: 5 },
  { day: 'Thu', mood: 4 },
  { day: 'Fri', mood: 2 },
  { day: 'Sat', mood: 3 },
  { day: 'Sun', mood: 4 },
];

const MoodSummary: React.FC = () => {
  // Get today's mood from the last entry
  const todayMood = moodData[moodData.length - 1].mood;
  
  // Get the mood icon based on the mood value
  const getMoodIcon = (mood: number) => {
    if (mood >= 4) return <Smile className="text-teal" size={24} />;
    if (mood <= 2) return <Frown className="text-pink" size={24} />;
    return <Meh className="text-gold" size={24} />;
  };
  
  return (
    <div className="card hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-garamond font-semibold">Mood Tracker</h3>
        <div className="flex items-center">
          {getMoodIcon(todayMood)}
          <span className="ml-2 text-charcoal">{
            todayMood >= 4 ? 'Good' : todayMood <= 2 ? 'Low' : 'Neutral'
          }</span>
        </div>
      </div>
      
      <div className="h-32 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={moodData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
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
              formatter={(value) => [`Mood: ${value}`, '']}
            />
            <Line 
              type="monotone" 
              dataKey="mood" 
              stroke="#3c7f87" 
              strokeWidth={2}
              dot={{ fill: '#3c7f87', r: 4 }}
              activeDot={{ fill: '#3c7f87', r: 6, stroke: 'white', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <Link
        to="/mood"
        className="block w-full text-center py-2 text-teal hover:text-teal-dark transition-colors"
      >
        Log Today's Mood
      </Link>
    </div>
  );
};

export default MoodSummary;