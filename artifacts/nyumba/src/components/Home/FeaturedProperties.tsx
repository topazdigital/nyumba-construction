import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, ArrowRight } from 'lucide-react';
import { API_BASE } from '../../lib/api';

const FeaturedProperties: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/properties?featured=true&limit=3`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setProperties(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);

  if (loading) return (
    <section className="py-6">
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600" />
      </div>
    </section>
  );

  if (!properties.length) return null;

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Featured Properties</h2>
          <p className="text-sm text-gray-500 mt-1">Premium listings from verified sellers across Kenya</p>
        </div>
        <Link to="/properties" className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1">
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {properties.map((property) => {
          const imgs = Array.isArray(property.images) ? property.images : (typeof property.images === 'string' ? JSON.parse(property.images || '[]') : []);
          const img = imgs[0] || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800';
          const amenities = Array.isArray(property.amenities) ? property.amenities : (typeof property.amenities === 'string' ? JSON.parse(property.amenities || '[]') : []);

          return (
            <Link
              key={property.id}
              to={`/property/${property.id}`}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col"
            >
              <div className="relative overflow-hidden">
                <img
                  src={img}
                  alt={property.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-orange-600 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize">
                    {property.propertyType}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="bg-white/95 text-gray-900 px-2.5 py-1 rounded-lg text-sm font-bold shadow-md">
                    {formatPrice(Number(property.price))}
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors line-clamp-1">
                  {property.title}
                </h3>

                <div className="flex items-center text-gray-500 mb-3">
                  <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                  <span className="text-xs truncate">{property.location}</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  {Number(property.bedrooms) > 0 && (
                    <span className="flex items-center gap-0.5"><Bed className="h-3.5 w-3.5" />{property.bedrooms} beds</span>
                  )}
                  {Number(property.bathrooms) > 0 && (
                    <span className="flex items-center gap-0.5"><Bath className="h-3.5 w-3.5" />{property.bathrooms} baths</span>
                  )}
                  {Number(property.area) > 0 && (
                    <span className="flex items-center gap-0.5"><Square className="h-3.5 w-3.5" />{Number(property.area).toLocaleString()} sqft</span>
                  )}
                </div>

                {amenities.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {amenities.slice(0, 3).map((a: string, i: number) => (
                      <span key={i} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">{a}</span>
                    ))}
                    {amenities.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">+{amenities.length - 3}</span>
                    )}
                  </div>
                )}

                <span className="mt-auto inline-flex items-center gap-1.5 text-blue-700 text-xs font-semibold">
                  View Details <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="text-center mt-6">
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          Browse All Properties <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProperties;
