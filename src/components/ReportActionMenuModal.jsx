import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ReportActionMenuModal({ doc, onClose, onViewSummary }) {
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
      onClose();
    }, 1600);
  };

  const handleDownload = () => {
    triggerToast(`Downloading ${doc.name}.pdf...`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: doc.name, text: 'Lab Report from Amrit Health Club' }).catch(() => {});
    } else {
      triggerToast('Report link copied to clipboard!');
    }
  };

  const handleSendDoctor = () => {
    triggerToast('Report sent to Dr. Amelia Carter!');
  };

  const handleArchive = () => {
    triggerToast('Report archived successfully');
  };

  if (!doc) return null;

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
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#1F2937',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: '24px',
          fontSize: '14px',
          fontWeight: '600',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          zIndex: 1200,
          animation: 'fadeIn 0.2s ease'
        }}>
          {toastMessage}
        </div>
      )}

      <div 
        className="report-modal-sheet" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '430px',
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          padding: '20px 20px 28px 20px',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.2)',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}
      >
        {/* Top Drag Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
          <div style={{ width: '40px', height: '4px', borderRadius: '2px', backgroundColor: '#E5E7EB' }} />
        </div>

        {/* Header Info */}
        <div style={{ paddingBottom: '12px', borderBottom: '1px solid #F3F4F6', marginBottom: '12px' }}>
          <p style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {doc.name}
          </p>
          <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#6B7280' }}>
            {doc.time} • {doc.size}
          </p>
        </div>

        {/* Action Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {/* View Summary */}
          <button
            onClick={() => {
              onClose();
              if (onViewSummary) onViewSummary(doc);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px 14px',
              borderRadius: '14px',
              border: 'none',
              backgroundColor: '#F9FAFB',
              color: '#111827',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#90644b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            View Summary &amp; Findings
          </button>

          {/* Download PDF */}
          <button
            onClick={handleDownload}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px 14px',
              borderRadius: '14px',
              border: 'none',
              backgroundColor: 'transparent',
              color: '#374151',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download PDF Report
          </button>

          {/* Share Report */}
          <button
            onClick={handleShare}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px 14px',
              borderRadius: '14px',
              border: 'none',
              backgroundColor: 'transparent',
              color: '#374151',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/>
              <circle cx="6" cy="12" r="3"/>
              <circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            Share Report
          </button>

          {/* Send to Doctor */}
          <button
            onClick={handleSendDoctor}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px 14px',
              borderRadius: '14px',
              border: 'none',
              backgroundColor: 'transparent',
              color: '#374151',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            Send to Attending Doctor
          </button>

          {/* Archive */}
          <button
            onClick={handleArchive}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px 14px',
              borderRadius: '14px',
              border: 'none',
              backgroundColor: 'transparent',
              color: '#DC2626',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              textAlign: 'left',
              marginTop: '4px'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
            Archive Report
          </button>
        </div>

        {/* Cancel Button */}
        <button
          onClick={onClose}
          style={{
            marginTop: '16px',
            width: '100%',
            height: '44px',
            borderRadius: '22px',
            backgroundColor: '#F3F4F6',
            color: '#4B5563',
            fontWeight: '600',
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
      </div>
    </div>,
    document.body
  );
}
