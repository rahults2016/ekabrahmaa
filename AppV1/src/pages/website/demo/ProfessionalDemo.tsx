import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Star, Users, Award } from 'lucide-react';

export default function ProfessionalDemo() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                Professional Header & Footer Design
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Clean, modern design inspired by gabit.com's professional aesthetic while maintaining ekaBrahmaa's healing brand identity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-[#007AFF] hover:bg-[#0056CC] text-white px-8 py-3 rounded-md">
                  Get Started
                </Button>
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-md">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-white rounded-lg shadow-lg border border-gray-200 p-8">
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="space-y-2 mt-8">
                    <div className="h-3 bg-gray-100 rounded w-full"></div>
                    <div className="h-3 bg-gray-100 rounded w-4/5"></div>
                    <div className="h-3 bg-gray-100 rounded w-3/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Professional Design Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every element designed with precision and attention to detail
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <CheckCircle className="w-8 h-8 text-[#007AFF]" />,
                title: 'Clean Typography',
                description: 'Inter font with perfect spacing and hierarchy'
              },
              {
                icon: <Star className="w-8 h-8 text-[#007AFF]" />,
                title: 'Smooth Animations',
                description: '200ms transitions for professional feel'
              },
              {
                icon: <Users className="w-8 h-8 text-[#007AFF]" />,
                title: 'Mobile Optimized',
                description: 'Perfect experience across all devices'
              },
              {
                icon: <Award className="w-8 h-8 text-[#007AFF]" />,
                title: 'Accessibility First',
                description: 'WCAG compliant with focus management'
              }
            ].map((feature, index) => (
              <Card key={index} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Technical Specifications
            </h2>
            <p className="text-xl text-gray-600">
              Built to exact specifications for professional quality
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Header Specifications</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Desktop Height</span>
                  <span className="font-medium text-gray-900">72px</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Mobile Height</span>
                  <span className="font-medium text-gray-900">56px</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Max Width</span>
                  <span className="font-medium text-gray-900">1200px</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Padding</span>
                  <span className="font-medium text-gray-900">24px sides</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Z-Index</span>
                  <span className="font-medium text-gray-900">1000</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Background</span>
                  <span className="font-medium text-gray-900">White with shadow</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Footer Specifications</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Layout</span>
                  <span className="font-medium text-gray-900">4-column grid</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Padding</span>
                  <span className="font-medium text-gray-900">64px top/bottom</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Background</span>
                  <span className="font-medium text-gray-900">#F8F9FA</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Mobile Layout</span>
                  <span className="font-medium text-gray-900">Single column</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Typography</span>
                  <span className="font-medium text-gray-900">Inter font</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Transitions</span>
                  <span className="font-medium text-gray-900">0.2s ease-in-out</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}