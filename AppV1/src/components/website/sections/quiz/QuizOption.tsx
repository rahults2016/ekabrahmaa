// src/components/quiz/QuizOption.tsx
import { motion } from 'framer-motion';
import { Label } from '@/website/ui/label';
import { CheckCircle } from 'lucide-react';

interface QuizOptionProps {
  option: { text: string; dosha: string };
  index: number;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
}

const getDoshaColors = (dosha: string) => {
  switch (dosha) {
    case 'vata':
      return {
        border: 'border-blue-300 hover:border-blue-400',
        bg: 'bg-blue-50 hover:bg-blue-100',
        selected: 'border-blue-500 bg-blue-100',
        icon: 'text-blue-600'
      };
    case 'pitta':
      return {
        border: 'border-red-300 hover:border-red-400',
        bg: 'bg-red-50 hover:bg-red-100',
        selected: 'border-red-500 bg-red-100',
        icon: 'text-red-600'
      };
    case 'kapha':
      return {
        border: 'border-green-300 hover:border-green-400',
        bg: 'bg-green-50 hover:bg-green-100',
        selected: 'border-green-500 bg-green-100',
        icon: 'text-green-600'
      };
      
    default:
      return {
        border: 'border-teal-300 hover:border-teal-400',
        bg: 'bg-teal-50 hover:bg-teal-100',
        selected: 'border-teal-500 bg-teal-100',
        icon: 'text-teal-600'
      };
  }
};

export const QuizOption = ({ option, index, selectedAnswer, setSelectedAnswer }: QuizOptionProps) => {
  const isSelected = selectedAnswer === option.text;
  const colors = getDoshaColors(option.dosha);
  
  const handleClick = () => {
    setSelectedAnswer(option.text);
  };
  
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative flex items-center space-x-3 p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer transform ${
        isSelected 
          ? `${colors.selected} shadow-md scale-105` 
          : `border-gray-200 ${colors.bg} ${colors.border} hover:shadow-sm`
      }`}
    >
      <input
        type="radio"
        id={`option-${index}`}
        value={option.text}
        checked={isSelected}
        onChange={handleClick}
        className={`w-4 h-4 border-gray-300 focus:ring-2 ${
          option.dosha === 'vata' ? 'text-blue-600 focus:ring-blue-500' :
          option.dosha === 'pitta' ? 'text-red-600 focus:ring-red-500' :
          'text-green-600 focus:ring-green-500'
        }`}
      />
      
      <Label 
        htmlFor={`option-${index}`}
        className="flex-1 cursor-pointer text-gray-700"
      >
        {option.text}
      </Label>
      
      {/* Dosha Element Indicator */}
      <div className={`w-3 h-3 rounded-full ${
        option.dosha === 'vata' ? 'bg-gradient-to-r from-blue-400 to-purple-400' :
        option.dosha === 'pitta' ? 'bg-gradient-to-r from-red-400 to-orange-400' :
        'bg-gradient-to-r from-green-400 to-teal-400'
      } opacity-60`} />
      
      {/* Selected Indicator */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <CheckCircle className={`w-5 h-5 ${colors.icon}`} />
        </motion.div>
      )}
      
      {/* Subtle glow effect for selected option */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
        />
      )}
    </motion.div>
  );
};