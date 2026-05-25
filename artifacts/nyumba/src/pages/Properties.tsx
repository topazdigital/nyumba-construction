import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Bed, Bath, Square, Heart, ArrowRight, Phone, Mail, Filter } from 'lucide-react';
import { API_BASE } from '../lib/api';

const Properties: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [location, setLocation] = useState('all');
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'land', label: 'Land & Development' },
    { value: 'rental', label: 'Rental Properties' },
    { value: 'investment', label: 'Investment Properties' },
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-5000000', label: 'Under KSh 5M' },
    { value: '5000000-10000000', label: 'KSh 5M – 10M' },
    { value: '10000000-20000000', label: 'KSh 10M – 20M' },
    { value: '20000000-50000000', label: 'KSh 20M – 50M' },
    { value: '50000000+', label: 'Over KSh 50M' },
  ];

  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'nairobi', label: 'Nairobi' },
    { value: 'mombasa', label: 'Mombasa' },
    { value: 'kisumu', label: 'Kisumu' },
    { value: 'nakuru', label: 'Nakuru' },
    { value: 'eldoret', label: 'Eldoret' },
    { value: 'kiambu', label: 'Kiambu' },
  ];

  useEffect(() => {
    const params = new URLSearchParams({ limit: '50' });
    if (selectedType !== 'all') params.set('type', selectedType);
    if (location !== 'all') params.set('location', location);
    if (searchTerm) params.set('search', searchTerm);

    setLoading(true);
    fetch(`${API_BASE}/api/properties?${params}`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setProperties(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [selectedType, location, searchTerm]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);

  const filteredProperties = properties.filter(p => {
    if (priceRange === 'all') return true;
    const price = Number(p.price);
    if (priceRange === '50000000+') return price >= 50000000;
    const [min, max] = priceRange.split('-').map(Number);
    return price >= min && price <= max;
  });

  const getImages = (p: any): string[] => {
    if (Array.isArray(p.images)) return p.images;
    if (typeof p.images === 'string') {
      try { return JSON.parse(p.images); } catch { return []; }
    }
    return [];
  };

  const getAmenities = (p: any): string[] => {
    if (Array.isArray(p.amenities)) return p.amenities;
    if (typeof p.amenities === 'string') {
      try { return JSON.parse(p.amenities); } catch { return []; }
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Property Listings</h1>
          <p className="text-gray-500 text-sm">
            Discover premium properties from verified sellers across Kenya
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search title or location..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select value={selectedType} onChange={e => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {propertyTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
            <select value={location} onChange={e => setLocation(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {locations.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
            <select value={priceRange} onChange={e => setPriceRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {priceRanges.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-16">
            <Filter className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-semibold text-gray-600 mb-1">No properties found</h3>
            <p className="text-gray-400 text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">{filteredProperties.length} propert{filteredProperties.length === 1 ? 'y' : 'ies'} found</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProperties.map(property => {
                const imgs = getImages(property);
                const amenities = getAmenities(property);
                const img = imgs[0] || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800';

                return (
                  <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col">
                    <div className="relative overflow-hidden">
                      <img src={img} alt={property.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-3 left-3">
                        <span className="bg-orange-600 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize">
                          {property.propertyType}
                        </span>
                      </div>
                      {property.featured && (
                        <div className="absolute top-3 right-3">
                          <span className="bg-blue-700 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold">Featured</span>
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-white/95 text-gray-900 px-2.5 py-1 rounded-lg text-sm font-bold shadow">
                          {formatPrice(Number(property.price))}
                        </span>
                      </div>
                      <button className="absolute bottom-3 right-3 bg-white p-1.5 rounded-full shadow hover:bg-gray-50">
                        <Heart className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors line-clamp-1">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-gray-500 mb-2">
                        <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                        <span className="text-xs truncate">{property.location}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{property.description}</p>

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

                      {(property.contactName || property.agent) && (
                        <div className="border-t pt-3 mb-3 flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-700">{property.contactName || property.agent}</span>
                          <div className="flex gap-2">
                            {property.contactPhone && (
                              <a href={`tel:${property.contactPhone}`} className="p-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                                <Phone className="h-3.5 w-3.5" />
                              </a>
                            )}
                            {property.contactEmail && (
                              <a href={`mailto:${property.contactEmail}`} className="p-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                                <Mail className="h-3.5 w-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      <Link
                        to={`/property/${property.id}`}
                        className="mt-auto w-full bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                      >
                        View Details <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Properties;
