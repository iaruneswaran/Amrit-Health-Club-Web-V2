import React, { useState } from 'react';
import continueArrow from '../assets/Continue Arrow.svg';
import clockIcon from '../assets/Clock Icon.svg';
import markedIcon from '../assets/Marked.svg';
import locationIcon from '../assets/Google Location.svg';
import doctorIcon from '../assets/Assigned doctor.svg';

// Generate next 14 days from today
function generateDates() {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const today = new Date();
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      key: d.toISOString().slice(0, 10),
      day: days[d.getDay()],
      date: d.getDate(),
      month: months[d.getMonth()],
      full: d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    };
  });
}

const dates = generateDates();

const timeSlots = {
  Morning: ['07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM'],
  Afternoon: ['12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM'],
  Evening: ['04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM']
};

export default function LabOrderFlow({ onBack, onBookDoctorFollowup, onViewReports }) {
  // Steps: 1: Select Date, 2: Select Time, 3: Review & Confirm, 4: Collection Scheduled, 5: Sample Collected, 6: Report & Followup
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState('07:30 AM');
  const [collectionMethod, setCollectionMethod] = useState('home'); // 'home' | 'visit'

  const StepHeader = ({ title, onBackPress }) => (
    <header className="booking-step-header">
      <button className="booking-back-btn" onClick={onBackPress} aria-label="Go back">
        <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '16px', height: '14px' }} />
      </button>
      <h1 className="booking-step-title">{title}</h1>
    </header>
  );

  /* STEP 1: SELECT DATE */
  if (step === 1) {
    return (
      <div className="booking-flow-container">
        <StepHeader title="Book Lab Order" onBackPress={onBack} />
        <div className="booking-flow-body">
          <div className="booking-section">
            <h2 className="booking-section-title">Select a Date</h2>
            <div className="booking-date-strip">
              {dates.map(d => (
                <button
                  key={d.key}
                  className={'booking-date-pill' + (selectedDate?.key === d.key ? ' selected' : '')}
                  onClick={() => setSelectedDate(d)}
                  type="button"
                >
                  <span className="date-pill-day">{d.day}</span>
                  <span className="date-pill-num">{d.date}</span>
                </button>
              ))}
            </div>
            {selectedDate && (
              <p className="booking-selected-label">Selected: {selectedDate.full}</p>
            )}
          </div>
        </div>
        <div className="booking-cta-bar">
          <button
            className="booking-cta-btn"
            onClick={() => setStep(2)}
            disabled={!selectedDate}
            type="button"
          >
            Select Time
          </button>
        </div>
      </div>
    );
  }

  /* STEP 2: SELECT TIME */
  if (step === 2) {
    return (
      <div className="booking-flow-container">
        <StepHeader title="Select Time" onBackPress={() => setStep(1)} />
        <div className="booking-flow-body">
          <div className="booking-chosen-date-row">
            <img src={clockIcon} alt="" style={{ width: '18px', height: '18px' }} />
            <span className="booking-chosen-date-text">{selectedDate?.full}</span>
          </div>
          <div className="booking-section">
            <h2 className="booking-section-title">Select a Time Slot</h2>
            {Object.entries(timeSlots).map(([session, slots]) => (
              <div key={session} className="booking-time-group">
                <p className="booking-time-group-label">{session}</p>
                <div className="booking-time-slots-wrap">
                  {slots.map(slot => (
                    <button
                      key={slot}
                      className={'booking-time-slot' + (selectedTime === slot ? ' selected' : '')}
                      onClick={() => setSelectedTime(slot)}
                      type="button"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="booking-cta-bar">
          <button
            className="booking-cta-btn"
            onClick={() => setStep(3)}
            disabled={!selectedTime}
            type="button"
          >
            Review Lab Order
          </button>
        </div>
      </div>
    );
  }

  /* STEP 3: REVIEW & CONFIRM */
  if (step === 3) {
    return (
      <div className="booking-flow-container">
        <StepHeader title="Review & Confirm" onBackPress={() => setStep(2)} />
        <div className="booking-flow-body">
          
          {/* Tests Included Box */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #F2F4F7', padding: '16px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '600', color: '#000000' }}>
              Included Lab Tests (2)
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px dashed #E5E7EB' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src={markedIcon} alt="" style={{ width: '16px', height: '16px' }} />
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>Complete Blood Count (CBC)</span>
                  </div>
                  <p style={{ margin: '4px 0 0 24px', fontSize: '12px', color: '#555555' }}>
                    14 Parameters • Hemoglobin, WBC, Platelets
                  </p>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>₹350</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src={markedIcon} alt="" style={{ width: '16px', height: '16px' }} />
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>Lipid Profile & Fasting Glucose</span>
                  </div>
                  <p style={{ margin: '4px 0 0 24px', fontSize: '12px', color: '#555555' }}>
                    Cholesterol, HDL, LDL, Fasting Sugar • 10-12 hrs fasting
                  </p>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>₹650</span>
              </div>
            </div>
          </div>

          {/* Collection Method Selector (Unwrapped Container) */}
          <div style={{ marginTop: '14px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '600', color: '#000000' }}>
              Select Sample Collection Method
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Full-width Home Collection Button */}
              <button
                type="button"
                onClick={() => setCollectionMethod('home')}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '16px',
                  border: collectionMethod === 'home' ? '1px solid #CCA266' : '1px solid #E5E7EB',
                  backgroundColor: collectionMethod === 'home' ? '#FFFDF9' : '#FFFFFF',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxSizing: 'border-box'
                }}
              >
                <div>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: collectionMethod === 'home' ? '#CCA266' : '#000000', display: 'block' }}>
                    Home Collection
                  </span>
                  <span style={{ fontSize: '13px', color: '#555555', marginTop: '3px', display: 'block' }}>
                    Phlebotomist visits home for sample pickup
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed #E5E7EB' }}>
                    <img src={locationIcon} alt="Pin" style={{ width: '14px', height: '14px' }} />
                    <span style={{ fontSize: '12px', color: '#000000', fontWeight: '500' }}>
                      Flat 402, St. Marys Residency, Ernakulam, Kerala
                    </span>
                  </div>
                </div>
                {/* Icon-only indicator for Home Collection */}
                {collectionMethod === 'home' ? (
                  <img src={markedIcon} alt="Selected" style={{ width: '24px', height: '24px', flexShrink: 0 }} />
                ) : (
                  <span style={{ width: '22px', height: '22px', borderRadius: '50%', border: '1.5px solid #D0D5DD', display: 'inline-block', flexShrink: 0, boxSizing: 'border-box' }} />
                )}
              </button>

              {/* Preferred Hospital Card for Lab Visit */}
              <div 
                className={`hospital-card preferred`} 
                onClick={() => setCollectionMethod('visit')}
                style={{
                  cursor: 'pointer',
                  margin: 0,
                  border: collectionMethod === 'visit' ? '1px solid #CCA266' : '1px solid #E5E7EB',
                  backgroundColor: collectionMethod === 'visit' ? '#FFFDF9' : '#FFFFFF',
                  borderRadius: '16px'
                }}
              >
                <span className="hospital-preferred-badge">Preferred</span>
                
                <div className="hospital-card-header">
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: '#F2F4F7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#CCA266',
                    letterSpacing: '0.5px'
                  }}>
                    SM
                  </div>
                  <div className="hospital-header-details">
                    <h3 className="hospital-card-name">St. Mary's Medical</h3>
                    <div className="hospital-open-row">
                      <img src="/clock-icon.svg" alt="" aria-hidden="true" className="hospital-clock-icon" />
                      <span className="hospital-open-text">Open 24/7 • Visit Center</span>
                    </div>
                  </div>
                </div>

                <div className="hospital-address-container">
                  <img src={locationIcon} alt="Map Location Pin" className="hospital-google-pin" />
                  <p className="hospital-address-text">161B, 1st Floor, 6th Main, 3RD Cross Road, JP Nagar, Bangalore</p>
                </div>

                <div className="hospital-card-footer">
                  <div className="hospital-doctors-count">
                    <span className="count-number">5</span>
                    <span className="count-label">Doctors Available</span>
                  </div>
                  
                  {/* Icon-only indicator for Lab Visit */}
                  {collectionMethod === 'visit' ? (
                    <img src={markedIcon} alt="Selected" style={{ width: '24px', height: '24px', flexShrink: 0 }} />
                  ) : (
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', border: '1.5px solid #D0D5DD', display: 'inline-block', flexShrink: 0, boxSizing: 'border-box' }} />
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Chosen Date & Time Box */}
          <div className="booking-chosen-date-row" style={{ marginTop: '14px' }}>
            <img src={clockIcon} alt="" style={{ width: '18px', height: '18px' }} />
            <span className="booking-chosen-date-text">{selectedDate?.full} at {selectedTime}</span>
          </div>

        </div>

        <div className="booking-cta-bar">
          <button
            className="booking-cta-btn"
            onClick={() => setStep(4)}
            type="button"
          >
            Confirm & Book Lab Order (₹1,000)
          </button>
        </div>
      </div>
    );
  }

  /* STEP 4: CONFIRMED */
  if (step === 4) {
    return (
      <div className="booking-flow-container booking-confirmed-page">
        <div className="booking-confirmed-body">
          <div className="booking-confirmed-check-wrap" style={{ display: 'flex', justifyContent: 'center', margin: '0 auto 20px' }}>
            <img src={markedIcon} alt="Confirmed" style={{ width: '80px', height: '80px', display: 'block' }} />
          </div>
          <h1 className="booking-confirmed-title">Lab Sample Collection Booked!</h1>
          <p className="booking-confirmed-subtitle">
            Your lab sample collection appointment has been successfully confirmed.
          </p>

          <div className="booking-summary-card" style={{ width: '100%' }}>
            <div className="booking-summary-row">
              <span className="booking-summary-label">Appointment ID</span>
              <span className="booking-summary-value">#AHC-LAB-9824</span>
            </div>
            <div className="booking-summary-divider" />
            <div className="booking-summary-row">
              <span className="booking-summary-label">Phlebotomist</span>
              <span className="booking-summary-value">Anil Kumar</span>
            </div>
            <div className="booking-summary-divider" />
            <div className="booking-summary-row">
              <span className="booking-summary-label">Date & Time</span>
              <span className="booking-summary-value">{selectedDate?.full} at {selectedTime}</span>
            </div>
            <div className="booking-summary-divider" />
            <div className="booking-summary-row">
              <span className="booking-summary-label">Collection Method</span>
              <span className="booking-summary-value">{collectionMethod === 'home' ? 'Home Collection' : 'Lab Visit'}</span>
            </div>
            <div className="booking-summary-divider" />
            <div className="booking-summary-row">
              <span className="booking-summary-label">Address</span>
              <span className="booking-summary-value">
                {collectionMethod === 'home' 
                  ? 'Flat 402, St. Marys Residency, Ernakulam' 
                  : 'Amrit NABL Central Diagnostics, MG Road'}
              </span>
            </div>
          </div>

          <div className="booking-confirmed-note">
            <p><strong>Fasting Reminder:</strong> Please fast for 10-12 hours prior to sample collection. Water is allowed.</p>
          </div>
        </div>

        <div className="booking-cta-bar">
          <button className="booking-cta-btn" onClick={onBack} type="button">
            Done
          </button>
        </div>
      </div>
    );
  }
}

