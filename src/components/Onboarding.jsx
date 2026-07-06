import { useState } from 'react'
import onboarding1 from '../assets/Onboarding 1.png'
import onboarding2 from '../assets/Onboarding 2.png'
import onboarding3 from '../assets/Onboarding 3.png'
import continueArrow from '../assets/Continue Arrow.svg'


const ONBOARDING_DATA = [
  {
    id: 1,
    title: 'Smart Biological Insights',
    image: onboarding1,
    buttonText: 'Continue',
  },
  {
    id: 2,
    title: 'Your Premium Health Companion',
    image: onboarding2,
    buttonText: 'Continue',
  },
  {
    id: 3,
    title: 'Consultations In Seconds',
    image: onboarding3,
    buttonText: 'Get Started',
  },
]

export default function Onboarding({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < ONBOARDING_DATA.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  const step = ONBOARDING_DATA[currentStep]

  return (
    <div className="onboarding-container">
      {/* Background Image with Key to trigger animation on step change */}
      <img
        key={`bg-${currentStep}`}
        src={step.image}
        alt={step.title}
        className="onboarding-bg-img onboarding-fade-in"
      />
      
      {/* Gradients */}
      <div className="onboarding-overlay-top" />
      <div className="onboarding-overlay-bottom" />

      {/* Header */}
      <header className="onboarding-header">
        <img
          src="/logo.svg"
          alt="Amrit Health Club"
          className="onboarding-logo-img"
        />
        {currentStep < ONBOARDING_DATA.length - 1 && (
          <button className="onboarding-skip-btn" onClick={handleSkip}>
            Skip
          </button>
        )}
      </header>

      {/* Bottom Content Card */}
      <div className="onboarding-content">
        {/* Title text with key to trigger animation on step change */}
        <h1 className="onboarding-title" key={`title-${currentStep}`}>
          {step.title}
        </h1>
        
        {/* Indicator dots */}
        <div className="onboarding-dots">
          {ONBOARDING_DATA.map((_, index) => (
            <div
              key={index}
              className={`onboarding-dot ${index === currentStep ? 'active' : 'inactive'}`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button className="onboarding-btn" onClick={handleNext}>
          <span className="onboarding-btn-text">{step.buttonText}</span>
          <span className="onboarding-btn-arrow">
            <img src={continueArrow} alt="Arrow" />
          </span>
        </button>
      </div>
    </div>
  )
}
