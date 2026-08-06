import React from 'react';
import documentIcon from '../assets/Document.svg';

export default function MedicationCard({ showImage = false, onOrderMedications }) {
  return (
    <div className="medication-card">
      <div className="medication-card-body">
        <div className="medication-header-title-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <svg className="medication-header-icon" width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M9.23647 5.1112L11.0042 3.34343M5.40631 5.40582L11.2989 11.2984M1.87078 14.8339C0.243595 13.2067 0.243595 10.5685 1.87078 8.94136L8.94185 1.87029C10.569 0.243106 13.2072 0.243106 14.8344 1.87029C16.4616 3.49747 16.4616 6.13566 14.8344 7.76285L7.76334 14.8339C6.13615 16.4611 3.49796 16.4611 1.87078 14.8339Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3 className="medication-card-title" style={{ margin: 0 }}>Active Medications</h3>
        </div>

        {/* Consultation Details Stroke Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #F2F4F7',
          borderRadius: '14px',
          padding: '12px 14px',
          marginBottom: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '15px', fontWeight: '600', color: '#000000' }}>
              Dr. Amelia Carter
            </span>
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#555555' }}>
              Aug 5, 2026
            </span>
          </div>
          <div style={{ fontSize: '14px', color: '#555555' }}>
            Cardiology • St. Mary's Hospital
          </div>
        </div>

        {/* Single Prescription PDF Document Card */}
        <div 
          className="report-doc-card" 
          onClick={onOrderMedications}
          style={{ cursor: 'pointer', margin: 0, border: '1px solid #F2F4F7' }}
        >
          <div className="report-doc-left">
            <div className="report-icon-wrapper">
              <img src={documentIcon} alt="Document" className="report-summary-icon" />
            </div>
            <div className="report-doc-details">
              <p className="report-doc-name" title="Prescription-Dr-Amelia-Carter-Aug2026.pdf">
                Prescription-Dr-Amelia-Carter-Aug2026.pdf
              </p>
              <p className="report-doc-meta" style={{ margin: '3px 0 0 0' }}>Aug 5, 2026 &bull; 2.45 MB &bull; PDF</p>
              <p style={{ fontSize: '13px', color: '#CCA266', fontWeight: '600', margin: '4px 0 0 0' }}>
                Prescription (3 Medicines)
              </p>
            </div>
          </div>
        </div>

        {onOrderMedications && (
          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #F2F4F7' }}>
            <button
              type="button"
              onClick={onOrderMedications}
              style={{
                width: '100%',
                height: '48px',
                background: '#CCA266',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '16px',
                fontSize: '15px',
                fontWeight: '500',
                letterSpacing: '0.1px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.2s ease'
              }}
            >
              Order Medications
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
