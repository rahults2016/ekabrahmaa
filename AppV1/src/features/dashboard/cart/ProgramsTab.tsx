// features/cart/ProgramsTab.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, Trash2 } from 'lucide-react';
import type { CartProgram } from './cartData';

interface ProgramsTabProps {
  programs: CartProgram[];
  toggleProgramInCart: (id: string) => void;
}

const ProgramsTab: React.FC<ProgramsTabProps> = ({ programs, toggleProgramInCart }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-garamond font-semibold">Wellness Programs</h2>
      <div className="text-sm text-charcoal-light">
        {programs.filter(p => p.inCart).length} of {programs.length} selected
      </div>
    </div>

    {programs.map((program) => (
      <motion.div
        key={program.id}
        layout
        className={`card border-2 transition-all ${
          program.inCart ? 'border-teal bg-teal-light/5' : 'border-gray-200'
        }`}
      >
        <div className="flex flex-col md:flex-row">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-garamond font-semibold text-charcoal-dark mb-1">
                  {program.name}
                </h3>
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center text-sm text-charcoal-light">
                    <Calendar size={14} className="mr-1" />
                    {program.duration} days
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    program.level === 'Beginner' ? 'bg-teal-light/20 text-teal' :
                    program.level === 'Intermediate' ? 'bg-gold-light/20 text-gold' :
                    'bg-pink-light/20 text-pink'
                  }`}>
                    {program.level}
                  </span>
                </div>
                <p className="text-charcoal-light text-sm mb-3">
                  {program.description}
                </p>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  {program.discountPrice && (
                    <span className="text-sm text-charcoal-light line-through">
                      ₹{program.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-xl font-semibold text-teal">
                    ₹{(program.discountPrice || program.originalPrice).toLocaleString()}
                  </span>
                </div>
                {program.discountPrice && (
                  <div className="text-xs text-pink font-medium">
                    Save ₹{(program.originalPrice - program.discountPrice).toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-charcoal-dark mb-2">Includes:</h4>
              <div className="flex flex-wrap gap-2">
                {program.includes.map((item, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-charcoal text-xs rounded-full">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => toggleProgramInCart(program.id)}
              className={`w-full md:w-auto px-6 py-2 rounded-lg transition-colors ${
                program.inCart
                  ? 'bg-pink-light/20 text-pink border border-pink-light hover:bg-pink-light/30'
                  : 'bg-teal text-white hover:bg-teal-dark'
              }`}
            >
              {program.inCart ? (
                <span className="flex items-center justify-center">
                  <Trash2 size={16} className="mr-2" />
                  Remove from Cart
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Plus size={16} className="mr-2" />
                  Add to Cart
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

export default ProgramsTab;