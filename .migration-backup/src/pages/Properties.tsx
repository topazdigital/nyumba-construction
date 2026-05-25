import React, { useState } from 'react';
import { Search, Filter, MapPin, Bed, Bath, Square, Heart, ArrowRight, Star, Phone, Mail, Calendar } from 'lucide-react';

const Properties: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [location, setLocation] = useState('all');

  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'land', label: 'Land & Development' },
    { value: 'rental', label: 'Rental Properties' },
    { value: 'investment', label: 'Investment Properties' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-5000000', label: 'Under KSh 5M' },
    { value: '5000000-10000000', label: 'KSh 5M - 10M' },
    { value: '10000000-20000000', label: 'KSh 10M - 20M' },
    { value: '20000000-50000000', label: 'KSh 20M - 50M' },
    { value: '50000000+', label: 'Over KSh 50M' }
  ];

  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'nairobi', label: 'Nairobi' },
    { value: 'mombasa', label: 'Mombasa' },
    { value: 'kisumu', label: 'Kisumu' },
    { value: 'nakuru', label: 'Nakuru' },
    { value: 'eldoret', label: 'Eldoret' }
  ];

  const properties = [
    {
      id: '1',
      title: 'Modern Executive Villa - Karen',
      price: 45000000,
      location: 'Karen, Nairobi',
      bedrooms: 5,
      bathrooms: 4,
      area: 4200,
      type: 'residential',
      images: ['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800'],
      description: 'Stunning modern villa with panoramic views, premium finishes, and smart home technology.',
      featured: true,
      agent: 'Sarah Kimani',
      agentPhone: '+254 722 123 456',
      agentEmail: 'sarah@premiumproperties.co.ke',
      rating: 4.8,
      datePosted: '2024-01-15',
      amenities: ['Swimming Pool', 'Garden', 'Garage', 'Security', 'Generator']
    },
    {
      id: '2',
      title: 'Luxury Penthouse - Westlands',
      price: 35000000,
      location: 'Westlands, Nairobi',
      bedrooms: 3,
      bathrooms: 3,
      area: 2800,
      type: 'residential',
      images: ['https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800'],
      description: 'Exclusive penthouse with city views and premium building amenities.',
      featured: true,
      agent: 'Michael Ochieng',
      agentPhone: '+254 733 234 567',
      agentEmail: 'michael@luxuryhomes.co.ke',
      rating: 4.9,
      datePosted: '2024-01-12',
      amenities: ['Gym', 'Rooftop Terrace', 'Concierge', 'Parking', 'Elevator']
    },
    {
      id: '3',
      title: 'Family Home - Kiambu Road',
      price: 18000000,
      location: 'Kiambu Road, Nairobi',
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      type: 'residential',
      images: ['https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800'],
      description: 'Perfect family home in quiet neighborhood with large compound and modern amenities.',
      featured: false,
      agent: 'Grace Wanjiku',
      agentPhone: '+254 711 345 678',
      agentEmail: 'grace@familyhomes.co.ke',
      rating: 4.6,
      datePosted: '2024-01-10',
      amenities: ['Garden', 'Parking', 'Security', 'Borehole', 'Playground']
    },
    {
      id: '4',
      title: 'Commercial Office Space - CBD',
      price: 25000000,
      location: 'CBD, Nairobi',
      bedrooms: 0,
      bathrooms: 4,
      area: 1500,
      type: 'commercial',
      images: ['https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800'],
      description: 'Prime commercial space in the heart of Nairobi CBD, perfect for corporate offices.',
      featured: false,
      agent: 'David Mutua',
      agentPhone: '+254 722 456 789',
      agentEmail: 'david@cbdproperties.co.ke',
      rating: 4.7,
      datePosted: '2024-01-08',
      amenities: ['Elevator', 'Parking', 'Security', 'Generator', 'Reception']
    },
    {
      id: '5',
      title: 'Beachfront Villa - Diani',
      price: 55000000,
      location: 'Diani, Mombasa',
      bedrooms: 6,
      bathrooms: 5,
      area: 5000,
      type: 'residential',
      images: ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'],
      description: 'Exclusive beachfront villa with private beach access and luxury amenities.',
      featured: true,
      agent: 'Amina Hassan',
      agentPhone: '+254 741 567 890',
      agentEmail: 'amina@coastalproperties.co.ke',
      rating: 4.9,
      datePosted: '2024-01-05',
      amenities: ['Beach Access', 'Pool', 'Garden', 'Staff Quarters', 'Boat Dock']
    },
    {
      id: '6',
      title: 'Development Land - Machakos',
      price: 12000000,
      location: 'Machakos County',
      bedrooms: 0,
      bathrooms: 0,
      area: 20000,
      type: 'land',
      images: ['https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800'],
      description: '5-acre development land with clean title deed, ideal for residential or commercial development.',
      featured: false,
      agent: 'Peter Mwangi',
      agentPhone: '+254 733 678 901',
      agentEmail: 'peter@landdeals.co.ke',
      rating: 4.5,
      datePosted: '2024-01-03',
      amenities: ['Clean Title', 'Road Access', 'Electricity', 'Water', 'Survey Done']
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || property.type === selectedType;
    const matchesLocation = location === 'all' || property.location.toLowerCase().includes(location);
    
    let matchesPrice = true;
    if (priceRange !== 'all') {
      if (priceRange === '50000000+') {
        matchesPrice = property.price >= 50000000;
      } else {
        const [min, max] = priceRange.split('-').map(Number);
        matchesPrice = property.price >= min && property.price <= max;
      }
    }
    
    return matchesSearch && matchesType && matchesPrice && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Property Listings
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Discover premium properties from verified sellers and trusted real estate professionals across Kenya
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {propertyTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {locations.map(loc => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {priceRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {property.type}
                  </span>
                </div>
                {property.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                )}
                <button className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white text-gray-900 px-3 py-2 rounded-lg text-lg font-bold shadow-lg">
                    {formatPrice(property.price)}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-200">
                  {property.title}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {property.description}
                </p>
                
                {/* Property Details */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center space-x-1">
                      <Bed className="h-4 w-4" />
                      <span>{property.bedrooms} beds</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Bath className="h-4 w-4" />
                    <span>{property.bathrooms} baths</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Square className="h-4 w-4" />
                    <span>{property.area.toLocaleString()} sqft</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {property.amenities.slice(0, 3).map((amenity, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                      >
                        {amenity}
                      </span>
                    ))}
                    {property.amenities.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        +{property.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Agent Info */}
                <div className="border-t pt-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{property.agent}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-500">{property.rating}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200">
                        <Phone className="h-4 w-4" />
                      </button>
                      <button className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200">
                        <Mail className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Posted Date */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>Posted {new Date(property.datePosted).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                  <span>View Details</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No properties found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;