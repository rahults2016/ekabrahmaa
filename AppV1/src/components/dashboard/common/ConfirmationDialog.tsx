import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'warning' | 'danger' | 'info';
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  type = 'warning'
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          iconColor: 'text-pink',
          iconBg: 'bg-pink-light/20',
          confirmBtn: 'bg-pink hover:bg-pink-dark text-white'
        };
      case 'info':
        return {
          iconColor: 'text-teal',
          iconBg: 'bg-teal-light/20',
          confirmBtn: 'bg-teal hover:bg-teal-dark text-white'
        };
      default:
        return {
          iconColor: 'text-gold',
          iconBg: 'bg-gold-light/20',
          confirmBtn: 'bg-gold hover:bg-gold-dark text-white'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/50 z-50 flex items-center justify-center p-4"
            onClick={onCancel}
          >
            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full ${styles.iconBg} flex items-center justify-center mr-3`}>
                      <AlertTriangle size={20} className={styles.iconColor} />
                    </div>
                    <h3 className="text-lg font-garamond font-semibold text-charcoal-dark">
                      {title}
                    </h3>
                  </div>
                  <button
                    onClick={onCancel}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} className="text-charcoal-light" />
                  </button>
                </div>
                
                <p className="text-charcoal-light mb-6 leading-relaxed">
                  {message}
                </p>
                
                <div className="flex space-x-3">
                  <button
                    onClick={onCancel}
                    className="flex-1 px-4 py-2 border border-gray-200 text-charcoal rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {cancelText}
                  </button>
                  <button
                    onClick={onConfirm}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${styles.confirmBtn}`}
                  >
                    {confirmText}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationDialog;