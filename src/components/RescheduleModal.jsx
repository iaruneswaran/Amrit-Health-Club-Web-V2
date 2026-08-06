import React, { useState } from 'react';
import markedIcon from '../assets/Marked.svg';

export default function RescheduleModal({ isOpen, onClose, onConfirmReschedule, doctorName = "Dr. Amelia Carter", appointmentTime = "Today, 9:30 PM" }) {
  const [step, setStep] = useState('confirm'); // 'confirm' | 'selectSlot' | 'success'
  const [selectedDate, setSelectedDate] = useState('Tomorrow, Aug 7');
  const [selectedSlot, setSelectedSlot] = useState('6:30 PM');

  if (!isOpen) return null;

  const dates = [
    'Tomorrow, Aug 7',
    'Friday, Aug 8',
    'Saturday, Aug 9'
  ];

  const timeSlots = [
    '10:00 AM',
    '11:30 AM',
    '02:30 PM',
    '04:00 PM',
    '06:30 PM',
    '08:00 PM'
  ];

  const handleProceedToSlot = () => {
    setStep('selectSlot');
  };

  const handleFinalConfirm = () => {
    setStep('success');
    setTimeout(() => {
      if (onConfirmReschedule) {
        onConfirmReschedule({ date: selectedDate, slot: selectedSlot });
      }
      setStep('confirm');
      onClose();
    }, 1500);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(4px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '430px',
          background: '#FFFFFF',
          borderRadius: '24px 24px 0 0',
          padding: '24px 20px 28px',
          boxSizing: 'border-box',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
          position: 'relative'
        }}
      >
        {/* Handle bar */}
        <div style={{ width: '36px', height: '4px', background: '#E5E7EB', borderRadius: '100px', margin: '0 auto 16px' }} />

        {/* STEP 1: CONFIRM QUESTION */}
        {step === 'confirm' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#FFFDF9', border: '2px solid #CCA266', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 2v4M16 2v4M3 10h18" />
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                </svg>
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#000000', margin: '0 0 6px 0' }}>
                Reschedule Appointment?
              </h2>
              <p style={{ fontSize: '14px', color: '#555555', margin: 0, lineHeight: '1.4' }}>
                Are you sure you want to change your scheduled appointment time with <strong>{doctorName}</strong>?
              </p>
            </div>

            {/* Current Details Card */}
            <div style={{ background: '#F9FAFB', borderRadius: '14px', padding: '14px', marginBottom: '20px', border: '1px solid #F2F4F7' }}>
              <div style={{ fontSize: '13px', color: '#555555', fontWeight: '500', marginBottom: '4px' }}>Current Scheduled Time</div>
              <div style={{ fontSize: '15px', color: '#000000', fontWeight: '700' }}>{appointmentTime}</div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                type="button"
                onClick={handleProceedToSlot}
                style={{
                  width: '100%',
                  height: '48px',
                  background: '#CCA266',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Yes, Change Appointment Time
              </button>

              <button
                type="button"
                onClick={onClose}
                style={{
                  width: '100%',
                  height: '48px',
                  background: '#FFFFFF',
                  color: '#555555',
                  border: '1px solid #E5E7EB',
                  borderRadius: '16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Keep Current Appointment
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT NEW SLOT */}
        {step === 'selectSlot' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#000000', margin: 0 }}>Select New Date & Time</h2>
              <button onClick={() => setStep('confirm')} style={{ background: 'none', border: 'none', fontSize: '13px', color: '#CCA266', fontWeight: '600', cursor: 'pointer' }}>Back</button>
            </div>

            {/* Dates Selection */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', color: '#555555', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Available Dates</label>
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
                {dates.map((date) => (
                  <button
                    key={date}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: selectedDate === date ? '1.5px solid #CCA266' : '1px solid #E5E7EB',
                      background: selectedDate === date ? '#FFFDF9' : '#FFFFFF',
                      color: selectedDate === date ? '#CCA266' : '#000000',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', color: '#555555', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Time Slots</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      border: selectedSlot === slot ? '1.5px solid #CCA266' : '1px solid #E5E7EB',
                      background: selectedSlot === slot ? '#FFFDF9' : '#FFFFFF',
                      color: selectedSlot === slot ? '#CCA266' : '#000000',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Final Confirm CTA */}
            <button
              type="button"
              onClick={handleFinalConfirm}
              style={{
                width: '100%',
                height: '48px',
                background: '#CCA266',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '16px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Confirm Reschedule to {selectedSlot}
            </button>
          </div>
        )}

        {/* STEP 3: SUCCESS CONFIRMATION */}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto 16px' }}>
              <img src={markedIcon} alt="Confirmed" style={{ width: '80px', height: '80px', display: 'block' }} />
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#000000', margin: '0 0 6px 0' }}>Rescheduled Successfully!</h2>
            <p style={{ fontSize: '14px', color: '#555555', margin: 0 }}>
              Your appointment with {doctorName} is now set for <strong>{selectedDate}, {selectedSlot}</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
