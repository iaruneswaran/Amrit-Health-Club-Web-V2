import React, { useState } from 'react';
import continueArrow from '../assets/Continue Arrow.svg';
import markedIcon from '../assets/Marked.svg';
import uploadDocIcon from '../assets/Upload Document.svg';
import UploadReportModal from './UploadReportModal';

export default function UploadIntroPage({ onBack, onUploadSuccess }) {
  const [showUploadModal, setShowUploadModal] = useState(false);

  const benefits = [
    "Get your personalized Health Score",
    "Understand your current health condition",
    "Detect potential health risks early",
    "Receive tailored health recommendations",
    "Track your health progress over time"
  ];

  return (
    <div 
      style={{
        width: '100%',
        maxWidth: '430px',
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxSizing: 'border-box'
      }}
    >
      {/* Header */}
      <header 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          backgroundColor: '#FFFFFF',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}
      >
        <button
          onClick={onBack}
          aria-label="Go back"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            border: 'none',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0
          }}
        >
          <img 
            src={continueArrow} 
            alt="Back" 
            style={{ transform: 'rotate(180deg)', width: '16px', height: '14px' }} 
          />
        </button>
        <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#000000' }}>
          Upload Medical Reports
        </h1>
      </header>

      {/* Main Content Body */}
      <main style={{ flex: 1, padding: '24px 20px 120px', overflowY: 'auto' }}>
        
        {/* Top Hero Icon Badge */}
        <div 
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#CCA266',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            boxShadow: '0 8px 20px rgba(204, 162, 102, 0.25)'
          }}
        >
          <img src={uploadDocIcon} alt="" style={{ width: '32px', height: '32px' }} />
        </div>

        {/* Title */}
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#000000', margin: '0 0 12px 0', lineHeight: '1.3', letterSpacing: '-0.3px' }}>
          Know Your Health Before You Begin
        </h2>

        {/* Intro Paragraph */}
        <p style={{ fontSize: '14px', color: '#555555', lineHeight: '1.55', margin: '0 0 24px 0' }}>
          Your Health Score is calculated based on your medical reports. Uploading your latest reports helps us understand your current health condition and provide accurate, personalized insights.
        </p>

        {/* Why Upload Reports Card */}
        <div 
          style={{
            backgroundColor: '#FFFDF9',
            borderRadius: '20px',
            border: '1px solid #F0E6D8',
            padding: '20px',
            marginBottom: '24px'
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#000000', margin: '0 0 16px 0' }}>
            Why upload your reports?
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {benefits.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <img src={markedIcon} alt="" style={{ width: '20px', height: '20px', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#000000', lineHeight: '1.4' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight Note */}
        <div 
          style={{
            backgroundColor: '#F9FAFB',
            borderRadius: '16px',
            border: '1px solid #E5E7EB',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <p style={{ margin: 0, fontSize: '13px', fontWeight: '500', color: '#555555', lineHeight: '1.45' }}>
            For the most accurate Health Score, upload your latest medical reports.
          </p>
        </div>
      </main>

      {/* Fixed Bottom Action CTA Buttons */}
      <footer 
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '430px',
          backgroundColor: '#FFFFFF',
          padding: '16px 20px 24px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 100
        }}
      >
        <button
          type="button"
          onClick={() => setShowUploadModal(true)}
          style={{
            width: '100%',
            height: '48px',
            backgroundColor: '#CCA266',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Upload Reports
        </button>

        <button
          type="button"
          onClick={onBack}
          style={{
            width: '100%',
            height: '48px',
            backgroundColor: '#FFFFFF',
            color: '#555555',
            border: '1px solid #E5E7EB',
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Maybe Later
        </button>
      </footer>

      {/* Upload Modal Trigger */}
      <UploadReportModal 
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUploadSuccess={(newDoc) => {
          if (onUploadSuccess) onUploadSuccess(newDoc);
          setShowUploadModal(false);
          onBack();
        }}
      />
    </div>
  );
}
