import React, { useState } from 'react';
import medicationBg from '../assets/Medication Image.jpg';

const medications = [
  {
    id: 1,
    name: 'Amoxicillin 250mg',
    details: '1 Capsule • Twice a day • Before Meals • 5 Days',
    instruction: 'No special instructions or notes provided'
  },
  {
    id: 2,
    name: 'Amoxicillin 250mg',
    details: '1 Capsule • Twice a day • Before Meals • 5 Days',
    instruction: 'No special instructions or notes provided'
  },
  {
    id: 3,
    name: 'Amoxicillin 250mg',
    details: '1 Capsule • Twice a day • Before Meals • 5 Days',
    instruction: 'No special instructions or notes provided'
  }
];

export default function MedicationCard({ showImage = true, onOrderMedications }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="medication-card">
      {showImage && (
        <div
          className="medication-header-bg"
          style={{ backgroundImage: `url(${medicationBg})` }}
        />
      )}
      <div className="medication-card-body">
        <div className="medication-header-title-row">
          <svg className="medication-header-icon" width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M9.23647 5.1112L11.0042 3.34343M5.40631 5.40582L11.2989 11.2984M1.87078 14.8339C0.243595 13.2067 0.243595 10.5685 1.87078 8.94136L8.94185 1.87029C10.569 0.243106 13.2072 0.243106 14.8344 1.87029C16.4616 3.49747 16.4616 6.13566 14.8344 7.76285L7.76334 14.8339C6.13615 16.4611 3.49796 16.4611 1.87078 14.8339Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3 className="medication-card-title">Active Medications</h3>
        </div>

        <div className="medication-list">
          {medications.map((med, index) => {
            const isOpen = expandedId === med.id;
            return (
              <React.Fragment key={med.id}>
                <div
                  className="medication-item"
                  onClick={() => toggleExpand(med.id)}
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                >
                  <div className="medication-item-left" style={{ width: '100%' }}>
                    <div className="medication-info" style={{ width: '100%' }}>
                      <p className="medication-name">{med.name}</p>
                      <p className="medication-details">{med.details}</p>
                      {isOpen && (
                        <div style={{
                          marginTop: '8px',
                          padding: '10px 12px',
                          background: 'rgba(204,162,102,0.07)',
                          borderRadius: '10px',
                          fontSize: '13px',
                          color: '#555555',
                          fontWeight: '500',
                          lineHeight: '1.5'
                        }}>
                          {med.instruction}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {index < medications.length - 1 && <hr className="medication-divider" />}
              </React.Fragment>
            );
          })}
        </div>

        {onOrderMedications && (
          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #F2F4F7' }}>
            <button
              type="button"
              onClick={onOrderMedications}
              style={{
                width: '100%',
                height: '50px',
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
              Order Prescribed Medications
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
