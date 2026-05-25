import React, { useState } from 'react';
import { Search, Filter, Calendar, User, Clock, ArrowRight, Award, Star, BookOpen } from 'lucide-react';

const Features: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'architecture', label: 'Architecture & Design' },
    { value: 'sustainability', label: 'Sustainability' },
    { value: 'innovation', label: 'Innovation & Technology' },
    { value: 'profiles', label: 'Industry Profiles' },
    { value: 'case_studies', label: 'Case Studies' },
    { value: 'trends', label: 'Market Trends' }
  ];

  const featureArticles = [
    {
      id: '1',
      title: 'The Future of Sustainable Construction in Kenya',
      excerpt: 'Exploring innovative green building technologies and sustainable practices that are reshaping Kenya\'s construction landscape for a more environmentally conscious future.',
      category: 'Sustainability',
      author: 'Dr. Sarah Mwangi',
      date: '2024-01-20',
      readTime: '12 min read',
      image: 'https://images.pexels.com/photos/416917/pexels-photo-416917.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      premium: true,
      views: 8420,
      rating: 4.9
    },
    {
      id: '2',
      title: 'Architectural Marvels: Kenya\'s Most Innovative Buildings',
      excerpt: 'A comprehensive look at groundbreaking architectural projects that are defining Kenya\'s modern skyline and setting new standards for design excellence.',
      category: 'Architecture & Design',
      author: 'Arch. Michael Chen',
      date: '2024-01-18',
      readTime: '15 min read',
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      premium: true,
      views: 12350,
      rating: 4.8
    },
    {
      id: '3',
      title: 'Smart Cities: Technology Integration in Urban Planning',
      excerpt: 'How IoT, AI, and smart technologies are being integrated into Kenya\'s urban development projects to create more efficient and livable cities.',
      category: 'Innovation & Technology',
      author: 'Eng. Patricia Wanjiru',
      date: '2024-01-16',
      readTime: '10 min read',
      image: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      premium: false,
      views: 6780,
      rating: 4.7
    },
    {
      id: '4',
      title: 'Industry Leader Profile: The Visionary Behind Modern Nairobi',
      excerpt: 'An exclusive interview with one of Kenya\'s most influential architects who has shaped the capital\'s modern architectural identity.',
      category: 'Industry Profiles',
      author: 'James Kiprotich',
      date: '2024-01-14',
      readTime: '18 min read',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      premium: true,
      views: 5640,
      rating: 4.6
    },
    {
      id: '5',
      title: 'Case Study: Transforming Kibera with Affordable Housing',
      excerpt: 'A detailed analysis of the innovative affordable housing project that\'s transforming one of Africa\'s largest slums into a model community.',
      category: 'Case Studies',
      author: 'Mary Wanjiku',
      date: '2024-01-12',
      readTime: '14 min read',
      image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      premium: false,
      views: 9200,
      rating: 4.8
    },
    {
      id: '6',
      title: 'Construction Market Trends: What to Expect in 2024',
      excerpt: 'Comprehensive analysis of market trends, material costs, and industry forecasts that will shape Kenya\'s construction sector this year.',
      category: 'Market Trends',
      author: 'Peter Mwangi',
      date: '2024-01-10',
      readTime: '11 min read',
      image: 'https://images.pexels.com/photos/1216564/pexels-photo-1216564.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      premium: false,
      views: 7890,
      rating: 4.5
    }
  ];

  const filteredArticles = featureArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           article.category.toLowerCase().replace(/[^a-z]/g, '_').includes(selectedCategory.replace('_', ''));
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Feature Articles & In-Depth Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Comprehensive features, expert analysis, and in-depth coverage of Kenya's construction industry
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center space-x-2 mb-6">
              <Award className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Stories</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {article.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                      {article.premium && (
                        <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Premium
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-200">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(article.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{article.rating}</span>
                      </div>
                    </div>
                    
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Read Full Feature</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Regular Articles */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                  </div>
                  {article.premium && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Premium
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors duration-200">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4 space-x-3">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{article.rating}</span>
                      </div>
                    </div>
                    <button className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200">
                      <span>Read More</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <BookOpen className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No features found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Features;