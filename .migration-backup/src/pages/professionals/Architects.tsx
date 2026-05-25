import React, { useState } from 'react';
import { Search, Filter, MapPin, Mail, Phone, Star, Award, ArrowRight, Calendar, CheckCircle, Users, Building, Briefcase } from 'lucide-react';

const Architects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'nairobi', label: 'Nairobi' },
    { value: 'mombasa', label: 'Mombasa' },
    { value: 'kisumu', label: 'Kisumu' },
    { value: 'nakuru', label: 'Nakuru' },
    { value: 'eldoret', label: 'Eldoret' }
  ];

  const specialties = [
    { value: 'all', label: 'All Specialties' },
    { value: 'residential', label: 'Residential Architecture' },
    { value: 'commercial', label: 'Commercial Buildings' },
    { value: 'sustainable', label: 'Sustainable Design' },
    { value: 'urban_planning', label: 'Urban Planning' },
    { value: 'interior', label: 'Interior Architecture' },
    { value: 'landscape', label: 'Landscape Architecture' }
  ];

  const architects = [
    {
      id: '1',
      name: 'Dr. Sarah Mwangi',
      company: 'Mwangi & Associates Architecture',
      location: 'Nairobi, Kenya',
      experience: 15,
      rating: 4.9,
      reviews: 127,
      specialties: ['Sustainable Design', 'Commercial Buildings', 'Green Architecture', 'Urban Planning'],
      description: 'Award-winning architect specializing in sustainable and eco-friendly building designs with over 15 years of experience in commercial and residential projects.',
      image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      email: 'sarah@mwangiarch.co.ke',
      phone: '+254 722 123 456',
      projects: 89,
      certifications: ['LEED AP', 'RIBA', 'Board of Registration'],
      joinDate: '2020-01-15',
      hourlyRate: 5000,
      portfolio: [
        'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=300'
      ],
      awards: ['Kenya Architecture Award 2023', 'Green Building Excellence 2022'],
      education: 'PhD Architecture, University of Nairobi'
    },
    {
      id: '2',
      name: 'Arch. David Kimani',
      company: 'Kimani Design Studio',
      location: 'Nairobi, Kenya',
      experience: 12,
      rating: 4.8,
      reviews: 94,
      specialties: ['Residential Architecture', 'Modern Design', 'Space Planning', 'Custom Homes'],
      description: 'Creative architect with a passion for modern residential design and innovative space planning solutions.',
      image: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      email: 'david@kimanidesign.co.ke',
      phone: '+254 733 234 567',
      projects: 156,
      certifications: ['RIBA', 'AAK', 'LEED Green Associate'],
      joinDate: '2019-03-20',
      hourlyRate: 4500,
      portfolio: [
        'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=300'
      ],
      awards: ['Best Residential Design 2023'],
      education: 'Master of Architecture, JKUAT'
    },
    {
      id: '3',
      name: 'Arch. Grace Wanjiku',
      company: 'Wanjiku Architectural Consultants',
      location: 'Mombasa, Kenya',
      experience: 18,
      rating: 4.9,
      reviews: 156,
      specialties: ['Commercial Buildings', 'Hospitality Design', 'Coastal Architecture', 'Resort Planning'],
      description: 'Experienced architect specializing in commercial and hospitality projects along the Kenyan coast.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      email: 'grace@wanjikuarch.co.ke',
      phone: '+254 711 345 678',
      projects: 203,
      certifications: ['RIBA', 'AAK', 'Hospitality Design Specialist'],
      joinDate: '2018-06-10',
      hourlyRate: 5500,
      portfolio: [
        'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300'
      ],
      awards: ['Coastal Architecture Excellence 2022', 'Tourism Design Award 2021'],
      education: 'Bachelor of Architecture, University of Nairobi'
    }
  ];

  const filteredArchitects = architects.filter(architect => {
    const matchesSearch = architect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         architect.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         architect.specialties.some(specialty => 
                           specialty.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesLocation = selectedLocation === 'all' || 
                           architect.location.toLowerCase().includes(selectedLocation);
    const matchesSpecialty = selectedSpecialty === 'all' ||
                            architect.specialties.some(specialty =>
                              specialty.toLowerCase().includes(selectedSpecialty.replace('_', ' '))
                            );
    return matchesSearch && matchesLocation && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-3 mb-4">
            <Building className="h-8 w-8 text-blue-700" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Architects Directory
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl">
            Connect with certified architects specializing in residential, commercial, and sustainable design across Kenya
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
                placeholder="Search architects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
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
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {specialties.map(specialty => (
                <option key={specialty.value} value={specialty.value}>
                  {specialty.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Architects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredArchitects.map((architect) => (
            <div
              key={architect.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <img
                      src={architect.image}
                      alt={architect.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {architect.verified && (
                      <div className="absolute -top-1 -right-1 bg-blue-700 rounded-full p-1">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                      {architect.name}
                    </h3>
                    <p className="text-blue-700 font-medium">Architect</p>
                    <p className="text-gray-600 text-sm">{architect.company}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{architect.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{architect.rating}</span>
                      <span className="text-sm text-gray-500">({architect.reviews} reviews)</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {architect.experience} years exp.
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {architect.description}
                </p>

                {/* Portfolio Preview */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Projects</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {architect.portfolio.slice(0, 3).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Project ${index + 1}`}
                        className="w-full h-16 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{architect.projects}</div>
                    <div className="text-xs text-gray-600">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">KSh {architect.hourlyRate.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Per Hour</div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {architect.specialties.slice(0, 3).map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                    {architect.specialties.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        +{architect.specialties.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Awards */}
                {architect.awards && architect.awards.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center space-x-1 mb-2">
                      <Award className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium text-gray-900">Awards</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      {architect.awards[0]}
                      {architect.awards.length > 1 && ` +${architect.awards.length - 1} more`}
                    </div>
                  </div>
                )}

                {/* Education */}
                <div className="mb-4">
                  <div className="flex items-center space-x-1 mb-1">
                    <Briefcase className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">Education</span>
                  </div>
                  <p className="text-xs text-gray-600">{architect.education}</p>
                </div>

                {/* Certifications */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Certifications</h4>
                  <div className="flex flex-wrap gap-1">
                    {architect.certifications.slice(0, 2).map((cert, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs"
                      >
                        {cert}
                      </span>
                    ))}
                    {architect.certifications.length > 2 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        +{architect.certifications.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Member since {new Date(architect.joinDate).toLocaleDateString()}</span>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
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

        {filteredArchitects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Building className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No architects found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Architects;