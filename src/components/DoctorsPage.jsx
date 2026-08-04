import React, { useState } from 'react';
import searchIcon from '../assets/Search.svg';
import filterIcon from '../assets/Filter.svg';
import googleLocationIcon from '../assets/Google Location.svg';
import continueArrow from '../assets/Continue Arrow.svg';

export const doctorsList = [
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
    name: "Dr. Rajiv Sharma",
    specialty: "General Physician",
    fee: "₹400",
    address: "161B, 1st Floor,6th Main, 3RD Cross Road, 3RD PHASE J P Nagar, Bangalore Karnataka India",
    hospitalName: "St. Mary's Medical",
    isPreferred: false
  },
  {
    id: 3,
    name: "Dr. Priya Nair",
    specialty: "Dermatology Specialist",
    fee: "₹600",
    address: "161B, 1st Floor,6th Main, 3RD Cross Road, 3RD PHASE J P Nagar, Bangalore Karnataka India",
    hospitalName: "St. Mary's Medical",
    isPreferred: false
  },
  {
    id: 4,
    name: "Dr. Ananya Roy",
    specialty: "Orthopedic Surgeon",
    fee: "₹700",
    address: "161B, 1st Floor,6th Main, 3RD Cross Road, 3RD PHASE J P Nagar, Bangalore Karnataka India",
    hospitalName: "St. Mary's Medical",
    isPreferred: false
  },
  {
    id: 5,
    name: "Dr. Vikram Seth",
    specialty: "Pediatrician Specialist",
    fee: "₹450",
    address: "161B, 1st Floor,6th Main, 3RD Cross Road, 3RD PHASE J P Nagar, Bangalore Karnataka India",
    hospitalName: "St. Mary's Medical",
    isPreferred: false
  },
  {
    id: 6,
    name: "Dr. Marcus Vance",
    specialty: "Neurology Specialist",
    fee: "₹600",
    address: "24C, Green Glen Layout, Outer Ring Rd, Bellandur, Bangalore Karnataka India",
    hospitalName: "Aster MIMS Kozhikode",
    isPreferred: false
  },
  {
    id: 7,
    name: "Dr. Sarah Jenkins",
    specialty: "Pediatrician Specialist",
    fee: "₹450",
    address: "88/2, Richmond Rd, opposite Baldwin Girls School, Richmond Town, Bangalore Karnataka India",
    hospitalName: "Baby Memorial Hospital",
    isPreferred: false
  }
];

export default function DoctorsPage({ onBack, onBookNow }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState('UL Cyber Park, Kozhikode');
  const [isDetecting, setIsDetecting] = useState(false);

  // Filter States
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedHospital, setSelectedHospital] = useState('All');
  const [preferredOnly, setPreferredOnly] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  // Draft States for Modal
  const [draftSpecialty, setDraftSpecialty] = useState('All');
  const [draftHospital, setDraftHospital] = useState('All');
  const [draftPreferredOnly, setDraftPreferredOnly] = useState(false);
  const [draftSortBy, setDraftSortBy] = useState('default');

  const specialties = [
    'All',
    'Cardiology',
    'General Physician',
    'Dermatology',
    'Orthopedic',
    'Pediatrician',
    'Neurology'
  ];

  const hospitals = [
    'All',
    "St. Mary's Medical",
    'Aster MIMS',
    'Baby Memorial'
  ];

  const handleLocationChange = () => {
    setIsDetecting(true);
    setTimeout(() => {
      setIsDetecting(false);
      setCurrentLocation('Hilite Mall, Kozhikode');
    }, 2000);
  };

  const openFilterModal = () => {
    setDraftSpecialty(selectedSpecialty);
    setDraftHospital(selectedHospital);
    setDraftPreferredOnly(preferredOnly);
    setDraftSortBy(sortBy);
    setShowFilterModal(true);
  };

  const handleApplyFilters = () => {
    setSelectedSpecialty(draftSpecialty);
    setSelectedHospital(draftHospital);
    setPreferredOnly(draftPreferredOnly);
    setSortBy(draftSortBy);
    setShowFilterModal(false);
  };

  const handleResetFilters = () => {
    setDraftSpecialty('All');
    setDraftHospital('All');
    setDraftPreferredOnly(false);
    setDraftSortBy('default');
  };

  const activeFilterCount = 
    (selectedSpecialty !== 'All' ? 1 : 0) +
    (selectedHospital !== 'All' ? 1 : 0) +
    (preferredOnly ? 1 : 0) +
    (sortBy !== 'default' ? 1 : 0);

  const filteredDoctors = doctorsList.filter(doctor => {
    const matchesSearch = 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doctor.hospitalName && doctor.hospitalName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSpecialty = 
      selectedSpecialty === 'All' || 
      doctor.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());

    const matchesHospital = 
      selectedHospital === 'All' || 
      (doctor.hospitalName && doctor.hospitalName.toLowerCase().includes(selectedHospital.toLowerCase()));

    const matchesPreferred = !preferredOnly || doctor.isPreferred;

    return matchesSearch && matchesSpecialty && matchesHospital && matchesPreferred;
  }).sort((a, b) => {
    if (sortBy === 'fee-asc') {
      const feeA = parseInt(a.fee.replace(/[^\d]/g, ''), 10) || 0;
      const feeB = parseInt(b.fee.replace(/[^\d]/g, ''), 10) || 0;
      return feeA - feeB;
    }
    if (sortBy === 'fee-desc') {
      const feeA = parseInt(a.fee.replace(/[^\d]/g, ''), 10) || 0;
      const feeB = parseInt(b.fee.replace(/[^\d]/g, ''), 10) || 0;
      return feeB - feeA;
    }
    return 0;
  });

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
          <button 
            className={`doctors-filter-btn ${activeFilterCount > 0 ? 'active' : ''}`} 
            type="button" 
            aria-label="Filter doctors"
            onClick={openFilterModal}
          >
            <img src={filterIcon} alt="" aria-hidden="true" className="filter-icon" />
            {activeFilterCount > 0 && <span className="filter-badge">{activeFilterCount}</span>}
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
                    <img src="/hospital-icon.svg" alt="Hospital" className="doctor-hospital-icon" style={{ filter: 'invert(71%) sepia(30%) saturate(632%) hue-rotate(1deg) brightness(91%) contrast(87%)' }} />
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
                <p className="doctor-address-text">{doctor.address}</p>
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

          {filteredDoctors.length === 0 && (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: '#000000', fontSize: '15px' }}>
              No doctors match your filters or search.
            </div>
          )}
        </div>
      </main>

      {/* FILTER MODAL */}
      {showFilterModal && (
        <div className="filter-modal-overlay" onClick={() => setShowFilterModal(false)}>
          <div className="filter-modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="filter-modal-header">
              <div className="filter-modal-title-wrap">
                <h3 className="filter-modal-title">Filter Doctors</h3>
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
              {/* Specialty Section */}
              <div className="filter-section">
                <h4 className="filter-section-title">Specialty</h4>
                <div className="filter-chips-wrap">
                  {specialties.map(spec => (
                    <button
                      key={spec}
                      type="button"
                      className={`filter-chip ${draftSpecialty === spec ? 'active' : ''}`}
                      onClick={() => setDraftSpecialty(spec)}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hospital Section */}
              <div className="filter-section">
                <h4 className="filter-section-title">Hospital</h4>
                <div className="filter-chips-wrap">
                  {hospitals.map(hosp => (
                    <button
                      key={hosp}
                      type="button"
                      className={`filter-chip ${draftHospital === hosp ? 'active' : ''}`}
                      onClick={() => setDraftHospital(hosp)}
                    >
                      {hosp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Only Toggle */}
              <div className="filter-section">
                <div className="filter-toggle-row" onClick={() => setDraftPreferredOnly(!draftPreferredOnly)}>
                  <span className="filter-toggle-label">Preferred Doctors Only</span>
                  <div className={`filter-toggle-switch ${draftPreferredOnly ? 'active' : ''}`}>
                    <div className="filter-toggle-dot"></div>
                  </div>
                </div>
              </div>

              {/* Sort By Section */}
              <div className="filter-section">
                <h4 className="filter-section-title">Sort By Consultation Fee</h4>
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
                    className={`filter-chip ${draftSortBy === 'fee-asc' ? 'active' : ''}`}
                    onClick={() => setDraftSortBy('fee-asc')}
                  >
                    Fee: Low to High
                  </button>
                  <button
                    type="button"
                    className={`filter-chip ${draftSortBy === 'fee-desc' ? 'active' : ''}`}
                    onClick={() => setDraftSortBy('fee-desc')}
                  >
                    Fee: High to Low
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
