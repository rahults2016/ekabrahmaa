import React from 'react';
import { Clock, Video, Calendar } from 'lucide-react';

interface AppointmentCardProps {
  title: string;
  doctorName: string;
  doctorAvatar: string;
  date: string;
  time: string;
  isUpcoming: boolean;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  title,
  doctorName,
  doctorAvatar,
  date,
  time,
  isUpcoming,
}) => {
  return (
    <div className="card hover:shadow-lg border-l-4 border-teal">
      <div className="flex items-start">
        <img 
          src={doctorAvatar} 
          alt={doctorName}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        
        <div className="flex-1">
          <h3 className="text-lg font-garamond font-semibold text-charcoal-dark">
            {title}
          </h3>
          <p className="text-charcoal text-sm">with Dr. {doctorName}</p>
          
          <div className="mt-3 flex flex-wrap gap-3">
            <div className="flex items-center text-sm text-charcoal-light">
              <Calendar size={14} className="mr-1" />
              <span>{date}</span>
            </div>
            
            <div className="flex items-center text-sm text-charcoal-light">
              <Clock size={14} className="mr-1" />
              <span>{time}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        {isUpcoming ? (
          <button className="btn-primary flex items-center text-sm py-2">
            <Video size={16} className="mr-2" />
            Join Session
          </button>
        ) : (
          <button className="btn-secondary text-sm py-2">Reschedule</button>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;