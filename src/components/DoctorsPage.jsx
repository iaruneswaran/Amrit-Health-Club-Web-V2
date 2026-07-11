import React, { useState } from 'react';
import searchIcon from '../assets/Search.svg';
import filterIcon from '../assets/Filter.svg';
import googleLocationIcon from '../assets/Google Location.svg';
import continueArrow from '../assets/Continue Arrow.svg';

const doctorsList = [
  {
    id: 1,
    name: "Dr. Amelia Carter",
    specialty: "Cardiology Specialist",
    fee: "₹500",
    address: "161B, 1st Floor,6th Main, 3RD Cross Road, 3RD PHASE J P Nagar, Bangalore Karnataka India",
    hospitalName: "St. Mary's Medical",
    isPreferred: true
  },
  {
    id: 2,
    name: "Dr. Amelia Carter",
    specialty: "Cardiology Specialist",
    fee: "₹500",
    address: "161B, 1st Floor,6th Main, 3RD Cross Road, 3RD PHASE J P Nagar, Bangalore Karnataka India",
    hospitalName: "St. Mary's Medical",
    isPreferred: false
  },
  {
    id: 3,
    name: "Dr. Marcus Vance",
    specialty: "Neurology Specialist",
    fee: "₹600",
    address: "24C, Green Glen Layout, Outer Ring Rd, Bellandur, Bangalore Karnataka India",
    hospitalName: "Aster MIMS Kozhikode",
    isPreferred: false
  },
  {
    id: 4,
    name: "Dr. Sarah Jenkins",
    specialty: "Pediatrician Specialist",
    fee: "₹450",
    address: "88/2, Richmond Rd, opposite Baldwin Girls School, Richmond Town, Bangalore Karnataka India",
    hospitalName: "Baby Memorial Hospital",
    isPreferred: false
  }
];

export default function DoctorsPage({ onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState('UL Cyber Park, Kozhikode');
  const [isDetecting, setIsDetecting] = useState(false);

  const handleLocationChange = () => {
    setIsDetecting(true);
    setTimeout(() => {
      setIsDetecting(false);
      setCurrentLocation('Hilite Mall, Kozhikode');
    }, 2000);
  };

  const filteredDoctors = doctorsList.filter(doctor => 
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isDetecting) {
    return (
      <div className="doctors-page-container location-detecting-container">
        {/* Top Header Section */}
        <header className="doctors-header">
          <div className="doctors-title-row">
            <button className="doctors-back-btn" onClick={onBack} aria-label="Go back to dashboard">
              <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '16px', height: '14px' }} />
            </button>
            <h1 className="doctors-page-title">Doctors near you</h1>
          </div>
        </header>

        {/* Sonar Radar Scanning Animation Body */}
        <div className="detecting-location-body">
          <div className="gps-scanner-circle">
            <img src={googleLocationIcon} alt="" className="gps-ping-icon" />
            <div className="sonar-wave"></div>
          </div>
          <h2 className="detecting-title">Detecting location...</h2>
          <p className="detecting-sub">Automatically fetching your GPS coordinates</p>
          <div className="detecting-location-hint">Hilite Mall, Kozhikode</div>
        </div>
      </div>
    );
  }

  return (
    <div className="doctors-page-container">
      {/* Top Header Section */}
      <header className="doctors-header">
        <div className="doctors-title-row">
          <button className="doctors-back-btn" onClick={onBack} aria-label="Go back to dashboard">
            <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '16px', height: '14px' }} />
          </button>
          <h1 className="doctors-page-title">Doctors near you</h1>
        </div>

        {/* Location Selector Card */}
        <div className="doctors-location-card">
          <div className="location-left">
            <img src="/location.svg" alt="" aria-hidden="true" className="location-pin-icon" />
            <span className="location-text">{currentLocation}</span>
          </div>
          <button className="location-change-btn" type="button" onClick={handleLocationChange}>Change</button>
        </div>

        {/* Search & Filter Row */}
        <div className="doctors-search-row">
          <div className="search-input-wrap">
            <img src={searchIcon} alt="" aria-hidden="true" className="search-icon" />
            <input
              type="text"
              placeholder="Search for specialty, doctor"
              className="doctors-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="doctors-filter-btn" type="button" aria-label="Filter doctors">
            <img src={filterIcon} alt="" aria-hidden="true" className="filter-icon" />
          </button>
        </div>
      </header>

      {/* Doctor List Body */}
      <main className="doctors-list-content">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredDoctors.map((doctor) => (
            <div className={`doctor-card ${doctor.isPreferred ? 'preferred' : ''}`} key={doctor.id}>
              {/* Header detail row */}
              <div className="doctor-card-header">
                <div className="doctor-logo-placeholder"></div>
                <div className="doctor-header-details">
                  <h3 className="doctor-card-name">{doctor.name}</h3>
                  <span className="doctor-specialty">{doctor.specialty}</span>
                </div>
              </div>

              {/* Hospital block like location */}
              {doctor.hospitalName && (
                <div className={`doctor-hospital-container ${doctor.isPreferred ? 'has-preferred' : ''}`}>
                  <div className="doctor-hospital-left">
                    <img src="/hospital-icon.svg" alt="Hospital" className="doctor-hospital-icon" />
                    <span className="doctor-hospital-name">{doctor.hospitalName}</span>
                  </div>
                  {doctor.isPreferred && (
                    <span className="badge-preferred-inline">Prefered</span>
                  )}
                </div>
              )}

              {/* Address block with Google map pin */}
              <div className="doctor-address-container">
                <img src={googleLocationIcon} alt="Map Location Pin" className="doctor-google-pin" />
                <p className="doctor-address-text">{doctor.address}</p>
              </div>

              {/* Card footer */}
              <div className="doctor-card-footer">
                <div className="doctor-fee-block">
                  <span className="doctor-fee-amount">{doctor.fee}</span>
                  <span className="doctor-fee-label">Consultation Fee</span>
                </div>
                <button className="doctor-book-btn" type="button">
                  Book Now
                </button>
              </div>
            </div>
          ))}

          {filteredDoctors.length === 0 && (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: '#667085', fontSize: '15px' }}>
              No doctors match your search.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
