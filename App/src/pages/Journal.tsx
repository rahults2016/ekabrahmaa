import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle, Edit, BookOpen, Moon } from 'lucide-react';
import JournalPrompt from '../components/journal/JournalPrompt';
import DreamLog from '../components/journal/DreamLog';

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  prompt?: string;
}

// Sample journal entries
const sampleEntries: JournalEntry[] = [
  {
    id: '1',
    date: 'April 26, 2025',
    content: 'Today I felt more balanced than yesterday. The morning meditation helped center my thoughts, and I noticed less anxiety throughout the day. My Pitta tendencies were more in check.',
    prompt: 'How did your morning practice affect your day?'
  },
  {
    id: '2',
    date: 'April 25, 2025',
    content: 'Had trouble sleeping last night. Feeling a bit irritable today, classic sign of my Pitta imbalance. Need to focus on cooling practices tomorrow.',
    prompt: 'Reflect on any imbalances you noticed today.'
  },
  {
    id: '3',
    date: 'April 24, 2025',
    content: 'The new breathing technique Dr. Sharma taught me is making a noticeable difference in my energy levels. I feel more grounded and present.',
    prompt: 'What new practice has positively affected you?'
  }
];

// Journal prompts
const journalPrompts = [
  'What are you grateful for today?',
  'How did your morning practice affect your energy today?',
  'Reflect on a moment of peace you experienced today.',
  'What emotions have been most present for you today?',
  'How did you nurture your body today?'
];

const Journal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(sampleEntries);
  const [activePrompt, setActivePrompt] = useState<string>(journalPrompts[0]);
  const [viewMode, setViewMode] = useState<'write' | 'history' | 'dreams'>('write');
  
  const handleSaveEntry = (content: string) => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      content,
      prompt: activePrompt
    };
    
    setEntries([newEntry, ...entries]);
    
    // Choose a new random prompt
    const newPromptIndex = Math.floor(Math.random() * journalPrompts.length);
    setActivePrompt(journalPrompts[newPromptIndex]);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Journal tabs */}
      <div className="flex justify-center mb-6">
        <div className="bg-white rounded-lg shadow-sm flex p-1">
          <button
            onClick={() => setViewMode('write')}
            className={`px-6 py-2 rounded-lg transition-all ${
              viewMode === 'write'
                ? 'bg-teal text-white'
                : 'text-charcoal hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center">
              <Edit size={18} className="mr-2" />
              Journal
            </div>
          </button>
          
          <button
            onClick={() => setViewMode('dreams')}
            className={`px-6 py-2 rounded-lg transition-all ${
              viewMode === 'dreams'
                ? 'bg-teal text-white'
                : 'text-charcoal hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center">
              <Moon size={18} className="mr-2" />
              Dreams
            </div>
          </button>

          <button
            onClick={() => setViewMode('history')}
            className={`px-6 py-2 rounded-lg transition-all ${
              viewMode === 'history'
                ? 'bg-teal text-white'
                : 'text-charcoal hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center">
              <BookOpen size={18} className="mr-2" />
              History
            </div>
          </button>
        </div>
      </div>
      
      {viewMode === 'write' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <JournalPrompt prompt={activePrompt} onSave={handleSaveEntry} />
        </motion.div>
      ) : viewMode === 'dreams' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DreamLog onSave={(entry) => console.log('Dream entry:', entry)} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-garamond font-semibold mb-6">
            Your Journal History
          </h2>
          
          <div className="space-y-6">
            {entries.map((entry) => (
              <div 
                key={entry.id} 
                className="card hover:shadow-lg border-l-4 border-teal transition-all"
              >
                <div className="flex items-center mb-3">
                  <Calendar size={18} className="text-teal mr-2" />
                  <span className="text-charcoal-light text-sm">{entry.date}</span>
                </div>
                
                {entry.prompt && (
                  <div className="bg-teal-light/10 p-3 rounded-lg mb-3 text-teal">
                    <p className="italic">{entry.prompt}</p>
                  </div>
                )}
                
                <p className="text-charcoal whitespace-pre-line">{entry.content}</p>
                
                <div className="flex justify-end mt-4">
                  <button className="text-sm text-teal hover:text-teal-dark transition-colors">
                    Share with Healer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Journal;