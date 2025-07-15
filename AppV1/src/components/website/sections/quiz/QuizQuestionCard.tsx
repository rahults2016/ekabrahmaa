// src/components/quiz/QuizQuestionCard.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/website/ui/card';
import { QuizOption } from './QuizOption';
import { QuizControls } from './QuizControls';

interface QuizQuestionCardProps {
  question: string;
  options: { text: string; dosha: string }[];
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  currentQuestion: number;
  totalQuestions: number;
  isAnimating: boolean;
  direction: number;
  handlePrevious: () => void;
  handleNext: () => void;
  isSubmitting: boolean;
  autoProgressionEnabled: boolean;
  countdown: number;
  isCountingDown: boolean;
}

export const QuizQuestionCard = ({
  question,
  options,
  selectedAnswer,
  setSelectedAnswer,
  currentQuestion,
  totalQuestions,
  isAnimating,
  direction,
  handlePrevious,
  handleNext,
  isSubmitting,
  autoProgressionEnabled,
  countdown,
  isCountingDown
}: QuizQuestionCardProps) => (
  <Card className="border-teal-200 shadow-xl bg-white/80 backdrop-blur-sm">
    <CardHeader>
      <CardTitle className="text-xl font-serif text-teal-900 flex items-center">
        <div className="flex items-center flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={question}
              initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              {question}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Countdown Timer */}
        {isCountingDown && selectedAnswer && autoProgressionEnabled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center space-x-2 ml-4"
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full border-2 border-teal-200"></div>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-teal-600"
                style={{
                  background: `conic-gradient(from 0deg, #0d9488 ${((3 - countdown) / 3) * 360}deg, transparent 0deg)`
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-teal-700">{countdown}</span>
              </div>
            </div>
            <span className="text-xs text-teal-600">Auto-advancing...</span>
          </motion.div>
        )}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={question}
          initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-3">
            {options.map((option, index) => (
              <QuizOption
                key={index}
                option={option}
                index={index}
                selectedAnswer={selectedAnswer}
                setSelectedAnswer={setSelectedAnswer}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <QuizControls
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        isAnimating={isAnimating}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        isSubmitting={isSubmitting}
        autoProgressionEnabled={autoProgressionEnabled}
        selectedAnswer={selectedAnswer}
      />
    </CardContent>
  </Card>
);