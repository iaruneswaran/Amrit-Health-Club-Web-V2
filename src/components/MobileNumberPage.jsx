import React, { useState } from 'react';
import continueArrow from '../assets/Continue Arrow.svg';

export default function MobileNumberPage({ onBack }) {
  const [phone, setPhone] = useState('+91 9876543210');
  const [newPhone, setNewPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('view'); // 'view' | 'edit' | 'otp' | 'success'
  const [countdown, setCountdown] = useState(0);

  const startCountdown = () => {
    setCountdown(30);
    const t = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(t); return 0; }
        return c - 1;
      });
    }, 1000);
  };

  const handleSendOtp = () => {
    if (!newPhone || newPhone.replace(/\D/g, '').length < 10) return;
    startCountdown();
    setStep('otp');
  };

  const handleVerify = () => {
    if (otp.length < 4) return;
    setPhone(newPhone);
    setStep('success');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F2F4F7' }}>
      {/* Header */}
      <div style={{ background: 'transparent', padding: '20px 12px 16px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 100 }}>
        <button onClick={step === 'otp' ? () => setStep('edit') : step === 'edit' ? () => setStep('view') : step === 'success' ? () => setStep('view') : onBack} style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'transform 0.2s ease' }}>
          <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '16px', height: '14px' }} />
        </button>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '500', color: '#000000' }}>Mobile Number</h1>
      </div>

      <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {step === 'view' && (
          <>
            {/* Current number card */}
            <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '20px' }}>
              <p style={{ margin: '0 0 6px', fontSize: '13px', color: '#555555', fontWeight: '500' }}>Current mobile number</p>
              <p style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#000000', letterSpacing: '1px' }}>{phone}</p>
              <div style={{ marginTop: '14px', background: '#E8F5E9', borderRadius: '10px', padding: '10px 14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span style={{ fontSize: '13px', color: '#2E7D32', fontWeight: '600' }}>Verified</span>
              </div>
            </div>

            <button onClick={() => { setNewPhone(''); setStep('edit'); }} style={{ background: '#CCA266', color: '#FFFFFF', border: 'none', borderRadius: '100px', padding: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', width: '100%' }}>
              Change Number
            </button>
          </>
        )}

        {step === 'edit' && (
          <>
            <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <p style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: '600', color: '#000000' }}>Enter new number</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#555555' }}>We'll send a verification OTP to this number.</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ background: '#F2F4F7', borderRadius: '12px', padding: '12px 14px', fontWeight: '600', fontSize: '14px', color: '#000000', whiteSpace: 'nowrap' }}>+91</div>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={e => setNewPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  style={{ flex: 1, background: '#F2F4F7', border: '1.5px solid #CCA266', borderRadius: '12px', padding: '12px 14px', fontSize: '15px', fontWeight: '500', outline: 'none', letterSpacing: '2px' }}
                />
              </div>
            </div>
            <button onClick={handleSendOtp} style={{ background: '#CCA266', color: '#FFFFFF', border: 'none', borderRadius: '100px', padding: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', width: '100%', opacity: newPhone.replace(/\D/g,'').length >= 10 ? 1 : 0.5 }}>
              Send OTP
            </button>
          </>
        )}

        {step === 'otp' && (
          <>
            <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <p style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: '600', color: '#000000' }}>Verify your number</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#555555' }}>Enter the OTP sent to <strong>+91 {newPhone}</strong></p>
              </div>
              {/* OTP boxes */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <div key={i} style={{ width: '42px', height: '52px', background: '#F2F4F7', borderRadius: '12px', border: otp[i] ? '2px solid #CCA266' : '2px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '700', color: '#000000' }}>
                    {otp[i] || ''}
                  </div>
                ))}
              </div>
              {/* Hidden real input for keyboard */}
              <input
                type="tel"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                style={{ position: 'absolute', opacity: 0, width: '1px', height: '1px', pointerEvents: 'none' }}
                autoFocus
              />
              <button onClick={() => document.querySelector('input[type="tel"]')?.focus()}
                style={{ background: '#F2F4F7', border: 'none', borderRadius: '12px', padding: '12px', fontSize: '14px', fontWeight: '500', color: '#000000', cursor: 'pointer' }}>
                Tap to type OTP
              </button>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#555555' }}>Didn't receive OTP?</span>
                {countdown > 0
                  ? <span style={{ fontSize: '13px', color: '#CCA266', fontWeight: '600' }}>Resend in {countdown}s</span>
                  : <button onClick={() => { startCountdown(); }} style={{ background: 'none', border: 'none', color: '#CCA266', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Resend OTP</button>
                }
              </div>
            </div>
            <button onClick={handleVerify} style={{ background: '#CCA266', color: '#FFFFFF', border: 'none', borderRadius: '100px', padding: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', width: '100%', opacity: otp.length >= 4 ? 1 : 0.5 }}>
              Verify & Save
            </button>
          </>
        )}

        {step === 'success' && (
          <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '32px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', background: '#E8F5E9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#000000' }}>Number Updated!</h2>
            <p style={{ margin: 0, fontSize: '14px', color: '#555555' }}>Your mobile number has been updated to</p>
            <p style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#CCA266' }}>+91 {newPhone}</p>
            <button onClick={() => setStep('view')} style={{ background: '#CCA266', color: '#FFFFFF', border: 'none', borderRadius: '100px', padding: '13px 32px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' }}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
