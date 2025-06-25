import { motion } from 'framer-motion';
import { doshaIcons } from '@/config/quizConstants';

interface QuizTrendIndicatorProps {
  currentTrend: 'vata' | 'pitta' | 'kapha' | null;
  currentQuestion: number;
}

export const QuizTrendIndicator = ({ currentTrend, currentQuestion }: QuizTrendIndicatorProps) => {
  if (!currentTrend || currentQuestion <= 3) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-teal-100 shadow-sm"
    >
      <div className="flex items-center justify-center space-x-2">
        <span className="text-sm text-teal-700">Current trend:</span>
        <div className="flex items-center space-x-1">
          {doshaIcons[currentTrend]}
          <span className="font-medium text-sm">
            {currentTrend === 'vata' ? 'Vata' : currentTrend === 'pitta' ? 'Pitta' : 'Kapha'}
          </span>
        </div>
        <span className="text-xs text-teal-600">(This may change as you answer more questions)</span>
      </div>
    </motion.div>
  );
};