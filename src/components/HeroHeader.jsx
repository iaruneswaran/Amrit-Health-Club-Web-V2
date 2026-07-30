import { useState, useEffect } from 'react'
import logoutIcon from '../assets/Logout icon.svg'
import homePageHeaderImage from '../assets/Home Page Header Image.jpg'


export default function HeroHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedInitials, setSelectedInitials] = useState(() => {
    return localStorage.getItem('selected_profile_initials') || 'RG'
  })

  useEffect(() => {
    const handleProfileChange = () => {
      setSelectedInitials(localStorage.getItem('selected_profile_initials') || 'RG')
    }
    window.addEventListener('profile-changed', handleProfileChange)
    return () => {
      window.removeEventListener('profile-changed', handleProfileChange)
    }
  }, [])

  const profiles = [
    { initials: 'RG', label: 'Ryan Gosling' },
    { initials: 'RR', label: 'Ryan Reynolds' },
  ]

  return (
    <header className="hero-header">
      <img
        className="hero-bg-img"
        src={homePageHeaderImage}
        alt="Amrit Health Club header background"
        aria-hidden="true"
      />
      <div className="hero-content">
        <img
          src="/logo.svg"
          alt="Amrit Health Club"
          className="hero-logo"
        />
        
        <div className="avatar-badge-container">
          <div 
            className={`avatar-badge ${isOpen ? 'open' : ''}`} 
            role="button" 
            aria-label="Switch profile"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="avatar-badge-inner">{selectedInitials}</div>
          </div>

          {isOpen && (
            <div 
              className="dropdown-overlay" 
              onClick={() => setIsOpen(false)} 
            />
          )}

          <div className={`profile-dropdown ${isOpen ? 'open' : ''}`}>
            {profiles.map((p) => (
              <div
                key={p.initials}
                className={`profile-dropdown-item ${selectedInitials === p.initials ? 'active' : ''}`}
                onClick={() => {
                  setSelectedInitials(p.initials)
                  localStorage.setItem('selected_profile_initials', p.initials)
                  window.dispatchEvent(new Event('profile-changed'))
                  setIsOpen(false)
                }}
              >
                <div className="dropdown-item-badge">{p.initials}</div>
                <span className="dropdown-item-label">{p.label}</span>
              </div>
            ))}
            <div className="profile-dropdown-divider" style={{ borderTop: '1px dashed #E5E7EB', margin: '4px 0' }} />
            <div
              className="profile-dropdown-item"
              onClick={() => {
                localStorage.clear()
                window.location.reload()
              }}
              style={{ color: '#B08060' }}
            >
              <div className="dropdown-item-badge" style={{ backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={logoutIcon} alt="Logout" style={{ width: '18px', height: '18px' }} />
              </div>
              <span className="dropdown-item-label" style={{ fontWeight: '500', fontSize: '16px' }}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

