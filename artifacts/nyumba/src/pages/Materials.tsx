import React, { useState } from 'react';
import { Search, Filter, MapPin, Mail, Phone, Star, Award, ArrowRight, Calendar, CheckCircle, Package, Truck, Factory } from 'lucide-react';

const Materials: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'cement', label: 'Cement & Concrete' },
    { value: 'steel', label: 'Steel & Metal' },
    { value: 'roofing', label: 'Roofing Materials' },
    { value: 'doors_windows', label: 'Doors & Windows' },
    { value: 'tiles', label: 'Tiles & Flooring' },
    { value: 'paints', label: 'Paints & Finishes' },
    { value: 'plumbing', label: 'Plumbing Supplies' },
    { value: 'electrical', label: 'Electrical Supplies' },
    { value: 'insulation', label: 'Insulation Materials' },
    { value: 'hardware', label: 'Hardware & Tools' }
  ];

  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'nairobi', label: 'Nairobi' },
    { value: 'mombasa', label: 'Mombasa' },
    { value: 'kisumu', label: 'Kisumu' },
    { value: 'nakuru', label: 'Nakuru' },
    { value: 'eldoret', label: 'Eldoret' }
  ];

  const suppliers = [
    {
      id: '1',
      companyName: 'East African Portland Cement',
      contactPerson: 'Robert Kimani',
      category: 'Cement & Concrete',
      location: 'Nairobi, Kenya',
      experience: 25,
      rating: 4.8,
      reviews: 234,
      products: ['Portland Cement', 'Ready Mix Concrete', 'Cement Blocks', 'Precast Products'],
      description: 'Leading cement manufacturer in East Africa providing high-quality cement and concrete products for construction projects.',
      image: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      email: 'robert@eaportland.co.ke',
      phone: '+254 722 123 456',
      website: 'www.eaportland.co.ke',
      established: '1999',
      employees: 150,
      deliveryRadius: 50,
      minOrder: 'KSh 50,000',
      paymentTerms: '30 days'
    },
    {
      id: '2',
      companyName: 'Kenya Steel Works',
      contactPerson: 'Mary Wanjiku',
      category: 'Steel & Metal',
      location: 'Mombasa, Kenya',
      experience: 20,
      rating: 4.7,
      reviews: 189,
      products: ['Reinforcement Bars', 'Steel Sheets', 'Structural Steel', 'Wire Mesh'],
      description: 'Premier steel manufacturer and supplier offering comprehensive steel solutions for construction and industrial applications.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      email: 'mary@kenyasteel.co.ke',
      phone: '+254 733 234 567',
      website: 'www.kenyasteel.co.ke',
      established: '2004',
      employees: 120,
      deliveryRadius: 100,
      minOrder: 'KSh 75,000',
      paymentTerms: '45 days'
    },
    {
      id: '3',
      companyName: 'Mabati Rolling Mills',
      contactPerson: 'James Mutua',
      category: 'Roofing Materials',
      location: 'Nairobi, Kenya',
      experience: 30,
      rating: 4.9,
      reviews: 312,
      products: ['Iron Sheets', 'Roofing Tiles', 'Gutters', 'Roofing Accessories'],
      description: 'Leading roofing materials manufacturer with the widest range of quality roofing solutions in East Africa.',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      email: 'james@mabati.co.ke',
      phone: '+254 741 345 678',
      website: 'www.mabati.co.ke',
      established: '1994',
      employees: 200,
      deliveryRadius: 75,
      minOrder: 'KSh 25,000',
      paymentTerms: '30 days'
    },
    {
      id: '4',
      companyName: 'Crown Paints Kenya',
      contactPerson: 'Grace Njeri',
      category: 'Paints & Finishes',
      location: 'Nairobi, Kenya',
      experience: 18,
      rating: 4.6,
      reviews: 156,
      products: ['Interior Paints', 'Exterior Paints', 'Wood Finishes', 'Primers'],
      description: 'Premium paint manufacturer offering innovative coating solutions for residential and commercial applications.',
      image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      email: 'grace@crownpaints.co.ke',
      phone: '+254 722 456 789',
      website: 'www.crownpaints.co.ke',
      established: '2006',
      employees: 85,
      deliveryRadius: 40,
      minOrder: 'KSh 15,000',
      paymentTerms: '21 days'
    },
    {
      id: '5',
      companyName: 'Tiles & Carpet Centre',
      contactPerson: 'David Ochieng',
      category: 'Tiles & Flooring',
      location: 'Kisumu, Kenya',
      experience: 15,
      rating: 4.5,
      reviews: 98,
      products: ['Ceramic Tiles', 'Porcelain Tiles', 'Natural Stone', 'Vinyl Flooring'],
      description: 'Comprehensive flooring solutions provider with extensive range of tiles and flooring materials.',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      email: 'david@tilescentre.co.ke',
      phone: '+254 733 567 890',
      website: 'www.tilescentre.co.ke',
      established: '2009',
      employees: 45,
      deliveryRadius: 30,
      minOrder: 'KSh 20,000',
      paymentTerms: '14 days'
    },
    {
      id: '6',
      companyName: 'Simba Cement',
      contactPerson: 'Sarah Mwangi',
      category: 'Cement & Concrete',
      location: 'Nakuru, Kenya',
      experience: 22,
      rating: 4.7,
      reviews: 178,
      products: ['Ordinary Portland Cement', 'Pozzolan Cement', 'Masonry Cement', 'Lime'],
      description: 'Quality cement manufacturer committed to providing superior cement products for sustainable construction.',
      image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      email: 'sarah@simbacem.co.ke',
      phone: '+254 711 678 901',
      website: 'www.simbacem.co.ke',
      established: '2002',
      employees: 95,
      deliveryRadius: 60,
      minOrder: 'KSh 40,000',
      paymentTerms: '30 days'
    }
  ];

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.products.some(product => 
                           product.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesCategory = selectedCategory === 'all' || 
                           supplier.category.toLowerCase().replace(/[^a-z]/g, '_').includes(selectedCategory.replace('_', ''));
    const matchesLocation = selectedLocation === 'all' || 
                           supplier.location.toLowerCase().includes(selectedLocation);
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Materials & Suppliers
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Connect with verified suppliers and manufacturers for all your construction material needs
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
                placeholder="Search suppliers..."
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
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {locations.map(location => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSuppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <img
                      src={supplier.image}
                      alt={supplier.contactPerson}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {supplier.verified && (
                      <div className="absolute -top-1 -right-1 bg-purple-600 rounded-full p-1">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                      {supplier.companyName}
                    </h3>
                    <p className="text-purple-600 font-medium">{supplier.category}</p>
                    <p className="text-gray-600 text-sm">{supplier.contactPerson}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{supplier.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{supplier.rating}</span>
                      <span className="text-sm text-gray-500">({supplier.reviews} reviews)</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      Est. {supplier.established}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {supplier.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{supplier.employees}</div>
                    <div className="text-xs text-gray-600">Employees</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{supplier.deliveryRadius}km</div>
                    <div className="text-xs text-gray-600">Delivery</div>
                  </div>
                </div>

                {/* Products */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {supplier.products.slice(0, 3).map((product, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {product}
                      </span>
                    ))}
                    {supplier.products.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        +{supplier.products.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Business Terms */}
                <div className="mb-4 text-xs text-gray-600">
                  <div className="flex justify-between mb-1">
                    <span>Min Order:</span>
                    <span className="font-medium">{supplier.minOrder}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment:</span>
                    <span className="font-medium">{supplier.paymentTerms}</span>
                  </div>
                </div>

                {/* Website */}
                {supplier.website && (
                  <div className="mb-4">
                    <a 
                      href={`https://${supplier.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
                    >
                      <span>{supplier.website}</span>
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                )}

                <div className="flex space-x-2">
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Contact</span>
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors duration-200">
                    <Phone className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSuppliers.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Package className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No suppliers found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Materials;