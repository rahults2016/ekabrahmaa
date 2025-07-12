import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    dosha: 'vata' | 'pitta' | 'kapha';
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "How would you describe your body frame?",
    options: [
      { text: "Thin, light, tall or short", dosha: "vata" },
      { text: "Medium, muscular, athletic", dosha: "pitta" },
      { text: "Large, solid, well-built", dosha: "kapha" }
    ]
  },
  {
    id: 2,
    text: "What best describes your skin?",
    options: [
      { text: "Dry, rough, or thin", dosha: "vata" },
      { text: "Warm, reddish, sensitive", dosha: "pitta" },
      { text: "Smooth, thick, moist", dosha: "kapha" }
    ]
  },
  {
    id: 3,
    text: "How would you describe your typical energy levels?",
    options: [
      { text: "Variable, comes in bursts", dosha: "vata" },
      { text: "Strong but moderate", dosha: "pitta" },
      { text: "Steady but slow to start", dosha: "kapha" }
    ]
  },
  // Add more questions as needed
];

const PrakritiQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const navigate = useNavigate();
  const { updateProfile } = useAuth();
  
  const handleAnswer = async (dosha: string) => {
    const newAnswers = [...answers, dosha];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate dominant dosha
      const doshaCounts = newAnswers.reduce((acc, dosha) => {
        acc[dosha] = (acc[dosha] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const dominantDosha = Object.entries(doshaCounts)
        .sort(([,a], [,b]) => b - a)[0][0];
      
      // Save the dominant dosha to user profile
      try {
        await updateProfile({ dominantDosha });
        // Navigate to dashboard or appropriate next page
        navigate('/dashboard');
      } catch (error) {
        console.error('Error updating profile with dosha:', error);
        // Still navigate even if update fails
        navigate('/dashboard');
      }
    }
  };
  
  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    } else {
      navigate(-1); // Go back to previous page
    }
  };
  
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <button 
            onClick={handleBack}
            className="text-charcoal-light hover:text-teal flex items-center"
          >
            <ArrowLeft size={20} className="mr-1" />
            Back
          </button>
          <span className="text-sm text-charcoal-light">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-teal"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
      
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-garamond font-semibold text-charcoal-dark mb-6">
          {questions[currentQuestion].text}
        </h2>
        
        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.dosha)}
              className="w-full p-4 text-left bg-white border-2 border-gray-200 rounded-lg hover:border-teal hover:bg-teal-light/10 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-charcoal-dark group-hover:text-teal">
                  {option.text}
                </span>
                <ArrowRight 
                  size={20} 
                  className="text-gray-400 group-hover:text-teal transition-colors" 
                />
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PrakritiQuiz;