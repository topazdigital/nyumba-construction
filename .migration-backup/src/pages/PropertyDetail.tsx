import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Bed, Bath, Square, Heart, Share2, Calendar, Star, Phone, Mail, MessageCircle, Camera, ChevronLeft, ChevronRight } from 'lucide-react';

const PropertyDetail: React.FC = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  // Mock property data - in real app, fetch based on ID
  const property = {
    id: '1',
    title: 'Modern Executive Villa - Karen',
    price: 45000000,
    location: 'Karen, Nairobi',
    bedrooms: 5,
    bathrooms: 4,
    area: 4200,
    type: 'residential',
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    description: `This stunning modern villa represents the pinnacle of luxury living in Karen. Designed with contemporary aesthetics and premium finishes throughout, this property offers an exceptional lifestyle for discerning buyers.

The villa features an open-plan design that seamlessly connects indoor and outdoor living spaces. Floor-to-ceiling windows flood the interior with natural light while offering breathtaking views of the surrounding landscape.

Key features include a gourmet kitchen with top-of-the-line appliances, spacious bedrooms with en-suite bathrooms, a private swimming pool, and beautifully landscaped gardens. The property also includes smart home technology for enhanced convenience and security.`,
    featured: true,
    agent: {
      name: 'Sarah Kimani',
      phone: '+254 722 123 456',
      email: 'sarah@premiumproperties.co.ke',
      company: 'Premium Properties Kenya',
      image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 4.8,
      reviews: 156,
      experience: 8
    },
    rating: 4.8,
    datePosted: '2024-01-15',
    amenities: [
      'Swimming Pool', 'Garden', 'Garage', 'Security', 'Generator',
      'CCTV', 'Borehole', 'Solar Panels', 'Gym', 'Study Room',
      'Servant Quarters', 'Balcony', 'Fireplace', 'Walk-in Closet'
    ],
    features: {
      yearBuilt: 2022,
      parkingSpaces: 4,
      floors: 2,
      lotSize: 0.5,
      propertyTax: 180000,
      hoaFees: 0
    },
    neighborhood: {
      schools: ['Brookhouse School', 'Karen Country Club Primary'],
      hospitals: ['Karen Hospital', 'Nairobi Hospital'],
      shopping: ['Karen Waterfront', 'Junction Mall'],
      transport: 'Matatu routes, Uber/Bolt available'
    },
    virtualTour: 'https://example.com/virtual-tour',
    floorPlan: 'https://example.com/floor-plan.pdf'
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const ContactForm = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Agent</h3>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your phone number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="I'm interested in this property..."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
        >
          Send Message
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link
              to="/properties"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-700 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Properties</span>
            </Link>
            <div className="flex items-center space-x-2 text-gray-400">
              <span>/</span>
              <span className="text-gray-900">{property.title}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-xl">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  <Camera className="h-4 w-4 inline mr-1" />
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-5 w-5 mr-1" />
                    <span>{property.location}</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-700">
                    {formatPrice(property.price)}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Bed className="h-6 w-6 text-gray-600 mx-auto mb-1" />
                  <div className="font-semibold text-gray-900">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center">
                  <Bath className="h-6 w-6 text-gray-600 mx-auto mb-1" />
                  <div className="font-semibold text-gray-900">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center">
                  <Square className="h-6 w-6 text-gray-600 mx-auto mb-1" />
                  <div className="font-semibold text-gray-900">{property.area.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Sq Ft</div>
                </div>
                <div className="text-center">
                  <Calendar className="h-6 w-6 text-gray-600 mx-auto mb-1" />
                  <div className="font-semibold text-gray-900">{property.features.yearBuilt}</div>
                  <div className="text-sm text-gray-600">Year Built</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
                <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {property.description}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Features */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Property Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Parking Spaces</span>
                    <span className="font-medium">{property.features.parkingSpaces}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Floors</span>
                    <span className="font-medium">{property.features.floors}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Lot Size</span>
                    <span className="font-medium">{property.features.lotSize} acres</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Property Tax</span>
                    <span className="font-medium">KSh {property.features.propertyTax.toLocaleString()}/year</span>
                  </div>
                </div>
              </div>

              {/* Neighborhood */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Neighborhood</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Schools</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {property.neighborhood.schools.map((school, index) => (
                        <li key={index}>• {school}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Healthcare</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {property.neighborhood.hospitals.map((hospital, index) => (
                        <li key={index}>• {hospital}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Shopping</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {property.neighborhood.shopping.map((shop, index) => (
                        <li key={index}>• {shop}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Transport</h3>
                    <p className="text-sm text-gray-600">{property.neighborhood.transport}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Listed by</h3>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={property.agent.image}
                  alt={property.agent.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{property.agent.name}</h4>
                  <p className="text-sm text-gray-600">{property.agent.company}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-500">{property.agent.rating} ({property.agent.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Call Agent</span>
                </button>
                <button
                  onClick={() => setShowContactForm(!showContactForm)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Send Message</span>
                </button>
                <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Email Agent</span>
                </button>
              </div>
            </div>

            {/* Contact Form */}
            {showContactForm && <ContactForm />}

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                  Schedule Viewing
                </button>
                <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                  Virtual Tour
                </button>
                <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                  Download Brochure
                </button>
                <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                  Mortgage Calculator
                </button>
              </div>
            </div>

            {/* Property Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Property Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Listed</span>
                  <span className="font-medium">{new Date(property.datePosted).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Views</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Inquiries</span>
                  <span className="font-medium">45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Property ID</span>
                  <span className="font-medium">#{property.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;