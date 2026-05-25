import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, Clock, ArrowRight, TrendingUp, Eye, Filter } from 'lucide-react';
import { API_BASE } from '../lib/api';

const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Breaking News', label: 'Breaking News' },
    { value: 'Policy & Regulations', label: 'Policy & Regulations' },
    { value: 'Market Updates', label: 'Market Updates' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Major Projects', label: 'Major Projects' },
    { value: 'Interviews', label: 'Interviews' },
    { value: 'Sustainability', label: 'Sustainability' },
  ];

  useEffect(() => {
    const params = new URLSearchParams({ limit: '30' });
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (searchTerm) params.set('search', searchTerm);
    setLoading(true);
    fetch(`${API_BASE}/api/articles?${params}`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setArticles(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [selectedCategory, searchTerm]);

  const featured = articles.filter(a => a.featured);
  const regular = articles.filter(a => !a.featured);
  const trending = [...articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);

  const fmtDate = (d: string) => d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Construction Industry News</h1>
          <p className="text-gray-500 text-sm">Stay updated with the latest developments from Kenya's construction industry</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search news..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-9 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-16">
                <Filter className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-semibold text-gray-600 mb-1">No articles found</h3>
                <p className="text-gray-400 text-sm">Try different search terms or categories.</p>
              </div>
            ) : (
              <>
                {/* Featured Articles */}
                {featured.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Featured News</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {featured.map(article => (
                        <Link key={article.id} to={`/article/${article.id}`}
                          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group flex flex-col">
                          <div className="relative overflow-hidden">
                            <img src={article.featuredImage || 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800'}
                              alt={article.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className="absolute top-3 left-3">
                              <span className="bg-red-600 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold">{article.category}</span>
                            </div>
                            {(article.views || 0) > 5000 && (
                              <div className="absolute top-3 right-3">
                                <span className="bg-orange-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-0.5">
                                  <TrendingUp className="h-3 w-3" /> Trending
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="p-4 flex flex-col flex-1">
                            <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-1">{article.excerpt}</p>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                              <span className="flex items-center gap-0.5"><User className="h-3 w-3" />{article.author}</span>
                              <span className="flex items-center gap-0.5"><Calendar className="h-3 w-3" />{fmtDate(article.createdAt)}</span>
                              {article.readTime && <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" />{article.readTime}</span>}
                              <span className="flex items-center gap-0.5"><Eye className="h-3 w-3" />{(article.views || 0).toLocaleString()}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Regular Articles */}
                {regular.length > 0 && (
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Latest News</h2>
                    <div className="space-y-4">
                      {regular.map(article => (
                        <Link key={article.id} to={`/article/${article.id}`}
                          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group flex flex-col sm:flex-row">
                          <div className="sm:w-48 sm:flex-shrink-0 relative overflow-hidden">
                            <img src={article.featuredImage || 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=600'}
                              alt={article.title} className="w-full h-40 sm:h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className="absolute top-3 left-3">
                              <span className="bg-blue-700 text-white px-2 py-0.5 rounded-full text-xs font-semibold">{article.category}</span>
                            </div>
                          </div>
                          <div className="p-4 flex flex-col flex-1">
                            <h3 className="text-sm font-bold text-gray-900 mb-1.5 group-hover:text-blue-700 transition-colors line-clamp-2">
                              {article.title}
                            </h3>
                            <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-1">{article.excerpt}</p>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                              <span className="flex items-center gap-0.5"><User className="h-3 w-3" />{article.author}</span>
                              <span className="flex items-center gap-0.5"><Calendar className="h-3 w-3" />{fmtDate(article.createdAt)}</span>
                              {article.readTime && <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" />{article.readTime}</span>}
                              <span className="flex items-center gap-0.5"><Eye className="h-3 w-3" />{(article.views || 0).toLocaleString()}</span>
                              <span className="ml-auto text-blue-700 font-semibold flex items-center gap-0.5">
                                Read More <ArrowRight className="h-3 w-3" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-4 w-4 text-orange-600" />
                <h3 className="text-sm font-bold text-gray-900">Trending Now</h3>
              </div>
              <div className="space-y-3">
                {trending.map((article, i) => (
                  <Link key={article.id} to={`/article/${article.id}`} className="flex items-start gap-2 group">
                    <span className="text-xl font-bold text-gray-200 flex-shrink-0 leading-none mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h4 className="text-xs font-semibold text-gray-800 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-gray-500">
                        <span className="text-blue-600 font-medium">{article.category}</span>
                        <span>•</span>
                        <span>{(article.views || 0).toLocaleString()} views</span>
                      </div>
                    </div>
                  </Link>
                ))}
                {trending.length === 0 && <p className="text-xs text-gray-400">No trending articles yet.</p>}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-xl shadow-md p-4 text-white">
              <h3 className="text-sm font-bold mb-1.5">Stay Updated</h3>
              <p className="text-blue-100 text-xs mb-3">Get the latest industry news delivered to your inbox</p>
              <input type="email" placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-lg text-xs text-gray-900 placeholder-gray-500 focus:outline-none mb-2" />
              <button className="w-full bg-white text-blue-700 py-2 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors">
                Subscribe
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Browse Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.filter(c => c.value !== 'all').map(c => (
                  <button key={c.value}
                    onClick={() => setSelectedCategory(c.value)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${selectedCategory === c.value ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700'}`}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
