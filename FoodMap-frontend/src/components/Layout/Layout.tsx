import type { ReactNode } from 'react'
import { useAuth } from '../../context/useAuth'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import './Layout.css'

export default function Layout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth()
  const nav = useNavigate()

  const handleLogout = () => {
    logout()
    nav(ROUTES.HOME)
  }

  return (
    <div className="layout">
      <nav className="layout__nav">
        <span className="layout__logo" onClick={() => nav(ROUTES.HOME)}>
          🗺️ FoodMap
        </span>
        <div className="layout__nav-right">
          {user ? (
            <>
              <span className="layout__user">Hej, {user.name}</span>
              <button className="layout__btn" onClick={handleLogout}>Wyloguj</button>
            </>
          ) : (
            <>
              <button className="layout__btn" onClick={() => nav(ROUTES.LOGIN)}>Zaloguj</button>
              <button className="layout__btn layout__btn--primary" onClick={() => nav(ROUTES.REGISTER)}>Zarejestruj</button>
            </>
          )}
        </div>
      </nav>
      <main className="layout__main">{children}</main>
    </div>
  )
}