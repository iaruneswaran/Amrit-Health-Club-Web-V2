import homeIcon from '../assets/Home.svg'
import pulseIcon from '../assets/Pulse.svg'
import reportsIcon from '../assets/Reports.svg'
import historyIcon from '../assets/History Icon.svg'

export default function NavBar({ activeTab, setActiveTab }) {
  const tabs = [
    { label: 'Home', icon: homeIcon },
    { label: 'Pulse', icon: pulseIcon },
    { label: 'Reports', icon: reportsIcon },
    { label: 'History', icon: historyIcon }
  ]

  return (
    <div className="nav-bar-container">
      <nav className="nav-bar-menu" style={{ '--active-index': activeTab }}>
        <div className="nav-active-bubble"></div>
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            className={`nav-tab-item ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
            aria-label={tab.label}
            id={`nav-tab-${tab.label.toLowerCase()}`}
          >
            <img src={tab.icon} alt={tab.label} className="nav-icon" />
          </button>
        ))}
      </nav>
    </div>
  )
}
