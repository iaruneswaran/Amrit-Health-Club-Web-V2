import React, { useState } from 'react';
import continueArrow from '../assets/Continue Arrow.svg';

const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
];

export default function LanguagePage({ onBack }) {
  const [selected, setSelected] = useState('en');
  const [search, setSearch] = useState('');

  const filtered = LANGUAGES.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.native.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F2F4F7' }}>
      {/* Header */}
      <div style={{ background: 'transparent', padding: '20px 12px 16px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 100 }}>
        <button onClick={onBack} style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'transform 0.2s ease' }}>
          <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '16px', height: '14px' }} />
        </button>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '500', color: '#000000' }}>Language</h1>
      </div>

      <div style={{ padding: '0 16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search language..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', background: '#FFFFFF', border: '1.5px solid #E5E7EB', borderRadius: '14px', padding: '13px 14px 13px 40px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Currently selected banner */}
        <div style={{ background: 'rgba(204,162,102,0.1)', borderRadius: '16px', padding: '14px 16px', border: '1.5px solid #CCA266', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ margin: 0, fontSize: '13px', color: '#CCA266', fontWeight: '500' }}>Current language</p>
            <p style={{ margin: '3px 0 0', fontSize: '16px', fontWeight: '700', color: '#000000' }}>
              {LANGUAGES.find(l => l.code === selected)?.name}
              <span style={{ fontSize: '14px', color: '#555555', fontWeight: '500', marginLeft: '8px' }}>
                {LANGUAGES.find(l => l.code === selected)?.native}
              </span>
            </p>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Language List */}
        <div style={{ background: '#FFFFFF', borderRadius: '20px', overflow: 'hidden' }}>
          {filtered.map((lang, i) => (
            <div key={lang.code}>
              <button
                onClick={() => setSelected(lang.code)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '16px 18px', background: selected === lang.code ? 'rgba(204,162,102,0.07)' : '#FFFFFF', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              >
                <div>
                  <p style={{ margin: 0, fontSize: '15px', fontWeight: selected === lang.code ? '700' : '500', color: '#000000' }}>{lang.name}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#555555', fontWeight: '400' }}>{lang.native}</p>
                </div>
                {selected === lang.code && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
              {i < filtered.length - 1 && <div style={{ height: '1px', background: '#F2F4F7', margin: '0 16px' }} />}
            </div>
          ))}
          {filtered.length === 0 && (
            <p style={{ margin: 0, padding: '20px', textAlign: 'center', color: '#555555', fontSize: '14px' }}>No language found</p>
          )}
        </div>

        {/* Apply */}
        <button onClick={onBack} style={{ background: '#CCA266', color: '#FFFFFF', border: 'none', borderRadius: '100px', padding: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', width: '100%' }}>
          Apply Language
        </button>
      </div>
    </div>
  );
}
