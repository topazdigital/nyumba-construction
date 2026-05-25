import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Send } from 'lucide-react';
import { API_BASE } from '../../lib/api';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubStatus('loading');
    try {
      const res = await fetch(`${API_BASE}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) { setSubStatus('done'); setEmail(''); }
      else setSubStatus('error');
    } catch { setSubStatus('error'); }
    setTimeout(() => setSubStatus('idle'), 4000);
  };

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
              <a href="https://facebook.com/nyumbamagazine" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/nyumba_mag" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/nyumba" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/nyumba_magazine" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-sm font-medium text-gray-300 mb-2">Subscribe to our newsletter</p>
              {subStatus === 'done' ? (
                <p className="text-green-400 text-sm">✓ Subscribed! Thank you.</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="flex-1 min-w-0 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button type="submit" disabled={subStatus === 'loading'}
                    className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg disabled:opacity-50 transition-colors">
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
              {subStatus === 'error' && <p className="text-red-400 text-xs mt-1">Failed — please try again.</p>}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: '/articles', label: 'Latest Articles' },
                { to: '/properties', label: 'Property Listings' },
                { to: '/professionals', label: 'Find Professionals' },
                { to: '/contractors', label: 'Contractors Directory' },
                { to: '/materials', label: 'Materials & Suppliers' },
                { to: '/events', label: 'Events' },
                { to: '/submit-listing', label: 'Submit a Listing' },
                { to: '/contact', label: 'Contact Us' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Popular Categories</h3>
            <ul className="space-y-2">
              {[
                { to: '/articles', label: 'Architecture & Design' },
                { to: '/articles', label: 'Construction Technology' },
                { to: '/articles', label: 'Sustainable Building' },
                { to: '/articles', label: 'Policy & Regulations' },
                { to: '/articles', label: 'Market Insights' },
                { to: '/flip-copy', label: 'Magazine Issues' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Westlands, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a href="tel:+254700123456" className="text-gray-300 hover:text-white text-sm">+254 700 123 456</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a href="mailto:info@nyumba.co.ke" className="text-gray-300 hover:text-white text-sm">info@nyumba.co.ke</a>
              </div>
            </div>
            <div className="pt-2">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors font-medium">
                <Mail className="h-4 w-4" />Send us a Message
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Nyumba Magazine. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Contact</Link>
              <Link to="/submit-listing" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Advertise</Link>
              <Link to="/admin" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Admin</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
