import React, { useState } from 'react';
import searchIcon from '../assets/Search.svg';
import filterIcon from '../assets/Filter.svg';
import googleLocationIcon from '../assets/Google Location.svg';
import continueArrow from '../assets/Continue Arrow.svg';
import hospitalIcon from '../assets/Doctor Icon.svg';
import HospitalDetailPage from './HospitalDetailPage';

export const hospitalsList = [
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

export default function HospitalsPage({ onBack, onBookNow }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState('UL Cyber Park, Kozhikode');
  const [isDetecting, setIsDetecting] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);

  // Filter States
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedMaxDistance, setSelectedMaxDistance] = useState('All'); // 'All', '2', '3', '5'
  const [preferredOnly, setPreferredOnly] = useState(false);
  const [sortBy, setSortBy] = useState('default'); // 'default', 'distance', 'doctors'

  // Draft States for Modal
  const [draftStatus, setDraftStatus] = useState('All');
  const [draftMaxDistance, setDraftMaxDistance] = useState('All');
  const [draftPreferredOnly, setDraftPreferredOnly] = useState(false);
  const [draftSortBy, setDraftSortBy] = useState('default');

  const handleLocationChange = () => {
    setIsDetecting(true);
    setTimeout(() => {
      setIsDetecting(false);
      setCurrentLocation('Hilite Mall, Kozhikode');
    }, 2000);
  };

  const openFilterModal = () => {
    setDraftStatus(selectedStatus);
    setDraftMaxDistance(selectedMaxDistance);
    setDraftPreferredOnly(preferredOnly);
    setDraftSortBy(sortBy);
    setShowFilterModal(true);
  };

  const handleApplyFilters = () => {
    setSelectedStatus(draftStatus);
    setSelectedMaxDistance(draftMaxDistance);
    setPreferredOnly(draftPreferredOnly);
    setSortBy(draftSortBy);
    setShowFilterModal(false);
  };

  const handleResetFilters = () => {
    setDraftStatus('All');
    setDraftMaxDistance('All');
    setDraftPreferredOnly(false);
    setDraftSortBy('default');
  };

  const activeFilterCount = 
    (selectedStatus !== 'All' ? 1 : 0) +
    (selectedMaxDistance !== 'All' ? 1 : 0) +
    (preferredOnly ? 1 : 0) +
    (sortBy !== 'default' ? 1 : 0);

  const filteredHospitals = hospitalsList.filter(hospital => {
    const matchesSearch = 
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      selectedStatus === 'All' || 
      (selectedStatus === '24/7' && hospital.openStatus.toLowerCase().includes('24/7'));

    const matchesPreferred = !preferredOnly || hospital.isPreferred;

    let matchesDistance = true;
    if (selectedMaxDistance !== 'All') {
      const distNum = parseFloat(hospital.distance) || 0;
      const maxDistNum = parseFloat(selectedMaxDistance) || 999;
      matchesDistance = distNum <= maxDistNum;
    }

    return matchesSearch && matchesStatus && matchesPreferred && matchesDistance;
  }).sort((a, b) => {
    if (sortBy === 'distance') {
      const distA = parseFloat(a.distance) || 0;
      const distB = parseFloat(b.distance) || 0;
      return distA - distB;
    }
    if (sortBy === 'doctors') {
      return b.doctorsCount - a.doctorsCount;
    }
    return 0;
  });

  if (selectedHospital) {
    return (
      <HospitalDetailPage 
        hospital={selectedHospital} 
        onBack={() => setSelectedHospital(null)}
        onBookNow={onBookNow}
      />
    );
  }

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
          <button 
            className={`hospitals-filter-btn ${activeFilterCount > 0 ? 'active' : ''}`} 
            type="button" 
            aria-label="Filter hospitals"
            onClick={openFilterModal}
          >
            <img src={filterIcon} alt="" aria-hidden="true" className="filter-icon" />
            {activeFilterCount > 0 && <span className="filter-badge">{activeFilterCount}</span>}
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
                  {/* Hospital avatar: 2-letter initials */}
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: '#F2F4F7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#CCA266',
                    letterSpacing: '0.5px'
                  }}>
                    {hospital.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
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
                  <button 
                    className="hospital-view-btn" 
                    type="button"
                    onClick={() => setSelectedHospital(hospital)}
                  >
                    View Hospital
                  </button>
                </div>
              </div>
            ))}

            {filteredHospitals.length === 0 && (
              <div style={{ textAlign: 'center', padding: '30px 10px', color: '#000000', fontSize: '15px' }}>
                No hospitals match your filters or search.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* FILTER MODAL */}
      {showFilterModal && (
        <div className="filter-modal-overlay" onClick={() => setShowFilterModal(false)}>
          <div className="filter-modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="filter-modal-header">
              <div className="filter-modal-title-wrap">
                <h3 className="filter-modal-title">Filter Hospitals</h3>
              </div>
              <div className="filter-header-actions">
                <button type="button" className="filter-reset-btn" onClick={handleResetFilters}>
                  Reset
                </button>
                <button 
                  className="clinic-modal-close" 
                  onClick={() => setShowFilterModal(false)} 
                  type="button" 
                  aria-label="Close filter"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="filter-modal-body">
              {/* Distance KM Filter Section */}
              <div className="filter-section">
                <h4 className="filter-section-title">Distance (Radius)</h4>
                <div className="filter-chips-wrap">
                  <button
                    type="button"
                    className={`filter-chip ${draftMaxDistance === 'All' ? 'active' : ''}`}
                    onClick={() => setDraftMaxDistance('All')}
                  >
                    Any Distance
                  </button>
                  <button
                    type="button"
                    className={`filter-chip ${draftMaxDistance === '2' ? 'active' : ''}`}
                    onClick={() => setDraftMaxDistance('2')}
                  >
                    Within 2 km
                  </button>
                  <button
                    type="button"
                    className={`filter-chip ${draftMaxDistance === '3' ? 'active' : ''}`}
                    onClick={() => setDraftMaxDistance('3')}
                  >
                    Within 3 km
                  </button>
                  <button
                    type="button"
                    className={`filter-chip ${draftMaxDistance === '5' ? 'active' : ''}`}
                    onClick={() => setDraftMaxDistance('5')}
                  >
                    Within 5 km
                  </button>
                </div>
              </div>

              {/* Availability Status Section */}
              <div className="filter-section">
                <h4 className="filter-section-title">Open Status</h4>
                <div className="filter-chips-wrap">
                  <button
                    type="button"
                    className={`filter-chip ${draftStatus === 'All' ? 'active' : ''}`}
                    onClick={() => setDraftStatus('All')}
                  >
                    All Hours
                  </button>
                  <button
                    type="button"
                    className={`filter-chip ${draftStatus === '24/7' ? 'active' : ''}`}
                    onClick={() => setDraftStatus('24/7')}
                  >
                    Open 24/7 Only
                  </button>
                </div>
              </div>

              {/* Preferred Hospitals Toggle */}
              <div className="filter-section">
                <div className="filter-toggle-row" onClick={() => setDraftPreferredOnly(!draftPreferredOnly)}>
                  <span className="filter-toggle-label">Preferred Hospitals Only</span>
                  <div className={`filter-toggle-switch ${draftPreferredOnly ? 'active' : ''}`}>
                    <div className="filter-toggle-dot"></div>
                  </div>
                </div>
              </div>

              {/* Sort By Section */}
              <div className="filter-section">
                <h4 className="filter-section-title">Sort By</h4>
                <div className="filter-chips-wrap">
                  <button
                    type="button"
                    className={`filter-chip ${draftSortBy === 'default' ? 'active' : ''}`}
                    onClick={() => setDraftSortBy('default')}
                  >
                    Default
                  </button>
                  <button
                    type="button"
                    className={`filter-chip ${draftSortBy === 'distance' ? 'active' : ''}`}
                    onClick={() => setDraftSortBy('distance')}
                  >
                    Distance: Nearest First
                  </button>
                  <button
                    type="button"
                    className={`filter-chip ${draftSortBy === 'doctors' ? 'active' : ''}`}
                    onClick={() => setDraftSortBy('doctors')}
                  >
                    Doctors: Most Available
                  </button>
                </div>
              </div>
            </div>

            <div className="filter-modal-footer">
              <button type="button" className="filter-apply-btn" onClick={handleApplyFilters}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
