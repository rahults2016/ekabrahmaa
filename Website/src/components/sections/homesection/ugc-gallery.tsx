'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, MessageCircle, Share2, Play, Instagram, Twitter, Facebook } from 'lucide-react';
import { ugcPosts } from '@/config/constants';

// Lazy load images by adding loading="lazy" attribute
const optimizeImageUrl = (url: string, width = 400) => {
  // Add width parameter to Pexels URLs for optimized images
  if (url.includes('pexels.com')) {
    return `${url}?auto=compress&cs=tinysrgb&w=${width}`;
  }
  return url;
};



export function UGCGallery() {
  const [filter, setFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

  useEffect(() => {
    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  const filteredPosts = filter === 'all' 
    ? ugcPosts 
    : ugcPosts.filter(post => post.type === filter);

  const getPlatformIcon = useCallback((platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      default:
        return null;
    }
  }, []);

  const getPlatformColor = useCallback((platform: string) => {
    switch (platform) {
      case 'instagram':
        return 'from-pink-500 to-purple-500';
      case 'twitter':
        return 'from-blue-400 to-blue-600';
      case 'facebook':
        return 'from-blue-600 to-blue-800';
      default:
        return 'from-gray-400 to-gray-600';
    }
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl font-serif font-bold text-teal-900 mb-6">
            Community Stories
          </h2>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed mb-8">
            Real people, real transformations. See how our community is healing together.
          </p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['all', 'review', 'before-after', 'video', 'milestone', 'transformation'].map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(filterType)}
                className={`rounded-full transition-all duration-300 ${
                  filter === filterType 
                    ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white' 
                    : 'border-teal-200 text-teal-700 hover:bg-teal-50'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1).replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>

        {/* UGC Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <Card 
              key={post.id}
              className={`border-teal-100 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm overflow-hidden group transform hover:scale-105 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              <div className="relative">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={optimizeImageUrl(post.image)} 
                    alt={`${post.user.name}'s transformation`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                
                {/* Video Play Button */}
                {post.isVideo && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button className="bg-white/90 hover:bg-white text-teal-700 rounded-full p-3">
                      <Play className="w-6 h-6" />
                    </Button>
                  </div>
                )}
                
                {/* Platform Badge */}
                <div className={`absolute top-3 right-3 w-8 h-8 bg-gradient-to-r ${getPlatformColor(post.platform)} rounded-full flex items-center justify-center text-white shadow-lg`}>
                  {getPlatformIcon(post.platform)}
                </div>
                
                {/* Program Badge */}
                <Badge 
                  variant="secondary" 
                  className="absolute bottom-3 left-3 bg-white/90 text-teal-700 backdrop-blur-sm"
                >
                  {post.program}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                {/* User Info */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative">
                    <img 
                      src={post.user.avatar} 
                      alt={post.user.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-teal-900 flex items-center">
                      {post.user.name}
                      {post.user.verified && (
                        <div className="w-4 h-4 bg-teal-600 rounded-full flex items-center justify-center ml-2">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </h4>
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(post.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 fill-yellow-400 text-yellow-400 transition-all duration-300 ${
                        hoveredPost === post.id ? 'animate-pulse' : ''
                      }`}
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-teal-700 leading-relaxed mb-4 line-clamp-3">
                  {post.content}
                </p>
                
                {/* Engagement Stats */}
                <div className="flex items-center justify-between text-sm text-teal-600">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 hover:text-pink-600 transition-colors cursor-pointer">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:text-blue-600 transition-colors cursor-pointer">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:text-green-600 transition-colors cursor-pointer">
                      <Share2 className="w-4 h-4" />
                      <span>{post.shares}</span>
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="text-xs border-teal-200 text-teal-600">
                    {post.type}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-teal-200 text-teal-700 hover:bg-teal-50 px-8 py-3 rounded-full hover:scale-105 transition-all duration-300"
          >
            Load More Stories
          </Button>
        </div>
      </div>
    </section>
  );
}