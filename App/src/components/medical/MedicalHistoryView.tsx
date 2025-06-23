import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, Download, Calendar, User, ArrowLeft } from 'lucide-react';

const MedicalHistoryView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in a real app, this would be fetched from your backend
  const record = {
    id,
    date: '2025-04-26',
    doctor: 'Dr. Anjali Sharma',
    type: 'Initial Consultation',
    sections: [
      {
        title: 'Personal Information',
        data: {
          'Name': 'Rebecca Johnson',
          'Age': '32',
          'Gender': 'Female',
          'Email': 'rebecca@example.com'
        }
      },
      {
        title: 'Lifestyle History',
        data: {
          'Weight': '65 kg',
          'Height': '168 cm',
          'Sleep Pattern': '7-8 hours',
          'Exercise': 'Regular yoga'
        }
      },
      {
        title: 'Medical History',
        data: {
          'Current Complaints': 'Occasional digestive issues',
          'Past Illnesses': 'None significant',
          'Medications': 'None',
          'Allergies': 'None known'
        }
      }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate('/medical')}
              className="p-2 rounded-full hover:bg-gray-100 text-charcoal transition-colors mr-4"
            >
              <ArrowLeft size={20} />
            </button>
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <FileText size={24} className="text-teal mr-3" />
              <div>
                <h2 className="text-xl font-garamond font-semibold">
                  {record.type}
                </h2>
                <p className="text-charcoal-light">
                  By {record.doctor} on {new Date(record.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <button className="btn-secondary py-2">
              <Download size={18} className="mr-2" />
              Export PDF
            </button>
          </div>

          <div className="space-y-8">
            {record.sections.map((section, index) => (
              <div key={index}>
                <h3 className="font-medium mb-4 pb-2 border-b">
                  {section.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(section.data).map(([key, value]) => (
                    <div key={key} className="flex items-start">
                      <span className="text-charcoal-light w-32">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MedicalHistoryView;