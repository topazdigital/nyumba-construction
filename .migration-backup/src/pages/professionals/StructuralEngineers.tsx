import React, { useState } from 'react';
import { Search, Filter, MapPin, Mail, Phone, Star, Award, ArrowRight, Calendar, CheckCircle, Users, Wrench, Calculator } from 'lucide-react';

const StructuralEngineers: React.FC = () => {
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
    { value: 'high_rise', label: 'High-rise Buildings' },
    { value: 'bridge_design', label: 'Bridge Design' },
    { value: 'seismic', label: 'Seismic Analysis' },
    { value: 'steel_structures', label: 'Steel Structures' },
    { value: 'concrete', label: 'Concrete Structures' },
    { value: 'industrial', label: 'Industrial Buildings' }
  ];

  const engineers = [
    {
      id: '1',
      name: 'Eng. Michael Ochieng',
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
      hourlyRate: 4500,
      portfolio: [
        'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=300'
      ],
      awards: ['Structural Excellence Award 2023', 'Innovation in Engineering 2022'],
      education: 'MSc Structural Engineering, University of Nairobi',
      software: ['SAP2000', 'ETABS', 'SAFE', 'AutoCAD', 'Revit']
    },
    {
      id: '2',
      name: 'Eng. Patricia Wanjiru',
      company: 'Wanjiru Engineering Solutions',
      location: 'Nairobi, Kenya',
      experience: 16,
      rating: 4.9,
      reviews: 128,
      specialties: ['Concrete Structures', 'Industrial Buildings', 'Foundation Design', 'Retrofitting'],
      description: 'Senior structural engineer specializing in concrete structures and industrial facilities with extensive experience in foundation design.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      email: 'patricia@wanjirueng.co.ke',
      phone: '+254 722 345 678',
      projects: 189,
      certifications: ['PE License', 'IStructE', 'Concrete Institute Certification'],
      joinDate: '2018-07-15',
      hourlyRate: 5000,
      portfolio: [
        'https://images.pexels.com/photos/1216564/pexels-photo-1216564.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300'
      ],
      awards: ['Women in Engineering Excellence 2023', 'Concrete Design Innovation 2021'],
      education: 'PhD Structural Engineering, JKUAT',
      software: ['ETABS', 'SAFE', 'STAAD Pro', 'Tekla Structures', 'AutoCAD']
    },
    {
      id: '3',
      name: 'Eng. James Kiprotich',
      company: 'Kiprotich Bridge & Infrastructure',
      location: 'Eldoret, Kenya',
      experience: 20,
      rating: 4.9,
      reviews: 167,
      specialties: ['Bridge Design', 'Infrastructure', 'Highway Structures', 'Precast Concrete'],
      description: 'Highly experienced structural engineer specializing in bridge design and major infrastructure projects across Kenya.',
      image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      email: 'james@kiproticheng.co.ke',
      phone: '+254 711 456 789',
      projects: 234,
      certifications: ['PE License', 'Bridge Design Specialist', 'IStructE Fellow'],
      joinDate: '2017-11-10',
      hourlyRate: 5500,
      portfolio: [
        'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300'
      ],
      awards: ['Bridge Engineering Excellence 2022', 'Infrastructure Innovation Award 2020'],
      education: 'MSc Bridge Engineering, University of Cape Town',
      software: ['Midas Civil', 'CSiBridge', 'LUSAS', 'AutoCAD', 'MicroStation']
    }
  ];

  const filteredEngineers = engineers.filter(engineer => {
    const matchesSearch = engineer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         engineer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         engineer.specialties.some(specialty => 
                           specialty.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesLocation = selectedLocation === 'all' || 
                           engineer.location.toLowerCase().includes(selectedLocation);
    const matchesSpecialty = selectedSpecialty === 'all' ||
                            engineer.specialties.some(specialty =>
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
            <Calculator className="h-8 w-8 text-green-700" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Structural Engineers Directory
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl">
            Connect with licensed structural engineers specializing in buildings, bridges, and infrastructure design across Kenya
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
                placeholder="Search structural engineers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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

      {/* Engineers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredEngineers.map((engineer) => (
            <div
              key={engineer.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <img
                      src={engineer.image}
                      alt={engineer.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {engineer.verified && (
                      <div className="absolute -top-1 -right-1 bg-green-700 rounded-full p-1">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-200">
                      {engineer.name}
                    </h3>
                    <p className="text-green-700 font-medium">Structural Engineer</p>
                    <p className="text-gray-600 text-sm">{engineer.company}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{engineer.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{engineer.rating}</span>
                      <span className="text-sm text-gray-500">({engineer.reviews} reviews)</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {engineer.experience} years exp.
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {engineer.description}
                </p>

                {/* Portfolio Preview */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Projects</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {engineer.portfolio.slice(0, 3).map((image, index) => (
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
                    <div className="text-lg font-bold text-gray-900">{engineer.projects}</div>
                    <div className="text-xs text-gray-600">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">KSh {engineer.hourlyRate.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Per Hour</div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {engineer.specialties.slice(0, 3).map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                    {engineer.specialties.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        +{engineer.specialties.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Software */}
                <div className="mb-4">
                  <div className="flex items-center space-x-1 mb-2">
                    <Wrench className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">Software</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {engineer.software.slice(0, 3).map((software, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                      >
                        {software}
                      </span>
                    ))}
                    {engineer.software.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        +{engineer.software.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Awards */}
                {engineer.awards && engineer.awards.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center space-x-1 mb-2">
                      <Award className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium text-gray-900">Awards</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      {engineer.awards[0]}
                      {engineer.awards.length > 1 && ` +${engineer.awards.length - 1} more`}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Certifications</h4>
                  <div className="flex flex-wrap gap-1">
                    {engineer.certifications.slice(0, 2).map((cert, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs"
                      >
                        {cert}
                      </span>
                    ))}
                    {engineer.certifications.length > 2 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        +{engineer.certifications.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Member since {new Date(engineer.joinDate).toLocaleDateString()}</span>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
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

        {filteredEngineers.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Calculator className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No structural engineers found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StructuralEngineers;