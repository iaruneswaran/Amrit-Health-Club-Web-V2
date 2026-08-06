import React, { useState } from 'react';
import continueArrow from '../assets/Continue Arrow.svg';
import clockIcon from '../assets/Clock Icon.svg';
import markedIcon from '../assets/Marked.svg';

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
  Morning: ['08:00 AM', '08:10 AM', '08:20 AM', '08:30 AM', '08:40 AM', '08:50 AM'],
  Afternoon: ['12:00 PM', '12:10 PM', '12:20 PM', '12:30 PM', '12:40 PM', '12:50 PM'],
  Evening: ['04:00 PM', '04:10 PM', '04:20 PM', '04:30 PM', '04:40 PM', '04:50 PM']
};

const sessionIcons = { Morning: '', Afternoon: '', Evening: '' };

export default function BookingFlow({ doctor, onBack, isReschedule = false }) {
  const [step, setStep] = useState(isReschedule || doctor?.isReschedule ? 0 : 1);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState(null);


  const StepHeader = ({ title, onBackPress }) => (
    <header className="booking-step-header">
      <button className="booking-back-btn" onClick={onBackPress} aria-label="Go back">
        <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '16px', height: '14px' }} />
      </button>
      <h1 className="booking-step-title">{title}</h1>
    </header>
  );

  const StepDots = () => (
    <div className="booking-step-dots">
      {[1, 2, 3].map(s => (
        <div key={s} className={'booking-step-dot' + (step >= s ? ' active' : '')} />
      ))}
    </div>
  );

  /* STEP 0: RESCHEDULE CONFIRMATION QUESTION */
  if (step === 0) {
    return (
      <div className="booking-flow-container">
        <StepHeader title="Reschedule Appointment" onBackPress={onBack} />
        <div className="booking-flow-body" style={{ padding: '24px 20px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#FFFDF9', border: '2px solid #CCA266', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px auto 20px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 2v4M16 2v4M3 10h18" />
              <rect x="3" y="4" width="18" height="18" rx="2" />
            </svg>
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#000000', margin: '0 0 8px 0' }}>
            Reschedule Appointment?
          </h2>
          <p style={{ fontSize: '14px', color: '#555555', margin: '0 0 24px 0', lineHeight: '1.5' }}>
            Are you sure you want to change your scheduled appointment time with <strong>{doctor?.name || "Dr. Amelia Carter"}</strong>?
          </p>

          <div style={{ background: '#F9FAFB', borderRadius: '16px', padding: '16px', marginBottom: '28px', border: '1px solid #F2F4F7', textAlign: 'left' }}>
            <div style={{ fontSize: '13px', color: '#555555', fontWeight: '500', marginBottom: '4px' }}>Current Scheduled Time</div>
            <div style={{ fontSize: '15px', color: '#000000', fontWeight: '700' }}>{doctor?.time || "Today, 9:30 PM"}</div>
            <div style={{ fontSize: '13px', color: '#555555', marginTop: '4px' }}>{doctor?.specialty || "Cardiology Specialist"}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              type="button"
              className="btn-primary"
              onClick={() => setStep(1)}
              style={{ width: '100%', height: '48px', borderRadius: '16px', fontSize: '14px', fontWeight: '600' }}
            >
              Yes, Change Appointment Time
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={onBack}
              style={{ width: '100%', height: '48px', borderRadius: '16px', fontSize: '14px', fontWeight: '600', color: '#555555', borderColor: '#E5E7EB' }}
            >
              Keep Current Appointment
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* STEP 1: SELECT DATE */
  if (step === 1) {
    return (
      <div className="booking-flow-container">
        <StepHeader title="Book Appointment" onBackPress={onBack} />
        <div className="booking-flow-body">
          <StepDots />
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
          <StepDots />
          <div className="booking-chosen-date-row">
            <img src={clockIcon} alt="" style={{ width: '18px', height: '18px' }} />
            <span className="booking-chosen-date-text">{selectedDate?.full}</span>
          </div>
          <div className="booking-section">
            <h2 className="booking-section-title">Select a Time Slot</h2>
            {Object.entries(timeSlots).map(([session, slots]) => (
              <div key={session} className="booking-time-group">
                <p className="booking-time-group-label">{sessionIcons[session]} {session}</p>
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
            Review Booking
          </button>
        </div>
      </div>
    );
  }

  /* STEP 3: REVIEW & PAYMENT */
  if (step === 3) {
    return (
      <div className="booking-flow-container">
        <StepHeader title="Review & Confirm" onBackPress={() => setStep(2)} />
        <div className="booking-flow-body">
          <StepDots />
          <div className="booking-summary-card">
            <h3 className="booking-summary-title">Appointment Summary</h3>
            <div className="booking-summary-row">
              <span className="booking-summary-label">Doctor</span>
              <span className="booking-summary-value">{doctor?.name}</span>
            </div>
            <div className="booking-summary-divider" />
            <div className="booking-summary-row">
              <span className="booking-summary-label">Specialty</span>
              <span className="booking-summary-value">{doctor?.specialty}</span>
            </div>
            <div className="booking-summary-divider" />
            <div className="booking-summary-row">
              <span className="booking-summary-label">Hospital</span>
              <span className="booking-summary-value">{doctor?.hospitalName || '—'}</span>
            </div>
            <div className="booking-summary-divider" />
            <div className="booking-summary-row">
              <span className="booking-summary-label">Date</span>
              <span className="booking-summary-value">{selectedDate?.full}</span>
            </div>
            <div className="booking-summary-divider" />
            <div className="booking-summary-row">
              <span className="booking-summary-label">Time</span>
              <span className="booking-summary-value">{selectedTime}</span>
            </div>
            {doctor?.fee && (
              <>
                <div className="booking-summary-divider" />
                <div className="booking-summary-row">
                  <span className="booking-summary-label">Consultation Fee</span>
                  <span className="booking-summary-value booking-summary-fee">{doctor.fee}</span>
                </div>
              </>
            )}
          </div>

          <div className="booking-section">
            <h2 className="booking-section-title">Payment Method</h2>
            <div className="booking-payment-option selected">
              <div className="booking-payment-text">
                <p className="booking-payment-title">Pay at Hospital Counter</p>
                <p className="booking-payment-desc">Pay at the reception before your appointment</p>
              </div>
              <div className="booking-payment-check">
                <img src={markedIcon} alt="Selected" style={{ width: '20px', height: '20px', display: 'block' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="booking-cta-bar">
          <button className="booking-cta-btn" onClick={() => setStep(4)} type="button">
            Confirm Appointment
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
          <h1 className="booking-confirmed-title">Appointment Booked!</h1>
          <p className="booking-confirmed-subtitle">Your appointment has been successfully confirmed.</p>

          <div className="booking-summary-card" style={{ width: '100%' }}>
            <div className="booking-summary-row">
              <span className="booking-summary-label">Doctor</span>
              <span className="booking-summary-value">{doctor?.name}</span>
            </div>
            <div className="booking-summary-divider" />
            <div className="booking-summary-row">
              <span className="booking-summary-label">Hospital</span>
              <span className="booking-summary-value">{doctor?.hospitalName || '—'}</span>
            </div>
            <div className="booking-summary-divider" />
            <div className="booking-summary-row">
              <span className="booking-summary-label">Date</span>
              <span className="booking-summary-value">{selectedDate?.full}</span>
            </div>
            <div className="booking-summary-divider" />
            <div className="booking-summary-row">
              <span className="booking-summary-label">Time</span>
              <span className="booking-summary-value">{selectedTime}</span>
            </div>
            <div className="booking-summary-divider" />
            <div className="booking-summary-row">
              <span className="booking-summary-label">Payment</span>
              <span className="booking-summary-value">At Hospital Counter</span>
            </div>
          </div>

          <div className="booking-confirmed-note">
            <p>Please arrive 15 minutes early and pay at the hospital counter.</p>
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

  return null;
}

