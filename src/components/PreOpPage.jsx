import React, { useState, useEffect } from 'react';
import continueArrow from '../assets/Continue Arrow.svg';

export default function PreOpPage({ onBack, onComplete, initialData }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    const appFrame = document.querySelector('.app-frame');
    if (appFrame) {
      appFrame.scrollTop = 0;
    }
    const pageShell = document.querySelector('.page-shell');
    if (pageShell) {
      pageShell.scrollTop = 0;
    }
    const preopContainer = document.querySelector('.preop-page-container');
    if (preopContainer) {
      preopContainer.scrollTop = 0;
    }
  }, []);

  const [reason, setReason] = useState(
    initialData?.reason || "High fever (101.5°F) with severe body aches & chills since yesterday"
  );

  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert("Please enter your health concern.");
      return;
    }

    const payload = {
      reason: reason.trim(),
      completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setSubmittedSuccess(true);

    setTimeout(() => {
      onComplete(payload);
    }, 1000);
  };

  return (
    <div className="preop-page-container">
      {/* Header */}
      <header className="doctors-header" style={{ padding: '16px 20px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="doctors-title-row" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            className="doctors-back-btn" 
            onClick={onBack} 
            aria-label="Go back"
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '18px', height: '16px' }} />
          </button>
          <h1 className="doctors-page-title" style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>
            Pre-OP Health Form
          </h1>
        </div>
      </header>

      {/* Main Form Content */}
      <main className="preop-body">
        {/* Doctor Card */}
        <div className="preop-doctor-card">
          <div className="preop-doctor-avatar">AC</div>
          <div className="preop-doctor-info">
            <h3 className="preop-doctor-name">Dr. Amelia Carter</h3>
            <p className="preop-doctor-spec">Cardiology Specialist · St. Mary's Medical</p>
            <div className="preop-doctor-time">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              <span>Today, 9:30 PM</span>
            </div>
          </div>
        </div>

        {submittedSuccess ? (
          <div className="preop-success-card">
            <div className="preop-success-icon">✓</div>
            <h2>Pre-OP Form Completed!</h2>
            <p>Your health concern has been attached to your appointment record for Dr. Amelia Carter.</p>
            <div className="preop-success-badge">Redirecting to Dashboard...</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="preop-form">
            {/* Reason for Visit Card */}
            <div className="preop-card">
              <div>
                <h2 className="preop-card-title">Reason for Visit &amp; Health Concern</h2>
              </div>

              {/* Textarea */}
              <div className="preop-input-group">
                <textarea
                  id="health-concern-text"
                  className="preop-textarea"
                  rows={6}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Describe your health concern, symptoms, or reason for this visit..."
                  required
                />
              </div>
            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="preop-cta-bar">
              <button type="submit" className="preop-submit-btn">
                <span>Complete Pre-OP Assessment</span>
                <span className="submit-arrow">→</span>
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
