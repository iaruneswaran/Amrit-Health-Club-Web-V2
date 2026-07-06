export default function PulseScore() {
  return (
    <div className="pulse-card" id="pulse-card">
      {/* Header Row */}
      <div className="pulse-header">
        <h3 className="pulse-card-title">This week's Pulse Score</h3>
        <span className="pulse-premium-badge">Premium</span>
      </div>

      {/* Body Area */}
      <div className="pulse-body">
        {/* Left Column: Gauge Area */}
        <div className="pulse-gauge-column">
          <div className="pulse-gauge-container">
            <svg viewBox="0 0 400 210" className="pulse-gauge-svg" aria-hidden="true">
              {/* Left segment (with parallel cuts and 8px corner radius via stroke + stroke-linejoin) */}
              <path 
                d="M 28 190 A 172 172 0 0 1 103.82 47.41 L 122.88 80.42 A 134 134 0 0 0 66 190 Z" 
                fill="#98EC6D" 
                stroke="#98EC6D" 
                strokeWidth="16" 
                strokeLinejoin="round" 
              />
              {/* Middle segment */}
              <path 
                d="M 124.60 35.41 A 172 172 0 0 1 275.40 35.41 L 256.34 68.42 A 134 134 0 0 0 143.66 68.42 Z" 
                fill="#C6F194" 
                stroke="#C6F194" 
                strokeWidth="16" 
                strokeLinejoin="round" 
              />
              {/* Right segment */}
              <path 
                d="M 296.18 47.41 A 172 172 0 0 1 372 190 L 334 190 A 134 134 0 0 0 277.12 80.42 Z" 
                fill="#E2F8D3" 
                stroke="#E2F8D3" 
                strokeWidth="16" 
                strokeLinejoin="round" 
              />
              {/* Grade Letter */}
              <text x="195" y="196" fill="#FFFFFF" fontSize="120" fontWeight="800" textAnchor="middle">
                A
              </text>
            </svg>
          </div>
          {/* Grade Capsule */}
          <div className="pulse-grade-capsule">
            Grade 20 - 100
          </div>
        </div>

        {/* Right Column: Score Stats Area */}
        <div className="pulse-stats-column">
          <div className="pulse-score-row">
            <span className="pulse-score-value">82</span>
            <span className="pulse-score-total">/100</span>
            <span className="pulse-trend" aria-label="Trend: Up by 6 points vs last week">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="pulse-trend-icon">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
              +6 vs last week
            </span>
          </div>

          <p className="pulse-status-text">Grade A · Excellent Health</p>
        </div>
      </div>

      {/* Divider */}
      <hr className="pulse-divider" />

      {/* Footer Area */}
      <div className="pulse-footer">
        <span className="pulse-updated-text">Updated 12 mins ago</span>
        <button className="pulse-view-plans-btn" type="button" id="view-plans-btn">
          View Plans
        </button>
      </div>
    </div>
  )
}
