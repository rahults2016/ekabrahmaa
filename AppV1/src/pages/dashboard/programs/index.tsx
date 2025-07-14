import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { programs, type Program } from '@/features/Programs/types';
import ProgramCard from '@/features/Programs/components/ProgramCard';
import ActivitiesSection from '@/features/Programs/components/ProgramDetails/ActivitiesSection';
import InternalMedicines from '@/features/Programs/components/ProgramDetails/InternalMedicines';
import ExternalApplications from '@/features/Programs/components/ProgramDetails/ExternalApplications';
import PanchakarmaPlan from '@/features/Programs/components/ProgramDetails/PanchakarmaPlan';
import SOSMedications from '@/features/Programs/components/ProgramDetails/SOSMedications';
import StockAlerts from '@/features/Programs/components/ProgramDetails/StockAlerts';
import JourneyCalendar from '@/features/Programs/components/ProgramDetails/JourneyCalendar';


const Programs: React.FC = () => {
  const [currentProgram, setCurrentProgram] = useState<Program>(programs[0]);
  const [showProgramDetails, setShowProgramDetails] = useState(false);
  const [activityStatus, setActivityStatus] = useState<{[key: string]: boolean}>({});
  const [internalMedicineStatus, setInternalMedicineStatus] = useState<{[key: string]: boolean}>({});
  const [externalApplicationStatus, setExternalApplicationStatus] = useState<{[key: string]: boolean}>({});
  const [sosStatus, setSOSStatus] = useState<{[key: string]: boolean}>({});

  // Calculate program dates
  const startDate = new Date();
  const currentDay = Math.round(currentProgram.duration * currentProgram.progress / 100);
  startDate.setDate(startDate.getDate() - currentDay + 1);
  
  // Generate calendar days
  const calendarDays = Array.from({ length: currentProgram.duration }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    return {
      date,
      day: i + 1,
      isCompleted: i + 1 <= currentDay,
      isCurrent: i + 1 === currentDay
    };
  });

  const handleProgramSelect = (program: Program) => {
    setCurrentProgram(program);
    setShowProgramDetails(true);
  };

  const handleActivityComplete = (activityName: string) => {
    setActivityStatus(prev => ({
      ...prev,
      [activityName]: !prev[activityName]
    }));
  };

  const handleInternalMedicineTaken = (medicineId: string) => {
    setInternalMedicineStatus(prev => ({
      ...prev,
      [medicineId]: !prev[medicineId]
    }));
  };

  const handleExternalApplicationCompleted = (applicationId: string) => {
    setExternalApplicationStatus(prev => ({
      ...prev,
      [applicationId]: !prev[applicationId]
    }));
  };

  const handleSOSUsed = (sosId: string) => {
    setSOSStatus(prev => ({
      ...prev,
      [sosId]: !prev[sosId]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl font-garamond font-semibold text-charcoal-dark mb-2">
              Your Healing Programs
            </h2>
            <p className="text-charcoal-light">
              Continue your wellness journey with personalized healing programs
            </p>
          </div>
          {showProgramDetails && (
            <button 
              onClick={() => setShowProgramDetails(false)}
              className="btn-secondary"
            >
              Back to Programs
            </button>
          )}
        </div>
        
        {!showProgramDetails ? (
          <div className="space-y-6">
            {/* Unlocked Programs */}
            <div>
              <h3 className="text-2xl font-garamond font-semibold mb-4 text-charcoal-dark">
                Active Programs
              </h3>
              <div className="space-y-4">
                {programs.filter(p => p.unlocked).map((program) => (
                  <ProgramCard 
                    key={program.id} 
                    program={program}
                    onSelect={handleProgramSelect}
                  />
                ))}
              </div>
            </div>

            {/* Locked Programs */}
            <div>
              <h3 className="text-2xl font-garamond font-semibold mb-4 text-charcoal-dark">
                Available Programs
              </h3>
              <div className="space-y-4">
                {programs.filter(p => !p.unlocked).map((program) => (
                  <ProgramCard 
                    key={program.id} 
                    program={program}
                    onSelect={handleProgramSelect}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Program Header */}
            <div className="card">
              <h3 className="text-2xl font-garamond font-semibold text-charcoal-dark mb-2">
                {currentProgram.title}
              </h3>
              <p className="text-charcoal-light">{currentProgram.description}</p>
            </div>

            <ActivitiesSection 
              program={currentProgram} 
              activityStatus={activityStatus}
              onActivityComplete={handleActivityComplete}
            />

            {currentProgram.internalMedicines && currentProgram.internalMedicines.length > 0 && (
              <InternalMedicines
                medicines={currentProgram.internalMedicines}
                status={internalMedicineStatus}
                onMedicineTaken={handleInternalMedicineTaken}
              />
            )}

            {currentProgram.externalApplications && currentProgram.externalApplications.length > 0 && (
              <ExternalApplications
                applications={currentProgram.externalApplications}
                status={externalApplicationStatus}
                onApplicationCompleted={handleExternalApplicationCompleted}
              />
            )}

            {currentProgram.panchakarmaPlan && currentProgram.panchakarmaPlan.length > 0 && (
              <PanchakarmaPlan phases={currentProgram.panchakarmaPlan} />
            )}

            {currentProgram.sosMedications && currentProgram.sosMedications.length > 0 && (
              <SOSMedications
                medications={currentProgram.sosMedications}
                status={sosStatus}
                onSOSUsed={handleSOSUsed}
              />
            )}

            <StockAlerts program={currentProgram} />

            <JourneyCalendar 
              days={calendarDays} 
              currentDay={currentDay} 
              duration={currentProgram.duration} 
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Programs;