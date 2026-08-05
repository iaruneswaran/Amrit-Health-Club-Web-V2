import React, { useState, useEffect } from 'react';
import continueArrow from '../assets/Continue Arrow.svg';
import documentIcon from '../assets/Document.svg';
import bookingIcon from '../assets/Booking.svg';
import PrescriptionPdfViewModal from './PrescriptionPdfViewModal';

export default function ConsultationDetailPage({ consultation, onBack, onBookAppointment }) {
  const isUpcoming = consultation?.isUpcoming || false;
  const [showPrescriptionPdf, setShowPrescriptionPdf] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const doctorName = consultation?.doctorName || 'Dr. Amelia Carter';
  const specialty = consultation?.specialty || 'Cardiology Specialist';
  const date = consultation?.date || (isUpcoming ? 'Tomorrow, 10:30 AM' : '15 Jul 2026, 10:30 AM');

  const handleBookingTrigger = () => {
    if (onBookAppointment) {
      onBookAppointment({
        name: doctorName,
        specialty: specialty,
        hospital: "St. Mary's Medical",
        rating: 4.9,
        experience: '12 yrs exp',
        fee: '₹500'
      });
    }
  };

  return (
    <div className="doctors-page-container" style={{ minHeight: '100vh', backgroundColor: '#F2F4F7' }}>
      {/* Top Header Section */}
      <header className="doctors-header" style={{ padding: '0 0 16px 0', backgroundColor: 'transparent', position: 'sticky', top: 0, zIndex: 20 }}>
        <div className="doctors-title-row" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            className="doctors-back-btn" 
            onClick={onBack} 
            aria-label="Go back to history"
            style={{ border: 'none', cursor: 'pointer', padding: '4px' }}
          >
            <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '18px', height: '16px' }} />
          </button>
          <h1 className="doctors-page-title" style={{ fontSize: '18px', fontWeight: '500', color: '#000000', margin: 0 }}>
            {isUpcoming ? 'Upcoming Visit Details' : 'Consultation Details'}
          </h1>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ padding: '0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {/* Doctor & Status Hero Card */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '18px', border: '1px solid #F2F4F7', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ 
              fontSize: '13px', 
              fontWeight: '500', 
              color: '#CCA266', 
              padding: '0', 
              textTransform: 'none', 
              letterSpacing: '0.5px',
              display: 'inline-block' 
            }}>
              {isUpcoming ? 'Confirmed • Scheduled' : 'Completed Consultation'}
            </span>
            <span style={{ fontSize: '13px', color: '#555555', fontWeight: '500' }}>Ref: {isUpcoming ? 'APT-84291' : 'CON-98412'}</span>
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: '500', color: '#000000', margin: '4px 0 2px 0' }}>
            {doctorName}
          </h2>
          <p style={{ fontSize: '13px', color: '#555555', margin: '0 0 10px 0', fontWeight: '500' }}>
            {specialty}
          </p>
          <p style={{ fontSize: '13px', color: '#555555', fontWeight: '500', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <img src={bookingIcon} alt="Calendar" style={{ width: '16px', height: '16px' }} />
            <span>{date}</span>
          </p>

          {/* Action Button */}
          <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #F2F4F7', display: 'flex', gap: '10px' }}>
            <button
              onClick={handleBookingTrigger}
              style={{
                flex: 1,
                height: '44px',
                borderRadius: '22px',
                backgroundColor: '#CCA266',
                color: '#FFFFFF',
                fontWeight: '500',
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(204, 162, 102, 0.2)'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {isUpcoming ? 'Reschedule Appointment' : 'Book Follow-Up Appointment'}
            </button>
          </div>
        </div>

        {/* Prescription PDF Section with Heading */}
        <div style={{ marginTop: '6px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#000000', margin: '0 0 10px 4px' }}>
            Prescription Document
          </h3>
          <div 
            onClick={() => setShowPrescriptionPdf(true)}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '16px 18px',
              border: '1px solid #F2F4F7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                backgroundColor: 'rgba(204, 162, 102, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <img src={documentIcon} alt="PDF Document" style={{ width: '20px', height: '20px' }} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '15px', fontWeight: '500', color: '#000000' }}>
                  Prescription PDF Document
                </p>
                <p style={{ margin: '3px 0 0 0', fontSize: '13px', color: '#555555', fontWeight: '500' }}>
                  Rx-{isUpcoming ? '84291' : '98412'} • 1.4 MB • PDF
                </p>
              </div>
            </div>
            <span style={{
              backgroundColor: '#CCA266',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: '500',
              padding: '6px 14px',
              borderRadius: '100px',
              flexShrink: 0
            }}>
              View PDF
            </span>
          </div>
        </div>
      </main>

      {/* Full Page Prescription PDF View */}
      {showPrescriptionPdf && (
        <PrescriptionPdfViewModal 
          doctorName={doctorName}
          date={date}
          onClose={() => setShowPrescriptionPdf(false)} 
        />
      )}
    </div>
  );
}
