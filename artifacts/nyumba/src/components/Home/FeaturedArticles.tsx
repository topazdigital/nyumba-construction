import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Clock, Eye } from 'lucide-react';
import { API_BASE } from '../../lib/api';

const FeaturedArticles: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/articles?featured=true&limit=6`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setArticles(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <section className="py-6">
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    </section>
  );

  if (!articles.length) return null;

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Featured Articles</h2>
          <p className="text-sm text-gray-500 mt-1">Expert insights from Kenya's construction industry</p>
        </div>
        <Link to="/articles" className="text-sm text-blue-700 hover:text-blue-800 font-medium flex items-center gap-1">
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/article/${article.id}`}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col"
          >
            <div className="relative overflow-hidden">
              <img
                src={article.featuredImage || 'https://images.pexels.com/photos/416917/pexels-photo-416917.jpeg?auto=compress&cs=tinysrgb&w=800'}
                alt={article.title}
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-blue-700 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold">
                  {article.category}
                </span>
              </div>
              {article.featured && (
                <div className="absolute top-3 right-3">
                  <span className="bg-orange-600 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold">Featured</span>
                </div>
              )}
            </div>

            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2 flex-1">{article.excerpt}</p>

              <div className="flex flex-wrap items-center text-xs text-gray-400 gap-2 mb-3">
                <span className="flex items-center gap-1"><User className="h-3 w-3" />{article.author}</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {article.createdAt ? new Date(article.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                </span>
                {article.readTime && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}</span>}
                <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{(article.views || 0).toLocaleString()}</span>
              </div>

              <span className="inline-flex items-center gap-1.5 text-blue-700 text-xs font-semibold">
                Read More <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedArticles;
