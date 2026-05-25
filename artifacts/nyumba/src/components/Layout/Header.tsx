import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Menu, X, User, LogOut, ChevronDown, Plus, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const [dateStr, setDateStr] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setDateStr(now.toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    };
    update();
    const t = setInterval(update, 60000);
    return () => clearInterval(t);
  }, []);

  const navigation = [
    { name: 'HOME', href: '/' },
    { name: 'NEWS', href: '/news' },
    { name: 'FEATURES', href: '/features' },
    { name: 'PROJECTS', href: '/projects' },
    {
      name: 'REAL ESTATE',
      href: '/properties',
      submenu: [
        { name: 'All Properties', href: '/properties' },
        { name: 'Residential', href: '/properties/residential' },
        { name: 'Commercial', href: '/properties/commercial' },
        { name: 'Land & Development', href: '/properties/land' },
        { name: 'Rental Properties', href: '/properties/rental' },
        { name: 'Investment', href: '/properties/investment' },
      ]
    },
    {
      name: 'PROFESSIONALS',
      href: '/professionals',
      submenu: [
        { name: 'All Professionals', href: '/professionals' },
        { name: 'Architects', href: '/professionals/architects' },
        { name: 'Structural Engineers', href: '/professionals/structural-engineers' },
        { name: 'Civil Engineers', href: '/professionals/civil-engineers' },
        { name: 'Quantity Surveyors', href: '/professionals/quantity-surveyors' },
        { name: 'Project Managers', href: '/professionals/project-managers' },
        { name: 'Interior Designers', href: '/professionals/interior-designers' },
        { name: 'Land Surveyors', href: '/professionals/land-surveyors' },
      ]
    },
    {
      name: 'CONTRACTORS',
      href: '/contractors',
      submenu: [
        { name: 'All Contractors', href: '/contractors' },
        { name: 'General Contractors', href: '/contractors/general' },
        { name: 'Electrical', href: '/contractors/electrical' },
        { name: 'Plumbing', href: '/contractors/plumbing' },
        { name: 'Roofing', href: '/contractors/roofing' },
        { name: 'HVAC', href: '/contractors/hvac' },
        { name: 'Painting', href: '/contractors/painting' },
      ]
    },
    {
      name: 'MATERIALS',
      href: '/materials',
      submenu: [
        { name: 'All Materials', href: '/materials' },
        { name: 'Cement & Concrete', href: '/materials/cement' },
        { name: 'Steel & Metal', href: '/materials/steel' },
        { name: 'Roofing Materials', href: '/materials/roofing' },
        { name: 'Doors & Windows', href: '/materials/doors-windows' },
        { name: 'Tiles & Flooring', href: '/materials/tiles' },
        { name: 'Paints & Finishes', href: '/materials/paints' },
        { name: 'Electrical Supplies', href: '/materials/electrical' },
        { name: 'Hardware & Tools', href: '/materials/hardware' },
      ]
    },
    { name: 'EVENTS', href: '/events' },
    { name: 'ARTICLES', href: '/articles' },
    { name: 'CONTACT', href: '/contact' },
  ];

  const isActive = (href: string) => location.pathname === href || (href !== '/' && location.pathname.startsWith(href));

  const handleSignOut = async () => {
    try { await signOut(); setIsUserMenuOpen(false); }
    catch (e) { console.error(e); }
  };

  const openDropdown = (name: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setActiveDropdown(name);
  };

  const closeDropdown = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-blue-800 text-white py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              <span>{dateStr}</span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <span>✉ info@nyumba.co.ke</span>
              <span>☎ +254 700 123 456</span>
            </div>
          </div>
        </div>
      </div>

      {/* Logo + Action Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <Building2 className="h-7 w-7 text-blue-700" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">Nyumba</span>
            <span className="hidden sm:block text-xs text-gray-500 font-normal border-l border-gray-300 pl-2 ml-1">Magazine</span>
          </Link>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/submit-listing"
              className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <Plus className="h-3.5 w-3.5" />
              Submit Listing
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-1.5 text-gray-700 hover:text-blue-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 text-xs font-medium transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>{user.firstName}</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    {user.userType === 'admin' && (
                      <Link to="/admin" className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100" onClick={() => setIsUserMenuOpen(false)}>
                        Admin Dashboard
                      </Link>
                    )}
                    <Link to="/profile" className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100" onClick={() => setIsUserMenuOpen(false)}>
                      My Profile
                    </Link>
                    <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                      <LogOut className="h-3.5 w-3.5" />Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth" className="bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-800 transition-colors">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Navigation Row */}
      <div className="hidden lg:block border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && openDropdown(item.name)}
                onMouseLeave={() => item.submenu && closeDropdown()}
              >
                {item.submenu ? (
                  <>
                    <Link
                      to={item.href}
                      className={`flex items-center gap-0.5 px-2.5 py-2.5 text-xs font-semibold tracking-wide transition-colors whitespace-nowrap border-b-2 ${
                        isActive(item.href)
                          ? 'text-blue-700 border-blue-700'
                          : 'text-gray-600 border-transparent hover:text-blue-700 hover:border-blue-400'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className="h-3 w-3 mt-px" />
                    </Link>
                    {activeDropdown === item.name && (
                      <div
                        className="absolute left-0 top-full mt-0 w-52 bg-white rounded-b-lg shadow-xl border border-gray-200 py-1 z-50"
                        onMouseEnter={() => openDropdown(item.name)}
                        onMouseLeave={() => closeDropdown()}
                      >
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            className="block px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className={`flex items-center px-2.5 py-2.5 text-xs font-semibold tracking-wide transition-colors whitespace-nowrap border-b-2 ${
                      isActive(item.href)
                        ? 'text-blue-700 border-blue-700'
                        : 'text-gray-600 border-transparent hover:text-blue-700 hover:border-blue-400'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col py-2">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="bg-gray-50 border-t border-gray-100">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            className="block pl-8 pr-4 py-2 text-sm text-gray-600 hover:text-blue-700 hover:bg-blue-50"
                            onClick={() => { setIsMenuOpen(false); setActiveDropdown(null); }}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`block px-4 py-2.5 text-sm font-semibold ${isActive(item.href) ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-700'}`}
                    onClick={() => { setIsMenuOpen(false); setActiveDropdown(null); }}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-2 pt-3 border-t border-gray-200 px-4 flex flex-col gap-2">
              <Link to="/submit-listing" className="bg-orange-600 text-white text-center py-2 rounded-lg text-sm font-semibold" onClick={() => setIsMenuOpen(false)}>
                Submit Listing
              </Link>
              {user ? (
                <>
                  {user.userType === 'admin' && (
                    <Link to="/admin" className="text-center py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                      Admin Dashboard
                    </Link>
                  )}
                  <button onClick={() => { handleSignOut(); setIsMenuOpen(false); }} className="text-center py-2 rounded-lg text-sm font-semibold text-red-600 bg-red-50">
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/auth" className="bg-blue-700 text-white text-center py-2 rounded-lg text-sm font-semibold" onClick={() => setIsMenuOpen(false)}>
                  Sign In / Register
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
