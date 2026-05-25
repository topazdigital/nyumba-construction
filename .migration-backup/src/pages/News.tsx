import React, { useState } from 'react';
import { Search, Filter, Calendar, User, Clock, ArrowRight, TrendingUp, Eye } from 'lucide-react';

const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'breaking', label: 'Breaking News' },
    { value: 'policy', label: 'Policy & Regulations' },
    { value: 'market', label: 'Market Updates' },
    { value: 'technology', label: 'Technology' },
    { value: 'projects', label: 'Major Projects' },
    { value: 'interviews', label: 'Interviews' }
  ];

  const newsArticles = [
    {
      id: '1',
      title: 'Government Announces KSh 50 Billion Affordable Housing Initiative',
      excerpt: 'The Ministry of Housing unveils ambitious plans to deliver 200,000 affordable housing units across Kenya by 2025, with focus on urban centers.',
      category: 'Breaking News',
      author: 'James Kiprotich',
      date: '2024-01-20',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      views: 15420,
      trending: true
    },
    {
      id: '2',
      title: 'Revolutionary 3D Printing Technology Arrives in Nairobi',
      excerpt: 'Local construction company introduces cutting-edge 3D printing technology for faster and more efficient building construction, reducing costs by 40%.',
      category: 'Technology',
      author: 'Mary Wanjiku',
      date: '2024-01-19',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      views: 12350,
      trending: true
    },
    {
      id: '3',
      title: 'Cement Prices Drop 15% as New Factory Opens in Machakos',
      excerpt: 'The opening of a new cement manufacturing plant is expected to reduce construction costs and boost local development projects across the region.',
      category: 'Market Updates',
      author: 'Peter Mwangi',
      date: '2024-01-18',
      readTime: '4 min read',
      image: 'https://images.pexels.com/photos/1216564/pexels-photo-1216564.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      views: 8920,
      trending: false
    },
    {
      id: '4',
      title: 'Green Building Certification Program Launched',
      excerpt: 'Kenya Green Building Society introduces new certification standards to promote environmentally sustainable construction practices nationwide.',
      category: 'Policy & Regulations',
      author: 'Grace Njeri',
      date: '2024-01-17',
      readTime: '7 min read',
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      views: 6780,
      trending: false
    },
    {
      id: '5',
      title: 'Nairobi Expressway Phase 2 Construction Begins',
      excerpt: 'The second phase of the Nairobi Expressway project officially commences, promising to ease traffic congestion and boost economic growth.',
      category: 'Major Projects',
      author: 'David Ochieng',
      date: '2024-01-16',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      views: 11200,
      trending: true
    },
    {
      id: '6',
      title: 'Interview: Leading Architect Discusses Sustainable Design',
      excerpt: 'An exclusive conversation with renowned architect Dr. Sarah Mwangi about the future of sustainable architecture in Kenya.',
      category: 'Interviews',
      author: 'Michael Chen',
      date: '2024-01-15',
      readTime: '12 min read',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      views: 5640,
      trending: false
    }
  ];

  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           article.category.toLowerCase().replace(/[^a-z]/g, '_').includes(selectedCategory.replace('_', ''));
    return matchesSearch && matchesCategory;
  });

  const trendingNews = newsArticles.filter(article => article.trending).slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Construction Industry News
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Stay updated with the latest news, developments, and insights from Kenya's construction industry
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search news..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.filter(article => article.featured).map((article) => (
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
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {article.category}
                        </span>
                      </div>
                      {article.trending && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                            <TrendingUp className="h-3 w-3" />
                            <span>Trending</span>
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
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
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{article.views.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <button className="inline-flex items-center space-x-2 text-blue-700 hover:text-blue-800 font-medium transition-colors duration-200">
                        <span>Read More</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* All Articles */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest News</h2>
              <div className="space-y-6">
                {filteredArticles.filter(article => !article.featured).map((article) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3 relative overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {article.category}
                          </span>
                        </div>
                        {article.trending && (
                          <div className="absolute top-4 right-4">
                            <span className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                              <TrendingUp className="h-3 w-3" />
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="md:w-2/3 p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-200">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
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
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{article.views.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <button className="inline-flex items-center space-x-2 text-blue-700 hover:text-blue-800 font-medium transition-colors duration-200">
                          <span>Read More</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending News */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                <h3 className="text-lg font-bold text-gray-900">Trending Now</h3>
              </div>
              <div className="space-y-4">
                {trendingNews.map((article, index) => (
                  <div key={article.id} className="group cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl font-bold text-gray-300">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors duration-200 line-clamp-2">
                          {article.title}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-blue-600 font-medium">{article.category}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{article.views.toLocaleString()} views</span>
                        </div>
                      </div>
                    </div>
                    {index < trendingNews.length - 1 && (
                      <hr className="mt-4 border-gray-100" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
              <p className="text-blue-100 text-sm mb-4">
                Get the latest construction industry news delivered to your inbox
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button className="w-full bg-white text-blue-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;