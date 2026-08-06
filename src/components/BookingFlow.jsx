import React, { useState } from 'react';
import continueArrow from '../assets/Continue Arrow.svg';
import clockIcon from '../assets/Clock Icon.svg';
import markedIcon from '../assets/Marked.svg';
import googleLocationIcon from '../assets/Google Location.svg';
import hospitalIcon from '../assets/Hospital icon.svg';

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
  const [selectedTime, setSelectedTime] = useState('08:00 AM');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');

  const docName = doctor?.name || "Dr. Amelia Carter";
  const docSpecialty = doctor?.specialty || "Cardiology Specialist";
  const docHospital = doctor?.hospitalName || "St. Mary's Medical";
  const docFee = doctor?.fee || "₹500";
  const docInitials = doctor?.initials || doctor?.name?.split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase() || "AC";
  const docAddress = doctor?.address || "161B, 1st Floor,6th Main, 3RD Cross Road, 3RD PHASE J P Nagar, Bangalore Karnataka India";

  const StepHeader = ({ title, onBackPress }) => (
    <header className="booking-step-header" style={{ position: 'relative', background: 'transparent', padding: '16px 12px 16px', borderBottom: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button className="booking-back-btn" onClick={onBackPress} aria-label="Go back" style={{ background: '#FFFFFF', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '16px', height: '14px' }} />
        </button>
        <h1 className="booking-step-title" style={{ fontSize: '18px', fontWeight: '700', color: '#000000', margin: 0, letterSpacing: '-0.2px' }}>{title}</h1>
      </div>
    </header>
  );

  /* STEP 0: RESCHEDULE CONFIRMATION QUESTION */
  if (step === 0) {
    return (
      <div className="booking-flow-container">
        <StepHeader title="Reschedule Appointment" onBackPress={onBack} />
        <div className="booking-flow-body" style={{ padding: '0 12px 100px', textAlign: 'center' }}>
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
            Are you sure you want to change your scheduled appointment time with <strong>{docName}</strong>?
          </p>

          <div style={{ background: '#F9FAFB', borderRadius: '16px', padding: '16px', marginBottom: '28px', border: '1px solid #F2F4F7', textAlign: 'left' }}>
            <div style={{ fontSize: '13px', color: '#555555', fontWeight: '500', marginBottom: '4px' }}>Current Scheduled Time</div>
            <div style={{ fontSize: '15px', color: '#000000', fontWeight: '700' }}>{doctor?.time || "Today, 9:30 PM"}</div>
            <div style={{ fontSize: '13px', color: '#555555', marginTop: '4px' }}>{docSpecialty}</div>
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
        <div className="booking-flow-body" style={{ padding: '0 12px 100px', gap: '16px' }}>
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

            {/* Month Calendar Grid View */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #F2F4F7', padding: '16px', marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '15px', fontWeight: '700', color: '#000000' }}>August 2026</span>
                <span style={{ fontSize: '13px', color: '#CCA266', fontWeight: '600' }}>Calendar View</span>
              </div>

              {/* Day names header */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', marginBottom: '8px' }}>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, i) => (
                  <span key={i} style={{ fontSize: '12px', fontWeight: '600', color: '#9CA3AF' }}>{day}</span>
                ))}
              </div>

              {/* Calendar Days Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', textAlign: 'center' }}>
                {[...Array(6)].map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                
                {[...Array(31)].map((_, i) => {
                  const dayNum = i + 1;
                  const isSelected = selectedDate?.date === dayNum;
                  const isPast = dayNum < 6;
                  const dayNames = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
                  const shortDays = ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'];
                  const dayIndex = (i) % 7;
                  
                  return (
                    <button
                      key={dayNum}
                      type="button"
                      disabled={isPast}
                      onClick={() => {
                        const matched = dates.find(d => d.date === dayNum) || {
                          key: `aug-${dayNum}`,
                          day: shortDays[dayIndex],
                          date: dayNum,
                          full: `${dayNames[dayIndex]}, ${dayNum} August 2026`
                        };
                        setSelectedDate(matched);
                      }}
                      style={{
                        height: '36px',
                        borderRadius: '50%',
                        border: 'none',
                        background: isSelected ? '#CCA266' : isPast ? 'transparent' : '#F9FAFB',
                        color: isSelected ? '#FFFFFF' : isPast ? '#D1D5DB' : '#000000',
                        fontWeight: isSelected ? '700' : '500',
                        fontSize: '13px',
                        cursor: isPast ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        width: '36px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>
            </div>

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
        <div className="booking-flow-body" style={{ padding: '0 12px 100px', gap: '16px' }}>
          <div className="booking-chosen-date-row">
            <img src={clockIcon} alt="" style={{ width: '18px', height: '18px' }} />
            <span className="booking-chosen-date-text">{selectedDate?.full}</span>
          </div>
          <div className="booking-section">
            <h2 className="booking-section-title">Select a Time Slot</h2>
            {Object.entries(timeSlots).map(([session, slots]) => (
              <div key={session} className="booking-time-group" style={{ marginBottom: '16px' }}>
                <p className="booking-time-group-label" style={{ fontSize: '13px', fontWeight: '700', color: '#000000', margin: '0 0 10px 0' }}>{session}</p>
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

  /* STEP 3: REVIEW & CONFIRM */
  if (step === 3) {
    return (
      <div className="booking-flow-container">
        <StepHeader title="Review & Confirm" onBackPress={() => setStep(2)} />
        <div className="booking-flow-body" style={{ padding: '0 12px 100px', gap: '16px' }}>
          
          {/* Chosen Date & Time Box */}
          <div className="booking-chosen-date-row">
            <img src={clockIcon} alt="" style={{ width: '18px', height: '18px' }} />
            <span className="booking-chosen-date-text">{selectedDate?.full} at {selectedTime}</span>
          </div>

          {/* Doctor Card (Exact copy from Doctors Page list) */}
          <div className="doctor-card preferred" style={{ border: '1.5px solid #CCA266' }}>
            {/* Header detail row */}
            <div className="doctor-card-header">
              <div className="doctor-logo-placeholder">
                {docInitials}
              </div>
              <div className="doctor-header-details">
                <h3 className="doctor-card-name">{docName}</h3>
                <span className="doctor-specialty">{docSpecialty}</span>
              </div>
            </div>

            {/* Hospital block like location */}
            {docHospital && (
              <div className={`doctor-hospital-container ${doctor?.isPreferred ? 'has-preferred' : ''}`}>
                <div className="doctor-hospital-left">
                  <img src={hospitalIcon} alt="Hospital" className="doctor-hospital-icon" />
                  <span className="doctor-hospital-name">{docHospital}</span>
                </div>
                {doctor?.isPreferred && (
                  <span className="badge-preferred-inline">Preferred</span>
                )}
              </div>
            )}

            {/* Address block with Google map pin */}
            <div className="doctor-address-container">
              <img src={googleLocationIcon} alt="Map Location Pin" className="doctor-google-pin" />
              <p className="doctor-address-text">{docAddress}</p>
            </div>

            {/* Card footer */}
            <div className="doctor-card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="doctor-fee-block">
                <span className="doctor-fee-amount">{docFee}</span>
                <span className="doctor-fee-label">Consultation Fee</span>
              </div>
              <img src={markedIcon} alt="Selected" style={{ width: '24px', height: '24px', flexShrink: 0, display: 'block' }} />
            </div>
          </div>

          {/* Summary Box */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #F2F4F7', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '600', color: '#000000' }}>
              <span>Consultation Subtotal</span>
              <span style={{ color: '#CCA266' }}>{docFee}</span>
            </div>
          </div>

        </div>

        {/* Bottom Action Bar */}
        <div className="booking-cta-bar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '13px', color: '#555555', display: 'block', fontWeight: '500' }}>Subtotal</span>
              <span style={{ fontSize: '18px', fontWeight: '700', color: '#CCA266' }}>{docFee}</span>
            </div>
            <button
              className="booking-cta-btn"
              onClick={() => setStep(4)}
              type="button"
              style={{ width: 'auto', padding: '0 24px', flexShrink: 0 }}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* STEP 4: PAYMENT METHOD (SEPARATE PAGE) */
  if (step === 4) {
    return (
      <div className="booking-flow-container">
        <StepHeader title="Payment Method" onBackPress={() => setStep(3)} />
        <div className="booking-flow-body" style={{ gap: '16px', padding: '0 12px 100px' }}>
          
          {/* Hospital Center Card */}
          <div 
            className="hospital-card" 
            style={{
              margin: 0,
              border: '1.5px solid #CCA266',
              backgroundColor: '#FFFDF9',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div className="hospital-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
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
                  <h3 className="hospital-card-name" style={{ fontSize: '16px', fontWeight: '600', color: '#CCA266', margin: 0 }}>
                    {docHospital}
                  </h3>
                  <div className="hospital-open-row" style={{ marginTop: '4px' }}>
                    <img src="/clock-icon.svg" alt="" aria-hidden="true" className="hospital-clock-icon" />
                    <span className="hospital-open-text">Open 24/7 • Visit Center</span>
                  </div>
                </div>
              </div>

              {/* Checked/Marked icon on top right */}
              <img src={markedIcon} alt="Selected" style={{ width: '24px', height: '24px', flexShrink: 0, marginTop: '2px' }} />
            </div>

            <div className="hospital-address-container" style={{ margin: 0 }}>
              <img src={googleLocationIcon} alt="Map Location Pin" className="hospital-google-pin" />
              <p className="hospital-address-text" style={{ fontSize: '13px' }}>{docAddress}</p>
            </div>
          </div>

          {/* Payment Method Options */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #F2F4F7', padding: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#000000', margin: '0 0 16px 0' }}>Payment Method</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { id: 'upi', title: 'UPI (Google Pay)', sub: 'Instant & Secure Payment' }
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setPaymentMethod(opt.id)}
                  style={{
                    border: paymentMethod === opt.id ? '1.5px solid #CCA266' : '1px solid #E5E7EB',
                    borderRadius: '14px',
                    padding: '14px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    background: paymentMethod === opt.id ? '#FFFDF9' : '#FFFFFF',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {paymentMethod === opt.id ? (
                    <img src={markedIcon} alt="Selected" style={{ width: '20px', height: '20px', flexShrink: 0, marginTop: '2px', display: 'block' }} />
                  ) : (
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #D1D5DB', boxSizing: 'border-box', flexShrink: 0, marginTop: '2px' }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#000000', display: 'block' }}>{opt.title}</span>
                    <span style={{ fontSize: '13px', color: '#555555', fontWeight: '500', marginTop: '2px', display: 'block' }}>{opt.sub}</span>
                    
                    {opt.id === 'upi' && paymentMethod === 'upi' && (
                      <div 
                        onClick={(e) => e.stopPropagation()} 
                        style={{ marginTop: '14px', display: 'flex', gap: '8px', alignItems: 'center' }}
                      >
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="Enter or paste UPI ID (e.g. mobile@upi)"
                          style={{
                            flex: 1,
                            height: '40px',
                            borderRadius: '10px',
                            border: '1px solid #D1D5DB',
                            padding: '0 12px',
                            fontSize: '13px',
                            outline: 'none',
                            backgroundColor: '#FFFFFF',
                            boxSizing: 'border-box'
                          }}
                        />
                        <button
                          type="button"
                          onClick={async (e) => {
                            e.stopPropagation();
                            try {
                              const text = await navigator.clipboard.readText();
                              if (text) setUpiId(text);
                            } catch (err) {
                              // Clipboard fallback
                            }
                          }}
                          style={{
                            height: '40px',
                            padding: '0 16px',
                            borderRadius: '10px',
                            border: '1px solid #CCA266',
                            background: '#CCA266',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Paste
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #F2F4F7', padding: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#000000', margin: '0 0 12px 0' }}>Payment Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555555' }}>
                <span>Consultation Fee</span>
                <span style={{ color: '#000000', fontWeight: '600' }}>{docFee}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555555' }}>
                <span>Booking Fee</span>
                <span style={{ color: '#10B981', fontWeight: '700' }}>FREE</span>
              </div>
              <hr style={{ border: 'none', borderBottom: '1px solid #F2F4F7', margin: '4px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '700', color: '#000000' }}>
                <span>Total Amount</span>
                <span style={{ color: '#CCA266' }}>{docFee}</span>
              </div>
            </div>
          </div>

        </div>

        <div className="booking-cta-bar">
          <button
            className="booking-cta-btn"
            onClick={() => setStep(5)}
            type="button"
          >
            Confirm & Book Appointment ({docFee})
          </button>
        </div>
      </div>
    );
  }

  /* STEP 5: CONFIRMED */
  if (step === 5) {
    return (
      <div className="booking-flow-container booking-confirmed-page">
        <div className="booking-confirmed-body">
          <div className="booking-confirmed-check-wrap" style={{ display: 'flex', justifyContent: 'center', margin: '0 auto 20px' }}>
            <img src={markedIcon} alt="Confirmed" style={{ width: '80px', height: '80px', display: 'block' }} />
          </div>
          <h1 className="booking-confirmed-title">Appointment Booked!</h1>
          <p className="booking-confirmed-subtitle">Your appointment with <strong>{docName}</strong> has been successfully confirmed.</p>

          <div className="booking-summary-card" style={{ width: '100%' }}>
            <div className="booking-summary-row">
              <span className="booking-summary-label">Doctor</span>
              <span className="booking-summary-value">{docName}</span>
            </div>
            <div className="booking-summary-divider" />
            <div className="booking-summary-row">
              <span className="booking-summary-label">Specialty</span>
              <span className="booking-summary-value">{docSpecialty}</span>
            </div>
            <div className="booking-summary-divider" />
            <div className="booking-summary-row">
              <span className="booking-summary-label">Hospital</span>
              <span className="booking-summary-value">{docHospital}</span>
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
              <span className="booking-summary-label">Payment Method</span>
              <span className="booking-summary-value">UPI (Google Pay)</span>
            </div>
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

