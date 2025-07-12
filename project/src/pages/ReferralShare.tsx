import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, MessageCircle, Mail, ExternalLink, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ReferralShare: React.FC = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const referralCode = 'EKA' + Math.random().toString(36).substring(2, 8).toUpperCase();
  
  const referralLink = `https://ekabrahmaa.com/join?ref=${referralCode}`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleShare = (platform: string) => {
    const message = `Join me on ekaBrahmaa for personalized Ayurvedic wellness! Use my referral code ${referralCode} to get ₹250 off your first consultation. ${referralLink}`;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=Join me on ekaBrahmaa&body=${encodeURIComponent(message)}`);
        break;
      default:
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-teal-light/20 flex items-center justify-center mx-auto mb-4">
              <Share2 size={32} className="text-teal" />
            </div>
            <h2 className="text-2xl font-garamond font-semibold mb-2">
              Share with Friends
            </h2>
            <p className="text-charcoal-light">
              Invite friends to start their healing journey
            </p>
          </div>

          {/* Referral Link */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-charcoal-dark mb-2">
              Your Referral Link
            </label>
            <div className="flex">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="input-field flex-1 rounded-r-none"
              />
              <button
                onClick={handleCopy}
                className={`px-4 rounded-r-lg transition-colors ${
                  copied
                    ? 'bg-teal text-white'
                    : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                }`}
              >
                {copied ? (
                  <span className="flex items-center">
                    <Check size={16} className="mr-1" />
                    Copied
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Copy size={16} className="mr-1" />
                    Copy
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Share Options */}
          <div className="space-y-4">
            <button
              onClick={() => handleShare('whatsapp')}
              className="w-full flex items-center p-4 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
            >
              <MessageCircle size={24} className="mr-3" />
              <span className="flex-1 text-left">Share via WhatsApp</span>
              <ExternalLink size={20} />
            </button>

            <button
              onClick={() => handleShare('email')}
              className="w-full flex items-center p-4 rounded-lg bg-pink-light/20 text-charcoal hover:bg-pink-light/30 transition-colors"
            >
              <Mail size={24} className="mr-3" />
              <span className="flex-1 text-left">Share via Email</span>
              <ExternalLink size={20} />
            </button>
          </div>

          {/* Share Message Preview */}
          <div className="mt-8 p-4 bg-ivory rounded-lg">
            <h4 className="font-medium mb-2">Message Preview</h4>
            <p className="text-sm text-charcoal-light">
              Join me on ekaBrahmaa for personalized Ayurvedic wellness! Use my referral code {referralCode} to get ₹250 off your first consultation.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReferralShare;