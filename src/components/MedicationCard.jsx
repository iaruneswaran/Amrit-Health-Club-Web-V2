import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import markedIcon from '../assets/Marked.svg';
import unmarkedIcon from '../assets/Un Marked.svg';
import medicationBg from '../assets/Medication Image.jpg';

const medications = [
  {
    id: 1,
    name: 'Amoxicillin 250mg',
    details: '1 Capsule • Twice a day • Before Meals • 5 Days'
  },
  {
    id: 2,
    name: 'Amoxicillin 250mg',
    details: '1 Capsule • Twice a day • Before Meals • 5 Days'
  },
  {
    id: 3,
    name: 'Amoxicillin 250mg',
    details: '1 Capsule • Twice a day • Before Meals • 5 Days'
  }
];

export default function MedicationCard() {
  const [markedMeds, setMarkedMeds] = useState({
    1: true,
    2: false,
    3: false
  });
  const [selectedMed, setSelectedMed] = useState(null);

  useEffect(() => {
    if (selectedMed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedMed]);

  const toggleMarked = (id) => {
    setMarkedMeds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="medication-card">
      <div 
        className="medication-header-bg" 
        style={{ backgroundImage: `url(${medicationBg})` }}
      >
        <div className="medication-header-overlay">
          <div className="medication-header-title-row">
            <svg className="medication-header-icon" width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M9.23647 5.1112L11.0042 3.34343M5.40631 5.40582L11.2989 11.2984M1.87078 14.8339C0.243595 13.2067 0.243595 10.5685 1.87078 8.94136L8.94185 1.87029C10.569 0.243106 13.2072 0.243106 14.8344 1.87029C16.4616 3.49747 16.4616 6.13566 14.8344 7.76285L7.76334 14.8339C6.13615 16.4611 3.49796 16.4611 1.87078 14.8339Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3 className="medication-card-title">Active Medications</h3>
          </div>
        </div>
      </div>
      <div className="medication-card-body">
        <div className="medication-list">
          {medications.map((med, index) => {
            const isMarked = markedMeds[med.id];
            return (
              <React.Fragment key={med.id}>
                <div 
                  className="medication-item" 
                  onClick={() => setSelectedMed(med)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="medication-item-left">
                    <div className="medication-check-btn">
                      <img src={isMarked ? markedIcon : unmarkedIcon} alt="" />
                    </div>
                    <div className="medication-info">
                      <p className="medication-name">{med.name}</p>
                      <p className="medication-details">{med.details}</p>
                    </div>
                  </div>
                </div>
                {index < medications.length - 1 && <hr className="medication-divider" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {selectedMed && createPortal(
        <div className="medication-modal-overlay" onClick={() => setSelectedMed(null)}>
          <div className="medication-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="medication-modal-header">
              <svg className="medication-header-icon" width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M9.23647 5.1112L11.0042 3.34343M5.40631 5.40582L11.2989 11.2984M1.87078 14.8339C0.243595 13.2067 0.243595 10.5685 1.87078 8.94136L8.94185 1.87029C10.569 0.243106 13.2072 0.243106 14.8344 1.87029C16.4616 3.49747 16.4616 6.13566 14.8344 7.76285L7.76334 14.8339C6.13615 16.4611 3.49796 16.4611 1.87078 14.8339Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="medication-card-title">Medication Details</h3>
            </div>
            
            <div className="medication-modal-body">
              <div className="medication-modal-info-row">
                <div className="medication-info">
                  <p className="medication-name">{selectedMed.name}</p>
                  <p className="medication-details">{selectedMed.details}</p>
                </div>
              </div>
              
              <div className="medication-modal-notes">
                <span className="medication-modal-notes-label">Instruction</span>
                <p className="medication-modal-notes-text">No special instructions or notes provided</p>
              </div>
              
              <div className="medication-modal-actions">
                <button className="medication-modal-btn btn-close" onClick={() => setSelectedMed(null)}>
                  Close
                </button>
                <button 
                  className="medication-modal-btn btn-take" 
                  onClick={() => {
                    toggleMarked(selectedMed.id);
                    setSelectedMed(null);
                  }}
                  disabled={markedMeds[selectedMed.id]}
                >
                  {markedMeds[selectedMed.id] ? "Taken" : "Mark as taken"}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
