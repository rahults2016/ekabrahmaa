'use client';

import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Star, Play } from 'lucide-react';
import { successStories } from '@/config/whatWehealConst';


export const SuccessStories = () => {
  const [selectedStory, setSelectedStory] = useState(0);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-teal-900 mb-6">
            Real Healing Stories
          </h2>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
            See how our integrated approach has transformed lives and restored health
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {successStories.map((story, index) => (
            <Card 
              key={index} 
              className={`border-2 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                selectedStory === index 
                  ? 'border-teal-500 shadow-xl scale-105' 
                  : 'border-teal-100 shadow-lg hover:border-teal-300'
              } bg-white/80 backdrop-blur-sm`}
              onClick={() => setSelectedStory(index)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-teal-900">{story.name}</h3>
                    <p className="text-sm text-teal-600">{story.age} years • {story.location}</p>
                    <Badge variant="secondary" className="mt-1 bg-teal-50 text-teal-700 text-xs">
                      {story.condition}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-teal-500 text-teal-500" />
                  ))}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 p-3 rounded-lg">
                    <h4 className="text-sm font-semibold text-red-800 mb-1">Before:</h4>
                    <p className="text-sm text-red-700">{story.beforeAfter.before}</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 p-3 rounded-lg">
                    <h4 className="text-sm font-semibold text-green-800 mb-1">After:</h4>
                    <p className="text-sm text-green-700">{story.beforeAfter.after}</p>
                  </div>
                  
                  <Badge variant="outline" className="border-teal-200 text-teal-700">
                    {story.program}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Story View */}
        <Card className="border-teal-200 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    <img 
                      src={successStories[selectedStory].image} 
                      alt={successStories[selectedStory].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-teal-900">{successStories[selectedStory].name}</h3>
                    <p className="text-teal-600">{successStories[selectedStory].condition}</p>
                    <p className="text-sm text-teal-500">{successStories[selectedStory].program}</p>
                  </div>
                </div>
                
                <blockquote className="text-teal-700 leading-relaxed italic text-lg mb-6 border-l-4 border-teal-200 pl-4">
                  "{successStories[selectedStory].testimonial}"
                </blockquote>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-teal-800">Key Results:</h4>
                  {successStories[selectedStory].results.map((result, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-teal-700 text-sm">{result}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="relative h-64 bg-gradient-to-br from-teal-100 to-pink-100 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={successStories[selectedStory].videoThumbnail} 
                    alt="Video testimonial"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 grid place-items-center">
                    <Button size="lg" className="bg-white/90 hover:bg-white text-teal-700 rounded-full">
                      <Play className="w-6 h-6 mr-2" />
                      Watch Full Story
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};