import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Building2, Users, TrendingUp, Plus, Eye, Edit, Trash2, Settings,
  BarChart3, Image, Mail, Phone, Globe, Save, Clock, MessageSquare, Search, X, Package, Wrench, Key
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const API = '/api';
const authHdrs = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
});

type Tab = 'overview' | 'articles' | 'properties' | 'professionals' | 'contractors' | 'suppliers' | 'events' | 'messages' | 'slider' | 'settings';

const Modal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({ title, onClose, children }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4 overflow-y-auto">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8">
      <div className="flex items-center justify-between p-5 border-b">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X className="h-5 w-5" /></button>
      </div>
      <div className="p-5">{children}</div>
    </div>
  </div>
);

const Badge = ({ val, trueLabel = 'Yes', falseLabel = 'No' }: { val: boolean; trueLabel?: string; falseLabel?: string }) => (
  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${val ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
    {val ? trueLabel : falseLabel}
  </span>
);

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [articles, setArticles] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [professionals, setProfessionals] = useState<any[]>([]);
  const [contractors, setContractors] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [sliderItems, setSliderItems] = useState<any[]>([]);
  const [stats, setStats] = useState({ articles: 0, properties: 0, professionals: 0, users: 0 });
  const [siteSettings, setSiteSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [modal, setModal] = useState<{ type: string; data: any } | null>(null);
  const [form, setForm] = useState<any>({});
  const [search, setSearch] = useState('');
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [pwLoading, setPwLoading] = useState(false);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    if (!user) { navigate('/auth'); return; }
    if (user.userType !== 'admin') { navigate('/'); }
  }, [user, navigate]);

  const fetchAll = useCallback(async () => {
    try {
      const results = await Promise.allSettled([
        fetch(`${API}/articles?published=false&limit=200`, { headers: authHdrs() }).then(r => r.json()),
        fetch(`${API}/properties?published=false&limit=200`, { headers: authHdrs() }).then(r => r.json()),
        fetch(`${API}/professionals?published=false&limit=200`, { headers: authHdrs() }).then(r => r.json()),
        fetch(`${API}/contractors?published=false&limit=200`, { headers: authHdrs() }).then(r => r.json()),
        fetch(`${API}/suppliers?published=false&limit=200`, { headers: authHdrs() }).then(r => r.json()),
        fetch(`${API}/events?published=false&limit=200`, { headers: authHdrs() }).then(r => r.json()),
        fetch(`${API}/messages`, { headers: authHdrs() }).then(r => r.json()),
        fetch(`${API}/slider`).then(r => r.json()),
        fetch(`${API}/admin/stats`, { headers: authHdrs() }).then(r => r.json()),
        fetch(`${API}/settings`).then(r => r.json()),
      ]);
      const get = (i: number) => results[i].status === 'fulfilled' ? (results[i] as any).value : [];
      setArticles(Array.isArray(get(0)) ? get(0) : []);
      setProperties(Array.isArray(get(1)) ? get(1) : []);
      setProfessionals(Array.isArray(get(2)) ? get(2) : []);
      setContractors(Array.isArray(get(3)) ? get(3) : []);
      setSuppliers(Array.isArray(get(4)) ? get(4) : []);
      setEvents(Array.isArray(get(5)) ? get(5) : []);
      setMessages(Array.isArray(get(6)) ? get(6) : []);
      setSliderItems(Array.isArray(get(7)) ? get(7) : []);
      setStats(get(8) || {});
      setSiteSettings(get(9) || {});
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const openModal = (type: string, data: any = null) => {
    setModal({ type, data });
    setForm(data ? { ...data } : defaultForm(type));
  };
  const closeModal = () => { setModal(null); setForm({}); };

  const defaultForm = (type: string): any => ({
    article: { title: '', content: '', excerpt: '', featuredImage: '', category: 'Technology', author: '', published: false, featured: false, readTime: '5 min read' },
    property: { title: '', description: '', price: '', location: '', propertyType: 'residential', bedrooms: '', bathrooms: '', area: '', images: [], amenities: [], contactName: '', contactPhone: '', contactEmail: '', agent: '', published: false, featured: false },
    professional: { name: '', profession: 'Architect', company: '', location: 'Nairobi, Kenya', description: '', specialties: [], experienceYears: '', hourlyRate: '', certifications: [], contactPhone: '', contactEmail: '', website: '', verified: false, published: false },
    contractor: { name: '', company: '', contractorType: 'General Contractor', location: 'Nairobi, Kenya', description: '', services: [], licenseNumber: '', insurance: false, bond: false, employees: '', projectsCompleted: 0, experienceYears: '', image: '', contactPhone: '', contactEmail: '', website: '', verified: false, published: false },
    supplier: { companyName: '', contactPerson: '', categories: [], products: [], description: '', location: 'Nairobi, Kenya', website: '', establishedYear: '', employees: '', deliveryRadius: '', minOrderAmount: '', paymentTerms: '30 days', image: '', contactPhone: '', contactEmail: '', verified: false, published: false },
    event: { title: '', description: '', category: 'Conference', eventDate: '', eventTime: '', endDate: '', location: '', venue: '', price: '0', image: '', organizer: '', attendees: 0, featured: false, status: 'upcoming', website: '', published: false },
    slider: { title: '', description: '', fileType: 'image', filePath: '', imagePath: '', active: true, sortOrder: 0 },
  }[type] || {});

  const handleSave = async (endpoint: string, id?: number) => {
    setLoading(true);
    try {
      const url = id ? `${API}/${endpoint}/${id}` : `${API}/${endpoint}`;
      const res = await fetch(url, { method: id ? 'PUT' : 'POST', headers: authHdrs(), body: JSON.stringify(form) });
      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || 'Save failed'); }
      showToast('Saved successfully');
      closeModal();
      fetchAll();
    } catch (e: any) { showToast(e.message || 'Save failed', 'error'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (endpoint: string, id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await fetch(`${API}/${endpoint}/${id}`, { method: 'DELETE', headers: authHdrs() });
      showToast('Deleted');
      fetchAll();
    } catch { showToast('Delete failed', 'error'); }
  };

  const handleToggle = async (endpoint: string, id: number, field: string, currentVal: boolean) => {
    try {
      await fetch(`${API}/${endpoint}/${id}`, { method: 'PUT', headers: authHdrs(), body: JSON.stringify({ [field]: !currentVal }) });
      fetchAll();
    } catch { showToast('Update failed', 'error'); }
  };

  const markRead = async (id: number) => {
    await fetch(`${API}/messages/${id}/read`, { method: 'PUT', headers: authHdrs() });
    fetchAll();
  };

  const saveSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/settings`, { method: 'POST', headers: authHdrs(), body: JSON.stringify(siteSettings) });
      if (res.ok) showToast('Settings saved');
      else showToast('Save failed', 'error');
    } catch { showToast('Save failed', 'error'); }
    finally { setLoading(false); }
  };

  const changePassword = async () => {
    if (!pwForm.currentPassword || !pwForm.newPassword) { showToast('Fill in all password fields', 'error'); return; }
    if (pwForm.newPassword !== pwForm.confirmPassword) { showToast('New passwords do not match', 'error'); return; }
    if (pwForm.newPassword.length < 8) { showToast('New password must be at least 8 characters', 'error'); return; }
    setPwLoading(true);
    try {
      const res = await fetch(`${API}/auth/change-password`, {
        method: 'POST', headers: authHdrs(),
        body: JSON.stringify({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword }),
      });
      if (res.ok) { showToast('Password changed successfully'); setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' }); }
      else { const e = await res.json().catch(() => ({})); showToast(e.error || 'Password change failed', 'error'); }
    } catch { showToast('Password change failed', 'error'); }
    finally { setPwLoading(false); }
  };

  const tabs: { id: Tab; name: string; icon: any }[] = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'articles', name: 'Articles', icon: FileText },
    { id: 'properties', name: 'Properties', icon: Building2 },
    { id: 'professionals', name: 'Professionals', icon: Users },
    { id: 'contractors', name: 'Contractors', icon: Wrench },
    { id: 'suppliers', name: 'Suppliers', icon: Package },
    { id: 'events', name: 'Events', icon: Clock },
    { id: 'messages', name: `Messages${messages.filter(m => !m.readStatus).length > 0 ? ` (${messages.filter(m => !m.readStatus).length})` : ''}`, icon: MessageSquare },
    { id: 'slider', name: 'Slider', icon: Image },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const filt = (arr: any[], fields: string[]) =>
    arr.filter(item => !search || fields.some(f => String(item[f] || '').toLowerCase().includes(search.toLowerCase())));

  const fi = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f: any) => ({ ...f, [key]: e.target.value }));
  const fb = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f: any) => ({ ...f, [key]: e.target.checked }));

  const Input = ({ label, fkey, type = 'text', className = '' }: any) => (
    <div className={className}>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      <input type={type} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form[fkey] ?? ''} onChange={fi(fkey)} />
    </div>
  );

  const Textarea = ({ label, fkey, rows = 3 }: any) => (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      <textarea rows={rows} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form[fkey] ?? ''} onChange={fi(fkey)} />
    </div>
  );

  const Select = ({ label, fkey, options }: any) => (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form[fkey] ?? ''} onChange={fi(fkey)}>
        {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  const Checkbox = ({ label, fkey }: any) => (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" checked={!!form[fkey]} onChange={fb(fkey)} className="rounded text-blue-600" />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );

  const SaveBtn = ({ endpoint, color = 'blue', label = 'Save' }: any) => (
    <div className="flex gap-3 pt-3">
      <button onClick={() => handleSave(endpoint, modal?.data?.id)} disabled={loading}
        className={`flex-1 bg-${color}-600 hover:bg-${color}-700 text-white py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50 transition-colors`}>
        {loading ? 'Saving...' : label}
      </button>
      <button onClick={closeModal} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-semibold transition-colors">
        Cancel
      </button>
    </div>
  );

  const SearchBar = ({ placeholder }: { placeholder: string }) => (
    <div className="relative max-w-xs flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder} value={search} onChange={e => setSearch(e.target.value)} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {toast.msg}
        </div>
      )}

      {/* ── Article Modal ── */}
      {modal?.type === 'article' && (
        <Modal title={modal.data ? 'Edit Article' : 'New Article'} onClose={closeModal}>
          <div className="space-y-4">
            <Input label="Title *" fkey="title" />
            <div className="grid grid-cols-2 gap-3">
              <Select label="Category" fkey="category" options={['Technology','Policy & Regulations','Market Updates','Major Projects','Breaking News','Architecture','Construction','Materials','Sustainability','Interviews']} />
              <Input label="Author" fkey="author" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Featured Image URL" fkey="featuredImage" />
              <Input label="Read Time (e.g. 5 min read)" fkey="readTime" />
            </div>
            <Textarea label="Excerpt *" fkey="excerpt" rows={2} />
            <Textarea label="Content * (HTML supported)" fkey="content" rows={10} />
            <div className="flex gap-6"><Checkbox label="Published (visible to public)" fkey="published" /><Checkbox label="Featured" fkey="featured" /></div>
            <SaveBtn endpoint="articles" color="blue" label="Save Article" />
          </div>
        </Modal>
      )}

      {/* ── Property Modal ── */}
      {modal?.type === 'property' && (
        <Modal title={modal.data ? 'Edit Property' : 'New Property'} onClose={closeModal}>
          <div className="space-y-4">
            <Input label="Title *" fkey="title" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Price (KSh) *" fkey="price" type="number" />
              <Select label="Type" fkey="propertyType" options={['residential','commercial','land','rental','investment']} />
            </div>
            <Input label="Location *" fkey="location" />
            <div className="grid grid-cols-3 gap-3">
              <Input label="Bedrooms" fkey="bedrooms" type="number" />
              <Input label="Bathrooms" fkey="bathrooms" type="number" />
              <Input label="Area (sqft)" fkey="area" type="number" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Main Image URL</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={(form.images && form.images[0]) || ''} onChange={e => setForm((f: any) => ({ ...f, images: [e.target.value] }))} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Amenities (comma-separated)</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={Array.isArray(form.amenities) ? form.amenities.join(', ') : (form.amenities || '')}
                onChange={e => setForm((f: any) => ({ ...f, amenities: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean) }))} />
            </div>
            <Textarea label="Description *" fkey="description" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Contact Name" fkey="contactName" />
              <Input label="Contact Phone" fkey="contactPhone" />
            </div>
            <Input label="Contact Email" fkey="contactEmail" />
            <div className="flex gap-6"><Checkbox label="Published" fkey="published" /><Checkbox label="Featured" fkey="featured" /></div>
            <SaveBtn endpoint="properties" color="orange" label="Save Property" />
          </div>
        </Modal>
      )}

      {/* ── Professional Modal ── */}
      {modal?.type === 'professional' && (
        <Modal title={modal.data ? 'Edit Professional' : 'Add Professional'} onClose={closeModal}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input label="Full Name *" fkey="name" />
              <Select label="Profession *" fkey="profession" options={['Architect','Structural Engineer','Civil Engineer','Quantity Surveyor','Project Manager','Interior Designer','Land Surveyor','Building Inspector']} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Company" fkey="company" />
              <Input label="Location" fkey="location" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Experience (Years)" fkey="experienceYears" type="number" />
              <Input label="Hourly Rate (KSh)" fkey="hourlyRate" type="number" />
            </div>
            <Input label="Profile Image URL" fkey="image" />
            <Textarea label="Description / Bio" fkey="description" rows={3} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Phone" fkey="contactPhone" />
              <Input label="Email" fkey="contactEmail" />
            </div>
            <Input label="Website" fkey="website" />
            <div className="flex gap-6"><Checkbox label="Published" fkey="published" /><Checkbox label="Verified" fkey="verified" /></div>
            <SaveBtn endpoint="professionals" color="green" label="Save Professional" />
          </div>
        </Modal>
      )}

      {/* ── Contractor Modal ── */}
      {modal?.type === 'contractor' && (
        <Modal title={modal.data ? 'Edit Contractor' : 'Add Contractor'} onClose={closeModal}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input label="Contact Name *" fkey="name" />
              <Input label="Company Name *" fkey="company" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Select label="Contractor Type *" fkey="contractorType" options={['General Contractor','Electrical Contractor','Plumbing Contractor','Roofing Contractor','HVAC Contractor','Painting Contractor','Flooring Contractor','Landscaping Contractor']} />
              <Input label="Location" fkey="location" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Experience (Years)" fkey="experienceYears" type="number" />
              <Input label="No. of Employees" fkey="employees" type="number" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="License Number" fkey="licenseNumber" />
              <Input label="Projects Completed" fkey="projectsCompleted" type="number" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Services Offered (comma-separated)</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={Array.isArray(form.services) ? form.services.join(', ') : (form.services || '')}
                onChange={e => setForm((f: any) => ({ ...f, services: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean) }))} />
            </div>
            <Input label="Profile Image URL" fkey="image" />
            <Textarea label="Description" fkey="description" rows={3} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Phone" fkey="contactPhone" />
              <Input label="Email" fkey="contactEmail" />
            </div>
            <Input label="Website" fkey="website" />
            <div className="flex gap-6">
              <Checkbox label="Insured" fkey="insurance" />
              <Checkbox label="Bonded" fkey="bond" />
              <Checkbox label="Published" fkey="published" />
              <Checkbox label="Verified" fkey="verified" />
            </div>
            <SaveBtn endpoint="contractors" color="yellow" label="Save Contractor" />
          </div>
        </Modal>
      )}

      {/* ── Supplier Modal ── */}
      {modal?.type === 'supplier' && (
        <Modal title={modal.data ? 'Edit Supplier' : 'Add Supplier'} onClose={closeModal}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input label="Company Name *" fkey="companyName" />
              <Input label="Contact Person *" fkey="contactPerson" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Location" fkey="location" />
              <Input label="Website" fkey="website" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Established Year" fkey="establishedYear" type="number" />
              <Input label="Employees" fkey="employees" type="number" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Delivery Radius (km)" fkey="deliveryRadius" type="number" />
              <Input label="Min Order (KSh)" fkey="minOrderAmount" type="number" />
            </div>
            <Input label="Payment Terms" fkey="paymentTerms" />
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Categories (comma-separated)</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={Array.isArray(form.categories) ? form.categories.join(', ') : (form.categories || '')}
                onChange={e => setForm((f: any) => ({ ...f, categories: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean) }))} />
            </div>
            <Input label="Company Logo URL" fkey="image" />
            <Textarea label="Description" fkey="description" rows={3} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Phone" fkey="contactPhone" />
              <Input label="Email" fkey="contactEmail" />
            </div>
            <div className="flex gap-6"><Checkbox label="Published" fkey="published" /><Checkbox label="Verified" fkey="verified" /></div>
            <SaveBtn endpoint="suppliers" color="purple" label="Save Supplier" />
          </div>
        </Modal>
      )}

      {/* ── Event Modal ── */}
      {modal?.type === 'event' && (
        <Modal title={modal.data ? 'Edit Event' : 'New Event'} onClose={closeModal}>
          <div className="space-y-4">
            <Input label="Title *" fkey="title" />
            <div className="grid grid-cols-2 gap-3">
              <Select label="Category" fkey="category" options={['Conference','Exhibition','Workshop','Seminar','Networking','Training']} />
              <Select label="Status" fkey="status" options={['upcoming','ongoing','completed','cancelled']} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Event Date *" fkey="eventDate" type="date" />
              <Input label="Time" fkey="eventTime" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Location *" fkey="location" />
              <Input label="Venue" fkey="venue" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Ticket Price (KSh, 0 = Free)" fkey="price" type="number" />
              <Input label="Organizer" fkey="organizer" />
            </div>
            <Input label="Event Image URL" fkey="image" />
            <Input label="Event Website URL" fkey="website" />
            <Textarea label="Description *" fkey="description" rows={4} />
            <div className="flex gap-6"><Checkbox label="Published" fkey="published" /><Checkbox label="Featured" fkey="featured" /></div>
            <SaveBtn endpoint="events" color="purple" label="Save Event" />
          </div>
        </Modal>
      )}

      {/* ── Slider Modal ── */}
      {modal?.type === 'slider' && (
        <Modal title={modal.data ? 'Edit Slider Item' : 'Add Slider Item'} onClose={closeModal}>
          <div className="space-y-4">
            <Input label="Title *" fkey="title" />
            <Input label="Description" fkey="description" />
            <Select label="Content Type" fkey="fileType" options={['image','pdf','video']} />
            <Input label="Thumbnail / Cover Image URL" fkey="imagePath" />
            <Input label="File URL (PDF/Video) or Image URL" fkey="filePath" />
            <Input label="Sort Order (lower = shown first)" fkey="sortOrder" type="number" />
            <Checkbox label="Active (visible on homepage)" fkey="active" />
            <SaveBtn endpoint="slider" color="blue" label="Save Slider Item" />
          </div>
        </Modal>
      )}

      {/* ── View Message Modal ── */}
      {modal?.type === 'view-message' && modal.data && (
        <Modal title="Message Details" onClose={closeModal}>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between gap-3"><span className="text-gray-500 font-medium w-20">From:</span><span className="font-semibold">{modal.data.name}</span></div>
              <div className="flex justify-between gap-3"><span className="text-gray-500 font-medium w-20">Email:</span><a href={`mailto:${modal.data.email}`} className="text-blue-700 hover:underline">{modal.data.email}</a></div>
              <div className="flex justify-between gap-3"><span className="text-gray-500 font-medium w-20">Subject:</span><span>{modal.data.subject}</span></div>
              <div className="flex justify-between gap-3"><span className="text-gray-500 font-medium w-20">Date:</span><span>{modal.data.createdAt ? new Date(modal.data.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}</span></div>
            </div>
            <div className="bg-white border rounded-lg p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{modal.data.message}</div>
            <div className="flex gap-3">
              <a href={`mailto:${modal.data.email}?subject=Re: ${modal.data.subject}`} className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors">
                Reply via Email
              </a>
              <button onClick={closeModal} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-semibold transition-colors">Close</button>
            </div>
          </div>
        </Modal>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 text-xs mt-0.5">Signed in as <strong>{user?.email}</strong></p>
          </div>
          <button onClick={signOut} className="text-xs text-gray-500 hover:text-gray-700 border border-gray-300 px-3 py-1.5 rounded-lg transition-colors">
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-5 border-b border-gray-200">
          <nav className="-mb-px flex gap-0 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSearch(''); }}
                className={`flex items-center gap-1.5 py-2.5 px-3 border-b-2 font-semibold text-xs whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'}`}>
                <tab.icon className="h-3.5 w-3.5" />{tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Articles', value: stats.articles, icon: FileText, color: 'bg-blue-500', tab: 'articles' },
                { title: 'Properties', value: stats.properties, icon: Building2, color: 'bg-orange-500', tab: 'properties' },
                { title: 'Professionals', value: stats.professionals, icon: Users, color: 'bg-green-500', tab: 'professionals' },
                { title: 'Total Users', value: stats.users, icon: TrendingUp, color: 'bg-purple-500', tab: 'settings' },
              ].map(s => (
                <button key={s.title} onClick={() => setActiveTab(s.tab as Tab)}
                  className="bg-white rounded-xl shadow-sm p-5 text-left hover:shadow-md transition-shadow group">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">{s.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{s.value ?? 0}</p>
                    </div>
                    <div className={`${s.color} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                      <s.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Recent Messages</h3>
                <div className="space-y-2">
                  {messages.slice(0, 5).map(m => (
                    <div key={m.id} onClick={() => { openModal('view-message', m); markRead(m.id); }}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${!m.readStatus ? 'bg-blue-50' : ''}`}>
                      <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-gray-900 truncate">{m.name}</p>
                        <p className="text-xs text-gray-500 truncate">{m.subject}</p>
                      </div>
                      {!m.readStatus && <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full" />}
                    </div>
                  ))}
                  {messages.length === 0 && <p className="text-xs text-gray-400">No messages yet.</p>}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'New Article', type: 'article', color: 'blue' },
                    { label: 'New Property', type: 'property', color: 'orange' },
                    { label: 'Add Professional', type: 'professional', color: 'green' },
                    { label: 'Add Contractor', type: 'contractor', color: 'yellow' },
                    { label: 'Add Supplier', type: 'supplier', color: 'purple' },
                    { label: 'New Event', type: 'event', color: 'pink' },
                  ].map(a => (
                    <button key={a.label} onClick={() => openModal(a.type)}
                      className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 p-3 rounded-lg text-xs font-semibold transition-colors border border-gray-200">
                      <Plus className="h-3.5 w-3.5" />{a.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── ARTICLES ── */}
        {activeTab === 'articles' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <SearchBar placeholder="Search articles…" />
              <button onClick={() => openModal('article')} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors">
                <Plus className="h-4 w-4" />New Article
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>{['Title','Category','Author','Published','Featured','Views','Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filt(articles, ['title','category','author']).map(a => (
                    <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 max-w-xs"><div className="truncate">{a.title}</div></td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{a.category}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{a.author}</td>
                      <td className="px-4 py-3 whitespace-nowrap"><button onClick={() => handleToggle('articles', a.id, 'published', a.published)}><Badge val={a.published} trueLabel="Live" falseLabel="Draft" /></button></td>
                      <td className="px-4 py-3 whitespace-nowrap"><button onClick={() => handleToggle('articles', a.id, 'featured', a.featured)}><Badge val={a.featured} /></button></td>
                      <td className="px-4 py-3 text-xs text-gray-500">{(a.views || 0).toLocaleString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button onClick={() => openModal('article', a)} className="text-blue-600 hover:text-blue-800 transition-colors" title="Edit"><Edit className="h-4 w-4" /></button>
                          <button onClick={() => handleDelete('articles', a.id)} className="text-red-600 hover:text-red-800 transition-colors" title="Delete"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {articles.length === 0 && <div className="py-12 text-center text-gray-400 text-sm">No articles yet. Click "New Article" to get started.</div>}
            </div>
          </div>
        )}

        {/* ── PROPERTIES ── */}
        {activeTab === 'properties' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <SearchBar placeholder="Search properties…" />
              <button onClick={() => openModal('property')} className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors">
                <Plus className="h-4 w-4" />New Property
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>{['Property','Type','Price','Location','Published','Featured','Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filt(properties, ['title','location','propertyType']).map(p => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 max-w-[200px]"><div className="truncate">{p.title}</div></td>
                      <td className="px-4 py-3 text-xs text-gray-500 capitalize whitespace-nowrap">{p.propertyType}</td>
                      <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">KSh {Number(p.price).toLocaleString()}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 max-w-[150px]"><div className="truncate">{p.location}</div></td>
                      <td className="px-4 py-3 whitespace-nowrap"><button onClick={() => handleToggle('properties', p.id, 'published', p.published)}><Badge val={p.published} trueLabel="Live" falseLabel="Draft" /></button></td>
                      <td className="px-4 py-3 whitespace-nowrap"><button onClick={() => handleToggle('properties', p.id, 'featured', p.featured)}><Badge val={p.featured} /></button></td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button onClick={() => openModal('property', p)} className="text-blue-600 hover:text-blue-800"><Edit className="h-4 w-4" /></button>
                          <button onClick={() => handleDelete('properties', p.id)} className="text-red-600 hover:text-red-800"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {properties.length === 0 && <div className="py-12 text-center text-gray-400 text-sm">No properties yet.</div>}
            </div>
          </div>
        )}

        {/* ── PROFESSIONALS ── */}
        {activeTab === 'professionals' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <SearchBar placeholder="Search professionals…" />
              <button onClick={() => openModal('professional')} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors">
                <Plus className="h-4 w-4" />Add Professional
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>{['Name','Profession','Company','Location','Verified','Published','Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filt(professionals, ['name','profession','company']).map(p => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">{p.name}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{p.profession}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 max-w-[150px]"><div className="truncate">{p.company}</div></td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{p.location}</td>
                      <td className="px-4 py-3 whitespace-nowrap"><button onClick={() => handleToggle('professionals', p.id, 'verified', p.verified)}><Badge val={p.verified} /></button></td>
                      <td className="px-4 py-3 whitespace-nowrap"><button onClick={() => handleToggle('professionals', p.id, 'published', p.published)}><Badge val={p.published} trueLabel="Live" falseLabel="Draft" /></button></td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button onClick={() => openModal('professional', p)} className="text-blue-600 hover:text-blue-800"><Edit className="h-4 w-4" /></button>
                          <button onClick={() => handleDelete('professionals', p.id)} className="text-red-600 hover:text-red-800"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {professionals.length === 0 && <div className="py-12 text-center text-gray-400 text-sm">No professionals yet.</div>}
            </div>
          </div>
        )}

        {/* ── CONTRACTORS ── */}
        {activeTab === 'contractors' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <SearchBar placeholder="Search contractors…" />
              <button onClick={() => openModal('contractor')} className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors">
                <Plus className="h-4 w-4" />Add Contractor
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>{['Company','Contact','Type','Location','Verified','Published','Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filt(contractors, ['name','company','contractorType']).map(c => (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">{c.company}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{c.name}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{c.contractorType}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{c.location}</td>
                      <td className="px-4 py-3 whitespace-nowrap"><button onClick={() => handleToggle('contractors', c.id, 'verified', c.verified)}><Badge val={c.verified} /></button></td>
                      <td className="px-4 py-3 whitespace-nowrap"><button onClick={() => handleToggle('contractors', c.id, 'published', c.published)}><Badge val={c.published} trueLabel="Live" falseLabel="Draft" /></button></td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button onClick={() => openModal('contractor', c)} className="text-blue-600 hover:text-blue-800"><Edit className="h-4 w-4" /></button>
                          <button onClick={() => handleDelete('contractors', c.id)} className="text-red-600 hover:text-red-800"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {contractors.length === 0 && <div className="py-12 text-center text-gray-400 text-sm">No contractors yet. Click "Add Contractor" to get started.</div>}
            </div>
          </div>
        )}

        {/* ── SUPPLIERS ── */}
        {activeTab === 'suppliers' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <SearchBar placeholder="Search suppliers…" />
              <button onClick={() => openModal('supplier')} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors">
                <Plus className="h-4 w-4" />Add Supplier
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>{['Company','Contact Person','Location','Verified','Published','Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filt(suppliers, ['companyName','contactPerson','location']).map(s => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">{s.companyName}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{s.contactPerson}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{s.location}</td>
                      <td className="px-4 py-3 whitespace-nowrap"><button onClick={() => handleToggle('suppliers', s.id, 'verified', s.verified)}><Badge val={s.verified} /></button></td>
                      <td className="px-4 py-3 whitespace-nowrap"><button onClick={() => handleToggle('suppliers', s.id, 'published', s.published)}><Badge val={s.published} trueLabel="Live" falseLabel="Draft" /></button></td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button onClick={() => openModal('supplier', s)} className="text-blue-600 hover:text-blue-800"><Edit className="h-4 w-4" /></button>
                          <button onClick={() => handleDelete('suppliers', s.id)} className="text-red-600 hover:text-red-800"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {suppliers.length === 0 && <div className="py-12 text-center text-gray-400 text-sm">No suppliers yet.</div>}
            </div>
          </div>
        )}

        {/* ── EVENTS ── */}
        {activeTab === 'events' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <SearchBar placeholder="Search events…" />
              <button onClick={() => openModal('event')} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors">
                <Plus className="h-4 w-4" />New Event
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>{['Title','Category','Date','Location','Status','Published','Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filt(events, ['title','category','location']).map(e => (
                    <tr key={e.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 max-w-[200px]"><div className="truncate">{e.title}</div></td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{e.category}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{e.eventDate}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 max-w-[150px]"><div className="truncate">{e.location}</div></td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-xs capitalize font-medium ${e.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : e.status === 'ongoing' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{e.status}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap"><button onClick={() => handleToggle('events', e.id, 'published', e.published)}><Badge val={e.published} trueLabel="Live" falseLabel="Draft" /></button></td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button onClick={() => openModal('event', e)} className="text-blue-600 hover:text-blue-800"><Edit className="h-4 w-4" /></button>
                          <button onClick={() => handleDelete('events', e.id)} className="text-red-600 hover:text-red-800"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {events.length === 0 && <div className="py-12 text-center text-gray-400 text-sm">No events yet.</div>}
            </div>
          </div>
        )}

        {/* ── MESSAGES ── */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">
              Messages <span className="text-sm font-normal text-gray-500">({messages.filter(m => !m.readStatus).length} unread)</span>
            </h2>
            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>{['From','Email','Subject','Date','Status','Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {messages.map(m => (
                    <tr key={m.id} className={`hover:bg-gray-50 ${!m.readStatus ? 'bg-blue-50' : ''}`}>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 whitespace-nowrap">{m.name}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{m.email}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 max-w-[200px]"><div className="truncate">{m.subject}</div></td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{m.createdAt ? new Date(m.createdAt).toLocaleDateString('en-GB') : ''}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${m.readStatus ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-700'}`}>{m.readStatus ? 'Read' : 'Unread'}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button onClick={() => { openModal('view-message', m); markRead(m.id); }} className="text-blue-600 hover:text-blue-800" title="View"><Eye className="h-4 w-4" /></button>
                          <a href={`mailto:${m.email}?subject=Re: ${m.subject}`} className="text-green-600 hover:text-green-800" title="Reply"><Mail className="h-4 w-4" /></a>
                          <button onClick={async () => { if (!confirm('Delete this message?')) return; await fetch(`${API}/messages/${m.id}`, { method: 'DELETE', headers: authHdrs() }); fetchAll(); }} className="text-red-600 hover:text-red-800" title="Delete"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {messages.length === 0 && <div className="py-12 text-center text-gray-400 text-sm">No messages yet.</div>}
            </div>
          </div>
        )}

        {/* ── SLIDER ── */}
        {activeTab === 'slider' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Homepage Slider</h2>
                <p className="text-xs text-gray-500 mt-0.5">Manage the sidebar resource slider shown on the homepage</p>
              </div>
              <button onClick={() => openModal('slider')} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                <Plus className="h-4 w-4" />Add Item
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sliderItems.map(item => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                  {item.imagePath && <img src={item.imagePath} alt={item.title} className="w-full h-36 object-cover" onError={e => { (e.target as any).style.display = 'none'; }} />}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{item.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{item.description}</p>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded mt-1.5 inline-block uppercase">{item.fileType}</span>
                      </div>
                      <div className="flex flex-col gap-1.5 flex-shrink-0">
                        <button onClick={() => handleToggle('slider', item.id, 'active', item.active)}
                          className={`text-xs px-2 py-1 rounded-lg font-semibold transition-colors ${item.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {item.active ? 'Active' : 'Hidden'}
                        </button>
                        <button onClick={() => openModal('slider', item)} className="text-blue-500 hover:text-blue-700 self-end"><Edit className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete('slider', item.id)} className="text-red-500 hover:text-red-700 self-end"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {sliderItems.length === 0 && <p className="text-sm text-gray-400 col-span-3 py-8 text-center">No slider items yet. Click "Add Item" to get started.</p>}
            </div>
          </div>
        )}

        {/* ── SETTINGS ── */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Site Settings</h2>
                <p className="text-xs text-gray-500 mt-0.5">Configure your site information and contact details</p>
              </div>
              <button onClick={saveSettings} disabled={loading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50 transition-colors">
                <Save className="h-4 w-4" />{loading ? 'Saving…' : 'Save All Settings'}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {[
                {
                  title: 'General', icon: Settings,
                  keys: [
                    { k: 'site_name', l: 'Site Name', placeholder: 'Nyumba' },
                    { k: 'site_description', l: 'Site Description / Tagline', placeholder: "Kenya's Premier Construction Magazine" },
                    { k: 'meta_keywords', l: 'SEO Keywords (comma-separated)', placeholder: 'construction,property,Kenya,magazine' },
                  ]
                },
                {
                  title: 'Contact Info', icon: Phone,
                  keys: [
                    { k: 'contact_email', l: 'Contact Email', placeholder: 'info@nyumba.co.ke' },
                    { k: 'contact_phone', l: 'Phone Number', placeholder: '+254 700 123 456' },
                    { k: 'address', l: 'Physical Address', placeholder: 'Westlands, Nairobi, Kenya' },
                    { k: 'whatsapp', l: 'WhatsApp Number', placeholder: '+254 700 123 456' },
                  ]
                },
                {
                  title: 'Social Media', icon: Globe,
                  keys: [
                    { k: 'facebook_url', l: 'Facebook URL', placeholder: 'https://facebook.com/yourpage' },
                    { k: 'twitter_url', l: 'Twitter / X URL', placeholder: 'https://twitter.com/yourhandle' },
                    { k: 'linkedin_url', l: 'LinkedIn URL', placeholder: 'https://linkedin.com/company/yourco' },
                    { k: 'instagram_url', l: 'Instagram URL', placeholder: 'https://instagram.com/yourhandle' },
                    { k: 'youtube_url', l: 'YouTube URL', placeholder: 'https://youtube.com/@yourchannel' },
                  ]
                },
                {
                  title: 'Advertising & Rates', icon: TrendingUp,
                  keys: [
                    { k: 'listing_price', l: 'Property Listing Price (KSh)', placeholder: '5000' },
                    { k: 'professional_listing_price', l: 'Professional Listing Price (KSh)', placeholder: '3000' },
                    { k: 'banner_ad_price', l: 'Banner Ad Price / Month (KSh)', placeholder: '10000' },
                    { k: 'featured_article_price', l: 'Featured Article Price (KSh)', placeholder: '8000' },
                  ]
                },
              ].map(section => (
                <div key={section.title} className="bg-white rounded-xl shadow-sm p-5 space-y-4">
                  <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    <section.icon className="h-4 w-4 text-gray-500" />{section.title}
                  </h3>
                  {section.keys.map(({ k, l, placeholder }) => (
                    <div key={k}>
                      <label className="block text-xs font-medium text-gray-700 mb-1">{l}</label>
                      <input
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                        value={siteSettings[k] || ''}
                        placeholder={placeholder}
                        onChange={e => setSiteSettings(s => ({ ...s, [k]: e.target.value }))}
                      />
                    </div>
                  ))}
                </div>
              ))}

              {/* Change Password */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2 mb-4">
                  <Key className="h-4 w-4 text-gray-500" />Change Admin Password
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Current Password</label>
                    <input type="password" value={pwForm.currentPassword}
                      onChange={e => setPwForm(f => ({ ...f, currentPassword: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">New Password (min. 8 characters)</label>
                    <input type="password" value={pwForm.newPassword}
                      onChange={e => setPwForm(f => ({ ...f, newPassword: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input type="password" value={pwForm.confirmPassword}
                      onChange={e => setPwForm(f => ({ ...f, confirmPassword: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <button onClick={changePassword} disabled={pwLoading}
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50 transition-colors">
                    {pwLoading ? 'Changing...' : 'Change Password'}
                  </button>
                </div>
              </div>

              {/* Admin Info */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="font-bold text-amber-800 text-sm mb-2">⚠ Default Credentials Reminder</h3>
                <div className="text-xs text-amber-700 space-y-1">
                  <p>Default admin login (change immediately if not already done):</p>
                  <p>Email: <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono">admin@nyumba.co.ke</code></p>
                  <p>Password: <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono">admin123</code></p>
                  <p className="mt-2 font-semibold">Use the Change Password form above to update your password.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
