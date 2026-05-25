import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Menu, X, User, LogOut, ChevronDown, Plus, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { user, signOut } = useAuth();

  // Get current date and time
  const getCurrentDateTime = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return now.toLocaleDateString('en-US', options);
  };

  const navigation = [
    { name: 'HOME', href: '/' },
    { name: 'NEWS', href: '/news' },
    { name: 'FEATURES', href: '/features' },
    { name: 'PROJECTS', href: '/projects' },
    {
      name: 'REAL ESTATE',
      href: '/properties',
      submenu: [
        { name: 'Residential Properties', href: '/properties/residential' },
        { name: 'Commercial Properties', href: '/properties/commercial' },
        { name: 'Land & Development', href: '/properties/land' },
        { name: 'Property Investment', href: '/properties/investment' },
        { name: 'Rental Properties', href: '/properties/rental' },
        { name: 'Property Valuation', href: '/properties/valuation' },
      ]
    },
    {
      name: 'PROFESSIONALS',
      href: '/professionals',
      submenu: [
        { name: 'Architects', href: '/professionals/architects' },
        { name: 'Structural Engineers', href: '/professionals/structural-engineers' },
        { name: 'Civil Engineers', href: '/professionals/civil-engineers' },
        { name: 'Quantity Surveyors', href: '/professionals/quantity-surveyors' },
        { name: 'Project Managers', href: '/professionals/project-managers' },
        { name: 'Interior Designers', href: '/professionals/interior-designers' },
        { name: 'Land Surveyors', href: '/professionals/land-surveyors' },
        { name: 'Building Inspectors', href: '/professionals/building-inspectors' },
      ]
    },
    {
      name: 'CONTRACTORS',
      href: '/contractors',
      submenu: [
        { name: 'General Contractors', href: '/contractors/general' },
        { name: 'Electrical Contractors', href: '/contractors/electrical' },
        { name: 'Plumbing Contractors', href: '/contractors/plumbing' },
        { name: 'Roofing Contractors', href: '/contractors/roofing' },
        { name: 'HVAC Contractors', href: '/contractors/hvac' },
        { name: 'Painting Contractors', href: '/contractors/painting' },
        { name: 'Flooring Contractors', href: '/contractors/flooring' },
        { name: 'Landscaping Contractors', href: '/contractors/landscaping' },
      ]
    },
    {
      name: 'MATERIALS & SUPPLIERS',
      href: '/materials',
      submenu: [
        { name: 'Cement & Concrete', href: '/materials/cement' },
        { name: 'Steel & Metal', href: '/materials/steel' },
        { name: 'Roofing Materials', href: '/materials/roofing' },
        { name: 'Doors & Windows', href: '/materials/doors-windows' },
        { name: 'Tiles & Flooring', href: '/materials/tiles' },
        { name: 'Paints & Finishes', href: '/materials/paints' },
        { name: 'Plumbing Supplies', href: '/materials/plumbing' },
        { name: 'Electrical Supplies', href: '/materials/electrical' },
        { name: 'Insulation Materials', href: '/materials/insulation' },
        { name: 'Hardware & Tools', href: '/materials/hardware' },
      ]
    },
    { name: 'EVENTS', href: '/events' },
    { name: 'FLIP COPY', href: '/flip-copy' },
    { name: 'CONTACT', href: '/contact' },
  ];

  const isActive = (href: string) => location.pathname === href;

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDropdownToggle = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{getCurrentDateTime()}</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span>📧 info@nyumba.co.ke</span>
              <span>📞 +254 700 123 456</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-700" />
            <span className="text-2xl font-bold text-gray-900">Nyumba</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <div className="relative">
                    <button
                      className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                        isActive(item.href)
                          ? 'text-blue-700 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                      }`}
                      onMouseEnter={() => setActiveDropdown(item.name)}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <div
                      className="absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                      isActive(item.href)
                        ? 'text-blue-700 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/submit-listing"
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Submit Listing</span>
            </Link>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-700 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-50"
                >
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">{user.firstName}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {user.userType === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/my-listings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Listings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors duration-200"
              >
                Sign In / Register
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-blue-700 hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => handleDropdownToggle(item.name)}
                        className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`h-4 w-4 transform transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} />
                      </button>
                      {activeDropdown === item.name && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`px-3 py-2 text-base font-medium rounded-lg transition-colors duration-200 ${
                        isActive(item.href)
                          ? 'text-blue-700 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link
                  to="/submit-listing"
                  className="mx-3 bg-orange-600 text-white px-4 py-2 rounded-lg text-base font-medium hover:bg-orange-700 transition-colors duration-200 text-center block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  SUBMIT LISTING
                </Link>
                
                {user ? (
                  <>
                    <Link
                      to="/admin"
                      className="px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    className="mx-3 mt-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-base font-medium hover:bg-blue-800 transition-colors duration-200 text-center block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    SIGN IN / REGISTER
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;