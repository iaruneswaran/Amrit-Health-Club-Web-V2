import React from 'react';

const medications = [
  {
    id: 1,
    name: 'Amoxicillin 250mg',
    details: '1 Cap • BID • BFM • 5D',
    time: '10:30 AM, Jun 10',
    nextDose: 'Next 08:30 PM'
  },
  {
    id: 2,
    name: 'Amoxicillin 250mg',
    details: '1 Cap • BID • BFM • 5D',
    time: '10:30 AM, Jun 10',
    nextDose: 'Next 08:30 PM'
  },
  {
    id: 3,
    name: 'Amoxicillin 250mg',
    details: '1 Cap • BID • BFM • 5D',
    time: '10:30 AM, Jun 10',
    nextDose: 'Next 08:30 PM'
  }
];

export default function MedicationCard() {
  return (
    <div className="medication-card">
      <div className="medication-card-header">
        <svg className="medication-header-icon" width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M9.23647 5.1112L11.0042 3.34343M5.40631 5.40582L11.2989 11.2984M1.87078 14.8339C0.243595 13.2067 0.243595 10.5685 1.87078 8.94136L8.94185 1.87029C10.569 0.243106 13.2072 0.243106 14.8344 1.87029C16.4616 3.49747 16.4616 6.13566 14.8344 7.76285L7.76334 14.8339C6.13615 16.4611 3.49796 16.4611 1.87078 14.8339Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h3 className="medication-card-title">Active Medications</h3>
      </div>
      <div className="medication-card-body">
        <div className="medication-list">
          {medications.map((med, index) => (
            <React.Fragment key={med.id}>
              <div className="medication-item">
                <div className="medication-item-left">
                  <div className="medication-check-circle" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12l5 5L20 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="medication-info">
                    <p className="medication-name">{med.name}</p>
                    <p className="medication-details">{med.details}</p>
                  </div>
                </div>
                <div className="medication-item-right">
                  <span className="medication-time">{med.time}</span>
                  <span className="medication-next-dose">{med.nextDose}</span>
                </div>
              </div>
              {index < medications.length - 1 && <hr className="medication-divider" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
