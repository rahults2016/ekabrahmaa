import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Clock, Check, ArrowRight } from 'lucide-react';

interface Referral {
  id: string;
  name: string;
  status: 'pending' | 'completed';
  date: string;
  reward: number;
}

const referrals: Referral[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    status: 'completed',
    date: 'Apr 15, 2025',
    reward: 250
  },
  {
    id: '2',
    name: 'Rahul Verma',
    status: 'completed',
    date: 'Apr 10, 2025',
    reward: 250
  },
  {
    id: '3',
    name: 'Anita Patel',
    status: 'pending',
    date: 'Apr 5, 2025',
    reward: 250
  }
];

const ReferralRewards: React.FC = () => {
  const totalEarned = referrals.reduce((sum, ref) => 
    ref.status === 'completed' ? sum + ref.reward : sum, 0
  );
  
  const pendingRewards = referrals.reduce((sum, ref) => 
    ref.status === 'pending' ? sum + ref.reward : sum, 0
  );

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Rewards Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-teal-light/10 to-pink-light/10">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-teal-light/20 flex items-center justify-center mr-4">
                <Gift size={24} className="text-teal" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">₹{totalEarned}</h3>
                <p className="text-sm text-charcoal-light">Total Rewards Earned</p>
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-teal rounded-full" 
                style={{ width: `${(totalEarned / 2500) * 100}%` }}
              />
            </div>
            <p className="text-xs text-charcoal-light mt-2">
              ₹{2500 - totalEarned} more to reach the maximum reward limit
            </p>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-pink-light/20 flex items-center justify-center mr-4">
                <Clock size={24} className="text-pink" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">₹{pendingRewards}</h3>
                <p className="text-sm text-charcoal-light">Pending Rewards</p>
              </div>
            </div>
          </div>
        </div>

        {/* Referral History */}
        <div className="card">
          <h3 className="text-xl font-garamond font-semibold mb-6">
            Referral History
          </h3>

          <div className="space-y-4">
            {referrals.map((referral) => (
              <div 
                key={referral.id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-teal-light transition-colors"
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                    referral.status === 'completed'
                      ? 'bg-teal-light/20 text-teal'
                      : 'bg-gold-light/20 text-gold'
                  }`}>
                    {referral.status === 'completed' ? (
                      <Check size={20} />
                    ) : (
                      <Clock size={20} />
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-medium">{referral.name}</h4>
                    <div className="flex items-center text-sm text-charcoal-light">
                      <span>{referral.date}</span>
                      <span className="mx-2">•</span>
                      <span className={`capitalize ${
                        referral.status === 'completed' ? 'text-teal' : 'text-gold'
                      }`}>
                        {referral.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-medium">₹{referral.reward}</div>
                  <span className="text-sm text-charcoal-light">Reward</span>
                </div>
              </div>
            ))}
          </div>

          {/* Rewards Info */}
          <div className="mt-8 p-4 bg-ivory rounded-lg">
            <h4 className="font-medium mb-4">How to Earn Rewards</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <ArrowRight size={16} className="text-teal mt-1 mr-2" />
                <p className="text-sm text-charcoal-light">
                  Share your referral code with friends
                </p>
              </div>
              <div className="flex items-start">
                <ArrowRight size={16} className="text-teal mt-1 mr-2" />
                <p className="text-sm text-charcoal-light">
                  Friend signs up using your code
                </p>
              </div>
              <div className="flex items-start">
                <ArrowRight size={16} className="text-teal mt-1 mr-2" />
                <p className="text-sm text-charcoal-light">
                  Both receive ₹250 when they complete their first consultation
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReferralRewards;