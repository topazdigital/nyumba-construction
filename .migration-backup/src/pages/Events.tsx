import React, { useState } from 'react';
import { Search, Filter, MapPin, Calendar, Clock, Users, ArrowRight, Star, Ticket, ExternalLink } from 'lucide-react';

const Events: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'conference', label: 'Conferences' },
    { value: 'exhibition', label: 'Exhibitions' },
    { value: 'workshop', label: 'Workshops' },
    { value: 'seminar', label: 'Seminars' },
    { value: 'networking', label: 'Networking' },
    { value: 'training', label: 'Training' }
  ];

  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'nairobi', label: 'Nairobi' },
    { value: 'mombasa', label: 'Mombasa' },
    { value: 'kisumu', label: 'Kisumu' },
    { value: 'nakuru', label: 'Nakuru' },
    { value: 'eldoret', label: 'Eldoret' }
  ];

  const events = [
    {
      id: '1',
      title: 'Kenya Construction Expo 2024',
      description: 'The largest construction industry exhibition in East Africa featuring the latest technologies, materials, and innovations.',
      category: 'Exhibition',
      date: '2024-03-15',
      time: '09:00 AM',
      endDate: '2024-03-17',
      location: 'KICC, Nairobi',
      venue: 'Kenyatta International Convention Centre',
      price: 2500,
      image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800',
      organizer: 'Kenya Association of Building & Civil Engineering Contractors',
      attendees: 5000,
      speakers: ['Dr. Sarah Mwangi', 'Eng. Michael Ochieng', 'Arch. Grace Wanjiku'],
      featured: true,
      status: 'upcoming',
      website: 'https://kenyaconstructionexpo.com'
    },
    {
      id: '2',
      title: 'Sustainable Building Materials Conference',
      description: 'Exploring eco-friendly construction materials and sustainable building practices for the future.',
      category: 'Conference',
      date: '2024-02-28',
      time: '08:30 AM',
      endDate: '2024-02-28',
      location: 'Serena Hotel, Nairobi',
      venue: 'Serena Hotel Conference Center',
      price: 3500,
      image: 'https://images.pexels.com/photos/416917/pexels-photo-416917.jpeg?auto=compress&cs=tinysrgb&w=800',
      organizer: 'Green Building Society of Kenya',
      attendees: 300,
      speakers: ['Prof. James Kiprotich', 'Dr. Patricia Wanjiru'],
      featured: true,
      status: 'upcoming',
      website: 'https://greenbuildingkenya.org'
    },
    {
      id: '3',
      title: 'Digital Construction Workshop',
      description: 'Hands-on workshop on BIM, 3D modeling, and digital construction technologies.',
      category: 'Workshop',
      date: '2024-02-20',
      time: '10:00 AM',
      endDate: '2024-02-21',
      location: 'University of Nairobi',
      venue: 'School of Engineering',
      price: 1500,
      image: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=800',
      organizer: 'Digital Construction Kenya',
      attendees: 150,
      speakers: ['Eng. David Mutua', 'Arch. Mary Njeri'],
      featured: false,
      status: 'upcoming',
      website: 'https://digitalconstruction.co.ke'
    },
    {
      id: '4',
      title: 'Real Estate Investment Seminar',
      description: 'Learn about property investment opportunities and market trends in Kenya.',
      category: 'Seminar',
      date: '2024-02-10',
      time: '02:00 PM',
      endDate: '2024-02-10',
      location: 'Villa Rosa Kempinski, Nairobi',
      venue: 'Villa Rosa Kempinski Hotel',
      price: 2000,
      image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
      organizer: 'Kenya Property Developers Association',
      attendees: 200,
      speakers: ['Sarah Kimani', 'Peter Mwangi'],
      featured: false,
      status: 'upcoming',
      website: 'https://kpda.or.ke'
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           event.category.toLowerCase() === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || 
                           event.location.toLowerCase().includes(selectedLocation);
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Construction Industry Events
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Discover upcoming conferences, exhibitions, workshops, and networking events in Kenya's construction industry
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
                placeholder="Search events..."
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

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {event.category}
                  </span>
                </div>
                {event.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                )}
                <div className="absolute bottom-4 right-4">
                  <span className="bg-white text-gray-900 px-3 py-2 rounded-lg text-lg font-bold shadow-lg">
                    {formatPrice(event.price)}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
                  {event.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {event.description}
                </p>
                
                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{event.attendees} expected attendees</span>
                  </div>
                </div>

                {/* Speakers */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Key Speakers</h4>
                  <div className="flex flex-wrap gap-1">
                    {event.speakers.slice(0, 2).map((speaker, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                      >
                        {speaker}
                      </span>
                    ))}
                    {event.speakers.length > 2 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        +{event.speakers.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Organizer */}
                <div className="mb-4 text-xs text-gray-500">
                  <span>Organized by: {event.organizer}</span>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                    <Ticket className="h-4 w-4" />
                    <span>Register</span>
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors duration-200">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Calendar className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;