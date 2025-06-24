// src/components/sections/footer.tsx
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="bg-teal-900 text-white py-16 px-4 sm:px-6 lg:px-8 mt-16 lg:mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <BrandInfo />
          
          {/* Programs Column */}
          <FooterColumn 
            title="Programs"
            links={[
              { path: "/programs/ekapavana", label: "ekaPavana" },
              { path: "/programs/ekasanskara", label: "ekaSanskara" },
              { path: "/programs/ekanidra", label: "ekaNidra" }
            ]}
          />
          
          {/* Support Column */}
          <FooterColumn 
            title="Support"
            links={[
              { path: "/consultation", label: "Consultations" },
              { path: "/blogs", label: "Blogs" },
              { path: "/stories", label: "Healing Stories" },
              { path: "/contact", label: "Contact Us" }
            ]}
          />
          
          {/* Legal Column */}
          <FooterColumn 
            title="Legal"
            links={[
              { path: "/privacy", label: "Privacy Policy" },
              { path: "/terms", label: "Terms of Service" },
              { path: "/disclaimer", label: "Medical Disclaimer" }
            ]}
          />
        </div>
        
        <Separator className="bg-teal-700 mb-8" />
        
        <CopyrightNotice />
      </div>
    </footer>
  );
}

// Sub-components for better organization
function BrandInfo() {
  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-pink-400 rounded-full flex items-center justify-center">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        <span className="text-2xl font-serif font-bold">ekaBrahmaa</span>
      </div>
      <p className="text-teal-200 leading-relaxed">
        One Source. Infinite Healing. Your journey to wellness begins here.
      </p>
    </div>
  );
}

interface FooterColumnProps {
  title: string;
  links: Array<{ path: string; label: string }>;
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <div className="space-y-2">
        {links.map((link) => (
          <Link 
            key={link.path}
            to={link.path}
            className="block text-teal-200 hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function CopyrightNotice() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="text-center text-teal-200">
      <p>&copy; {currentYear} ekaBrahmaa. All rights reserved. Healing through ancient wisdom.</p>
    </div>
  );
}