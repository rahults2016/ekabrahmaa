import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Share2, Gift, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Referral: React.FC = () => {
  const { user } = useAuth();
  const referralCode = 'EKA' + Math.random().toString(36).substring(2, 8).toUpperCase();
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h2 className="text-2xl font-garamond font-semibold text-charcoal-dark">
            Refer & Earn
          </h2>
          <p className="text-charcoal-light">
            Share the gift of healing with your friends and family
          </p>
        </div>

        {/* Referral stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-teal-light/20 flex items-center justify-center mr-4">
                <Users size={24} className="text-teal" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">3</h3>
                <p className="text-sm text-charcoal-light">Total Referrals</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-pink-light/20 flex items-center justify-center mr-4">
                <Gift size={24} className="text-pink" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">₹750</h3>
                <p className="text-sm text-charcoal-light">Rewards Earned</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gold-light/20 flex items-center justify-center mr-4">
                <Share2 size={24} className="text-gold" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">2</h3>
                <p className="text-sm text-charcoal-light">Pending Invites</p>
              </div>
            </div>
          </div>
        </div>

        {/* Referral code section */}
        <div className="card mb-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-garamond font-semibold mb-2">
              Your Referral Code
            </h3>
            <p className="text-charcoal-light text-sm mb-4">
              Share this code with friends to earn rewards
            </p>
            <div className="bg-ivory p-4 rounded-lg inline-block">
              <span className="text-2xl font-mono font-semibold text-teal">
                {referralCode}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/referral/share" className="btn-primary flex-1 text-center flex items-center justify-center">
              <Share2 size={18} className="mr-2" />
              Share Now
            </Link>
            <Link to="/referral/rewards" className="btn-secondary flex-1 text-center flex items-center justify-center">
              <Gift size={18} className="mr-2" />
              View Rewards
            </Link>
          </div>
        </div>

        {/* How it works */}
        <div className="card">
          <h3 className="text-xl font-garamond font-semibold mb-6">
            How It Works
          </h3>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-teal-light/20 flex items-center justify-center mr-4 mt-1">
                <span className="text-teal font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-medium mb-1">Share Your Code</h4>
                <p className="text-charcoal-light text-sm">
                  Share your unique referral code with friends and family
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-teal-light/20 flex items-center justify-center mr-4 mt-1">
                <span className="text-teal font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-medium mb-1">Friend Signs Up</h4>
                <p className="text-charcoal-light text-sm">
                  They create an account using your referral code
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-teal-light/20 flex items-center justify-center mr-4 mt-1">
                <span className="text-teal font-semibold">3</span>
              </div>
              <div>
                <h4 className="font-medium mb-1">Both Get Rewarded</h4>
                <p className="text-charcoal-light text-sm">
                  You both receive ₹250 in healing credits when they make their first consultation
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-ivory rounded-lg">
            <h4 className="font-medium mb-2">Terms & Conditions</h4>
            <ul className="text-sm text-charcoal-light list-disc list-inside space-y-1">
              <li>Referral rewards are credited after friend's first paid consultation</li>
              <li>Maximum reward limit of ₹2500 per user</li>
              <li>Referral code must be applied during sign up</li>
              <li>Credits valid for 6 months from date of issue</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Referral;