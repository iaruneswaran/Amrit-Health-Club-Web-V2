import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function UploadReportModal({ isOpen, onClose, onUploadSuccess }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Select or drop lab report document');

  useEffect(() => {
    if (!isOpen) {
      setIsUploading(false);
      setUploadProgress(0);
      setStatusMessage('Select or drop lab report document');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      processUpload(file.name, (file.size / (1024 * 1024)).toFixed(2) + ' MB');
    }
  };

  const handleSampleUpload = () => {
    processUpload('Thyroid-Profile-Report-2026.pdf', '4.12 MB');
  };

  const processUpload = (fileName, fileSize) => {
    setIsUploading(true);
    setStatusMessage('Uploading document securely...');
    setUploadProgress(25);

    setTimeout(() => {
      setUploadProgress(65);
      setStatusMessage('Extracting & Analyzing Lab Values...');
    }, 800);

    setTimeout(() => {
      setUploadProgress(100);
      setStatusMessage('Report Upload Complete!');
    }, 1600);

    setTimeout(() => {
      const newDoc = {
        id: Date.now(),
        name: fileName.replace(/\.[^/.]+$/, ""),
        time: 'Just now',
        size: fileSize,
        badge: 'Normal',
        status: 'normal'
      };
      onUploadSuccess(newDoc);
      onClose();
    }, 2000);
  };

  return createPortal(
    <div 
      className="report-modal-overlay" 
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(3px)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}
    >
      <div 
        className="report-modal-sheet" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '430px',
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          padding: '24px 20px 28px 20px',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.2)'
        }}
      >
        {/* Top Drag Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <div style={{ width: '40px', height: '4px', borderRadius: '2px', backgroundColor: '#E5E7EB' }} />
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>
              Upload Lab Report
            </h3>
            <p style={{ fontSize: '12px', color: '#6B7280', margin: '2px 0 0 0' }}>
              Upload PDF or image files (CBC, Lipid, Thyroid, Pathology)
            </p>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: '#F3F4F6',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              color: '#4B5563'
            }}
          >
            &times;
          </button>
        </div>

        {!isUploading ? (
          <div>
            {/* File Drop Box */}
            <label style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed #D1D5DB',
              borderRadius: '16px',
              padding: '28px 16px',
              backgroundColor: '#F9FAFB',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
              marginBottom: '16px'
            }}>
              <input 
                type="file" 
                accept=".pdf,image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#F3EFEA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#90644b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>Click to browse file</span>
              <span style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>Supports PDF, PNG, JPG (Max 25MB)</span>
            </label>

            {/* Quick Demo Upload Button */}
            <button
              onClick={handleSampleUpload}
              style={{
                width: '100%',
                height: '46px',
                borderRadius: '23px',
                backgroundColor: '#90644b',
                color: '#FFFFFF',
                fontWeight: '600',
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(144, 100, 75, 0.2)'
              }}
            >
              Upload Sample Lab Report
            </button>
          </div>
        ) : (
          <div style={{ padding: '20px 0', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#F3EFEA', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#90644b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="2" x2="12" y2="6"/>
                <line x1="12" y1="18" x2="12" y2="22"/>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
                <line x1="2" y1="12" x2="6" y2="12"/>
                <line x1="18" y1="12" x2="22" y2="12"/>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
              </svg>
            </div>
            <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#111827', margin: '0 0 6px 0' }}>
              {statusMessage}
            </h4>

            {/* Progress Bar */}
            <div style={{ width: '100%', height: '8px', borderRadius: '4px', backgroundColor: '#F3F4F6', overflow: 'hidden', margin: '14px 0 8px 0' }}>
              <div style={{ width: `${uploadProgress}%`, height: '100%', backgroundColor: '#90644b', borderRadius: '4px', transition: 'width 0.4s ease' }} />
            </div>
            <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: '500' }}>{uploadProgress}% completed</span>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
