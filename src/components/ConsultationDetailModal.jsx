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
          <div style={{ width: '40px', height: '4px', borderRadius: '2px', backgroundColor: '#E5E7EB' }} />
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#10B981', backgroundColor: '#ECFDF5', padding: '3px 10px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Completed Consultation
            </span>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '6px 0 2px 0' }}>
              {data.doctorName || 'Dr. Amelia Carter'}
            </h3>
            <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>
              {data.specialty || 'Cardiology Specialist'} • {data.date || '15 Jul 2026, 10:30 AM'}
            </p>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: '#F3F4F6',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              color: '#4B5563',
              flexShrink: 0
            }}
          >
            &times;
          </button>
        </div>

        {/* Sub Navigation Bar */}
        <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid #E5E7EB', paddingBottom: '10px', marginBottom: '16px', overflowX: 'auto' }}>
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
                backgroundColor: activeTab === tab.id ? '#90644b' : '#F3F4F6',
                color: activeTab === tab.id ? '#FFFFFF' : '#4B5563',
                fontSize: '12px',
                fontWeight: '600',
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
            <div style={{ backgroundColor: '#F9FAFB', borderRadius: '14px', padding: '14px', border: '1px solid #E5E7EB' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Consultation Reason
              </span>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#111827', fontWeight: '500' }}>
                Chest Discomfort &amp; Mild BP Spike
              </p>
            </div>

            <div style={{ backgroundColor: '#F9FAFB', borderRadius: '14px', padding: '14px', border: '1px solid #E5E7EB' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Facility / Clinic
              </span>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#111827', fontWeight: '600' }}>
                St. Mary's Medical Center • Suite 302
              </p>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#6B7280' }}>
                3rd Floor, Outpatient Clinic Block, Bangalore
              </p>
            </div>

            <div style={{ backgroundColor: '#F9FAFB', borderRadius: '14px', padding: '14px', border: '1px solid #E5E7EB' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Recorded Vitals During Visit
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '8px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#6B7280' }}>Blood Pressure</span>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#111827' }}>128/84 mmHg</p>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: '#6B7280' }}>Pulse Rate</span>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#111827' }}>76 bpm</p>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: '#6B7280' }}>Temperature</span>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#111827' }}>98.6 °F</p>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: '#6B7280' }}>SpO₂</span>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#111827' }}>99%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRESCRIPTION & MEDICATIONS */}
        {activeTab === 'meds' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Prescribed Medications (Rx)
            </span>
            
            {[
              { name: 'Amoxicillin 250mg', dose: '1 Capsule • Twice a day • Before Meals • 5 Days', note: 'Take with full glass of water' },
              { name: 'Pantoprazole 40mg', dose: '1 Tablet • Once daily • Morning Empty Stomach • 5 Days', note: 'Antacid protection' },
              { name: 'Paracetamol 500mg', dose: '1 Tablet • As needed for pain • After Meals', note: 'Max 3 tabs daily' }
            ].map((med, idx) => (
              <div key={idx} style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '14px', padding: '12px 14px' }}>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#111827' }}>{med.name}</p>
                <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#4B5563' }}>{med.dose}</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#90644b', fontWeight: '500' }}>Note: {med.note}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: BILL SUMMARY */}
        {activeTab === 'bill' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: '#4B5563' }}>Doctor Consultation Fee</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>₹500.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: '#4B5563' }}>In-Clinic ECG Procedure</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>₹600.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: '#4B5563' }}>Pharmacy Charges</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>₹400.00</span>
              </div>
              <hr style={{ border: 'none', borderBottom: '1px solid #E5E7EB', margin: '10px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>Total Net Paid</span>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#90644b' }}>₹1,500.00</span>
              </div>
            </div>
            <div style={{ backgroundColor: '#ECFDF5', borderRadius: '12px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span style={{ fontSize: '12px', color: '#065F46', fontWeight: '600' }}>Payment Received via UPI (Ref: TXN-984210)</span>
            </div>
          </div>
        )}

        {/* TAB 4: DOCTOR NOTES */}
        {activeTab === 'notes' && (
          <div style={{ backgroundColor: '#F9FAFB', borderLeft: '4px solid #90644b', borderRadius: '14px', padding: '14px' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#90644b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Attending Physician Clinical Notes
            </span>
            <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#374151', lineHeight: '1.5' }}>
              "Patient presented with mild localized chest wall tenderness following physical strain. Resting 12-lead ECG showed normal sinus rhythm without acute ischemic ST-T changes. Prescribed short course oral anti-inflammatory cover. Advised follow-up if discomfort persists."
            </p>
          </div>
        )}

        {/* TAB 5: RELATED DOCUMENTS */}
        {activeTab === 'docs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
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
                  backgroundColor: '#F9FAFB',
                  border: '1px solid #E5E7EB',
                  borderRadius: '14px',
                  padding: '12px 14px',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#111827' }}>{doc.name}</p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#6B7280' }}>{doc.time} • {doc.size}</p>
                </div>
                <span className={`report-badge ${doc.status}`} style={{ margin: 0, fontSize: '11px' }}>
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
            backgroundColor: '#90644b',
            color: '#FFFFFF',
            fontWeight: '600',
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(144, 100, 75, 0.25)'
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
