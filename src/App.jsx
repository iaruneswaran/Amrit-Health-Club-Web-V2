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
import HospitalsPage from './components/HospitalsPage'
import DoctorsPage from './components/DoctorsPage'
import HistoryPage from './components/HistoryPage'
import ReportsPage from './components/ReportsPage'
import IPPatientPage from './components/IPPatientPage'
import continueArrow from './assets/Continue Arrow.svg'
import labIcon from './assets/Lab.svg'
import consultationIcon from './assets/Consultation.svg'
import vitalsIcon from './assets/Vitals.svg'
import statusArrow from './assets/Status Arrow.svg'
import pulseImage from './assets/Pulse Page Header Image.jpg'
import pulsePageLogo from './assets/Pulse Page Logo.png'

const timeframeData = {
  D: {
    average: 78,
    dateRange: "Today, 9 Jul 2026",
    points: [
      { label: "12 AM", score: 70 },
      { label: "4 AM", score: 72 },
      { label: "8 AM", score: 80 },
      { label: "12 PM", score: 85 },
      { label: "4 PM", score: 82 },
      { label: "8 PM", score: 78 },
      { label: "11 PM", score: 75 }
    ]
  },
  W: {
    average: 65,
    dateRange: "1 – 7 Jul 2026",
    points: [
      { label: "Fri", score: 56 },
      { label: "Sat", score: 26 },
      { label: "Sun", score: 90 },
      { label: "Mon", score: 90 },
      { label: "Tue", score: 64 },
      { label: "Wed", score: 95 },
      { label: "Thu", score: 35 }
    ]
  },
  M: {
    average: 75,
    dateRange: "10 Jun – 9 Jul 2026",
    points: [
      { label: "1 - 5", score: 70 },
      { label: "6 - 10", score: 76 },
      { label: "11 - 15", score: 82 },
      { label: "16 - 20", score: 68 },
      { label: "21 - 25", score: 74 },
      { label: "26 - 30", score: 80 }
    ]
  },
  '6M': {
    average: 77,
    dateRange: "Feb – Jul 2026",
    points: [
      { label: "Feb", score: 78 },
      { label: "Mar", score: 80 },
      { label: "Apr", score: 75 },
      { label: "May", score: 82 },
      { label: "Jun", score: 70 },
      { label: "Jul", score: 76 }
    ]
  },
  Y: {
    average: 72,
    dateRange: "2025 – 2026",
    points: [
      { label: "Q3 '25", score: 68 },
      { label: "Q4 '25", score: 70 },
      { label: "Q1 '26", score: 75 },
      { label: "Q2 '26", score: 72 },
      { label: "Jul '26", score: 76 },
      { label: "Aug '26", score: 74 },
      { label: "Sep '26", score: 72 }
    ]
  }
}

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
  const [showHospitalsPage, setShowHospitalsPage] = useState(false)
  const [showDoctorsPage, setShowDoctorsPage] = useState(false)
  const [showHistoryPage, setShowHistoryPage] = useState(false)
  const [showIPPage, setShowIPPage] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [pulsePageHasBack, setPulsePageHasBack] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState('W')

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

    if (showHospitalsPage) {
      return (
        <>
          {showSplash && <SplashScreen fadeOut={fadeOut} />}
          <HospitalsPage onBack={() => setShowHospitalsPage(false)} />
        </>
      )
    }

    if (showDoctorsPage) {
      return (
        <>
          {showSplash && <SplashScreen fadeOut={fadeOut} />}
          <DoctorsPage onBack={() => setShowDoctorsPage(false)} />
        </>
      )
    }

    if (showHistoryPage) {
      return (
        <>
          {showSplash && <SplashScreen fadeOut={fadeOut} />}
          <HistoryPage onBack={() => setShowHistoryPage(false)} />
        </>
      )
    }

    if (showIPPage) {
      return (
        <>
          {showSplash && <SplashScreen fadeOut={fadeOut} />}
          <IPPatientPage onBack={() => setShowIPPage(false)} />
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
            <QuickNav 
              onHospitalsClick={() => setShowHospitalsPage(true)} 
              onDoctorsClick={() => setShowDoctorsPage(true)} 
              onHistoryClick={() => setShowHistoryPage(true)}
            />
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
              <AdmissionCard onCardClick={() => setShowIPPage(true)} />
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
                <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', filter: 'brightness(0) invert(1)', width: '16px', height: '14px' }} />
              </button>
            )}
            <div className="pulse-page-header-overlay">
              <img src={pulsePageLogo} alt="Your Pulse Score Logo" className="pulse-page-header-logo" />
            </div>
          </header>
          <main className={`main-content ${pulsePageHasBack ? 'no-navbar' : ''}`} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
                  <span className="drive-status-text no-issues">No Issues</span>
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
                  <span className="drive-status-text pending">Pending</span>
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
                  <span className="drive-status-text stable">Stable</span>
                  <p className="drive-card-footer">Updated 5m ago</p>
                </div>
              </div>
            </div>

            <div className="section-group history-section">
              <p className="section-title">Score History</p>

              <div className="history-chart-card">
                <div className="new-timeframe-selector">
                  {['W', 'M', '6M'].map((tf) => (
                    <button
                      key={tf}
                      className={`new-timeframe-btn ${selectedTimeframe === tf ? 'active' : ''}`}
                      onClick={() => setSelectedTimeframe(tf)}
                    >
                      {tf}
                    </button>
                  ))}
                </div>

                <div className="chart-stats-header">
                  <span className="chart-stats-label">Average</span>
                  <div className="chart-stats-value-row">
                    <span className="chart-stats-value">{timeframeData[selectedTimeframe].average}</span>
                    <span className="chart-stats-unit">Score</span>
                  </div>
                  <span className="chart-stats-date">{timeframeData[selectedTimeframe].dateRange}</span>
                </div>

                <div className="chart-container">
                  <svg viewBox="0 0 340 230" width="100%" height="auto" className="history-chart-svg">
                    {/* Horizontal Grid Lines */}
                    <line x1="8" y1="20" x2="305" y2="20" stroke="#F2F4F7" strokeWidth="1" />
                    <line x1="8" y1="65" x2="305" y2="65" stroke="#F2F4F7" strokeWidth="1" />
                    <line x1="8" y1="110" x2="305" y2="110" stroke="#F2F4F7" strokeWidth="1" />
                    <line x1="8" y1="155" x2="305" y2="155" stroke="#F2F4F7" strokeWidth="1" />
                    <line x1="8" y1="200" x2="305" y2="200" stroke="#F2F4F7" strokeWidth="1" />

                    {/* Y-Axis Labels on the Right */}
                    <text x="312" y="24" fill="#98A2B3" fontSize="12" fontWeight="500" textAnchor="start">100</text>
                    <text x="312" y="69" fill="#98A2B3" fontSize="12" fontWeight="500" textAnchor="start">80</text>
                    <text x="312" y="114" fill="#98A2B3" fontSize="12" fontWeight="500" textAnchor="start">60</text>
                    <text x="312" y="159" fill="#98A2B3" fontSize="12" fontWeight="500" textAnchor="start">40</text>
                    <text x="312" y="204" fill="#98A2B3" fontSize="12" fontWeight="500" textAnchor="start">20</text>

                    {/* Vertical Dashed Grid Lines and Bars */}
                    {timeframeData[selectedTimeframe].points.map((pt, index) => {
                      const numPoints = timeframeData[selectedTimeframe].points.length;
                      const spacing = 270 / (numPoints - 1);
                      const xCenter = 20 + index * spacing;
                      const xStart = xCenter - 12;
                      const score = pt.score;
                      const clampedScore = Math.max(20, score);
                      const height = Math.max(4, ((clampedScore - 20) / 80) * 180);
                      const yTop = 200 - height;
                      const r = 4; // rounded corner radius

                      // SVG path for bar with rounded top corners
                      const barPath = `M ${xStart} 200 L ${xStart} ${yTop + r} Q ${xStart} ${yTop} ${xStart + r} ${yTop} L ${xStart + 24 - r} ${yTop} Q ${xStart + 24} ${yTop} ${xStart + 24} ${yTop + r} L ${xStart + 24} 200 Z`;

                      return (
                        <g key={index}>
                          {/* Vertical dashed line */}
                          <line
                            x1={xCenter}
                            y1="20"
                            x2={xCenter}
                            y2="200"
                            stroke="#F2F4F7"
                            strokeWidth="1"
                            strokeDasharray="3,3"
                          />
                          {/* Score bar */}
                          <path
                            d={barPath}
                            fill="#D2F19E"
                          />
                          {/* X-Axis Label */}
                          <text
                            x={xCenter}
                            y="222"
                            fill="#98A2B3"
                            fontSize="12"
                            fontWeight="500"
                            textAnchor="middle"
                          >
                            {pt.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
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
            <ReportsPage />
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


