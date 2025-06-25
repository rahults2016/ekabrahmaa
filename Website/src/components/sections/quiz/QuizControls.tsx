// src/components/quiz/QuizControls.tsx
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

interface QuizControlsProps {
  currentQuestion: number;
  totalQuestions: number;
  isAnimating: boolean;
  handlePrevious: () => void;
  handleNext: () => void;
  isSubmitting: boolean;
  autoProgressionEnabled: boolean;
  selectedAnswer: string;
}

export const QuizControls = ({
  currentQuestion,
  totalQuestions,
  isAnimating,
  handlePrevious,
  handleNext,
  isSubmitting,
  autoProgressionEnabled,
  selectedAnswer
}: QuizControlsProps) => (
  <div className="flex justify-between pt-6">
    <Button
      variant="outline"
      onClick={handlePrevious}
      disabled={currentQuestion === 0 || isAnimating}
      className="flex items-center"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Previous
    </Button>

    {!autoProgressionEnabled && (
      <Button
        onClick={handleNext}
        disabled={!selectedAnswer || isSubmitting || isAnimating}
        className="bg-teal-600 hover:bg-teal-700 text-white flex items-center"
      >
        {currentQuestion === totalQuestions - 1 ? (
          isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Calculating...
            </>
          ) : (
            <>
              Complete Quiz
              <CheckCircle className="w-4 h-4 ml-2" />
            </>
          )
        ) : (
          <>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    )}
  </div>
);