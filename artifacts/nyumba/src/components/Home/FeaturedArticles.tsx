import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

const FeaturedArticles: React.FC = () => {
  const featuredArticles = [
    {
      id: '1',
      title: 'Sustainable Building Materials: The Future of Construction',
      excerpt: 'Explore how eco-friendly materials are revolutionizing the construction industry and contributing to a greener future.',
      category: 'Materials',
      author: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/416917/pexels-photo-416917.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      title: 'Modern Architecture Trends Shaping Urban Development',
      excerpt: 'Discover the latest architectural trends that are defining the skylines of tomorrow\'s cities.',
      category: 'Architecture',
      author: 'Michael Chen',
      date: '2024-01-12',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      title: 'Government Housing Policies: What Builders Need to Know',
      excerpt: 'Understanding the latest regulatory changes and their impact on construction projects.',
      category: 'Policy',
      author: 'Emma Rodriguez',
      date: '2024-01-10',
      readTime: '12 min read',
      image: 'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <section className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Featured Articles
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Stay informed with the latest insights from construction industry experts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredArticles.map((article) => (
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
                <span className="bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {article.category}
                </span>
              </div>
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
              </div>
              
              <Link
                to={`/article/${article.id}`}
                className="inline-flex items-center space-x-2 text-blue-700 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                <span>Read More</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/articles"
          className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center space-x-2"
        >
          <span>View All Articles</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedArticles;