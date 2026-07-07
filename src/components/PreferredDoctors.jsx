import React from 'react';

const preferredDoctors = [
  {
    id: 1,
    name: 'Dr. Amelia Carter',
    specialty: 'Cardiology',
    fee: '₹500',
    initials: 'AC'
  },
  {
    id: 2,
    name: 'Dr. Amelia Carter',
    specialty: 'Cardiology',
    fee: '₹500',
    initials: 'AC'
  }
];

export default function PreferredDoctors() {
  return (
    <div className="preferred-doctors-container">
      {preferredDoctors.map((doc) => (
        <div key={doc.id} className="pref-doctor-card">
          <div className="pref-doctor-avatar-placeholder">
            {doc.initials}
          </div>
          <p className="pref-doctor-name">{doc.name}</p>
          <p className="pref-doctor-specialty">{doc.specialty}</p>
          
          <hr className="pref-doctor-divider" />
          
          <div className="pref-doctor-footer">
            <div className="pref-doctor-fee-block">
              <span className="pref-doctor-fee-label">Fee</span>
              <span className="pref-doctor-fee-value">{doc.fee}</span>
            </div>
            <button className="pref-doctor-book-btn" type="button">
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
