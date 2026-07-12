import React from 'react';
import documentIcon from '../assets/Document.svg';
import addIcon from '../assets/Add Icon.svg';
import menuIcon from '../assets/Menu.svg';

export default function ReportsPage() {
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

  const yesterdayDocuments = [
    {
      id: 4,
      name: 'Sterling-Accuris-Pathology-Sampl',
      time: 'Just now',
      size: '6.59 MB',
      badge: 'Normal',
      status: 'normal',
    },
  ];

  return (
    <div className="reports-page">
      <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#000000', marginTop: '10px' }}>My Reports</h2>
      
      {/* Top Grid */}
      <div className="reports-grid">
        <div className="report-summary-card">
          <div className="report-icon-wrapper upload">
            <img src={addIcon} alt="Upload" className="report-summary-icon" />
          </div>
          <div className="report-summary-details">
            <span className="report-summary-title">Upload</span>
            <span className="report-summary-subtitle">Lab Reports</span>
          </div>
        </div>

        <div className="report-summary-card">
          <div className="report-icon-wrapper">
            <img src={documentIcon} alt="Total" className="report-summary-icon" />
          </div>
          <div className="report-summary-details">
            <span className="report-summary-subtitle">Total</span>
            <div className="report-summary-count-row">
              <span className="report-summary-count">5</span>
              <span className="report-summary-subtitle" style={{ marginLeft: '4px' }}>Documents</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Section */}
      <div className="section-group" style={{ marginBottom: '20px' }}>
        <p className="section-title">Recent</p>
        {documents.map((doc) => (
          <div className="report-doc-card" key={doc.id}>
            <div className="report-doc-left">
              <div className="report-icon-wrapper">
                <img src={documentIcon} alt="Document" className="report-summary-icon" />
              </div>
              <div className="report-doc-details">
                <p className="report-doc-name" title={doc.name}>{doc.name}</p>
                <p className="report-doc-meta">{doc.time} &bull; {doc.size}</p>
                <div className="report-doc-badge-row">
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

      {/* Yesterday Section */}
      <div className="section-group">
        <p className="section-title">Yesterday</p>
        {yesterdayDocuments.map((doc) => (
          <div className="report-doc-card" key={doc.id}>
            <div className="report-doc-left">
              <div className="report-icon-wrapper">
                <img src={documentIcon} alt="Document" className="report-summary-icon" />
              </div>
              <div className="report-doc-details">
                <p className="report-doc-name" title={doc.name}>{doc.name}</p>
                <p className="report-doc-meta">{doc.time} &bull; {doc.size}</p>
                <div className="report-doc-badge-row">
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
    </div>
  );
}
