import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, Building, Clock, Calendar, User, Eye } from 'lucide-react';

const MagazineHero: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ articles: 45, properties: 128, professionals: 89, suppliers: 156 });

  useEffect(() => {
    fetch('/api/articles?limit=6&published=true')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setArticles(data); })
      .catch(() => {})
      .finally(() => setLoading(false));

    fetch('/api/admin/stats').then(r => r.json()).then(d => {
      if (d && typeof d === 'object') setStats(s => ({ ...s, ...d }));
    }).catch(() => {});
  }, []);

  const featured = articles[0];
  const news = articles.slice(1, 5);

  const fallbackImage = 'https://images.pexels.com/photos/416917/pexels-photo-416917.jpeg?auto=compress&cs=tinysrgb&w=1200';
  const fallbackThumb = 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=600';

  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured Story */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {featured ? (
                <Link to={`/article/${featured.id}`} className="block relative bg-white rounded-2xl shadow-xl overflow-hidden group">
                  <div className="relative h-72 lg:h-88 overflow-hidden">
                    <img
                      src={featured.featuredImage || fallbackImage}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute top-5 left-5">
                      <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold">Featured Story</span>
                    </div>
                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">{featured.category}</span>
                      <h2 className="text-xl lg:text-2xl font-bold mt-2 mb-2 leading-snug line-clamp-2">{featured.title}</h2>
                      <p className="text-blue-100 text-sm mb-3 line-clamp-2">{featured.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-blue-100">
                          <span className="flex items-center gap-1"><User className="h-3 w-3" />{featured.author}</span>
                          {featured.readTime && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{featured.readTime}</span>}
                          <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{(featured.views || 0).toLocaleString()}</span>
                        </div>
                        <span className="bg-white text-blue-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1">
                          Read More <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="relative bg-gray-200 rounded-2xl h-72 flex items-center justify-center text-gray-400">
                  No featured article yet
                </div>
              )}

              {/* Latest News Grid */}
              {news.length > 0 && (
                <div className="bg-white rounded-2xl shadow-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Latest News</h3>
                    <Link to="/news" className="text-xs text-blue-700 hover:text-blue-800 font-medium flex items-center gap-1">
                      View All <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {news.map((story) => (
                      <Link key={story.id} to={`/article/${story.id}`} className="group flex gap-3">
                        <div className="relative flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden">
                          <img
                            src={story.featuredImage || fallbackThumb}
                            alt={story.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-1 left-1">
                            <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded text-[10px] font-medium leading-none">{story.category}</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                            {story.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1.5 text-[11px] text-gray-500">
                            <span className="flex items-center gap-0.5"><User className="h-2.5 w-2.5" />{story.author}</span>
                            {story.readTime && <span className="flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" />{story.readTime}</span>}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Content */}
            <div className="flex flex-col gap-5">
              {/* Stats */}
              <div className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-xl shadow-lg p-5 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Building className="h-4 w-4" />
                  <h3 className="text-sm font-bold">Platform Overview</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: stats.articles, label: 'Articles' },
                    { val: stats.properties, label: 'Properties' },
                    { val: stats.professionals, label: 'Professionals' },
                    { val: stats.suppliers || 156, label: 'Suppliers' },
                  ].map(s => (
                    <div key={s.label} className="text-center bg-white/10 rounded-lg py-2">
                      <div className="text-xl font-bold">{s.val}</div>
                      <div className="text-blue-200 text-xs">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Articles List */}
              {articles.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-4 w-4 text-orange-600" />
                    <h3 className="text-sm font-bold text-gray-900">Trending Articles</h3>
                  </div>
                  <div className="space-y-3">
                    {articles.slice(0, 4).map((article, i) => (
                      <Link key={article.id} to={`/article/${article.id}`} className="flex items-start gap-3 group">
                        <span className="text-2xl font-bold text-gray-200 flex-shrink-0 leading-none mt-0.5">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div className="min-w-0">
                          <h4 className="text-xs font-semibold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                            {article.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500">
                            <span className="text-blue-600 font-medium">{article.category}</span>
                            <span>•</span>
                            <span className="flex items-center gap-0.5"><Eye className="h-2.5 w-2.5" />{(article.views || 0).toLocaleString()}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl shadow-lg p-5 text-white">
                <h3 className="text-sm font-bold mb-1">Stay Informed</h3>
                <p className="text-orange-100 text-xs mb-3">Get the latest construction industry insights delivered to your inbox</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 min-w-0 px-3 py-2 rounded-lg text-xs text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                  <button className="flex-shrink-0 bg-white text-orange-600 py-2 px-3 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Navigation */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { to: '/properties', icon: Building, color: 'blue', bg: 'bg-blue-50', title: 'Real Estate', sub: 'Properties & Listings' },
            { to: '/professionals', icon: Users, color: 'green', bg: 'bg-green-50', title: 'Professionals', sub: 'Expert Directory' },
            { to: '/contractors', icon: Building, color: 'orange', bg: 'bg-orange-50', title: 'Contractors', sub: 'Certified Builders' },
            { to: '/materials', icon: TrendingUp, color: 'purple', bg: 'bg-purple-50', title: 'Materials', sub: 'Suppliers & Products' },
          ].map(n => (
            <Link key={n.to} to={n.to} className={`${n.bg} rounded-xl p-4 text-center hover:shadow-md transition-shadow group`}>
              <div className={`w-10 h-10 bg-${n.color}-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-${n.color}-200 transition-colors`}>
                <n.icon className={`h-5 w-5 text-${n.color}-700`} />
              </div>
              <h3 className="text-sm font-bold text-gray-900">{n.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{n.sub}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MagazineHero;
