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
          <div style={{ width: '40px', height: '4px', borderRadius: '2px', backgroundColor: '#F2F4F7' }} />
        </div>

        {/* Header Row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className={`report-badge ${isIssue ? 'issues' : 'normal'}`} style={{ margin: 0, fontWeight: '500' }}>
                {isIssue ? '2 Issues Detected' : 'Normal Report'}
              </span>
              <span style={{ fontSize: '13px', color: '#555555', fontWeight: '500' }}>Lab Ref: SAP-98241</span>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#000000', margin: 0, lineHeight: '1.3' }}>
              {doc.name}
            </h3>
            <p style={{ fontSize: '13px', color: '#555555', margin: '4px 0 0 0' }}>
              Sterling Accuris Pathology Lab • Today, 9:30 AM • {doc.size}
            </p>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: '#F2F4F7',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              color: '#000000',
              flexShrink: 0
            }}
          >
            &times;
          </button>
        </div>

        <hr style={{ border: 'none', borderBottom: '1px solid #F2F4F7', margin: '14px 0' }} />

        {/* Dynamic Report Content */}
        {isIssue ? (
          <div>
            {/* Attention Banner */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #FFFFFF', borderRadius: '16px', padding: '14px 16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px',color: '#555555', fontWeight: '500', fontSize: '13px', marginBottom: '4px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span>Attention Required (2 Abnormal Values)</span>
              </div>
              <p style={{ fontSize: '13px',color: '#555555', margin: 0, lineHeight: '1.4' }}>
                Inflammatory markers elevated above reference limits. Clinical correlation recommended.
              </p>
            </div>

            {/* Abnormal Values list */}
            <h4 style={{ fontSize: '13px', fontWeight: '500', color: '#555555', textTransform: 'none', letterSpacing: '0.5px', marginBottom: '10px' }}>
              Abnormal Test Results
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #F2F4F7', borderRadius: '14px', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: '500', fontSize: '14px', color: '#000000' }}>WBC Count (Total Leucocytes)</p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#555555' }}>Ref Range: 4,000 - 11,000 /µL</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '15px', fontWeight: '500',color: '#000000' }}>14,200 /µL</span>
                  <span style={{ display: 'block', fontSize: '13px',color: '#555555', fontWeight: '500' }}>HIGH ↑</span>
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #F2F4F7', borderRadius: '14px', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: '500', fontSize: '14px', color: '#000000' }}>C-Reactive Protein (CRP)</p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#555555' }}>Ref Range: &lt; 5.0 mg/L</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '15px', fontWeight: '500',color: '#000000' }}>28.5 mg/L</span>
                  <span style={{ display: 'block', fontSize: '13px',color: '#555555', fontWeight: '500' }}>HIGH ↑</span>
                </div>
              </div>
            </div>

            {/* Normal Findings */}
            <h4 style={{ fontSize: '13px', fontWeight: '500', color: '#555555', textTransform: 'none', letterSpacing: '0.5px', marginBottom: '8px' }}>
              Normal Parameters
            </h4>
            <ul style={{ margin: '0 0 16px 0', paddingLeft: '18px', fontSize: '13px', color: '#555555', lineHeight: '1.6' }}>
              <li>Hemoglobin: <strong>14.2 g/dL</strong> (Normal)</li>
              <li>Platelet Count: <strong>240,000 /µL</strong> (Normal)</li>
              <li>Serum Creatinine: <strong>0.9 mg/dL</strong> (Normal)</li>
            </ul>

            {/* Doctor Impression */}
            <div style={{ backgroundColor: '#F2F4F7', borderRadius: '14px', padding: '14px', borderLeft: '4px solid #CCA266' }}>
              <span style={{ fontSize: '13px', fontWeight: '500',color: '#555555', textTransform: 'none', letterSpacing: '0.5px' }}>
                Doctor Summary &amp; Impression
              </span>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#555555', lineHeight: '1.4' }}>
                Elevated leucocyte count and CRP indicate acute infection or inflammatory response. Antibiotic therapy recommended.
              </p>
            </div>
          </div>
        ) : (
          <div>
            {/* Normal Banner */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #FFFFFF', borderRadius: '16px', padding: '14px 16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px',color: '#555555', fontWeight: '500', fontSize: '13px', marginBottom: '4px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <span>All Results Normal</span>
              </div>
              <p style={{ fontSize: '13px',color: '#555555', margin: 0, lineHeight: '1.4' }}>
                All tested biomarkers are within standard healthy physiological reference ranges.
              </p>
            </div>

            {/* Tested Parameters Grid */}
            <h4 style={{ fontSize: '13px', fontWeight: '500', color: '#555555', textTransform: 'none', letterSpacing: '0.5px', marginBottom: '10px' }}>
              Tested Biomarkers Overview
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #F2F4F7', borderRadius: '12px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555' }}>Fasting Blood Glucose</span>
                <span style={{ fontSize: '13px', fontWeight: '500',color: '#555555' }}>95 mg/dL (Normal)</span>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #F2F4F7', borderRadius: '12px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555' }}>Serum Electrolytes (Na/K)</span>
                <span style={{ fontSize: '13px', fontWeight: '500',color: '#555555' }}>139 / 4.1 mEq/L</span>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #F2F4F7', borderRadius: '12px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555' }}>Liver Function (ALT / AST)</span>
                <span style={{ fontSize: '13px', fontWeight: '500',color: '#555555' }}>22 / 24 U/L (Normal)</span>
              </div>
            </div>

            {/* Doctor Impression */}
            <div style={{ backgroundColor: '#F2F4F7', borderRadius: '14px', padding: '14px', borderLeft: '4px solid #CCA266' }}>
              <span style={{ fontSize: '13px', fontWeight: '500',color: '#555555', textTransform: 'none', letterSpacing: '0.5px' }}>
                Clinical Impression
              </span>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#555555', lineHeight: '1.4' }}>
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
            backgroundColor: '#CCA266',
            color: '#FFFFFF',
            fontWeight: '500',
            fontSize: '15px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(204, 162, 102, 0.25)'
          }}
        >
          Close Summary
        </button>
      </div>
    </div>,
    document.body
  );
}
