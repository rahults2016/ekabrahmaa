// src/pages/QuizPage.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { questions } from '@/config/quizConstants';
import { QuizProgress } from '@/components/sections/quiz/QuizProgress';
import { QuizQuestionCard } from '@/components/sections/quiz/QuizQuestionCard';
import { QuizResults } from '@/components/sections/quiz/QuizResults';
import { QuizTrendIndicator } from '@/components/sections/quiz/QuizTrendIndicator';
import { QuizHeader } from '@/components/sections/quiz/Quizheader';

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(0);
  const [results, setResults] = useState({vata: 0, pitta: 0, kapha: 0});
  const [doshaTracker, setDoshaTracker] = useState({vata: 0, pitta: 0, kapha: 0});
  const [autoProgressionEnabled, setAutoProgressionEnabled] = useState(true);
  const questionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedAnswer) {
      const option = questions[currentQuestion].options.find(opt => opt.text === selectedAnswer);
      if (option) {
        setDoshaTracker(prev => ({
          ...prev,
          [option.dosha]: prev[option.dosha as keyof typeof prev] + 1
        }));
      }
    }
  }, [selectedAnswer, currentQuestion]);

  // Auto-progress to next question when an option is selected
  useEffect(() => {
    if (selectedAnswer && autoProgressionEnabled && !isAnimating && currentQuestion < questions.length - 1) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);
      
      const timer = setTimeout(() => {
        setDirection(1);
        setIsAnimating(true);
        
        setTimeout(() => {
          setCurrentQuestion(prev => prev + 1);
          setSelectedAnswer(newAnswers[currentQuestion + 1] || '');
          setIsAnimating(false);
          
          sessionStorage.setItem('prakritiAnswers', JSON.stringify(newAnswers));
          sessionStorage.setItem('prakritiCurrentQuestion', String(currentQuestion + 1));
        }, 300);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [selectedAnswer, autoProgressionEnabled, isAnimating, currentQuestion, answers]);

  useEffect(() => {
    const savedAnswers = sessionStorage.getItem('prakritiAnswers');
    const savedCurrentQuestion = sessionStorage.getItem('prakritiCurrentQuestion');
    
    if (savedAnswers) {
      const parsedAnswers = JSON.parse(savedAnswers);
      setAnswers(parsedAnswers);
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
      setCurrentQuestion(Number(savedCurrentQuestion));
    }
  }, []);

  const handleNext = () => {
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
    
    localStorage.setItem('prakritiResults', JSON.stringify(percentages));
    localStorage.setItem('userDosha', JSON.stringify(percentages));
    
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
    return scores[0] - scores[1] <= 10;
  };

  const isTridoshic = () => {
    const scores = [results.vata, results.pitta, results.kapha];
    const max = Math.max(...scores);
    const min = Math.min(...scores);
    return max - min <= 15;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentQuestion]);

  const getCurrentTrend = () => {
    const total = doshaTracker.vata + doshaTracker.pitta + doshaTracker.kapha;
    if (total === 0) return null;
    
    const sorted = Object.entries(doshaTracker).sort((a, b) => b[1] - a[1]);
    return sorted[0][0] as 'vata' | 'pitta' | 'kapha';
  };

  const currentTrend = getCurrentTrend();

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
          />
        </div>
      </div>
    </div>
  );
}