const actions = [
  { id: 'booking-btn',  icon: '/booking.svg',  label: 'Booking'  },
  { id: 'enquiry-btn',  icon: '/enquiry.svg',  label: 'Enquiry'  },
  { id: 'location-btn', icon: '/location.svg', label: 'Location' },
]

export default function ClinicCard() {
  return (
    <div className="clinic-card">
      {/* Top info row */}
      <div className="clinic-info">
        {/* Logo placeholder */}
        <div className="clinic-logo" aria-hidden="true" />

        <div className="clinic-details">
          <div className="clinic-name-row">
            <h2 className="clinic-name">St. Mary's Medical</h2>
          </div>
          <span className="badge-preferred">Prefered</span>

          {/* Open 24/7 row with clock icon */}
          <div className="clinic-open-row">
            <img src="/clock-icon.svg" alt="" aria-hidden="true" className="clinic-clock-icon" />
            <span className="clinic-open-text">Open 24/7</span>
          </div>

          <p className="clinic-doctors"><span>48</span> Doctors Available</p>
        </div>
      </div>

      {/* Action bar */}
      <div className="clinic-actions" role="toolbar" aria-label="Clinic actions">
        {actions.map((action, idx) => (
          <>
            <button key={action.id} id={action.id} className="clinic-action-btn" type="button">
              <img src={action.icon} alt="" aria-hidden="true" className="clinic-action-icon" />
              {action.label}
            </button>
            {idx < actions.length - 1 && (
              <div key={`adiv-${idx}`} className="action-divider" aria-hidden="true" />
            )}
          </>
        ))}
      </div>
    </div>
  )
}
