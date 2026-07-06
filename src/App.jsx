import './App.css'
import HeroHeader from './components/HeroHeader'
import AIBanner from './components/AIBanner'
import QuickNav from './components/QuickNav'
import ClinicCard from './components/ClinicCard'
import AppointmentCard from './components/AppointmentCard'
import PulseScore from './components/PulseScore'

export default function App() {
  return (
    <div className="page-shell">
      <div className="app-frame">
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
        </main>
      </div>
    </div>
  )
}
