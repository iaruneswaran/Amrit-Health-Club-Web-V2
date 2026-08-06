import doctorImage from '../assets/Doctor Image.svg';
import appointmentBg from '../assets/Consultation.jpg';

function PersonIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="7" r="4" stroke="#CCA266" strokeWidth="1.8"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#CCA266" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

function CalendarSmIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function LocationSmIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

function ReasonSmIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polyline points="3,12 7,12 9,5 11,19 13,9 15,15 17,12 21,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function AppointmentCard({ 
  showImage = true, 
  isPast = false, 
  onActionClick, 
  onSecondaryClick,
  preOpCompleted = false,
  preOpData = null,
  onPreOpClick
}) {
  const handlePrimaryClick = (e) => {
    e.stopPropagation();
    if (!isPast && onPreOpClick) {
      onPreOpClick();
    } else if (onActionClick) {
      onActionClick();
    }
  };

  const primaryBtnLabel = isPast 
    ? "Follow up" 
    : (preOpCompleted ? "Pre OP Completed" : "Complete Pre OP");

  return (
    <div className="appointment-card" id="appointment-card">
      {/* Doctor row with background image */}
      <div 
        className={`appt-header-bg ${showImage ? '' : 'no-image'}`}
        style={showImage ? { backgroundImage: `url(${appointmentBg})` } : {}}
      >
        <span 
          style={{
            position: 'absolute',
            top: '16px',
            right: 0,
            background: '#80D351',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: '600',
            padding: '6px 16px',
            borderRadius: '100px 0 0 100px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
          }}
          aria-label={isPast ? "Appointment status: Completed" : "Appointment status: Confirmed"}
        >
          {isPast ? "Completed" : "Confirmed"}
        </span>
      </div>

      {/* Details */}
      <div className="appt-details">
        <div className="appt-profile-row">
          <div className="appt-avatar-placeholder">AC</div>
          <div className="appt-header-doctor-info">
            <h4 className="appt-header-doctor-name">Dr. Amelia Carter</h4>
            <p className="appt-header-doctor-specialty">Cardiology Specialist</p>
          </div>
        </div>
        {/* Date & Location row */}
        <div className="appt-row-two">
          <div className="detail-block">
            <div className="detail-label-row">
              <img src="/booking-green.svg" alt="" aria-hidden="true" style={{ height: '16px', width: 'auto' }} />
              Date and Time
            </div>
            <p className="detail-value">Today, 9:30 PM</p>
          </div>
          
          <div className="detail-block location-block">
            <div className="detail-label-row">
              <img src="/location-green.svg" alt="" aria-hidden="true" style={{ height: '16px', width: 'auto' }} />
              Location
            </div>
            <p className="detail-value">1.5 Km</p>
          </div>
        </div>

        {/* Reason for Visit Block */}
        {!isPast && !preOpCompleted ? (
          <div className="reason-block reason-pending">
            <div className="detail-label-row">
              <img src="/reason-green.svg" alt="" aria-hidden="true" style={{ height: '16px', width: 'auto' }} />
              Reason for Visit
            </div>
            <p className="reason-text pending-text">
              Complete your Pre OP
            </p>
          </div>
        ) : (
          <div className="reason-block reason-completed">
            <div className="detail-label-row" style={{ color: '#555555' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#555555' }}>
                <img src="/reason-green.svg" alt="" aria-hidden="true" style={{ height: '16px', width: 'auto' }} />
                Reason for Visit
              </div>
            </div>
            <p className="reason-text">
              {preOpData?.reason || "High fever (101.5°F) with severe body aches & chills since yesterday"}
            </p>
          </div>
        )}
      </div>

      <div className="appt-actions">
        <button 
          id={isPast ? "followup-btn" : "pre-op-btn"} 
          className="btn-primary"
          type="button"
          onClick={handlePrimaryClick}
        >
          {primaryBtnLabel}
        </button>
        <button 
          id={isPast ? "prescription-btn" : "reschedule-appt-btn"} 
          className="btn-secondary" 
          type="button" 
          onClick={(e) => {
            e.stopPropagation();
            if (onSecondaryClick) onSecondaryClick();
          }}
        >
          {isPast ? "Prescription" : "Reschedule"}
        </button>
      </div>
    </div>
  )
}
