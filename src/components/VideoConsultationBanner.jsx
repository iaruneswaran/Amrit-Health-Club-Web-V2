import React from 'react';
import videoConsultationImg from '../assets/Video Consultation.jpg';

export default function VideoConsultationBanner({ onClick }) {
  return (
    <div 
      className="video-consult-banner" 
      onClick={onClick} 
      role="button" 
      id="video-consultation-banner" 
      aria-label="Start Video Consultation"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        cursor: 'pointer',
        border: '1px solid #F2F4F7',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        marginBottom: 0
      }}
    >
      {/* Top Info Row: Title, 24/7 Service, 12 Doctors Available & Image */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#000000', letterSpacing: '-0.2px' }}>
            Online Consultation
          </h3>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#80D351' }}>
            24/7 Service
          </span>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', fontWeight: '500', color: '#555555' }}>
            12 Doctors Available
          </p>
        </div>

        {/* Right Thumbnail Image */}
        <div style={{
          width: '140px',
          height: '80px',
          borderRadius: '16px',
          overflow: 'hidden',
          flexShrink: 0
        }}>
          <img 
            src={videoConsultationImg} 
            alt="Video Consultation" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }} 
          />
        </div>
      </div>

      {/* Full-width Stroke Button for Book Appointment */}
      <button
        type="button"
        style={{
          width: '100%',
          height: '48px',
          background: '#FFFFFF',
          color: '#CCA266',
          border: '1px solid #CCA266',
          borderRadius: '16px',
          fontSize: '15px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          boxSizing: 'border-box'
        }}
      >
        <span style={{ color: '#CCA266', fontWeight: '600' }}>Book Appointment</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  );
}
