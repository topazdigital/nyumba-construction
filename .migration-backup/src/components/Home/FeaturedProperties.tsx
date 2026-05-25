import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, ArrowRight } from 'lucide-react';

const FeaturedProperties: React.FC = () => {
  const featuredProperties = [
    {
      id: '1',
      title: 'Modern Luxury Villa',
      price: 850000,
      location: 'Beverly Hills, CA',
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
      type: 'Villa'
    },
    {
      id: '2',
      title: 'Contemporary Downtown Condo',
      price: 520000,
      location: 'Manhattan, NY',
      bedrooms: 2,
      bathrooms: 2,
      area: 1800,
      image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800',
      type: 'Condo'
    },
    {
      id: '3',
      title: 'Suburban Family Home',
      price: 425000,
      location: 'Austin, TX',
      bedrooms: 3,
      bathrooms: 2,
      area: 2400,
      image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
      type: 'House'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Featured Properties
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover premium properties from verified listings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProperties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
          >
            <div className="relative overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {property.type}
                </span>
              </div>
              <div className="absolute bottom-4 right-4">
                <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-lg font-bold shadow-lg">
                  {formatPrice(property.price)}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-200">
                {property.title}
              </h3>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.location}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Bed className="h-4 w-4" />
                  <span>{property.bedrooms} beds</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Bath className="h-4 w-4" />
                  <span>{property.bathrooms} baths</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Square className="h-4 w-4" />
                  <span>{property.area} sqft</span>
                </div>
              </div>
              
              <Link
                to={`/properties/${property.id}`}
                className="inline-flex items-center space-x-2 text-blue-700 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                <span>View Details</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/properties"
          className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center space-x-2"
        >
          <span>View All Properties</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProperties;