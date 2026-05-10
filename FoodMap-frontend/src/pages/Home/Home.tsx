import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { Button } from '../../components/common/Button/Button'
import { ROUTES } from '../../constants/routes'
import { APP_NAME, APP_TAGLINE } from '../../constants/app'
import './Home.css'

export default function Home() {
  const { user, logout } = useAuth()
  const nav = useNavigate()

  return (
    <div className="home">
      <div className="home__overlay" />

      <nav className="home__nav">
        <span className="home__logo">✕ {APP_NAME}</span>
        <div className="home__nav-links">
          {user ? (
            <>
              <span className="home__nav-greeting">Hej, {user.name}</span>
              <Button onClick={() => { logout(); }} variant="outline" className="home__btn-outline">
                Wyloguj
              </Button>
            </>
          ) : (
            <>
              <button className="home__nav-link" onClick={() => nav(ROUTES.LOGIN)}>Login</button>
              <Button onClick={() => nav(ROUTES.REGISTER)} className="home__btn-primary">Register</Button>
            </>
          )}
        </div>
      </nav>

      <div className="home__content">
        <h1 className="home__title">{APP_NAME}</h1>
        <p className="home__tagline">{APP_TAGLINE}</p>
        <button className="home__cta" onClick={() => nav(user ? ROUTES.MAP : ROUTES.LOGIN)}>
          Start the hunt
        </button>
        {!user && <p className="home__sub">Sign in to begin your journey</p>}
      </div>

      <footer className="home__footer">
        <span>✕ {APP_NAME}</span>
        <div className="home__footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Instagram</a>
        </div>
        <span>© 2024 FoodMap Global. All rights reserved.</span>
      </footer>
    </div>
  )
}