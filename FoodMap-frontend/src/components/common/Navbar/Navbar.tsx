import { useNavigate, useLocation } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import './Navbar.css'

const TABS = [
  { label: 'Map',      icon: 'map',           route: ROUTES.MAP,      fill: true  },
  { label: 'Explore',  icon: 'search',        route: ROUTES.EXPLORE,  fill: false },
  { label: 'Activity', icon: 'notifications', route: ROUTES.ACTIVITY, fill: false },
  { label: 'Profile',  icon: 'person',        route: ROUTES.PROFILE,  fill: false },
]

export default function Navbar() {
  const nav = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="navbar">
      {TABS.map(tab => {
        const active = pathname === tab.route
        return (
          <button
            key={tab.route}
            className={`navbar__tab${active ? ' navbar__tab--active' : ''}${tab.badge ? ' navbar__tab--badge' : ''}`}
            onClick={() => nav(tab.route)}
          >
            <span
              className="material-symbols-outlined"
              style={active && tab.fill ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {tab.icon}
            </span>
            <span>{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
