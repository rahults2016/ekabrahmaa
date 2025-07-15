import React, { useState } from 'react';
import { Calendar, Clock, Share2, Droplet, Flower, Heart, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface CycleDay {
  date: Date;
  type: 'period' | 'ovulation' | 'fertile' | 'none';
  symptoms?: string[];
  notes?: string;
  mood?: number;
  hormoneLevel?: {
    estrogen?: number;
    progesterone?: number;
  };
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
}

const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'Understanding Your Menstrual Cycle Through Ayurveda',
    excerpt: 'Learn how the three doshas influence your cycle and what it means for your well-being.',
    category: 'Ayurveda'
  },
  {
    id: '2',
    title: 'Natural Ways to Balance Hormones',
    excerpt: 'Discover Ayurvedic herbs and practices that support hormonal health.',
    category: 'Wellness'
  }
];

const PeriodTracker: React.FC = () => {
  const [cycleLength, setCycleLength] = useState(28);
  const [lastPeriod, setLastPeriod] = useState<Date | null>(null);
  const [shareWithHealer, setShareWithHealer] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [noteInput, setNoteInput] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const symptomOptions = [
    'Cramps', 'Headache', 'Bloating', 'Fatigue', 'Mood Swings',
    'Breast Tenderness', 'Back Pain', 'Acne', 'Food Cravings'
  ];

  const calculateCycleDays = (): CycleDay[] => {
    if (!lastPeriod) return [];
    
    const days: CycleDay[] = [];
    const start = new Date(lastPeriod);
    
    for (let i = 0; i < cycleLength; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      
      let type: CycleDay['type'] = 'none';
      if (i < 5) type = 'period';
      else if (i >= 12 && i <= 16) type = 'fertile';
      else if (i === 14) type = 'ovulation';
      
      // Calculate hormone levels based on cycle day
      const hormoneLevel = {
        estrogen: calculateEstrogen(i, cycleLength),
        progesterone: calculateProgesterone(i, cycleLength)
      };
      
      days.push({ date, type, hormoneLevel });
    }
    
    return days;
  };

  const calculateEstrogen = (day: number, cycleLength: number): number => {
    if (day < cycleLength / 2) {
      return (day / (cycleLength / 2)) * 100;
    } else {
      return ((cycleLength - day) / (cycleLength / 2)) * 100;
    }
  };

  const calculateProgesterone = (day: number, cycleLength: number): number => {
    if (day < cycleLength / 2) {
      return 20;
    } else {
      return Math.min(((day - cycleLength / 2) / (cycleLength / 2)) * 100, 100);
    }
  };

  const cycleDays = calculateCycleDays();
  const currentPhase = getCurrentPhase(cycleDays, selectedDate);

  function getCurrentPhase(days: CycleDay[], date: Date | null): string {
    if (!date || !lastPeriod) return 'Unknown';
    
    const daysSinceStart = Math.floor((date.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceStart < 5) return 'Menstrual';
    if (daysSinceStart < 12) return 'Follicular';
    if (daysSinceStart < 17) return 'Ovulation';
    return 'Luteal';
  }

  const getDoshaRecommendations = (phase: string): string[] => {
    switch (phase) {
      case 'Menstrual':
        return [];
      case 'Follicular':
        return [];
      case 'Ovulation':
        return [];
      case 'Luteal':
        return [];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      {!showCalendar ? (
        <div className="card bg-pink-light/10 text-center py-8">
          <div className="mb-8">
            <h2 className="text-4xl font-garamond font-semibold mb-2">Period</h2>
            <h2 className="text-5xl font-garamond font-bold mb-4">
              {lastPeriod ? `11 DAYS LEFT` : 'Track Your Cycle'}
            </h2>
            {lastPeriod && (
              <p className="text-xl text-charcoal-light">
                Jun 15 - Next Period
              </p>
            )}
          </div>
          {lastPeriod && (
            <>
              <button
                onClick={() => setShowCalendar(true)}
                className="btn-primary px-12 py-3 text-lg mb-12"
              >
                Period Starts
              </button>
              
              <div>
                <h3 className="text-xl font-medium mb-6">Cycle phase</h3>
                <div className="flex space-x-4 overflow-x-auto pb-4">
                  <div className="flex-shrink-0 w-32 h-32 bg-pink-light rounded-lg p-4 flex flex-col items-center justify-center">
                    <Droplet size={24} className="text-pink mb-2" />
                    <p className="font-medium">Jun 15</p>
                    <p className="text-sm text-charcoal-light">Next Period</p>
                  </div>
                  
                  <div className="flex-shrink-0 w-32 h-32 bg-teal-light/20 rounded-lg p-4 flex flex-col items-center justify-center">
                    <Flower size={24} className="text-teal mb-2" />
                    <p className="font-medium">Jun 26</p>
                    <p className="text-sm text-charcoal-light">Next Fertile</p>
                  </div>
                </div>
                
                <div className="mt-6 bg-white rounded-lg p-4">
                  <h4 className="font-medium mb-2">Today - Cycle Day 20</h4>
                  <p className="text-charcoal-light">
                    MEDIUM - Chance of getting pregnant
                  </p>
                </div>
              </div>
            </>
          )}
          {!lastPeriod && (
            <button
              onClick={() => setShowCalendar(true)}
              className="btn-primary px-12 py-3 text-lg"
            >
              Period Starts
            </button>
          )}
        </div>
      ) : null}
      
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center space-x-4 flex-1">
          <div className="w-12 h-12 rounded-full bg-pink-light/20 flex items-center justify-center">
            <Calendar size={24} className="text-pink" />
          </div>
          <div>
            <h3 className="text-xl font-garamond font-semibold">Period Tracker</h3>
            {lastPeriod && (
              <p className="text-sm text-charcoal-light">
                Last period: {format(lastPeriod, 'MMMM d, yyyy')}
              </p>
            )}
          </div>
        </div>
        
        {!showCalendar && (
          !lastPeriod && (
            <button
              onClick={() => setShowCalendar(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Droplet size={16} />
              <span>Period Starts</span>
            </button>
          )
        )}
        
        <button 
          onClick={() => setShareWithHealer(!shareWithHealer)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            shareWithHealer ? 'bg-teal text-white' : 'bg-gray-100 text-charcoal-light'
          }`}
        >
          <Share2 size={16} />
          <span>Share with Healer</span>
        </button>
      </div>

      {showCalendar ? (<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h4 className="font-medium mb-4">Log Period</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-charcoal-light mb-2">
                Last Period Start Date
              </label>
              <input
                type="date"
                value={lastPeriod instanceof Date ? lastPeriod.toISOString().split('T')[0] : ''}
                onChange={(e) => setLastPeriod(e.target.value ? new Date(e.target.value) : null)}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm text-charcoal-light mb-2">
                Typical Cycle Length
              </label>
              <input
                type="number"
                value={cycleLength}
                onChange={(e) => setCycleLength(parseInt(e.target.value))}
                min="21"
                max="35"
                className="input-field"
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h4 className="font-medium mb-4">Cycle Overview</h4>
          {lastPeriod ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-charcoal-light">Current Phase</span>
                <span className="font-medium text-teal">{currentPhase}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-charcoal-light">Next Period</span>
                <span className="font-medium">
                  {lastPeriod && new Date(lastPeriod.getTime() + cycleLength * 24 * 60 * 60 * 1000)
                    .toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-charcoal-light">Fertile Window</span>
                <span className="font-medium text-teal">
                  {lastPeriod && new Date(lastPeriod.getTime() + 12 * 24 * 60 * 60 * 1000)
                    .toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  {' - '}
                  {lastPeriod && new Date(lastPeriod.getTime() + 16 * 24 * 60 * 60 * 1000)
                    .toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-charcoal-light">Ovulation</span>
                <span className="font-medium text-pink">
                  {lastPeriod && new Date(lastPeriod.getTime() + 14 * 24 * 60 * 60 * 1000)
                    .toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-charcoal-light text-sm">
              Log your last period to see predictions
            </p>
          )}
        </div>
      </div>) : (
        !lastPeriod && (
          <div className="card">
            <div className="text-center py-8">
              <p className="text-charcoal-light">
                Click "Period Starts" to begin tracking your cycle
              </p>
            </div>
          </div>
        )
      )}

      {showCalendar && lastPeriod && (
        <>
          <div className="card">
            <h4 className="font-medium mb-4">Cycle Calendar</h4>
            <div className="mb-4 flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <Droplet size={16} className="text-pink mr-1" />
                <span>Period</span>
              </div>
              <div className="flex items-center">
                <Flower size={16} className="text-teal mr-1" />
                <span>Fertile Window</span>
              </div>
              <div className="flex items-center">
                <Heart size={16} className="text-pink mr-1" />
                <span>Ovulation</span>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {cycleDays.map((day, index) => (
                <motion.button
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                  onClick={() => setSelectedDate(day.date)}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center relative ${
                    selectedDate?.toDateString() === day.date.toDateString()
                      ? 'ring-2 ring-teal'
                      : ''
                  } ${
                    day.type === 'period' ? 'bg-pink-light text-pink' :
                    day.type === 'ovulation' ? 'bg-teal-light text-teal' :
                    day.type === 'fertile' ? 'bg-teal-light/20 text-teal' :
                    'bg-gray-100 text-charcoal-light'
                  }`}
                >
                  <span className="text-sm">{day.date.getDate()}</span>
                  {day.type === 'period' && <Droplet size={12} className="absolute bottom-1" />}
                  {day.type === 'fertile' && <Flower size={12} className="absolute bottom-1" />}
                  {day.type === 'ovulation' && <Heart size={12} className="absolute bottom-1" />}
                </motion.button>
              ))}
            </div>
          </div>

          {selectedDate && (
            <div className="card">
              <h4 className="font-medium mb-4">Daily Log</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-charcoal-light mb-2">
                    How are you feeling today?
                  </label>
                  <textarea
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder="Add notes about your day..."
                    className="input-field h-24 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-charcoal-light mb-2">
                    Symptoms
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {symptomOptions.map(symptom => (
                      <button
                        key={symptom}
                        onClick={() => setSymptoms(prev => 
                          prev.includes(symptom)
                            ? prev.filter(s => s !== symptom)
                            : [...prev, symptom]
                        )}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          symptoms.includes(symptom)
                            ? 'bg-teal text-white'
                            : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                        }`}
                      >
                        {symptom}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Hormone Trends</h5>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-24 text-sm text-charcoal-light">Estrogen</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-teal rounded-full"
                          style={{ width: `${cycleDays[0]?.hormoneLevel?.estrogen || 0}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-sm text-charcoal-light">Progesterone</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-pink rounded-full"
                          style={{ width: `${cycleDays[0]?.hormoneLevel?.progesterone || 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Related Articles</h4>
              <button className="text-sm text-teal hover:text-teal-dark">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {sampleArticles.map(article => (
                <div key={article.id} className="flex items-start">
                  <BookOpen size={20} className="text-teal mt-1 mr-3" />
                  <div>
                    <h5 className="font-medium mb-1">{article.title}</h5>
                    <p className="text-sm text-charcoal-light">{article.excerpt}</p>
                    <span className="text-xs text-teal mt-2 inline-block">
                      {article.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PeriodTracker;