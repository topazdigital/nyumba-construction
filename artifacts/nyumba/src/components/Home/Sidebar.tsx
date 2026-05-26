import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ExternalLink, Download } from 'lucide-react';
import { API_BASE } from '../../lib/api';
import AdBanner from './AdBanner';

const Sidebar: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderItems, setSliderItems] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/slider`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setSliderItems(data.filter((s: any) => s.active)); })
      .catch(() => {});
  }, []);

  const items = sliderItems.length > 0 ? sliderItems : [
    {
      id: 1,
      title: 'Kenya Construction Cost Guide 2025',
      description: 'Current rates for labour, materials & project planning in Kenya',
      imagePath: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=400',
      fileType: 'pdf',
      filePath: '#',
    },
    {
      id: 2,
      title: 'H1 2025 Property Market Report',
      description: 'Nairobi, Mombasa & Kisumu residential price trends',
      imagePath: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400',
      fileType: 'pdf',
      filePath: '#',
    },
    {
      id: 3,
      title: 'Green Building Standards in Kenya',
      description: 'NCA & KEBS-aligned sustainability checklist for developers',
      imagePath: 'https://images.pexels.com/photos/416917/pexels-photo-416917.jpeg?auto=compress&cs=tinysrgb&w=400',
      fileType: 'pdf',
      filePath: '#',
    },
  ];

  const nextSlide = () => setCurrentSlide(p => (p + 1) % items.length);
  const prevSlide = () => setCurrentSlide(p => (p - 1 + items.length) % items.length);
  const current = items[currentSlide] || items[0];

  if (!current) return null;

  return (
    <div className="w-full lg:w-72 space-y-5">
      {/* Slider */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-blue-700 text-white px-4 py-3">
          <h3 className="text-sm font-bold">Featured Resources</h3>
          <p className="text-blue-200 text-xs">Industry guides & catalogs</p>
        </div>

        <div className="relative">
          <div className="relative h-52 overflow-hidden">
            <img
              src={current.imagePath || 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=400'}
              alt={current.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="bg-orange-600 text-white px-2 py-0.5 rounded text-xs font-medium uppercase">{current.fileType}</span>
              <h4 className="font-bold text-sm mt-1 line-clamp-2">{current.title}</h4>
            </div>
          </div>

          {items.length > 1 && (
            <>
              <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full shadow">
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full shadow">
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </>
          )}
        </div>

        <div className="p-3">
          <p className="text-gray-500 text-xs mb-3">{current.description}</p>
          <a
            href={current.filePath && current.filePath !== '#' ? current.filePath : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 px-3 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            {current.fileType === 'pdf' ? <Download className="h-3.5 w-3.5" /> : <ExternalLink className="h-3.5 w-3.5" />}
            {current.fileType === 'pdf' ? 'Download PDF' : 'View'}
          </a>

          {items.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-3">
              {items.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentSlide ? 'bg-blue-700' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Quick Links</h3>
        <div className="space-y-2">
          {[
            { to: '/materials/cement', label: 'Cement & Concrete Suppliers' },
            { to: '/professionals/architects', label: 'Find Architects' },
            { to: '/contractors/general', label: 'General Contractors' },
            { to: '/properties/commercial', label: 'Commercial Properties' },
            { to: '/articles', label: 'Latest Articles' },
            { to: '/events', label: 'Upcoming Events' },
          ].map(l => (
            <Link key={l.to} to={l.to} className="block text-xs text-blue-700 hover:text-blue-800 hover:underline py-0.5">
              → {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Advertisement Banner */}
      <AdBanner />

      {/* Newsletter */}
      <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl shadow-md p-4 text-white">
        <h3 className="text-sm font-bold mb-1">Stay Updated</h3>
        <p className="text-orange-100 text-xs mb-3">Get the latest industry news and insights</p>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 rounded-lg text-xs text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300 mb-2"
        />
        <button className="w-full bg-white text-orange-600 py-2 px-3 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
