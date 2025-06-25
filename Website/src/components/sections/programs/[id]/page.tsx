import { Leaf } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ProgramDetailClient from './program-detail-client';

// Generate static params for all program IDs
export async function generateStaticParams() {
  const programIds = [
    'ekapavana',
    'ekasanskara', 
    'ekasamanvaya',
    'ekaudaya',
    'ekaprabodha'
  ];

  return programIds.map((programId) => ({
    programId: programId,
  }));
}

interface ProgramDetailPageProps {
  params: {
    programId: string;
  };
}

export default function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  return (
    <div id="top-of-page" className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-pink-400 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-serif font-bold text-teal-800">ekaBrahmaa</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Program Detail */}
      <section>
        <ProgramDetailClient programId={params.programId} />
      </section>
    </div>
  );
}