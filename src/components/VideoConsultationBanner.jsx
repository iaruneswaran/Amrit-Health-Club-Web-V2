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
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        cursor: 'pointer',
        border: '1px solid #F2F4F7',
        boxShadow: 'none',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        marginBottom: 0,
        position: 'relative'
      }}
    >
      {/* Left Image Thumbnail */}
      <div style={{
        width: '90px',
        height: '90px',
        borderRadius: '16px',
        overflow: 'hidden',
        flexShrink: 0,
        position: 'relative'
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

      {/* Right Side Contents */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#000000', letterSpacing: '-0.2px', lineHeight: '1.2' }}>
          Online Consultation
        </h3>
        <p style={{ margin: 0, fontSize: '13px', fontWeight: '400', color: '#555555', lineHeight: '1.35' }}>
          Connect with Specialist Doctors
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#CCA266' }}>Book Now</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
