// src/components/quiz/QuizQuestionCard.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
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
  autoProgressionEnabled
}: QuizQuestionCardProps) => (
  <Card className="border-teal-200 shadow-xl bg-white/80 backdrop-blur-sm">
    <CardHeader>
      <CardTitle className="text-xl font-serif text-teal-900 flex items-center">
        <Sparkles className="w-5 h-5 mr-2 text-pink-500" />
        <AnimatePresence mode="wait">
          <motion.div
            key={question}
            initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
            transition={{ duration: 0.3 }}
          >
            {question}
          </motion.div>
        </AnimatePresence>
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