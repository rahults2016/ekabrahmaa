import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, RotateCcw, Check, X, Sun, Smile, Send, 
  Sliders, Plus, Minus, ArrowLeft, Heart, Sparkles,
  Moon, Clock, Shield, Image, MessageCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface CapturedPhoto {
  id: string;
  dataUrl: string;
  timestamp: Date;
  message: string;
  enhancements: {
    brightness: number;
    contrast: number;
  };
}

interface PhotoEnhancements {
  brightness: number;
  contrast: number;
}

const MorningSmile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [currentStep, setCurrentStep] = useState<'setup' | 'camera' | 'countdown' | 'enhance' | 'preview' | 'share'>('setup');
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [message, setMessage] = useState('');
  const [enhancements, setEnhancements] = useState<PhotoEnhancements>({
    brightness: 100,
    contrast: 100
  });
  const [isSharing, setIsSharing] = useState(false);
  const [showFaceGuide, setShowFaceGuide] = useState(true);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [hasSharedToday, setHasSharedToday] = useState(false);

  // Check if user has already shared today
  useEffect(() => {
    const today = new Date().toDateString();
    const lastShared = localStorage.getItem('lastMorningSmileDate');
    setHasSharedToday(lastShared === today);
  }, []);

  // Time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6) return "It's quite early! Your dedication is inspiring.";
    if (hour < 10) return "Perfect timing for your morning smile!";
    if (hour < 12) return "Good morning! Better late than never.";
    return "A smile is beautiful any time of day!";
  };

  // Check if it's morning time (6 AM - 10 AM)
  const isMorningTime = () => {
    const hour = new Date().getHours();
    return hour >= 6 && hour <= 10;
  };

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setCurrentStep('camera');
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraError('Unable to access camera. Please check permissions and try again.');
    }
  }, []);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  // Start countdown
  const startCountdown = () => {
    setCurrentStep('countdown');
    setCountdown(3);
    setShowFaceGuide(false);
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          capturePhoto();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Capture photo
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Flip the image horizontally for selfie effect
    ctx.scale(-1, 1);
    ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);

    // Get the image data
    const photoData = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedPhoto(photoData);
    stopCamera();
    setCurrentStep('enhance');
  };

  // Apply enhancements to photo
  const applyEnhancements = (photoData: string, brightness: number, contrast: number): string => {
    if (!canvasRef.current) return photoData;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return photoData;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Apply filters
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
      ctx.drawImage(img, 0, 0);
      
      // Update the captured photo with enhancements
      const enhancedData = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedPhoto(enhancedData);
    };
    img.src = photoData;

    return photoData;
  };

  // Share photo with healing team
  const sharePhoto = async () => {
    if (!capturedPhoto) return;

    setIsSharing(true);
    try {
      // Create photo object
      const photo: CapturedPhoto = {
        id: Date.now().toString(),
        dataUrl: capturedPhoto,
        timestamp: new Date(),
        message: message.trim(),
        enhancements
      };

      // Store locally for 7 days
      const existingPhotos = JSON.parse(localStorage.getItem('morningSmilePhotos') || '[]');
      const updatedPhotos = [...existingPhotos, photo];
      
      // Clean up photos older than 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const filteredPhotos = updatedPhotos.filter(p => new Date(p.timestamp) > sevenDaysAgo);
      
      localStorage.setItem('morningSmilePhotos', JSON.stringify(filteredPhotos));
      localStorage.setItem('lastMorningSmileDate', new Date().toDateString());

      // Simulate secure transmission to healing team
      await new Promise(resolve => setTimeout(resolve, 2000));

      setHasSharedToday(true);
      setCurrentStep('share');
    } catch (error) {
      console.error('Error sharing photo:', error);
    } finally {
      setIsSharing(false);
    }
  };

  // Reset everything
  const resetCamera = () => {
    setCapturedPhoto(null);
    setMessage('');
    setEnhancements({ brightness: 100, contrast: 100 });
    setCurrentStep('setup');
    setShowFaceGuide(true);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cream-200 to-rose-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-rose-400 p-4 text-white">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="text-center flex-1">
              <h1 className="text-lg font-garamond font-semibold">Morning Smile</h1>
              <p className="text-sm text-white/90">Share your radiance</p>
            </div>
            <div className="w-10"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative h-[calc(100vh-80px)] overflow-hidden">
          <AnimatePresence mode="wait">
            {/* Setup Step */}
            {currentStep === 'setup' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 h-full flex flex-col justify-center"
              >
                <div className="text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-24 h-24 mx-auto bg-gradient-to-br from-teal-500 to-rose-400 rounded-full flex items-center justify-center"
                  >
                    <Sun size={40} className="text-white" />
                  </motion.div>

                  <div>
                    <h2 className="text-2xl font-garamond font-semibold text-slate-800 mb-2">
                      {hasSharedToday ? 'Another Beautiful Smile?' : 'Good Morning!'}
                    </h2>
                    <p className="text-slate-600 mb-4">
                      {hasSharedToday 
                        ? 'You\'ve already shared your morning smile today. Would you like to share another one?'
                        : getTimeBasedGreeting()
                      }
                    </p>
                    
                    {!isMorningTime() && !hasSharedToday && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center text-amber-700">
                          <Clock size={16} className="mr-2" />
                          <span className="text-sm">Best time: 6 AM - 10 AM</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <h3 className="font-semibold text-slate-800 mb-2">What you'll do:</h3>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• Position yourself in the camera frame</li>
                        <li>• Take a beautiful selfie with our guide</li>
                        <li>• Add a brief morning message</li>
                        <li>• Share securely with your healing team</li>
                      </ul>
                    </div>

                    <button
                      onClick={startCamera}
                      disabled={!!cameraError}
                      className="w-full bg-gradient-to-r from-teal-500 to-rose-400 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                    >
                      <Camera size={20} className="mr-2" />
                      Start Camera
                    </button>

                    {cameraError && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-red-700 text-sm">{cameraError}</p>
                        <button
                          onClick={startCamera}
                          className="text-red-600 text-sm underline mt-1"
                        >
                          Try Again
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Camera Step */}
            {currentStep === 'camera' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative h-full"
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  style={{ transform: 'scaleX(-1)' }}
                />

                {/* Face positioning guide */}
                {showFaceGuide && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-64 h-80 border-4 border-white/50 rounded-full border-dashed"></div>
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        Position your face here
                      </div>
                    </div>
                  </div>
                )}

                {/* Controls overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setShowFaceGuide(!showFaceGuide)}
                      className="p-3 bg-white/20 rounded-full backdrop-blur-sm"
                    >
                      <Sparkles size={20} className="text-white" />
                    </button>

                    <button
                      onClick={startCountdown}
                      className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    >
                      <Camera size={24} className="text-slate-700" />
                    </button>

                    <button
                      onClick={() => {
                        stopCamera();
                        setCurrentStep('setup');
                      }}
                      className="p-3 bg-white/20 rounded-full backdrop-blur-sm"
                    >
                      <X size={20} className="text-white" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Countdown Step */}
            {currentStep === 'countdown' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative h-full"
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  style={{ transform: 'scaleX(-1)' }}
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <motion.div
                    key={countdown}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    className="text-8xl font-bold text-white"
                  >
                    {countdown > 0 ? countdown : <Smile size={80} />}
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Enhancement Step */}
            {currentStep === 'enhance' && capturedPhoto && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <div className="flex-1 relative">
                  <img
                    src={capturedPhoto}
                    alt="Captured"
                    className="w-full h-full object-cover"
                    style={{
                      filter: `brightness(${enhancements.brightness}%) contrast(${enhancements.contrast}%)`
                    }}
                  />
                </div>

                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
                    <Sliders size={20} className="mr-2 text-teal-500" />
                    Enhance Your Photo
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-slate-600">Brightness</label>
                        <span className="text-sm font-medium">{enhancements.brightness}%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setEnhancements(prev => ({ 
                            ...prev, 
                            brightness: Math.max(50, prev.brightness - 10) 
                          }))}
                          className="p-1 rounded"
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          type="range"
                          min="50"
                          max="150"
                          value={enhancements.brightness}
                          onChange={(e) => setEnhancements(prev => ({ 
                            ...prev, 
                            brightness: parseInt(e.target.value) 
                          }))}
                          className="flex-1 accent-teal-500"
                        />
                        <button
                          onClick={() => setEnhancements(prev => ({ 
                            ...prev, 
                            brightness: Math.min(150, prev.brightness + 10) 
                          }))}
                          className="p-1 rounded"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-slate-600">Contrast</label>
                        <span className="text-sm font-medium">{enhancements.contrast}%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setEnhancements(prev => ({ 
                            ...prev, 
                            contrast: Math.max(50, prev.contrast - 10) 
                          }))}
                          className="p-1 rounded"
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          type="range"
                          min="50"
                          max="150"
                          value={enhancements.contrast}
                          onChange={(e) => setEnhancements(prev => ({ 
                            ...prev, 
                            contrast: parseInt(e.target.value) 
                          }))}
                          className="flex-1 accent-teal-500"
                        />
                        <button
                          onClick={() => setEnhancements(prev => ({ 
                            ...prev, 
                            contrast: Math.min(150, prev.contrast + 10) 
                          }))}
                          className="p-1 rounded"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <button
                      onClick={resetCamera}
                      className="flex-1 py-3 border border-slate-300 text-slate-700 rounded-lg flex items-center justify-center"
                    >
                      <RotateCcw size={18} className="mr-2" />
                      Retake
                    </button>
                    <button
                      onClick={() => setCurrentStep('preview')}
                      className="flex-1 py-3 bg-teal-500 text-white rounded-lg flex items-center justify-center"
                    >
                      <Check size={18} className="mr-2" />
                      Continue
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Preview Step */}
            {currentStep === 'preview' && capturedPhoto && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <div className="flex-1 relative">
                  <img
                    src={capturedPhoto}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    style={{
                      filter: `brightness(${enhancements.brightness}%) contrast(${enhancements.contrast}%)`
                    }}
                  />
                </div>

                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
                    <MessageCircle size={20} className="mr-2 text-rose-500" />
                    Add a Morning Message
                  </h3>

                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, 50))}
                    placeholder="Share what's in your heart this morning..."
                    className="w-full p-3 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    rows={2}
                    maxLength={50}
                  />
                  <div className="text-right text-xs text-slate-500 mt-1">
                    {message.length}/50
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <button
                      onClick={() => setCurrentStep('enhance')}
                      className="flex-1 py-3 border border-slate-300 text-slate-700 rounded-lg"
                    >
                      Back
                    </button>
                    <button
                      onClick={sharePhoto}
                      disabled={isSharing}
                      className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-rose-400 text-white rounded-lg flex items-center justify-center"
                    >
                      {isSharing ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={18} className="mr-2" />
                          Share with Team
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Share Success Step */}
            {currentStep === 'share' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 h-full flex flex-col justify-center text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 mx-auto bg-gradient-to-br from-teal-500 to-rose-400 rounded-full flex items-center justify-center mb-6"
                >
                  <Heart size={40} className="text-white" />
                </motion.div>

                <h2 className="text-2xl font-garamond font-semibold text-slate-800 mb-4">
                  Beautiful! ✨
                </h2>

                <p className="text-slate-600 mb-8">
                  Your morning smile has been securely shared with your healing team. 
                  They'll be delighted to see your radiant energy!
                </p>

                <div className="bg-teal-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center text-teal-700 mb-2">
                    <Shield size={16} className="mr-2" />
                    <span className="text-sm font-medium">Secure & Private</span>
                  </div>
                  <p className="text-teal-600 text-sm">
                    Your photo is encrypted end-to-end and will be automatically deleted in 7 days.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={resetCamera}
                    className="w-full py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Take Another Photo
                  </button>
                  
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full py-3 bg-gradient-to-r from-teal-500 to-rose-400 text-white rounded-lg"
                  >
                    Return to Dashboard
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hidden canvas for photo processing */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </div>
  );
};

export default MorningSmile;