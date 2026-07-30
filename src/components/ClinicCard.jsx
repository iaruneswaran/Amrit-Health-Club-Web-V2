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
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="clinic-action-icon" style={{ height: '24px', width: '24px', display: 'block' }}>
                <path d="M6.30556 0.75V3.75M15.1944 0.75V3.75M1.30556 7.83984H20.1944M20.75 7.25V15.75C20.75 18.75 19.0833 20.75 15.1944 20.75H6.30556C2.41667 20.75 0.75 18.75 0.75 15.75V7.25C0.75 4.25 2.41667 2.25 6.30556 2.25H15.1944C19.0833 2.25 20.75 4.25 20.75 7.25Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="clinic-action-label">Booking</span>
            </button>

            <button
              id="enquiry-btn"
              className="clinic-action-item"
              type="button"
              onClick={() => setActiveModal('enquiry')}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="clinic-action-icon" style={{ height: '24px', width: '24px', display: 'block' }}>
                <path d="M20.72 17.08C20.72 17.44 20.64 17.81 20.47 18.17C20.3 18.53 20.08 18.87 19.79 19.19C19.3 19.73 18.76 20.12 18.15 20.37C17.55 20.62 16.9 20.75 16.2 20.75C15.18 20.75 14.09 20.51 12.94 20.02C11.79 19.53 10.64 18.87 9.5 18.04C8.35 17.2 7.26 16.27 6.22 15.24C5.19 14.2 4.26 13.11 3.43 11.97C2.61 10.83 1.95 9.69 1.47 8.56C0.99 7.42 0.75 6.33 0.75 5.29C0.75 4.61 0.87 3.96 1.11 3.36C1.35 2.75 1.73 2.19 2.26 1.69C2.9 1.06 3.6 0.75 4.34 0.75C4.62 0.75 4.9 0.81 5.15 0.93C5.41 1.05 5.64 1.23 5.82 1.49L8.14 4.76C8.32 5.01 8.45 5.24 8.54 5.46C8.63 5.67 8.68 5.88 8.68 6.07C8.68 6.31 8.61 6.55 8.47 6.78C8.34 7.01 8.15 7.25 7.91 7.49L7.15 8.28C7.04 8.39 6.99 8.52 6.99 8.68C6.99 8.76 7 8.83 7.02 8.91C7.05 8.99 7.08 9.05 7.1 9.11C7.28 9.44 7.59 9.87 8.03 10.39C8.48 10.91 8.96 11.44 9.48 11.97C10.02 12.5 10.54 12.99 11.07 13.44C11.59 13.88 12.02 14.18 12.36 14.36C12.41 14.38 12.47 14.41 12.54 14.44C12.62 14.47 12.7 14.48 12.79 14.48C12.96 14.48 13.09 14.42 13.2 14.31L13.96 13.56C14.21 13.31 14.45 13.12 14.68 13C14.91 12.86 15.14 12.79 15.39 12.79C15.58 12.79 15.78 12.83 16 12.92C16.22 13.01 16.45 13.14 16.7 13.31L20.01 15.66C20.27 15.84 20.45 16.05 20.56 16.3C20.66 16.55 20.72 16.8 20.72 17.08Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"/>
              </svg>
              <span className="clinic-action-label">Enquiry</span>
            </button>

            <button
              id="location-btn"
              className="clinic-action-item"
              type="button"
              onClick={() => setActiveModal('location')}
            >
              <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="clinic-action-icon" style={{ height: '24px', width: '24px', display: 'block' }}>
                <path d="M9.25116 12.1828C10.9498 12.1828 12.3268 10.7856 12.3268 9.06202C12.3268 7.33846 10.9498 5.94124 9.25116 5.94124C7.55256 5.94124 6.17557 7.33846 6.17557 9.06202C6.17557 10.7856 7.55256 12.1828 9.25116 12.1828Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M0.990277 7.24162C2.93223 -1.42054 15.5796 -1.41054 17.5117 7.25163C18.6453 12.3329 15.5303 16.634 12.7997 19.2946C10.8184 21.2351 7.68362 21.2351 5.69238 19.2946C2.97167 16.634 -0.143353 12.3229 0.990277 7.24162Z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
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
