import React, { useState, useEffect } from 'react';
import continueArrow from '../assets/Continue Arrow.svg';
import documentIcon from '../assets/Document.svg';
import ReportSummaryModal from './ReportSummaryModal';

export default function ConsultationDetailPage({ consultation, onBack, onBookAppointment, initialTab = 'overview' }) {
  const isUpcoming = consultation?.isUpcoming || false;
  const [activeTab, setActiveTab] = useState(consultation?.initialTab || initialTab || 'overview');
  const [selectedDoc, setSelectedDoc] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const doctorName = consultation?.doctorName || 'Dr. Amelia Carter';
  const specialty = consultation?.specialty || 'Cardiology Specialist';
  const date = consultation?.date || (isUpcoming ? 'Tomorrow, 10:30 AM' : '15 Jul 2026, 10:30 AM');

  const handleBookingTrigger = () => {
    if (onBookAppointment) {
      onBookAppointment({
        name: doctorName,
        specialty: specialty,
        hospital: "St. Mary's Medical",
        rating: 4.9,
        experience: '12 yrs exp',
        fee: '₹500'
      });
    }
  };

  // Tabs list customized per appointment state
  const tabs = isUpcoming
    ? [
        { id: 'overview', label: 'Overview' },
        { id: 'prep', label: 'Preparation' },
        { id: 'prescription', label: 'Prescription' },
        { id: 'bill', label: 'Booking Fee' }
      ]
    : [
        { id: 'overview', label: 'Overview' },
        { id: 'prescription', label: 'Prescription' },
        { id: 'bill', label: 'Bill & Charges' },
        { id: 'notes', label: 'Doctor Notes' },
        { id: 'reports', label: 'Reports' }
      ];

  return (
    <div className="doctors-page-container" style={{ minHeight: '100vh', backgroundColor: '#F2F4F7' }}>
      {/* Top Header Section */}
      <header className="doctors-header" style={{ padding: '16px 14px', backgroundColor: 'transparent', position: 'sticky', top: 0, zIndex: 20 }}>
        <div className="doctors-title-row" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            className="doctors-back-btn" 
            onClick={onBack} 
            aria-label="Go back to history"
            style={{ border: 'none', cursor: 'pointer', padding: '4px' }}
          >
            <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '18px', height: '16px' }} />
          </button>
          <h1 className="doctors-page-title" style={{ fontSize: '18px', fontWeight: '500', color: '#000000', margin: 0 }}>
            {isUpcoming ? 'Upcoming Visit Details' : 'Consultation Details'}
          </h1>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ padding: '0 14px 32px 14px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {/* Doctor & Status Hero Card */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '18px', border: '1px solid #F2F4F7', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ 
              fontSize: '13px', 
              fontWeight: '500', 
              color: isUpcoming ? '#CCA266' : '#CCA266', 
              backgroundColor: isUpcoming ? '#FFFFFF' : '#FFFFFF', 
              padding: '4px 12px', 
              borderRadius: '100px', 
              textTransform: 'none', 
              letterSpacing: '0.5px' 
            }}>
              {isUpcoming ? 'Confirmed • Scheduled' : 'Completed Consultation'}
            </span>
            <span style={{ fontSize: '13px', color: '#555555', fontWeight: '500' }}>Ref: {isUpcoming ? 'APT-84291' : 'CON-98412'}</span>
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: '500', color: '#000000', margin: '4px 0 2px 0' }}>
            {doctorName}
          </h2>
          <p style={{ fontSize: '13px', color: '#555555', margin: '0 0 10px 0', fontWeight: '500' }}>
            {specialty}
          </p>
          <p style={{ fontSize: '13px',color: '#555555', fontWeight: '500', margin: 0 }}>
            📅 {date}
          </p>

          {/* Action Button */}
          <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #F2F4F7', display: 'flex', gap: '10px' }}>
            <button
              onClick={handleBookingTrigger}
              style={{
                flex: 1,
                height: '44px',
                borderRadius: '22px',
                backgroundColor: '#CCA266',
                color: '#FFFFFF',
                fontWeight: '500',
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(204, 162, 102, 0.2)'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {isUpcoming ? 'Reschedule Appointment' : 'Book Follow-Up Appointment'}
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 16px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: activeTab === tab.id ? '#CCA266' : '#FFFFFF',
                color: activeTab === tab.id ? '#FFFFFF' : '#000000',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── TAB 1: OVERVIEW ── */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '16px', border: '1px solid #F2F4F7' }}>
              <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555', textTransform: 'none', letterSpacing: '0.1px' }}>
                Consultation Reason
              </span>
              <p style={{ margin: '6px 0 0 0', fontSize: '14px', color: '#000000', fontWeight: '500', lineHeight: '1.4' }}>
                {isUpcoming ? 'Routine Cardiology Checkup & Blood Pressure Monitoring' : 'Chest Discomfort & Mild Blood Pressure Spike'}
              </p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '16px', border: '1px solid #F2F4F7' }}>
              <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555', textTransform: 'none', letterSpacing: '0.1px' }}>
                Hospital &amp; Clinic Facility
              </span>
              <p style={{ margin: '6px 0 0 0', fontSize: '15px', color: '#000000', fontWeight: '500' }}>
                St. Mary's Medical Center • Suite 302
              </p>
              <p style={{ margin: '3px 0 0 0', fontSize: '13px', color: '#555555', lineHeight: '1.4' }}>
                3rd Floor, Outpatient Clinic Block, 3rd Phase J P Nagar, Bangalore
              </p>
            </div>

            {isUpcoming ? (
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '16px', border: '1px solid #CCA266' }}>
                <span style={{ fontSize: '13px', fontWeight: '500',color: '#555555', textTransform: 'none', letterSpacing: '0.1px' }}>
                  Pre-Consultation Notice
                </span>
                <p style={{ margin: '6px 0 0 0', fontSize: '13px',color: '#555555', lineHeight: '1.5' }}>
                  Please arrive 15 minutes before your appointment time (10:15 AM) for triage vitals recording at Counter 4.
                </p>
              </div>
            ) : (
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '16px', border: '1px solid #F2F4F7' }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555', textTransform: 'none', letterSpacing: '0.1px' }}>
                  Vitals Recorded During Consultation
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                  <div style={{ backgroundColor: '#FFFFFF', padding: '12px', borderRadius: '14px', border: '1px solid #F2F4F7' }}>
                    <span style={{ fontSize: '13px', color: '#555555', fontWeight: '500' }}>Blood Pressure</span>
                    <p style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: '500', color: '#000000' }}>128/84 mmHg</p>
                  </div>
                  <div style={{ backgroundColor: '#FFFFFF', padding: '12px', borderRadius: '14px', border: '1px solid #F2F4F7' }}>
                    <span style={{ fontSize: '13px', color: '#555555', fontWeight: '500' }}>Pulse Rate</span>
                    <p style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: '500', color: '#000000' }}>76 bpm</p>
                  </div>
                  <div style={{ backgroundColor: '#FFFFFF', padding: '12px', borderRadius: '14px', border: '1px solid #F2F4F7' }}>
                    <span style={{ fontSize: '13px', color: '#555555', fontWeight: '500' }}>Temperature</span>
                    <p style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: '500', color: '#000000' }}>98.6 °F</p>
                  </div>
                  <div style={{ backgroundColor: '#FFFFFF', padding: '12px', borderRadius: '14px', border: '1px solid #F2F4F7' }}>
                    <span style={{ fontSize: '13px', color: '#555555', fontWeight: '500' }}>Oxygen SpO₂</span>
                    <p style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: '500', color: '#000000' }}>99%</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}


        {/* ── TAB: PREPARATION (UPCOMING ONLY) ── */}
        {isUpcoming && activeTab === 'prep' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #F2F4F7', borderRadius: '18px', padding: '18px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '500', color: '#000000', margin: '0 0 10px 0' }}>
                Pre-Visit Guidelines
              </h3>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#555555', lineHeight: '1.7' }}>
                <li>Carry your past 3 months cardiology &amp; BP lab reports.</li>
                <li>Avoid caffeine or strenuous exercise 2 hours before BP reading.</li>
                <li>Wear comfortable short-sleeve clothing for easy BP cuff placement.</li>
              </ul>
            </div>
          </div>
        )}

        {/* ── TAB 2: PRESCRIPTION ── */}
        {activeTab === 'prescription' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {isUpcoming ? (
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '24px 18px', textAlign: 'center', border: '1px solid #F2F4F7' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#F2F4F7', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                  </svg>
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: '500', color: '#000000', margin: '0 0 6px 0' }}>
                  No Prescription Available Yet
                </h4>
                <p style={{ fontSize: '13px', color: '#555555', margin: 0, lineHeight: '1.5' }}>
                  Prescriptions will be issued digitally by {doctorName} immediately following your consultation on {date}.
                </p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555', textTransform: 'none', letterSpacing: '0.5px' }}>
                    Rx Prescribed Medications
                  </span>
                  <span style={{ fontSize: '13px',color: '#555555', fontWeight: '500' }}>3 Items Prescribed</span>
                </div>

                {[
                  { name: 'Amoxicillin 250mg', dose: '1 Capsule • Twice a day • Before Meals • 5 Days', note: 'Take with full glass of water' },
                  { name: 'Pantoprazole 40mg', dose: '1 Tablet • Once daily • Morning Empty Stomach • 5 Days', note: 'Antacid protection' },
                  { name: 'Paracetamol 500mg', dose: '1 Tablet • As needed for pain • After Meals', note: 'Max 3 tabs daily' }
                ].map((med, idx) => (
                  <div key={idx} style={{ backgroundColor: '#FFFFFF', border: '1px solid #F2F4F7', borderRadius: '16px', padding: '16px' }}>
                    <p style={{ margin: '0', fontSize: '15px', fontWeight: '500', color: '#000000' }}>{med.name}</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#444444', lineHeight: '1.4' }}>{med.dose}</p>
                    <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed #F2F4F7' }}>
                      <span style={{ fontSize: '13px', color: '#444444', fontWeight: '500' }}>Instruction: </span>
                      <span style={{ fontSize: '13px', color: '#444444' }}>{med.note}</span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* ── TAB 3: BILL & CHARGES ── */}
        {activeTab === 'bill' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #F2F4F7', borderRadius: '18px', padding: '18px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '500', color: '#000000', margin: '0 0 14px 0' }}>
                {isUpcoming ? 'Pre-Paid Booking Fee' : 'Consultation Charges Breakdown'}
              </h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '13px', color: '#555555' }}>Doctor Consultation Fee</span>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555' }}>₹500.00</span>
              </div>
              {!isUpcoming && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '13px', color: '#555555' }}>In-Clinic 12-Lead ECG</span>
                    <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555' }}>₹600.00</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '13px', color: '#555555' }}>Pharmacy &amp; Consumables</span>
                    <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555' }}>₹400.00</span>
                  </div>
                </>
              )}
              <hr style={{ border: 'none', borderBottom: '1px solid #F2F4F7', margin: '12px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '15px', fontWeight: '500', color: '#000000' }}>{isUpcoming ? 'Total Booking Paid' : 'Net Paid Amount'}</span>
                <span style={{ fontSize: '18px', fontWeight: '500',color: '#000000' }}>{isUpcoming ? '₹500.00' : '₹1,500.00'}</span>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #CCA266' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <div>
                <span style={{ display: 'block', fontSize: '13px',color: '#555555', fontWeight: '500' }}>Confirmed &amp; Paid via UPI</span>
                <span style={{ fontSize: '13px',color: '#555555' }}>Txn Ref: TXN-98421098</span>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 4: DOCTOR NOTES ── */}
        {!isUpcoming && activeTab === 'notes' && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '18px', border: '1px solid #F2F4F7' }}>
            <span style={{ fontSize: '13px', fontWeight: '500',color: '#555555', textTransform: 'none', letterSpacing: '0.5px' }}>
              Physician Clinical Summary &amp; Notes
            </span>
            <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#000000', lineHeight: '1.6' }}>
              "Patient presented with mild localized chest wall tenderness following physical strain. Resting 12-lead ECG showed normal sinus rhythm without acute ischemic ST-T changes. Prescribed short course oral anti-inflammatory cover. Advised follow-up if discomfort persists."
            </p>
          </div>
        )}

        {/* ── TAB 5: REPORTS & DOCUMENTS ── */}
        {!isUpcoming && activeTab === 'reports' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555', textTransform: 'none', letterSpacing: '0.5px' }}>
              Consultation Diagnostic Reports
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
                  borderRadius: '16px',
                  padding: '14px 16px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="report-icon-wrapper" style={{ margin: 0, width: '40px', height: '40px', minWidth: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={documentIcon} alt="Document" className="report-summary-icon" style={{ width: '18px', height: '18px' }} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: '#000000' }}>{doc.name}</p>
                    <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#555555' }}>{doc.time} • {doc.size}</p>
                  </div>
                </div>
                <span className={`report-badge ${doc.status}`} style={{ margin: 0, fontSize: '13px', fontWeight: '500' }}>
                  {doc.badge}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Report Summary Modal for viewing attached lab reports */}
      {selectedDoc && (
        <ReportSummaryModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
      )}
    </div>
  );
}
