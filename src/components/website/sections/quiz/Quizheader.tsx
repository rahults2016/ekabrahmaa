// src/components/quiz/QuizHeader.tsx
import { motion } from 'framer-motion';

interface QuizHeaderProps {
  title: string;
  subtitle: string;
}

export const QuizHeader = ({ title, subtitle }: QuizHeaderProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center mb-12"
  >
    <h1 className="text-4xl font-serif font-bold text-teal-900 mb-4">
      {title}
    </h1>
    <p className="text-xl text-teal-700 mb-6">
      {subtitle}
    </p>
  </motion.div>
);