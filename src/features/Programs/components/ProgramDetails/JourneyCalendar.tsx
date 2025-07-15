// src/features/programs/components/ProgramDetails/JourneyCalendar.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Flower } from 'lucide-react';

interface CalendarDay {
  date: Date;
  day: number;
  isCompleted: boolean;
  isCurrent: boolean;
}

interface JourneyCalendarProps {
  days: CalendarDay[];
  currentDay: number;
  duration: number;
}

const JourneyCalendar: React.FC<JourneyCalendarProps> = ({ 
  days, 
  currentDay,
}) => {
  return (
    <div className="card">
      <h4 className="text-lg font-medium mb-4">Your Journey Calendar</h4>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm text-charcoal-light font-medium py-2">
            {day}
          </div>
        ))}
    
        {/* Add empty cells for proper calendar alignment */}
        {Array.from({ length: days[0].date.getDay() }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
    
        {days.map((day) => (
          <div
            key={day.day}
            className={`aspect-square rounded-lg flex flex-col items-center justify-center relative ${
              day.isCompleted
                ? 'bg-teal text-white'
                : day.isCurrent
                  ? 'bg-teal-light/30 text-teal border-2 border-teal'
                  : 'bg-gray-100 text-charcoal-light'
            }`}
          >
            <span className="text-xs mb-1">
              {day.date.getDate()}
            </span>
            <span className="text-[10px]">
              Day {day.day}
            </span>
            {day.isCompleted && (
              <motion.div 
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={`absolute bottom-1 ${day.day === currentDay ? 'text-teal' : 'text-pink'}`}
              >
                <Flower 
                  size={14} 
                  className={`animate-lotus-bloom ${
                    day.day === currentDay ? '' : 'opacity-70'
                  }`}
                />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JourneyCalendar;