'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Instagram, Twitter, Facebook, Heart, MessageCircle, Share2, ExternalLink } from 'lucide-react';
import { socialPosts } from '@/config/constants';


// Optimize image URLs
const optimizeImageUrl = (url: string, width = 400) => {
  if (url.includes('pexels.com')) {
    return `${url}?auto=compress&cs=tinysrgb&w=${width}`;
  }
  return url;
};


// Memoize platform icon component to prevent unnecessary re-renders
const PlatformIcon = memo(({ platform }: { platform: string }) => {
  switch (platform) {
    case 'instagram':
      return <Instagram className="w-5 h-5" />;
    case 'twitter':
      return <Twitter className="w-5 h-5" />;
    case 'facebook':
      return <Facebook className="w-5 h-5" />;
    default:
      return null;
  }
});

PlatformIcon.displayName = 'PlatformIcon';

export function SocialFeed() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 3;

  useEffect(() => {
    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
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

  const currentPosts = socialPosts.slice(
    currentPage * postsPerPage,
    (currentPage + 1) * postsPerPage
  );

  const nextPage = () => {
    if ((currentPage + 1) * postsPerPage < socialPosts.length) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-50 to-teal-50">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl font-serif font-bold text-teal-900 mb-6">
            Stay Connected
          </h2>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
            Follow our journey and join the conversation across all platforms
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {currentPosts.map((post, index) => (
            <Card 
              key={post.id}
              className={`border-teal-100 shadow-lg hover:shadow-xl transition-all duration-500 bg-white/90 backdrop-blur-sm group transform hover:scale-105 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                {/* Platform Header */}
                <div className={`p-4 bg-gradient-to-r ${getPlatformColor(post.platform)} text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <PlatformIcon platform={post.platform} />
                      <span className="font-medium">{post.user}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm opacity-80">{post.timestamp}</span>
                      <a 
                        href={post.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  <p className="text-teal-700 leading-relaxed mb-4">
                    {post.content}
                  </p>

                  {/* Post Image */}
                  {post.image && (
                    <div className="mb-4 rounded-lg overflow-hidden relative h-48">
                      <img
                        src={optimizeImageUrl(post.image)}
                        alt="Social media post"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}

                  {/* Engagement Stats */}
                  <div className="flex items-center justify-between text-sm text-teal-600 border-t border-teal-100 pt-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 hover:text-pink-600 transition-colors cursor-pointer group">
                        <Heart className="w-4 h-4 group-hover:scale-125 transition-transform" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1 hover:text-blue-600 transition-colors cursor-pointer group">
                        <MessageCircle className="w-4 h-4 group-hover:scale-125 transition-transform" />
                        <span>{post.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1 hover:text-green-600 transition-colors cursor-pointer group">
                        <Share2 className="w-4 h-4 group-hover:scale-125 transition-transform" />
                        <span>{post.shares}</span>
                      </div>
                    </div>
                    
                    <Badge 
                      variant="outline" 
                      className={`text-xs border-current text-current bg-gradient-to-r ${getPlatformColor(post.platform)} bg-clip-text`}
                    >
                      {post.platform}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center space-x-4 mt-12">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-teal-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-700 transition-all duration-300 hover:scale-105"
          >
            Previous
          </button>
          
          <div className="flex space-x-2">
            {Array.from({ length: Math.ceil(socialPosts.length / postsPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentPage ? 'bg-teal-600 w-8' : 'bg-teal-300'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextPage}
            disabled={(currentPage + 1) * postsPerPage >= socialPosts.length}
            className="px-4 py-2 bg-teal-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-700 transition-all duration-300 hover:scale-105"
          >
            Next
          </button>
        </div>

        {/* Social Media Links */}
        <div className="text-center mt-12">
          <p className="text-teal-700 mb-6">Follow us for daily inspiration and healing tips</p>
          <div className="flex justify-center space-x-6">
            {[
              { platform: 'instagram', link: 'https://instagram.com/ekabrahmaa', color: 'from-pink-500 to-purple-500' },
              { platform: 'twitter', link: 'https://twitter.com/ekabrahmaa', color: 'from-blue-400 to-blue-600' },
              { platform: 'facebook', link: 'https://facebook.com/ekabrahmaa', color: 'from-blue-600 to-blue-800' }
            ].map((social) => (
              <a
                key={social.platform}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110`}
              >
                <PlatformIcon platform={social.platform} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}