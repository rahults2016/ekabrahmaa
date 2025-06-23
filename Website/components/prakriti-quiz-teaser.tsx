'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const sampleQuestions = [
  {
    id: 1,
    question: "How do you typically feel in cold weather?",
    options: [
      "I love it and feel energized",
      "I'm comfortable but prefer moderate temperatures",
      "I feel cold easily and need warm clothing"
    ]
  },
  {
    id: 2,
    question: "How would you describe your energy levels?",
    options: [
      "Quick bursts of energy, then I need rest",
      "Steady and sustained throughout the day",
      "Slow to start but can maintain energy for long periods"
    ]
  }
];

export function PrakritiQuizTeaser() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer('');
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-50 to-teal-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-teal-900 mb-6">
            Discover Your Unique Constitution
          </h2>
          <p className="text-xl text-teal-700 leading-relaxed">
            Take our Prakriti quiz to understand your body's natural tendencies and get personalized healing recommendations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Quiz Preview */}
          <Card className="border-teal-200 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-teal-900 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-pink-500" />
                Question {currentQuestion + 1} of {sampleQuestions.length}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <h3 className="text-lg font-medium text-teal-800">
                {sampleQuestions[currentQuestion].question}
              </h3>
              
              <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                {sampleQuestions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="text-teal-700 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              
              <Link href="/quiz" className="block w-full">
                <Button
                  onClick={handleNext}
                  disabled={!selectedAnswer}
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white"
                >
                  {currentQuestion < sampleQuestions.length - 1 ? 'Next Question' : 'Take Full Quiz'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Information Panel */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-serif font-bold text-teal-900 mb-4">
                What is Prakriti?
              </h3>
              <p className="text-teal-700 leading-relaxed mb-6">
                Prakriti is your unique mind-body constitution determined at conception. Understanding your 
                Prakriti helps us create a personalized healing plan that works with your natural tendencies, 
                not against them.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-b from-teal-50 to-teal-100 rounded-2xl">
                <div className="w-12 h-12 bg-teal-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-teal-700 font-bold">V</span>
                </div>
                <h4 className="font-semibold text-teal-800 text-sm">Vata</h4>
                <p className="text-xs text-teal-600">Movement & Air</p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-b from-pink-50 to-pink-100 rounded-2xl">
                <div className="w-12 h-12 bg-pink-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-pink-700 font-bold">P</span>
                </div>
                <h4 className="font-semibold text-pink-800 text-sm">Pitta</h4>
                <p className="text-xs text-pink-600">Fire & Energy</p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-b from-green-50 to-green-100 rounded-2xl">
                <div className="w-12 h-12 bg-green-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-green-700 font-bold">K</span>
                </div>
                <h4 className="font-semibold text-green-800 text-sm">Kapha</h4>
                <p className="text-xs text-green-600">Earth & Water</p>
              </div>
            </div>

            <div className="text-center">
              <Link href="/quiz">
                <Button size="lg" className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-3 rounded-full">
                Take Full Prakriti Quiz
                <Sparkles className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}