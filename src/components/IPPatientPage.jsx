import React, { useState, useEffect } from 'react';
import admissionBg from '../assets/Admitted.jpg';
import assignedDoctorIcon from '../assets/Assigned doctor.svg';
import continueArrow from '../assets/Continue Arrow.svg';
import pillsIcon from '../assets/Pills Icon.svg';
import reasonIcon from '../assets/Reason Icon.svg';
import googleLocationIcon from '../assets/Google Location.svg';
import MedicationCard from './MedicationCard';
import tempIcon from '../assets/Temperature.svg';
import bpIcon from '../assets/Blood Pressure.svg';
import spo2Icon from '../assets/SpO₂.svg';
import hrIcon from '../assets/Heart Rate.svg';
import rrIcon from '../assets/Respiratory Rate.svg';
import bgIcon from '../assets/Blood Glucose.svg';
import documentIcon from '../assets/Document.svg';
import menuIcon from '../assets/Menu.svg';
import ReportSummaryModal from './ReportSummaryModal';
import ReportActionMenuModal from './ReportActionMenuModal';
import TransactionBillModal from './TransactionBillModal';

export default function IPPatientPage({ onBack, onOrderMedications }) {
  const [activeSection, setActiveSection] = useState('overview');
  const [ipStatus, setIpStatus] = useState('Admitted'); // 'Admitted' or 'Discharged'
  const [selectedReport, setSelectedReport] = useState(null);
  const [actionMenuDoc, setActionMenuDoc] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedVitalKey, setSelectedVitalKey] = useState('temp');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'medications', label: 'Medications' },
    { id: 'vitals', label: 'Vitals' },
    { id: 'billing', label: 'Bill' },
  ];

  const medications = [
    { name: 'Paracetamol 500mg', dose: '1 tab', freq: 'Every 6 hrs', route: 'Oral', status: 'active', next: '3:00 PM' },
    { name: 'Azithromycin 500mg', dose: '1 tab', freq: 'Once daily', route: 'Oral', status: 'active', next: '9:00 AM' },
    { name: 'Pantoprazole 40mg', dose: '1 tab', freq: 'Twice daily', route: 'Oral', status: 'active', next: '7:00 PM' },
    { name: 'IV Normal Saline', dose: '500 ml', freq: 'Over 4 hrs', route: 'IV', status: 'ongoing', next: 'Running' },
    { name: 'Ondansetron 4mg', dose: '1 amp', freq: 'PRN (nausea)', route: 'IV', status: 'prn', next: 'As needed' },
  ];

  const vitals = [
    { key: 'temp', label: 'Temperature', value: '101.2', unit: '°F', icon: tempIcon, status: 'normal' },
    { key: 'bp', label: 'Blood Pressure', value: '118/76', unit: 'mmHg', icon: bpIcon, status: 'normal' },
    { key: 'spo2', label: 'SpO₂', value: '97', unit: '%', icon: spo2Icon, status: 'normal' },
    { key: 'hr', label: 'Heart Rate', value: '88', unit: 'bpm', icon: hrIcon, status: 'normal' },
    { key: 'rr', label: 'Respiratory Rate', value: '18', unit: '/min', icon: rrIcon, status: 'normal' },
    { key: 'bg', label: 'Blood Glucose', value: '104', unit: 'mg/dL', icon: bgIcon, status: 'normal' },
  ];

  const vitalsLogData = [
    { time: '6 AM', temp: '102.4°F', bp: '122/80 mmHg', spo2: '96%', hr: '94 bpm', rr: '20 /min', bg: '110 mg/dL' },
    { time: '10 AM', temp: '101.8°F', bp: '120/78 mmHg', spo2: '97%', hr: '90 bpm', rr: '19 /min', bg: '106 mg/dL' },
    { time: '2 PM', temp: '101.2°F', bp: '118/76 mmHg', spo2: '97%', hr: '88 bpm', rr: '18 /min', bg: '104 mg/dL' },
  ];

  const currentVitalObj = vitals.find(v => v.key === selectedVitalKey);

  const wardMovements = [
    { time: 'Today, 9:30 PM', event: 'Admitted to ICU B5', ward: 'ICU', bed: 'B5', type: 'admit' },
    { time: 'Today, 11:00 PM', event: 'Blood samples collected', ward: 'ICU', bed: 'B5', type: 'procedure' },
    { time: 'Yesterday, 8:00 AM', event: 'Shifted to General Ward', ward: 'Ward 3', bed: 'G12', type: 'transfer' },
  ];

  const careTeam = [
    { name: 'Dr. Amelia Carter', role: 'Cardiology Specialist', badge: 'Primary' },
    { name: 'Dr. Rajan Nair', role: 'General Physician', badge: 'Duty Doctor' },
    { name: 'Nurse Priya Sharma', role: 'Primary Nurse (Day)', badge: 'Nurse' },
  ];

  const documents = [
    {
      id: 1,
      name: 'Sterling-Accuris-Pathology-Sampl',
      time: 'Just now',
      size: '6.59 MB',
      badge: '2 Issues',
      status: 'issues',
    },
    {
      id: 2,
      name: 'Sterling-Accuris-Pathology-Sampl',
      time: 'Just now',
      size: '6.59 MB',
      badge: '2 Issues',
      status: 'issues',
    },
    {
      id: 3,
      name: 'Sterling-Accuris-Pathology-Sampl',
      time: 'Just now',
      size: '6.59 MB',
      badge: 'Normal',
      status: 'normal',
    },
  ];

  return (
    <div className="ip-page-container">
      {/* Header with patient background */}
      <div className="ip-header" style={{ backgroundImage: `url(${admissionBg})` }}>
        <div className="ip-header-overlay">
          <button className="ip-back-btn" onClick={onBack} aria-label="Go back">
            <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '14px', height: '14px',  }} />
          </button>
          <div className="ip-header-content">
            <div className="ip-patient-info">
              <h1 className="ip-patient-name" style={{ color: '#000000', fontWeight: '600' }}>Ryan Gosling</h1>
              <p className="ip-patient-meta" style={{ color: '#000000', fontWeight: '500', margin: '4px 0 0 0' }}>Male, 36 • AHC-9824</p>
            </div>
          </div>
          <span 
            className="ip-status-badge" 
            style={{ 
              background: '#CCA266',
              color: '#FFFFFF'
            }}
          >
            {ipStatus}
          </span>
        </div>
      </div>

      {/* Quick Stats Strip */}
      <div className="ip-stats-strip">
        <div className="ip-stat-item">
          <span className="ip-stat-label">Admitted</span>
          <span className="ip-stat-value">Jul 9</span>
        </div>
        <div className="ip-stat-divider" />
        <div className="ip-stat-item">
          <span className="ip-stat-label">Duration</span>
          <span className="ip-stat-value">{ipStatus === 'Discharged' ? '3 Days' : '2 Days'}</span>
        </div>
        <div className="ip-stat-divider" />
        <div className="ip-stat-item">
          <span className="ip-stat-label">Ward</span>
          <span className="ip-stat-value">{ipStatus === 'Discharged' ? 'Discharged' : 'ICU'}</span>
        </div>
        <div className="ip-stat-divider" />
        <div className="ip-stat-item">
          <span className="ip-stat-label">Bed</span>
          <span className="ip-stat-value ip-stat-green">{ipStatus === 'Discharged' ? '-' : 'B5'}</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="ip-tab-bar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`ip-tab-btn ${activeSection === tab.id ? 'active' : ''}`}
            onClick={() => setActiveSection(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="ip-content">

        {/* ── OVERVIEW TAB ── */}
        {activeSection === 'overview' && (
          <>
            {/* Admission Reason */}
            <div className="ip-card">
              <div className="ip-card-header-row" style={{ marginBottom: '8px' }}>
                <img src={reasonIcon} alt="" className="ip-section-icon" />
                <h2 className="ip-card-title">Admission Reason</h2>
              </div>
              <p className="ip-reason-text">
                High fever (101.5°F) with severe body aches &amp; chills since yesterday. Suspected viral infection with possible lower respiratory involvement.
              </p>
            </div>

            {/* Discharge Summary Card (Always rendered, placeholder when Admitted, complete when Discharged) */}
            <div className="ip-card discharge-summary-card" style={{ border: ipStatus === 'Discharged' ? '1.5px solid #CCA266' : '1px solid #E5E7EB', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={documentIcon} alt="" className="ip-section-icon" />
                  <div>
                    <h2 className="ip-card-title" style={{ margin: 0 }}>Discharge Summary</h2>
                    {ipStatus === 'Discharged' && (
                      <span style={{ fontSize: '12px', color: '#555555', fontWeight: '500' }}>
                        Discharged on Jul 11, 2026 • 11:30 AM
                      </span>
                    )}
                  </div>
                </div>
                {ipStatus === 'Discharged' ? (
                  <button 
                    type="button" 
                    style={{ background: '#CCA266', color: '#FFFFFF', border: 'none', padding: '6px 14px', borderRadius: '100px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                    onClick={() => alert("Downloading Discharge Summary PDF...")}
                  >
                    <span>Download PDF</span>
                  </button>
                ) : (
                  <span style={{ background: '#F2F4F7', color: '#555555', padding: '6px 12px', borderRadius: '100px', fontSize: '13px', fontWeight: '500' }}>
                    Pending
                  </span>
                )}
              </div>

              {ipStatus === 'Discharged' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ background: '#F2F4F7', padding: '12px 14px', borderRadius: '14px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#555555', textTransform: 'none' }}>Final Diagnosis</span>
                    <p style={{ margin: '4px 0 0 0', fontSize: '14px', fontWeight: '500', color: '#000000', lineHeight: '1.4' }}>
                      Acute Viral Infection with Mild Bronchial Hyper-responsiveness (Resolved)
                    </p>
                  </div>

                  <div style={{ background: '#F2F4F7', padding: '12px 14px', borderRadius: '14px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#555555', textTransform: 'none' }}>Treatment Administered</span>
                    <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: '500', color: '#000000', lineHeight: '1.4' }}>
                      IV Antibiotics (Azithromycin), IV Fluids, Antipyretic Therapy &amp; Nebulization
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div style={{ background: '#F2F4F7', padding: '12px 14px', borderRadius: '14px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: '#555555' }}>Condition at Discharge</span>
                      <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: '500', color: '#000000' }}>Stable, Afebrile for 24+ hrs</p>
                    </div>
                    <div style={{ background: '#F2F4F7', padding: '12px 14px', borderRadius: '14px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: '#555555' }}>Attending Physician</span>
                      <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: '500', color: '#000000' }}>Dr. Amelia Carter</p>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(204, 162, 102, 0.1)', border: '1px solid #CCA266', padding: '12px 14px', borderRadius: '14px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#000000' }}>Follow-Up &amp; Advice</span>
                    <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#000000', lineHeight: '1.4' }}>
                      Follow up in OPD with Dr. Amelia Carter on <strong>Jul 18, 2026</strong>. Continue prescribed oral medications for 5 days.
                    </p>
                  </div>
                </div>
              ) : (
                <div style={{ background: '#F9FAFB', border: '1px dashed #D1D5DB', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: '13px', color: '#555555', lineHeight: '1.5', fontWeight: '500' }}>
                    Patient is currently admitted under active care. The complete Discharge Summary report, final diagnosis, and follow-up plan will be generated by <strong>Dr. Amelia Carter</strong> upon discharge.
                  </p>
                </div>
              )}
            </div>

            {/* Ward Movement Timeline */}
            <div className="ip-card">
              <h2 className="ip-card-title" style={{ marginBottom: '8px' }}>Ward Movement</h2>
              <div className="ip-movements-scroll-container">
                {wardMovements.map((m, i) => (
                  <div key={i} className="ip-movement-card">
                    <div className="ip-movement-card-header">
                      <span className={`ip-timeline-dot ${m.type}`} style={{ marginTop: 0 }}></span>
                      <h3 className="ip-movement-card-title">{m.event}</h3>
                    </div>
                    <p className="ip-movement-card-meta">{m.time} • {m.ward}, Bed {m.bed}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Care Team */}
            <div className="ip-card">
              <h2 className="ip-card-title" style={{ marginBottom: '12px' }}>Care Team</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {careTeam.map((member, i) => (
                  <div key={i} className="assigned-doctor-row" style={{ padding: '12px 14px', border: '1.5px solid #F2F4F7', borderRadius: '16px', background: '#FFFFFF' }}>
                    <div className="assigned-doctor-info-left">
                      <div className="assigned-doctor-text">
                        <p className="assigned-doctor-name" style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: '#000000' }}>{member.name}</p>
                        <p className="assigned-doctor-specialty" style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#555555' }}>{member.role}</p>
                      </div>
                    </div>
                    {member.badge === 'Primary' && (
                      <span className="assigned-doctor-badge" style={{
                        background: '#CCA266',
                        color: '#FFFFFF',
                        border: 'none'
                      }}>
                        {member.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostics & Reports */}
            <div className="ip-card">
              <h2 className="ip-card-title" style={{ marginBottom: '20px' }}>Diagnostics &amp; Reports</h2>
              {documents.map((doc, index) => (
                <div 
                  key={doc.id} 
                  onClick={() => setSelectedReport(doc)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: index === 0 ? '0' : '16px', paddingBottom: '16px', borderBottom: index === documents.length - 1 ? 'none' : '1px solid #F2F4F7', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div className="report-icon-wrapper" style={{ margin: '2px 0 0 0', width: '48px', height: '48px', minWidth: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={documentIcon} alt="Document" className="report-summary-icon" style={{ width: '20px', height: '20px' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p className="report-doc-name" title={doc.name}>{doc.name}</p>
                      <p className="report-doc-meta" style={{ marginTop: '3px', marginBottom: '6px' }}>{doc.time} &bull; {doc.size}</p>
                      <div className="report-doc-badge-row" style={{ marginTop: 0 }}>
                        <span className={`report-badge ${doc.status}`}>{doc.badge}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="report-doc-action-btn" 
                    type="button" 
                    aria-label="More options" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActionMenuDoc(doc);
                    }}
                  >
                    <img src={menuIcon} alt="More options" className="report-menu-icon" />
                  </button>
                </div>
              ))}
            </div>

            {/* Report Summary Modal */}
            <ReportSummaryModal doc={selectedReport} onClose={() => setSelectedReport(null)} />

            {/* 3-Dot Action Menu Sheet */}
            <ReportActionMenuModal 
              doc={actionMenuDoc} 
              onClose={() => setActionMenuDoc(null)} 
              onViewSummary={(doc) => setSelectedReport(doc)}
            />
          </>
        )}

        {/* ── MEDICATIONS TAB ── */}
        {activeSection === 'medications' && (
          <>
            <div className="ip-med-header-info">
              <span className="ip-med-updated">Updated: Today 2:00 PM</span>
            </div>
            <MedicationCard showImage={false} onOrderMedications={onOrderMedications} />
          </>
        )}

        {/* ── VITALS TAB ── */}
        {activeSection === 'vitals' && (
          <>
            <div className="ip-vitals-timestamp">
              <div className="ip-live-indicator" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="ip-live-dot"></span>
                <span style={{ fontSize: '13px', fontWeight: '500',color: '#555555', textTransform: 'none', letterSpacing: '0.5px' }}>Live</span>
              </div>
              <span className="ip-vitals-time">Last updated: Today, 2:15 PM</span>
            </div>
            <div className="ip-vitals-grid">
              {vitals.map((v) => {
                const isSelected = selectedVitalKey === v.key;
                return (
                  <div 
                    key={v.key} 
                    className={`ip-vital-card ${v.status} ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedVitalKey(v.key)}
                    style={{
                      cursor: 'pointer',
                      border: isSelected ? '1px solid #CCA266' : '1px solid #F2F4F7',
                      backgroundColor: '#FFFFFF',
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                  >
                    <div className="ip-vital-icon">
                      <img src={v.icon} alt="" style={{ width: '24px', height: '24px', display: 'block' }} />
                    </div>
                    <div className="ip-vital-value-row">
                      <span className="ip-vital-value">{v.value}</span>
                      <span className="ip-vital-unit">{v.unit}</span>
                    </div>
                    <p className="ip-vital-label">{v.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Vitals Log */}
            <div className="ip-card" style={{ marginTop: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <h2 className="ip-card-title" style={{ margin: 0 }}>Today's Log</h2>
                  <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#555555' }}>
                    Showing logs for <strong>{currentVitalObj ? currentVitalObj.label : 'All Vitals'}</strong>
                  </p>
                </div>
                {selectedVitalKey !== 'all' && (
                  <button 
                    type="button" 
                    onClick={() => setSelectedVitalKey('all')}
                    style={{
                      background: '#F2F4F7',
                      border: 'none',
                      color: '#555555',
                      fontSize: '12px',
                      fontWeight: '500',
                      padding: '6px 12px',
                      borderRadius: '100px',
                      cursor: 'pointer'
                    }}
                  >
                    Show All
                  </button>
                )}
              </div>

              <div className="ip-vitals-log-table">
                {selectedVitalKey === 'all' ? (
                  <>
                    <div className="ip-log-row header">
                      <span>Time</span><span>Temp</span><span>BP</span><span>SpO₂</span><span>HR</span>
                    </div>
                    {vitalsLogData.map((log, i) => (
                      <div key={i} className="ip-log-row">
                        <span>{log.time}</span>
                        <span className={parseFloat(log.temp) > 101 ? 'log-caution' : 'log-normal'}>{log.temp}</span>
                        <span>{log.bp}</span>
                        <span>{log.spo2}</span>
                        <span>{log.hr}</span>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="ip-log-row header" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
                      <span>Time</span>
                      <span style={{ textAlign: 'right' }}>{currentVitalObj?.label}</span>
                    </div>
                    {vitalsLogData.map((log, i) => (
                      <div key={i} className="ip-log-row" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
                        <span style={{ fontWeight: '500' }}>{log.time}</span>
                        <span style={{ 
                          textAlign: 'right', 
                          fontWeight: '600', 
                          color: (selectedVitalKey === 'temp' && parseFloat(log.temp) > 101) ? '#D97706' : '#000000' 
                        }}>
                          {log[selectedVitalKey]}
                        </span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {/* ── BILLING TAB ── */}
        {activeSection === 'billing' && (
          <>
            {/* Top Hero Summary Banner Card */}
            <div className="ip-bill-summary-card">
              <div className="ip-bill-summary-left">
                <p className="ip-bill-summary-label">Net Payable</p>
                <p className="ip-bill-summary-amount">₹3,600.00</p>
                <p className="ip-bill-summary-note">Interim bill • Subject to final charges</p>
              </div>
            </div>

            {/* Key Metrics Overview */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1, background: '#FFFFFF', borderRadius: '18px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px', border: 'none' }}>
                <span style={{ fontSize: '13px', color: '#555555', fontWeight: '500' }}>Amount Paid</span>
                <span style={{ fontSize: '18px', fontWeight: '500', color: '#000000' }}>₹1,000.00</span>
              </div>
              <div style={{ flex: 1, background: '#FFFFFF', borderRadius: '18px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px', border: 'none' }}>
                <span style={{ fontSize: '13px', color: '#555555', fontWeight: '500' }}>Balance To Pay</span>
                <span style={{ fontSize: '18px', fontWeight: '500',color: '#000000' }}>₹2,600.00</span>
              </div>
            </div>

            {/* Section Header Title */}
            <div style={{ margin: '4px 0 -2px 0' }}>
              <p style={{ margin: 0, fontSize: '15px', fontWeight: '500', color: '#000000', letterSpacing: '-0.2px' }}>
                Transaction History
              </p>
            </div>

            {/* 1. Consultation Card */}
            <div className="ip-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: '500',color: '#000000' }}>
                Consultation
              </p>
              
              <div 
                className="ip-bill-date-row"
                onClick={() => setSelectedTransaction({
                  txnId: 'TXN-884101',
                  date: '30/07/2026',
                  time: '10:30 AM',
                  category: 'Consultation',
                  title: 'Doctor Consultation & Routine Rounds',
                  amount: '₹500.00',
                  items: [
                    { name: 'Dr Mimmi Ashraf Consultation Charge', rate: 400, qty: 1, amount: 400 },
                    { name: 'Dr. Amelia Carter Routine Rounds', rate: 100, qty: 1, amount: 100 }
                  ]
                })}
              >
                <div className="ip-bill-txn-info">
                  <span className="ip-bill-txnid-text">TXN-884101</span>
                  <span className="ip-bill-time-sub">30/07/2026 · 10:30 AM</span>
                </div>
                <div className="ip-bill-txn-right">
                  <span className="ip-bill-amount">₹500.00</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555' }}>Sub Total</span>
                <span style={{ fontSize: '15px', fontWeight: '500',color: '#000000' }}>₹500.00</span>
              </div>
            </div>

            {/* 2. Investigation Card */}
            <div className="ip-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: '500',color: '#000000' }}>
                Investigation &amp; Diagnostics
              </p>
              
              <div 
                className="ip-bill-date-row"
                onClick={() => setSelectedTransaction({
                  txnId: 'TXN-884102',
                  date: '30/07/2026',
                  time: '11:45 AM',
                  category: 'Investigation & Diagnostics',
                  title: 'Lab Tests (CBC, Culture) & Chest X-Ray',
                  amount: '₹1,500.00',
                  items: [
                    { name: 'Lab investigation (CBC & Culture)', rate: 750, qty: 1, amount: 750 },
                    { name: 'CRP & Serum Electrolytes Panel', rate: 450, qty: 1, amount: 450 },
                    { name: 'Chest X-Ray PA View', rate: 300, qty: 1, amount: 300 }
                  ]
                })}
              >
                <div className="ip-bill-txn-info">
                  <span className="ip-bill-txnid-text">TXN-884102</span>
                  <span className="ip-bill-time-sub">30/07/2026 · 11:45 AM</span>
                </div>
                <div className="ip-bill-txn-right">
                  <span className="ip-bill-amount">₹1,500.00</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555' }}>Sub Total</span>
                <span style={{ fontSize: '15px', fontWeight: '500',color: '#000000' }}>₹1,500.00</span>
              </div>
            </div>

            {/* 3. Pharmacy & Consumables Card - Multi-Date Transactions */}
            <div className="ip-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: '500',color: '#000000' }}>
                Pharmacy &amp; Consumables
              </p>
              
              <div 
                className="ip-bill-date-row"
                onClick={() => setSelectedTransaction({
                  txnId: 'TXN-884103',
                  date: '30/07/2026',
                  time: '04:15 PM',
                  category: 'Pharmacy & Consumables',
                  title: 'Amoxicillin 250mg & IV Normal Saline',
                  amount: '₹420.00',
                  items: [
                    { name: 'Amoxicillin 250mg Injection', rate: 120, qty: 2, amount: 240 },
                    { name: 'IV Normal Saline 500ml', rate: 90, qty: 2, amount: 180 }
                  ]
                })}
              >
                <div className="ip-bill-txn-info">
                  <span className="ip-bill-txnid-text">TXN-884103</span>
                  <span className="ip-bill-time-sub">30/07/2026 · 04:15 PM</span>
                </div>
                <div className="ip-bill-txn-right">
                  <span className="ip-bill-amount">₹420.00</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </div>

              <div 
                className="ip-bill-date-row"
                onClick={() => setSelectedTransaction({
                  txnId: 'TXN-884098',
                  date: '29/07/2026',
                  time: '08:00 PM',
                  category: 'Pharmacy & Consumables',
                  title: 'Pantoprazole IV & Cannula Set',
                  amount: '₹180.00',
                  items: [
                    { name: 'Pantoprazole 40mg IV Injection', rate: 100, qty: 1, amount: 100 },
                    { name: 'Syringes & IV Cannula Set', rate: 80, qty: 1, amount: 80 }
                  ]
                })}
              >
                <div className="ip-bill-txn-info">
                  <span className="ip-bill-txnid-text">TXN-884098</span>
                  <span className="ip-bill-time-sub">29/07/2026 · 08:00 PM</span>
                </div>
                <div className="ip-bill-txn-right">
                  <span className="ip-bill-amount">₹180.00</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555' }}>Sub Total</span>
                <span style={{ fontSize: '15px', fontWeight: '500',color: '#000000' }}>₹600.00</span>
              </div>
            </div>

            {/* 4. Room & Ward Charges Card */}
            <div className="ip-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: '500',color: '#000000' }}>
                Room &amp; Ward Charges
              </p>
              
              <div 
                className="ip-bill-date-row"
                onClick={() => setSelectedTransaction({
                  txnId: 'TXN-884104',
                  date: '30/07/2026',
                  time: '12:00 PM',
                  category: 'Room & Ward Charges',
                  title: 'ICU Bed Stay (2 Days)',
                  amount: '₹1,000.00',
                  items: [
                    { name: 'ICU Bed Charges (B5)', rate: 500, qty: 2, amount: 1000 }
                  ]
                })}
              >
                <div className="ip-bill-txn-info">
                  <span className="ip-bill-txnid-text">TXN-884104</span>
                  <span className="ip-bill-time-sub">30/07/2026 · 12:00 PM</span>
                </div>
                <div className="ip-bill-txn-right">
                  <span className="ip-bill-amount">₹1,000.00</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555' }}>Sub Total</span>
                <span style={{ fontSize: '15px', fontWeight: '500',color: '#000000' }}>₹1,000.00</span>
              </div>
            </div>

            {/* 4. CHARGES Card */}
            <div className="ip-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '500',color: '#000000' }}>
                  Charges
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#000000' }}>Subtotal</span>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#000000' }}>₹3,600.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#000000' }}>Discount</span>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#000000' }}>₹0.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#000000' }}>Tax amount</span>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#000000' }}>₹0.00</span>
                </div>
              </div>

              <hr style={{ border: 'none', borderBottom: '1px dashed #F2F4F7', margin: '4px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '15px', fontWeight: '500', color: '#000000' }}>Net payable</span>
                <span style={{ fontSize: '16px', fontWeight: '500',color: '#000000' }}>₹3,600.00</span>
              </div>
            </div>

            {/* 5. PAYMENTS Card */}
            <div className="ip-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="5" width="20" height="14" rx="2"/>
                  <line x1="2" y1="10" x2="22" y2="10"/>
                </svg>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '500',color: '#000000' }}>
                  Payments
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#000000' }}>Amount paid</span>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#000000' }}>₹1,000.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#000000' }}>Advance collected</span>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#000000' }}>₹0.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#000000' }}>Balance in advance</span>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#000000' }}>₹0.00</span>
                </div>
              </div>

              <hr style={{ border: 'none', borderBottom: '1px dashed #F2F4F7', margin: '4px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '15px', fontWeight: '500', color: '#000000' }}>Balance to pay</span>
                <span style={{ fontSize: '16px', fontWeight: '500',color: '#000000' }}>₹2,600.00</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button className="ip-pay-btn" style={{ background: '#CCA266', color: '#FFFFFF', borderRadius: '16px', padding: '16px', fontSize: '15px', fontWeight: '500', border: 'none', cursor: 'pointer' }}>
              Pay Balance ₹2,600.00
            </button>
          </>
        )}
      </div>

      {/* Transaction Bill Modal */}
      {selectedTransaction && (
        <TransactionBillModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
}
