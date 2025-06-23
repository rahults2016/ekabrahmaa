import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, MessageCircle, Video, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { detailedHealers, DetailedHealer } from '../data/healers';

const HealerDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [filteredHealers, setFilteredHealers] = useState<DetailedHealer[]>(detailedHealers);

  // Filter healers based on search and filters
  React.useEffect(() => {
    let filtered = detailedHealers;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(healer =>
        healer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        healer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        healer.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Specialty filter
    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter(healer =>
        selectedSpecialties.some(specialty =>
          healer.specialties.some(healerSpecialty =>
            healerSpecialty.toLowerCase().includes(specialty.toLowerCase())
          )
        )
      );
    }

    // Language filter
    if (selectedLanguages.length > 0) {
      filtered = filtered.filter(healer =>
        selectedLanguages.some(language =>
          healer.languages.includes(language)
        )
      );
    }

    setFilteredHealers(filtered);
  }, [searchQuery, selectedSpecialties, selectedLanguages]);
  
  const handleSpecialtyToggle = (specialty: string) => {
    setSelectedSpecialties(prev =>
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };
  
  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages(prev =>
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-garamond font-semibold">Find Your Healer</h2>
            <p className="text-charcoal-light">Connect with expert practitioners for personalized care</p>
          </div>
          
          <button className="btn-secondary py-2">
            <Filter size={18} className="mr-2" />
            Filters
          </button>
        </div>
        
        {/* Search and filters */}
        <div className="card mb-6">
          <div className="relative mb-4">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-light" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, specialty, or condition..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['Digestive Health', 'Stress Management', 'Women\'s Health', 'Movement Therapy', 'Mental Health', 'Nutrition'].map(specialty => (
              <button
                key={specialty}
                onClick={() => handleSpecialtyToggle(specialty)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedSpecialties.includes(specialty)
                    ? 'bg-teal text-white'
                    : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
        
        {/* Healers list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHealers.map((healer) => (
            <Link
              key={healer.id}
              to={`/healers/${healer.id}`} 
              className="card hover:shadow-lg transition-all"
            >
              <div className="flex items-start">
                <img
                  src={healer.avatar}
                  alt={healer.fullName}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-garamond font-semibold">
                        {healer.fullName}
                        {healer.verified && (
                          <span className="ml-2 text-xs bg-teal-light/10 text-teal px-2 py-1 rounded-full">
                            Verified
                          </span>
                        )}
                      </h3>
                      <p className="text-charcoal-light text-sm">{healer.title}</p>
                    </div>
                    
                    <div className="flex items-center">
                      <Star size={16} className="text-gold fill-current" />
                      <span className="ml-1 text-sm font-medium">{healer.rating}</span>
                      <span className="ml-1 text-xs text-charcoal-light">
                        ({healer.reviews})
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex flex-wrap gap-1">
                    {healer.specialties.slice(0, 3).map((specialty, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-charcoal-light px-2 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                    {healer.specialties.length > 3 && (
                      <span className="text-xs text-charcoal-light px-2 py-1">
                        +{healer.specialties.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-3 flex items-center text-sm text-charcoal-light space-x-4">
                    <div className="flex items-center">
                      <MessageCircle size={14} className="mr-1" />
                      <span>{healer.consultations}+ consultations</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <span>{healer.experience}+ years</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${
                        healer.available ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                      <span className="ml-2 text-sm">
                        {healer.available ? 'Available Now' : healer.nextSlot}
                      </span>
                    </div>
                    
                    <button className="btn-primary text-sm py-1 px-4">
                      <Video size={14} className="mr-2" />
                      Consult
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HealerDirectory;