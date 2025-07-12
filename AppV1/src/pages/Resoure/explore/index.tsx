import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Bookmark, Search } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'pdf';
  category: string;
  bookmarked: boolean;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Understanding Your Dosha Type',
    description: 'Learn about the three doshas in Ayurveda and how they influence your well-being.',
    type: 'article',
    category: 'Fundamentals',
    bookmarked: false
  },
  {
    id: '2',
    title: 'Seasonal Eating Guide',
    description: 'Align your diet with nature\'s rhythms for optimal health.',
    type: 'pdf',
    category: 'Nutrition',
    bookmarked: true
  },
  {
    id: '3',
    title: 'Morning Ritual Demonstration',
    description: 'Step-by-step guide to an energizing Ayurvedic morning routine.',
    type: 'video',
    category: 'Lifestyle',
    bookmarked: false
  }
];

const Resources: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-garamond font-semibold">
            Resources Library
          </h2>
          <button className="btn-secondary py-2">
            <Bookmark size={18} className="mr-2" />
            View Bookmarks
          </button>
        </div>

        {/* Search and filters */}
        <div className="card mb-6">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-light" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
            />
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="px-3 py-1 rounded-full text-sm bg-teal text-white">
              All
            </button>
            <button className="px-3 py-1 rounded-full text-sm bg-gray-100 text-charcoal hover:bg-gray-200">
              Articles
            </button>
            <button className="px-3 py-1 rounded-full text-sm bg-gray-100 text-charcoal hover:bg-gray-200">
              Videos
            </button>
            <button className="px-3 py-1 rounded-full text-sm bg-gray-100 text-charcoal hover:bg-gray-200">
              PDFs
            </button>
          </div>
        </div>

        {/* Resources grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource) => (
            <div key={resource.id} className="card hover:shadow-lg">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-lg bg-teal-light/20 flex items-center justify-center mr-4">
                  <BookOpen size={20} className="text-teal" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-garamond font-semibold text-charcoal-dark">
                      {resource.title}
                    </h3>
                    <button className={`text-${resource.bookmarked ? 'teal' : 'charcoal-light'}`}>
                      <Bookmark size={18} />
                    </button>
                  </div>
                  
                  <p className="text-sm text-charcoal-light mt-1">
                    {resource.description}
                  </p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs bg-teal-light/10 text-teal px-2 py-1 rounded-full">
                      {resource.category}
                    </span>
                    <button className="text-teal hover:text-teal-dark text-sm">
                      View {resource.type}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Resources;