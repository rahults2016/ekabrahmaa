import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageCircle, Video, Calendar, Clock, Award, Languages, MapPin } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getHealerById } from '../data/healers';

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: '1',
    userName: 'Sarah M.',
    userAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    comment: 'Dr. Sharma\'s holistic approach to treating my chronic digestive issues has been life-changing. Her expertise in Ayurveda combined with modern wellness practices provided me with a sustainable healing path.',
    date: '2 weeks ago'
  },
  {
    id: '2',
    userName: 'John D.',
    userAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4,
    comment: 'Very knowledgeable and patient in explaining the treatment plan. The follow-up care has been excellent.',
    date: '1 month ago'
  }
];

const HealerProfile: React.FC = () => {
  const { id } = useParams();
  
  // Get healer data from our detailed database
  const healer = id ? getHealerById(id) : null;

  if (!healer) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card text-center py-12">
          <h2 className="text-xl font-garamond font-semibold mb-2">Healer Not Found</h2>
          <p className="text-charcoal-light">The healer you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Healer header */}
        <div className="card mb-6">
          <div className="flex items-start">
            <img
              src={healer.avatar}
              alt={healer.fullName}
              className="w-24 h-24 rounded-full object-cover mr-6"
            />
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-garamond font-semibold">
                    {healer.fullName}
                    {healer.verified && (
                      <span className="ml-2 text-xs bg-teal-light/10 text-teal px-2 py-1 rounded-full">
                        Verified
                      </span>
                    )}
                  </h2>
                  <p className="text-charcoal-light">{healer.title}</p>
                  
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star size={16} className="text-gold fill-current" />
                      <span className="ml-1 font-medium">{healer.rating}</span>
                      <span className="ml-1 text-charcoal-light">
                        ({healer.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center text-charcoal-light">
                      <MessageCircle size={16} className="mr-1" />
                      <span>{healer.consultations}+ consultations</span>
                    </div>
                  </div>
                </div>
                
                <button className="btn-primary">
                  <Video size={18} className="mr-2" />
                  Book Consultation
                </button>
              </div>
              
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center text-charcoal-light">
                  <Calendar size={16} className="mr-2" />
                  <span>{healer.experience}+ years exp.</span>
                </div>
                <div className="flex items-center text-charcoal-light">
                  <Languages size={16} className="mr-2" />
                  <span>{healer.languages.join(', ')}</span>
                </div>
                <div className="flex items-center text-charcoal-light">
                  <MapPin size={16} className="mr-2" />
                  <span>{healer.location}</span>
                </div>
                <div className="flex items-center text-charcoal-light">
                  <Clock size={16} className="mr-2" />
                  <span>{healer.available ? 'Available Now' : healer.nextSlot}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="md:col-span-2 space-y-6">
            {/* About */}
            <div className="card">
              <h3 className="text-xl font-garamond font-semibold mb-4">About</h3>
              <p className="text-charcoal-light">{healer.biography}</p>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Education & Certifications</h4>
                <ul className="space-y-2">
                  {healer.credentials.map((credential, index) => (
                    <li key={index} className="flex items-center text-charcoal-light">
                      <Award size={16} className="mr-2 text-teal" />
                      <span>{credential.degree} - {credential.institution} ({credential.year})</span>
                    </li>
                  ))}
                </ul>
              </div>

              {healer.boardCertifications.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Board Certifications</h4>
                  <ul className="space-y-2">
                    {healer.boardCertifications.map((cert, index) => (
                      <li key={index} className="text-sm text-charcoal-light">
                        <div className="font-medium">{cert.certification}</div>
                        <div className="text-xs">{cert.board} • Expires: {new Date(cert.expirationDate).toLocaleDateString()}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {healer.uniqueApproaches.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Unique Treatment Approaches</h4>
                  <ul className="space-y-1">
                    {healer.uniqueApproaches.map((approach, index) => (
                      <li key={index} className="flex items-start text-charcoal-light text-sm">
                        <div className="w-2 h-2 rounded-full bg-teal mr-2 mt-2" />
                        <span>{approach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Specialties */}
            <div className="card">
              <h3 className="text-xl font-garamond font-semibold mb-4">Specialties</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {healer.specialties.map((specialty, index) => (
                  <div key={index} className="flex items-center p-3 bg-teal-light/10 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center text-white mr-3">
                      <Award size={16} />
                    </div>
                    <span>{specialty}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Age Groups Served */}
            <div className="card">
              <h3 className="text-xl font-garamond font-semibold mb-4">Age Groups Served</h3>
              <div className="flex flex-wrap gap-2">
                {healer.ageGroupsServed.map((ageGroup, index) => (
                  <span key={index} className="px-3 py-1 bg-pink-light/20 text-charcoal rounded-full text-sm">
                    {ageGroup}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-garamond font-semibold">Reviews</h3>
                <div className="flex items-center">
                  <Star size={16} className="text-gold fill-current" />
                  <span className="ml-1 font-medium">{healer.rating}</span>
                  <span className="ml-1 text-charcoal-light">
                    ({healer.reviews} reviews)
                  </span>
                </div>
              </div>
              
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                    <div className="flex items-start">
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium">{review.userName}</h4>
                          <span className="mx-2">•</span>
                          <span className="text-charcoal-light text-sm">{review.date}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < review.rating ? 'text-gold fill-current' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-charcoal-light">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Booking sidebar */}
          <div className="md:col-span-1">
            <div className="card sticky top-6">
              <h3 className="text-xl font-garamond font-semibold mb-4">
                Book a Consultation
              </h3>
              
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-charcoal-light">Consultation Fee</span>
                  <span className="font-medium">₹{healer.consultationFee.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-charcoal-light">Duration</span>
                  <span className="font-medium">{healer.sessionDurations.join(', ')} minutes</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Session Modes</h4>
                <div className="flex flex-wrap gap-2">
                  {healer.consultationModes.map((mode, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-charcoal text-xs rounded-full capitalize">
                      {mode === 'video' ? 'Video Call' : mode === 'audio' ? 'Audio Call' : 'In-Person'}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-2">Available Slots</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['10:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'].map((slot) => (
                    <button
                      key={slot}
                      className="p-2 text-sm border border-gray-200 rounded-lg hover:border-teal hover:bg-teal-light/10 transition-colors"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              
              <button className="btn-primary w-full">
                Book Appointment
              </button>
              
              <p className="mt-4 text-xs text-center text-charcoal-light">
                Free cancellation up to 12 hours before the appointment
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HealerProfile;