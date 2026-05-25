import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Calendar, User, ArrowRight, FileText, BookOpen, Star } from 'lucide-react';

const FlipCopy: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'magazine', label: 'Magazine Issues' },
    { value: 'catalog', label: 'Product Catalogs' },
    { value: 'brochure', label: 'Company Brochures' },
    { value: 'manual', label: 'Technical Manuals' },
    { value: 'report', label: 'Industry Reports' },
    { value: 'guide', label: 'Construction Guides' }
  ];

  const years = [
    { value: 'all', label: 'All Years' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' }
  ];

  const publications = [
    {
      id: '1',
      title: 'Nyumba Magazine - January 2024 Issue',
      description: 'Featuring sustainable construction trends, new building technologies, and exclusive interviews with leading architects.',
      category: 'Magazine',
      year: '2024',
      month: 'January',
      pages: 64,
      size: '15.2 MB',
      image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=400',
      publisher: 'Nyumba Publications',
      featured: true,
      downloads: 2450,
      rating: 4.8,
      flipUrl: 'https://flipbook.nyumba.co.ke/january-2024',
      pdfUrl: '/downloads/nyumba-january-2024.pdf'
    },
    {
      id: '2',
      title: 'Construction Materials Catalog 2024',
      description: 'Comprehensive catalog featuring the latest building materials, suppliers, and pricing information for the Kenyan market.',
      category: 'Catalog',
      year: '2024',
      month: 'February',
      pages: 128,
      size: '28.5 MB',
      image: 'https://images.pexels.com/photos/1216564/pexels-photo-1216564.jpeg?auto=compress&cs=tinysrgb&w=400',
      publisher: 'Kenya Building Materials Association',
      featured: true,
      downloads: 3200,
      rating: 4.9,
      flipUrl: 'https://flipbook.nyumba.co.ke/materials-catalog-2024',
      pdfUrl: '/downloads/materials-catalog-2024.pdf'
    },
    {
      id: '3',
      title: 'Modern Architecture Showcase',
      description: 'A visual journey through Kenya\'s most innovative architectural projects and design philosophies.',
      category: 'Magazine',
      year: '2024',
      month: 'March',
      pages: 48,
      size: '22.1 MB',
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400',
      publisher: 'Architectural Association of Kenya',
      featured: false,
      downloads: 1850,
      rating: 4.7,
      flipUrl: 'https://flipbook.nyumba.co.ke/architecture-showcase',
      pdfUrl: '/downloads/architecture-showcase.pdf'
    },
    {
      id: '4',
      title: 'Green Building Standards Manual',
      description: 'Technical manual covering sustainable building practices, green certifications, and environmental compliance.',
      category: 'Manual',
      year: '2023',
      month: 'December',
      pages: 96,
      size: '18.7 MB',
      image: 'https://images.pexels.com/photos/416917/pexels-photo-416917.jpeg?auto=compress&cs=tinysrgb&w=400',
      publisher: 'Green Building Society of Kenya',
      featured: false,
      downloads: 1420,
      rating: 4.6,
      flipUrl: 'https://flipbook.nyumba.co.ke/green-building-manual',
      pdfUrl: '/downloads/green-building-manual.pdf'
    },
    {
      id: '5',
      title: 'Real Estate Market Report 2024',
      description: 'Comprehensive analysis of Kenya\'s real estate market trends, pricing, and investment opportunities.',
      category: 'Report',
      year: '2024',
      month: 'January',
      pages: 72,
      size: '12.3 MB',
      image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=400',
      publisher: 'Kenya Property Developers Association',
      featured: false,
      downloads: 2100,
      rating: 4.5,
      flipUrl: 'https://flipbook.nyumba.co.ke/real-estate-report-2024',
      pdfUrl: '/downloads/real-estate-report-2024.pdf'
    },
    {
      id: '6',
      title: 'Construction Safety Guidelines',
      description: 'Essential safety protocols and best practices for construction sites and building projects.',
      category: 'Guide',
      year: '2023',
      month: 'November',
      pages: 56,
      size: '9.8 MB',
      image: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=400',
      publisher: 'Kenya Association of Building Contractors',
      featured: false,
      downloads: 1680,
      rating: 4.4,
      flipUrl: 'https://flipbook.nyumba.co.ke/safety-guidelines',
      pdfUrl: '/downloads/safety-guidelines.pdf'
    }
  ];

  const filteredPublications = publications.filter(publication => {
    const matchesSearch = publication.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         publication.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           publication.category.toLowerCase() === selectedCategory;
    const matchesYear = selectedYear === 'all' || publication.year === selectedYear;
    return matchesSearch && matchesCategory && matchesYear;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Digital Publications & Flip Copy
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Browse and read our digital magazines, catalogs, and industry publications in interactive flip-book format
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search publications..."
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
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {years.map(year => (
                <option key={year.value} value={year.value}>
                  {year.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Publications Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPublications.map((publication) => (
            <div
              key={publication.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={publication.image}
                  alt={publication.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {publication.category}
                  </span>
                </div>
                {publication.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black bg-opacity-60 text-white p-2 rounded-lg">
                    <div className="text-sm font-medium">{publication.pages} pages</div>
                    <div className="text-xs">{publication.size}</div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors duration-200">
                  {publication.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {publication.description}
                </p>
                
                {/* Publication Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{publication.month} {publication.year}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <User className="h-4 w-4 mr-1" />
                      <span className="text-xs">{publication.publisher}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{publication.rating}</span>
                    </div>
                    <span className="text-gray-500">{publication.downloads.toLocaleString()} downloads</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Read Online</span>
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors duration-200">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPublications.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <FileText className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No publications found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlipCopy;