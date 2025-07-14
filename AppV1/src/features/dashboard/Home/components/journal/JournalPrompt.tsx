import React, { useState } from 'react';

interface JournalPromptProps {
  prompt: string;
  onSave: (content: string) => void;
}

const JournalPrompt: React.FC<JournalPromptProps> = ({ prompt, onSave }) => {
  const [content, setContent] = useState('');
  
  const handleSave = () => {
    if (content.trim()) {
      onSave(content);
      setContent('');
    }
  };
  
  return (
    <div className="card">
      <h3 className="text-lg font-garamond font-semibold mb-4 text-charcoal-dark">
        {prompt}
      </h3>
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing your thoughts here..."
        className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
      ></textarea>
      
      <div className="mt-4 flex justify-end">
        <button 
          onClick={handleSave}
          disabled={!content.trim()}
          className={`btn-primary py-2 ${
            !content.trim() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Save Entry
        </button>
      </div>
    </div>
  );
};

export default JournalPrompt;