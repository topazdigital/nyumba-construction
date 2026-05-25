import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, MapPin, DollarSign, Home, Building, User, Phone, Mail, Camera, Plus, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SubmitListing: React.FC = () => {
  const [listingType, setListingType] = useState<'property' | 'professional' | 'contractor' | 'supplier'>('property');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [propertyData, setPropertyData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    amenities: [] as string[],
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  });

  const [professionalData, setProfessionalData] = useState({
    name: '',
    profession: '',
    company: '',
    description: '',
    specialties: [] as string[],
    experience: '',
    hourlyRate: '',
    certifications: [] as string[],
    education: '',
    contactPhone: '',
    contactEmail: '',
    website: ''
  });

  const [contractorData, setContractorData] = useState({
    name: '',
    company: '',
    contractorType: '',
    description: '',
    services: [] as string[],
    licenseNumber: '',
    experience: '',
    employees: '',
    contactPhone: '',
    contactEmail: '',
    website: ''
  });

  const [supplierData, setSupplierData] = useState({
    companyName: '',
    contactPerson: '',
    categories: [] as string[],
    products: [] as string[],
    description: '',
    established: '',
    employees: '',
    deliveryRadius: '',
    minOrder: '',
    paymentTerms: '',
    contactPhone: '',
    contactEmail: '',
    website: ''
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-6">You need to sign in to submit a listing.</p>
          <Link
            to="/auth"
            className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200"
          >
            Sign In / Register
          </Link>
        </div>
      </div>
    );
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files].slice(0, 10)); // Max 10 images
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Here you would submit the data to your backend
      console.log('Submitting listing:', { listingType, propertyData, professionalData, contractorData, supplierData, images });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Listing submitted successfully! It will be reviewed by our team.');
      navigate('/');
    } catch (error) {
      console.error('Error submitting listing:', error);
      alert('Error submitting listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderListingTypeSelection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">What would you like to list?</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setListingType('property')}
          className={`p-6 border-2 rounded-xl text-left transition-all duration-200 ${
            listingType === 'property' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center space-x-4">
            <Home className="h-8 w-8 text-blue-600" />
            <div>
              <h4 className="font-bold text-gray-900">Property Listing</h4>
              <p className="text-sm text-gray-600">List residential or commercial properties for sale or rent</p>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setListingType('professional')}
          className={`p-6 border-2 rounded-xl text-left transition-all duration-200 ${
            listingType === 'professional' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center space-x-4">
            <User className="h-8 w-8 text-green-600" />
            <div>
              <h4 className="font-bold text-gray-900">Professional Profile</h4>
              <p className="text-sm text-gray-600">List your professional services (Architect, Engineer, etc.)</p>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setListingType('contractor')}
          className={`p-6 border-2 rounded-xl text-left transition-all duration-200 ${
            listingType === 'contractor' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center space-x-4">
            <Building className="h-8 w-8 text-orange-600" />
            <div>
              <h4 className="font-bold text-gray-900">Contractor Services</h4>
              <p className="text-sm text-gray-600">List your contracting business and services</p>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setListingType('supplier')}
          className={`p-6 border-2 rounded-xl text-left transition-all duration-200 ${
            listingType === 'supplier' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center space-x-4">
            <Building className="h-8 w-8 text-purple-600" />
            <div>
              <h4 className="font-bold text-gray-900">Materials Supplier</h4>
              <p className="text-sm text-gray-600">List your materials and supply business</p>
            </div>
          </div>
        </button>
      </div>

      <button
        type="button"
        onClick={nextStep}
        className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
      >
        Continue
      </button>
    </div>
  );

  const renderPropertyForm = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Property Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
          <input
            type="text"
            required
            value={propertyData.title}
            onChange={(e) => setPropertyData({...propertyData, title: e.target.value})}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Modern 3-Bedroom Villa in Karen"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
          <select
            required
            value={propertyData.propertyType}
            onChange={(e) => setPropertyData({...propertyData, propertyType: e.target.value})}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="townhouse">Townhouse</option>
            <option value="commercial">Commercial</option>
            <option value="land">Land</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price (KSh)</label>
          <input
            type="number"
            required
            value={propertyData.price}
            onChange={(e) => setPropertyData({...propertyData, price: e.target.value})}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="25000000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            required
            value={propertyData.location}
            onChange={(e) => setPropertyData({...propertyData, location: e.target.value})}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Karen, Nairobi"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
          <input
            type="number"
            value={propertyData.bedrooms}
            onChange={(e) => setPropertyData({...propertyData, bedrooms: e.target.value})}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
          <input
            type="number"
            value={propertyData.bathrooms}
            onChange={(e) => setPropertyData({...propertyData, bathrooms: e.target.value})}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq ft)</label>
          <input
            type="number"
            value={propertyData.area}
            onChange={(e) => setPropertyData({...propertyData, area: e.target.value})}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="2500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            rows={4}
            required
            value={propertyData.description}
            onChange={(e) => setPropertyData({...propertyData, description: e.target.value})}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the property features, location benefits, and unique selling points..."
          />
        </div>
      </div>
    </div>
  );

  const renderProfessionalForm = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Professional Profile</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            required
            value={professionalData.name}
            onChange={(e) => setProfessionalData({...professionalData, name: e.target.value})}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Dr. Sarah Mwangi"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
          <select
            required
            value={professionalData.profession}
            onChange={(e) => setProfessionalData({...professionalData, profession: e.target.value})}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select profession</option>
            <option value="architect">Architect</option>
            <option value="structural_engineer">Structural Engineer</option>
            <option value="civil_engineer">Civil Engineer</option>
            <option value="quantity_surveyor">Quantity Surveyor</option>
            <option value="project_manager">Project Manager</option>
            <option value="interior_designer">Interior Designer</option>
            <option value="land_surveyor">Land Surveyor</option>
            <option value="building_inspector">Building Inspector</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company/Firm</label>
          <input
            type="text"
            value={professionalData.company}
            onChange={(e) => setProfessionalData({...professionalData, company: e.target.value})}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mwangi & Associates Architecture"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
          <input
            type="number"
            value={professionalData.experience}
            onChange={(e) => setProfessionalData({...professionalData, experience: e.target.value})}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="15"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate (KSh)</label>
          <input
            type="number"
            value={professionalData.hourlyRate}
            onChange={(e) => setProfessionalData({...professionalData, hourlyRate: e.target.value})}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="5000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
          <input
            type="text"
            value={professionalData.education}
            onChange={(e) => setProfessionalData({...professionalData, education: e.target.value})}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="PhD Architecture, University of Nairobi"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Professional Description</label>
          <textarea
            rows={4}
            required
            value={professionalData.description}
            onChange={(e) => setProfessionalData({...professionalData, description: e.target.value})}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your expertise, specializations, and professional background..."
          />
        </div>
      </div>
    </div>
  );

  const renderContactForm = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information & Images</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
          <input
            type="text"
            required
            value={listingType === 'property' ? propertyData.contactName : 
                   listingType === 'professional' ? professionalData.name :
                   listingType === 'contractor' ? contractorData.name : supplierData.contactPerson}
            onChange={(e) => {
              if (listingType === 'property') {
                setPropertyData({...propertyData, contactName: e.target.value});
              } else if (listingType === 'professional') {
                setProfessionalData({...professionalData, name: e.target.value});
              } else if (listingType === 'contractor') {
                setContractorData({...contractorData, name: e.target.value});
              } else {
                setSupplierData({...supplierData, contactPerson: e.target.value});
              }
            }}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            required
            value={listingType === 'property' ? propertyData.contactPhone : 
                   listingType === 'professional' ? professionalData.contactPhone :
                   listingType === 'contractor' ? contractorData.contactPhone : supplierData.contactPhone}
            onChange={(e) => {
              if (listingType === 'property') {
                setPropertyData({...propertyData, contactPhone: e.target.value});
              } else if (listingType === 'professional') {
                setProfessionalData({...professionalData, contactPhone: e.target.value});
              } else if (listingType === 'contractor') {
                setContractorData({...contractorData, contactPhone: e.target.value});
              } else {
                setSupplierData({...supplierData, contactPhone: e.target.value});
              }
            }}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+254 700 000 000"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            required
            value={listingType === 'property' ? propertyData.contactEmail : 
                   listingType === 'professional' ? professionalData.contactEmail :
                   listingType === 'contractor' ? contractorData.contactEmail : supplierData.contactEmail}
            onChange={(e) => {
              if (listingType === 'property') {
                setPropertyData({...propertyData, contactEmail: e.target.value});
              } else if (listingType === 'professional') {
                setProfessionalData({...professionalData, contactEmail: e.target.value});
              } else if (listingType === 'contractor') {
                setContractorData({...contractorData, contactEmail: e.target.value});
              } else {
                setSupplierData({...supplierData, contactEmail: e.target.value});
              }
            }}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Images {listingType === 'property' ? '(Property Photos)' : '(Portfolio/Company Photos)'}
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="text-center">
            <Camera className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Upload images
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB each (max 10 images)</p>
            </div>
          </div>
        </div>

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-700 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2 text-gray-400">
              <span>/</span>
              <span className="text-gray-900">Submit Listing</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit a Listing</h1>
            <p className="text-gray-600">Share your property, services, or business with our community</p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Step {step} of 3</span>
              <span className="text-sm text-gray-500">
                {step === 1 ? 'Listing Type' : step === 2 ? 'Details' : 'Contact & Images'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && renderListingTypeSelection()}
            {step === 2 && (
              <>
                {listingType === 'property' && renderPropertyForm()}
                {listingType === 'professional' && renderProfessionalForm()}
                {/* Add contractor and supplier forms here */}
                <div className="flex space-x-4 mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                  >
                    Continue
                  </button>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                {renderContactForm()}
                <div className="flex space-x-4 mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                  >
                    {loading ? 'Submitting...' : 'Submit Listing'}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitListing;