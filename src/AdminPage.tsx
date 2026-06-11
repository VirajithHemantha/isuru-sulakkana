import React, { useState } from 'react';
import { Copy, Link as LinkIcon, CheckCircle } from 'lucide-react';

const PREFIXES = [
  'Mr.',
  'Mrs.',
  'Mr. & Mrs.',
  'Ms.',
  'Miss',
  'Dr.',
  'Prof.',
  'Rev.'
];

export function AdminPage() {
  const [prefix, setPrefix] = useState('Mr. & Mrs.');
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!guestName.trim()) return;
    
    const baseUrl = window.location.origin;
    const params = new URLSearchParams();
    params.set('prefix', prefix);
    params.set('name', guestName.trim());
    
    const link = `${baseUrl}/?${params.toString()}`;
    setGeneratedLink(link);
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-brand-ivory py-12 px-4 sm:px-6 lg:px-8 font-sans text-stone-800 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgba(176,137,104,0.15)] overflow-hidden border border-brand-beige/50">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display tracking-wide mb-2 text-stone-800">Link Generator</h2>
            <p className="text-stone-500 font-sans text-sm uppercase tracking-[0.2em]">Create personalized invitation links</p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="prefix" className="block text-sm font-medium text-stone-700 mb-1 tracking-wide">
                Prefix
              </label>
              <select
                id="prefix"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-brand-beige focus:ring-2 focus:ring-brand-beige-deep focus:border-transparent outline-none transition-all bg-white font-sans"
              >
                {PREFIXES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="guestName" className="block text-sm font-medium text-stone-700 mb-1 tracking-wide">
                Guest Name
              </label>
              <input
                type="text"
                id="guestName"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full px-4 py-3 rounded-lg border border-brand-beige focus:ring-2 focus:ring-brand-beige-deep focus:border-transparent outline-none transition-all bg-white font-sans"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!guestName.trim()}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-beige-deep text-white font-sans text-sm tracking-[0.2em] uppercase shadow-lg hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              <LinkIcon className="w-5 h-5" />
              Generate Link
            </button>

            {generatedLink && (
              <div className="mt-8 p-4 bg-brand-ivory rounded-xl border border-brand-beige/50 animate-in fade-in slide-in-from-bottom-2">
                <p className="text-sm text-stone-600 mb-2 font-medium tracking-wide">Generated Link:</p>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    readOnly
                    value={generatedLink}
                    className="flex-1 w-full px-3 py-2 text-sm bg-white border border-brand-beige/50 rounded-md focus:outline-none text-stone-600 font-sans"
                  />
                  <button
                    onClick={handleCopy}
                    className="flex-shrink-0 p-2 text-brand-beige-deep hover:bg-brand-beige/20 rounded-md transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? <CheckCircle className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
