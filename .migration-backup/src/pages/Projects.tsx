import React, { useState } from 'react';
import { Search, Filter, MapPin, Calendar, DollarSign, Users, ArrowRight, Building, Award, Clock } from 'lucide-react';

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'institutional', label: 'Institutional' },
    { value: 'mixed_use', label: 'Mixed Use' }
  ];

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'planning', label: 'Planning' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' },
    { value: 'on_hold', label: 'On Hold' }
  ];

  const projects = [
    {
      id: '1',
      title: 'Nairobi Metropolitan Area Transport Master Plan',
      description: 'Comprehensive transport infrastructure development including BRT systems, expressways, and integrated transport hubs across Nairobi metropolitan area.',
      category: 'Infrastructure',
      status: 'Ongoing',
      budget: 250000000000,
      location: 'Nairobi Metropolitan Area',
      startDate: '2023-01-15',
      completionDate: '2027-12-31',
      progress: 35,
      client: 'Kenya National Highways Authority',
      contractor: 'China Road and Bridge Corporation',
      architect: 'Nairobi Urban Planning Consortium',
      image: 'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      awards: ['Best Infrastructure Project 2024'],
      employees: 2500
    },
    {
      id: '2',
      title: 'Two Rivers Mall Expansion Phase II',
      description: 'Major commercial expansion adding 50,000 sqm of retail space, entertainment complex, and premium office towers to Kenya\'s largest shopping destination.',
      category: 'Commercial',
      status: 'Ongoing',
      budget: 15000000000,
      location: 'Runda, Nairobi',
      startDate: '2023-06-01',
      completionDate: '2025-08-30',
      progress: 60,
      client: 'Centum Investment Company',
      contractor: 'China Wu Yi Company',
      architect: 'Triad Architects',
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      awards: [],
      employees: 800
    },
    {
      id: '3',
      title: 'Affordable Housing Project - Kibera',
      description: 'Transformative affordable housing development providing 5,000 modern housing units with integrated community facilities and green spaces.',
      category: 'Residential',
      status: 'Ongoing',
      budget: 8500000000,
      location: 'Kibera, Nairobi',
      startDate: '2023-03-20',
      completionDate: '2026-03-20',
      progress: 45,
      client: 'Ministry of Housing and Urban Development',
      contractor: 'Erdemann Property Limited',
      architect: 'Studio FH Architects',
      image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      awards: ['Social Impact Award 2023'],
      employees: 1200
    },
    {
      id: '4',
      title: 'Mombasa Port Expansion Project',
      description: 'Major port infrastructure expansion including new container terminals, cargo handling facilities, and supporting transport infrastructure.',
      category: 'Infrastructure',
      status: 'Ongoing',
      budget: 45000000000,
      location: 'Mombasa',
      startDate: '2022-09-01',
      completionDate: '2025-12-31',
      progress: 70,
      client: 'Kenya Ports Authority',
      contractor: 'China Communications Construction Company',
      architect: 'Royal HaskoningDHV',
      image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      awards: [],
      employees: 1800
    },
    {
      id: '5',
      title: 'University of Nairobi Medical Complex',
      description: 'State-of-the-art medical facility with research laboratories, teaching hospitals, and specialized treatment centers.',
      category: 'Institutional',
      status: 'Planning',
      budget: 12000000000,
      location: 'Nairobi',
      startDate: '2024-06-01',
      completionDate: '2027-05-30',
      progress: 10,
      client: 'University of Nairobi',
      contractor: 'TBD',
      architect: 'MASS Design Group',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      awards: [],
      employees: 0
    },
    {
      id: '6',
      title: 'Konza Technopolis Data Center',
      description: 'Ultra-modern data center facility supporting Kenya\'s digital transformation with cutting-edge technology infrastructure.',
      category: 'Industrial',
      status: 'Completed',
      budget: 6500000000,
      location: 'Konza City',
      startDate: '2022-01-15',
      completionDate: '2023-12-15',
      progress: 100,
      client: 'Konza Technopolis Development Authority',
      contractor: 'Huawei Technologies',
      architect: 'Gensler',
      image: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      awards: ['Technology Infrastructure Excellence 2024'],
      employees: 450
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           project.category.toLowerCase().replace(' ', '_') === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || 
                         project.status.toLowerCase().replace(' ', '_') === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const formatBudget = (budget: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(budget);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'on hold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Major Construction Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Explore Kenya's most significant construction and infrastructure projects shaping the nation's future
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
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  {project.featured && (
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  )}
                </div>
                {project.status === 'Ongoing' && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black bg-opacity-60 text-white p-2 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Progress</span>
                        <span className="text-sm font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors duration-200">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                {/* Project Details */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span className="font-medium">{formatBudget(project.budget)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(project.startDate).getFullYear()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{project.employees} employees</span>
                  </div>
                </div>

                {/* Key Players */}
                <div className="mb-4 text-xs text-gray-600 space-y-1">
                  <div><span className="font-medium">Client:</span> {project.client}</div>
                  <div><span className="font-medium">Contractor:</span> {project.contractor}</div>
                  <div><span className="font-medium">Architect:</span> {project.architect}</div>
                </div>

                {/* Awards */}
                {project.awards.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center space-x-1 mb-2">
                      <Award className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium text-gray-900">Awards</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.awards.map((award, index) => (
                        <span
                          key={index}
                          className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs"
                        >
                          {award}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timeline */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-600">Start:</span>
                      <span className="font-medium ml-1">{new Date(project.startDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Completion:</span>
                      <span className="font-medium ml-1">{new Date(project.completionDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Building className="h-4 w-4" />
                  <span>View Project Details</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Building className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No projects found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;