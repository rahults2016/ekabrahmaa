import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Stethoscope, ArrowRight, Shield, Clock, Star } from 'lucide-react';

const TalkToHealer: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <div className="card bg-gradient-to-br from-teal-light/10 to-pink-light/10 mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1 text-center md:text-left mb-6 md:mb-0">
              <h1 className="text-3xl font-garamond font-semibold text-charcoal-dark mb-4">
                Talk to a Healer
              </h1>
              <p className="text-lg text-charcoal-light mb-6">
                1-on-1 sessions with Ayurveda Doctors, Nutritionists, Counselors & Yoga Experts
              </p>
              <button 
                onClick={() => navigate('/healers')}
                className="btn-primary"
              >
                Find Your Healer
              </button>
            </div>
            <div className="w-64 h-64 rounded-full bg-teal-light/20 flex items-center justify-center">
              <Stethoscope size={96} className="text-teal" />
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-teal-light/20 flex items-center justify-center mr-4">
                <Shield size={24} className="text-teal" />
              </div>
              <h3 className="font-medium">Verified Experts</h3>
            </div>
            <p className="text-charcoal-light text-sm">
              All our healers are certified professionals with years of experience
            </p>
          </div>

          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-pink-light/20 flex items-center justify-center mr-4">
                <Clock size={24} className="text-pink" />
              </div>
              <h3 className="font-medium">Flexible Timing</h3>
            </div>
            <p className="text-charcoal-light text-sm">
              Book sessions at your convenience, 7 days a week
            </p>
          </div>

          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gold-light/20 flex items-center justify-center mr-4">
                <Star size={24} className="text-gold" />
              </div>
              <h3 className="font-medium">Personalized Care</h3>
            </div>
            <p className="text-charcoal-light text-sm">
              Get treatment plans tailored to your unique constitution
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="card mb-8">
          <h2 className="text-xl font-garamond font-semibold mb-6">
            Find Healers By Specialty
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Ayurveda Doctors', desc: 'Traditional healing expertise' },
              { title: 'Nutritionists', desc: 'Diet and lifestyle guidance' },
              { title: 'Yoga Experts', desc: 'Personalized practice plans' },
              { title: 'Counselors', desc: 'Mental wellness support' },
              { title: 'Functional Movement Trainers', desc: 'Movement optimization & rehabilitation' }
            ].map((category, index) => (
              <button
                key={index}
                onClick={() => navigate('/healers', { state: { filter: category.title } })}
                className="flex items-center p-4 rounded-lg border-2 border-gray-100 hover:border-teal hover:bg-teal-light/10 transition-all"
              >
                <div className="flex-1">
                  <h3 className="font-medium">{category.title}</h3>
                  <p className="text-sm text-charcoal-light">{category.desc}</p>
                </div>
                <ArrowRight size={20} className="text-teal" />
              </button>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="card">
          <h2 className="text-xl font-garamond font-semibold mb-6">
            How It Works
          </h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-teal-light/20 flex items-center justify-center mr-4 mt-1">
                <span className="text-teal font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-medium mb-1">Complete Your Prakriti Analysis</h4>
                <p className="text-charcoal-light text-sm">
                  Take our comprehensive quiz to discover your unique constitution
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-teal-light/20 flex items-center justify-center mr-4 mt-1">
                <span className="text-teal font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-medium mb-1">Choose Your Healer</h4>
                <p className="text-charcoal-light text-sm">
                  Browse profiles and select a healer that matches your needs
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-teal-light/20 flex items-center justify-center mr-4 mt-1">
                <span className="text-teal font-semibold">3</span>
              </div>
              <div>
                <h4 className="font-medium mb-1">Book Your Session</h4>
                <p className="text-charcoal-light text-sm">
                  Select a convenient time slot and make a secure payment
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-teal-light/20 flex items-center justify-center mr-4 mt-1">
                <span className="text-teal font-semibold">4</span>
              </div>
              <div>
                <h4 className="font-medium mb-1">Begin Your Journey</h4>
                <p className="text-charcoal-light text-sm">
                  Connect with your healer and start your wellness journey
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TalkToHealer;