'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Leaf, BookOpen, Calendar, Clock, Heart, ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const blogArticles = [
  {
    id: 1,
    title: "Understanding Your Dosha: A Guide to Vata, Pitta, and Kapha",
    excerpt: "Learn about the three fundamental energies that govern your body and mind according to Ayurveda.",
    category: "Ayurveda Basics",
    readTime: "8 min read",
    date: "May 15, 2024",
    author: "Dr. Priya Sharma",
    image: "https://images.pexels.com/photos/6663467/pexels-photo-6663467.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    tags: ["Prakriti", "Doshas", "Self-Knowledge"]
  },
  {
    id: 2,
    title: "Seasonal Eating: Aligning Your Diet with Nature's Rhythms",
    excerpt: "Discover how eating seasonally can balance your doshas and enhance your overall wellbeing.",
    category: "Nutrition",
    readTime: "6 min read",
    date: "May 10, 2024",
    author: "Nutritionist Kavya",
    image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: false,
    tags: ["Diet", "Seasonal", "Balance"]
  },
  {
    id: 3,
    title: "The Science Behind Dinacharya: Ayurvedic Daily Routines",
    excerpt: "Explore how establishing a consistent daily routine can regulate your body's natural rhythms.",
    category: "Lifestyle",
    readTime: "10 min read",
    date: "May 5, 2024",
    author: "Dr. Rajesh Kumar",
    image: "https://images.pexels.com/photos/3759079/pexels-photo-3759079.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    tags: ["Routine", "Lifestyle", "Balance"]
  },
  {
    id: 4,
    title: "Herbs for Mental Clarity: Boosting Focus Naturally",
    excerpt: "Discover Ayurvedic herbs and practices that can enhance your cognitive function and mental clarity.",
    category: "Herbs & Remedies",
    readTime: "7 min read",
    date: "April 28, 2024",
    author: "Dr. Meera Patel",
    image: "https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: false,
    tags: ["Herbs", "Mental Health", "Focus"]
  },
  {
    id: 5,
    title: "Balancing Pitta in Summer: Staying Cool and Calm",
    excerpt: "Learn practical tips to keep pitta dosha in balance during the hot summer months.",
    category: "Seasonal Wellness",
    readTime: "5 min read",
    date: "April 20, 2024",
    author: "Dr. Priya Sharma",
    image: "https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: false,
    tags: ["Pitta", "Summer", "Cooling"]
  },
  {
    id: 6,
    title: "The Art of Self-Massage: Abhyanga Techniques",
    excerpt: "Explore the ancient practice of self-massage and its profound benefits for body and mind.",
    category: "Self-Care",
    readTime: "9 min read",
    date: "April 15, 2024",
    author: "Yoga Therapist Arjun",
    image: "https://images.pexels.com/photos/5240677/pexels-photo-5240677.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: false,
    tags: ["Massage", "Self-Care", "Relaxation"]
  }
];

const categories = [
  "All",
  "Ayurveda Basics",
  "Nutrition",
  "Lifestyle",
  "Herbs & Remedies",
  "Seasonal Wellness",
  "Self-Care"
];

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = blogArticles.filter(article => {
    const matchesCategory = activeCategory === "All" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = blogArticles.filter(article => article.featured);

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
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/programs" className="text-teal-700 hover:text-teal-900 transition-colors">Programs</Link>
              <Link href="/stories" className="text-teal-700 hover:text-teal-900 transition-colors">Healing Stories</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="hidden sm:flex border-teal-200 text-teal-700 hover:bg-teal-50">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-50 to-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="w-8 h-8 text-teal-600 mr-3" />
            <h1 className="text-5xl font-serif font-bold text-teal-900">
              Ayurvedic Blogs
            </h1>
          </div>
          <p className="text-xl text-teal-700 leading-relaxed mb-8">
            Ancient wisdom for modern living. Explore our collection of articles on Ayurvedic practices, 
            remedies, and insights to support your healing journey.
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <Input 
              type="text" 
              placeholder="Search articles..." 
              className="pl-10 pr-4 py-3 rounded-full border-teal-200 focus:border-teal-400 focus:ring-teal-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500 w-5 h-5" />
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && !searchQuery && activeCategory === "All" && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-teal-900 mb-8">
              Featured Articles
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="border-teal-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm overflow-hidden flex flex-col md:flex-row h-full">
                  <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-3/5 p-6 flex flex-col">
                    <div className="mb-2 flex items-center">
                      <Badge variant="outline" className="text-xs border-teal-200 text-teal-700">
                        {article.category}
                      </Badge>
                      <span className="text-xs text-teal-600 ml-2 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {article.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-serif font-bold text-teal-900 mb-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-teal-700 mb-4 flex-grow">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-sm text-teal-600">{article.date}</span>
                      <Button variant="ghost" className="text-teal-700 hover:text-teal-900 hover:bg-teal-50 p-0">
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="bg-white/50 p-1 rounded-lg border border-teal-100 mb-6 flex flex-wrap">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="data-[state=active]:bg-teal-600 data-[state=active]:text-white rounded-md px-4 py-2"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={activeCategory} className="mt-0">
                {filteredArticles.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArticles.map((article) => (
                      <Card key={article.id} className="border-teal-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm overflow-hidden flex flex-col h-full">
                        <div className="h-48 relative overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-xs border-teal-200 text-teal-700">
                              {article.category}
                            </Badge>
                            <span className="text-xs text-teal-600 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {article.readTime}
                            </span>
                          </div>
                          <CardTitle className="text-lg font-serif text-teal-900">
                            {article.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <p className="text-teal-700 text-sm">
                            {article.excerpt}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-3">
                            {article.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs bg-teal-50 text-teal-700">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0 mt-auto flex justify-between items-center">
                          <span className="text-xs text-teal-600">{article.date}</span>
                          <Button variant="ghost" className="text-teal-700 hover:text-teal-900 hover:bg-teal-50 p-0">
                            Read Article
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-teal-700 mb-4">No articles found matching your criteria.</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setActiveCategory("All");
                        setSearchQuery("");
                      }}
                      className="border-teal-200 text-teal-700 hover:bg-teal-50"
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-50 to-pink-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-teal-900 mb-4">
            Stay Updated with Ayurvedic Wisdom
          </h2>
          <p className="text-teal-700 mb-8">
            Subscribe to our newsletter for weekly insights, seasonal tips, and healing practices
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Your email address" 
              className="rounded-full border-teal-200"
            />
            <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
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
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Programs</h3>
              <div className="space-y-2">
                <Link href="/programs/ekapavana" className="block text-teal-200 hover:text-white transition-colors">ekaPavana</Link>
                <Link href="/programs/ekasanskara" className="block text-teal-200 hover:text-white transition-colors">ekaSanskara</Link>
                <Link href="/programs/ekanidra" className="block text-teal-200 hover:text-white transition-colors">ekaNidra</Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <div className="space-y-2">
                <Link href="/consultation" className="block text-teal-200 hover:text-white transition-colors">Consultations</Link>
                <Link href="/blogs" className="block text-teal-200 hover:text-white transition-colors">Blogs</Link>
                <Link href="/stories" className="block text-teal-200 hover:text-white transition-colors">Healing Stories</Link>
                <Link href="/contact" className="block text-teal-200 hover:text-white transition-colors">Contact Us</Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <div className="space-y-2">
                <Link href="/privacy" className="block text-teal-200 hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="block text-teal-200 hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/disclaimer" className="block text-teal-200 hover:text-white transition-colors">Medical Disclaimer</Link>
              </div>
            </div>
          </div>
          
          <Separator className="bg-teal-700 mb-8" />
          
          <div className="text-center text-teal-200">
            <p>&copy; 2024 ekaBrahmaa. All rights reserved. Healing through ancient wisdom.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}