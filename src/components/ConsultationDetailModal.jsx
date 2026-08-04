import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ReportSummaryModal from './ReportSummaryModal';

export default function ConsultationDetailModal({ data, onClose }) {
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'meds' | 'bill' | 'notes' | 'docs'
  const [selectedDoc, setSelectedDoc] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!data) return null;

  return createPortal(
    <div 
      className="report-modal-overlay" 
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(3px)',
        zIndex: 1050,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}
    >
      <div 
        className="report-modal-sheet" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '430px',
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          padding: '24px 20px 28px 20px',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.2)',
          maxHeight: '88vh',
          overflowY: 'auto'
        }}
      >
        {/* Top Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
          <div style={{ width: '40px', height: '4px', borderRadius: '2px', backgroundColor: '#F2F4F7' }} />
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <span style={{ fontSize: '13px', fontWeight: '500',color: '#555555', backgroundColor: '#FFFFFF', padding: '3px 10px', borderRadius: '100px', textTransform: 'none', letterSpacing: '0.5px' }}>
              Completed Consultation
            </span>
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#000000', margin: '6px 0 2px 0' }}>
              {data.doctorName || 'Dr. Amelia Carter'}
            </h3>
            <p style={{ fontSize: '13px', color: '#555555', margin: 0 }}>
              {data.specialty || 'Cardiology Specialist'} • {data.date || '15 Jul 2026, 10:30 AM'}
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
              color: '#000000',
              flexShrink: 0
            }}
          >
            &times;
          </button>
        </div>

        {/* Sub Navigation Bar */}
        <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid #F2F4F7', paddingBottom: '10px', marginBottom: '16px', overflowX: 'auto' }}>
          {[
            { id: 'details', label: 'Details' },
            { id: 'meds', label: 'Prescription' },
            { id: 'bill', label: 'Bill' },
            { id: 'notes', label: 'Notes' },
            { id: 'docs', label: 'Reports' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '16px',
                border: 'none',
                backgroundColor: activeTab === tab.id ? '#CCA266' : '#F2F4F7',
                color: activeTab === tab.id ? '#FFFFFF' : '#000000',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: DETAILS */}
        {activeTab === 'details' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '14px', border: '1px solid #F2F4F7' }}>
              <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555', textTransform: 'none', letterSpacing: '0.1px' }}>
                Consultation Reason
              </span>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#555555', fontWeight: '500' }}>
                Chest Discomfort &amp; Mild BP Spike
              </p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '14px', border: '1px solid #F2F4F7' }}>
              <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555', textTransform: 'none', letterSpacing: '0.1px' }}>
                Facility / Clinic
              </span>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#555555', fontWeight: '500' }}>
                St. Mary's Medical Center • Suite 302
              </p>
              <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#555555' }}>
                3rd Floor, Outpatient Clinic Block, Bangalore
              </p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '14px', border: '1px solid #F2F4F7' }}>
              <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555', textTransform: 'none', letterSpacing: '0.1px' }}>
                Recorded Vitals During Visit
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '8px' }}>
                <div>
                  <span style={{ fontSize: '13px', color: '#555555' }}>Blood Pressure</span>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: '#000000' }}>128/84 mmHg</p>
                </div>
                <div>
                  <span style={{ fontSize: '13px', color: '#555555' }}>Pulse Rate</span>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: '#000000' }}>76 bpm</p>
                </div>
                <div>
                  <span style={{ fontSize: '13px', color: '#555555' }}>Temperature</span>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: '#000000' }}>98.6 °F</p>
                </div>
                <div>
                  <span style={{ fontSize: '13px', color: '#555555' }}>SpO₂</span>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: '#000000' }}>99%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRESCRIPTION & MEDICATIONS */}
        {activeTab === 'meds' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555', textTransform: 'none', letterSpacing: '0.1px' }}>
              Prescribed Medications (Rx)
            </span>
            
            {[
              { name: 'Amoxicillin 250mg', dose: '1 Capsule • Twice a day • Before Meals • 5 Days', note: 'Take with full glass of water' },
              { name: 'Pantoprazole 40mg', dose: '1 Tablet • Once daily • Morning Empty Stomach • 5 Days', note: 'Antacid protection' },
              { name: 'Paracetamol 500mg', dose: '1 Tablet • As needed for pain • After Meals', note: 'Max 3 tabs daily' }
            ].map((med, idx) => (
              <div key={idx} style={{ backgroundColor: '#FFFFFF', border: '1px solid #F2F4F7', borderRadius: '14px', padding: '12px 14px' }}>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: '#000000' }}>{med.name}</p>
                <p style={{ margin: '3px 0 0 0', fontSize: '13px', color: '#444444' }}>{med.dose}</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#444444', fontWeight: '500' }}>Note: {med.note}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: BILL SUMMARY */}
        {activeTab === 'bill' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #F2F4F7', borderRadius: '16px', padding: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: '#555555' }}>Doctor Consultation Fee</span>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555' }}>₹500.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: '#555555' }}>In-Clinic ECG Procedure</span>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555' }}>₹600.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: '#555555' }}>Pharmacy Charges</span>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555' }}>₹400.00</span>
              </div>
              <hr style={{ border: 'none', borderBottom: '1px solid #F2F4F7', margin: '10px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#000000' }}>Total Net Paid</span>
                <span style={{ fontSize: '16px', fontWeight: '500',color: '#000000' }}>₹1,500.00</span>
              </div>
            </div>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span style={{ fontSize: '13px',color: '#555555', fontWeight: '500' }}>Payment Received via UPI (Ref: TXN-984210)</span>
            </div>
          </div>
        )}

        {/* TAB 4: DOCTOR NOTES */}
        {activeTab === 'notes' && (
          <div style={{ backgroundColor: '#FFFFFF', borderLeft: '4px solid #CCA266', borderRadius: '14px', padding: '14px' }}>
            <span style={{ fontSize: '13px', fontWeight: '500',color: '#555555', textTransform: 'none', letterSpacing: '0.5px' }}>
              Attending Physician Clinical Notes
            </span>
            <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#555555', lineHeight: '1.5' }}>
              "Patient presented with mild localized chest wall tenderness following physical strain. Resting 12-lead ECG showed normal sinus rhythm without acute ischemic ST-T changes. Prescribed short course oral anti-inflammatory cover. Advised follow-up if discomfort persists."
            </p>
          </div>
        )}

        {/* TAB 5: RELATED DOCUMENTS */}
        {activeTab === 'docs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555', textTransform: 'none', letterSpacing: '0.5px' }}>
              Attached Records &amp; Reports
            </span>

            {[
              { id: 101, name: 'Sterling-Accuris-Pathology-Sampl', time: '15 Jul 2026', size: '6.59 MB', badge: '2 Issues', status: 'issues' },
              { id: 102, name: '12-Lead-ECG-Analysis-Report', time: '15 Jul 2026', size: '1.24 MB', badge: 'Normal', status: 'normal' }
            ].map((doc) => (
              <div 
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #F2F4F7',
                  borderRadius: '14px',
                  padding: '12px 14px',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: '500', color: '#555555' }}>{doc.name}</p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#555555' }}>{doc.time} • {doc.size}</p>
                </div>
                <span className={`report-badge ${doc.status}`} style={{ margin: 0, fontSize: '13px' }}>
                  {doc.badge}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={onClose}
          style={{
            marginTop: '20px',
            width: '100%',
            height: '46px',
            borderRadius: '23px',
            backgroundColor: '#CCA266',
            color: '#FFFFFF',
            fontWeight: '500',
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(204, 162, 102, 0.25)'
          }}
        >
          Close Consultation History
        </button>

        {/* Embedded Report Summary Modal */}
        {selectedDoc && (
          <ReportSummaryModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
        )}
      </div>
    </div>,
    document.body
  );
}
