import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`p-2 rounded-full hover:bg-gray-100 text-charcoal transition-colors ${className}`}
      aria-label="Go back"
    >
      <ArrowLeft size={20} />
    </button>
  );
};

export default BackButton;