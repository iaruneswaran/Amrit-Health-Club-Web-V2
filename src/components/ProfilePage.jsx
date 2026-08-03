import React, { useState, useEffect } from 'react';
import profileHeaderImg from '../assets/Profile Header.jpg';
import editIcon from '../assets/Profile edit.svg';
import paymentIcon from '../assets/Payment Methods.svg';
import addressIcon from '../assets/Address.svg';
import languageIcon from '../assets/Language.svg';
import mobileIcon from '../assets/Mobile Number.svg';
import logoutItemIcon from '../assets/Log Out.svg';
import deleteIcon from '../assets/Delete Account.svg';

export default function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInitials, setSelectedInitials] = useState(() => {
    return localStorage.getItem('selected_profile_initials') || 'RG';
  });

  useEffect(() => {
    const handleProfileChange = () => {
      setSelectedInitials(localStorage.getItem('selected_profile_initials') || 'RG');
    };
    window.addEventListener('profile-changed', handleProfileChange);
    return () => {
      window.removeEventListener('profile-changed', handleProfileChange);
    };
  }, []);

  const profiles = [
    { initials: 'RG', label: 'Ryan Gosling', phone: '+91 9876543210' },
    { initials: 'RR', label: 'Ryan Reynolds', phone: '+91 9876543210' },
  ];

  const activeProfile = profiles.find((p) => p.initials === selectedInitials) || profiles[0];

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="profile-page">
      {/* Header Image */}
      <div className="profile-header-image-wrap">
        <img
          src={profileHeaderImg}
          alt="Profile Header"
          className="profile-header-image"
        />
      </div>

      {/* User Info Card */}
      <div className="profile-user-card">
        <div className="avatar-badge-container" style={{ marginTop: '6px' }}>
          <div
            className={`avatar-badge ${isOpen ? 'open' : ''}`}
            role="button"
            aria-label="Switch profile"
            onClick={() => setIsOpen(!isOpen)}
            style={{ marginBottom: 0 }}
          >
            <div className="avatar-badge-inner">{selectedInitials}</div>
          </div>

          {isOpen && (
            <div
              className="dropdown-overlay"
              onClick={() => setIsOpen(false)}
            />
          )}

          <div className={`profile-dropdown ${isOpen ? 'open' : ''}`} style={{ top: '100%', left: 0, right: 'auto', marginTop: '8px' }}>
            {profiles.map((p) => (
              <div
                key={p.initials}
                className={`profile-dropdown-item ${selectedInitials === p.initials ? 'active' : ''}`}
                onClick={() => {
                  setSelectedInitials(p.initials);
                  localStorage.setItem('selected_profile_initials', p.initials);
                  window.dispatchEvent(new Event('profile-changed'));
                  setIsOpen(false);
                }}
              >
                <div className="dropdown-item-badge">{p.initials}</div>
                <span className="dropdown-item-label">{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-user-info">
          <span className="profile-user-name">{activeProfile.label}</span>
          <span className="profile-user-phone">{activeProfile.phone}</span>
        </div>
        <button className="profile-edit-btn" type="button">
          <img src={editIcon} alt="Edit" className="profile-edit-icon" />
          Edit Profile
        </button>
      </div>

      {/* Patient Activity Card */}
      <div className="profile-section-card activity-card">
        <h3 className="profile-section-title">Patient Activity</h3>
        <div className="activity-grid">
          <div className="activity-item">
            <span className="activity-count">2</span>
            <span className="activity-label">Bookings</span>
          </div>
          <div className="activity-divider" />
          <div className="activity-item">
            <span className="activity-count">6</span>
            <span className="activity-label">Files</span>
          </div>
          <div className="activity-divider" />
          <div className="activity-item">
            <span className="activity-count">4</span>
            <span className="activity-label">Medicines</span>
          </div>
        </div>
      </div>

      {/* Preferences Card */}
      <div className="profile-section-card">
        <h3 className="profile-section-title">Preferences</h3>
        <div className="profile-list">
          <div className="profile-list-item">
            <div className="profile-list-item-left">
              <div className="profile-list-icon-wrapper">
                <img src={paymentIcon} alt="Payment Methods" className="profile-list-icon" />
              </div>
              <span className="profile-list-label">Payment Methods</span>
            </div>
            <svg className="profile-chevron-right" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>

          <div className="profile-list-item">
            <div className="profile-list-item-left">
              <div className="profile-list-icon-wrapper">
                <img src={addressIcon} alt="Address" className="profile-list-icon" />
              </div>
              <span className="profile-list-label">Address</span>
            </div>
            <svg className="profile-chevron-right" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>

          <div className="profile-list-item">
            <div className="profile-list-item-left">
              <div className="profile-list-icon-wrapper">
                <img src={languageIcon} alt="Language" className="profile-list-icon" />
              </div>
              <span className="profile-list-label">Language</span>
            </div>
            <svg className="profile-chevron-right" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>

          <div className="profile-list-item">
            <div className="profile-list-item-left">
              <div className="profile-list-icon-wrapper">
                <img src={mobileIcon} alt="Mobile Number" className="profile-list-icon" />
              </div>
              <span className="profile-list-label">Mobile Number</span>
            </div>
            <svg className="profile-chevron-right" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Account Settings Card */}
      <div className="profile-section-card">
        <h3 className="profile-section-title">Account Settings</h3>
        <div className="profile-list">
          <div className="profile-list-item" onClick={handleLogout} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleLogout()}>
            <div className="profile-list-item-left">
              <div className="profile-list-icon-wrapper">
                <img src={logoutItemIcon} alt="Log Out" className="profile-list-icon" />
              </div>
              <span className="profile-list-label">Log Out</span>
            </div>
            <svg className="profile-chevron-right" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>

          <div className="profile-list-item" onClick={handleDeleteAccount} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleDeleteAccount()}>
            <div className="profile-list-item-left">
              <div className="profile-list-icon-wrapper">
                <img src={deleteIcon} alt="Delete Account" className="profile-list-icon" />
              </div>
              <span className="profile-list-label">Delete Account</span>
            </div>
            <svg className="profile-chevron-right" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
