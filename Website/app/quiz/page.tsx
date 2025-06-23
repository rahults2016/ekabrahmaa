'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Leaf, 
  CheckCircle, 
  Brain,
  Heart,
  Utensils,
  Moon,
  Activity,
  User,
  Sun,
  Droplets
} from 'lucide-react';
import { LayoutWrapper } from '@/components/layout-wrapper';
import { LoadingLink } from '@/components/loading-link';
import { useLoading } from '@/contexts/loading-context';
import { motion, AnimatePresence } from 'framer-motion';

const categoryIcons = {
  Body: <User className="w-5 h-5" />,
  Mind: <Brain className="w-5 h-5" />,
  Habits: <Activity className="w-5 h-5" />,
  Digestion: <Utensils className="w-5 h-5" />,
  Emotions: <Heart className="w-5 h-5" />
};

const doshaIcons = {
  vata: <Moon className="w-5 h-5 text-blue-500" />,
  pitta: <Sun className="w-5 h-5 text-red-500" />,
  kapha: <Droplets className="w-5 h-5 text-green-500" />
};

const questions = [
  {
    id: 1,
    question: "How do you typically feel in cold weather?",
    category: "Body",
    options: [
      { text: "I love it and feel energized", dosha: "kapha" },
      { text: "I'm comfortable but prefer moderate temperatures", dosha: "pitta" },
      { text: "I feel cold easily and need warm clothing", dosha: "vata" }
    ]
  },
  {
    id: 2,
    question: "How would you describe your energy levels?",
    category: "Body",
    options: [
      { text: "Quick bursts of energy, then I need rest", dosha: "vata" },
      { text: "Steady and sustained throughout the day", dosha: "pitta" },
      { text: "Slow to start but can maintain energy for long periods", dosha: "kapha" }
    ]
  },
  {
    id: 3,
    question: "What is your typical body frame?",
    category: "Body",
    options: [
      { text: "Thin, light, find it hard to gain weight", dosha: "vata" },
      { text: "Medium build, well-proportioned", dosha: "pitta" },
      { text: "Larger frame, gain weight easily", dosha: "kapha" }
    ]
  },
  {
    id: 4,
    question: "How do you handle stress?",
    category: "Mind",
    options: [
      { text: "I get anxious and scattered", dosha: "vata" },
      { text: "I become irritable and focused", dosha: "pitta" },
      { text: "I withdraw and become lethargic", dosha: "kapha" }
    ]
  },
  {
    id: 5,
    question: "What describes your sleep pattern?",
    category: "Habits",
    options: [
      { text: "Light sleeper, mind races at night", dosha: "vata" },
      { text: "Moderate sleep, wake up refreshed", dosha: "pitta" },
      { text: "Deep sleeper, hard to wake up", dosha: "kapha" }
    ]
  },
  {
    id: 6,
    question: "How is your digestion?",
    category: "Digestion",
    options: [
      { text: "Irregular, sometimes bloated or gassy", dosha: "vata" },
      { text: "Strong, get hungry frequently", dosha: "pitta" },
      { text: "Slow, feel heavy after meals", dosha: "kapha" }
    ]
  },
  {
    id: 7,
    question: "What's your approach to decision-making?",
    category: "Mind",
    options: [
      { text: "Quick to decide but often change my mind", dosha: "vata" },
      { text: "Analytical, consider pros and cons", dosha: "pitta" },
      { text: "Take time to decide, stick with decisions", dosha: "kapha" }
    ]
  },
  {
    id: 8,
    question: "How do you prefer to exercise?",
    category: "Habits",
    options: [
      { text: "Varied activities, get bored easily", dosha: "vata" },
      { text: "Competitive sports, moderate intensity", dosha: "pitta" },
      { text: "Gentle, consistent activities like walking", dosha: "kapha" }
    ]
  },
  {
    id: 9,
    question: "What's your memory like?",
    category: "Mind",
    options: [
      { text: "Quick to learn, quick to forget", dosha: "vata" },
      { text: "Good memory, especially for important things", dosha: "pitta" },
      { text: "Slow to learn but excellent long-term memory", dosha: "kapha" }
    ]
  },
  {
    id: 10,
    question: "How do you react to change?",
    category: "Emotions",
    options: [
      { text: "I embrace change and new experiences", dosha: "vata" },
      { text: "I adapt well if the change makes sense", dosha: "pitta" },
      { text: "I prefer routine and stability", dosha: "kapha" }
    ]
  },
  {
    id: 11,
    question: "What's your skin like?",
    category: "Body",
    options: [
      { text: "Dry, rough, or thin", dosha: "vata" },
      { text: "Warm, oily, prone to rashes", dosha: "pitta" },
      { text: "Thick, oily, smooth", dosha: "kapha" }
    ]
  },
  {
    id: 12,
    question: "How do you express emotions?",
    category: "Emotions",
    options: [
      { text: "Quickly and intensely, then move on", dosha: "vata" },
      { text: "Passionately and directly", dosha: "pitta" },
      { text: "Slowly and steadily", dosha: "kapha" }
    ]
  },
  {
    id: 13,
    question: "What's your appetite like?",
    category: "Digestion",
    options: [
      { text: "Variable, sometimes forget to eat", dosha: "vata" },
      { text: "Strong, get irritable when hungry", dosha: "pitta" },
      { text: "Steady, can skip meals easily", dosha: "kapha" }
    ]
  },
  {
    id: 14,
    question: "How do you learn best?",
    category: "Mind",
    options: [
      { text: "Through discussion and variety", dosha: "vata" },
      { text: "Through focused study and practice", dosha: "pitta" },
      { text: "Through repetition and hands-on experience", dosha: "kapha" }
    ]
  },
  {
    id: 15,
    question: "What's your hair like?",
    category: "Body",
    options: [
      { text: "Dry, brittle, or frizzy", dosha: "vata" },
      { text: "Fine, oily, early graying", dosha: "pitta" },
      { text: "Thick, lustrous, strong", dosha: "kapha" }
    ]
  },
  {
    id: 16,
    question: "How do you handle routine?",
    category: "Habits",
    options: [
      { text: "I prefer variety and spontaneity", dosha: "vata" },
      { text: "I like structured routines that work", dosha: "pitta" },
      { text: "I thrive on consistent, stable routines", dosha: "kapha" }
    ]
  },
  {
    id: 17,
    question: "What motivates you most?",
    category: "Emotions",
    options: [
      { text: "New experiences and creativity", dosha: "vata" },
      { text: "Achievement and recognition", dosha: "pitta" },
      { text: "Security and helping others", dosha: "kapha" }
    ]
  },
  {
    id: 18,
    question: "How do you speak?",
    category: "Mind",
    options: [
      { text: "Fast, enthusiastic, lots of ideas", dosha: "vata" },
      { text: "Clear, precise, persuasive", dosha: "pitta" },
      { text: "Slow, thoughtful, gentle", dosha: "kapha" }
    ]
  },
  {
    id: 19,
    question: "What's your relationship with money?",
    category: "Habits",
    options: [
      { text: "Spend impulsively, don't save much", dosha: "vata" },
      { text: "Spend on quality, plan purchases", dosha: "pitta" },
      { text: "Save regularly, spend carefully", dosha: "kapha" }
    ]
  },
  {
    id: 20,
    question: "How do you prefer your environment?",
    category: "Emotions",
    options: [
      { text: "Warm, cozy, and stimulating", dosha: "vata" },
      { text: "Cool, organized, and efficient", dosha: "pitta" },
      { text: "Comfortable, stable, and harmonious", dosha: "kapha" }
    ]
  }
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for backward, 1 for forward
  const [results, setResults] = useState<{vata: number, pitta: number, kapha: number}>({vata: 0, pitta: 0, kapha: 0});
  const [doshaTracker, setDoshaTracker] = useState<{vata: number, pitta: number, kapha: number}>({vata: 0, pitta: 0, kapha: 0});
  const [autoProgressionEnabled, setAutoProgressionEnabled] = useState(true);
  const { startPageLoading } = useLoading();
  const questionRef = useRef<HTMLDivElement>(null);

  // Track dosha selections in real-time
  useEffect(() => {
    if (selectedAnswer) {
      const option = questions[currentQuestion].options.find(opt => opt.text === selectedAnswer);
      if (option) {
        const newTracker = {...doshaTracker};
        newTracker[option.dosha as keyof typeof doshaTracker]++;
        setDoshaTracker(newTracker);
      }
    }
  }, [selectedAnswer]);

  // Auto-progress to next question when an option is selected
  useEffect(() => {
    if (selectedAnswer && autoProgressionEnabled && !isAnimating && currentQuestion < questions.length - 1) {
      // Save the answer
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);
      
      // Add a small delay before transitioning to next question
      const timer = setTimeout(() => {
        setDirection(1);
        setIsAnimating(true);
        
        setTimeout(() => {
          setCurrentQuestion(prev => prev + 1);
          setSelectedAnswer(newAnswers[currentQuestion + 1] || '');
          setIsAnimating(false);
          
          // Save to session storage
          sessionStorage.setItem('prakritiAnswers', JSON.stringify(newAnswers));
          sessionStorage.setItem('prakritiCurrentQuestion', String(currentQuestion + 1));
        }, 300);
      }, 500); // Delay before transition
      
      return () => clearTimeout(timer);
    }
  }, [selectedAnswer, autoProgressionEnabled, isAnimating, currentQuestion, answers]);

  // Load saved progress from session storage
  useEffect(() => {
    const savedAnswers = sessionStorage.getItem('prakritiAnswers');
    const savedCurrentQuestion = sessionStorage.getItem('prakritiCurrentQuestion');
    
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
    
    if (savedCurrentQuestion) {
      setCurrentQuestion(Number(savedCurrentQuestion));
    }
  }, []);

  const handleNext = () => {
    if (selectedAnswer) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);
      
      // Save to session storage
      sessionStorage.setItem('prakritiAnswers', JSON.stringify(newAnswers));
      
      if (currentQuestion < questions.length - 1) {
        setDirection(1);
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentQuestion(prev => prev + 1);
          setSelectedAnswer(newAnswers[currentQuestion + 1] || '');
          setIsAnimating(false);
          sessionStorage.setItem('prakritiCurrentQuestion', String(currentQuestion + 1));
        }, 300);
      } else {
        setIsSubmitting(true);
        calculateResults(newAnswers);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setIsAnimating(true);
      setTimeout(() => {
        const newQuestionIndex = currentQuestion - 1;
        setCurrentQuestion(newQuestionIndex);
        setSelectedAnswer(answers[newQuestionIndex] || '');
        setIsAnimating(false);
        sessionStorage.setItem('prakritiCurrentQuestion', String(newQuestionIndex));
      }, 300);
    }
  };

  const calculateResults = (allAnswers: string[]) => {
    const doshaScores = { vata: 0, pitta: 0, kapha: 0 };
    
    allAnswers.forEach((answer, index) => {
      if (answer) {
        const question = questions[index];
        const selectedOption = question.options.find(opt => opt.text === answer);
        if (selectedOption) {
          doshaScores[selectedOption.dosha as keyof typeof doshaScores]++;
        }
      }
    });

    const total = Object.values(doshaScores).reduce((sum, score) => sum + score, 0);
    const percentages = {
      vata: Math.round((doshaScores.vata / total) * 100),
      pitta: Math.round((doshaScores.pitta / total) * 100),
      kapha: Math.round((doshaScores.kapha / total) * 100)
    };

    setResults(percentages);
    
    // Save results to localStorage
    localStorage.setItem('prakritiResults', JSON.stringify(percentages));
    localStorage.setItem('userDosha', JSON.stringify(percentages));
    
    // Clear session storage
    sessionStorage.removeItem('prakritiAnswers');
    sessionStorage.removeItem('prakritiCurrentQuestion');
    
    setShowResults(true);
    setIsSubmitting(false);
  };

  const getDominantDosha = () => {
    const max = Math.max(results.vata, results.pitta, results.kapha);
    if (results.vata === max) return 'vata';
    if (results.pitta === max) return 'pitta';
    return 'kapha';
  };

  const isDualDosha = () => {
    const scores = [results.vata, results.pitta, results.kapha];
    scores.sort((a, b) => b - a);
    return scores[0] - scores[1] <= 10; // If difference is 10% or less
  };

  const isTridoshic = () => {
    const scores = [results.vata, results.pitta, results.kapha];
    const max = Math.max(...scores);
    const min = Math.min(...scores);
    return max - min <= 15; // If all doshas are within 15% of each other
  };

  const getDoshaInfo = (dosha: string) => {
    const info = {
      vata: {
        name: 'Vata',
        element: 'Air & Space',
        qualities: 'Movement, Creativity, Flexibility',
        description: 'You are naturally creative, energetic, and love variety. You may be prone to anxiety when out of balance.',
        recommendations: ['Regular routine', 'Warm, cooked foods', 'Gentle exercise', 'Adequate rest'],
        color: 'from-blue-500 to-purple-500',
        icon: <Moon className="w-6 h-6" />
      },
      pitta: {
        name: 'Pitta',
        element: 'Fire & Water',
        qualities: 'Transformation, Intelligence, Leadership',
        description: 'You are naturally focused, ambitious, and have strong digestion. You may be prone to irritability when out of balance.',
        recommendations: ['Cooling foods', 'Moderate exercise', 'Stress management', 'Avoid overheating'],
        color: 'from-red-500 to-orange-500',
        icon: <Sun className="w-6 h-6" />
      },
      kapha: {
        name: 'Kapha',
        element: 'Earth & Water',
        qualities: 'Stability, Strength, Compassion',
        description: 'You are naturally calm, stable, and have strong immunity. You may be prone to lethargy when out of balance.',
        recommendations: ['Stimulating activities', 'Light, warm foods', 'Regular exercise', 'Variety in routine'],
        color: 'from-green-500 to-teal-500',
        icon: <Droplets className="w-6 h-6" />
      }
    };
    return info[dosha as keyof typeof info];
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  useEffect(() => {
    // Scroll to top of question when changing questions
    if (questionRef.current) {
      questionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentQuestion]);

  // Get current dosha trend
  const getCurrentTrend = () => {
    const total = doshaTracker.vata + doshaTracker.pitta + doshaTracker.kapha;
    if (total === 0) return null;
    
    const sorted = Object.entries(doshaTracker).sort((a, b) => b[1] - a[1]);
    return sorted[0][0] as 'vata' | 'pitta' | 'kapha';
  };

  const currentTrend = getCurrentTrend();

  if (showResults) {
    const dominantDosha = getDominantDosha();
    const doshaInfo = getDoshaInfo(dominantDosha);

    return (
      <LayoutWrapper>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-serif font-bold text-teal-900 mb-4">
                Your Prakriti Teaser Results
              </h1>
              <p className="text-xl text-teal-700">
                Get a glimpse of your unique constitution
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-teal-200 shadow-xl bg-white/80 backdrop-blur-sm mb-8">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-serif text-teal-900">
                    Your Dominant Dosha: {doshaInfo.name}
                    {isDualDosha() && <span className="text-lg text-pink-600 block">Dual Constitution Detected</span>}
                    {isTridoshic() && <span className="text-lg text-purple-600 block">Tridoshic Constitution</span>}
                  </CardTitle>
                  <p className="text-teal-600">{doshaInfo.element}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Dosha Percentages */}
                  <div className="space-y-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-teal-800 flex items-center">
                          <Moon className="w-4 h-4 mr-2 text-blue-500" />
                          Vata
                        </span>
                        <span className="text-teal-600">{results.vata}%</span>
                      </div>
                      <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${results.vata}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-teal-800 flex items-center">
                          <Sun className="w-4 h-4 mr-2 text-red-500" />
                          Pitta
                        </span>
                        <span className="text-teal-600">{results.pitta}%</span>
                      </div>
                      <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${results.pitta}%` }}
                          transition={{ duration: 1, delay: 0.7 }}
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-teal-800 flex items-center">
                          <Droplets className="w-4 h-4 mr-2 text-green-500" />
                          Kapha
                        </span>
                        <span className="text-teal-600">{results.kapha}%</span>
                      </div>
                      <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${results.kapha}%` }}
                          transition={{ duration: 1, delay: 0.9 }}
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Teaser Info */}
                  <motion.div 
                    className={`p-6 rounded-2xl bg-gradient-to-r ${doshaInfo.color} text-white`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    <div className="flex items-center mb-4">
                      {doshaInfo.icon}
                      <h3 className="text-xl font-bold ml-3">{doshaInfo.name} Constitution Preview</h3>
                    </div>
                    <p className="mb-4 opacity-90">{doshaInfo.description}</p>
                    <div className="bg-white/20 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">🔒 Unlock Your Full Prakriti</h4>
                      <p className="text-sm opacity-90">
                        Sign up to get your complete constitutional analysis, personalized recommendations, 
                        and access to your 5-healer team.
                      </p>
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    <LoadingLink href="/auth/login">
                      <Button size="lg" className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-3 rounded-full">
                        Unlock Full Results
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </LoadingLink>
                    <LoadingLink href="/quiz/suggested-programs">
                      <Button variant="outline" size="lg" className="border-teal-600 text-teal-700 hover:bg-teal-50 px-8 py-3 rounded-full">
                        View Suggested Programs
                      </Button>
                    </LoadingLink>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-serif font-bold text-teal-900 mb-4">
              Prakriti Quiz
            </h1>
            <p className="text-xl text-teal-700 mb-6">
              Discover your unique mind-body constitution through 20 comprehensive questions
            </p>
            <div className="relative pt-1 w-full max-w-md mx-auto">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between mt-2 text-sm text-teal-600">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <div className="flex items-center">
                  {categoryIcons[questions[currentQuestion].category as keyof typeof categoryIcons]}
                  <span className="ml-1">{questions[currentQuestion].category}</span>
                </div>
              </div>
            </div>
            
            {/* Auto-progression toggle */}
            <div className="flex items-center justify-center mt-2">
              <button
                type="button"
                onClick={() => setAutoProgressionEnabled(!autoProgressionEnabled)}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  autoProgressionEnabled 
                    ? 'bg-teal-100 text-teal-700 hover:bg-teal-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >{autoProgressionEnabled ? 'Auto-progress: On' : 'Auto-progress: Off'}</button>
            </div>
          </motion.div>

          {/* Current Trend Indicator */}
          {currentTrend && currentQuestion > 3 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-teal-100 shadow-sm"
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm text-teal-700">Current trend:</span>
                <div className="flex items-center space-x-1">
                  {doshaIcons[currentTrend]}
                  <span className="font-medium text-sm">
                    {currentTrend === 'vata' ? 'Vata' : currentTrend === 'pitta' ? 'Pitta' : 'Kapha'}
                  </span>
                </div>
                <span className="text-xs text-teal-600">(This may change as you answer more questions)</span>
              </div>
            </motion.div>
          )}

          <div ref={questionRef}>
            <Card className="border-teal-200 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-teal-900 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-pink-500" />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQuestion}
                      initial={{ 
                        opacity: 0, 
                        x: direction > 0 ? 20 : -20 
                      }}
                      animate={{ 
                        opacity: 1, 
                        x: 0 
                      }}
                      exit={{ 
                        opacity: 0,
                        x: direction > 0 ? -20 : 20 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {questions[currentQuestion].question}
                    </motion.div>
                  </AnimatePresence>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion}
                    initial={{ 
                      opacity: 0, 
                      x: direction > 0 ? 20 : -20 
                    }}
                    animate={{ 
                      opacity: 1, 
                      x: 0 
                    }}
                    exit={{ 
                      opacity: 0,
                      x: direction > 0 ? -20 : 20 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <RadioGroup 
                      value={selectedAnswer} 
                      onValueChange={setSelectedAnswer}
                      className="space-y-3"
                    >
                      {questions[currentQuestion].options.map((option, index) => (
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
                      ))}
                    </RadioGroup>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
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
                      {currentQuestion === questions.length - 1 ? (
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}