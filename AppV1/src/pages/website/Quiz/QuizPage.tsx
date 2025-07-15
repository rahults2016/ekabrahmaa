// src/pages/QuizPage.tsx
'use client';

import { QuizHeader } from '@/components/website/sections/quiz/Quizheader';
import { QuizProgress } from '@/components/website/sections/quiz/QuizProgress';
import { QuizQuestionCard } from '@/components/website/sections/quiz/QuizQuestionCard';
import { QuizResults } from '@/components/website/sections/quiz/QuizResults';
import { QuizTrendIndicator } from '@/components/website/sections/quiz/QuizTrendIndicator';
import { RegistrationForm } from '@/components/website/sections/quiz/RegistrationForm';
import { questions } from '@/data/website/quizConstants';
import { useState, useEffect, useRef } from 'react';

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(0);
  const [results, setResults] = useState({vata: 0, pitta: 0, kapha: 0});
  const [doshaTracker, setDoshaTracker] = useState({vata: 0, pitta: 0, kapha: 0});
  const [autoProgressionEnabled, setAutoProgressionEnabled] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const questionRef = useRef<HTMLDivElement>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize quiz state from saved data
  useEffect(() => {
    const savedAnswers = sessionStorage.getItem('prakritiAnswers');
    const savedCurrentQuestion = sessionStorage.getItem('prakritiCurrentQuestion');
    
    // Only restore if we have saved progress
    if (savedAnswers) {
      const parsedAnswers = JSON.parse(savedAnswers);
      setAnswers(parsedAnswers);
      
      // Recalculate dosha tracker from saved answers
      const tracker = {vata: 0, pitta: 0, kapha: 0};
      parsedAnswers.forEach((answer: string, index: number) => {
        if (answer) {
          const question = questions[index];
          const selectedOption = question.options.find(opt => opt.text === answer);
          if (selectedOption) {
            tracker[selectedOption.dosha as keyof typeof tracker]++;
          }
        }
      });
      setDoshaTracker(tracker);
    }
    
    if (savedCurrentQuestion) {
      const questionIndex = Number(savedCurrentQuestion);
      setCurrentQuestion(questionIndex);
      // Set the selected answer for the current question
      setSelectedAnswer(savedAnswers ? JSON.parse(savedAnswers)[questionIndex] || '' : '');
    }
    
    setIsInitialized(true);
  }, []);

  // Recalculate dosha tracker from all answers
  useEffect(() => {
    if (isInitialized) {
      const tracker = {vata: 0, pitta: 0, kapha: 0};
      answers.forEach((answer, index) => {
        if (answer) {
          const question = questions[index];
          const selectedOption = question.options.find(opt => opt.text === answer);
          if (selectedOption) {
            tracker[selectedOption.dosha as keyof typeof tracker]++;
          }
        }
      });
      setDoshaTracker(tracker);
    }
  }, [answers, isInitialized]);

  // Auto-progress functionality
  useEffect(() => {
    if (!isInitialized || !selectedAnswer || !autoProgressionEnabled || isAnimating) {
      return;
    }

    // Clear any existing timers
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (progressTimeoutRef.current) {
      clearTimeout(progressTimeoutRef.current);
      progressTimeoutRef.current = null;
    }
    
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestion] = selectedAnswer;
    
      if (currentQuestion < questions.length - 1) {
        // Start countdown for next question
        setCountdown(3);
        setIsCountingDown(true);
      
        countdownIntervalRef.current = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              if (countdownIntervalRef.current) {
                clearInterval(countdownIntervalRef.current);
                countdownIntervalRef.current = null;
              }
              setIsCountingDown(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      
        progressTimeoutRef.current = setTimeout(() => {
          setDirection(1);
          setIsAnimating(true);
          setIsCountingDown(false);
        
          setTimeout(() => {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(newAnswers[currentQuestion + 1] || '');
            setIsAnimating(false);
            setCountdown(0);
          
            // Save progress
            sessionStorage.setItem('prakritiAnswers', JSON.stringify(newAnswers));
            sessionStorage.setItem('prakritiCurrentQuestion', String(currentQuestion + 1));
          }, 300);
        }, 3000);
      } else {
        // Last question - submit quiz
        setIsSubmitting(true);
        calculateResults(newAnswers);
      }
      
      return newAnswers;
    });
      
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
      if (progressTimeoutRef.current) {
        clearTimeout(progressTimeoutRef.current);
        progressTimeoutRef.current = null;
      }
    };
  }, [selectedAnswer, autoProgressionEnabled, isAnimating, currentQuestion, isInitialized]);

  // Cleanup timers on component unmount
  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
      if (progressTimeoutRef.current) {
        clearTimeout(progressTimeoutRef.current);
      }
    };
  }, []);

  const handleNext = () => {
    // Clear timers when manually progressing
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (progressTimeoutRef.current) {
      clearTimeout(progressTimeoutRef.current);
      progressTimeoutRef.current = null;
    }
    setIsCountingDown(false);
    setCountdown(0);
    
    if (!selectedAnswer) {
      // Don't proceed if no answer is selected
      return;
    }
    
    if (selectedAnswer) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);
      
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
    // Clear timers when going back
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (progressTimeoutRef.current) {
      clearTimeout(progressTimeoutRef.current);
      progressTimeoutRef.current = null;
    }
    setIsCountingDown(false);
    setCountdown(0);
    
    if (currentQuestion <= 0) {
      // Don't go back if we're at the first question
      return;
    }
    
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
    if (allAnswers.length !== questions.length) {
      console.error('Incomplete answers, cannot calculate results');
      return;
    }
    
    const doshaScores = { vata: 0, pitta: 0, kapha: 0 };
    
    allAnswers.forEach((answer, index) => {
      if (answer) {
        const question = questions[index];
        const selectedOption = question.options.find(opt => opt.text === answer);
        if (selectedOption) {
          doshaScores[selectedOption.dosha as keyof typeof doshaScores]++;
        }
      } else {
        console.warn(`No answer found for question ${index + 1}`);
      }
    });

    // Ensure we have at least some answers
    const totalAnswers = Object.values(doshaScores).reduce((sum, score) => sum + score, 0);
    if (totalAnswers === 0) {
      console.error('No valid answers found, cannot calculate results');
      return;
    }

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
    
    // Save results
    localStorage.setItem('prakritiResults', JSON.stringify(percentages));
    localStorage.setItem('userDosha', JSON.stringify(percentages));
    
    // Clear session storage since quiz is complete
    sessionStorage.removeItem('prakritiAnswers');
    sessionStorage.removeItem('prakritiCurrentQuestion');
    
    // Show registration form first
    setShowRegistrationForm(true);
    setIsSubmitting(false);
  };

  const handleRegistrationSuccess = () => {
    setShowRegistrationForm(false);
    setShowResults(true);
  };

  const isDualDosha = () => {
    const scores = [results.vata, results.pitta, results.kapha];
    scores.sort((a, b) => b - a);
    return scores[0] - scores[1] <= 10;
  };

  const isTridoshic = () => {
    const scores = [results.vata, results.pitta, results.kapha];
    const max = Math.max(...scores);
    const min = Math.min(...scores);
    return max - min <= 15;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const getCurrentTrend = () => {
    const total = doshaTracker.vata + doshaTracker.pitta + doshaTracker.kapha;
    if (total === 0) return null;
    
    const sorted = Object.entries(doshaTracker).sort((a, b) => b[1] - a[1]);
    return sorted[0][0] as 'vata' | 'pitta' | 'kapha';
  };

  const currentTrend = getCurrentTrend();

  // Loading state while checking saved data
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-teal-700">Loading quiz...</p>
        </div>
      </div>
    );
  }

  // Ensure we have valid questions
  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center">
        <p className="text-red-600">Error: No questions available</p>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <QuizHeader 
            title="Your Prakriti Teaser Results"
            subtitle="Get a glimpse of your unique constitution"
          />
          
          <QuizResults 
            results={results} 
            isDualDosha={isDualDosha()} 
            isTridoshic={isTridoshic()} 
          />
        </div>
      </div>
    );
  }

  // Show registration form
  if (showRegistrationForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <QuizHeader 
            title="Almost There!"
            subtitle="Complete your registration to unlock your personalized Prakriti analysis"
          />
          
          <RegistrationForm 
            results={results}
            onRegistrationSuccess={handleRegistrationSuccess}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <QuizHeader 
          title="Prakriti Quiz"
          subtitle="Discover your unique mind-body constitution through 20 comprehensive questions"
        />

        <QuizProgress
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          progress={progress}
          category={questions[currentQuestion].category}
          autoProgressionEnabled={autoProgressionEnabled}
          onToggleAutoProgress={() => setAutoProgressionEnabled(!autoProgressionEnabled)}
        />

        <QuizTrendIndicator 
          currentTrend={currentTrend} 
          currentQuestion={currentQuestion} 
        />

        <div ref={questionRef}>
          <QuizQuestionCard
            question={questions[currentQuestion].question}
            options={questions[currentQuestion].options}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            isAnimating={isAnimating}
            direction={direction}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            isSubmitting={isSubmitting}
            autoProgressionEnabled={autoProgressionEnabled}
            countdown={countdown}
            isCountingDown={isCountingDown}
          />
        </div>
      </div>
    </div>
  );
}