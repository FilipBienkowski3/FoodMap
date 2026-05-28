import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { ROUTES } from '../../constants/routes'
import { APP_NAME, APP_TAGLINE } from '../../constants/app'
import { Button } from '../../components/common/Button/Button'
import './Home.css'

export default function Home() {
  const { user, logout } = useAuth()
  const nav = useNavigate()

  return (
    <div className="home">
      <div className="home__overlay" />

      <nav className="home__nav">
        <span className="home__logo"></span>

        <div className="home__nav-links">
          {user ? (
            <>
              <span className="home__nav-greeting">Hello, {user.name}</span>
              <button className="home__avatar" onClick={logout} title="Logout">
                <img
                  src={`https://i.pravatar.cc/40?u=${user.email}`}
                  className="home__avatar-img"
                />
              </button>
            </>
          ) : (
            <>
              <Button variant="nav-link" onClick={() => nav(ROUTES.LOGIN)}>
                LOGIN
              </Button>
              <Button variant="nav-register" onClick={() => nav(ROUTES.REGISTER)}>
                REGISTER
              </Button>
            </>
          )}
        </div>
      </nav>

      <div className="home__content">
        <h1 className="home__title">{APP_NAME}</h1>
        <p className="home__tagline">{APP_TAGLINE}</p>

        {user ? (
          <Button variant="primary" className="home__cta" onClick={() => nav(ROUTES.MAP)}>
            START THE HUNT 🍴
          </Button>
        ) : (
          <>
            <Button variant="ghost" disabled className="home__cta">
              START THE HUNT
            </Button>
            <p className="home__sub">Sign in to begin your journey</p>
          </>
        )}
      </div>

      <footer className="home__footer">
        <span className="home__footer-logo">{APP_NAME}</span>
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