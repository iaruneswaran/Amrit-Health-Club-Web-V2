import React, { useState, useEffect } from 'react';
import continueArrow from '../assets/Continue Arrow.svg';
import googleLocationIcon from '../assets/Google Location.svg';
import checkMarkIcon from '../assets/Marked.svg';
import pillsIcon from '../assets/Pills Icon.svg';
import callIcon from '../assets/Call Icon.svg';

const activePrescriptionsData = [
  {
    id: 'rx-1',
    doctor: {
      name: 'Dr. Amelia Carter',
      specialty: 'Cardiology Specialist',
      hospital: "St. Mary's Medical Center",
      initials: 'AC'
    },
    date: 'Today, Jul 11, 2026',
    diagnosis: 'Cardiac Maintenance & BP Care',
    medications: [
      {
        id: 1,
        name: 'Amoxicillin 250mg',
        details: '1 Capsule • Twice a day • Before Meals • 5 Days',
        instruction: 'Take with warm water after breakfast',
        price: 120,
        quantity: 1,
        selected: true
      },
      {
        id: 2,
        name: 'Atorvastatin 10mg',
        details: '1 Tablet • Once daily • At Bedtime • 30 Days',
        instruction: 'Avoid consuming grapefruit juice',
        price: 180,
        quantity: 1,
        selected: true
      },
      {
        id: 3,
        name: 'Metoprolol 25mg',
        details: '1 Tablet • Twice daily • After Meals • 15 Days',
        instruction: 'Check pulse rate before taking dosage',
        price: 95,
        quantity: 1,
        selected: true
      }
    ]
  },
  {
    id: 'rx-2',
    doctor: {
      name: 'Dr. Rajesh Kumar',
      specialty: 'Internal Medicine',
      hospital: 'Apollo Health City',
      initials: 'RK'
    },
    date: 'Jul 05, 2026',
    diagnosis: 'Seasonal Allergy & Immune Support',
    medications: [
      {
        id: 4,
        name: 'Cetirizine 10mg',
        details: '1 Tablet • Once daily • Night • 7 Days',
        instruction: 'May cause mild drowsiness. Do not drive.',
        price: 45,
        quantity: 1,
        selected: true
      },
      {
        id: 5,
        name: 'Vitamin C + Zinc 500mg',
        details: '1 Tablet • Chewable • Morning • 15 Days',
        instruction: 'Chew thoroughly before swallowing',
        price: 110,
        quantity: 1,
        selected: true
      }
    ]
  },
  {
    id: 'rx-3',
    doctor: {
      name: 'Dr. Sarah Jenkins',
      specialty: 'Orthopedics & Joint Specialist',
      hospital: 'City Care Hospital',
      initials: 'SJ'
    },
    date: 'Jun 28, 2026',
    diagnosis: 'Joint Care & Post-Workout Relief',
    medications: [
      {
        id: 6,
        name: 'Flexon MR Tablet',
        details: '1 Tablet • Twice daily • After Meals • 5 Days',
        instruction: 'Take with a full glass of water',
        price: 135,
        quantity: 1,
        selected: true
      },
      {
        id: 7,
        name: 'Calcium + D3 Supplement',
        details: '1 Tablet • Once daily • Afternoon • 30 Days',
        instruction: 'Best absorbed when taken with main meal',
        price: 210,
        quantity: 1,
        selected: true
      }
    ]
  }
];

export default function OrderMedicationFlow({ onBack, onComplete }) {
  // Navigation step state:
  // 1: Select Active Prescription (Heading: My Prescriptions)
  // 2: View Medication Details & Choose Medicines to Order
  // 3: Confirm Delivery/Pickup & Payment
  // 4: Order Status & Live Pharmacy Tracking (Stages 7-10 in user prompt)
  const [step, setStep] = useState(1);
  const [selectedRx, setSelectedRx] = useState(activePrescriptionsData[0]);
  const [medications, setMedications] = useState(activePrescriptionsData[0].medications);
  
  // Fulfillment options: 'delivery' or 'pickup'
  const [fulfillmentType, setFulfillmentType] = useState('delivery');
  const [deliveryOption, setDeliveryOption] = useState('express');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('161B, 1st Floor, 6th Main, 3RD Cross Road, 3RD PHASE J P Nagar, Bangalore, Karnataka, India');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [tempAddress, setTempAddress] = useState(deliveryAddress);

  // Live Tracking Stage (1 to 4):
  // Stage 1: Pharmacy Receives Order
  // Stage 2: Pharmacist Verifies & Packs
  // Stage 3: Order Ready / Out for Delivery
  // Stage 4: Patient Receives Medicines
  const [trackingStage, setTrackingStage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    const appFrame = document.querySelector('.app-frame');
    if (appFrame) {
      appFrame.scrollTop = 0;
    }
    const pageShell = document.querySelector('.page-shell');
    if (pageShell) {
      pageShell.scrollTop = 0;
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [step, trackingStage]);

  // When prescription selection changes, update medications list
  const handleSelectPrescription = (rx) => {
    setSelectedRx(rx);
    setMedications(rx.medications.map(m => ({ ...m, selected: true })));
    setStep(2);
  };

  const toggleSelectMed = (id) => {
    setMedications(prev => prev.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const updateQuantity = (id, delta) => {
    setMedications(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const selectedItems = medications.filter(i => i.selected);
  const subtotal = selectedItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const deliveryFee = fulfillmentType === 'pickup' ? 0 : (deliveryOption === 'express' ? 0 : 0); // FREE for AHC Members
  const totalAmount = subtotal + deliveryFee;

  const handleSaveAddress = () => {
    setDeliveryAddress(tempAddress);
    setIsEditingAddress(false);
  };

  const StepHeader = ({ title, onBackPress, subtitle }) => (
    <header className="booking-step-header" style={{ position: 'relative', background: 'transparent', padding: '16px 12px 16px', borderBottom: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button className="booking-back-btn" onClick={onBackPress} aria-label="Go back" style={{ background: '#FFFFFF', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '16px', height: '14px' }} />
        </button>
        <div>
          <h1 className="booking-step-title" style={{ fontSize: '18px', fontWeight: '700', color: '#000000', margin: 0, letterSpacing: '-0.2px' }}>{title}</h1>
          {subtitle && <p style={{ fontSize: '13px', color: '#555555', margin: '2px 0 0 0', fontWeight: '500' }}>{subtitle}</p>}
        </div>
      </div>
    </header>
  );

  return (
    <div className="order-med-flow-container" style={{ background: step === 4 ? '#FFFFFF' : '#F9FAFB', minHeight: '100vh', paddingBottom: step === 4 ? '40px' : '95px' }}>

      {/* STEP 1: PATIENT OPENS "ORDER PRESCRIBED MEDICATIONS" - HEADING: MY PRESCRIPTIONS */}
      {step === 1 && (
        <>
          <StepHeader title="My Prescriptions" onBackPress={onBack} />

          <div style={{ padding: '0 12px 20px', boxSizing: 'border-box' }}>

            <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#000000', margin: '0 0 12px 0' }}>
              Select Active Prescription ({activePrescriptionsData.length})
            </h2>

            {/* List of Active Prescriptions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {activePrescriptionsData.map((rx) => (
                <div
                  key={rx.id}
                  onClick={() => handleSelectPrescription(rx)}
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
                      <div className="doctor-logo-placeholder" style={{ width: '50px', height: '50px', borderRadius: '14px', background: '#F2F4F7', color: '#CCA266', fontWeight: '700', fontSize: '15px' }}>
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
                      {rx.medications.length} Prescribed Medicines
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
        </>
      )}

      {/* STEP 2: VIEW MEDICATION DETAILS & CHOOSE MEDICINES TO ORDER */}
      {step === 2 && (
        <>
          <StepHeader title="Prescription Details" onBackPress={() => setStep(1)} />

          <div style={{ padding: '0 12px 20px', maxWidth: '430px', margin: '0 auto', boxSizing: 'border-box' }}>
            
            {/* Prescribed Items Selection Title */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#000000', margin: 0 }}>
                Choose Medicines to Order ({selectedItems.length}/{medications.length})
              </h2>
            </div>

            {/* List of Prescribed Medicines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {medications.map((med) => (
                <div key={med.id} style={{ background: '#FFFFFF', borderRadius: '16px', border: med.selected ? '1.5px solid #CCA266' : '1px solid #F2F4F7', padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start', transition: 'all 0.2s ease' }}>
                  <div 
                    onClick={() => toggleSelectMed(med.id)}
                    style={{ 
                      marginTop: '2px', 
                      width: '22px', 
                      height: '22px', 
                      borderRadius: '50%', 
                      border: med.selected ? 'none' : '2px solid #D1D5DB', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      cursor: 'pointer',
                      flexShrink: 0 
                    }}
                  >
                    {med.selected && <img src={checkMarkIcon} alt="Selected" style={{ width: '22px', height: '22px', display: 'block' }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#000000', margin: 0 }}>{med.name}</h4>
                      <span style={{ fontSize: '15px', fontWeight: '700', color: '#CCA266' }}>₹{med.price * med.quantity}</span>
                    </div>
                    <p style={{ fontSize: '13px', color: '#555555', margin: '4px 0 6px 0', lineHeight: '1.4', fontWeight: '500' }}>
                      {med.details}
                    </p>
                    {med.instruction && (
                      <div style={{ background: 'rgba(204,162,102,0.08)', borderRadius: '8px', padding: '6px 10px', fontSize: '13px', color: '#555555', fontWeight: '500', marginBottom: '10px' }}>
                        Note: {med.instruction}
                      </div>
                    )}

                    {/* Quantity Selector */}
                    {med.selected && (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px', paddingTop: '8px', borderTop: '1px solid #F9FAFB' }}>
                        <span style={{ fontSize: '13px', color: '#555555', fontWeight: '500' }}>Quantity (Packs):</span>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E5E7EB', borderRadius: '100px', background: '#F9FAFB', overflow: 'hidden' }}>
                          <button
                            type="button"
                            onClick={() => updateQuantity(med.id, -1)}
                            style={{ border: 'none', background: 'transparent', padding: '4px 12px', fontWeight: '700', cursor: 'pointer', color: '#000000', fontSize: '14px' }}
                          >
                            -
                          </button>
                          <span style={{ fontSize: '13px', fontWeight: '700', color: '#000000', minWidth: '24px', textAlign: 'center' }}>{med.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(med.id, 1)}
                            style={{ border: 'none', background: 'transparent', padding: '4px 12px', fontWeight: '700', cursor: 'pointer', color: '#000000', fontSize: '14px' }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Box */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #F2F4F7', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '600', color: '#000000' }}>
                <span>Selected Items Subtotal ({selectedItems.length})</span>
                <span style={{ color: '#CCA266' }}>₹{subtotal}</span>
              </div>
            </div>

          </div>

          {/* Bottom Fixed Action Bar */}
          <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '430px', background: 'transparent', padding: '12px', boxSizing: 'border-box', zIndex: 100 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '13px', color: '#555555', display: 'block', fontWeight: '500' }}>Subtotal</span>
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#CCA266' }}>₹{subtotal}</span>
              </div>
              <button
                type="button"
                disabled={selectedItems.length === 0}
                onClick={() => setStep(3)}
                style={{
                  background: selectedItems.length > 0 ? '#CCA266' : '#E5E7EB',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '16px',
                  height: '48px',
                  padding: '0 24px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: selectedItems.length > 0 ? 'pointer' : 'not-allowed',
                  transition: 'opacity 0.2s ease',
                  opacity: selectedItems.length > 0 ? 1 : 0.5
                }}
              >
                Proceed to Delivery & Pickup
              </button>
            </div>
          </div>
        </>
      )}

      {/* STEP 3: CONFIRM DELIVERY OR PICKUP & PAYMENT */}
      {step === 3 && (
        <>
          <StepHeader title="Fulfillment & Payment" onBackPress={() => setStep(2)} />

          <div style={{ padding: '0 12px 20px', maxWidth: '430px', margin: '0 auto', boxSizing: 'border-box' }}>
            
                      {/* Select Sample Collection / Fulfillment Method */}
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '600', color: '#000000' }}>
                Select Delivery / Pickup Method
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Full-width Home Delivery Button */}
                <button
                  type="button"
                  onClick={() => setFulfillmentType('delivery')}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '16px',
                    border: fulfillmentType === 'delivery' ? '1px solid #CCA266' : '1px solid #E5E7EB',
                    backgroundColor: fulfillmentType === 'delivery' ? '#FFFDF9' : '#FFFFFF',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxSizing: 'border-box'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: fulfillmentType === 'delivery' ? '#CCA266' : '#000000', display: 'block' }}>
                      Home Delivery
                    </span>
                    <span style={{ fontSize: '13px', color: '#555555', marginTop: '6px', display: 'block' }}>
                      Express delivery to your home address
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed #E5E7EB' }}>
                      <img src={googleLocationIcon} alt="Pin" style={{ width: '14px', height: '14px' }} />
                      <span style={{ fontSize: '13px', color: '#000000', fontWeight: '500' }}>
                        Flat 402, St. Marys Residency, Ernakulam, Kerala
                      </span>
                    </div>
                  </div>
                  {/* Icon-only indicator for Home Delivery */}
                  {fulfillmentType === 'delivery' ? (
                    <img src={checkMarkIcon} alt="Selected" style={{ width: '24px', height: '24px', flexShrink: 0 }} />
                  ) : (
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', border: '1.5px solid #D0D5DD', display: 'inline-block', flexShrink: 0, boxSizing: 'border-box' }} />
                  )}
                </button>

                {/* Hospital Card for Pharmacy Pickup */}
                <div 
                  className="hospital-card" 
                  onClick={() => setFulfillmentType('pickup')}
                  style={{
                    cursor: 'pointer',
                    margin: 0,
                    border: fulfillmentType === 'pickup' ? '1.5px solid #CCA266' : '1px solid #E5E7EB',
                    backgroundColor: fulfillmentType === 'pickup' ? '#FFFDF9' : '#FFFFFF',
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
                        <h3 className="hospital-card-name" style={{ fontSize: '16px', fontWeight: '600', color: fulfillmentType === 'pickup' ? '#CCA266' : '#000000', margin: 0 }}>
                          St. Mary's Medical
                        </h3>
                        <div className="hospital-open-row" style={{ marginTop: '4px' }}>
                          <img src="/clock-icon.svg" alt="" aria-hidden="true" className="hospital-clock-icon" />
                          <span className="hospital-open-text">Open 24/7 • Visit Pharmacy</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Icon-only indicator for Pharmacy Pickup on top right */}
                    {fulfillmentType === 'pickup' ? (
                      <img src={checkMarkIcon} alt="Selected" style={{ width: '24px', height: '24px', flexShrink: 0, marginTop: '2px' }} />
                    ) : (
                      <span style={{ width: '22px', height: '22px', borderRadius: '50%', border: '1.5px solid #D0D5DD', display: 'inline-block', flexShrink: 0, marginTop: '2px', boxSizing: 'border-box' }} />
                    )}
                  </div>

                  <div className="hospital-address-container" style={{ margin: 0 }}>
                    <img src={googleLocationIcon} alt="Map Location Pin" className="hospital-google-pin" />
                    <p className="hospital-address-text" style={{ fontSize: '13px' }}>
                      161B, 1st Floor, 6th Main, 3RD Cross Road, JP Nagar, Bangalore
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Payment Method Options */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #F2F4F7', padding: '16px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#000000', margin: '0 0 12px 0' }}>Payment Method</h3>

              {[
                { id: 'upi', title: 'UPI (Google Pay)', sub: 'Instant & Secure Payment' }
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setPaymentMethod(opt.id)}
                  style={{
                    border: paymentMethod === opt.id ? '1.5px solid #CCA266' : '1px solid #E5E7EB',
                    borderRadius: '12px',
                    padding: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: paymentMethod === opt.id ? '#FFFDF9' : '#FFFFFF'
                  }}
                >
                  {paymentMethod === opt.id ? (
                    <img src={checkMarkIcon} alt="Selected" style={{ width: '20px', height: '20px', flexShrink: 0, display: 'block' }} />
                  ) : (
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #D1D5DB', boxSizing: 'border-box', flexShrink: 0 }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#000000', display: 'block' }}>{opt.title}</span>
                    <span style={{ fontSize: '13px', color: '#555555', fontWeight: '500' }}>{opt.sub}</span>
                    
                    {opt.id === 'upi' && paymentMethod === 'upi' && (
                      <div 
                        onClick={(e) => e.stopPropagation()} 
                        style={{ marginTop: '10px', display: 'flex', gap: '8px', alignItems: 'center' }}
                      >
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="Enter or paste UPI ID (e.g. mobile@upi)"
                          style={{
                            flex: 1,
                            height: '38px',
                            borderRadius: '8px',
                            border: '1px solid #D1D5DB',
                            padding: '0 10px',
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
                            height: '38px',
                            padding: '0 14px',
                            borderRadius: '8px',
                            border: '1px solid #CCA266',
                            background: '#CCA266',
                            color: '#FFFFFF',
                            fontSize: '12px',
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

            {/* Payment Summary */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #F2F4F7', padding: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#000000', margin: '0 0 12px 0' }}>Payment Summary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555555' }}>
                  <span>Selected Items Subtotal ({selectedItems.length})</span>
                  <span style={{ color: '#000000', fontWeight: '600' }}>₹{subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555555' }}>
                  <span>Delivery Charge</span>
                  <span style={{ color: '#10B981', fontWeight: '700' }}>FREE</span>
                </div>
                <hr style={{ border: 'none', borderBottom: '1px solid #F2F4F7', margin: '4px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '700', color: '#000000' }}>
                  <span>Total Amount</span>
                  <span style={{ color: '#CCA266' }}>₹{totalAmount}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Fixed Action Bar */}
          <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '430px', background: 'transparent', padding: '12px', boxSizing: 'border-box', zIndex: 100 }}>
            <button
              type="button"
              onClick={() => setStep(4)}
              style={{
                width: '100%',
                height: '48px',
                background: '#CCA266',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '16px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Confirm & Place Order (₹{totalAmount})
            </button>
          </div>
        </>
      )}

      {/* STEP 4: ORDER CONFIRMED SUCCESS */}
      {step === 4 && (
        <div className="booking-flow-container booking-confirmed-page" style={{ padding: '24px 12px 95px 12px', maxWidth: '430px', margin: '0 auto', boxSizing: 'border-box' }}>
          <div className="booking-confirmed-body" style={{ textAlign: 'center' }}>

            {/* Checkmark */}
            <div className="booking-confirmed-check-wrap" style={{ display: 'flex', justifyContent: 'center', margin: '0 auto 20px' }}>
              <img src={checkMarkIcon} alt="Confirmed" style={{ width: '80px', height: '80px', display: 'block' }} />
            </div>

            <h1 className="booking-confirmed-title" style={{ fontSize: '20px', fontWeight: '700', color: '#000000', margin: '0 0 8px 0' }}>Medication Order Confirmed!</h1>
            <p className="booking-confirmed-subtitle" style={{ fontSize: '13px', color: '#555555', margin: '0 0 20px 0', lineHeight: '1.5' }}>
              Your prescribed medications order has been placed successfully with {fulfillmentType === 'pickup' ? 'St. Mary’s Pharmacy Counter' : 'Express Doorstep Delivery'}.
            </p>

            {/* Summary Card */}
            <div className="booking-summary-card" style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #F2F4F7', padding: '16px', width: '100%', boxSizing: 'border-box', marginBottom: '20px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '13px' }}>
                <span style={{ color: '#555555' }}>Order ID</span>
                <span style={{ fontWeight: '700', color: '#000000' }}>#MED-2026-8941</span>
              </div>
              <hr style={{ border: 'none', borderBottom: '1px solid #F2F4F7', margin: '4px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '13px' }}>
                <span style={{ color: '#555555' }}>Fulfillment</span>
                <span style={{ fontWeight: '700', color: '#10B981' }}>{fulfillmentType === 'pickup' ? 'Hospital Pickup (Counter 3)' : 'Express Home Delivery'}</span>
              </div>
              <hr style={{ border: 'none', borderBottom: '1px solid #F2F4F7', margin: '4px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '13px' }}>
                <span style={{ color: '#555555' }}>Prescribing Specialist</span>
                <span style={{ fontWeight: '700', color: '#000000' }}>{selectedRx.doctor.name}</span>
              </div>
              <hr style={{ border: 'none', borderBottom: '1px solid #F2F4F7', margin: '4px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '13px' }}>
                <span style={{ color: '#555555' }}>Total Amount Paid</span>
                <span style={{ fontWeight: '700', color: '#CCA266' }}>₹{totalAmount}</span>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', borderRadius: '12px', border: '1px solid #E6D0AC', padding: '12px', marginBottom: '24px', fontSize: '13px', color: '#555555', textAlign: 'center' }}>
              Keep this confirmation handy. You will receive an SMS notification once your order is prepared.
            </div>

          </div>

          {/* Bottom Fixed Action Bar */}
          <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '430px', background: 'transparent', padding: '12px', boxSizing: 'border-box', zIndex: 100 }}>
            <button
              onClick={() => onComplete ? onComplete() : onBack()}
              type="button"
              style={{
                width: '100%',
                height: '48px',
                background: '#CCA266',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '16px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
