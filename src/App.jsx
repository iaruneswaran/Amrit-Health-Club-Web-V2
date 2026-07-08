import { useState, useEffect } from 'react'
import './App.css'
import HeroHeader from './components/HeroHeader'
import AIBanner from './components/AIBanner'
import QuickNav from './components/QuickNav'
import ClinicCard from './components/ClinicCard'
import AppointmentCard from './components/AppointmentCard'
import PulseScore from './components/PulseScore'
import MedicationCard from './components/MedicationCard'
import AdmissionCard from './components/AdmissionCard'
import PreferredDoctors from './components/PreferredDoctors'
import homePageEndImage from './assets/Home Page End Image.png'
import SplashScreen from './components/SplashScreen'
import Onboarding from './components/Onboarding'
import LoginFlow from './components/LoginFlow'
import NavBar from './components/NavBar'
import AIPage from './components/AIPage'
import labIcon from './assets/Lab.svg'
import consultationIcon from './assets/Consultation.svg'
import vitalsIcon from './assets/Vitals.svg'
import statusArrow from './assets/Status Arrow.svg'
import pulseImage from './assets/Pulse Image.jpg'
import pulsePageLogo from './assets/Pulse Page Logo.png'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return localStorage.getItem('onboarding_completed') !== 'true'
  })
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('user_logged_in') === 'true'
  })
  const [showAIPage, setShowAIPage] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [pulsePageHasBack, setPulsePageHasBack] = useState(false)

  const handleImprovementPlansClick = () => {
    setPulsePageHasBack(true)
    setActiveTab(1)
  }

  const handleTabChange = (index) => {
    setPulsePageHasBack(false)
    setActiveTab(index)
  }

  const handleBackToHome = () => {
    setPulsePageHasBack(false)
    setActiveTab(0)
  }

  console.log("App state - showSplash:", showSplash, "fadeOut:", fadeOut, "showOnboarding:", showOnboarding, "isLoggedIn:", isLoggedIn, "activeTab:", activeTab, "pulsePageHasBack:", pulsePageHasBack)

  useEffect(() => {
    // Start fading out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 2000)

    // Remove from DOM completely after fade transition completes (0.6s)
    const removeTimer = setTimeout(() => {
      setShowSplash(false)
    }, 2600)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    const appFrame = document.querySelector('.app-frame')
    if (appFrame) {
      appFrame.scrollTop = 0
    }
    const pageShell = document.querySelector('.page-shell')
    if (pageShell) {
      pageShell.scrollTop = 0
    }
  }, [activeTab])

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    localStorage.setItem('onboarding_completed', 'true')
  }

  const handleLoginComplete = () => {
    setIsLoggedIn(true)
    localStorage.setItem('user_logged_in', 'true')
  }

  const renderAppContent = () => {
    if (showOnboarding) {
      return (
        <>
          <Onboarding onComplete={handleOnboardingComplete} />
          {showSplash && <SplashScreen fadeOut={fadeOut} />}
        </>
      )
    }

    if (!isLoggedIn) {
      return (
        <>
          <LoginFlow onLoginComplete={handleLoginComplete} />
          {showSplash && <SplashScreen fadeOut={fadeOut} />}
        </>
      )
    }

    if (showAIPage) {
      return (
        <>
          {showSplash && <SplashScreen fadeOut={fadeOut} />}
          <AIPage onBack={() => setShowAIPage(false)} />
        </>
      )
    }

    if (activeTab === 0) {
      // Home/Dashboard tab
      return (
        <>
          {showSplash && <SplashScreen fadeOut={fadeOut} />}
          <HeroHeader />
          <main className="main-content">
            <AIBanner onClick={() => setShowAIPage(true)} />
            <QuickNav />
            <ClinicCard />
            <div className="section-group">
              <p className="section-title">Booked Appointments</p>
              <AppointmentCard />
            </div>
            <div className="section-group">
              <p className="section-title">Your Pulse Score</p>
              <PulseScore onImprovementPlansClick={handleImprovementPlansClick} />
            </div>
            <div className="section-group">
              <p className="section-title">Medication</p>
              <MedicationCard />
            </div>
            <div className="section-group">
              <p className="section-title">Admission Overview</p>
              <AdmissionCard />
            </div>
            <div className="section-group">
              <p className="section-title">Preferred Doctors</p>
              <PreferredDoctors />
            </div>
            <div className="homepage-end-image-container">
              <img src={homePageEndImage} alt="Amrit Health Club Home End" className="homepage-end-image" />
            </div>
          </main>
          <NavBar activeTab={activeTab} setActiveTab={handleTabChange} />
        </>
      )
    }

    if (activeTab === 1) {
      // Pulse tab
      return (
        <>
          {showSplash && <SplashScreen fadeOut={fadeOut} />}
          <header className="pulse-page-header">
            <img src={pulseImage} alt="" className="pulse-page-header-bg" />
            {pulsePageHasBack && (
              <button className="pulse-back-btn" onClick={handleBackToHome} aria-label="Go back">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
            )}
            <div className="pulse-page-header-overlay">
              <img src={pulsePageLogo} alt="Your Pulse Score Logo" className="pulse-page-header-logo" />
            </div>
          </header>
          <main className="main-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <PulseScore showFooter={false} />

            <div className="section-group drives-section">
              <p className="section-title">Health Drives</p>
              <div className="drives-scroll-container">
                <div className="drive-card">
                  <div className="drive-card-header">
                    <div className="drive-icon-wrap lab-icon-wrap">
                      <img src={labIcon} alt="" className="drive-icon" />
                    </div>
                    <span className="drive-percentage">+8%</span>
                  </div>
                  <h3 className="drive-card-title">Lab Report</h3>
                  <div className="drive-status-pill no-issues">
                    <img src={statusArrow} alt="" className="status-arrow-icon" />
                    <span>No Issues</span>
                  </div>
                  <p className="drive-card-footer">Updated 2d ago</p>
                </div>

                <div className="drive-card">
                  <div className="drive-card-header">
                    <div className="drive-icon-wrap consultation-icon-wrap">
                      <img src={consultationIcon} alt="" className="drive-icon" />
                    </div>
                    <span className="drive-percentage">+8%</span>
                  </div>
                  <h3 className="drive-card-title">Consultation</h3>
                  <div className="drive-status-pill pending">
                    <img src={statusArrow} alt="" className="status-arrow-icon" />
                    <span>Pending</span>
                  </div>
                  <p className="drive-card-footer">Last visit 5d ago</p>
                </div>

                <div className="drive-card">
                  <div className="drive-card-header">
                    <div className="drive-icon-wrap vitals-icon-wrap">
                      <img src={vitalsIcon} alt="" className="drive-icon" />
                    </div>
                    <span className="drive-percentage">+8%</span>
                  </div>
                  <h3 className="drive-card-title">Vitals Stability</h3>
                  <div className="drive-status-pill stable">
                    <img src={statusArrow} alt="" className="status-arrow-icon" />
                    <span>Stable</span>
                  </div>
                  <p className="drive-card-footer">Updated 5m ago</p>
                </div>
              </div>
            </div>

            <div className="section-group history-section">
              <div className="history-header-row">
                <p className="section-title">Score History</p>
                <div className="timeframe-selector">
                  <button className="timeframe-btn active">7d</button>
                  <button className="timeframe-btn">30d</button>
                  <button className="timeframe-btn">90d</button>
                </div>
              </div>

              <div className="history-chart-card">
                <svg viewBox="0 0 340 180" width="100%" height="auto" className="history-chart-svg">
                  {/* Grid Lines */}
                  <line x1="36" y1="20" x2="320" y2="20" stroke="#F2F4F7" strokeWidth="1" />
                  <line x1="36" y1="55" x2="320" y2="55" stroke="#F2F4F7" strokeWidth="1" />
                  <line x1="36" y1="90" x2="320" y2="90" stroke="#F2F4F7" strokeWidth="1" />
                  <line x1="36" y1="125" x2="320" y2="125" stroke="#F2F4F7" strokeWidth="1" />

                  {/* Y-Axis Labels */}
                  <text x="12" y="24" fill="#02352F" fontSize="13" fontWeight="500" textAnchor="start">100</text>
                  <text x="12" y="59" fill="#02352F" fontSize="13" fontWeight="500" textAnchor="start">75</text>
                  <text x="12" y="94" fill="#02352F" fontSize="13" fontWeight="500" textAnchor="start">50</text>
                  <text x="12" y="129" fill="#02352F" fontSize="13" fontWeight="500" textAnchor="start">25</text>

                  {/* Area Under Curve Fill */}
                  <path
                    d="M 36 97 L 83.3 71.8 L 130.6 83.0 L 177.9 62.0 L 225.2 67.6 L 272.5 43.8 L 320 34.0 L 320 145 L 36 145 Z"
                    fill="#D2F19E"
                    opacity="0.8"
                  />

                  {/* Curve Stroke */}
                  <path
                    d="M 36 97 L 83.3 71.8 L 130.6 83.0 L 177.9 62.0 L 225.2 67.6 L 272.5 43.8 L 320 34.0"
                    stroke="#02352F"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />

                  {/* X-Axis Labels */}
                  <text x="36" y="165" fill="#000000" fontSize="12" fontWeight="500" textAnchor="middle">Mon</text>
                  <text x="83.3" y="165" fill="#000000" fontSize="12" fontWeight="500" textAnchor="middle">Tue</text>
                  <text x="130.6" y="165" fill="#000000" fontSize="12" fontWeight="500" textAnchor="middle">Wed</text>
                  <text x="177.9" y="165" fill="#000000" fontSize="12" fontWeight="500" textAnchor="middle">Thu</text>
                  <text x="225.2" y="165" fill="#000000" fontSize="12" fontWeight="500" textAnchor="middle">Fri</text>
                  <text x="272.5" y="165" fill="#000000" fontSize="12" fontWeight="500" textAnchor="middle">Sat</text>
                  <text x="320" y="165" fill="#000000" fontSize="12" fontWeight="500" textAnchor="middle">Sun</text>
                </svg>
              </div>
            </div>

            <div className="section-group plans-section">
              <p className="section-title">Improvement Plan</p>
              <div className="plans-card">
                <div className="plan-item">
                  <h4 className="plan-item-title">Morning Walk - 10 day's</h4>
                  <p className="plan-item-subtitle">Helps to improve BP</p>
                </div>
                <hr className="plan-item-divider" />
                <div className="plan-item">
                  <h4 className="plan-item-title">Complete blood work</h4>
                  <p className="plan-item-subtitle">This week</p>
                </div>
                <hr className="plan-item-divider" />
                <div className="plan-item">
                  <h4 className="plan-item-title">Follow-up checkup</h4>
                  <p className="plan-item-subtitle">Tomorrow</p>
                </div>
              </div>
            </div>

            <AIBanner onClick={() => setShowAIPage(true)} />
          </main>
          {!pulsePageHasBack && <NavBar activeTab={activeTab} setActiveTab={handleTabChange} />}
        </>
      )
    }

    if (activeTab === 2) {
      // Reports tab
      return (
        <>
          {showSplash && <SplashScreen fadeOut={fadeOut} />}
          <main className="main-content">
            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#02352F', marginTop: '10px' }}>Reports</h2>
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', marginTop: '16px', color: '#777777', textAlign: 'center' }}>
              No reports available.
            </div>
          </main>
          <NavBar activeTab={activeTab} setActiveTab={handleTabChange} />
        </>
      )
    }

    if (activeTab === 3) {
      // User/Profile tab
      return (
        <>
          {showSplash && <SplashScreen fadeOut={fadeOut} />}
          <main className="main-content">
            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#02352F', marginTop: '10px' }}>Profile</h2>
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', marginTop: '16px', color: '#777777', textAlign: 'center' }}>
              Profile settings coming soon.
            </div>
          </main>
          <NavBar activeTab={activeTab} setActiveTab={handleTabChange} />
        </>
      )
    }
  }

  return (
    <div className="page-shell">
      <div className={`app-frame ${showSplash || showOnboarding || !isLoggedIn ? 'splash-active' : ''}`}>
        {renderAppContent()}
      </div>
    </div>
  )
}


