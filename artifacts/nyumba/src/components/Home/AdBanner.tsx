import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Phone } from 'lucide-react';
import { API_BASE } from '../../lib/api';

interface Ad {
  id: number;
  label: string;
  headline: string;
  sub?: string;
  cta: string;
  ctaLink: string;
  phone?: string;
  imageUrl?: string;
  bg: string;
  accent: string;
}

const FALLBACK_ADS: Ad[] = [
  { id: 1, label: 'SPONSORED', headline: 'Bamburi Cement — Built for Kenya', sub: 'Premium Portland cement trusted by contractors nationwide. Distributor pricing available.', cta: 'Request Quote', ctaLink: '#', phone: '+254 700 000 001', bg: 'from-gray-800 to-gray-900', accent: 'bg-yellow-400 text-gray-900', imageUrl: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 2, label: 'FEATURED', headline: 'Nairobi Prime Apartments — Q3 2025', sub: 'Studio to 3-bedroom units in Westlands. Ready 2025. Flexible payment plans from KES 5.5M.', cta: 'Book Viewing', ctaLink: '/properties', phone: '+254 722 000 002', bg: 'from-blue-800 to-blue-900', accent: 'bg-orange-500 text-white', imageUrl: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 3, label: 'ADVERTORIAL', headline: 'Steel Masters Kenya', sub: 'Structural steel, roofing sheets & fabrication. Fast delivery across Nairobi, Mombasa & Kisumu.', cta: 'Get Pricing', ctaLink: '/materials', phone: '+254 733 000 003', bg: 'from-slate-700 to-slate-800', accent: 'bg-green-500 text-white', imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 4, label: 'SPONSORED', headline: 'Architecture & Design Hub', sub: 'Award-winning architects for residential, commercial & mixed-use projects across East Africa.', cta: 'View Profiles', ctaLink: '/professionals', bg: 'from-indigo-800 to-indigo-900', accent: 'bg-pink-500 text-white', imageUrl: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const AdBanner: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>(FALLBACK_ADS);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/advertisements`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setAds(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!paused && ads.length > 1) {
      intervalRef.current = setInterval(() => setCurrent(p => (p + 1) % ads.length), 4500);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, ads.length]);

  const go = (idx: number) => {
    setCurrent(idx);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  };

  const trackClick = (id: number) => {
    fetch(`${API_BASE}/api/advertisements/${id}/click`, { method: 'POST' }).catch(() => {});
  };

  const ad = ads[current];
  if (!ad) return null;

  return (
    <div className="rounded-xl overflow-hidden shadow-lg">
      <div className={`bg-gradient-to-br ${ad.bg || 'from-gray-800 to-gray-900'} relative`}>
        <div className="relative h-36 overflow-hidden">
          <img src={ad.imageUrl || 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600'} alt={ad.headline} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 flex flex-col justify-between p-3">
            <div className="flex items-center justify-between">
              <span className={`${ad.accent || 'bg-yellow-400 text-gray-900'} px-2 py-0.5 rounded text-[10px] font-bold tracking-wider`}>{ad.label}</span>
              {ads.length > 1 && (
                <div className="flex gap-1">
                  <button onClick={() => go((current - 1 + ads.length) % ads.length)} className="bg-white/20 hover:bg-white/40 text-white p-1 rounded-full transition-colors"><ChevronLeft className="h-3 w-3" /></button>
                  <button onClick={() => go((current + 1) % ads.length)} className="bg-white/20 hover:bg-white/40 text-white p-1 rounded-full transition-colors"><ChevronRight className="h-3 w-3" /></button>
                </div>
              )}
            </div>
            <h4 className="text-white font-bold text-sm leading-snug line-clamp-2">{ad.headline}</h4>
          </div>
        </div>

        <div className="p-3 bg-white/5 backdrop-blur-sm">
          {ad.sub && <p className="text-gray-200 text-[11px] leading-snug mb-2.5 line-clamp-2">{ad.sub}</p>}
          <div className="flex flex-col gap-1.5">
            <a
              href={ad.ctaLink || '#'}
              target={ad.ctaLink?.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              onClick={() => trackClick(ad.id)}
              className="w-full bg-white/90 hover:bg-white text-gray-900 text-[11px] font-bold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="h-3 w-3" />{ad.cta}
            </a>
            {ad.phone && (
              <a href={`tel:${ad.phone.replace(/\s/g, '')}`} className="w-full bg-transparent border border-white/30 hover:border-white/60 text-white text-[11px] py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5">
                <Phone className="h-3 w-3" />{ad.phone}
              </a>
            )}
          </div>
          {ads.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-2.5">
              {ads.map((_, i) => (
                <button key={i} onClick={() => go(i)} className={`transition-all rounded-full ${i === current ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40'}`} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-50 border-t border-gray-100 px-3 py-1.5 text-center">
        <span className="text-[10px] text-gray-400">Advertise with Nyumba Magazine</span>
        <span className="mx-1.5 text-gray-300">·</span>
        <a href="mailto:ads@nyumba.co.ke" className="text-[10px] text-blue-600 hover:text-blue-700 font-medium">ads@nyumba.co.ke</a>
      </div>
    </div>
  );
};

export default AdBanner;
