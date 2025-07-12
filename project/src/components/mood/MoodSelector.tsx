import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower } from 'lucide-react';

interface MoodSelectorProps {
  selectedMood: number;
  setSelectedMood: (mood: number) => void;
}

interface MoodFeedback {
  message: string;
  suggestion: string;
  ayurvedic: string;
  color: string;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, setSelectedMood }) => {
  const [showAyurvedicTip, setShowAyurvedicTip] = useState(false);
  
  const moods = [
    { 
      value: 1, 
      icon: '😢', 
      label: 'Very Low',
      feedback: {
        message: "I hear you. Today feels heavy.",
        suggestion: "Take a moment to ground yourself",
        ayurvedic: "Try Vata-pacifying practices like warm oil massage",
        color: "text-pink"
      }
    },
    { 
      value: 2, 
      icon: '😕', 
      label: 'Low',
      feedback: {
        message: "It's okay to have down days",
        suggestion: "Gentle movement can help shift energy",
        ayurvedic: "Consider warm herbal tea with calming herbs",
        color: "text-pink-light"
      }
    },
    { 
      value: 3, 
      icon: '😊', 
      label: 'Neutral',
      feedback: {
        message: "Finding your balance",
        suggestion: "Notice what feels steady today",
        ayurvedic: "Practice balanced breathing (Sama Vritti)",
        color: "text-charcoal-light"
      }
    },
    { 
      value: 4, 
      icon: '😃', 
      label: 'Good',
      feedback: {
        message: "Your energy is bright today",
        suggestion: "Build on this positive momentum",
        ayurvedic: "Perfect time for rejuvenating practices",
        color: "text-gold"
      }
    },
    { 
      value: 5, 
      icon: '🤗', 
      label: 'Excellent',
      feedback: {
        message: "You're radiating wellness!",
        suggestion: "Share your positive energy",
        ayurvedic: "Maintain balance with cooling practices",
        color: "text-teal"
      }
    },
  ];
  
  const selectedMoodData = moods.find(mood => mood.value === selectedMood);
  
  useEffect(() => {
    if (selectedMoodData) {
      const timer = setTimeout(() => setShowAyurvedicTip(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedMood]);

  return (
    <div className="mb-8">
      <motion.h3 
        className="text-2xl font-garamond font-semibold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        How are you feeling today?
      </motion.h3>
      
      <div className="flex justify-between items-center max-w-md mx-auto mb-8">
        {moods.map((mood) => (
          <motion.button
            key={mood.value}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center p-4 rounded-xl transition-all ${
              selectedMood === mood.value
                ? 'bg-gradient-to-br from-teal-light/20 to-pink-light/20 transform scale-110 shadow-lg'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => {
              setSelectedMood(mood.value);
              setShowAyurvedicTip(false);
            }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ 
                rotate: selectedMood === mood.value ? 360 : 0,
                scale: selectedMood === mood.value ? [1, 1.2, 1] : 1
              }}
              transition={{ duration: 0.5 }}
              className="mb-3 relative"
            >
              <span className="text-4xl">{mood.icon}</span>
              {selectedMood === mood.value && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -bottom-1 -right-1"
                >
                  <Flower className="text-teal" size={16} />
                </motion.div>
              )}
            </motion.div>
            <span className={`text-xs ${
              selectedMood === mood.value ? 'text-teal font-medium' : 'text-charcoal-light'
            }`}>
              {mood.label}
            </span>
          </motion.button>
        ))}
      </div>
      
      <div className="mt-6 relative">
        <input
          type="range"
          min="1"
          max="5"
          value={selectedMood}
          onChange={(e) => {
            setSelectedMood(parseInt(e.target.value));
            setShowAyurvedicTip(false);
          }}
          className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-teal"
        />
        <div className="absolute -top-2 left-0 right-0 flex justify-between px-1">
          {moods.map((mood) => (
            <motion.div
              key={mood.value}
              animate={{
                scale: selectedMood === mood.value ? 1.2 : 1,
                opacity: selectedMood === mood.value ? 1 : 0.5
              }}
              className="w-1 h-1 rounded-full bg-teal"
            />
          ))}
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {selectedMoodData && (
          <motion.div
            key={selectedMoodData.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 text-center space-y-4"
          >
            <motion.p 
              className={`text-lg font-medium ${selectedMoodData.feedback.color}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {selectedMoodData.feedback.message}
            </motion.p>
            
            <motion.p 
              className="text-charcoal-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {selectedMoodData.feedback.suggestion}
            </motion.p>

            <AnimatePresence>
              {showAyurvedicTip && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 bg-teal-light/10 rounded-lg p-4"
                >
                  <p className="text-sm text-teal">
                    <span className="font-medium">Ayurvedic Wisdom: </span>
                    {selectedMoodData.feedback.ayurvedic}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MoodSelector;