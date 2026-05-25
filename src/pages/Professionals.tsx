import React, { useState } from 'react';
import { Search, Filter, MapPin, Mail, Phone, Star, Award, ArrowRight, Calendar, CheckCircle, Users } from 'lucide-react';

const Professionals: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const professions = [
    { value: 'all', label: 'All Professions' },
    { value: 'architect', label: 'Architects' },
    { value: 'structural_engineer', label: 'Structural Engineers' },
    { value: 'civil_engineer', label: 'Civil Engineers' },
    { value: 'quantity_surveyor', label: 'Quantity Surveyors' },
    { value: 'project_manager', label: 'Project Managers' },
    { value: 'interior_designer', label: 'Interior Designers' },
    { value: 'land_surveyor', label: 'Land Surveyors' },
    { value: 'building_inspector', label: 'Building Inspectors' }
  ];

  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'nairobi', label: 'Nairobi' },
    { value: 'mombasa', label: 'Mombasa' },
    { value: 'kisumu', label: 'Kisumu' },
    { value: 'nakuru', label: 'Nakuru' },
    { value: 'eldoret', label: 'Eldoret' }
  ];

  const professionals = [
    {
      id: '1',
      name: 'Dr. Sarah Mwangi',
      profession: 'Architect',
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
      hourlyRate: 5000
    },
    {
      id: '2',
      name: 'Eng. Michael Ochieng',
      profession: 'Structural Engineer',
      company: 'Ochieng Structural Consultants',
      location: 'Nairobi, Kenya',
      experience: 12,
      rating: 4.8,
      reviews: 94,
      specialties: ['High-rise Buildings', 'Bridge Design', 'Seismic Analysis', 'Steel Structures'],
      description: 'Experienced structural engineer with expertise in high-rise buildings and complex infrastructure projects across East Africa.',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      email: 'michael@ochiengstructural.co.ke',
      phone: '+254 733 234 567',
      projects: 156,
      certifications: ['PE License', 'IStructE', 'EBK Registration'],
      joinDate: '2019-03-20',
      hourlyRate: 4500
    },
    {
      id: '3',
      name: 'Grace Wanjiku',
      profession: 'Quantity Surveyor',
      company: 'Wanjiku Cost Consultancy',
      location: 'Nairobi, Kenya',
      experience: 10,
      rating: 4.7,
      reviews: 78,
      specialties: ['Cost Estimation', 'Contract Management', 'Risk Assessment', 'Value Engineering'],
      description: 'Professional quantity surveyor helping clients optimize construction costs and budgets with accurate estimates and contract management.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      email: 'grace@wanjikuqs.co.ke',
      phone: '+254 711 345 678',
      projects: 203,
      certifications: ['RICS', 'IQSK', 'CIOB'],
      joinDate: '2021-06-10',
      hourlyRate: 3500
    },
    {
      id: '4',
      name: 'Eng. James Mutua',
      profession: 'Civil Engineer',
      company: 'Mutua Infrastructure Solutions',
      location: 'Mombasa, Kenya',
      experience: 18,
      rating: 4.9,
      reviews: 142,
      specialties: ['Road Construction', 'Water Systems', 'Drainage', 'Site Development'],
      description: 'Senior civil engineer with extensive experience in infrastructure development, road construction, and water management systems.',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      email: 'james@mutuainfra.co.ke',
      phone: '+254 741 456 789',
      projects: 267,
      certifications: ['PE License', 'EBK Registration', 'PMP'],
      joinDate: '2018-09-05',
      hourlyRate: 4000
    },
    {
      id: '5',
      name: 'Maria Santos',
      profession: 'Project Manager',
      company: 'Santos Project Solutions',
      location: 'Nairobi, Kenya',
      experience: 14,
      rating: 4.8,
      reviews: 89,
      specialties: ['Construction Management', 'Schedule Optimization', 'Quality Control', 'Team Leadership'],
      description: 'Certified project manager ensuring timely and quality completion of construction projects with proven track record in large-scale developments.',
      image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      email: 'maria@santospm.co.ke',
      phone: '+254 722 567 890',
      projects: 134,
      certifications: ['PMP', 'PRINCE2', 'CIPM'],
      joinDate: '2020-11-12',
      hourlyRate: 4200
    },
    {
      id: '6',
      name: 'David Kimani',
      profession: 'Interior Designer',
      company: 'Kimani Design Studio',
      location: 'Nairobi, Kenya',
      experience: 8,
      rating: 4.6,
      reviews: 56,
      specialties: ['Residential Interiors', 'Office Design', 'Space Planning', 'Furniture Selection'],
      description: 'Creative interior designer transforming spaces with innovative design solutions and attention to detail.',
      image: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      email: 'david@kimanidesign.co.ke',
      phone: '+254 733 678 901',
      projects: 78,
      certifications: ['IIDA', 'NCIDQ', 'ASID'],
      joinDate: '2022-02-28',
      hourlyRate: 3000
    }
  ];

  const filteredProfessionals = professionals.filter(professional => {
    const matchesSearch = professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professional.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professional.specialties.some(specialty => 
                           specialty.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesProfession = selectedProfession === 'all' || 
                             professional.profession.toLowerCase().replace(' ', '_') === selectedProfession;
    const matchesLocation = selectedLocation === 'all' || 
                           professional.location.toLowerCase().includes(selectedLocation);
    return matchesSearch && matchesProfession && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Professional Directory
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Connect with verified construction industry professionals across Kenya for your projects
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
                placeholder="Search professionals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {professions.map(profession => (
                <option key={profession.value} value={profession.value}>
                  {profession.label}
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

      {/* Professionals Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProfessionals.map((professional) => (
            <div
              key={professional.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <img
                      src={professional.image}
                      alt={professional.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {professional.verified && (
                      <div className="absolute -top-1 -right-1 bg-blue-700 rounded-full p-1">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                      {professional.name}
                    </h3>
                    <p className="text-blue-700 font-medium">{professional.profession}</p>
                    <p className="text-gray-600 text-sm">{professional.company}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{professional.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{professional.rating}</span>
                      <span className="text-sm text-gray-500">({professional.reviews} reviews)</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {professional.experience} years exp.
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {professional.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{professional.projects}</div>
                    <div className="text-xs text-gray-600">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">KSh {professional.hourlyRate.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Per Hour</div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {professional.specialties.slice(0, 3).map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                    {professional.specialties.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        +{professional.specialties.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Certifications</h4>
                  <div className="flex flex-wrap gap-1">
                    {professional.certifications.slice(0, 2).map((cert, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs"
                      >
                        {cert}
                      </span>
                    ))}
                    {professional.certifications.length > 2 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        +{professional.certifications.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Member since {new Date(professional.joinDate).toLocaleDateString()}</span>
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

        {filteredProfessionals.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Users className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No professionals found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Professionals;