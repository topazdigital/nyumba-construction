import React, { useState } from 'react';
import { Send, Mail, Users, Eye, AlertCircle, CheckCircle } from 'lucide-react';

interface Props {
  api: string;
  authHdrs: () => Record<string, string>;
  subscriberCount: number;
}

interface DigestResult {
  success: boolean;
  sent?: number;
  failed?: number;
  preview?: boolean;
  recipientCount?: number;
  message?: string;
  emailPreview?: {
    subject: string;
    previewText: string;
    body: string;
    recipients: string[];
    totalRecipients: number;
  };
  errors?: string[];
  error?: string;
}

const DigestPanel: React.FC<Props> = ({ api, authHdrs, subscriberCount }) => {
  const [subject, setSubject] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<DigestResult | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleSend = async () => {
    if (!subject.trim() || !body.trim()) return;
    if (!confirm(`Send this newsletter to ${subscriberCount} active subscriber(s)?`)) return;
    setSending(true);
    setResult(null);
    try {
      const res = await fetch(`${api}/newsletter/send-digest`, {
        method: 'POST',
        headers: authHdrs(),
        body: JSON.stringify({ subject, previewText, body }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ success: false, error: 'Network error. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-orange-50 to-white">
        <div className="flex items-center gap-3">
          <div className="bg-orange-100 p-2 rounded-lg"><Mail className="h-5 w-5 text-orange-600" /></div>
          <div>
            <h2 className="text-sm font-bold text-gray-900">Send Newsletter Digest</h2>
            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
              <Users className="h-3 w-3" />
              {subscriberCount > 0 ? `Will send to ${subscriberCount} active subscriber${subscriberCount !== 1 ? 's' : ''}` : 'No active subscribers yet'}
            </p>
          </div>
        </div>
        {body.trim() && (
          <button onClick={() => setShowPreview(!showPreview)} className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium border border-blue-200 rounded-lg px-3 py-1.5 transition-colors">
            <Eye className="h-3.5 w-3.5" />{showPreview ? 'Hide Preview' : 'Preview Email'}
          </button>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Subject Line <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="e.g. This Month in Kenyan Construction — May 2025"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Preview Text <span className="text-gray-400 font-normal">(shows in email client inbox preview)</span>
          </label>
          <input
            type="text"
            value={previewText}
            onChange={e => setPreviewText(e.target.value)}
            placeholder="Short teaser shown before opening the email…"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold text-gray-700">Email Body <span className="text-red-500">*</span></label>
            <span className="text-xs text-gray-400">{wordCount} word{wordCount !== 1 ? 's' : ''}</span>
          </div>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder={"Write your newsletter content here…\n\nTip: Use blank lines to separate paragraphs. They'll be formatted automatically in the email.\n\nFor example:\nWelcome to this month's Nyumba Magazine digest!\n\nThis month we cover the latest trends in Kenyan construction…"}
            rows={8}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-y font-mono"
          />
        </div>

        {/* Email preview */}
        {showPreview && body.trim() && (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-3 py-2 text-xs text-gray-500 font-medium flex items-center gap-2">
              <Eye className="h-3.5 w-3.5" />Email Preview
            </div>
            <div className="p-3 bg-gray-50">
              <div className="bg-white rounded shadow-sm overflow-hidden text-xs">
                <div style={{ background: 'linear-gradient(135deg,#ea580c,#c2410c)', padding: '20px', textAlign: 'center' }}>
                  <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px', letterSpacing: '1px' }}>NYUMBA MAGAZINE</div>
                  <div style={{ color: '#fed7aa', fontSize: '11px', marginTop: '4px' }}>Kenya's Construction & Real Estate Platform</div>
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#1f2937', marginBottom: '12px' }}>{subject || '(No subject)'}</div>
                  <div style={{ color: '#374151', lineHeight: '1.7', fontSize: '13px', whiteSpace: 'pre-wrap' }}>{body}</div>
                </div>
                <div style={{ background: '#f9fafb', padding: '12px 20px', textAlign: 'center', borderTop: '1px solid #e5e7eb', fontSize: '11px', color: '#6b7280' }}>
                  nyumba.impact.co.ke · <span style={{ color: '#999' }}>Unsubscribe</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Result message */}
        {result && (
          <div className={`rounded-lg p-3 flex gap-2.5 text-sm ${result.success ? (result.preview ? 'bg-blue-50 border border-blue-200' : 'bg-green-50 border border-green-200') : 'bg-red-50 border border-red-200'}`}>
            {result.success
              ? result.preview
                ? <AlertCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                : <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
              : <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />}
            <div className="min-w-0">
              <p className={`font-medium ${result.success ? (result.preview ? 'text-blue-800' : 'text-green-800') : 'text-red-700'}`}>
                {result.message || result.error}
              </p>
              {result.preview && result.emailPreview && (
                <div className="mt-2 text-xs text-blue-600 space-y-0.5">
                  <p>Would send to: <span className="font-medium">{result.emailPreview.recipients.join(', ')}{result.emailPreview.totalRecipients > 5 ? ` + ${result.emailPreview.totalRecipients - 5} more` : ''}</span></p>
                  <p className="text-blue-500 mt-1">To enable real email sending, add SMTP_HOST, SMTP_USER, SMTP_PASS, and SMTP_FROM to your Replit Secrets.</p>
                </div>
              )}
              {result.errors && result.errors.length > 0 && (
                <ul className="mt-1 text-xs text-red-600 space-y-0.5">
                  {result.errors.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          <p className="text-xs text-gray-400">
            {!process.env.SMTP_HOST ? 'No SMTP configured — sends a preview only' : ''}
          </p>
          <button
            onClick={handleSend}
            disabled={sending || !subject.trim() || !body.trim() || subscriberCount === 0}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            {sending ? (
              <><span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />Sending…</>
            ) : (
              <><Send className="h-4 w-4" />Send to {subscriberCount} subscriber{subscriberCount !== 1 ? 's' : ''}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DigestPanel;
