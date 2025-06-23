```typescript
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Plus, Clock, Check, Star } from 'lucide-react';

interface MealEntry {
  id: string;
  time: string;
  items: string[];
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  notes?: string;
  dosha?: {
    vata: number;
    pitta: number;
    kapha: number;
  };
}

const FoodLog: React.FC = () => {
  const [entries, setEntries] = useState<MealEntry[]>([]);
  const [newEntry, setNewEntry] = useState<Partial<MealEntry>>({
    type: 'breakfast',
    items: []
  });
  const [newItem, setNewItem] = useState('');

  const mealTypes = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snack' }
  ];

  const handleAddItem = () => {
    if (!newItem.trim()) return;
    setNewEntry(prev => ({
      ...prev,
      items: [...(prev.items || []), newItem.trim()]
    }));
    setNewItem('');
  };

  const handleRemoveItem = (index: number) => {
    setNewEntry(prev => ({
      ...prev,
      items: prev.items?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.time || !newEntry.items?.length) return;

    const entry: MealEntry = {
      id: Date.now().toString(),
      time: newEntry.time || '',
      items: newEntry.items || [],
      type: newEntry.type as 'breakfast' | 'lunch' | 'dinner' | 'snack',
      notes: newEntry.notes,
      dosha: {
        vata: Math.random() * 100,
        pitta: Math.random() * 100,
        kapha: Math.random() * 100
      }
    };

    setEntries(prev => [entry, ...prev]);
    setNewEntry({ type: 'breakfast', items: [] });
  };

  return (
    <div className="space-y-6">
      {/* Add New Entry */}
      <div className="card">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-lg bg-teal-light/20 flex items-center justify-center mr-3">
            <Utensils size={20} className="text-teal" />
          </div>
          <h3 className="text-xl font-garamond font-semibold">Food Log</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal-dark mb-2">
                Meal Type
              </label>
              <select
                value={newEntry.type}
                onChange={(e) => setNewEntry(prev => ({ ...prev, type: e.target.value }))}
                className="input-field"
                required
              >
                {mealTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-dark mb-2">
                Time
              </label>
              <input
                type="time"
                value={newEntry.time || ''}
                onChange={(e) => setNewEntry(prev => ({ ...prev, time: e.target.value }))}
                className="input-field"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal-dark mb-2">
              Add Items
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                className="input-field flex-1"
                placeholder="Enter food item"
              />
              <button
                type="button"
                onClick={handleAddItem}
                className="btn-secondary px-4"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {newEntry.items && newEntry.items.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {newEntry.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                >
                  <span className="text-sm">{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="ml-2 text-charcoal-light hover:text-pink"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-charcoal-dark mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={newEntry.notes || ''}
              onChange={(e) => setNewEntry(prev => ({ ...prev, notes: e.target.value }))}
              className="input-field h-24 resize-none"
              placeholder="Add any notes about your meal..."
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Save Entry
          </button>
        </form>
      </div>

      {/* Today's Entries */}
      {entries.length > 0 && (
        <div className="space-y-4">
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Clock size={18} className="text-teal mr-2" />
                  <span className="font-medium">{entry.time}</span>
                  <span className="mx-2">•</span>
                  <span className="text-charcoal-light capitalize">{entry.type}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star size={16} className="text-gold" />
                  <span className="text-sm">Dosha Balance</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {entry.items.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <Check size={16} className="text-teal mr-2" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {entry.notes && (
                <p className="text-sm text-charcoal-light bg-gray-50 p-3 rounded-lg">
                  {entry.notes}
                </p>
              )}

              <div className="mt-4 pt-4 border-t">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Vata</span>
                    <div className="flex-1 mx-4">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal rounded-full"
                          style={{ width: `${entry.dosha?.vata}%` }}
                        />
                      </div>
                    </div>
                    <span>{Math.round(entry.dosha?.vata || 0)}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Pitta</span>
                    <div className="flex-1 mx-4">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-pink rounded-full"
                          style={{ width: `${entry.dosha?.pitta}%` }}
                        />
                      </div>
                    </div>
                    <span>{Math.round(entry.dosha?.pitta || 0)}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Kapha</span>
                    <div className="flex-1 mx-4">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold rounded-full"
                          style={{ width: `${entry.dosha?.kapha}%` }}
                        />
                      </div>
                    </div>
                    <span>{Math.round(entry.dosha?.kapha || 0)}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodLog;
```