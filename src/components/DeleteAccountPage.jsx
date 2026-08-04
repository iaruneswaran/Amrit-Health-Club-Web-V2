import React, { useState } from 'react';
import continueArrow from '../assets/Continue Arrow.svg';
import deleteIcon from '../assets/Delete Account.svg';

export default function DeleteAccountPage({ onBack }) {
  const [step, setStep] = useState('confirm'); // 'confirm' | 'verify' | 'final'
  const [reason, setReason] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const reasons = [
    'I have a duplicate account',
    'I\'m not getting value from the app',
    'Privacy concerns',
    'Switching to another app',
    'Other',
  ];

  const startCountdown = () => {
    setCountdown(30);
    const t = setInterval(() => {
      setCountdown(c => { if (c <= 1) { clearInterval(t); return 0; } return c - 1; });
    }, 1000);
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    startCountdown();
    setStep('verify');
  };

  const handleDeleteConfirm = () => {
    if (otp.length < 4) return;
    setLoading(true);
    setTimeout(() => {
      localStorage.clear();
      window.location.reload();
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F2F4F7', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: 'transparent', padding: '20px 12px 16px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 100 }}>
        <button
          onClick={step === 'verify' ? () => setStep('confirm') : onBack}
          style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'transform 0.2s ease' }}
        >
          <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '16px', height: '14px' }} />
        </button>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '500', color: '#000000' }}>Delete Account</h1>
      </div>

      <div style={{ padding: '0 16px 32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {step === 'confirm' && (
          <>
            {/* Warning Card */}
            <div style={{ background: '#FFF5F5', borderRadius: '20px', padding: '20px', border: '1.5px solid #FECDD3' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ width: '44px', height: '44px', background: '#FEE2E2', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <img src={deleteIcon} alt="" style={{ width: '22px', height: '22px' }} />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#B91C1C' }}>This action is permanent</p>
                  <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#DC2626' }}>Cannot be undone</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  'All your health records will be deleted',
                  'Appointment history will be lost',
                  'Medication & vitals data removed',
                  'Active subscriptions will be cancelled',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E53935', flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', color: '#555555' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reason */}
            <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '20px' }}>
              <h2 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: '600', color: '#000000' }}>Why are you leaving?</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {reasons.map(r => (
                  <button
                    key={r}
                    onClick={() => setReason(r)}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', background: reason === r ? 'rgba(229,57,53,0.06)' : '#F2F4F7', border: reason === r ? '1.5px solid #E53935' : '1.5px solid transparent', borderRadius: '12px', padding: '12px 14px', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                  >
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: reason === r ? '2px solid #E53935' : '2px solid #CCC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {reason === r && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E53935' }} />}
                    </div>
                    <span style={{ fontSize: '14px', color: '#000000', fontWeight: reason === r ? '600' : '400' }}>{r}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSendOtp}
              disabled={!reason}
              style={{ background: reason ? '#E53935' : '#E5E7EB', color: reason ? '#FFFFFF' : '#9CA3AF', border: 'none', borderRadius: '100px', padding: '15px', fontSize: '16px', fontWeight: '700', cursor: reason ? 'pointer' : 'not-allowed', width: '100%', transition: 'all 0.2s' }}
            >
              Continue to Verification
            </button>
            <button
              onClick={onBack}
              style={{ background: '#FFFFFF', color: '#000000', border: 'none', borderRadius: '100px', padding: '15px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', width: '100%' }}
            >
              Keep My Account
            </button>
          </>
        )}

        {step === 'verify' && (
          <>
            {/* OTP Verify */}
            <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <p style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: '600', color: '#000000' }}>Verify it's you</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#555555' }}>Enter the OTP sent to <strong>+91 9876543210</strong></p>
              </div>

              {/* OTP boxes */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <div key={i} style={{ width: '42px', height: '52px', background: '#F2F4F7', borderRadius: '12px', border: otp[i] ? '2px solid #E53935' : '2px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '700', color: '#000000' }}>
                    {otp[i] || ''}
                  </div>
                ))}
              </div>

              <input
                type="tel"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                autoFocus
                style={{ opacity: 0, position: 'absolute', width: '1px', height: '1px', pointerEvents: 'none' }}
              />

              <button onClick={() => document.querySelector('input[type="tel"]')?.focus()}
                style={{ background: '#F2F4F7', border: 'none', borderRadius: '12px', padding: '12px', fontSize: '14px', color: '#000000', cursor: 'pointer' }}>
                Tap to enter OTP
              </button>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#555555' }}>Didn't receive OTP?</span>
                {countdown > 0
                  ? <span style={{ fontSize: '13px', color: '#CCA266', fontWeight: '600' }}>Resend in {countdown}s</span>
                  : <button onClick={() => startCountdown()} style={{ background: 'none', border: 'none', color: '#CCA266', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Resend OTP</button>
                }
              </div>
            </div>

            <button
              onClick={handleDeleteConfirm}
              disabled={otp.length < 4 || loading}
              style={{ background: otp.length >= 4 && !loading ? '#E53935' : '#E5E7EB', color: otp.length >= 4 && !loading ? '#FFFFFF' : '#9CA3AF', border: 'none', borderRadius: '100px', padding: '15px', fontSize: '16px', fontWeight: '700', cursor: otp.length >= 4 && !loading ? 'pointer' : 'not-allowed', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}
            >
              {loading ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Deleting account...
                </>
              ) : 'Permanently Delete Account'}
            </button>

            <button
              onClick={() => setStep('confirm')}
              style={{ background: '#FFFFFF', color: '#000000', border: 'none', borderRadius: '100px', padding: '15px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', width: '100%' }}
            >
              Go Back
            </button>
          </>
        )}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
