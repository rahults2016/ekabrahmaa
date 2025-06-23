import React, { useState } from 'react';
import { Moon, Clock } from 'lucide-react';

interface DreamLogProps {
  onSave: (entry: DreamEntry) => void;
}

interface DreamEntry {
  date: string;
  content: string;
  symbols?: string;
  feeling?: string;
  message?: string;
  sleepTime?: string;
  wakeTime?: string;
  isPrivate: boolean;
}

const DreamLog: React.FC<DreamLogProps> = ({ onSave }) => {
  const [entry, setEntry] = useState<DreamEntry>({
    date: new Date().toISOString().split('T')[0],
    content: '',
    symbols: '',
    feeling: '',
    message: '',
    sleepTime: '',
    wakeTime: '',
    isPrivate: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(entry);
    setEntry({
      date: new Date().toISOString().split('T')[0],
      content: '',
      symbols: '',
      feeling: '',
      message: '',
      sleepTime: '',
      wakeTime: '',
      isPrivate: true
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-teal-light/20 flex items-center justify-center">
          <Moon size={24} className="text-teal" />
        </div>
        <div>
          <h3 className="text-xl font-garamond font-semibold">Dream Log</h3>
          <p className="text-sm text-charcoal-light">Record your dreams and their meanings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Clock size={16} className="text-charcoal-light" />
          <input
            type="time"
            value={entry.sleepTime}
            onChange={(e) => setEntry({ ...entry, sleepTime: e.target.value })}
            placeholder="Sleep time"
            className="input-field"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Clock size={16} className="text-charcoal-light" />
          <input
            type="time"
            value={entry.wakeTime}
            onChange={(e) => setEntry({ ...entry, wakeTime: e.target.value })}
            placeholder="Wake time"
            className="input-field"
          />
        </div>
      </div>

      <textarea
        value={entry.content}
        onChange={(e) => setEntry({ ...entry, content: e.target.value })}
        placeholder="Describe your dream..."
        className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          value={entry.symbols}
          onChange={(e) => setEntry({ ...entry, symbols: e.target.value })}
          placeholder="Symbols or objects"
          className="input-field"
        />
        <input
          type="text"
          value={entry.feeling}
          onChange={(e) => setEntry({ ...entry, feeling: e.target.value })}
          placeholder="Feelings experienced"
          className="input-field"
        />
        <input
          type="text"
          value={entry.message}
          onChange={(e) => setEntry({ ...entry, message: e.target.value })}
          placeholder="Possible message"
          className="input-field"
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={entry.isPrivate}
            onChange={(e) => setEntry({ ...entry, isPrivate: e.target.checked })}
            className="form-checkbox h-4 w-4 text-teal rounded border-gray-300 focus:ring-teal"
          />
          <span className="text-sm text-charcoal-light">Keep private</span>
        </label>

        <button type="submit" className="btn-primary">
          Save Dream Log
        </button>
      </div>
    </form>
  );
};

export default DreamLog;