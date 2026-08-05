import React from 'react';
import uploadDocIcon from '../assets/Upload Document.svg';

const navItems = [
  { id: 'hospitals-nav', icon: '/hospital-icon.svg', label: 'Hospitals' },
  { id: 'doctors-nav',   icon: '/doctor-icon.svg',   label: 'Doctors'   },
  { id: 'upload-doc-nav', icon: uploadDocIcon,         label: 'Upload' },
]

export default function QuickNav({ onHospitalsClick, onDoctorsClick, onUploadDocClick }) {
  const handleItemClick = (label) => {
    if (label === 'Hospitals' && onHospitalsClick) onHospitalsClick();
    if (label === 'Doctors' && onDoctorsClick) onDoctorsClick();
    if ((label === 'Upload' || label === 'Upload Document') && onUploadDocClick) onUploadDocClick();
  };

  return (
    <nav className="quick-nav-card" aria-label="Quick navigation">
      {navItems.map((item, idx) => (
        <React.Fragment key={item.id}>
          <div 
            className="nav-item" 
            id={item.id} 
            role="button" 
            tabIndex={0} 
            aria-label={item.label}
            onClick={() => handleItemClick(item.label)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleItemClick(item.label); }}
          >
            <div className="nav-icon-wrap">
              <img src={item.icon} alt={item.label} style={{ height: '24px', width: 'auto' }} />
            </div>
            <span className="nav-label">{item.label}</span>
          </div>
          {idx < navItems.length - 1 && (
            <div className="nav-divider" aria-hidden="true" />
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
