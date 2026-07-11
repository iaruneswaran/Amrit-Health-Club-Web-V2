import React from 'react';
import continueArrow from '../assets/Continue Arrow.svg';
import AppointmentCard from './AppointmentCard';
import AdmissionCard from './AdmissionCard';

export default function HistoryPage({ onBack }) {
  return (
    <div className="doctors-page-container">
      {/* Top Header Section */}
      <header className="doctors-header">
        <div className="doctors-title-row">
          <button className="doctors-back-btn" onClick={onBack} aria-label="Go back to dashboard">
            <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '16px', height: '14px' }} />
          </button>
          <h1 className="doctors-page-title">Appointment History</h1>
        </div>
      </header>

      {/* History Content Body */}
      <main className="doctors-list-content">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="section-group">
            <p className="section-title">Upcoming Appointment</p>
            <AppointmentCard />
          </div>
          <div className="section-group">
            <p className="section-title">Admission Overview</p>
            <AdmissionCard />
          </div>
          <div className="section-group">
            <p className="section-title">Past appointment</p>
            <AppointmentCard isPast={true} showImage={false} />
          </div>
        </div>
      </main>
    </div>
  );
}
