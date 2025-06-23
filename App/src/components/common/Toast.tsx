import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

interface ToastProps {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const { id, type, title, message, duration = 5000 } = toast;

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onRemove]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-teal-light/10 border-teal-light',
          icon: <CheckCircle size={20} className="text-teal" />,
          titleColor: 'text-teal'
        };
      case 'error':
        return {
          bg: 'bg-pink-light/20 border-pink-light',
          icon: <AlertCircle size={20} className="text-pink" />,
          titleColor: 'text-pink'
        };
      case 'warning':
        return {
          bg: 'bg-gold-light/20 border-gold-light',
          icon: <AlertCircle size={20} className="text-gold" />,
          titleColor: 'text-gold'
        };
      default:
        return {
          bg: 'bg-teal-light/10 border-teal-light',
          icon: <Info size={20} className="text-teal" />,
          titleColor: 'text-teal'
        };
    }
  };

  const styles = getToastStyles();

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`${styles.bg} border-2 rounded-lg shadow-lg p-4 max-w-sm w-full`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          {styles.icon}
        </div>
        <div className="flex-1">
          <h4 className={`font-medium ${styles.titleColor} mb-1`}>
            {title}
          </h4>
          {message && (
            <p className="text-sm text-charcoal-light">
              {message}
            </p>
          )}
        </div>
        <button
          onClick={() => onRemove(id)}
          className="flex-shrink-0 ml-2 p-1 hover:bg-white/50 rounded-full transition-colors"
        >
          <X size={16} className="text-charcoal-light" />
        </button>
      </div>
    </motion.div>
  );
};

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;