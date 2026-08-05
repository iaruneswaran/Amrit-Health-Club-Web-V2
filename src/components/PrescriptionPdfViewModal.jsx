import React from 'react';
import documentIcon from '../assets/Document.svg';

export default function PrescriptionPdfViewModal({ doctorName, date, onClose }) {
  const isUpcoming = date?.includes('Tomorrow');
  const rxNo = isUpcoming ? 'RX-84291' : 'RX-98412';

  return (
    <div 
      className="report-modal-backdrop" 
      onClick={onClose} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: '#FFFFFF', 
        display: 'flex', 
        alignItems: 'flex-start', 
        justifyContent: 'center', 
        zIndex: 99999, 
        padding: '0px' 
      }}
    >
      {/* Pure PDF Document - Full Height White Mobile */}
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '430px',
          height: '100vh',
          maxHeight: '100vh',
          overflowY: 'auto',
          backgroundColor: '#FFFFFF',
          borderRadius: '0px',
          padding: '24px 20px 40px',
          boxShadow: 'none',
          fontFamily: "'Inter', Arial, sans-serif",
          color: '#000000',
          position: 'relative',
          animation: 'fadeInModal 0.25s ease-out'
        }}
      >
        {/* Floating Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: '#F2F4F7',
            border: 'none',
            color: '#000000',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            zIndex: 10
          }}
          aria-label="Close PDF"
        >
          ✕
        </button>

        {/* Hospital PDF Header */}
        <div style={{ borderBottom: '2px solid #F2F4F7', paddingBottom: '14px', marginBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#000000', letterSpacing: '-0.3px' }}>
            ST. MARY'S MEDICAL CENTER
          </h2>
          <p style={{ margin: '3px 0 0 0', fontSize: '13px', fontWeight: '500', color: '#555555' }}>
            NABH &amp; ISO 9001:2015 Accredited Multi-Specialty Hospital
          </p>
          <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#666666' }}>
            124 Healthcare Blvd · Reg No: MC-98421 · Ph: +91 44 2839 0000
          </p>
        </div>

        {/* Prescription Banner Header */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #F2F4F7',
          borderLeft: '4px solid #CCA266',
          padding: '12px 14px',
          marginBottom: '18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '8px'
        }}>
          <div>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#CCA266', display: 'block' }}>
              OFFICIAL DIGITAL PRESCRIPTION (Rx)
            </span>
            <span style={{ fontSize: '12px', color: '#555555', marginTop: '2px', display: 'block' }}>
              Issued by {doctorName || 'Dr. Amelia Carter'}
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#000000', display: 'block' }}>
              {rxNo}
            </span>
            <span style={{ fontSize: '12px', color: '#555555' }}>
              {date || '15 Jul 2026'}
            </span>
          </div>
        </div>

        {/* Patient & Doctor Meta Section */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #F2F4F7',
          borderRadius: '12px',
          padding: '14px',
          marginBottom: '18px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px'
        }}>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#666666', fontWeight: '600', letterSpacing: '0.5px' }}>
              PATIENT DETAILS
            </span>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', fontWeight: '600', color: '#000000' }}>
              Ryan Gosling
            </p>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#555555' }}>
              Male, 36 Yrs · ID: AHC-9824
            </p>
          </div>

          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#666666', fontWeight: '600', letterSpacing: '0.5px' }}>
              ATTENDING DOCTOR
            </span>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', fontWeight: '600', color: '#000000' }}>
              {doctorName || 'Dr. Amelia Carter'}
            </p>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#555555' }}>
              Cardiology Specialist
            </p>
          </div>
        </div>

        {/* Diagnosis & Vitals Summary */}
        <div style={{ marginBottom: '18px', backgroundColor: '#FFFFFF', border: '1px solid #F2F4F7', borderRadius: '12px', padding: '14px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#666666', fontWeight: '600', letterSpacing: '0.5px' }}>
            CLINICAL DIAGNOSIS &amp; VITALS
          </span>
          <p style={{ margin: '6px 0 8px 0', fontSize: '14px', fontWeight: '500', color: '#000000' }}>
            Routine Cardiology Assessment &amp; Mild BP Spike Monitoring
          </p>
          <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#555555', borderTop: '1px dashed #F2F4F7', paddingTop: '8px' }}>
            <span><strong>BP:</strong> 128/84 mmHg</span>
            <span><strong>Pulse:</strong> 76 bpm</span>
            <span><strong>SpO₂:</strong> 99%</span>
          </div>
        </div>

        {/* Prescribed Medications Rx Table */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#000000', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Rx Prescribed Medicines
            </span>
            <span style={{ fontSize: '12px', color: '#555555', fontWeight: '500' }}>3 Medications</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { name: 'Amoxicillin 250mg', form: 'Capsule', dosage: '1 Cap • Twice a day • Before Meals • 5 Days', note: 'Take with full glass of water' },
              { name: 'Pantoprazole 40mg', form: 'Tablet', dosage: '1 Tab • Once daily • Morning Empty Stomach • 5 Days', note: 'Antacid protection' },
              { name: 'Paracetamol 500mg', form: 'Tablet', dosage: '1 Tab • As needed for pain • After Meals', note: 'Max 3 tabs daily' }
            ].map((med, idx) => (
              <div key={idx} style={{ backgroundColor: '#FFFFFF', border: '1px solid #F2F4F7', borderRadius: '12px', padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#000000' }}>
                    {idx + 1}. {med.name}
                  </p>
                  <span style={{ fontSize: '11px', backgroundColor: '#F2F4F7', color: '#555555', padding: '2px 8px', borderRadius: '4px', fontWeight: '500' }}>
                    {med.form}
                  </span>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#333333', fontWeight: '500' }}>
                  {med.dosage}
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#666666', fontStyle: 'italic' }}>
                  Note: {med.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Advice */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #F2F4F7', borderRadius: '12px', padding: '14px', marginBottom: '24px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#666666', fontWeight: '600', letterSpacing: '0.5px' }}>
            PHYSICIAN ADVICE &amp; FOLLOW-UP
          </span>
          <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#333333', lineHeight: '1.5' }}>
            Advised 30 mins brisk morning walk daily, low sodium dietary regimen, and regular blood pressure log recording. Follow up in 14 days or as required.
          </p>
        </div>

        {/* Digital Signature & Seal */}
        <div style={{
          borderTop: '2px solid #F2F4F7',
          paddingTop: '16px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '28px'
        }}>
          <div>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              border: '2px dashed #CCA266',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#CCA266',
              fontSize: '10px',
              fontWeight: '700',
              textAlign: 'center',
              textTransform: 'uppercase',
              lineHeight: '1.2'
            }}>
              VERIFIED<br/>SEAL
            </div>
            <span style={{ fontSize: '11px', color: '#666666', display: 'block', marginTop: '6px' }}>
              Official Hospital Seal
            </span>
          </div>

          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontFamily: "'Caveat', 'Georgia', cursive", fontSize: '20px', fontWeight: '700', color: '#CCA266' }}>
              Dr. Amelia Carter
            </p>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', fontWeight: '600', color: '#000000' }}>
              {doctorName || 'Dr. Amelia Carter'}
            </p>
            <span style={{ fontSize: '11px', color: '#666666' }}>
              Digitally Signed Rx &bull; Lic: KMC-49201
            </span>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => alert('Prescription PDF downloaded successfully!')}
            style={{
              flex: 1,
              height: '46px',
              borderRadius: '23px',
              backgroundColor: '#CCA266',
              color: '#FFFFFF',
              fontWeight: '600',
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download PDF
          </button>
          
          <button 
            onClick={onClose}
            style={{
              height: '46px',
              padding: '0 20px',
              borderRadius: '23px',
              backgroundColor: '#FFFFFF',
              color: '#000000',
              fontWeight: '600',
              fontSize: '14px',
              border: '1px solid #F2F4F7',
              cursor: 'pointer'
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
