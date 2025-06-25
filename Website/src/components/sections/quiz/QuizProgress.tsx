// src/components/quiz/QuizProgress.tsx
import { Progress } from '@/components/ui/progress';
import { categoryIcons } from '@/config/quizConstants';

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
    <Progress value={progress} className="h-2" />
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
        className={`text-xs px-3 py-1 rounded-full transition-colors ${
          autoProgressionEnabled 
            ? 'bg-teal-100 text-teal-700 hover:bg-teal-200' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        {autoProgressionEnabled ? 'Auto-progress: On' : 'Auto-progress: Off'}
      </button>
    </div>
  </div>
);