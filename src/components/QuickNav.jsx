const navItems = [
  { id: 'hospitals-nav', icon: '/hospital-icon.svg', label: 'Hospitals' },
  { id: 'doctors-nav',   icon: '/doctor-icon.svg',   label: 'Doctors'   },
  { id: 'history-nav',   icon: '/history-icon.svg',  label: 'History'   },
]

export default function QuickNav() {
  return (
    <nav className="quick-nav-card" aria-label="Quick navigation">
      {navItems.map((item, idx) => (
        <>
          <div key={item.id} className="nav-item" id={item.id} role="button" tabIndex={0} aria-label={item.label}>
            <div className="nav-icon-wrap">
              <img src={item.icon} alt={item.label} style={{ height: '24px', width: 'auto' }} />
            </div>
            <span className="nav-label">{item.label}</span>
          </div>
          {idx < navItems.length - 1 && (
            <div key={`div-${idx}`} className="nav-divider" aria-hidden="true" />
          )}
        </>
      ))}
    </nav>
  )
}
