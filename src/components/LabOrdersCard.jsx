import React from 'react';
import laboratoryIcon from '../assets/Laboratory.svg';
import documentIcon from '../assets/Document.svg';

export default function LabOrdersCard({ onBookLabTest }) {
  return (
    <div className="medication-card" style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #F2F4F7', padding: '20px', marginTop: '0', boxSizing: 'border-box' }}>
      <div className="medication-card-body" style={{ padding: 0 }}>
        {/* Title Header Row */}
        <div className="medication-header-title-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <img 
            src={laboratoryIcon} 
            alt="Laboratory Orders" 
            style={{ 
              width: '20px', 
              height: '20px',
              filter: 'brightness(0) saturate(100%) invert(73%) sepia(29%) saturate(836%) hue-rotate(356deg) brightness(92%) contrast(85%)'
            }} 
          />
          <h3 className="medication-card-title" style={{ fontSize: '18px', fontWeight: '500', color: '#000000', margin: 0 }}>
            Laboratory Orders
          </h3>
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

        {/* 2 PDF Prescription / Requisition Document Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* File 1 */}
          <div 
            className="report-doc-card" 
            onClick={onBookLabTest}
            style={{ cursor: 'pointer', margin: 0, border: '1px solid #F2F4F7' }}
          >
            <div className="report-doc-left">
              <div className="report-icon-wrapper">
                <img src={documentIcon} alt="Document" className="report-summary-icon" />
              </div>
              <div className="report-doc-details">
                <p className="report-doc-name" title="Lab-Requisition-Order-01.pdf">
                  Lab-Requisition-Order-01.pdf
                </p>
                <p className="report-doc-meta" style={{ margin: '3px 0 0 0' }}>Aug 5, 2026 &bull; 1.85 MB &bull; PDF</p>
                <p style={{ fontSize: '13px', color: '#CCA266', fontWeight: '600', margin: '4px 0 0 0' }}>
                  Lab Test (14 Tests)
                </p>
              </div>
            </div>
          </div>

          {/* File 2 */}
          <div 
            className="report-doc-card" 
            onClick={onBookLabTest}
            style={{ cursor: 'pointer', margin: 0, border: '1px solid #F2F4F7' }}
          >
            <div className="report-doc-left">
              <div className="report-icon-wrapper">
                <img src={documentIcon} alt="Document" className="report-summary-icon" />
              </div>
              <div className="report-doc-details">
                <p className="report-doc-name" title="Lab-Requisition-Order-02.pdf">
                  Lab-Requisition-Order-02.pdf
                </p>
                <p className="report-doc-meta" style={{ margin: '3px 0 0 0' }}>Aug 5, 2026 &bull; 2.10 MB &bull; PDF</p>
                <p style={{ fontSize: '13px', color: '#CCA266', fontWeight: '600', margin: '4px 0 0 0' }}>
                  Lab Test (3 Tests)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #F2F4F7' }}>
          <button
            type="button"
            onClick={onBookLabTest}
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
              justifyContent: 'center'
            }}
          >
            Book Lab Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
