// src/components/quiz/QuizOption.tsx
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';

interface QuizOptionProps {
  option: { text: string; dosha: string };
  index: number;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
}

export const QuizOption = ({ option, index, selectedAnswer, setSelectedAnswer }: QuizOptionProps) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:bg-teal-50 ${
      selectedAnswer === option.text 
        ? 'border-teal-500 bg-teal-50' 
        : 'border-gray-200 hover:border-teal-300'
    }`}
    onClick={() => setSelectedAnswer(option.text)}
  >
    <input
      type="radio"
      value={option.text}
      checked={selectedAnswer === option.text}
      onChange={() => setSelectedAnswer(option.text)}
      className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
    />
    <Label 
      htmlFor={`option-${index}`}
      className="flex-1 cursor-pointer text-gray-700"
    >
      {option.text}
    </Label>
  </motion.div>
);