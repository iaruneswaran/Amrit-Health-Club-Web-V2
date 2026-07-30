import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ReportSummaryModal({ doc, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!doc) return null;

  const isIssue = doc.status === 'issues' || doc.badge === '2 Issues';

  return createPortal(
    <div 
      className="report-modal-overlay" 
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(3px)',
        zIndex: 1000,
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
          boxShadow: '0 -10px 40px rgba(0,0,0,0.2)',
          maxHeight: '85vh',
          overflowY: 'auto'
        }}
      >
        {/* Top Drag Indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <div style={{ width: '40px', height: '4px', borderRadius: '2px', backgroundColor: '#E5E7EB' }} />
        </div>

        {/* Header Row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className={`report-badge ${isIssue ? 'issues' : 'normal'}`} style={{ margin: 0, fontWeight: '600' }}>
                {isIssue ? '2 Issues Detected' : 'Normal Report'}
              </span>
              <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: '500' }}>Lab Ref: SAP-98241</span>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0, lineHeight: '1.3' }}>
              {doc.name}
            </h3>
            <p style={{ fontSize: '12px', color: '#6B7280', margin: '4px 0 0 0' }}>
              Sterling Accuris Pathology Lab • Today, 9:30 AM • {doc.size}
            </p>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close modal"
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
              color: '#4B5563',
              flexShrink: 0
            }}
          >
            &times;
          </button>
        </div>

        <hr style={{ border: 'none', borderBottom: '1px solid #F3F4F6', margin: '14px 0' }} />

        {/* Dynamic Report Content */}
        {isIssue ? (
          <div>
            {/* Attention Banner */}
            <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: '16px', padding: '14px 16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D97706', fontWeight: '600', fontSize: '13px', marginBottom: '4px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span>Attention Required (2 Abnormal Values)</span>
              </div>
              <p style={{ fontSize: '12px', color: '#78350F', margin: 0, lineHeight: '1.4' }}>
                Inflammatory markers elevated above reference limits. Clinical correlation recommended.
              </p>
            </div>

            {/* Abnormal Values list */}
            <h4 style={{ fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
              Abnormal Test Results
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '14px', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: '600', fontSize: '14px', color: '#111827' }}>WBC Count (Total Leucocytes)</p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#6B7280' }}>Ref Range: 4,000 - 11,000 /µL</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#DC2626' }}>14,200 /µL</span>
                  <span style={{ display: 'block', fontSize: '11px', color: '#DC2626', fontWeight: '600' }}>HIGH ↑</span>
                </div>
              </div>

              <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '14px', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: '600', fontSize: '14px', color: '#111827' }}>C-Reactive Protein (CRP)</p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#6B7280' }}>Ref Range: &lt; 5.0 mg/L</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#DC2626' }}>28.5 mg/L</span>
                  <span style={{ display: 'block', fontSize: '11px', color: '#DC2626', fontWeight: '600' }}>HIGH ↑</span>
                </div>
              </div>
            </div>

            {/* Normal Findings */}
            <h4 style={{ fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
              Normal Parameters
            </h4>
            <ul style={{ margin: '0 0 16px 0', paddingLeft: '18px', fontSize: '13px', color: '#4B5563', lineHeight: '1.6' }}>
              <li>Hemoglobin: <strong>14.2 g/dL</strong> (Normal)</li>
              <li>Platelet Count: <strong>240,000 /µL</strong> (Normal)</li>
              <li>Serum Creatinine: <strong>0.9 mg/dL</strong> (Normal)</li>
            </ul>

            {/* Doctor Impression */}
            <div style={{ backgroundColor: '#F3F4F6', borderRadius: '14px', padding: '14px', borderLeft: '4px solid #90644b' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#90644b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Doctor Summary &amp; Impression
              </span>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#374151', lineHeight: '1.4' }}>
                Elevated leucocyte count and CRP indicate acute infection or inflammatory response. Antibiotic therapy recommended.
              </p>
            </div>
          </div>
        ) : (
          <div>
            {/* Normal Banner */}
            <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #DCFCE7', borderRadius: '16px', padding: '14px 16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16A34A', fontWeight: '600', fontSize: '13px', marginBottom: '4px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <span>All Results Normal</span>
              </div>
              <p style={{ fontSize: '12px', color: '#15803D', margin: 0, lineHeight: '1.4' }}>
                All tested biomarkers are within standard healthy physiological reference ranges.
              </p>
            </div>

            {/* Tested Parameters Grid */}
            <h4 style={{ fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
              Tested Biomarkers Overview
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Fasting Blood Glucose</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#16A34A' }}>95 mg/dL (Normal)</span>
              </div>
              <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Serum Electrolytes (Na/K)</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#16A34A' }}>139 / 4.1 mEq/L</span>
              </div>
              <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Liver Function (ALT / AST)</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#16A34A' }}>22 / 24 U/L (Normal)</span>
              </div>
            </div>

            {/* Doctor Impression */}
            <div style={{ backgroundColor: '#F3F4F6', borderRadius: '14px', padding: '14px', borderLeft: '4px solid #90644b' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#90644b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Clinical Impression
              </span>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#374151', lineHeight: '1.4' }}>
                Unremarkable laboratory panel. No acute biochemical abnormalities detected.
              </p>
            </div>
          </div>
        )}

        {/* Bottom Close Button */}
        <button
          onClick={onClose}
          style={{
            marginTop: '20px',
            width: '100%',
            height: '48px',
            borderRadius: '24px',
            backgroundColor: '#90644b',
            color: '#FFFFFF',
            fontWeight: '600',
            fontSize: '15px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(144, 100, 75, 0.25)'
          }}
        >
          Close Summary
        </button>
      </div>
    </div>,
    document.body
  );
}
