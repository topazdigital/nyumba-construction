import React, { useState } from 'react';
import { API_BASE } from '../../lib/api';

interface Props {
  bg?: 'orange' | 'blue' | 'green';
  inline?: boolean;
  source?: string;
}

const palettes = {
  orange: { wrap: 'from-orange-600 to-orange-700', ring: 'focus:ring-orange-300', btn: 'text-orange-600', sub: 'text-orange-100' },
  blue:   { wrap: 'from-blue-700 to-blue-800',   ring: 'focus:ring-blue-300',   btn: 'text-blue-700',   sub: 'text-blue-100' },
  green:  { wrap: 'from-green-700 to-green-800', ring: 'focus:ring-green-300', btn: 'text-green-700', sub: 'text-green-100' },
};

const NewsletterWidget: React.FC<Props> = ({ bg = 'orange', inline = false, source = 'website' }) => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');
  const p = palettes[bg] ?? palettes.orange;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setState('loading');
    try {
      const res = await fetch(`${API_BASE}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setState('success');
        setMsg(data.message || 'Subscribed! Thank you.');
        setEmail('');
      } else {
        setState('error');
        setMsg(data.error || 'Could not subscribe. Please try again.');
      }
    } catch {
      setState('error');
      setMsg('Network error. Please try again.');
    }
    setTimeout(() => setState('idle'), 5000);
  };

  return (
    <div className={`bg-gradient-to-br ${p.wrap} rounded-xl shadow-md p-4 text-white`}>
      <h3 className="text-sm font-bold mb-1">Stay Updated</h3>
      <p className={`${p.sub} text-xs mb-3`}>Get the latest industry news and insights delivered to your inbox</p>

      {state === 'success' ? (
        <div className="bg-white/20 rounded-lg px-3 py-2.5 text-center text-xs font-semibold">{msg}</div>
      ) : (
        <form onSubmit={handleSubmit} className={inline ? 'flex gap-2' : 'space-y-2'}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={state === 'loading'}
            className={`${inline ? 'flex-1 min-w-0' : 'w-full'} px-3 py-2 rounded-lg text-xs text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${p.ring} disabled:opacity-60`}
          />
          <button
            type="submit"
            disabled={state === 'loading'}
            className={`${inline ? 'flex-shrink-0' : 'w-full'} bg-white ${p.btn} py-2 px-3 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors disabled:opacity-60`}
          >
            {state === 'loading' ? '…' : 'Subscribe'}
          </button>
        </form>
      )}
      {state === 'error' && <p className="text-red-200 text-xs mt-1.5">{msg}</p>}
    </div>
  );
};

export default NewsletterWidget;
