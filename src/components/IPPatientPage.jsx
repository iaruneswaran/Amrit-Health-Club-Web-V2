import React, { useState } from 'react';
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

export default function IPPatientPage({ onBack }) {
  const [activeSection, setActiveSection] = useState('overview');

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
    { label: 'Temperature', value: '101.2', unit: '°F', icon: tempIcon, trend: 'down', status: 'normal' },
    { label: 'Blood Pressure', value: '118/76', unit: 'mmHg', icon: bpIcon, trend: 'stable', status: 'normal' },
    { label: 'SpO₂', value: '97', unit: '%', icon: spo2Icon, trend: 'stable', status: 'normal' },
    { label: 'Heart Rate', value: '88', unit: 'bpm', icon: hrIcon, trend: 'stable', status: 'normal' },
    { label: 'Respiratory Rate', value: '18', unit: '/min', icon: rrIcon, trend: 'stable', status: 'normal' },
    { label: 'Blood Glucose', value: '104', unit: 'mg/dL', icon: bgIcon, trend: 'stable', status: 'normal' },
  ];

  const wardMovements = [
    { time: 'Today, 9:30 PM', event: 'Admitted to ICU B5', ward: 'ICU', bed: 'B5', type: 'admit' },
    { time: 'Today, 11:00 PM', event: 'Blood samples collected', ward: 'ICU', bed: 'B5', type: 'procedure' },
    { time: 'Yesterday, 8:00 AM', event: 'Shifted to General Ward', ward: 'Ward 3', bed: 'G12', type: 'transfer' },
  ];

  const billItems = [
    { category: 'Room & Board', items: [
      { name: 'ICU Bed Charges (2 days)', amount: 8000 },
      { name: 'General Ward (1 day)', amount: 2000 },
    ]},
    { category: 'Consultations', items: [
      { name: 'Dr. Amelia Carter - Cardiologist', amount: 1500 },
      { name: 'Dr. Rajan Nair - General Physician', amount: 800 },
    ]},
    { category: 'Medications', items: [
      { name: 'IV Fluids & Consumables', amount: 1200 },
      { name: 'Prescribed Medicines', amount: 640 },
    ]},
    { category: 'Diagnostics', items: [
      { name: 'CBC, CRP, LFT, KFT Panel', amount: 2400 },
      { name: 'Chest X-Ray', amount: 600 },
      { name: 'ECG', amount: 300 },
    ]},
    { category: 'Nursing & Services', items: [
      { name: 'Nursing Charges', amount: 800 },
      { name: 'Physiotherapy Session', amount: 500 },
    ]},
  ];

  const totalBill = billItems.reduce((sum, cat) =>
    sum + cat.items.reduce((s, i) => s + i.amount, 0), 0);

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
            <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '14px', height: '14px', filter: 'brightness(0) invert(1)' }} />
          </button>
          <div className="ip-header-content">
            <div className="ip-avatar">RG</div>
            <div className="ip-patient-info">
              <h1 className="ip-patient-name">Ryan Gosling</h1>
              <p className="ip-patient-meta">Male, 36 • AHC-9824</p>
            </div>
          </div>
          <span className="ip-status-badge">Admitted</span>
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
          <span className="ip-stat-value">2 Days</span>
        </div>
        <div className="ip-stat-divider" />
        <div className="ip-stat-item">
          <span className="ip-stat-label">Ward</span>
          <span className="ip-stat-value">ICU</span>
        </div>
        <div className="ip-stat-divider" />
        <div className="ip-stat-item">
          <span className="ip-stat-label">Bed</span>
          <span className="ip-stat-value ip-stat-green">B5</span>
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

        {/* â”€â”€ OVERVIEW TAB â”€â”€ */}
        {activeSection === 'overview' && (
          <>
            {/* Location & Room Details Card */}
            <div className="ip-card">
              <div className="ip-card-header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h2 className="ip-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src={googleLocationIcon} alt="" className="ip-section-icon" style={{ width: '18px', height: '18px' }} />
                  St. Mary's Medical
                </h2>
                <div className="ip-location-badge-pill" style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#f0f9eb', color: '#5cb85c', borderRadius: '100px', padding: '4px 10px', fontSize: '11px', fontWeight: '700', gap: '5px' }}>
                  <span className="ip-ward-dot" style={{ width: '6px', height: '6px', backgroundColor: '#5cb85c', borderRadius: '50%' }}></span>
                  <span>ICU B5</span>
                </div>
              </div>
              <p className="ip-reason-text" style={{ fontSize: '13px', color: '#3B3B3B', lineHeight: '1.4' }}>
                161B, 1st Floor, 6th Main, 3RD Cross Road, 3RD PHASE J P Nagar, Bangalore Karnataka India
              </p>
            </div>

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
                      <img src={assignedDoctorIcon} alt="" aria-hidden="true" className="assigned-doctor-icon" style={{ width: '22px', height: '22px' }} />
                      <div className="assigned-doctor-text">
                        <p className="assigned-doctor-name" style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#02352F' }}>{member.name}</p>
                        <p className="assigned-doctor-specialty" style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#3B3B3B' }}>{member.role}</p>
                      </div>
                    </div>
                    {member.badge === 'Primary' && (
                      <span className="assigned-doctor-badge" style={{
                        border: '0.25px solid #92E066',
                        color: '#92E066',
                        background: 'transparent'
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
                <div key={doc.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: index === 0 ? '0' : '16px', paddingBottom: '16px', borderBottom: index === documents.length - 1 ? 'none' : '1px solid #F2F4F7' }}>
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
                  <button className="report-doc-action-btn" type="button" aria-label="More options">
                    <img src={menuIcon} alt="More options" className="report-menu-icon" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── MEDICATIONS TAB ── */}
        {activeSection === 'medications' && (
          <>
            <div className="ip-med-header-info">
              <span className="ip-med-updated">Updated: Today 2:00 PM</span>
            </div>
            <MedicationCard showImage={false} />
          </>
        )}

        {/* â”€â”€ VITALS TAB â”€â”€ */}
        {activeSection === 'vitals' && (
          <>
            <div className="ip-vitals-timestamp">
              <div className="ip-live-indicator" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="ip-live-dot"></span>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#FF4D4D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Live</span>
              </div>
              <span className="ip-vitals-time">Last updated: Today, 2:15 PM</span>
            </div>
            <div className="ip-vitals-grid">
              {vitals.map((v, i) => (
                <div key={i} className={`ip-vital-card ${v.status}`}>
                  <div className="ip-vital-icon">
                    <img src={v.icon} alt="" style={{ width: '24px', height: '24px', display: 'block' }} />
                  </div>
                  <div className="ip-vital-value-row">
                    <span className="ip-vital-value">{v.value}</span>
                    <span className="ip-vital-unit">{v.unit}</span>
                  </div>
                  <p className="ip-vital-label">{v.label}</p>
                  <div className={`ip-vital-trend ${v.trend}`}>
                    {v.trend === 'down' ? 'Improving' : v.trend === 'up' ? 'Rising' : 'Stable'}
                  </div>
                </div>
              ))}
            </div>

            {/* Vitals Log */}
            <div className="ip-card" style={{ marginTop: '4px' }}>
              <h2 className="ip-card-title" style={{ marginBottom: '16px' }}>Today's Log</h2>
              <div className="ip-vitals-log-table">
                <div className="ip-log-row header">
                  <span>Time</span><span>Temp</span><span>BP</span><span>SpO₂</span><span>HR</span>
                </div>
                {[
                  { time: '6 AM', temp: '102.4', bp: '122/80', spo2: '96%', hr: '94' },
                  { time: '10 AM', temp: '101.8', bp: '120/78', spo2: '97%', hr: '90' },
                  { time: '2 PM', temp: '101.2', bp: '118/76', spo2: '97%', hr: '88' },
                ].map((log, i) => (
                  <div key={i} className="ip-log-row">
                    <span>{log.time}</span>
                    <span className={parseFloat(log.temp) > 101 ? 'log-caution' : 'log-normal'}>{log.temp}°</span>
                    <span>{log.bp}</span>
                    <span>{log.spo2}</span>
                    <span>{log.hr}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* â”€â”€ BILLING TAB â”€â”€ */}
        {activeSection === 'billing' && (
          <>
            <div className="ip-bill-summary-card">
              <div className="ip-bill-summary-left">
                <p className="ip-bill-summary-label">Estimated Total</p>
                <p className="ip-bill-summary-amount">₹{totalBill.toLocaleString('en-IN')}</p>
                <p className="ip-bill-summary-note">Interim bill • Subject to final charges</p>
              </div>
            </div>

            {/* Deposit info (Two side-by-side cards) */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1, background: '#FFFFFF', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px', border: '1px solid #F0F2F5' }}>
                <span style={{ fontSize: '12px', color: '#3B3B3B', fontWeight: '500' }}>Security Deposit Paid</span>
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#3F7A5C' }}>₹5,000</span>
              </div>
              <div style={{ flex: 1, background: '#FFFFFF', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px', border: '1px solid #F0F2F5' }}>
                <span style={{ fontSize: '12px', color: '#3B3B3B', fontWeight: '500' }}>Balance Due</span>
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#FF5858' }}>₹{(totalBill - 5000).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Bill Breakdown & Grand Total in a single wrapper */}
            <div className="ip-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {billItems.map((cat, ci) => (
                <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#02352F', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{cat.category}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {cat.items.map((item, ii) => (
                      <div key={ii} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '14px', color: '#3B3B3B' }}>{item.name}</span>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#02352F' }}>₹{item.amount.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                  {ci < billItems.length - 1 && <hr style={{ border: 'none', borderBottom: '1px solid #F0F2F5', margin: '12px 0 0 0' }} />}
                </div>
              ))}

              <hr style={{ border: 'none', borderBottom: '1.5px dashed #E5E7EB', margin: '4px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '15px', fontWeight: '700', color: '#02352F' }}>Grand Total</span>
                <span style={{ fontSize: '18px', fontWeight: '800', color: '#3F7A5C' }}>₹{totalBill.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button className="ip-pay-btn">Request Final Bill</button>
          </>
        )}
      </div>
    </div>
  );
}
