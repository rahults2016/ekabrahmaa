// src/components/quiz/QuizProgress.tsx
import { Progress } from '@/website/ui/progress';
import { categoryIcons } from '@/data/quizConstants';
import { motion } from 'framer-motion';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
  category: string;
  autoProgressionEnabled: boolean;
  onToggleAutoProgress: () => void;
}

export const QuizProgress = ({
  currentQuestion,
  totalQuestions,
  progress,
  category,
  autoProgressionEnabled,
  onToggleAutoProgress
}: QuizProgressProps) => (
  <div className="relative pt-1 w-full max-w-md mx-auto">
    <div className="relative">
      <Progress value={progress} className="h-3 bg-gradient-to-r from-teal-100 to-pink-100" />
      <motion.div
        className="absolute top-0 left-0 h-3 bg-gradient-to-r from-teal-500 to-pink-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
    
    <div className="flex justify-between mt-2 text-sm text-teal-600">
      <span>Question {currentQuestion + 1} of {totalQuestions}</span>
      <div className="flex items-center">
        {categoryIcons[category as keyof typeof categoryIcons]}
        <span className="ml-1">{category}</span>
      </div>
    </div>
    
    <div className="flex items-center justify-center mt-2">
      <button
        type="button"
        onClick={onToggleAutoProgress}
        className={`text-xs px-3 py-1 rounded-full transition-all duration-300 flex items-center space-x-1 ${
          autoProgressionEnabled 
            ? 'bg-teal-100 text-teal-700 hover:bg-teal-200 shadow-sm' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <span>{autoProgressionEnabled ? 'Auto-progress: On' : 'Auto-progress: Off'}</span>
        {autoProgressionEnabled && (
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-2 h-2 bg-teal-500 rounded-full"
          />
        )}
      </button>
    </div>
  </div>
);