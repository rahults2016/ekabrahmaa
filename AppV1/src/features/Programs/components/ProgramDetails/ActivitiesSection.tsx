// src/features/programs/components/ProgramDetails/ActivitiesSection.tsx
import React from 'react';
import { Flower, Moon } from 'lucide-react';
import type { Program } from '../../types';

interface ActivitiesSectionProps {
  program: Program;
  activityStatus: {[key: string]: boolean};
  onActivityComplete: (activityName: string) => void;
}

const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ 
  program, 
  activityStatus,
  onActivityComplete
}) => {
  return (
    <div className="card">
      <h4 className="text-xl font-garamond font-semibold mb-6">Today's Activities</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Movement & Breath */}
        <div>
          <h5 className="font-medium mb-4">Movement & Breath</h5>
          <div className="space-y-3">
            {program.activities?.yoga.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-teal-light/10 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center text-white mr-3">
                    <Flower size={16} />
                  </div>
                  <span>{activity}</span>
                </div>
                <button
                  onClick={() => onActivityComplete(activity)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    activityStatus[activity]
                      ? 'bg-teal text-white'
                      : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                  }`}
                >
                  {activityStatus[activity] ? 'Completed' : 'Mark Done'}
                </button>
              </div>
            ))}
            {program.activities?.meditation.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-pink-light/20 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-pink flex items-center justify-center text-white mr-3">
                    <Moon size={16} />
                  </div>
                  <span>{activity}</span>
                </div>
                <button
                  onClick={() => onActivityComplete(activity)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    activityStatus[activity]
                      ? 'bg-pink text-white'
                      : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                  }`}
                >
                  {activityStatus[activity] ? 'Completed' : 'Mark Done'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Diet Plan */}
        <div>
          <h5 className="font-medium mb-4">Today's Diet Plan</h5>
          <div className="space-y-4">
            <div className="p-3 bg-gold-light/20 rounded-lg">
              <h6 className="font-medium mb-2">Breakfast</h6>
              <ul className="space-y-2">
                {program.activities?.diet.breakfast.map((item, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{item}</span>
                    <button
                      onClick={() => onActivityComplete(`breakfast-${item}`)}
                      className={`px-3 py-1 rounded-full text-xs ${
                        activityStatus[`breakfast-${item}`]
                          ? 'bg-gold text-white'
                          : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                      }`}
                    >
                      {activityStatus[`breakfast-${item}`] ? 'Taken' : 'Log'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-3 bg-gold-light/20 rounded-lg">
              <h6 className="font-medium mb-2">Lunch</h6>
              <ul className="space-y-2">
                {program.activities?.diet.lunch.map((item, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{item}</span>
                    <button
                      onClick={() => onActivityComplete(`lunch-${item}`)}
                      className={`px-3 py-1 rounded-full text-xs ${
                        activityStatus[`lunch-${item}`]
                          ? 'bg-gold text-white'
                          : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                      }`}
                    >
                      {activityStatus[`lunch-${item}`] ? 'Taken' : 'Log'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-3 bg-gold-light/20 rounded-lg">
              <h6 className="font-medium mb-2">Dinner</h6>
              <ul className="space-y-2">
                {program.activities?.diet.dinner.map((item, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{item}</span>
                    <button
                      onClick={() => onActivityComplete(`dinner-${item}`)}
                      className={`px-3 py-1 rounded-full text-xs ${
                        activityStatus[`dinner-${item}`]
                          ? 'bg-gold text-white'
                          : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                      }`}
                    >
                      {activityStatus[`dinner-${item}`] ? 'Taken' : 'Log'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesSection;