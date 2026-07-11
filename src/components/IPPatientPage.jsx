import React, { useState } from 'react';
import admissionBg from '../assets/Admitted.jpg';
import assignedDoctorIcon from '../assets/Assigned doctor.svg';
import continueArrow from '../assets/Continue Arrow.svg';
import pillsIcon from '../assets/Pills Icon.svg';
import reasonIcon from '../assets/Reason Icon.svg';

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
    { label: 'Temperature', value: '101.2', unit: '°F', icon: '🌡️', trend: 'down', status: 'caution' },
    { label: 'Blood Pressure', value: '118/76', unit: 'mmHg', icon: '💓', trend: 'stable', status: 'normal' },
    { label: 'SpO₂', value: '97', unit: '%', icon: '🫁', trend: 'stable', status: 'normal' },
    { label: 'Heart Rate', value: '88', unit: 'bpm', icon: '❤️', trend: 'stable', status: 'normal' },
    { label: 'Respiratory Rate', value: '18', unit: '/min', icon: '🌬️', trend: 'stable', status: 'normal' },
    { label: 'Blood Glucose', value: '104', unit: 'mg/dL', icon: '🩸', trend: 'stable', status: 'normal' },
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
      { name: 'Dr. Amelia Carter – Cardiologist', amount: 1500 },
      { name: 'Dr. Rajan Nair – General Physician', amount: 800 },
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
    { name: 'Dr. Amelia Carter', role: 'Primary Cardiologist', initials: 'AC' },
    { name: 'Dr. Rajan Nair', role: 'General Physician', initials: 'RN' },
    { name: 'Nurse Priya Sharma', role: 'Primary Nurse (Day)', initials: 'PS' },
    { name: 'Nurse James Wilson', role: 'Primary Nurse (Night)', initials: 'JW' },
  ];

  const diagnostics = [
    { name: 'CBC', result: 'WBC elevated: 14,200', status: 'abnormal', time: 'Today, 10:00 AM' },
    { name: 'CRP', result: '48 mg/L (High)', status: 'abnormal', time: 'Today, 10:00 AM' },
    { name: 'LFT', result: 'Within normal range', status: 'normal', time: 'Today, 10:00 AM' },
    { name: 'KFT', result: 'Within normal range', status: 'normal', time: 'Today, 10:00 AM' },
    { name: 'Chest X-Ray', result: 'Mild consolidation, right lower lobe', status: 'abnormal', time: 'Today, 11:30 AM' },
    { name: 'ECG', result: 'Normal sinus rhythm', status: 'normal', time: 'Today, 12:00 PM' },
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

        {/* ── OVERVIEW TAB ── */}
        {activeSection === 'overview' && (
          <>
            {/* Admission Reason */}
            <div className="ip-card">
              <div className="ip-card-header-row">
                <img src={reasonIcon} alt="" className="ip-section-icon" />
                <h2 className="ip-card-title">Admission Reason</h2>
              </div>
              <div className="ip-location-badge" style={{ marginBottom: '12px' }}>
                <span className="ip-ward-dot"></span>
                <span>ICU B5 • St. Mary's Medical</span>
              </div>
              <p className="ip-reason-text">
                High fever (101.5°F) with severe body aches &amp; chills since yesterday. Suspected viral infection with possible lower respiratory involvement.
              </p>
            </div>

            {/* Current Vitals Summary */}
            <div className="ip-card">
              <div className="ip-card-header-row">
                <h2 className="ip-card-title">Current Vitals</h2>
                <span className="ip-live-badge">Live</span>
              </div>
              <div className="ip-vitals-mini-grid">
                {vitals.slice(0, 4).map((v, i) => (
                  <div key={i} className={`ip-vital-mini ${v.status}`}>
                    <span className="ip-vital-mini-icon">{v.icon}</span>
                    <span className="ip-vital-mini-value">{v.value}<span className="ip-vital-mini-unit">{v.unit}</span></span>
                    <span className="ip-vital-mini-label">{v.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ward Movement Timeline */}
            <div className="ip-card">
              <h2 className="ip-card-title" style={{ marginBottom: '16px' }}>Ward Movement</h2>
              <div className="ip-timeline">
                {wardMovements.map((m, i) => (
                  <div key={i} className="ip-timeline-item">
                    <div className={`ip-timeline-dot ${m.type}`}></div>
                    <div className="ip-timeline-line" style={{ display: i === wardMovements.length - 1 ? 'none' : 'block' }}></div>
                    <div className="ip-timeline-body">
                      <p className="ip-timeline-event">{m.event}</p>
                      <p className="ip-timeline-meta">{m.time} • {m.ward}, Bed {m.bed}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Care Team */}
            <div className="ip-card">
              <h2 className="ip-card-title" style={{ marginBottom: '16px' }}>Care Team</h2>
              {careTeam.map((member, i) => (
                <div key={i} className="ip-care-row">
                  <div className="ip-care-avatar">{member.initials}</div>
                  <div className="ip-care-info">
                    <p className="ip-care-name">{member.name}</p>
                    <p className="ip-care-role">{member.role}</p>
                  </div>
                  <button className="ip-care-contact-btn" aria-label={`Contact ${member.name}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3F7A5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91A16 16 0 0 0 14.09 16l.81-.81a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Diagnostics */}
            <div className="ip-card">
              <h2 className="ip-card-title" style={{ marginBottom: '16px' }}>Diagnostics &amp; Reports</h2>
              {diagnostics.map((d, i) => (
                <div key={i} className="ip-diagnostic-row">
                  <div className="ip-diagnostic-left">
                    <div className={`ip-diagnostic-dot ${d.status}`}></div>
                    <div>
                      <p className="ip-diagnostic-name">{d.name}</p>
                      <p className="ip-diagnostic-result">{d.result}</p>
                    </div>
                  </div>
                  <span className="ip-diagnostic-time">{d.time.split(',')[0]}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── MEDICATIONS TAB ── */}
        {activeSection === 'medications' && (
          <>
            <div className="ip-med-header-info">
              <span className="ip-med-count-badge">{medications.length} Active Orders</span>
              <span className="ip-med-updated">Updated: Today 2:00 PM</span>
            </div>
            {medications.map((med, i) => (
              <div key={i} className="ip-med-card">
                <div className="ip-med-top">
                  <div className="ip-med-icon-wrap">
                    <img src={pillsIcon} alt="" className="ip-med-icon" />
                  </div>
                  <div className="ip-med-details">
                    <p className="ip-med-name">{med.name}</p>
                    <p className="ip-med-dose">{med.dose} — {med.freq} — <span className="ip-med-route">{med.route}</span></p>
                  </div>
                  <span className={`ip-med-status ${med.status}`}>
                    {med.status === 'active' ? 'Active' : med.status === 'ongoing' ? 'Running' : 'PRN'}
                  </span>
                </div>
                <div className="ip-med-footer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#98A2B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span className="ip-med-next">Next dose: {med.next}</span>
                </div>
              </div>
            ))}
            <div className="ip-note-card">
              <p className="ip-note-text">⚕️ Medication orders are managed by the attending physician. For any changes, contact the nursing station.</p>
            </div>
          </>
        )}

        {/* ── VITALS TAB ── */}
        {activeSection === 'vitals' && (
          <>
            <div className="ip-vitals-timestamp">
              <span className="ip-live-badge">Live</span>
              <span className="ip-vitals-time">Last updated: Today, 2:15 PM</span>
            </div>
            <div className="ip-vitals-grid">
              {vitals.map((v, i) => (
                <div key={i} className={`ip-vital-card ${v.status}`}>
                  <div className="ip-vital-icon">{v.icon}</div>
                  <div className="ip-vital-value-row">
                    <span className="ip-vital-value">{v.value}</span>
                    <span className="ip-vital-unit">{v.unit}</span>
                  </div>
                  <p className="ip-vital-label">{v.label}</p>
                  <div className={`ip-vital-trend ${v.trend}`}>
                    {v.trend === 'down' ? '↓ Improving' : v.trend === 'up' ? '↑ Rising' : '→ Stable'}
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

        {/* ── BILLING TAB ── */}
        {activeSection === 'billing' && (
          <>
            <div className="ip-bill-summary-card">
              <div className="ip-bill-summary-left">
                <p className="ip-bill-summary-label">Estimated Total</p>
                <p className="ip-bill-summary-amount">₹{totalBill.toLocaleString('en-IN')}</p>
                <p className="ip-bill-summary-note">Interim bill • Subject to final charges</p>
              </div>
              <div className="ip-bill-summary-right">
                <span className="ip-bill-status-badge">Unpaid</span>
              </div>
            </div>

            {/* Deposit info */}
            <div className="ip-deposit-card">
              <div className="ip-deposit-row">
                <span className="ip-deposit-label">Security Deposit Paid</span>
                <span className="ip-deposit-amount">₹5,000</span>
              </div>
              <div className="ip-deposit-row">
                <span className="ip-deposit-label">Balance Due</span>
                <span className="ip-deposit-due">₹{(totalBill - 5000).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Bill Breakdown */}
            {billItems.map((cat, ci) => (
              <div key={ci} className="ip-bill-category">
                <p className="ip-bill-cat-title">{cat.category}</p>
                <div className="ip-bill-items-card">
                  {cat.items.map((item, ii) => (
                    <div key={ii} className="ip-bill-item-row">
                      <span className="ip-bill-item-name">{item.name}</span>
                      <span className="ip-bill-item-amount">₹{item.amount.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="ip-bill-total-card">
              <span className="ip-bill-total-label">Grand Total</span>
              <span className="ip-bill-total-amount">₹{totalBill.toLocaleString('en-IN')}</span>
            </div>

            <button className="ip-pay-btn">Request Final Bill</button>
          </>
        )}
      </div>
    </div>
  );
}
