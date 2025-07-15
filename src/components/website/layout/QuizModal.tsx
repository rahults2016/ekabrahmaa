import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Sparkles,
  Moon,
  Sun,
  Droplets
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "How would you describe your body frame?",
    options: [
      { text: "Thin, light, find it hard to gain weight", dosha: "vata" },
      { text: "Medium build, well-proportioned", dosha: "pitta" },
      { text: "Larger frame, gain weight easily", dosha: "kapha" }
    ]
  },
  {
    id: 2,
    question: "How do you typically feel in cold weather?",
    options: [
      { text: "I feel cold easily and need warm clothing", dosha: "vata" },
      { text: "I'm comfortable but prefer moderate temperatures", dosha: "pitta" },
      { text: "I love it and feel energized", dosha: "kapha" }
    ]
  },
  {
    id: 3,
    question: "How would you describe your energy levels?",
    options: [
      { text: "Quick bursts of energy, then I need rest", dosha: "vata" },
      { text: "Steady and sustained throughout the day", dosha: "pitta" },
      { text: "Slow to start but can maintain energy for long periods", dosha: "kapha" }
    ]
  }
];

export function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(quizQuestions.length).fill(''));
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({ vata: 0, pitta: 0, kapha: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentQuestion(0);
      setAnswers(Array(quizQuestions.length).fill(''));
      setSelectedAnswer('');
      setShowResults(false);
      setResults({ vata: 0, pitta: 0, kapha: 0 });
      setIsSubmitting(false);
      setIsAnimating(false);
    }
  }, [isOpen]);

  // Close modal with escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  // Handle click outside to close
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && target.classList.contains('modal-overlay')) {
        onClose();
      }
    };

    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [isOpen, onClose]);

  const handleNext = () => {
    if (!selectedAnswer) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(newAnswers[currentQuestion + 1] || '');
        setIsAnimating(false);
      }, 300);
    } else {
      setIsSubmitting(true);
      calculateResults(newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(prev => prev - 1);
        setSelectedAnswer(answers[currentQuestion - 1] || '');
        setIsAnimating(false);
      }, 300);
    }
  };

  const calculateResults = (allAnswers: string[]) => {
    const doshaScores = { vata: 0, pitta: 0, kapha: 0 };
    
    allAnswers.forEach((answer, index) => {
      if (answer) {
        const question = quizQuestions[index];
        const selectedOption = question.options.find(opt => opt.text === answer);
        if (selectedOption) {
          doshaScores[selectedOption.dosha as keyof typeof doshaScores]++;
        }
      }
    });

    const totalAnswers = Object.values(doshaScores).reduce((sum, score) => sum + score, 0);
    
    const percentages = {
      vata: Math.round((doshaScores.vata / totalAnswers) * 100),
      pitta: Math.round((doshaScores.pitta / totalAnswers) * 100),
      kapha: Math.round((doshaScores.kapha / totalAnswers) * 100)
    };

    // Ensure percentages add up to 100%
    const totalPercentage = percentages.vata + percentages.pitta + percentages.kapha;
    if (totalPercentage !== 100) {
      const diff = 100 - totalPercentage;
      const dominantDosha = Object.entries(percentages).reduce((a, b) => a[1] > b[1] ? a : b)[0] as keyof typeof percentages;
      percentages[dominantDosha] += diff;
    }

    setResults(percentages);
    setShowResults(true);
    setIsSubmitting(false);
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  if (!isOpen) return null;

  const getDoshaIcon = (dosha: string) => {
    switch (dosha) {
      case 'vata':
        return <Moon className="w-6 h-6 text-blue-500" />;
      case 'pitta':
        return <Sun className="w-6 h-6 text-red-500" />;
      case 'kapha':
        return <Droplets className="w-6 h-6 text-green-500" />;
      default:
        return null;
    }
  };

  const getDoshaColor = (dosha: string) => {
    switch (dosha) {
      case 'vata':
        return 'from-blue-500 to-purple-500';
      case 'pitta':
        return 'from-red-500 to-orange-500';
      case 'kapha':
        return 'from-green-500 to-teal-500';
      default:
        return '';
    }
  };

  const getDoshaDescription = (dosha: string) => {
    switch (dosha) {
      case 'vata':
        return 'Creative, energetic, and quick. When balanced: adaptable and lively. When imbalanced: anxious and scattered.';
      case 'pitta':
        return 'Focused, ambitious, and precise. When balanced: productive and sharp. When imbalanced: irritable and intense.';
      case 'kapha':
        return 'Steady, nurturing, and calm. When balanced: grounded and compassionate. When imbalanced: lethargic and resistant to change.';
      default:
        return '';
    }
  };

  return (
    <div className={`fixed inset-0 z-[1000] flex items-center justify-center p-4 modal-overlay bg-black/50 backdrop-blur-sm transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto border-teal-200 shadow-2xl bg-white/95 backdrop-blur-md">
        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10 border-b border-teal-100 pb-4">
          <CardTitle className="text-teal-900 text-xl font-serif">
            {showResults ? 'Your Dosha Profile' : 'Quick Dosha Quiz'}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="h-8 w-8 p-0 rounded-full"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-6">
          {showResults ? (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Your Dosha Profile</h3>
                <p className="text-gray-600">
                  Based on your answers, here's a glimpse of your mind-body constitution
                </p>
              </div>
              
              <div className="space-y-6">
                {Object.entries(results).map(([dosha, percentage]) => (
                  <div key={dosha} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        {getDoshaIcon(dosha)}
                        <span className="font-medium text-gray-800 capitalize">{dosha}</span>
                      </div>
                      <span className="text-gray-700 font-bold">{percentage}%</span>
                    </div>
                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${getDoshaColor(dosha)} rounded-full`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600">{getDoshaDescription(dosha)}</p>
                  </div>
                ))}
              </div>
              
              <div className="pt-6 text-center">
                <p className="text-gray-600 mb-6">
                  This is just a brief overview. Take our full assessment for a comprehensive analysis and personalized recommendations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/quiz" onClick={onClose}>
                    <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full">
                      Take Full Assessment
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={onClose}
                    className="border-teal-200 text-teal-700 hover:bg-teal-50 rounded-full"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              {/* Question */}
              <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                <h3 className="text-xl font-medium text-gray-800 mb-6">
                  {quizQuestions[currentQuestion].question}
                </h3>
                
                <RadioGroup 
                  value={selectedAnswer} 
                  onValueChange={setSelectedAnswer}
                  className="space-y-3"
                >
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <div 
                      key={index}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                        selectedAnswer === option.text 
                          ? 'border-teal-500 bg-teal-50' 
                          : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                      }`}
                      onClick={() => setSelectedAnswer(option.text)}
                    >
                      <RadioGroupItem 
                        value={option.text} 
                        id={`option-${index}`} 
                        className="text-teal-600"
                      />
                      <Label 
                        htmlFor={`option-${index}`}
                        className="flex-1 cursor-pointer"
                      >
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0 || isAnimating}
                  className="border-teal-200 text-teal-700 hover:bg-teal-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={!selectedAnswer || isAnimating}
                  className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white"
                >
                  {currentQuestion === quizQuestions.length - 1 ? (
                    isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        See Results
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
              </div>
              
              <div className="text-center text-sm text-gray-500 pt-4">
                <p>This mini-quiz gives a quick glimpse of your dosha profile.</p>
                <p>For a comprehensive analysis, take our <Link to="/quiz" className="text-teal-600 hover:underline" onClick={onClose}>full assessment</Link>.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}