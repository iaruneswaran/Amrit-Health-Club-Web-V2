import { useState } from 'react'

export default function HeroHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedInitials, setSelectedInitials] = useState('RG')

  const profiles = [
    { initials: 'RG', label: 'Ryan Gosling' },
    { initials: 'RR', label: 'Ryan Reynolds' },
  ]

  return (
    <header className="hero-header">
      <img
        className="hero-bg-img"
        src="/header.jpg"
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
                  setIsOpen(false)
                }}
              >
                <div className="dropdown-item-badge">{p.initials}</div>
                <span className="dropdown-item-label">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
