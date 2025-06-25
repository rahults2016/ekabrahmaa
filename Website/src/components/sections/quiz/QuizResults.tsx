import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Droplets, Moon, Sun } from 'lucide-react';
import { LoadingLink } from '../../loadingLink';
import { getDoshaInfo } from '@/config/quizConstants';

interface QuizResultsProps {
  results: { vata: number; pitta: number; kapha: number };
  isDualDosha: boolean;
  isTridoshic: boolean;
}

export const QuizResults = ({ results, isDualDosha, isTridoshic }: QuizResultsProps) => {
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

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <LoadingLink to="/auth/login">
              <Button size="lg" className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-3 rounded-full">
                Unlock Full Results
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </LoadingLink>
            <LoadingLink to="/quiz/suggested-programs">
              <Button variant="outline" size="lg" className="border-teal-600 text-teal-700 hover:bg-teal-50 px-8 py-3 rounded-full">
                View Suggested Programs
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
    vata: { icon: <Moon className="w-4 h-4 mr-2 text-blue-500" />, color: 'from-blue-500 to-purple-500' },
    pitta: { icon: <Sun className="w-4 h-4 mr-2 text-red-500" />, color: 'from-red-500 to-orange-500' },
    kapha: { icon: <Droplets className="w-4 h-4 mr-2 text-green-500" />, color: 'from-green-500 to-teal-500' }
  };

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-teal-800 flex items-center">
          {doshaConfig[dosha].icon}
          {dosha.charAt(0).toUpperCase() + dosha.slice(1)}
        </span>
        <span className="text-teal-600">{percentage}%</span>
      </div>
      <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full bg-gradient-to-r ${doshaConfig[dosha].color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: delay + 0.1 }}
        />
      </div>
    </motion.div>
  );
};