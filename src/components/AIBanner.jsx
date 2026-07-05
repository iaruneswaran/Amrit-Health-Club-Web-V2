/* AI sparkle SVG */
function SparkleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="#1B4332" />
      <path d="M19 15L19.8 17.2L22 18L19.8 18.8L19 21L18.2 18.8L16 18L18.2 17.2L19 15Z" fill="#1B4332" opacity="0.7" />
    </svg>
  )
}

export default function AIBanner() {
  return (
    <div className="ai-banner" role="button" id="ai-health-assistant" aria-label="Open AI Health Assistant">
      <div className="ai-banner-left">
        <span className="ai-icon">
          <img src="/ai-icon.svg" alt="AI" style={{ height: '30px', width: 'auto', display: 'block' }} />
        </span>
        <div>
          <p className="ai-text-title">AI Health Assistant</p>
          <p className="ai-text-sub">Describe Symptoms · Get Expert Care</p>
        </div>
      </div>
      <img src="/arrow-right.svg" alt="" aria-hidden="true" className="ai-arrow" style={{ height: '20px', width: 'auto' }} />
    </div>
  )
}
