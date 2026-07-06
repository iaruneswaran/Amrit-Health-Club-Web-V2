export default function SplashScreen({ fadeOut }) {
  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <img
        src="/logo.svg"
        className="splash-logo"
        alt="Amrit Health Club Logo"
      />
    </div>
  )
}
