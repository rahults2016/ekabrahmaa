'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  Smartphone, 
  Download,
  MessageCircle,
  Mail,
  CheckCircle,
  QrCode,
  Apple,
  Play
} from 'lucide-react';
import Link from 'next/link';

export default function AppDownloadPage() {
  const [startDate, setStartDate] = useState<string>('');
  const [emailSent, setEmailSent] = useState(false);
  const [whatsappSent, setWhatsappSent] = useState(false);

  useEffect(() => {
    // Get start date from localStorage
    const storedStartDate = localStorage.getItem('programStartDate');
    if (storedStartDate) {
      const date = new Date(storedStartDate);
      setStartDate(date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }));
    }
  }, []);

  const handleSendEmail = () => {
    // Simulate sending email
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  const handleSendWhatsApp = () => {
    // Simulate sending WhatsApp message
    setWhatsappSent(true);
    setTimeout(() => setWhatsappSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-pink-400 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-serif font-bold text-teal-800">ekaBrahmaa</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-serif font-bold text-teal-900 mb-4">
              You're Ready to Begin!
            </h1>
            <p className="text-xl text-teal-700 mb-2">
              Your healing journey starts on <strong>{startDate}</strong>
            </p>
            <Badge variant="secondary" className="bg-teal-100 text-teal-700">
              Program confirmed and scheduled
            </Badge>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* App Download */}
            <Card className="border-teal-200 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-teal-900 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 mr-2" />
                  Download the ekaBrahmaa App
                </CardTitle>
                <CardDescription className="text-teal-600">
                  Your personalized healing program awaits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* QR Code Placeholder */}
                <div className="text-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-teal-100 to-pink-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <div className="text-center">
                      <QrCode className="w-16 h-16 text-teal-600 mx-auto mb-2" />
                      <p className="text-sm text-teal-700">Scan to Download</p>
                    </div>
                  </div>
                  <p className="text-sm text-teal-600 mb-6">
                    Scan this QR code with your phone camera to download the app
                  </p>
                </div>

                {/* Download Buttons */}
                <div className="space-y-3">
                  <Button className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-full flex items-center justify-center">
                    <Apple className="w-5 h-5 mr-2" />
                    Download for iOS
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 mr-2" />
                    Download for Android
                  </Button>
                </div>

                {/* Send Links */}
                <div className="space-y-3 pt-4 border-t border-teal-200">
                  <p className="text-sm text-teal-700 text-center">
                    Or send the download link to yourself:
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      onClick={handleSendEmail}
                      disabled={emailSent}
                      className="border-teal-200 text-teal-700 hover:bg-teal-50"
                    >
                      {emailSent ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Sent!
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          Email Link
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleSendWhatsApp}
                      disabled={whatsappSent}
                      className="border-teal-200 text-teal-700 hover:bg-teal-50"
                    >
                      {whatsappSent ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Sent!
                        </>
                      ) : (
                        <>
                          <MessageCircle className="w-4 h-4 mr-2" />
                          WhatsApp
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What's Next */}
            <div className="space-y-6">
              <Card className="border-teal-200 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-teal-900">What Happens Next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-teal-800">Download & Setup</h4>
                      <p className="text-sm text-teal-700">
                        Download the app and complete your profile setup with your login credentials.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-teal-800">Preparation Phase</h4>
                      <p className="text-sm text-teal-700">
                        Receive your grocery list, welcome video, and preparation materials.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-teal-800">Program Begins</h4>
                      <p className="text-sm text-teal-700">
                        Your healing journey officially starts on {startDate} with your first consultation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-teal-200 shadow-lg bg-gradient-to-r from-teal-50 to-pink-50">
                <CardHeader>
                  <CardTitle className="text-xl text-teal-900">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-teal-700 text-sm">
                    Our support team is here to help you every step of the way.
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full border-teal-200 text-teal-700 hover:bg-teal-50">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat with Support
                    </Button>
                    <Button variant="outline" className="w-full border-teal-200 text-teal-700 hover:bg-teal-50">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Support
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-teal-200 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="text-center py-6">
                  <h3 className="font-bold text-teal-900 mb-2">Welcome to Your Healing Journey!</h3>
                  <p className="text-sm text-teal-700 mb-4">
                    You've taken the first step towards transformation. We're excited to guide you on this path.
                  </p>
                  <Link href="/">
                    <Button variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                      Return to Homepage
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}