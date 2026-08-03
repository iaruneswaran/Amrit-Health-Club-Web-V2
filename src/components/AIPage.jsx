import { useState, useRef, useEffect } from 'react'
import voiceIcon from '../assets/Voice Icon.svg'
import aiMenuIcon from '../assets/Ai Menu icon.svg'
import wellioLogo from '../assets/Wellio.svg'
import markedIcon from '../assets/Marked.svg'
import wellioIcon from '../assets/Wellio Icon.svg'

function BackArrowIcon({ color = "#FFFFFF" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  )
}


function LiveWaveIcon() {
  return (
    <div className="voice-wave-bars">
      <span className="wave-bar"></span>
      <span className="wave-bar"></span>
      <span className="wave-bar"></span>
      <span className="wave-bar"></span>
      <span className="wave-bar"></span>
    </div>
  )
}

export default function AIPage({ onBack }) {
  const [isListening, setIsListening] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  
  // Custom states for the conversational booking flow
  const [messages, setMessages] = useState([
    { id: '1', sender: 'ai', text: "Hi Jordan, how can I help you today? Please describe the health concerns or symptoms you are experiencing." }
  ])
  const [typingState, setTypingState] = useState(null)
  const [isFlowActive, setIsFlowActive] = useState(false)
  
  const chatAreaRef = useRef(null)
  const timeoutsRef = useRef([])

  // Automatically scroll chat container to bottom on messages/typing update
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight
    }
  }, [messages, typingState])

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout)
    }
  }, [])

  const startBookingFlow = () => {
    if (isFlowActive) return

    setIsFlowActive(true)
    setIsListening(true)
    setTypingState('user')

    // Helper to queue timeouts
    const queueTimeout = (fn, delay) => {
      const t = setTimeout(fn, delay)
      timeoutsRef.current.push(t)
    }

    // Step 1: User describes symptoms
    queueTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: '2', sender: 'user', text: "I've been experiencing some chest pain and pressure lately, along with a high fever and a persistent cough." }
      ])
      setIsListening(false)
      setTypingState('ai')
    }, 2000)

    // Step 2: AI recommends Cardiology based on symptoms and asks for distance
    queueTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: '3',
          sender: 'ai',
          text: "Based on your symptoms, I recommend seeing a Cardiologist. What is your preferred maximum distance?",
          options: ["Within 2 KM", "Within 5 KM", "Within 10 KM"],
          selectedOption: "Within 2 KM"
        }
      ])
      setTypingState(null)
      setIsListening(true)
    }, 4000)

    // Step 3: User says within 2 KM
    queueTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: '4', sender: 'user', text: "Within 2 KM" }
      ])
      setIsListening(false)
      setTypingState('ai')
    }, 6000)

    // Step 4: AI finds doctor, asks for date
    queueTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: '5',
          sender: 'ai',
          text: "Found Dr. Amelia Carter at St. Mary's Medical (1.2 KM away). Which date works best?",
          options: ["Sunday, 12 July 2026", "Tomorrow"],
          selectedOption: "Sunday, 12 July 2026"
        }
      ])
      setTypingState(null)
      setIsListening(true)
    }, 8000)

    // Step 5: User says Sunday, 12 July 2026
    queueTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: '6', sender: 'user', text: "Sunday, 12 July 2026" }
      ])
      setIsListening(false)
      setTypingState('ai')
    }, 10000)

    // Step 6: AI asks for time slot
    queueTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: '7',
          sender: 'ai',
          text: "Which time slot works best for you?",
          options: ["08:30 AM", "09:00 AM", "09:30 AM"],
          selectedOption: "08:30 AM"
        }
      ])
      setTypingState(null)
      setIsListening(true)
    }, 12000)

    // Step 7: User says 08:30 AM
    queueTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: '8', sender: 'user', text: "08:30 AM" }
      ])
      setIsListening(false)
      setTypingState('ai')
    }, 14000)

    // Step 8: AI summarizes and asks for confirmation
    queueTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: '9',
          sender: 'ai',
          text: "Dr. Amelia Carter at St. Mary's Medical on Sunday, 12 July 2026 at 08:30 AM (At Hospital Counter). Confirm this booking?",
          options: ["Confirm Booking", "Cancel"],
          selectedOption: "Confirm Booking"
        }
      ])
      setTypingState(null)
      setIsListening(true)
    }, 16000)

    // Step 9: User confirms
    queueTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: '10', sender: 'user', text: "Confirm Booking" }
      ])
      setIsListening(false)
      setTypingState('ai')
    }, 18000)

    // Step 10: AI processes booking
    queueTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: '11', sender: 'ai', text: "Processing booking... ⏳" }
      ])
      setTypingState('ai')
    }, 20000)

    // Step 11: Confirmation card
    queueTimeout(() => {
      setMessages(prev => [
        ...prev.filter(msg => msg.id !== '11'),
        {
          id: '12',
          sender: 'ai',
          text: "Your appointment has been successfully confirmed.",
          card: true,
          cardDetails: {
            doctor: "Dr. Amelia Carter",
            hospital: "St. Mary's Medical",
            date: "Sunday, 12 July 2026",
            time: "08:30 AM",
            payment: "At Hospital Counter",
            note: "Please arrive 15 minutes early and pay at the hospital counter."
          }
        }
      ])
      setTypingState(null)
      setIsFlowActive(false)
    }, 22000)
  }

  return (
    <div className="ai-page-container">
      {/* Sidebar Menu Backdrop Overlay */}
      {showMenu && (
        <div className="ai-menu-backdrop" onClick={() => setShowMenu(false)}></div>
      )}

      {/* Slide-out Sidebar Drawer */}
      <aside className={`ai-menu-drawer ${showMenu ? 'open' : ''}`}>
        <div className="drawer-header">
          <p className="drawer-title">Conversations</p>
          <button className="drawer-close-btn" onClick={() => setShowMenu(false)} aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#CCA266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="drawer-content">
          <button className="new-chat-btn" onClick={() => { setIsListening(false); setMessages([{ id: '1', sender: 'ai', text: "Hi Jordan, how can I help you today? Please describe the health concerns or symptoms you are experiencing." }]); setShowMenu(false); }} id="new-chat-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New Chat
          </button>

          <div className="prev-convos-section">
            <div className="convo-list">
              <div className="convo-item active">
                <p className="convo-name">High Fever Assessment</p>
              </div>
              <div className="convo-item">
                <p className="convo-name">General Health Inquiry</p>
              </div>
              <div className="convo-item">
                <p className="convo-name">Body Ache &amp; Fatigue</p>
              </div>
              <div className="convo-item">
                <p className="convo-name">Pulse Score Guidance</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Top Header Bar */}
      <header className="ai-page-header">
        <div className="ai-header-left">
          <button className="ai-back-btn" onClick={onBack} aria-label="Go back to dashboard">
            <BackArrowIcon />
          </button>

          <div className="ai-badge-pill">
            <img src={wellioIcon} alt="Wellio Icon" className="ai-badge-icon" style={{ width: '24px', height: '24px' }} />
            <img src={wellioLogo} alt="Wellio Logo" className="ai-logo-text" />
          </div>
        </div>

        <button className="ai-menu-btn" onClick={() => setShowMenu(true)} aria-label="AI Options Menu">
          <img src={aiMenuIcon} alt="" aria-hidden="true" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="ai-page-content">
        <div className="ai-chat-area" ref={chatAreaRef}>
          {messages.map(m => (
            <div key={m.id} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <div className={`chat-bubble ${m.sender}-bubble`}>
                {m.text}
                
                {/* Options Chips */}
                {m.options && (
                  <div className="ai-chat-options">
                    {m.options.map(opt => (
                      <button 
                        type="button" 
                        key={opt} 
                        className={`ai-chat-chip ${m.selectedOption === opt ? 'selected' : ''}`}
                        onClick={() => {
                          setMessages(prev => prev.map(msg => msg.id === m.id ? { ...msg, selectedOption: opt } : msg));
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Booking Confirmation Card */}
                {m.card && m.cardDetails && (
                  <div className="ai-booking-card" style={{ gap: '10px' }}>
                    <div className="booking-confirmed-check-wrap" style={{ display: 'flex', justifyContent: 'center', margin: '6px 0 12px' }}>
                      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                        <circle cx="36" cy="36" r="36" fill="#FFFFFF" />
                        <polyline points="18,36 30,49 54,23" stroke="#CCA266" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '500',color: '#000000' }}>Appointment Booked!</h4>
                      <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#555555', fontWeight: '500' }}>Your appointment has been successfully confirmed.</p>
                    </div>
                    
                    <div className="ai-booking-card-row">
                      <span className="ai-booking-card-label">Doctor</span>
                      <span className="ai-booking-card-value">{m.cardDetails.doctor}</span>
                    </div>
                    <div className="ai-booking-card-row">
                      <span className="ai-booking-card-label">Hospital</span>
                      <span className="ai-booking-card-value">{m.cardDetails.hospital}</span>
                    </div>
                    <div className="ai-booking-card-row">
                      <span className="ai-booking-card-label">Date</span>
                      <span className="ai-booking-card-value">{m.cardDetails.date}</span>
                    </div>
                    <div className="ai-booking-card-row">
                      <span className="ai-booking-card-label">Time</span>
                      <span className="ai-booking-card-value">{m.cardDetails.time}</span>
                    </div>
                    <div className="ai-booking-card-row">
                      <span className="ai-booking-card-label">Payment</span>
                      <span className="ai-booking-card-value">{m.cardDetails.payment}</span>
                    </div>

                    <div style={{ borderTop: '1px solid #F2F4F7', paddingTop: '8px', marginTop: '4px', textAlign: 'center' }}>
                      <p style={{ margin: 0, fontSize: '12px', color: '#555555', lineHeight: '1.4', fontWeight: '500' }}>
                        {m.cardDetails.note}
                      </p>
                    </div>

                    <button className="ai-booking-done-btn" onClick={onBack}>
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {typingState === 'ai' && (
            <div className="typing-bubble">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          )}
        </div>

        <div className="ai-voice-container">
          <button 
            className={`ai-voice-btn ${isListening ? 'listening' : ''}`} 
            onClick={startBookingFlow}
            aria-label={isListening ? "Stop listening" : "Start listening"}
          >
            {isListening ? (
              <LiveWaveIcon />
            ) : (
              <img src={voiceIcon} alt="" aria-hidden="true" />
            )}
          </button>
          <p className="ai-voice-label">{isListening ? 'Listening...' : 'Ask Anything'}</p>
        </div>
      </main>
    </div>
  )
}

