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
    <div className="history-page">
      {/* Title / Header matching Reports page */}
      {onBack ? (
        <header className="doctors-header" style={{ padding: '0 0 16px 0', backgroundColor: 'transparent' }}>
          <div className="doctors-title-row" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="doctors-back-btn" onClick={onBack} aria-label="Go back to dashboard" style={{ border: 'none', cursor: 'pointer', padding: '4px' }}>
              <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '18px', height: '16px' }} />
            </button>
            <h1 className="history-page-title" style={{ margin: 0 }}>
              Appointment History
            </h1>
          </div>
        </header>
      ) : (
        <h2 className="history-page-title">
          Appointment History
        </h2>
      )}

      {/* History Content Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Upcoming */}
        <div className="section-group">
          <p className="section-title">Upcoming</p>
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

        {/* Admitted */}
        <div className="section-group">
          <p className="section-title">Admitted</p>
          <AdmissionCard onCardClick={onSelectIP} />
        </div>

        {/* Past Bookings */}
        <div className="section-group">
          <p className="section-title">Past Bookings</p>
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
    </div>
  );
}
