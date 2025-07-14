import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/website/ui/card';
import { Button } from '@/website/ui/button';
import { ArrowRight, Droplets, Moon, Sun } from 'lucide-react';
import { LoadingLink } from '../../loadingLink';
import { getDoshaInfo } from '@/data/quizConstants';

interface QuizResultsProps {
  results: { vata: number; pitta: number; kapha: number };
  isDualDosha: boolean;
  isTridoshic: boolean;
}

export const QuizResults = ({ 
  results, 
  isDualDosha, 
  isTridoshic
}: QuizResultsProps) => {
  const dominantDosha = Object.entries(results).reduce((a, b) => a[1] > b[1] ? a : b)[0] as 'vata' | 'pitta' | 'kapha';
  const doshaInfo = getDoshaInfo(dominantDosha);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="border-teal-200 shadow-xl bg-white/80 backdrop-blur-sm mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-serif text-teal-900">
            Your Dominant Dosha: {doshaInfo.name}
            {isDualDosha && <span className="text-lg text-pink-600 block">Dual Constitution Detected</span>}
            {isTridoshic && <span className="text-lg text-purple-600 block">Tridoshic Constitution</span>}
          </CardTitle>
          <p className="text-teal-600">{doshaInfo.element}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {Object.entries(results).map(([dosha, percentage], index) => (
              <DoshaProgressBar
                key={dosha}
                dosha={dosha as 'vata' | 'pitta' | 'kapha'}
                percentage={percentage}
                delay={0.4 + index * 0.2}
              />
            ))}
          </div>

          <motion.div 
            className={`p-6 rounded-2xl bg-gradient-to-r ${doshaInfo.color} text-white`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="flex items-center mb-4">
              {doshaInfo.icon}
              <h3 className="text-xl font-bold ml-3">{doshaInfo.name} Constitution</h3>
            </div>
            <p className="mb-4 opacity-90">{doshaInfo.description}</p>
            
            <div className="bg-white/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">✨ Your Personalized Recommendations</h4>
              <ul className="text-sm opacity-90 space-y-1">
                {doshaInfo.recommendations.map((rec, index) => (
                  <li key={index}>• {rec}</li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <LoadingLink to="/programs">
              <Button size="lg" className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-3 rounded-full">
                View Recommended Programs
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </LoadingLink>
            <LoadingLink to="/consultation">
              <Button variant="outline" size="lg" className="border-teal-600 text-teal-700 hover:bg-teal-50 px-8 py-3 rounded-full">
                Book Free Consultation
              </Button>
            </LoadingLink>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const DoshaProgressBar = ({ dosha, percentage, delay }: { dosha: 'vata' | 'pitta' | 'kapha'; percentage: number; delay: number }) => {
  const doshaConfig = {
    vata: { 
      icon: <Moon className="w-4 h-4 mr-2 text-blue-500" />, 
      color: 'from-blue-500 to-purple-500',
      bgColor: 'bg-blue-100'
    },
    pitta: { 
      icon: <Sun className="w-4 h-4 mr-2 text-red-500" />, 
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-100'
    },
    kapha: { 
      icon: <Droplets className="w-4 h-4 mr-2 text-green-500" />, 
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-100'
    }
  };

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      transition={{ duration: 0.5, delay }}
      className={`p-3 rounded-lg ${doshaConfig[dosha].bgColor} border border-opacity-20`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-teal-800 flex items-center">
          {doshaConfig[dosha].icon}
          {dosha.charAt(0).toUpperCase() + dosha.slice(1)}
        </span>
        <motion.span 
          className="text-teal-600 font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.5 }}
        >
          {percentage}%
        </motion.span>
      </div>
      <div className="h-4 w-full bg-white/50 rounded-full overflow-hidden shadow-inner">
        <motion.div 
          className={`h-full bg-gradient-to-r ${doshaConfig[dosha].color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, delay: delay + 0.1, ease: "easeOut" }}
        />
      </div>
      
      {/* Animated sparkles for the highest percentage */}
      {percentage >= 40 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, delay: delay + 1, repeat: Infinity, repeatDelay: 3 }}
          className="flex justify-end mt-1"
        >
          <span className="text-xs text-yellow-500">✨</span>
        </motion.div>
      )}
    </motion.div>
  );
};