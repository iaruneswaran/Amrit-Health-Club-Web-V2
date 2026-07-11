import React, { useState } from 'react';
import searchIcon from '../assets/Search.svg';
import filterIcon from '../assets/Filter.svg';
import googleLocationIcon from '../assets/Google Location.svg';
import continueArrow from '../assets/Continue Arrow.svg';

const hospitalsList = [
  {
    id: 'st-marys',
    name: "St. Mary's Medical",
    distance: "1.2 km",
    openStatus: "06:00 AM - 10:00 PM",
    address: "161B, 1st Floor,6th Main, 3RD Cross Road, 3RD PHASE J P Nagar, Bangalore Karnataka India",
    doctorsCount: 48,
    isPreferred: true
  },
  {
    id: 'aster-mims',
    name: "Aster MIMS Kozhikode",
    distance: "2.5 km",
    openStatus: "Open 24/7",
    address: "Mini Bypass Rd, Govindapuram, Kozhikode, Kerala 673016",
    doctorsCount: 12,
    isPreferred: false
  },
  {
    id: 'baby-memorial',
    name: "Baby Memorial Hospital",
    distance: "3.1 km",
    openStatus: "Open 24/7",
    address: "Indira Gandhi Rd, Arayidathupalam, Kozhikode, Kerala 673004",
    doctorsCount: 85,
    isPreferred: false
  }
];

export default function HospitalsPage({ onBack }) {
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

  const filteredHospitals = hospitalsList.filter(hospital => 
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hospital.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isDetecting) {
    return (
      <div className="hospitals-page-container location-detecting-container">
        {/* Top Header Section */}
        <header className="hospitals-header">
          <div className="hospitals-title-row">
            <button className="hospitals-back-btn" onClick={onBack} aria-label="Go back to dashboard">
              <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '16px', height: '14px' }} />
            </button>
            <h1 className="hospitals-page-title">Hospitals near you</h1>
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
    <div className="hospitals-page-container">
      {/* Top Header Section */}
      <header className="hospitals-header">
        <div className="hospitals-title-row">
          <button className="hospitals-back-btn" onClick={onBack} aria-label="Go back to dashboard">
            <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '16px', height: '14px' }} />
          </button>
          <h1 className="hospitals-page-title">Hospitals near you</h1>
        </div>

        {/* Location Selector Card */}
        <div className="hospitals-location-card">
          <div className="location-left">
            <img src="/location.svg" alt="" aria-hidden="true" className="location-pin-icon" />
            <span className="location-text">{currentLocation}</span>
          </div>
          <button className="location-change-btn" type="button" onClick={handleLocationChange}>Change</button>
        </div>

        {/* Search & Filter Row */}
        <div className="hospitals-search-row">
          <div className="search-input-wrap">
            <img src={searchIcon} alt="" aria-hidden="true" className="search-icon" />
            <input
              type="text"
              placeholder="Search hospitals"
              className="hospitals-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="hospitals-filter-btn" type="button" aria-label="Filter hospitals">
            <img src={filterIcon} alt="" aria-hidden="true" className="filter-icon" />
          </button>
        </div>
      </header>

      {/* Hospital List Body */}
      <main className="hospitals-list-content">
        <div className="section-group">
          <p className="section-title" style={{ marginBottom: '0' }}>Found Hospitals</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredHospitals.map((hospital) => (
              <div className={`hospital-card ${hospital.isPreferred ? 'preferred' : ''}`} key={hospital.id}>
                {hospital.isPreferred && (
                  <span className="hospital-preferred-badge">Preferred</span>
                )}
                
                {/* Header detail row */}
                <div className="hospital-card-header">
                  <div className="hospital-header-details">
                    <h3 className="hospital-card-name">{hospital.name}</h3>
                    <div className="hospital-open-row">
                      <img src="/clock-icon.svg" alt="" aria-hidden="true" className="hospital-clock-icon" />
                      <span className="hospital-open-text">{hospital.openStatus}</span>
                    </div>
                  </div>
                  {!hospital.isPreferred && (
                    <span className="hospital-distance-badge">{hospital.distance}</span>
                  )}
                </div>

                {/* Address block with Google map pin */}
                <div className="hospital-address-container">
                  <img src={googleLocationIcon} alt="Map Location Pin" className="hospital-google-pin" />
                  <p className="hospital-address-text">{hospital.address}</p>
                </div>

                {/* Card footer */}
                <div className="hospital-card-footer">
                  <div className="hospital-doctors-count">
                    <span className="count-number">{hospital.doctorsCount}</span>
                    <span className="count-label">Doctors Available</span>
                  </div>
                  <button className="hospital-view-btn" type="button">
                    View Hospital
                  </button>
                </div>
              </div>
            ))}

            {filteredHospitals.length === 0 && (
              <div style={{ textAlign: 'center', padding: '30px 10px', color: '#667085', fontSize: '15px' }}>
                No hospitals match your search.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
