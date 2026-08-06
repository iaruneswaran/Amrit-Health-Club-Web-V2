import React, { useState } from 'react';
import continueArrow from '../assets/Continue Arrow.svg';
import clockIcon from '../assets/Clock Icon.svg';
import markedIcon from '../assets/Marked.svg';
import locationIcon from '../assets/Google Location.svg';
import doctorIcon from '../assets/Assigned doctor.svg';
import laboratoryIcon from '../assets/Laboratory.svg';

const activeLabPrescriptionsData = [
  {
    id: 'lab-rx-1',
    doctor: {
      name: 'Dr. Amelia Carter',
      specialty: 'Cardiology Specialist',
      hospital: "St. Mary's Medical Center",
      initials: 'AC'
    },
    date: 'Today, Jul 11, 2026',
    testsCount: 2,
    tests: [
      { name: 'Complete Blood Count (CBC)', details: '14 Parameters • Hemoglobin, WBC, Platelets', price: 350, instruction: 'Fasting not required' },
      { name: 'Lipid Profile & Fasting Glucose', details: 'Cholesterol, HDL, LDL, Fasting Sugar', price: 650, instruction: '10-12 Hrs Fasting required before sample collection' }
    ]
  },
  {
    id: 'lab-rx-2',
    doctor: {
      name: 'Dr. Rajesh Kumar',
      specialty: 'Internal Medicine',
      hospital: 'Apollo Health City',
      initials: 'RK'
    },
    date: 'Jul 05, 2026',
    testsCount: 2,
    tests: [
      { name: 'Liver Function Test (LFT)', details: '8 Parameters • Bilirubin, SGOT, SGPT', price: 450, instruction: '8-10 Hrs Fasting recommended' },
      { name: 'Thyroid Profile (T3, T4, TSH)', details: '3 Parameters • Thyroid gland assessment', price: 550, instruction: 'Fasting not required' }
    ]
  },
  {
    id: 'lab-rx-3',
    doctor: {
      name: 'Dr. Sarah Jenkins',
      specialty: 'Orthopedics & Joint Specialist',
      hospital: 'City Care Hospital',
      initials: 'SJ'
    },
    date: 'Jun 28, 2026',
    testsCount: 2,
    tests: [
      { name: 'Vitamin D3 (25-OH)', details: 'Bone & Joint Density Indicator', price: 800, instruction: 'Fasting not required' },
      { name: 'Serum Calcium & Phosphorus', details: 'Mineral Density Evaluation', price: 300, instruction: 'Overnight fasting recommended' }
    ]
  }
];

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
  // Steps: 
  // 0: Select Active Prescription List (Select Prescribed Lab Orders (3))
  // 1: Select Date
  // 2: Select Time
  // 3: Review & Confirm
  // 4: Confirmed
  const [step, setStep] = useState(0);
  const [selectedRx, setSelectedRx] = useState(activeLabPrescriptionsData[0]);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState('07:30 AM');
  const [collectionMethod, setCollectionMethod] = useState('home'); // 'home' | 'visit'
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'counter'
  const [upiId, setUpiId] = useState('');

  const StepHeader = ({ title, onBackPress }) => (
    <header className="booking-step-header" style={{ position: 'relative', background: 'transparent', padding: '16px 12px 16px', borderBottom: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button className="booking-back-btn" onClick={onBackPress} aria-label="Go back" style={{ background: '#FFFFFF', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '16px', height: '14px' }} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img 
            src={laboratoryIcon} 
            alt="" 
            style={{ 
              width: '20px', 
              height: '20px', 
              filter: 'brightness(0) saturate(100%) invert(73%) sepia(29%) saturate(836%) hue-rotate(356deg) brightness(92%) contrast(85%)' 
            }} 
          />
          <h1 className="booking-step-title" style={{ fontSize: '18px', fontWeight: '700', color: '#000000', margin: 0, letterSpacing: '-0.2px' }}>{title}</h1>
        </div>
      </div>
    </header>
  );

  /* STEP 0: SELECT PRESCRIBED LAB ORDERS LIST */
  if (step === 0) {
    return (
      <div style={{ background: '#F9FAFB', minHeight: '100vh', paddingBottom: '95px' }}>
        <StepHeader title="My Lab Prescriptions" onBackPress={onBack} />

        <div style={{ padding: '0 12px 20px', boxSizing: 'border-box' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#000000', margin: '0 0 12px 0' }}>
            Select Prescribed Lab Orders ({activeLabPrescriptionsData.length})
          </h2>

          {/* List of Prescribed Lab Orders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {activeLabPrescriptionsData.map((rx) => (
              <div
                key={rx.id}
                onClick={() => {
                  setSelectedRx(rx);
                  setStep(1);
                }}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #F2F4F7',
                  padding: '16px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="doctor-logo-placeholder" style={{ width: '50px', height: '50px', borderRadius: '14px', background: '#F2F4F7', color: '#CCA266', fontWeight: '700', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {rx.doctor.initials}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#000000', margin: 0 }}>{rx.doctor.name}</h3>
                      <p style={{ fontSize: '13px', color: '#555555', margin: '2px 0 0 0', fontWeight: '500' }}>
                        {rx.doctor.specialty}
                      </p>
                    </div>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#10B981', background: '#ECFDF5', padding: '4px 10px', borderRadius: '100px' }}>
                    Verified
                  </span>
                </div>

                <div style={{ background: '#F9FAFB', borderRadius: '12px', padding: '10px 12px', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#555555', fontWeight: '500' }}>
                    <span>Prescribed Date</span>
                    <span style={{ color: '#000000', fontWeight: '600' }}>{rx.date}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px' }}>
                  <span style={{ fontSize: '13px', color: '#CCA266', fontWeight: '600' }}>
                    {rx.testsCount} Prescribed Lab Tests
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#CCA266', fontWeight: '600' }}>
                    <span>Order Now</span>
                    <img src={continueArrow} alt="" style={{ width: '12px', height: '12px' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* STEP 1: REVIEW & CONFIRM LAB TESTS */
  if (step === 1) {
    return (
      <div className="booking-flow-container">
        <StepHeader title="Review & Confirm" onBackPress={() => setStep(0)} />
        <div className="booking-flow-body" style={{ gap: '16px', padding: '0 12px 100px' }}>
          
          {/* Tests Included Box */}
          <div>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '700', color: '#000000' }}>
              Included Lab Tests ({selectedRx.tests.length})
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {selectedRx.tests.map((t, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    background: '#FFFFFF', 
                    borderRadius: '16px', 
                    border: '1.5px solid #CCA266', 
                    padding: '16px', 
                    display: 'flex', 
                    gap: '12px', 
                    alignItems: 'flex-start' 
                  }}
                >
                  <img src={markedIcon} alt="Selected" style={{ width: '22px', height: '22px', display: 'block', flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#000000', margin: 0 }}>{t.name}</h4>
                      <span style={{ fontSize: '15px', fontWeight: '700', color: '#CCA266' }}>₹{t.price}</span>
                    </div>
                    <p style={{ fontSize: '13px', color: '#555555', margin: '4px 0 0 0', lineHeight: '1.4', fontWeight: '500' }}>
                      {t.details}
                    </p>
                    {t.instruction && (
                      <div style={{ background: 'rgba(204,162,102,0.08)', borderRadius: '8px', padding: '6px 10px', fontSize: '13px', color: '#555555', fontWeight: '500', marginTop: '8px' }}>
                        Note: {t.instruction}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Box */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #F2F4F7', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '600', color: '#000000' }}>
              <span>Selected Items Subtotal ({selectedRx.tests.length})</span>
              <span style={{ color: '#CCA266' }}>₹{selectedRx.tests.reduce((sum, t) => sum + t.price, 0)}</span>
            </div>
          </div>

        </div>

        <div className="booking-cta-bar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '13px', color: '#555555', display: 'block', fontWeight: '500' }}>Subtotal</span>
              <span style={{ fontSize: '18px', fontWeight: '700', color: '#CCA266' }}>₹{selectedRx.tests.reduce((sum, t) => sum + t.price, 0)}</span>
            </div>
            <button
              className="booking-cta-btn"
              onClick={() => setStep(2)}
              type="button"
              style={{ width: 'auto', padding: '0 24px', flexShrink: 0 }}
            >
              Select Date & Time
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* STEP 2: SELECT DATE */
  if (step === 2) {
    return (
      <div className="booking-flow-container">
        <StepHeader title="Book Lab Order" onBackPress={() => setStep(1)} />
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

            {/* Calendar Grid View */}
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
                {/* Empty offset slots for August 2026 */}
                {[...Array(6)].map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                
                {/* Days 1 to 31 */}
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
            onClick={() => setStep(3)}
            disabled={!selectedDate}
            type="button"
          >
            Select Time Slot
          </button>
        </div>
      </div>
    );
  }

  /* STEP 3: SELECT TIME */
  if (step === 3) {
    return (
      <div className="booking-flow-container">
        <StepHeader title="Select Time" onBackPress={() => setStep(2)} />
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
            onClick={() => setStep(4)}
            disabled={!selectedTime}
            type="button"
          >
            Proceed to Payment
          </button>
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
          
          {/* Chosen Date & Time Banner */}
          <div className="booking-chosen-date-row" style={{ margin: 0 }}>
            <img src={clockIcon} alt="" style={{ width: '18px', height: '18px' }} />
            <span className="booking-chosen-date-text">{selectedDate?.full} at {selectedTime}</span>
          </div>

          {/* Collection Method Selector (At Top of Payment Page) */}
          <div>
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
                  <span style={{ fontSize: '16px', fontWeight: '600', color: collectionMethod === 'home' ? '#CCA266' : '#000000', display: 'block' }}>
                    Home Collection
                  </span>
                  <span style={{ fontSize: '13px', color: '#555555', marginTop: '6px', display: 'block' }}>
                    Phlebotomist visits home for sample pickup
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed #E5E7EB' }}>
                    <img src={locationIcon} alt="Pin" style={{ width: '14px', height: '14px' }} />
                    <span style={{ fontSize: '13px', color: '#000000', fontWeight: '500' }}>
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

              {/* Hospital Card for Lab Visit */}
              <div 
                className="hospital-card" 
                onClick={() => setCollectionMethod('visit')}
                style={{
                  cursor: 'pointer',
                  margin: 0,
                  border: collectionMethod === 'visit' ? '1.5px solid #CCA266' : '1px solid #E5E7EB',
                  backgroundColor: collectionMethod === 'visit' ? '#FFFDF9' : '#FFFFFF',
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
                      <h3 className="hospital-card-name" style={{ fontSize: '16px', fontWeight: '600', color: collectionMethod === 'visit' ? '#CCA266' : '#000000', margin: 0 }}>
                        St. Mary's Medical
                      </h3>
                      <div className="hospital-open-row" style={{ marginTop: '4px' }}>
                        <img src="/clock-icon.svg" alt="" aria-hidden="true" className="hospital-clock-icon" />
                        <span className="hospital-open-text">Open 24/7 • Visit Center</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Icon-only indicator for Lab Visit on top right */}
                  {collectionMethod === 'visit' ? (
                    <img src={markedIcon} alt="Selected" style={{ width: '24px', height: '24px', flexShrink: 0, marginTop: '2px' }} />
                  ) : (
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', border: '1.5px solid #D0D5DD', display: 'inline-block', flexShrink: 0, marginTop: '2px', boxSizing: 'border-box' }} />
                  )}
                </div>

                <div className="hospital-address-container" style={{ margin: 0 }}>
                  <img src={locationIcon} alt="Map Location Pin" className="hospital-google-pin" />
                  <p className="hospital-address-text" style={{ fontSize: '13px' }}>
                    161B, 1st Floor, 6th Main, 3RD Cross Road, JP Nagar, Bangalore
                  </p>
                </div>
              </div>

            </div>
          </div>
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
                <span>Selected Items Subtotal ({selectedRx.tests.length})</span>
                <span style={{ color: '#000000', fontWeight: '600' }}>₹{selectedRx.tests.reduce((sum, t) => sum + t.price, 0)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555555' }}>
                <span>Delivery Charge</span>
                <span style={{ color: '#10B981', fontWeight: '700' }}>FREE</span>
              </div>
              <hr style={{ border: 'none', borderBottom: '1px solid #F2F4F7', margin: '4px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '700', color: '#000000' }}>
                <span>Total Amount</span>
                <span style={{ color: '#CCA266' }}>₹{selectedRx.tests.reduce((sum, t) => sum + t.price, 0)}</span>
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
            Confirm & Book Lab Order (₹{selectedRx.tests.reduce((sum, t) => sum + t.price, 0)})
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
              <span className="booking-summary-label">Prescribing Doctor</span>
              <span className="booking-summary-value">{selectedRx.doctor.name}</span>
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
              <span className="booking-summary-label">Payment Method</span>
              <span className="booking-summary-value">{paymentMethod === 'upi' ? 'UPI (Google Pay)' : 'Pay at Counter / Collection'}</span>
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
