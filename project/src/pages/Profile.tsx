import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { User, Edit, Share2, FileText, Gift } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const referralCode = 'EKA' + Math.random().toString(36).substring(2, 8).toUpperCase();

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        key={user?.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Header */}
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row items-center">
            <img 
              src={user?.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'} 
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-teal mb-4 md:mb-0 md:mr-6"
            />
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-garamond font-semibold text-charcoal-dark">
                {user?.name || 'User'}
              </h2>
              {user?.bio && (
                <p className="text-charcoal-light mt-1">
                  {user.bio}
                </p>
              )}
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">
                <span className="px-3 py-1 bg-pink-light/20 text-charcoal-light rounded-full text-sm">
                  Member since {user?.joinDate || '2025'}
                </span>
              </div>
            </div>
            
            <Link 
              to="/profile/edit"
              className="mt-4 md:mt-0 md:ml-4 btn-secondary py-2 flex items-center"
            >
              <Edit size={16} className="mr-2" />
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Link to="/medical" className="card hover:shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-pink-light/20 flex items-center justify-center mr-4">
                <FileText size={24} className="text-pink" />
              </div>
              <div>
                <h3 className="font-medium">Medical History</h3>
                <p className="text-sm text-charcoal-light">View your records</p>
              </div>
            </div>
          </Link>

          <Link to="/referral" className="card hover:shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gold-light/20 flex items-center justify-center mr-4">
                <Gift size={24} className="text-gold" />
              </div>
              <div>
                <h3 className="font-medium">Refer & Earn</h3>
                <p className="text-sm text-charcoal-light">Share with friends</p>
              </div>
            </div>
          </Link>

          <Link to="/settings" className="card hover:shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-teal-light/20 flex items-center justify-center mr-4">
                <User size={24} className="text-teal" />
              </div>
              <div>
                <h3 className="font-medium">Account Settings</h3>
                <p className="text-sm text-charcoal-light">Manage preferences</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Progress Overview */}
        <div className="card">
          <h3 className="text-xl font-garamond font-semibold mb-6">Your Journey</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Program Completion</h4>
                <span className="text-teal">38%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-teal rounded-full" style={{ width: '38%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Appointment Attendance</h4>
                <span className="text-teal">92%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-teal rounded-full" style={{ width: '92%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Journal Entries</h4>
                <span className="text-teal">65%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-teal rounded-full" style={{ width: '65%' }} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;