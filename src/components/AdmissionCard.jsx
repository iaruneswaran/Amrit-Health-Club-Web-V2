import React from 'react';
import admissionBg from '../assets/Admitted.jpg';
import assignedDoctorIcon from '../assets/Assigned doctor.svg';
import reasonIcon from '../assets/Reason Icon.svg';

export default function AdmissionCard({ onCardClick }) {
  return (
    <div 
      className="admission-card" 
      id="admission-card"
      onClick={onCardClick}
      style={{ cursor: onCardClick ? 'pointer' : 'default' }}
    >
      {/* Top Header Row with image background */}
      <div 
        className="admission-header" 
        style={{ backgroundImage: `url(${admissionBg})` }}
      >
        <span className="status-admitted" aria-label="Admission status: Admitted">Admitted</span>
      </div>

      {/* Body Area */}
      <div className="admission-body">
        <div className="admission-profile-row">
          <div className="admission-avatar-placeholder">RG</div>
          <div className="admission-header-doctor-info">
            <h4 className="admission-header-doctor-name">Ryan Gosling</h4>
            <p className="admission-header-doctor-specialty">Male, 36 • ID: AHC-9824</p>
          </div>
        </div>
        {/* Admission Reason card */}
        <div className="admission-reason-box">
          <div className="admission-reason-header">
            <img src={reasonIcon} alt="" aria-hidden="true" className="admission-reason-icon" />
            <span className="admission-reason-title">Admission Reason</span>
          </div>
          <p className="admission-reason-text">
            High fever (101.5°F) with severe body aches & chills since yesterday
          </p>
        </div>

        {/* Side-by-Side Status info boxes */}
        <div className="admission-status-row">
          <div className="admission-status-box">
            <div className="admission-status-label-row">
              <img src="/booking-green.svg" alt="" aria-hidden="true" className="admission-status-icon" />
              <span className="admission-status-label">Admitted</span>
            </div>
            <span className="admission-status-value">Today, 9:30 PM</span>
          </div>
          <div className="admission-status-box">
            <span className="admission-status-label">Room / Bed</span>
            <span className="admission-status-value highlight-primary">ICU B5</span>
          </div>
        </div>

        {/* Assigned Doctor Area */}
        <div className="assigned-doctor-section">
          <p className="assigned-doctor-heading">Assigned Doctor</p>
          <div className="assigned-doctor-row">
            <div className="assigned-doctor-info-left">
              <img src={assignedDoctorIcon} alt="" aria-hidden="true" className="assigned-doctor-icon" />
              <div className="assigned-doctor-text">
                <p className="assigned-doctor-name">Dr. Amelia Carter</p>
                <p className="assigned-doctor-specialty">Cardiology Specialist</p>
              </div>
            </div>
            <span className="assigned-doctor-badge">Primary</span>
          </div>
        </div>
      </div>
    </div>
  );
}

