import React, { useState } from 'react';
import { createPortal } from 'react-dom';

export default function VideoConsultationModal({ isOpen, onClose }) {
  const [step, setStep] = useState('select'); // 'select' | 'calling' | 'inCall'
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState('General Physician');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  if (!isOpen) return null;

  const specialties = [
    'General Physician',
    'Cardiology',
    'Pediatrics',
    'Dermatology',
    'Gynaecology'
  ];

  const doctorsList = [
    {
      id: 1,
      name: 'Dr. Amelia Carter',
      specialty: 'Cardiology Specialist',
      hospital: 'Amrit City Hospital',
      experience: '12+ Yrs Exp',
      rating: '4.9 ★',
      fee: '₹499',
      image: '/doctor-image.png',
      online: true
    },
    {
      id: 2,
      name: 'Dr. Robert Hayes',
      specialty: 'General Physician',
      hospital: 'Amrit Health Hub',
      experience: '9+ Yrs Exp',
      rating: '4.8 ★',
      fee: '₹399',
      image: '/doctor-image.png',
      online: true
    },
    {
      id: 3,
      name: 'Dr. Sarah Jenkins',
      specialty: 'Pediatrics Specialist',
      hospital: 'Amrit Care Clinic',
      experience: '11+ Yrs Exp',
      rating: '4.9 ★',
      fee: '₹450',
      image: '/doctor-image.png',
      online: true
    }
  ];

  const startCall = (doctor) => {
    setSelectedDoctor(doctor);
    setStep('calling');
    setTimeout(() => {
      setStep('inCall');
    }, 2500);
  };

  const endCall = () => {
    setStep('select');
    setSelectedDoctor(null);
    onClose();
  };

  return createPortal(
    <div 
      className="video-consult-modal-overlay" 
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 1150,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}
    >
      <div 
        className="video-consult-modal-sheet" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '430px',
          backgroundColor: step === 'inCall' ? '#111827' : '#FFFFFF',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          padding: step === 'inCall' ? '0' : '24px 20px 28px 20px',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.25)',
          maxHeight: '90vh',
          overflowY: 'auto',
          transition: 'background-color 0.3s ease'
        }}
      >
        {step === 'select' && (
          <>
            {/* Top Handle */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '4px', borderRadius: '2px', backgroundColor: '#F2F4F7' }} />
            </div>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#000000', margin: 0 }}>
                  Instant Video Consultation
                </h3>
                <p style={{ fontSize: '13px', color: '#555555', margin: '2px 0 0 0' }}>
                  Select a specialist and start video call instantly
                </p>
              </div>
              <button 
                onClick={onClose}
                style={{
                  background: '#F2F4F7',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  color: '#000000'
                }}
              >
                &times;
              </button>
            </div>

            {/* Specialty Pills */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px', scrollbarWidth: 'none' }}>
              {specialties.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  style={{
                    backgroundColor: selectedSpecialty === spec ? '#CCA266' : '#F2F4F7',
                    color: selectedSpecialty === spec ? '#FFFFFF' : '#000000',
                    border: 'none',
                    borderRadius: '100px',
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {spec}
                </button>
              ))}
            </div>

            {/* Doctors List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {doctorsList.map((doc) => (
                <div 
                  key={doc.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #F2F4F7',
                    borderRadius: '18px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ position: 'relative' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#CCA266', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: '700', fontSize: '18px' }}>
                        {doc.name.replace('Dr. ', '').slice(0, 2).toUpperCase()}
                      </div>
                      <span style={{ position: 'absolute', bottom: '2px', right: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22C55E', border: '2px solid #FFFFFF' }} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#000000' }}>{doc.name}</h4>
                      <p style={{ margin: '2px 0', fontSize: '13px', color: '#555555' }}>{doc.specialty}</p>
                      <span style={{ fontSize: '12px', color: '#CCA266', fontWeight: '600' }}>{doc.rating} &bull; {doc.experience}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => startCall(doc)}
                    style={{
                      backgroundColor: '#CCA266',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '100px',
                      padding: '10px 16px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 12px rgba(204, 162, 102, 0.25)'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="23 7 16 12 23 17 23 7"/>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                    </svg>
                    Call Now
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 'calling' && (
          <div style={{ padding: '40px 20px', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#CCA266', color: '#FFFFFF', fontSize: '32px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              {selectedDoctor?.name.replace('Dr. ', '').slice(0, 2).toUpperCase()}
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#000000', margin: '0 0 8px' }}>
              Calling {selectedDoctor?.name}...
            </h3>
            <p style={{ fontSize: '14px', color: '#555555', margin: '0 0 30px' }}>
              Connecting to HD Secure Video Room
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <button
                onClick={endCall}
                style={{
                  backgroundColor: '#EF4444',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '50%',
                  width: '56px',
                  height: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(239, 68, 68, 0.3)'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67M22 2L2 22"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {step === 'inCall' && (
          <div style={{ position: 'relative', height: '480px', borderRadius: '24px', overflow: 'hidden', backgroundColor: '#1E293B' }}>
            {/* Main Video Stream Frame (Doctor View) */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#CCA266', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '38px', fontWeight: '700', marginBottom: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
                {selectedDoctor?.name.replace('Dr. ', '').slice(0, 2).toUpperCase()}
              </div>
              <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#FFFFFF' }}>{selectedDoctor?.name}</h4>
              <span style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px' }}>Connected • 00:42</span>
            </div>

            {/* Self Video PIP (Picture-in-Picture) */}
            <div style={{ position: 'absolute', top: '16px', right: '16px', width: '100px', height: '140px', borderRadius: '16px', backgroundColor: '#334155', border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '12px', fontWeight: '500' }}>
              {isVideoOff ? 'Camera Off' : 'You (Live)'}
            </div>

            {/* Call Controls Overlay Bar */}
            <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(8px)', padding: '12px 24px', borderRadius: '100px' }}>
              <button
                onClick={() => setIsMuted(!isMuted)}
                style={{
                  backgroundColor: isMuted ? '#EF4444' : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {isMuted ? (
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  ) : (
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                  )}
                </svg>
              </button>

              <button
                onClick={endCall}
                style={{
                  backgroundColor: '#EF4444',
                  border: 'none',
                  borderRadius: '50%',
                  width: '52px',
                  height: '52px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67M22 2L2 22"/>
                </svg>
              </button>

              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                style={{
                  backgroundColor: isVideoOff ? '#EF4444' : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7"/>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
