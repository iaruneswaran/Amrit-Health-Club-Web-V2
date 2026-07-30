import React, { useState } from 'react';
import continueArrow from '../assets/Continue Arrow.svg';
import AppointmentCard from './AppointmentCard';
import AdmissionCard from './AdmissionCard';
import ConsultationDetailPage from './ConsultationDetailPage';

export default function HistoryPage({ onBack, onSelectIP, onBookAppointment }) {
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const handleUpcomingClick = () => {
    setSelectedConsultation({
      doctorName: 'Dr. Amelia Carter',
      specialty: 'Cardiology Specialist',
      date: 'Tomorrow, 10:30 AM',
      isUpcoming: true
    });
  };

  const handlePastClick = () => {
    setSelectedConsultation({
      doctorName: 'Dr. Amelia Carter',
      specialty: 'Cardiology Specialist',
      date: '15 Jul 2026, 10:30 AM',
      isUpcoming: false
    });
  };

  if (selectedConsultation) {
    return (
      <ConsultationDetailPage 
        consultation={selectedConsultation} 
        onBack={() => setSelectedConsultation(null)} 
        onBookAppointment={onBookAppointment}
      />
    );
  }

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
          {/* Upcoming Appointment */}
          <div className="section-group">
            <p className="section-title">Upcoming Appointment</p>
            <div onClick={handleUpcomingClick} style={{ cursor: 'pointer' }}>
              <AppointmentCard 
                onActionClick={() => onBookAppointment && onBookAppointment({ name: 'Dr. Amelia Carter', specialty: 'Cardiology Specialist', hospital: "St. Mary's Medical", fee: '₹500' })}
                onSecondaryClick={() => setSelectedConsultation({
                  doctorName: 'Dr. Amelia Carter',
                  specialty: 'Cardiology Specialist',
                  date: 'Tomorrow, 10:30 AM',
                  isUpcoming: true,
                  initialTab: 'prescription'
                })}
              />
            </div>
          </div>

          {/* Admission Overview */}
          <div className="section-group">
            <p className="section-title">Admission Overview</p>
            <AdmissionCard onCardClick={onSelectIP} />
          </div>

          {/* Past Appointment */}
          <div className="section-group">
            <p className="section-title">Past appointment</p>
            <div onClick={handlePastClick} style={{ cursor: 'pointer' }}>
              <AppointmentCard 
                isPast={true} 
                showImage={false} 
                onActionClick={() => onBookAppointment && onBookAppointment({ name: 'Dr. Amelia Carter', specialty: 'Cardiology Specialist', hospital: "St. Mary's Medical", fee: '₹500' })}
                onSecondaryClick={() => setSelectedConsultation({
                  doctorName: 'Dr. Amelia Carter',
                  specialty: 'Cardiology Specialist',
                  date: '15 Jul 2026, 10:30 AM',
                  isUpcoming: false,
                  initialTab: 'prescription'
                })}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
