import React, { useState, useEffect } from 'react';
import continueArrow from '../assets/Continue Arrow.svg';
import bookingIcon from '../assets/Booking.svg';

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
      <header className="doctors-header" style={{ padding: '16px 20px', backgroundColor: 'transparent', borderBottom: 'none', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="doctors-title-row" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button 
            className="preop-back-btn" 
            onClick={onBack} 
            aria-label="Go back"
            style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, boxShadow: 'none', transition: 'transform 0.2s ease' }}
          >
            <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '16px', height: '14px' }} />
          </button>
          <h1 className="doctors-page-title" style={{ fontSize: '20px', fontWeight: '500', color: '#000000', margin: 0 }}>
            Pre-OP Health Form
          </h1>
        </div>
      </header>

      {/* Main Form Content */}
      <main className="preop-body" style={{ paddingTop: 0 }}>
        {/* Doctor Card */}
        <div className="preop-doctor-card">
          <div className="preop-doctor-avatar">AC</div>
          <div className="preop-doctor-info">
            <h3 className="preop-doctor-name">Dr. Amelia Carter</h3>
            <p className="preop-doctor-spec">Cardiology Specialist · St. Mary's Medical</p>
            <div className="preop-doctor-time">
              <img src={bookingIcon} alt="Calendar" style={{ width: '16px', height: '16px', display: 'block' }} />
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
