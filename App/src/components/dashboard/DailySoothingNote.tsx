import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, BookOpen } from 'lucide-react';

interface SoothingNote {
  theme: string;
  message: string;
  icon: string;
}

const soothingNotes: SoothingNote[] = [
  { theme: 'Morning Intention', message: 'Breathe gently. Today is yours to realign.', icon: '🌅' },
  { theme: 'Body Awareness', message: 'Your body speaks in whispers. Tune in with kindness.', icon: '🌸' },
  { theme: 'Mindfulness', message: 'Pause. In this stillness, healing flows.', icon: '🔔' },
  { theme: 'Evening Calm', message: "You don't need to fix everything today. Rest is medicine.", icon: '🌙' },
  { theme: 'Hydration Reminder', message: 'A sip of warm water. A moment of nourishment.', icon: '💧' },
  { theme: 'Nature Sync', message: 'Like the seasons, your rhythm is sacred. Trust your pace.', icon: '🌿' },
  { theme: 'Self-Compassion', message: "You're not behind. You're unfolding — beautifully.", icon: '💖' },
  { theme: 'Joy in Simplicity', message: "A calm breath. A smile. That's enough for now.", icon: '🌼' },
  { theme: 'Agni Reminder', message: 'Your digestive fire fuels your life-force. Honor it with presence.', icon: '🔥' },
  { theme: 'Progress Reminder', message: "Small steps. Soft wins. You are healing, even if you can't feel it yet.", icon: '✨' }
];

const DailySoothingNote: React.FC = () => {
  const [currentNote, setCurrentNote] = useState<SoothingNote>(soothingNotes[0]);
  const [saved, setSaved] = useState(false);

  // Get random note on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * soothingNotes.length);
    const note = soothingNotes[randomIndex];
    setCurrentNote(note);
  }, []);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card hover:shadow-brand-lg bg-gradient-to-br from-teal-50/80 via-cream-100/80 to-rose-50/80 overflow-hidden relative"
    >
      {/* Decorative background elements */}
      <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-teal-100/30 blur-2xl"></div>
      <div className="absolute -left-8 -bottom-8 w-24 h-24 rounded-full bg-rose-100/30 blur-xl"></div>

      <div className="relative">
        <div className="flex items-center mb-4">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-4xl mr-3"
          >
            {currentNote.icon}
          </motion.span>
          <div>
            <h3 className="text-xl font-garamond font-semibold text-teal-600">{currentNote.theme}</h3>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl font-garamond text-slate-800 mb-6"
        >
          {currentNote.message}
        </motion.p>

        <div className="flex justify-between items-center">
          <button
            onClick={handleSave}
            className="flex items-center text-sm text-teal-600 hover:text-teal-700 transition-colors"
          >
            {saved ? (
              <>
                <Heart size={16} className="mr-1 fill-current" />
                Saved to Journal
              </>
            ) : (
              <>
                <Heart size={16} className="mr-1" />
                Save to Journal
              </>
            )}
          </button>

          <button
            onClick={() => window.location.href = '/journal'}
            className="flex items-center text-sm text-teal-600 hover:text-teal-700 transition-colors"
          >
            <BookOpen size={16} className="mr-1" />
            Open Journal
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DailySoothingNote;