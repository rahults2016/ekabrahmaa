import React from 'react';
import { ModernHeader } from './ModernHeader';

const ModernHeaderDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-teal-900 mb-6">
            Modern Header Demo
          </h1>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed mb-8">
            This page demonstrates the new modern header component with enhanced visual appeal and improved user experience.
          </p>
          
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-teal-800 mb-4">Key Features</h2>
            <ul className="space-y-3 text-left">
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">✓</span>
                <span>Smooth animations and transitions</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">✓</span>
                <span>Responsive design for all screen sizes</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">✓</span>
                <span>Consistent brand colors and typography</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">✓</span>
                <span>Intuitive navigation with dropdown menus</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">✓</span>
                <span>Optimized for accessibility and performance</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ModernHeaderDemo;