import React, { useState, useEffect } from 'react';
import continueArrow from '../assets/Continue Arrow.svg';
import googleLocationIcon from '../assets/Google Location.svg';
import checkMarkIcon from '../assets/Marked.svg';

const initialMedications = [
  {
    id: 1,
    name: 'Amoxicillin 250mg',
    details: '1 Capsule • Twice a day • Before Meals • 5 Days',
    price: 120,
    quantity: 1,
    selected: true
  },
  {
    id: 2,
    name: 'Amoxicillin 250mg',
    details: '1 Capsule • Twice a day • Before Meals • 5 Days',
    price: 120,
    quantity: 1,
    selected: true
  },
  {
    id: 3,
    name: 'Amoxicillin 250mg',
    details: '1 Capsule • Twice a day • Before Meals • 5 Days',
    price: 120,
    quantity: 1,
    selected: true
  }
];

export default function OrderMedicationFlow({ onBack, onComplete }) {
  const [step, setStep] = useState(1);
  const [items, setItems] = useState(initialMedications);
  const [deliveryOption, setDeliveryOption] = useState('express');
  const [paymentMethod, setPaymentMethod] = useState('upi');

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
  }, [step]);

  const toggleSelect = (id) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const updateQuantity = (id, delta) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const selectedItems = items.filter(i => i.selected);
  const subtotal = selectedItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const deliveryFee = 0; // FREE for AHC Members
  const totalAmount = subtotal + deliveryFee;

  const StepHeader = ({ title, onBackPress }) => (
    <header className="booking-step-header" style={{ position: 'relative', background: 'transparent', padding: '16px 12px 8px', display: 'flex', alignItems: 'center', gap: '12px', maxWidth: '430px', margin: '0 auto' }}>
      <button className="booking-back-btn" onClick={onBackPress} aria-label="Go back" style={{ background: '#FFFFFF', border: '1px solid #F2F4F7', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '16px', height: '14px' }} />
      </button>
      <h1 className="booking-step-title" style={{ fontSize: '18px', fontWeight: '600', color: '#000000', margin: 0, flex: 1 }}>{title}</h1>
    </header>
  );

  const StepDots = () => (
    <div className="booking-step-dots" style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '8px 0 16px', background: 'transparent', maxWidth: '430px', margin: '0 auto' }}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`booking-step-dot ${step === i ? 'active' : ''}`}
          style={{
            width: step === i ? '24px' : '8px',
            height: '8px',
            borderRadius: '4px',
            background: step === i ? '#CCA266' : '#E5E7EB',
            transition: 'all 0.3s ease'
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="order-med-flow-container" style={{ background: '#F9FAFB', minHeight: '100vh', paddingBottom: '90px' }}>
      
      {/* STEP 1: SELECT & REVIEW MEDICATIONS */}
      {step === 1 && (
        <>
          <StepHeader title="Order Prescribed Medications" onBackPress={onBack} />
          <StepDots />

          <div style={{ padding: '0 12px 20px', maxWidth: '430px', margin: '0 auto', boxSizing: 'border-box' }}>
            
            {/* Prescription Doctor Info */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #F2F4F7', padding: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#F2F4F7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: '#CCA266', fontSize: '15px' }}>
                  AC
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#000000', margin: 0 }}>Dr. Amelia Carter</h3>
                  <p style={{ fontSize: '13px', color: '#555555', margin: '2px 0 0 0', fontWeight: '500' }}>
                    Cardiology Specialist • St. Mary's Medical
                  </p>
                </div>
              </div>
              <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #F2F4F7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                <span style={{ color: '#555555', fontWeight: '500' }}>Prescription Date</span>
                <span style={{ color: '#000000', fontWeight: '600' }}>Today, Jul 11, 2026</span>
              </div>
            </div>

            {/* Prescribed Items Section Title */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#000000', margin: 0 }}>
                Active Prescriptions ({items.length})
              </h2>
              <span style={{ fontSize: '13px', color: '#CCA266', fontWeight: '500' }}>All Verified</span>
            </div>

            {/* List of Prescribed Medicines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {items.map((med) => (
                <div key={med.id} style={{ background: '#FFFFFF', borderRadius: '16px', border: med.selected ? '1.5px solid #CCA266' : '1px solid #F2F4F7', padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start', transition: 'all 0.2s ease' }}>
                  <div 
                    onClick={() => toggleSelect(med.id)}
                    style={{ 
                      marginTop: '2px', 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      border: med.selected ? 'none' : '2px solid #D1D5DB', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      cursor: 'pointer',
                      flexShrink: 0 
                    }}
                  >
                    {med.selected && <img src={checkMarkIcon} alt="Selected" style={{ width: '20px', height: '20px', display: 'block' }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#000000', margin: 0 }}>{med.name}</h4>
                      <span style={{ fontSize: '15px', fontWeight: '600', color: '#CCA266' }}>₹{med.price * med.quantity}</span>
                    </div>
                    <p style={{ fontSize: '13px', color: '#555555', margin: '4px 0 10px 0', lineHeight: '1.4', fontWeight: '500' }}>
                      {med.details}
                    </p>

                    {/* Quantity Selector */}
                    {med.selected && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                        <span style={{ fontSize: '13px', color: '#555555', fontWeight: '500' }}>Quantity:</span>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E5E7EB', borderRadius: '100px', background: '#F9FAFB', overflow: 'hidden' }}>
                          <button
                            type="button"
                            onClick={() => updateQuantity(med.id, -1)}
                            style={{ border: 'none', background: 'transparent', padding: '4px 12px', fontWeight: '600', cursor: 'pointer', color: '#000000' }}
                          >
                            -
                          </button>
                          <span style={{ fontSize: '13px', fontWeight: '600', color: '#000000', minWidth: '20px', textAlign: 'center' }}>{med.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(med.id, 1)}
                            style={{ border: 'none', background: 'transparent', padding: '4px 12px', fontWeight: '600', cursor: 'pointer', color: '#000000' }}
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

            {/* Delivery Address Card */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #F2F4F7', padding: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <img src={googleLocationIcon} alt="Pin" style={{ width: '20px', height: '20px', flexShrink: 0, marginTop: '2px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>Delivery Address</span>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#CCA266', cursor: 'pointer' }}>Change</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#555555', margin: '4px 0 0 0', lineHeight: '1.4', fontWeight: '500' }}>
                    161B, 1st Floor, 6th Main, 3RD Cross Road, 3RD PHASE J P Nagar, Bangalore, Karnataka, India
                  </p>
                </div>
              </div>
            </div>

            {/* Bill Summary */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #F2F4F7', padding: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#000000', margin: '0 0 12px 0' }}>Bill Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555555' }}>
                  <span>Item Subtotal ({selectedItems.length} items)</span>
                  <span style={{ color: '#000000', fontWeight: '500' }}>₹{subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555555' }}>
                  <span>Express Delivery Fee</span>
                  <span style={{ color: '#10B981', fontWeight: '600' }}>FREE (AHC Member)</span>
                </div>
                <hr style={{ border: 'none', borderBottom: '1px solid #F2F4F7', margin: '6px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '600', color: '#000000' }}>
                  <span>Total Amount</span>
                  <span style={{ color: '#CCA266' }}>₹{totalAmount}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Fixed Action Bar */}
          <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '430px', background: '#FFFFFF', padding: '12px', boxSizing: 'border-box', zIndex: 100 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box' }}>
              <div>
                <span style={{ fontSize: '13px', color: '#555555', display: 'block', fontWeight: '500' }}>Total Payable</span>
                <span style={{ fontSize: '18px', fontWeight: '600', color: '#CCA266' }}>₹{totalAmount}</span>
              </div>
              <button
                type="button"
                disabled={selectedItems.length === 0}
                onClick={() => setStep(2)}
                style={{
                  background: selectedItems.length > 0 ? '#CCA266' : '#E5E7EB',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '16px',
                  height: '50px',
                  padding: '0 24px',
                  fontSize: '15px',
                  fontWeight: '500',
                  letterSpacing: '0.1px',
                  cursor: selectedItems.length > 0 ? 'pointer' : 'not-allowed',
                  transition: 'opacity 0.2s ease',
                  opacity: selectedItems.length > 0 ? 1 : 0.4
                }}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </>
      )}

      {/* STEP 2: DELIVERY & PAYMENT OPTIONS */}
      {step === 2 && (
        <>
          <StepHeader title="Delivery & Payment" onBackPress={() => setStep(1)} />
          <StepDots />

          <div style={{ padding: '0 12px 20px', maxWidth: '430px', margin: '0 auto', boxSizing: 'border-box' }}>
            
            {/* Delivery Speed Options */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #F2F4F7', padding: '16px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#000000', margin: '0 0 12px 0' }}>Select Delivery Speed</h3>
              
              <div 
                onClick={() => setDeliveryOption('express')}
                style={{
                  border: deliveryOption === 'express' ? '1.5px solid #CCA266' : '1px solid #E5E7EB',
                  borderRadius: '12px',
                  padding: '14px',
                  marginBottom: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: deliveryOption === 'express' ? '#FFFDF9' : '#FFFFFF'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>Express Delivery</span>
                    <span style={{ background: '#CCA266', color: '#FFFFFF', fontSize: '13px', fontWeight: '600', padding: '2px 8px', borderRadius: '100px' }}>Fastest</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#555555', margin: '4px 0 0 0', fontWeight: '500' }}>Delivery within 2 Hours • St. Mary's Pharmacy</p>
                </div>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#10B981' }}>FREE</span>
              </div>

              <div 
                onClick={() => setDeliveryOption('standard')}
                style={{
                  border: deliveryOption === 'standard' ? '1.5px solid #CCA266' : '1px solid #E5E7EB',
                  borderRadius: '12px',
                  padding: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: deliveryOption === 'standard' ? '#FFFDF9' : '#FFFFFF'
                }}
              >
                <div>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>Standard Delivery</span>
                  <p style={{ fontSize: '13px', color: '#555555', margin: '4px 0 0 0', fontWeight: '500' }}>Delivered Tomorrow by 10:00 AM</p>
                </div>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#10B981' }}>FREE</span>
              </div>
            </div>

            {/* Payment Method Options */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #F2F4F7', padding: '16px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#000000', margin: '0 0 12px 0' }}>Payment Method</h3>

              {[
                { id: 'upi', title: 'UPI (GPay / PhonePe / Paytm)', sub: 'Instant & Seamless Payment' },
                { id: 'wallet', title: 'AHC Health Wallet', sub: 'Balance: ₹1,500 Available' },
                { id: 'card', title: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay' },
                { id: 'cod', title: 'Cash on Delivery', sub: 'Pay cash upon receiving medicine' }
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setPaymentMethod(opt.id)}
                  style={{
                    border: paymentMethod === opt.id ? '1.5px solid #CCA266' : '1px solid #E5E7EB',
                    borderRadius: '12px',
                    padding: '14px',
                    marginBottom: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: paymentMethod === opt.id ? '#FFFDF9' : '#FFFFFF'
                  }}
                >
                  {paymentMethod === opt.id ? (
                    <img src={checkMarkIcon} alt="Selected" style={{ width: '20px', height: '20px', flexShrink: 0, display: 'block' }} />
                  ) : (
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: '2px solid #D1D5DB',
                      boxSizing: 'border-box',
                      flexShrink: 0
                    }} />
                  )}
                  <div>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000', display: 'block' }}>{opt.title}</span>
                    <span style={{ fontSize: '13px', color: '#555555', fontWeight: '500' }}>{opt.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Final Amount Box */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #F2F4F7', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '13px', color: '#555555', fontWeight: '500', display: 'block' }}>Total Amount to Pay</span>
                <span style={{ fontSize: '20px', fontWeight: '600', color: '#000000' }}>₹{totalAmount}</span>
              </div>
              <span style={{ fontSize: '13px', color: '#10B981', background: '#ECFDF5', padding: '4px 10px', borderRadius: '100px', fontWeight: '600' }}>
                Prescription Verified
              </span>
            </div>

          </div>

          {/* Bottom Fixed Action Bar */}
          <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '430px', background: '#FFFFFF', padding: '12px', boxSizing: 'border-box', zIndex: 100 }}>
            <div style={{ padding: '0', boxSizing: 'border-box' }}>
              <button
                type="button"
                onClick={() => setStep(3)}
                style={{
                  width: '100%',
                  height: '50px',
                  background: '#CCA266',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '16px',
                  fontSize: '15px',
                  fontWeight: '500',
                  letterSpacing: '0.1px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'opacity 0.2s ease'
                }}
              >
                Confirm & Place Order (₹{totalAmount})
              </button>
            </div>
          </div>
        </>
      )}

      {/* STEP 3: ORDER CONFIRMED SUCCESS */}
      {step === 3 && (
        <div className="booking-flow-container booking-confirmed-page">
          <div className="booking-confirmed-body">

            {/* Checkmark */}
            <div className="booking-confirmed-check-wrap">
              <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                <circle cx="36" cy="36" r="36" fill="#FFFFFF" />
                <polyline points="18,36 30,49 54,23" stroke="#CCA266" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h1 className="booking-confirmed-title">Medication Order Confirmed!</h1>
            <p className="booking-confirmed-subtitle">Your doctor prescribed medications have been dispatched to St. Mary's Pharmacy for express delivery.</p>

            {/* Summary Card */}
            <div className="booking-summary-card" style={{ width: '100%' }}>
              <div className="booking-summary-row">
                <span className="booking-summary-label">Order ID</span>
                <span className="booking-summary-value">#MED-2026-8941</span>
              </div>
              <div className="booking-summary-divider" />
              <div className="booking-summary-row">
                <span className="booking-summary-label">Estimated Delivery</span>
                <span className="booking-summary-value" style={{ color: '#10B981' }}>Today by 4:00 PM</span>
              </div>
              <div className="booking-summary-divider" />
              <div className="booking-summary-row">
                <span className="booking-summary-label">Prescribing Specialist</span>
                <span className="booking-summary-value">Dr. Amelia Carter</span>
              </div>
              <div className="booking-summary-divider" />
              <div className="booking-summary-row">
                <span className="booking-summary-label">Delivering Pharmacy</span>
                <span className="booking-summary-value">St. Mary's Medical Store</span>
              </div>
              <div className="booking-summary-divider" />
              <div className="booking-summary-row">
                <span className="booking-summary-label">Total Amount Paid</span>
                <span className="booking-summary-value" style={{ color: '#CCA266' }}>₹{totalAmount}</span>
              </div>
            </div>

            <div className="booking-confirmed-note">
              <p>Please keep this confirmation handy. Your medicines will be delivered to your registered address.</p>
            </div>

          </div>

          <div className="booking-cta-bar">
            <button className="booking-cta-btn" onClick={() => onComplete ? onComplete() : onBack()} type="button">
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
}


