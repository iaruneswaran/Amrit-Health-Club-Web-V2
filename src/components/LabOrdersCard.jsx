import React from 'react';
import labIcon from '../assets/Lab.svg';

export default function LabOrdersCard({ onBookLabTest }) {
  return (
    <div className="medication-card" style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #F2F4F7', padding: '20px', marginTop: '0', boxSizing: 'border-box' }}>
      <div className="medication-card-body" style={{ padding: 0 }}>
        {/* Title Header Row */}
        <div className="medication-header-title-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1.5px dashed #F2F4F7' }}>
          <img src={labIcon} alt="Lab Orders" style={{ width: '20px', height: '20px' }} />
          <h3 className="medication-card-title" style={{ fontSize: '18px', fontWeight: '500', color: '#000000', margin: 0 }}>
            Laboratory Orders
          </h3>
        </div>

        {/* List of Recommended Tests matching MedicationCard style */}
        <div className="medication-list">
          {/* Test 1 */}
          <div className="medication-item" style={{ padding: '0 12px' }}>
            <div className="medication-info" style={{ width: '100%', gap: '4px' }}>
              <p className="medication-name" style={{ fontSize: '15px', fontWeight: '500', color: '#000000', margin: 0 }}>
                Complete Blood Count (CBC)
              </p>
              <p className="medication-details" style={{ fontSize: '13px', fontWeight: '500', color: '#555555', margin: 0 }}>
                14 Parameters • Fasting not required
              </p>
            </div>
          </div>

          <hr className="medication-divider" style={{ border: 'none', borderTop: '1px solid #F2F4F7', margin: '12px 0' }} />

          {/* Test 2 */}
          <div className="medication-item" style={{ padding: '0 12px' }}>
            <div className="medication-info" style={{ width: '100%', gap: '4px' }}>
              <p className="medication-name" style={{ fontSize: '15px', fontWeight: '500', color: '#000000', margin: 0 }}>
                Lipid Profile & Fasting Blood Sugar
              </p>
              <p className="medication-details" style={{ fontSize: '13px', fontWeight: '500', color: '#555555', margin: 0 }}>
                Cholesterol, HDL, LDL, Fasting Sugar • 10-12 Hrs Fasting Req.
              </p>
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
            Book Doctor Recommended Tests
          </button>
        </div>
      </div>
    </div>
  );
}
