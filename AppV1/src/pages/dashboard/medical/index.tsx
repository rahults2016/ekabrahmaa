import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Download, Eye, Plus, User } from 'lucide-react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import MedicalHistoryForm from '@/features/dashboard/medical/MedicalHistoryForm';
import MedicalHistoryView from '@/features/dashboard/medical/MedicalHistoryView';



interface MedicalRecord {
  id: string;
  title: string;
  type: string;
  date: string;
  doctor: string;
  fileSize: string;
}

const MedicalHistory: React.FC = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [fileUploading, setFileUploading] = useState(false); 
  const navigate = useNavigate();

  const handleViewHealthProfile = () => {
    navigate('/medical/new');
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;
    setFileUploading(true);
    
    try {
      // Simulate file upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newRecords = Array.from(files).map((file, index) => ({
        id: Date.now() + index.toString(),
        title: file.name,
        type: file.type.split('/')[1].toUpperCase(),
        date: new Date().toISOString().split('T')[0],
        doctor: 'Uploaded by You',
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      }));
      
      setRecords(prev => [...newRecords, ...prev]);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setFileUploading(false);
    }
  };

  const filteredRecords = records.filter(record => 
    record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-garamond font-semibold">
                  Medical History
                </h2>
                <Link to="/medical/new" className="btn-primary py-2 flex items-center">
                  <Plus size={18} className="mr-2" />
                  Add New Record
                </Link>
              </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button 
            onClick={handleViewHealthProfile}
            className="card hover:shadow-lg cursor-pointer bg-gradient-to-br from-teal-light/10 to-pink-light/10 text-left"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-teal-light/20 flex items-center justify-center mr-3">
                <User size={20} className="text-teal" />
              </div>
              <div>
                <h3 className="font-medium">View/Edit Health Profile</h3>
                <p className="text-sm text-charcoal-light">Complete medical history</p>
              </div>
            </div>
          </button>

          <label 
            htmlFor="file-upload"
            className={`card hover:shadow-lg cursor-pointer ${fileUploading ? 'opacity-50' : ''}`}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-pink-light/20 flex items-center justify-center mr-3">
                <Upload size={20} className="text-pink" />
              </div>
              <div>
                <h3 className="font-medium">
                  {fileUploading ? 'Uploading...' : 'Upload Reports'}
                </h3>
                <p className="text-sm text-charcoal-light">
                  {fileUploading ? 'Please wait...' : 'Share medical documents'}
                </p>
              </div>
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              multiple
              onChange={(e) => handleFileUpload(e.target.files)}
              disabled={fileUploading}
            />
          </label>

          <div className="card hover:shadow-lg cursor-pointer">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gold-light/20 flex items-center justify-center mr-3">
                <Download size={20} className="text-gold" />
              </div>
              <div>
                <h3 className="font-medium">Export All</h3>
                <p className="text-sm text-charcoal-light">Download your records</p>
              </div>
            </div>
          </div>
        </div>

        {/* Records list */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-garamond font-semibold">
              Recent Records
            </h3>
            <div className="relative w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search records..."
                className="input-field pl-8"
              />
              <svg
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-charcoal-light"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>

          <div className="space-y-4">
            {filteredRecords.length === 0 ? (
              <div className="text-center py-8 text-charcoal-light">
                <FileText size={48} className="mx-auto mb-4 opacity-50" />
                <p>No records found</p>
              </div>
            ) : filteredRecords.map((record) => (
              <div 
                key={record.id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-teal-light transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mr-4">
                    <FileText size={20} className="text-charcoal" />
                  </div>
                  
                  <div>
                    <h4 className="font-medium">{record.title}</h4>
                    <div className="flex items-center text-sm text-charcoal-light mt-1">
                      <span>{record.date}</span>
                      <span className="mx-2">•</span>
                      <span>{record.doctor}</span>
                      <span className="mx-2">•</span>
                      <span>{record.fileSize}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Link 
                    to={`/medical/view/${record.id}`}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Eye size={18} className="text-charcoal-light" />
                  </Link>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download size={18} className="text-charcoal-light" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
            </>
          } />

          <Route path="/new" element={<MedicalHistoryForm />} />
          <Route path="/view/:id" element={<MedicalHistoryView />} />
        </Routes>
      </motion.div>
    </div>
  );
};

export default MedicalHistory;