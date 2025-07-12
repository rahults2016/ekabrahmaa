import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplet } from 'lucide-react';

interface WaterIntake {
  date: Date;
  amount: number; // in ml
}

const WaterTracker: React.FC = () => {
  const [intakes, setIntakes] = useState<WaterIntake[]>([]);
  const [amount, setAmount] = useState('');
  const dailyGoal = 2000; // 2L per day

  const todayTotal = intakes
    .filter(intake => 
      new Date(intake.date).toDateString() === new Date().toDateString()
    )
    .reduce((sum, intake) => sum + intake.amount, 0);

  const progress = Math.min((todayTotal / dailyGoal) * 100, 100);

  const handleAddWater = (preset: number) => {
    const newIntake: WaterIntake = {
      date: new Date(),
      amount: preset
    };
    setIntakes([...intakes, newIntake]);
  };

  const handleCustomAmount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    
    const newIntake: WaterIntake = {
      date: new Date(),
      amount: parseInt(amount)
    };
    setIntakes([...intakes, newIntake]);
    setAmount('');
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-garamond font-semibold mb-6">Water Intake</h2>
        
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
              <Droplet size={32} className="text-teal mb-2" />
              <div className="text-2xl font-semibold text-teal">
                {(todayTotal / 1000).toFixed(1)}L
              </div>
              <div className="text-sm text-charcoal-light">
                of {(dailyGoal / 1000)}L goal
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Quick Add Buttons */}
          <div>
            <h3 className="font-medium mb-3">Quick Add</h3>
            <div className="grid grid-cols-3 gap-2">
              {[250, 500, 1000].map((ml) => (
                <button
                  key={ml}
                  onClick={() => handleAddWater(ml)}
                  className="p-3 rounded-lg bg-teal-light/10 hover:bg-teal-light/20 transition-colors"
                >
                  <div className="text-teal font-medium">{ml}ml</div>
                  <div className="text-xs text-charcoal-light">
                    {ml === 250 ? 'Small Glass' : ml === 500 ? 'Large Glass' : 'Bottle'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <form onSubmit={handleCustomAmount}>
            <h3 className="font-medium mb-3">Custom Amount</h3>
            <div className="flex space-x-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input-field flex-1"
                placeholder="Enter amount in ml"
                min="0"
                step="50"
              />
              <button
                type="submit"
                className="btn-primary px-6"
                disabled={!amount}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Today's Log */}
      <div className="card">
        <h3 className="font-medium mb-4">Today's Log</h3>
        <div className="space-y-3">
          {intakes
            .filter(intake => 
              new Date(intake.date).toDateString() === new Date().toDateString()
            )
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .map((intake, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <Droplet size={16} className="text-teal mr-2" />
                  <span>{intake.amount}ml</span>
                </div>
                <span className="text-sm text-charcoal-light">
                  {new Date(intake.date).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WaterTracker;