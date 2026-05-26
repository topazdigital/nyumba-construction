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
      title: 'Green Building in 2025: Kenya\'s LEED-Certified Projects Leading Africa',
      excerpt: 'A deep dive into Kenya\'s rapidly growing portfolio of certified green buildings — from solar-powered office parks in Karen to eco-residential estates in Ruiru — and what this means for the future of sustainable urban development.',
      category: 'Sustainability',
      author: 'Dr. Sarah Mwangi',
      date: '2025-05-15',
      readTime: '12 min read',
      image: 'https://images.pexels.com/photos/416917/pexels-photo-416917.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      premium: true,
      views: 11240,
      rating: 4.9
    },
    {
      id: '2',
      title: 'Nairobi\'s New Skyline: 10 High-Rise Projects Reshaping the City in 2025',
      excerpt: 'From the 45-storey One Riverside in Westlands to mixed-use towers along Thika Superhighway, we profile the landmark developments transforming Nairobi into East Africa\'s premier vertical city.',
      category: 'Architecture & Design',
      author: 'Arch. Michael Njoroge',
      date: '2025-05-10',
      readTime: '15 min read',
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      premium: true,
      views: 18750,
      rating: 4.8
    },
    {
      id: '3',
      title: 'AI & BIM: How Kenyan Contractors Are Cutting Costs by 30%',
      excerpt: 'Building Information Modelling and artificial intelligence are no longer buzzwords — leading Kenyan firms are using them to slash project overruns, reduce material waste, and finish on schedule.',
      category: 'Innovation & Technology',
      author: 'Eng. Patricia Wanjiru',
      date: '2025-05-05',
      readTime: '10 min read',
      image: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      premium: false,
      views: 9320,
      rating: 4.7
    },
    {
      id: '4',
      title: 'In Conversation: Arch. Grace Achieng on Women Redefining Kenya\'s Built Environment',
      excerpt: 'One of Nairobi\'s most decorated architects discusses breaking barriers, designing for community, and why the next generation of Kenyan designers will change what African cities look like.',
      category: 'Industry Profiles',
      author: 'James Kiprotich',
      date: '2025-04-28',
      readTime: '18 min read',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      premium: true,
      views: 7180,
      rating: 4.6
    },
    {
      id: '5',
      title: 'Case Study: The KSh 2.4B Affordable Housing Delivery in Mavoko',
      excerpt: 'How a public–private partnership in Machakos County delivered 1,800 affordable units on time and under budget — and the lessons every developer in Kenya should take away.',
      category: 'Case Studies',
      author: 'Mary Wanjiku',
      date: '2025-04-20',
      readTime: '14 min read',
      image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      premium: false,
      views: 12600,
      rating: 4.8
    },
    {
      id: '6',
      title: 'Kenya Construction Market Outlook H2 2025: Prices, Projects & Projections',
      excerpt: 'Cement costs stabilise, steel demand rebounds, and mortgage uptake rises — our mid-year review of Kenya\'s KSh 1.1 trillion construction industry with forecasts through December 2025.',
      category: 'Market Trends',
      author: 'Peter Mwangi',
      date: '2025-05-18',
      readTime: '11 min read',
      image: 'https://images.pexels.com/photos/1216564/pexels-photo-1216564.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      premium: false,
      views: 10450,
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