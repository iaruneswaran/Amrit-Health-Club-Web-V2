import React from 'react';
import hospitalImage from '../assets/Hospital Image.jpg';

export default function ClinicCard() {
  return (
    <div className="clinic-card">
      <div className="clinic-image-container">
        <img src={hospitalImage} alt="St. Mary's Medical Building" className="clinic-image" />
        <span className="badge-preferred">Prefered</span>
      </div>

      <div className="clinic-body">
        <div className="clinic-title-row">
          <h2 className="clinic-name">St. Mary's Medical</h2>
        </div>

        <div className="clinic-status-row">
          <div className="clinic-open-info">
            <img src="/clock-icon.svg" alt="" aria-hidden="true" className="clinic-clock-icon" />
            <span className="clinic-open-text">Open 24/7</span>
          </div>
          <span className="clinic-doctors-text">5 Doctors Available</span>
        </div>

        <hr className="clinic-divider" />

        <div className="clinic-actions-row" role="toolbar" aria-label="Clinic actions">
          <button id="booking-btn" className="clinic-action-item" type="button">
            <img src="/booking.svg" alt="" aria-hidden="true" className="clinic-action-icon" />
            <span className="clinic-action-label">Booking</span>
          </button>

          <button id="enquiry-btn" className="clinic-action-item" type="button">
            <img src="/enquiry.svg" alt="" aria-hidden="true" className="clinic-action-icon" />
            <span className="clinic-action-label">Enquiry</span>
          </button>

          <button id="location-btn" className="clinic-action-item" type="button">
            <img src="/location.svg" alt="" aria-hidden="true" className="clinic-action-icon" />
            <span className="clinic-action-label">Location</span>
          </button>
        </div>
      </div>
    </div>
  );
}
