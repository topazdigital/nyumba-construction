import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Nyumba</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Kenya's premier construction industry magazine and professional networking platform. 
              Connecting builders, architects, and property professionals across East Africa.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/articles" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Latest Articles
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Property Listings
                </Link>
              </li>
              <li>
                <Link to="/professionals" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Find Professionals
                </Link>
              </li>
              <li>
                <Link to="/contractors" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contractors Directory
                </Link>
              </li>
              <li>
                <Link to="/materials" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Materials & Suppliers
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Popular Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/articles?category=architecture" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Architecture & Design
                </Link>
              </li>
              <li>
                <Link to="/articles?category=construction" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Construction Technology
                </Link>
              </li>
              <li>
                <Link to="/articles?category=sustainability" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Sustainable Building
                </Link>
              </li>
              <li>
                <Link to="/articles?category=policy" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Policy & Regulations
                </Link>
              </li>
              <li>
                <Link to="/articles?category=market" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Market Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Westlands, Nairobi, Kenya
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+254 700 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@nyumba.co.ke</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Nyumba Magazine. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Contact
              </Link>
              <Link to="/advertise" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Advertise
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;