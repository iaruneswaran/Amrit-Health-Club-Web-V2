import { useState, useEffect } from 'react'
import logoutIcon from '../assets/Logout icon.svg'
import homePageHeaderImage from '../assets/Home Page Header Image.jpg'


export default function HeroHeader({ onProfileClick }) {
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
            className="avatar-badge" 
            role="button" 
            aria-label="View Profile"
            onClick={onProfileClick}
            style={{ cursor: 'pointer' }}
          >
            <div className="avatar-badge-inner">{selectedInitials}</div>
          </div>
        </div>
      </div>
    </header>
  )
}

