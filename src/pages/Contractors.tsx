import React, { useState } from 'react';
import { Search, Filter, MapPin, Mail, Phone, Star, Award, ArrowRight, Calendar, CheckCircle, Users, Wrench, Building } from 'lucide-react';

const Contractors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const contractorTypes = [
    { value: 'all', label: 'All Contractors' },
    { value: 'general', label: 'General Contractors' },
    { value: 'electrical', label: 'Electrical Contractors' },
    { value: 'plumbing', label: 'Plumbing Contractors' },
    { value: 'roofing', label: 'Roofing Contractors' },
    { value: 'hvac', label: 'HVAC Contractors' },
    { value: 'painting', label: 'Painting Contractors' },
    { value: 'flooring', label: 'Flooring Contractors' },
    { value: 'landscaping', label: 'Landscaping Contractors' }
  ];

  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'nairobi', label: 'Nairobi' },
    { value: 'mombasa', label: 'Mombasa' },
    { value: 'kisumu', label: 'Kisumu' },
    { value: 'nakuru', label: 'Nakuru' },
    { value: 'eldoret', label: 'Eldoret' }
  ];

  const contractors = [
    {
      id: '1',
      name: 'James Wilson Construction',
      contactPerson: 'James Wilson',
      contractorType: 'General Contractor',
      company: 'Wilson Construction Group',
      location: 'Nairobi, Kenya',
      experience: 18,
      rating: 4.9,
      reviews: 156,
      services: ['Residential Construction', 'Commercial Buildings', 'Renovations', 'Custom Homes'],
      description: 'Licensed general contractor with extensive experience in residential and commercial projects across Kenya.',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      email: 'james@wilsonconst.co.ke',
      phone: '+254 722 456 789',
      projects: 234,
      licenseNumber: 'GC-2024-001',
      employees: 45,
      joinDate: '2018-03-15',
      insurance: true,
      bond: true
    },
    {
      id: '2',
      name: 'PowerTech Electrical',
      contactPerson: 'Mary Njeri',
      contractorType: 'Electrical Contractor',
      company: 'PowerTech Electrical Solutions',
      location: 'Nairobi, Kenya',
      experience: 12,
      rating: 4.8,
      reviews: 89,
      services: ['Electrical Installation', 'Wiring Systems', 'Solar Power', 'Maintenance'],
      description: 'Certified electrical contractor specializing in residential and commercial electrical systems with solar power expertise.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      email: 'mary@powertechke.co.ke',
      phone: '+254 733 567 890',
      projects: 178,
      licenseNumber: 'EC-2024-045',
      employees: 23,
      joinDate: '2019-07-20',
      insurance: true,
      bond: true
    },
    {
      id: '3',
      name: 'AquaFlow Plumbing',
      contactPerson: 'Peter Kamau',
      contractorType: 'Plumbing Contractor',
      company: 'AquaFlow Plumbing Services',
      location: 'Mombasa, Kenya',
      experience: 15,
      rating: 4.7,
      reviews: 112,
      services: ['Plumbing Installation', 'Water Systems', 'Drainage', 'Pipe Repairs'],
      description: 'Professional plumbing contractor with expertise in water systems, drainage solutions, and emergency repairs.',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      email: 'peter@aquaflowke.co.ke',
      phone: '+254 741 678 901',
      projects: 267,
      licenseNumber: 'PC-2024-023',
      employees: 18,
      joinDate: '2020-01-10',
      insurance: true,
      bond: false
    },
    {
      id: '4',
      name: 'TopRoof Solutions',
      contactPerson: 'Grace Wanjiku',
      contractorType: 'Roofing Contractor',
      company: 'TopRoof Construction Ltd',
      location: 'Nakuru, Kenya',
      experience: 10,
      rating: 4.6,
      reviews: 78,
      services: ['Roof Installation', 'Roof Repairs', 'Waterproofing', 'Gutter Systems'],
      description: 'Specialized roofing contractor offering comprehensive roofing solutions for residential and commercial properties.',
      image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      email: 'grace@toprofke.co.ke',
      phone: '+254 722 789 012',
      projects: 145,
      licenseNumber: 'RC-2024-067',
      employees: 15,
      joinDate: '2021-05-18',
      insurance: true,
      bond: true
    },
    {
      id: '5',
      name: 'ClimateControl HVAC',
      contactPerson: 'David Mutua',
      contractorType: 'HVAC Contractor',
      company: 'ClimateControl Systems',
      location: 'Nairobi, Kenya',
      experience: 14,
      rating: 4.8,
      reviews: 94,
      services: ['HVAC Installation', 'Air Conditioning', 'Ventilation', 'System Maintenance'],
      description: 'Expert HVAC contractor providing climate control solutions for commercial and residential buildings.',
      image: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      email: 'david@climatecontrolke.co.ke',
      phone: '+254 733 890 123',
      projects: 189,
      licenseNumber: 'HC-2024-034',
      employees: 28,
      joinDate: '2019-11-25',
      insurance: true,
      bond: true
    },
    {
      id: '6',
      name: 'ColorCraft Painters',
      contactPerson: 'Sarah Mwangi',
      contractorType: 'Painting Contractor',
      company: 'ColorCraft Painting Services',
      location: 'Kisumu, Kenya',
      experience: 8,
      rating: 4.5,
      reviews: 67,
      services: ['Interior Painting', 'Exterior Painting', 'Decorative Finishes', 'Surface Preparation'],
      description: 'Professional painting contractor specializing in high-quality interior and exterior painting services.',
      image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      email: 'sarah@colorcraftke.co.ke',
      phone: '+254 711 901 234',
      projects: 123,
      licenseNumber: 'PT-2024-089',
      employees: 12,
      joinDate: '2022-02-14',
      insurance: true,
      bond: false
    }
  ];

  const filteredContractors = contractors.filter(contractor => {
    const matchesSearch = contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contractor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contractor.services.some(service => 
                           service.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesType = selectedType === 'all' || 
                       contractor.contractorType.toLowerCase().replace(' ', '_').includes(selectedType);
    const matchesLocation = selectedLocation === 'all' || 
                           contractor.location.toLowerCase().includes(selectedLocation);
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contractors Directory
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Find licensed and verified contractors for all your construction and renovation needs
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
                placeholder="Search contractors..."
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
              {contractorTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
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

      {/* Contractors Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredContractors.map((contractor) => (
            <div
              key={contractor.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <img
                      src={contractor.image}
                      alt={contractor.contactPerson}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {contractor.verified && (
                      <div className="absolute -top-1 -right-1 bg-green-600 rounded-full p-1">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                      {contractor.name}
                    </h3>
                    <p className="text-orange-600 font-medium">{contractor.contractorType}</p>
                    <p className="text-gray-600 text-sm">{contractor.contactPerson}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{contractor.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{contractor.rating}</span>
                      <span className="text-sm text-gray-500">({contractor.reviews} reviews)</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {contractor.experience} years exp.
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {contractor.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{contractor.projects}</div>
                    <div className="text-xs text-gray-600">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{contractor.employees}</div>
                    <div className="text-xs text-gray-600">Employees</div>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {contractor.services.slice(0, 3).map((service, index) => (
                      <span
                        key={index}
                        className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {service}
                      </span>
                    ))}
                    {contractor.services.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        +{contractor.services.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* License & Credentials */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">License: {contractor.licenseNumber}</span>
                    <div className="flex space-x-2">
                      {contractor.insurance && (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Insured</span>
                      )}
                      {contractor.bond && (
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Bonded</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Member since {new Date(contractor.joinDate).toLocaleDateString()}</span>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
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

        {filteredContractors.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Wrench className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No contractors found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contractors;