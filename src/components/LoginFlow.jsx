import { useState, useEffect, useRef } from 'react'

export default function LoginFlow({ onLoginComplete }) {
  const [step, setStep] = useState(1) // 1: Mobile Input, 2: OTP Input
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState(['', '', '', ''])
  const [timerSeconds, setTimerSeconds] = useState(30)
  const otpInputsRef = useRef([])

  // OTP Countdown timer
  useEffect(() => {
    let interval = null
    if (step === 2 && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [step, timerSeconds])

  const handlePhoneChange = (e) => {
    // Only allow numbers and limit to 10 digits
    const val = e.target.value.replace(/[^0-9]/g, '')
    setPhoneNumber(val.slice(0, 10))
  }

  const handleSendCode = (e) => {
    e.preventDefault()
    if (phoneNumber.length === 10) {
      setTimerSeconds(30)
      setStep(2)
    }
  }

  const handleOtpChange = (e, index) => {
    const val = e.target.value.replace(/[^0-9]/g, '')
    const newOtp = [...otp]
    newOtp[index] = val.slice(-1) // Keep only the last character entered
    setOtp(newOtp)

    // Auto-advance cursor to next input box
    if (val && index < 3) {
      otpInputsRef.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (e, index) => {
    // Auto-retreat cursor on backspace if current field is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 4)
    if (pastedData) {
      const newOtp = [...otp]
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i]
      }
      setOtp(newOtp)
      // Focus the last filled box or verify
      const targetIndex = Math.min(pastedData.length, 3)
      otpInputsRef.current[targetIndex]?.focus()
    }
  }

  const handleVerify = (e) => {
    e.preventDefault()
    const otpString = otp.join('')
    if (otpString.length === 4) {
      onLoginComplete()
    }
  }

  const handleResend = () => {
    setOtp(['', '', '', ''])
    setTimerSeconds(30)
    otpInputsRef.current[0]?.focus()
  }

  const isPhoneValid = phoneNumber.length === 10
  const isOtpValid = otp.join('').length === 4

  // Formatted phone number display: e.g. 98765 43210
  const formatPhoneNumber = (num) => {
    if (num.length > 5) {
      return `${num.slice(0, 5)} ${num.slice(5)}`
    }
    return num
  }

  if (step === 1) {
    return (
      <div className="login-container">
        {/* Header containing brand-green logo */}
        <header className="login-header">
          <img
            src="/logo.svg"
            className="login-logo-img"
            alt="Amrit Health Club Logo"
          />
        </header>

        {/* Login Details Form */}
        <form onSubmit={handleSendCode} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div className="login-card">
            <label className="login-card-label" htmlFor="phone-input">
              Mobile number
            </label>
            <div className="login-input-row">
              <div className="login-country-pill">
                <span>+91</span>
              </div>
              <input
                id="phone-input"
                type="tel"
                className="login-phone-input"
                placeholder="98765 43210"
                value={formatPhoneNumber(phoneNumber)}
                onChange={handlePhoneChange}
                autoFocus
              />
            </div>
          </div>

          <p className="login-consent">
            By continuing, you agree to our Terms and acknowledge the Privacy Policy.
          </p>

          <button
            type="submit"
            className="login-btn"
            disabled={!isPhoneValid}
            style={{ marginTop: 'auto' }}
          >
            Send code
          </button>
        </form>
      </div>
    )
  }

  // Step 2: OTP screen
  return (
    <div className="login-container">
      {/* Header containing back button */}
      <button
        onClick={() => setStep(1)}
        className="login-back-btn"
        aria-label="Go back to phone input"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Verification Details */}
      <h1 className="otp-title">Enter verification code</h1>
      <p className="otp-subtitle">Sent to +91 {formatPhoneNumber(phoneNumber)}</p>

      {/* Code boxes */}
      <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="otp-inputs-row">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (otpInputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              className="otp-input-box"
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => handleOtpKeyDown(e, index)}
              onPaste={handleOtpPaste}
              autoFocus={index === 0}
            />
          ))}
        </div>

        {/* Timer */}
        <div className="otp-timer">
          {timerSeconds > 0 ? (
            <span>Resend in 00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}</span>
          ) : (
            <span>
              Didn't receive code?{' '}
              <span className="otp-resend-link" onClick={handleResend}>
                Resend code
              </span>
            </span>
          )}
        </div>

        <button
          type="submit"
          className="login-btn"
          disabled={!isOtpValid}
          style={{ marginTop: 'auto' }}
        >
          Verify
        </button>

        <span className="otp-help">Need help?</span>
      </form>
    </div>
  )
}
