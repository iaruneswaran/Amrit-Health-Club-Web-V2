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
import SplashScreen from './components/SplashScreen'
import Onboarding from './components/Onboarding'
import LoginFlow from './components/LoginFlow'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return localStorage.getItem('onboarding_completed') !== 'true'
  })
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('user_logged_in') === 'true'
  })

  console.log("App state - showSplash:", showSplash, "fadeOut:", fadeOut, "showOnboarding:", showOnboarding, "isLoggedIn:", isLoggedIn)

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

    return (
      <>
        {showSplash && <SplashScreen fadeOut={fadeOut} />}
        <HeroHeader />
        <main className="main-content">
          <AIBanner />
          <QuickNav />
          <ClinicCard />
          <div className="section-group">
            <p className="section-title">Booked Appointments</p>
            <AppointmentCard />
          </div>
          <div className="section-group">
            <p className="section-title">Your Pulse Score</p>
            <PulseScore />
          </div>
          <div className="section-group">
            <p className="section-title">Medication</p>
            <MedicationCard />
          </div>
          <div className="section-group">
            <p className="section-title">Admission Overview</p>
            <AdmissionCard />
          </div>
        </main>
      </>
    )
  }

  return (
    <div className="page-shell">
      <div className={`app-frame ${showSplash || showOnboarding || !isLoggedIn ? 'splash-active' : ''}`}>
        {renderAppContent()}
      </div>
    </div>
  )
}


