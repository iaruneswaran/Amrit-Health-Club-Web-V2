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

export default function IPPatientPage({ onBack }) {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedReport, setSelectedReport] = useState(null);
  const [actionMenuDoc, setActionMenuDoc] = useState(null);

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
                        <p className="assigned-doctor-name" style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#000000' }}>{member.name}</p>
                        <p className="assigned-doctor-specialty" style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#3B3B3B' }}>{member.role}</p>
                      </div>
                    </div>
                    {member.badge === 'Primary' && (
                      <span className="assigned-doctor-badge" style={{
                        border: '0.5px solid #5cb85c',
                        color: '#5cb85c',
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
            <MedicationCard showImage={false} />
          </>
        )}

        {/* ── VITALS TAB ── */}
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
              <div style={{ flex: 1, background: '#FFFFFF', borderRadius: '18px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px', border: '1px solid #F2F4F7' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#388E3C' }} />
                  <span style={{ fontSize: '12px', color: '#666666', fontWeight: '500' }}>Amount Paid</span>
                </div>
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#2C1810' }}>₹1,000.00</span>
              </div>
              <div style={{ flex: 1, background: '#FFFFFF', borderRadius: '18px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px', border: '1px solid #FEE4E2' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D92D20' }} />
                  <span style={{ fontSize: '12px', color: '#666666', fontWeight: '500' }}>Balance To Pay</span>
                </div>
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#D92D20' }}>₹2,600.00</span>
              </div>
            </div>

            {/* 1. Consultation Card */}
            <div className="ip-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#90644B', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                Consultation
              </p>
              
              <div className="ip-bill-table-container">
                <table className="ip-bill-table">
                  <thead>
                    <tr>
                      <th>Particulars</th>
                      <th>Service Date</th>
                      <th className="num-col">Rate</th>
                      <th className="num-col">Discount(%)</th>
                      <th className="num-col">Qty</th>
                      <th className="num-col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="particulars-cell">Dr Mimmi Ashraf Consultation Charge</td>
                      <td>30/07/2026</td>
                      <td className="num-col">400</td>
                      <td className="num-col">0</td>
                      <td className="num-col">1</td>
                      <td className="num-col-bold">400</td>
                    </tr>
                    <tr>
                      <td className="particulars-cell">Dr. Amelia Carter Routine Rounds</td>
                      <td>30/07/2026</td>
                      <td className="num-col">100</td>
                      <td className="num-col">0</td>
                      <td className="num-col">1</td>
                      <td className="num-col-bold">100</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px dashed #E5E7EB' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#5A3E2B' }}>Sub Total</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#90644B' }}>500</span>
              </div>
            </div>

            {/* 2. Investigation Card */}
            <div className="ip-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#90644B', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                Investigation &amp; Diagnostics
              </p>
              
              <div className="ip-bill-table-container">
                <table className="ip-bill-table">
                  <thead>
                    <tr>
                      <th>Particulars</th>
                      <th>Service Date</th>
                      <th className="num-col">Rate</th>
                      <th className="num-col">Discount(%)</th>
                      <th className="num-col">Qty</th>
                      <th className="num-col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="particulars-cell">Lab investigation (CBC &amp; Culture)</td>
                      <td>30/07/2026</td>
                      <td className="num-col">750</td>
                      <td className="num-col">0</td>
                      <td className="num-col">1</td>
                      <td className="num-col-bold">750</td>
                    </tr>
                    <tr>
                      <td className="particulars-cell">CRP &amp; Serum Electrolytes Panel</td>
                      <td>30/07/2026</td>
                      <td className="num-col">450</td>
                      <td className="num-col">0</td>
                      <td className="num-col">1</td>
                      <td className="num-col-bold">450</td>
                    </tr>
                    <tr>
                      <td className="particulars-cell">Chest X-Ray PA View</td>
                      <td>30/07/2026</td>
                      <td className="num-col">300</td>
                      <td className="num-col">0</td>
                      <td className="num-col">1</td>
                      <td className="num-col-bold">300</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px dashed #E5E7EB' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#5A3E2B' }}>Sub Total</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#90644B' }}>1500</span>
              </div>
            </div>

            {/* 3. Pharmacy & Consumables Card */}
            <div className="ip-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#90644B', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                Pharmacy &amp; Consumables
              </p>
              
              <div className="ip-bill-table-container">
                <table className="ip-bill-table">
                  <thead>
                    <tr>
                      <th>Particulars</th>
                      <th>Service Date</th>
                      <th className="num-col">Rate</th>
                      <th className="num-col">Discount(%)</th>
                      <th className="num-col">Qty</th>
                      <th className="num-col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="particulars-cell">Amoxicillin 250mg Injection</td>
                      <td>30/07/2026</td>
                      <td className="num-col">120</td>
                      <td className="num-col">0</td>
                      <td className="num-col">2</td>
                      <td className="num-col-bold">240</td>
                    </tr>
                    <tr>
                      <td className="particulars-cell">IV Normal Saline 500ml</td>
                      <td>30/07/2026</td>
                      <td className="num-col">90</td>
                      <td className="num-col">0</td>
                      <td className="num-col">2</td>
                      <td className="num-col-bold">180</td>
                    </tr>
                    <tr>
                      <td className="particulars-cell">Pantoprazole 40mg IV Injection</td>
                      <td>30/07/2026</td>
                      <td className="num-col">100</td>
                      <td className="num-col">0</td>
                      <td className="num-col">1</td>
                      <td className="num-col-bold">100</td>
                    </tr>
                    <tr>
                      <td className="particulars-cell">Syringes &amp; IV Cannula Set</td>
                      <td>30/07/2026</td>
                      <td className="num-col">80</td>
                      <td className="num-col">0</td>
                      <td className="num-col">1</td>
                      <td className="num-col-bold">80</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px dashed #E5E7EB' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#5A3E2B' }}>Sub Total</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#90644B' }}>600</span>
              </div>
            </div>

            {/* 4. Room & Ward Charges Card */}
            <div className="ip-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#90644B', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                Room &amp; Ward Charges
              </p>
              
              <div className="ip-bill-table-container">
                <table className="ip-bill-table">
                  <thead>
                    <tr>
                      <th>Particulars</th>
                      <th>Service Date</th>
                      <th className="num-col">Rate</th>
                      <th className="num-col">Discount(%)</th>
                      <th className="num-col">Qty</th>
                      <th className="num-col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="particulars-cell">ICU Bed Charges (B5)</td>
                      <td>30/07/2026</td>
                      <td className="num-col">500</td>
                      <td className="num-col">0</td>
                      <td className="num-col">2</td>
                      <td className="num-col-bold">1000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px dashed #E5E7EB' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#5A3E2B' }}>Sub Total</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#90644B' }}>1000</span>
              </div>
            </div>

            {/* 4. CHARGES Card */}
            <div className="ip-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#90644B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#90644B', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                  CHARGES
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#5A3E2B' }}>Subtotal</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>₹3,600.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#5A3E2B' }}>Discount</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>₹0.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#5A3E2B' }}>Tax amount</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>₹0.00</span>
                </div>
              </div>

              <hr style={{ border: 'none', borderBottom: '1px dashed #E5E7EB', margin: '4px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '15px', fontWeight: '700', color: '#2C1810' }}>Net payable</span>
                <span style={{ fontSize: '16px', fontWeight: '800', color: '#90644B' }}>₹3,600.00</span>
              </div>
            </div>

            {/* 5. PAYMENTS Card */}
            <div className="ip-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#90644B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="5" width="20" height="14" rx="2"/>
                  <line x1="2" y1="10" x2="22" y2="10"/>
                </svg>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#90644B', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                  PAYMENTS
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#5A3E2B' }}>Amount paid</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>₹1,000.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#5A3E2B' }}>Advance collected</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>₹0.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#5A3E2B' }}>Balance in advance</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>₹0.00</span>
                </div>
              </div>

              <hr style={{ border: 'none', borderBottom: '1px dashed #E5E7EB', margin: '4px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '15px', fontWeight: '700', color: '#2C1810' }}>Balance to pay</span>
                <span style={{ fontSize: '16px', fontWeight: '800', color: '#D92D20' }}>₹2,600.00</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button className="ip-pay-btn" style={{ background: '#90644b', color: '#ffffff', borderRadius: '16px', padding: '16px', fontSize: '15px', fontWeight: '600', border: 'none', cursor: 'pointer' }}>
              Pay Balance ₹2,600.00
            </button>
          </>
        )}
      </div>
    </div>
  );
}
