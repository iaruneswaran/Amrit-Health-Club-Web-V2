import React, { useState } from 'react';
import hospitalImage from '../assets/Hospital Image.jpg';
import googleLocationIcon from '../assets/Google Location.svg';
import callIcon from '../assets/Call Icon.svg';
import mailIcon from '../assets/Mail icon.svg';

export default function ClinicCard({ onBookNow, onViewHospital }) {
  const [activeModal, setActiveModal] = useState(null); // 'enquiry' | 'location' | null
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    department: 'General Consultation',
    message: ''
  });

  const handleBookingClick = () => {
    if (onViewHospital) {
      onViewHospital('doctors');
    }
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setEnquirySubmitted(true);
  };

  const resetEnquiry = () => {
    setEnquirySubmitted(false);
    setEnquiryForm({
      name: '',
      phone: '',
      department: 'General Consultation',
      message: ''
    });
    setActiveModal(null);
  };

  return (
    <>
      <div className="clinic-card">
        <div className="clinic-image-container" onClick={() => onViewHospital && onViewHospital('overview')} style={{ cursor: 'pointer' }}>
          <img src={hospitalImage} alt="St. Mary's Medical Building" className="clinic-image" />
          <span className="badge-preferred">Preferred</span>
        </div>

        <div className="clinic-body">
          <div className="clinic-title-row" onClick={() => onViewHospital && onViewHospital('overview')} style={{ cursor: 'pointer' }}>
            <h2 className="clinic-name">St. Mary's Medical</h2>
          </div>

          <div className="clinic-status-row">
            <div className="clinic-open-info">
              <img src="/clock-icon.svg" alt="" aria-hidden="true" className="clinic-clock-icon" />
              <span className="clinic-open-text">Open 24/7</span>
            </div>
            <span
              className="clinic-doctors-text"
              onClick={handleBookingClick}
              style={{ cursor: 'pointer' }}
              title="Click to view doctors tab"
            >
              5 Doctors Available
            </span>
          </div>

          <hr className="clinic-divider" />

          <div className="clinic-actions-row" role="toolbar" aria-label="Clinic actions">
            <button
              id="booking-btn"
              className="clinic-action-item"
              type="button"
              onClick={handleBookingClick}
            >
              <img src="/booking.svg" alt="" aria-hidden="true" className="clinic-action-icon" />
              <span className="clinic-action-label">Booking</span>
            </button>

            <button
              id="enquiry-btn"
              className="clinic-action-item"
              type="button"
              onClick={() => setActiveModal('enquiry')}
            >
              <img src="/enquiry.svg" alt="" aria-hidden="true" className="clinic-action-icon" />
              <span className="clinic-action-label">Enquiry</span>
            </button>

            <button
              id="location-btn"
              className="clinic-action-item"
              type="button"
              onClick={() => setActiveModal('location')}
            >
              <img src="/location.svg" alt="" aria-hidden="true" className="clinic-action-icon" />
              <span className="clinic-action-label">Location</span>
            </button>
          </div>
        </div>
      </div>

      {/* ==================== ENQUIRY MODAL ==================== */}
      {activeModal === 'enquiry' && (
        <div className="clinic-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="clinic-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="clinic-modal-header">
              <div>
                <h3 className="clinic-modal-title">Hospital Enquiry</h3>
                <p className="clinic-modal-subtitle">St. Mary's Medical Helpline & Assistance</p>
              </div>
              <button className="clinic-modal-close" onClick={() => setActiveModal(null)} type="button" aria-label="Close">✕</button>
            </div>

            {enquirySubmitted ? (
              <div className="enquiry-success-view">
                <div className="success-icon-wrap">✓</div>
                <h4>Enquiry Submitted!</h4>
                <p>Thank you for reaching out to St. Mary's Medical. Our helpdesk team will contact you shortly.</p>
                <div className="enquiry-contact-summary">
                  <span>Emergency Desk: <strong>+91 98765 43210</strong></span>
                </div>
                <button className="clinic-primary-btn" type="button" onClick={resetEnquiry}>
                  Done
                </button>
              </div>
            ) : (
              <div className="enquiry-modal-body">
                <div className="enquiry-quick-call-card">
                  <div className="call-card-icon">
                    <img src={callIcon} alt="Call" />
                  </div>
                  <div className="call-card-details">
                    <span className="call-label">Emergency & Information Desk</span>
                    <a href="tel:+919876543210" className="call-number">+91 98765 43210</a>
                  </div>
                  <a href="tel:+919876543210" className="call-action-btn">Call Now</a>
                </div>

                <form className="enquiry-form" onSubmit={handleEnquirySubmit}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter your name"
                      required
                      value={enquiryForm.name}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contact Number</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="Enter mobile number"
                      required
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Department / Query Type</label>
                    <select
                      className="form-input"
                      value={enquiryForm.department}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, department: e.target.value })}
                    >
                      <option value="General Consultation">General Consultation</option>
                      <option value="OPD & Appointment">OPD & Appointment</option>
                      <option value="IPD & Admission">IPD & Admission</option>
                      <option value="Emergency & ICU">Emergency & ICU</option>
                      <option value="Lab & Diagnostics">Lab & Diagnostics</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Message / Query</label>
                    <textarea
                      className="form-input form-textarea"
                      placeholder="How can we help you?"
                      rows={3}
                      value={enquiryForm.message}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    />
                  </div>

                  <button className="clinic-primary-btn" type="submit">
                    Send Enquiry
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== LOCATION MODAL ==================== */}
      {activeModal === 'location' && (
        <div className="clinic-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="clinic-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="clinic-modal-header">
              <div>
                <h3 className="clinic-modal-title">Hospital Location</h3>
                <p className="clinic-modal-subtitle">St. Mary's Medical • JP Nagar, Bangalore</p>
              </div>
              <button className="clinic-modal-close" onClick={() => setActiveModal(null)} type="button" aria-label="Close">✕</button>
            </div>

            <div className="location-modal-body">
              {/* Map graphic preview */}
              <div className="location-map-card">
                <img src={hospitalImage} alt="St. Mary's Medical" className="location-map-bg" />
                <div className="location-map-overlay">
                  <div className="gps-pin-container">
                    <img src={googleLocationIcon} alt="Map Pin" className="gps-pin-icon-animated" />
                    <div className="pin-pulse"></div>
                  </div>
                  <span className="location-badge-overlay">1.2 km away • ~5 mins drive</span>
                </div>
              </div>

              {/* Address details */}
              <div className="location-details-card">
                <div className="location-detail-row">
                  <img src={googleLocationIcon} alt="Pin" className="location-icon" />
                  <div>
                    <h4 className="location-address-title">St. Mary's Medical</h4>
                    <p className="location-address-text">
                      161B, 1st Floor, 6th Main, 3RD Cross Road, 3RD PHASE J P Nagar, Bangalore, Karnataka, India
                    </p>
                  </div>
                </div>

                <div className="location-info-pills">
                  <div className="info-pill">
                    <span className="pill-label">Open Status</span>
                    <span className="pill-value open">Open 24/7</span>
                  </div>
                  <div className="info-pill">
                    <span className="pill-label">Entrance</span>
                    <span className="pill-value">Gate 2 Main Block</span>
                  </div>
                  <div className="info-pill">
                    <span className="pill-label">Landmark</span>
                    <span className="pill-value">Near JP Nagar Metro</span>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=161B+6th+Main+3rd+Phase+JP+Nagar+Bangalore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clinic-primary-btn directions-btn"
                >
                  <img src={googleLocationIcon} alt="" style={{ width: '18px', height: '18px', filter: 'brightness(0) invert(1)' }} />
                  Get Directions in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
