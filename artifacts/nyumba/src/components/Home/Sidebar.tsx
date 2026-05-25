import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Download } from 'lucide-react';

const Sidebar: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const advertisements = [
    {
      id: 1,
      title: 'Construction Materials Catalog 2024',
      type: 'PDF Catalog',
      image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Complete guide to premium building materials and suppliers',
      link: '#',
      isPdf: true
    },
    {
      id: 2,
      title: 'Modern Architecture Trends',
      type: 'Design Guide',
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Latest architectural trends and design innovations',
      link: '#',
      isPdf: true
    },
    {
      id: 3,
      title: 'Premium Cement Solutions',
      type: 'Product Showcase',
      image: 'https://images.pexels.com/photos/1216564/pexels-photo-1216564.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'High-quality cement products for all construction needs',
      link: '#',
      isPdf: false
    },
    {
      id: 4,
      title: 'Smart Building Technologies',
      type: 'Innovation Report',
      image: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'IoT and automation in modern construction',
      link: '#',
      isPdf: true
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % advertisements.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + advertisements.length) % advertisements.length);
  };

  const currentAd = advertisements[currentSlide];

  return (
    <div className="w-full lg:w-80 space-y-6">
      {/* Advertisement Slider */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white p-4">
          <h3 className="text-lg font-bold">Featured Resources</h3>
          <p className="text-blue-100 text-sm">Industry guides and catalogs</p>
        </div>
        
        <div className="relative">
          <div className="relative h-64 overflow-hidden">
            <img
              src={currentAd.image}
              alt={currentAd.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-medium">
                {currentAd.type}
              </span>
              <h4 className="font-bold text-lg mt-2 line-clamp-2">{currentAd.title}</h4>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        
        <div className="p-4">
          <p className="text-gray-600 text-sm mb-4">{currentAd.description}</p>
          <div className="flex space-x-2">
            <button className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
              {currentAd.isPdf ? <Download className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
              <span>{currentAd.isPdf ? 'Download' : 'View'}</span>
            </button>
          </div>
          
          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {advertisements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentSlide ? 'bg-blue-700' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
        <div className="space-y-3">
          <a href="/materials/cement" className="block text-blue-700 hover:text-blue-800 transition-colors duration-200">
            → Cement & Concrete Suppliers
          </a>
          <a href="/professionals/architects" className="block text-blue-700 hover:text-blue-800 transition-colors duration-200">
            → Find Architects
          </a>
          <a href="/contractors/general" className="block text-blue-700 hover:text-blue-800 transition-colors duration-200">
            → General Contractors
          </a>
          <a href="/properties/commercial" className="block text-blue-700 hover:text-blue-800 transition-colors duration-200">
            → Commercial Properties
          </a>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
        <p className="text-orange-100 text-sm mb-4">Get the latest construction industry news and insights</p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <button className="w-full bg-white text-orange-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;