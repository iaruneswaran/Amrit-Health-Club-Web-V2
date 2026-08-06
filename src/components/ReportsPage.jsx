import React, { useState } from 'react';
import documentIcon from '../assets/Document.svg';
import addIcon from '../assets/Add Icon.svg';
import menuIcon from '../assets/Menu.svg';
import continueArrow from '../assets/Continue Arrow.svg';
import ReportSummaryModal from './ReportSummaryModal';
import ReportActionMenuModal from './ReportActionMenuModal';
import UploadReportModal from './UploadReportModal';

export default function ReportsPage({ onBack }) {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [actionMenuDoc, setActionMenuDoc] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Sterling-Accuris-Pathology-Sample',
      time: 'Just now',
      size: '6.59 MB',
      badge: '2 Issues',
      status: 'issues',
    },
    {
      id: 2,
      name: 'Complete-Blood-Count-CBC-Report',
      time: '2 hours ago',
      size: '3.24 MB',
      badge: '2 Issues',
      status: 'issues',
    },
    {
      id: 3,
      name: 'Comprehensive-Metabolic-Panel-Report',
      time: '4 hours ago',
      size: '4.12 MB',
      badge: 'Normal',
      status: 'normal',
    },
  ]);

  const [yesterdayDocuments, setYesterdayDocuments] = useState([
    {
      id: 4,
      name: 'Lipid-Profile-Panels-2026',
      time: 'Yesterday, 5:30 PM',
      size: '2.85 MB',
      badge: 'Normal',
      status: 'normal',
    },
    {
      id: 5,
      name: 'Thyroid-Function-Test-TSH-Panel',
      time: 'Yesterday, 11:20 AM',
      size: '1.95 MB',
      badge: '1 Issue',
      status: 'issues',
    },
  ]);

  const [earlierDocuments, setEarlierDocuments] = useState([
    {
      id: 6,
      name: 'HbA1c-Glycated-Hemoglobin-Analysis',
      time: 'Jul 28, 2026',
      size: '5.10 MB',
      badge: 'Normal',
      status: 'normal',
    },
    {
      id: 7,
      name: 'Renal-Function-KFT-Diagnostic-Report',
      time: 'Jul 25, 2026',
      size: '4.30 MB',
      badge: 'Normal',
      status: 'normal',
    },
    {
      id: 8,
      name: 'Vitamin-D3-B12-Assay-Report',
      time: 'Jul 20, 2026',
      size: '2.10 MB',
      badge: '1 Issue',
      status: 'issues',
    },
    {
      id: 9,
      name: 'Chest-XRay-Radiology-Scan',
      time: 'Jul 15, 2026',
      size: '8.75 MB',
      badge: 'Normal',
      status: 'normal',
    },
  ]);

  const handleUploadSuccess = (newDoc) => {
    setDocuments(prev => [newDoc, ...prev]);
  };

  const totalCount = documents.length + yesterdayDocuments.length + earlierDocuments.length;

  return (
    <div className="reports-page">
      {/* Success Toast */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#CCA266',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: '24px',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          zIndex: 1200,
          animation: 'fadeIn 0.2s ease'
        }}>
          {toastMessage}
        </div>
      )}

      {onBack ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onBack}
            aria-label="Go back"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: 'none',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0
            }}
          >
            <img 
              src={continueArrow} 
              alt="Back" 
              style={{ transform: 'rotate(180deg)', width: '16px', height: '14px' }} 
            />
          </button>
          <h2 className="reports-page-title" style={{ margin: 0 }}>My Reports</h2>
        </div>
      ) : (
        <h2 className="reports-page-title">My Reports</h2>
      )}
      
      {/* Top Grid */}
      <div className="reports-grid">
        <div 
          className="report-summary-card" 
          onClick={() => setIsUploadOpen(true)}
          style={{ cursor: 'pointer' }}
        >
          <div className="report-icon-wrapper upload">
            <img src={addIcon} alt="Upload" className="report-summary-icon" />
          </div>
          <div className="report-summary-details">
            <span className="report-summary-title">Upload</span>
            <span className="report-summary-subtitle">Lab Reports</span>
          </div>
        </div>

        <div className="report-summary-card">
          <div className="report-icon-wrapper total">
            <img src={documentIcon} alt="Total" className="report-summary-icon" />
          </div>
          <div className="report-summary-details">
            <span className="report-summary-subtitle">Total</span>
            <div className="report-summary-count-row">
              <span className="report-summary-count">{totalCount}</span>
              <span className="report-summary-subtitle" style={{ marginLeft: '4px' }}>Documents</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Section */}
      <div className="section-group" style={{ marginBottom: '20px' }}>
        <p className="section-title">Recent</p>
        {documents.map((doc) => (
          <div 
            className="report-doc-card" 
            key={doc.id}
            onClick={() => setSelectedDoc(doc)}
            style={{ cursor: 'pointer' }}
          >
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

      {/* Yesterday Section */}
      <div className="section-group" style={{ marginBottom: '20px' }}>
        <p className="section-title">Yesterday</p>
        {yesterdayDocuments.map((doc) => (
          <div 
            className="report-doc-card" 
            key={doc.id}
            onClick={() => setSelectedDoc(doc)}
            style={{ cursor: 'pointer' }}
          >
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

      {/* Earlier Section */}
      <div className="section-group">
        <p className="section-title">Earlier</p>
        {earlierDocuments.map((doc) => (
          <div 
            className="report-doc-card" 
            key={doc.id}
            onClick={() => setSelectedDoc(doc)}
            style={{ cursor: 'pointer' }}
          >
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

      {/* Report Summary Modal Popup */}
      <ReportSummaryModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />

      {/* 3-Dot Action Menu Modal Sheet */}
      <ReportActionMenuModal 
        doc={actionMenuDoc} 
        onClose={() => setActionMenuDoc(null)} 
        onViewSummary={(doc) => setSelectedDoc(doc)}
      />

      {/* Upload Report Bottom Sheet Modal */}
      <UploadReportModal 
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
}
