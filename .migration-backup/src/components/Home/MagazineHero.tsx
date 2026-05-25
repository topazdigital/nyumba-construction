import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, Building, User, Clock, Calendar } from 'lucide-react';

const MagazineHero: React.FC = () => {
  const featuredStory = {
    title: "The Future of Sustainable Construction in Kenya",
    excerpt: "Exploring innovative green building technologies and sustainable practices that are reshaping Kenya's construction landscape.",
    author: "Dr. Sarah Mwangi",
    date: "December 8, 2024",
    category: "Sustainability",
    image: "https://images.pexels.com/photos/416917/pexels-photo-416917.jpeg?auto=compress&cs=tinysrgb&w=1200",
    readTime: "8 min read"
  };

  const newsStories = [
    {
      id: 1,
      title: "Government Announces New Affordable Housing Initiative",
      excerpt: "The Ministry of Housing unveils ambitious plans to deliver 200,000 affordable housing units across Kenya by 2025.",
      author: "James Kiprotich",
      date: "December 7, 2024",
      category: "Policy",
      image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=600",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Revolutionary 3D Printing Technology Arrives in Nairobi",
      excerpt: "Local construction company introduces cutting-edge 3D printing technology for faster and more efficient building construction.",
      author: "Mary Wanjiku",
      date: "December 6, 2024",
      category: "Technology",
      image: "https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=600",
      readTime: "6 min read"
    },
    {
      id: 3,
      title: "Cement Prices Drop as New Factory Opens in Machakos",
      excerpt: "The opening of a new cement manufacturing plant is expected to reduce construction costs and boost local development.",
      author: "Peter Mwangi",
      date: "December 5, 2024",
      category: "Market",
      image: "https://images.pexels.com/photos/1216564/pexels-photo-1216564.jpeg?auto=compress&cs=tinysrgb&w=600",
      readTime: "4 min read"
    },
    {
      id: 4,
      title: "Green Building Certification Program Launched",
      excerpt: "Kenya Green Building Society introduces new certification standards to promote environmentally sustainable construction practices.",
      author: "Grace Njeri",
      date: "December 4, 2024",
      category: "Environment",
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600",
      readTime: "7 min read"
    }
  ];

  const trendingTopics = [
    { title: "Affordable Housing Initiative 2024", category: "Policy", views: "12.5K" },
    { title: "Smart Building Technologies", category: "Innovation", views: "8.2K" },
    { title: "Construction Material Price Trends", category: "Market", views: "15.1K" },
    { title: "Green Building Certifications", category: "Sustainability", views: "6.8K" }
  ];

  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Story */}
          <div className="lg:col-span-2">
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden group mb-8">
              <div className="relative h-80 lg:h-96 overflow-hidden">
                <img
                  src={featuredStory.image}
                  alt={featuredStory.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured Story
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="mb-3">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {featuredStory.category}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-3 leading-tight">
                    {featuredStory.title}
                  </h2>
                  <p className="text-blue-100 mb-4 line-clamp-2">
                    {featuredStory.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-blue-100">
                      <span>By {featuredStory.author}</span>
                      <span>•</span>
                      <span>{featuredStory.date}</span>
                      <span>•</span>
                      <span>{featuredStory.readTime}</span>
                    </div>
                    <Link
                      to="/articles/featured"
                      className="bg-white text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <span>Read More</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Latest News Stories */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Latest News</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {newsStories.map((story) => (
                  <article key={story.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg mb-3">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {story.category}
                        </span>
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-200 mb-2 line-clamp-2">
                      {story.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {story.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 space-x-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{story.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{story.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{story.readTime}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                <h3 className="text-lg font-bold text-gray-900">Trending Now</h3>
              </div>
              <div className="space-y-4">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors duration-200 line-clamp-2">
                          {topic.title}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-blue-600 font-medium">{topic.category}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{topic.views} views</span>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-gray-300 ml-3">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    {index < trendingTopics.length - 1 && (
                      <hr className="mt-4 border-gray-100" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center space-x-2 mb-4">
                <Building className="h-5 w-5" />
                <h3 className="text-lg font-bold">This Month</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">45</div>
                  <div className="text-blue-100 text-sm">New Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">128</div>
                  <div className="text-blue-100 text-sm">Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">89</div>
                  <div className="text-blue-100 text-sm">Professionals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-blue-100 text-sm">Suppliers</div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Stay Informed</h3>
              <p className="text-orange-100 text-sm mb-4">
                Get the latest construction industry insights delivered to your inbox
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
                <button className="w-full bg-white text-orange-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/properties"
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors duration-200">
              <Building className="h-6 w-6 text-blue-700" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Real Estate</h3>
            <p className="text-sm text-gray-600">Properties & Listings</p>
          </Link>
          <Link
            to="/professionals"
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 group"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors duration-200">
              <Users className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Professionals</h3>
            <p className="text-sm text-gray-600">Expert Directory</p>
          </Link>
          <Link
            to="/contractors"
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 group"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-200 transition-colors duration-200">
              <Building className="h-6 w-6 text-orange-700" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Contractors</h3>
            <p className="text-sm text-gray-600">Certified Builders</p>
          </Link>
          <Link
            to="/materials"
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 group"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors duration-200">
              <TrendingUp className="h-6 w-6 text-purple-700" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Materials</h3>
            <p className="text-sm text-gray-600">Suppliers & Products</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MagazineHero;