'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileText, 
  Image, 
  CheckCircle, 
  Download,
  Eye,
  Trash2,
  Camera,
  FileImage,
  FileSpreadsheet,
  File
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadProgress: number;
  status: 'uploading' | 'completed' | 'error';
  category: string;
}

const fileCategories = [
  { id: 'lab-reports', label: 'Lab Reports', icon: <FileText className="w-4 h-4" />, color: 'bg-blue-100 text-blue-700' },
  { id: 'medical-images', label: 'Medical Images', icon: <FileImage className="w-4 h-4" />, color: 'bg-green-100 text-green-700' },
  { id: 'prescriptions', label: 'Prescriptions', icon: <FileSpreadsheet className="w-4 h-4" />, color: 'bg-purple-100 text-purple-700' },
  { id: 'photos', label: 'Photos', icon: <Camera className="w-4 h-4" />, color: 'bg-pink-100 text-pink-700' },
  { id: 'other', label: 'Other Documents', icon: <File className="w-4 h-4" />, color: 'bg-gray-100 text-gray-700' }
];

export default function UploadPortal() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('lab-reports');
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadProgress: 0,
      status: 'uploading' as const,
      category: selectedCategory
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
    setIsUploading(true);

    // Simulate file upload progress
    newFiles.forEach((file, index) => {
      const interval = setInterval(() => {
        setUploadedFiles(prev => 
          prev.map(f => {
            if (f.id === file.id) {
              const newProgress = Math.min(f.uploadProgress + Math.random() * 15, 100);
              const isComplete = newProgress >= 100;
              
              if (isComplete) {
                clearInterval(interval);
                // Check if all files are complete
                setTimeout(() => {
                  setIsUploading(false);
                  const allComplete = prev.every(file => file.uploadProgress >= 100);
                  if (allComplete) {
                    setUploadComplete(true);
                  }
                }, 500);
              }
              
              return {
                ...f,
                uploadProgress: newProgress,
                status: isComplete ? 'completed' as const : 'uploading' as const
              };
            }
            return f;
          })
        );
      }, 200 + index * 100);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-5 h-5" />;
    if (type.includes('pdf')) return <FileText className="w-5 h-5" />;
    if (type.includes('spreadsheet') || type.includes('excel')) return <FileSpreadsheet className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  const selectedCategoryInfo = fileCategories.find(cat => cat.id === selectedCategory);

  if (uploadComplete && uploadedFiles.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-teal-200 shadow-xl bg-white/90 backdrop-blur-sm text-center">
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-serif font-bold text-teal-900 mb-4">
                Documents Uploaded Successfully!
              </h2>
              
              <p className="text-xl text-teal-700 mb-8 leading-relaxed">
                Thank you for uploading your documents. Our healers will review them before your consultation.
              </p>
              
              <div className="bg-teal-50 p-6 rounded-lg mb-8">
                <h3 className="font-semibold text-teal-800 mb-4">Uploaded Files Summary:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {fileCategories.map(category => {
                    const categoryFiles = uploadedFiles.filter(f => f.category === category.id);
                    if (categoryFiles.length === 0) return null;
                    
                    return (
                      <div key={category.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div className="flex items-center space-x-2">
                          {category.icon}
                          <span className="font-medium text-teal-800">{category.label}</span>
                        </div>
                        <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                          {categoryFiles.length} file{categoryFiles.length !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/consultation">
                  <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-3 rounded-full">
                    Schedule Consultation
                    <CheckCircle className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50 px-6 py-3 rounded-full">
                    Return to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-teal-900 mb-4">
            Upload Your Documents
          </h1>
          <p className="text-xl text-teal-700 leading-relaxed">
            Share your lab reports, medical images, and other relevant documents with your healers
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Category Selection */}
          <div className="lg:col-span-1">
            <Card className="border-teal-200 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-teal-900">Document Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {fileCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full p-3 rounded-lg text-left transition-all duration-200 flex items-center space-x-3 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${selectedCategory === category.id ? 'bg-white/20' : category.color}`}>
                      {category.icon}
                    </div>
                    <span className="font-medium">{category.label}</span>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Upload Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-teal-200 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-teal-900">
                  Upload {selectedCategoryInfo?.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Upload Zone */}
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                    isDragOver
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-teal-200 hover:border-teal-400 hover:bg-teal-50'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-100 to-pink-100 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-teal-600" />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-teal-900 mb-2">
                        Drop files here or click to browse
                      </h3>
                      <p className="text-teal-600 mb-4">
                        Supported formats: PDF, JPG, PNG, DOCX (Max 10MB per file)
                      </p>
                    </div>
                    
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Select Files
                    </Button>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.docx,.doc"
                      onChange={(e) => handleFileSelect(e.target.files)}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Upload Guidelines */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Upload Guidelines
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Ensure documents are clear and readable</li>
                    <li>• Include recent lab reports (within 6 months)</li>
                    <li>• Upload prescription images if text is unclear</li>
                    <li>• All information will be kept confidential</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <Card className="border-teal-200 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-teal-900">
                    <span>Uploaded Files ({uploadedFiles.length})</span>
                    {isUploading && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        Uploading...
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {uploadedFiles.map(file => (
                      <div key={file.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="text-teal-600">
                              {getFileIcon(file.type)}
                            </div>
                            <div>
                              <h4 className="font-medium text-teal-900 truncate max-w-xs">
                                {file.name}
                              </h4>
                              <p className="text-sm text-teal-600">
                                {formatFileSize(file.size)} • {fileCategories.find(c => c.id === file.category)?.label}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {file.status === 'completed' && (
                              <>
                                <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700">
                                  <Download className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(file.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-teal-600">
                              {file.status === 'uploading' ? 'Uploading...' : 
                               file.status === 'completed' ? 'Upload complete' : 'Upload failed'}
                            </span>
                            <span className="text-teal-600">{Math.round(file.uploadProgress)}%</span>
                          </div>
                          <Progress 
                            value={file.uploadProgress} 
                            className={`h-2 ${
                              file.status === 'completed' ? 'bg-green-100' : 
                              file.status === 'error' ? 'bg-red-100' : 'bg-blue-100'
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {uploadedFiles.every(f => f.status === 'completed') && uploadedFiles.length > 0 && (
                    <div className="mt-6 text-center">
                      <Button
                        onClick={() => setUploadComplete(true)}
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-full"
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Complete Upload Process
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}