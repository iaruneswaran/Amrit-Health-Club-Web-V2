import React, { useState } from 'react';
import continueArrow from '../assets/Continue Arrow.svg';
import logoutIcon from '../assets/Log Out.svg';

export default function LogoutPage({ onBack, onConfirm }) {
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.clear();
      window.location.reload();
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F2F4F7', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: 'transparent', padding: '20px 12px 16px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 100 }}>
        <button
          onClick={onBack}
          style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'transform 0.2s ease' }}
        >
          <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '16px', height: '14px' }} />
        </button>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '500', color: '#000000' }}>Log Out</h1>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px 48px' }}>
        {/* Icon */}
        <div style={{ width: '88px', height: '88px', background: '#FFF3E0', borderRadius: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <img src={logoutIcon} alt="Log Out" style={{ width: '40px', height: '40px' }} />
        </div>

        <h2 style={{ margin: '0 0 10px', fontSize: '22px', fontWeight: '700', color: '#000000', textAlign: 'center' }}>Log out of Amrit?</h2>
        <p style={{ margin: '0 0 40px', fontSize: '15px', color: '#555555', textAlign: 'center', lineHeight: '1.6', maxWidth: '280px' }}>
          You'll need to sign in again to access your health records and appointments.
        </p>

        {/* Session info */}
        <div style={{ width: '100%', background: '#FFFFFF', borderRadius: '20px', padding: '16px 20px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#555555' }}>Account</span>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>Ryan Gosling</span>
          </div>
          <div style={{ height: '1px', background: '#F2F4F7' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#555555' }}>Mobile</span>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>+91 9876543210</span>
          </div>
          <div style={{ height: '1px', background: '#F2F4F7' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#555555' }}>Session</span>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#2E7D32' }}>Active</span>
          </div>
        </div>

        {/* Buttons */}
        <button
          onClick={handleLogout}
          disabled={loading}
          style={{ width: '100%', background: loading ? '#E5E7EB' : '#CCA266', color: loading ? '#9CA3AF' : '#FFFFFF', border: 'none', borderRadius: '100px', padding: '15px', fontSize: '16px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '12px', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          {loading ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Logging out...
            </>
          ) : 'Yes, Log Out'}
        </button>

        <button
          onClick={onBack}
          style={{ width: '100%', background: '#FFFFFF', color: '#000000', border: 'none', borderRadius: '100px', padding: '15px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}
        >
          Cancel
        </button>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
