import React, { useState } from 'react';
import { doctorsList } from './DoctorsPage';
import continueArrow from '../assets/Continue Arrow.svg';
import googleLocationIcon from '../assets/Google Location.svg';
import clockIcon from '../assets/Clock Icon.svg';
import callIcon from '../assets/Call Icon.svg';
import mailIcon from '../assets/Mail icon.svg';

// Import hospital images
import stMarysImg from '../assets/Hospital Image.jpg';
import asterMimsImg from '../assets/Consultation.jpg';
import babyMemorialImg from '../assets/Admitted.jpg';

// Import department icon
import stethoscopeIcon from '../assets/Doctor Icon.svg';
import hospitalIcon from '../assets/Hospital icon.svg';

const imageMap = {
  'st-marys': stMarysImg,
  'aster-mims': asterMimsImg,
  'baby-memorial': babyMemorialImg
};

export default function HospitalDetailPage({ hospital, onBack, onBookNow, initialTab = 'overview' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const hospitalImg = imageMap[hospital.id] || stMarysImg;

  // Filter doctors for this specific hospital
  const hospitalDoctors = doctorsList.filter(
    (doc) => doc.hospitalName.toLowerCase() === hospital.name.toLowerCase()
  );

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'departments', label: 'Departments' },
    { id: 'doctors', label: 'Doctors' }
  ];

  return (
    <div className="hospitals-page-container" style={{ overflowY: 'auto', height: '100%' }}>
      {/* Header with hospital background */}
      <div className="ip-header" style={{ backgroundImage: `url(${hospitalImg})` }}>
        <div className="ip-header-overlay">
          <button className="ip-back-btn" onClick={onBack} aria-label="Go back">
            <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '14px', height: '14px',  }} />
          </button>
          
          <div className="ip-header-content">
            <div className="ip-patient-info">
              <h1 className="ip-patient-name" style={{ color: '#000000', fontWeight: '600' }}>{hospital.name}</h1>
              <p className="ip-patient-meta" style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '4px 0 0 0' }}>
                <img src="/clock-icon.svg" alt="" style={{ width: '14px', height: '14px', filter: 'brightness(0)', opacity: 1 }} />
                <span style={{ color: '#000000', fontWeight: '500' }}>{hospital.openStatus}</span>
              </p>
            </div>
          </div>
          {hospital.isPreferred && (
            <span className="ip-status-badge" style={{ background: '#80D351', color: '#FFFFFF' }}>
              Preferred
            </span>
          )}
        </div>
      </div>

      {/* Quick Stats Strip */}
      <div className="ip-stats-strip" style={{ padding: '16px 8px' }}>
        <div className="ip-stat-item">
          <span className="ip-stat-value" style={{ color: '#000000', fontSize: '16px' }}>{hospital.distance}</span>
          <span className="ip-stat-label" style={{ textTransform: 'none', fontSize: '14px' }}>Distance</span>
        </div>
        <div className="ip-stat-divider" style={{ margin: '0 20px' }} />
        <div className="ip-stat-item">
          <span className="ip-stat-value" style={{ color: '#000000', fontSize: '16px' }}>{hospital.doctorsCount}</span>
          <span className="ip-stat-label" style={{ textTransform: 'none', fontSize: '14px', whiteSpace: 'nowrap' }}>Doctors Available</span>
        </div>
        <div className="ip-stat-divider" style={{ margin: '0 20px' }} />
        <div className="ip-stat-item">
          <span className="ip-stat-value ip-stat-green" style={{ fontSize: '16px' }}>Open</span>
          <span className="ip-stat-label" style={{ textTransform: 'none', fontSize: '14px' }}>Status</span>
        </div>
      </div>

      {/* Map Location pin & address block below stats (no card container) */}
      <div style={{ padding: '16px 12px', background: '#FFFFFF', display: 'flex', gap: '12px', borderBottom: '1px solid #F2F4F7' }}>
        <img src={googleLocationIcon} alt="Map Location Pin" style={{ width: '20px', height: '20px', flexShrink: 0, marginTop: '2px' }} />
        <p style={{ fontFamily: 'var(--font)', fontSize: '14px', fontWeight: '400', color: '#555555', margin: 0, lineHeight: '1.4' }}>
          {hospital.address}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="ip-tab-bar" style={{ position: 'sticky', top: 0, zIndex: 10, background: '#FFFFFF', borderBottom: '1px solid #F2F4F7', marginBottom: '16px' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`ip-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            style={{ fontSize: '14px', padding: '14px 0' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div style={{ padding: '0 12px 30px' }}>
        {activeTab === 'overview' && (
          <div className="hospital-address-container" style={{ flexDirection: 'column', gap: '12px', alignItems: 'stretch' }}>
            <h4 className="hospital-card-name">About the Hospital</h4>
            <p className="hospital-address-text" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5', color: '#555555' }}>
              {hospital.name} is a premier healthcare facility offering comprehensive medical care. Equipped with advanced technology and staffed by top-tier medical professionals, we are committed to delivering the highest quality patient care and clinical excellence.
            </p>
            <div style={{ borderTop: '1px solid #F2F4F7', paddingTop: '12px', marginTop: '4px' }}>
              <p className="hospital-address-text" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Contact & Timings
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    background: '#F2F4F7', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <img src={callIcon} alt="Phone" style={{ width: '16px', height: '16px', display: 'block' }} />
                  </div>
                  <span className="hospital-address-text" style={{ display: 'block', margin: 0, fontWeight: '500' }}>+91 98765 43210</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    background: '#F2F4F7', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <img src={mailIcon} alt="Email" style={{ width: '16px', height: '16px', display: 'block' }} />
                  </div>
                  <span className="hospital-address-text" style={{ display: 'block', margin: 0, fontWeight: '500' }}>contact@{hospital.id}.com</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    background: '#F2F4F7', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <img src={clockIcon} alt="Timings" style={{ width: '16px', height: '16px', display: 'block' }} />
                  </div>
                  <span className="hospital-address-text" style={{ display: 'block', margin: 0, fontWeight: '500' }}>{hospital.openStatus}</span>
                </div>
              </div>
            </div>

            {/* Services Offered */}
            <div style={{ borderTop: '1px solid #F2F4F7', paddingTop: '12px', marginTop: '12px' }}>
              <p className="hospital-address-text" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Services Offered
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['24/7 Ambulance', 'Cafeteria / Food Court', 'In-house Pharmacy', 'Free Wi-Fi', 'Parking Facility', 'ICU & Emergency'].map((service, index) => (
                  <span key={index} className="hospital-address-text" style={{ 
                    display: 'inline-block', 
                    background: '#F2F4F7', 
                    borderRadius: 'var(--radius-sm)', 
                    padding: '6px 12px', 
                    fontSize: '13px',
                    fontWeight: '500'
                  }}>
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Specialties */}
            <div style={{ borderTop: '1px solid #F2F4F7', paddingTop: '12px', marginTop: '12px' }}>
              <p className="hospital-address-text" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Key Specialties
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'General Medicine', 'Emergency Care'].map((spec, index) => (
                  <span key={index} className="hospital-address-text" style={{ 
                    display: 'inline-block', 
                    background: '#CCA266', 
                    color: '#FFFFFF',
                    borderRadius: 'var(--radius-sm)', 
                    padding: '6px 12px', 
                    fontSize: '13px',
                    fontWeight: '500'
                  }}>
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'departments' && (
          <div className="dept-grid">
            {['Cardiology', 'Neurology', 'Pediatrics', 'General Medicine', 'Emergency Care', 'Orthopedics'].map((dept, index) => {
              const count = hospitalDoctors.filter(doc => {
                const spec = doc.specialty.toLowerCase();
                const d = dept.toLowerCase();
                if (spec.includes(d)) return true;
                if (d === 'pediatrics' && spec.includes('pediatric')) return true;
                if (d === 'general medicine' && (spec.includes('general') || spec.includes('medicine'))) return true;
                if (d === 'emergency care' && (spec.includes('emergency') || spec.includes('care'))) return true;
                return false;
              }).length;

              return (
                <div className="dept-card" key={index} style={{ background: '#FFFFFF', border: '1px solid #F2F4F7', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', gap: '4px' }}>
                  <h4 className="dept-title" style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#000000', textAlign: 'left' }}>{dept}</h4>
                  <p className="dept-subtitle" style={{ margin: 0, fontSize: '13px', fontWeight: '500', color: '#555555', textAlign: 'left' }}>
                    {count === 1 ? '1 Doctor' : `${count} Doctors`}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'doctors' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {hospitalDoctors.map((doctor) => (
              <div className={`doctor-card ${doctor.isPreferred ? 'preferred' : ''}`} key={doctor.id}>
                {/* Header detail row */}
                <div className="doctor-card-header">
                  <div className="doctor-logo-placeholder">
                    {doctor.name.split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div className="doctor-header-details">
                    <h3 className="doctor-card-name">{doctor.name}</h3>
                    <span className="doctor-specialty">{doctor.specialty}</span>
                  </div>
                </div>

                {/* Hospital block like location */}
                {doctor.hospitalName && (
                  <div className={`doctor-hospital-container ${doctor.isPreferred ? 'has-preferred' : ''}`}>
                    <div className="doctor-hospital-left">
                      <img src={hospitalIcon} alt="Hospital" className="doctor-hospital-icon" />
                      <span className="doctor-hospital-name">{doctor.hospitalName}</span>
                    </div>
                    {doctor.isPreferred && (
                      <span className="badge-preferred-inline">Preferred</span>
                    )}
                  </div>
                )}

                {/* Address block with Google map pin */}
                <div className="doctor-address-container">
                  <img src={googleLocationIcon} alt="Map Location Pin" className="doctor-google-pin" />
                  <p className="doctor-address-text" style={{ display: 'block', WebkitLineClamp: 'initial', overflow: 'initial' }}>
                    {doctor.address}
                  </p>
                </div>

                {/* Card footer */}
                <div className="doctor-card-footer">
                  <div className="doctor-fee-block">
                    <span className="doctor-fee-amount">{doctor.fee}</span>
                    <span className="doctor-fee-label">Consultation Fee</span>
                  </div>
                  <button className="doctor-book-btn" type="button" onClick={() => onBookNow && onBookNow(doctor)}>
                    Book Now
                  </button>
                </div>
              </div>
            ))}

            {hospitalDoctors.length === 0 && (
              <div style={{ textAlign: 'center', padding: '30px 10px', color: '#000000', fontSize: '15px' }}>
                No doctors currently available at this hospital.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
