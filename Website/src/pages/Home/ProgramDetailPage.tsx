// src/pages/ProgramDetailPage.jsx
import { Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router-dom';
import ProgramDetailClient from '@/components/sections/programs/[id]/program-detail-client';
import { useEffect } from 'react';

export default function ProgramDetailPage() {
  const { programId } = useParams();

  // In ProgramDetailPage.jsx
useEffect(() => {
    const element = document.getElementById('top-of-page');
    if (element) {
      element.scrollIntoView();
    }
  }, []);

  if (!programId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 bg-gradient-to-r from-teal-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-10 h-10 text-teal-600" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-teal-900 mb-4">Program Not Found</h1>
          <p className="text-teal-700 mb-8">We couldn't find the program you're looking for. Please check the URL or explore our available programs.</p>
          <Link to="/programs">
            <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-3 rounded-full">
              View All Programs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
     
      {/* Program Detail */}
      <section>
        <ProgramDetailClient programId={programId} />
      </section>
    </div>
  );
}
