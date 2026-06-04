import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/common/Navbar/Navbar'
import { MOCK_USERS } from '../../data/users'
import { userRoute } from '../../constants/routes'
import { trackEvent } from '../../config/analytics'
import './Explore.css'

export default function Explore() {
  const [query, setQuery] = useState('')
  const nav = useNavigate()

  const filtered = MOCK_USERS.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.role.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="explore">
      <header className="explore__header">
        <button className="explore__back" onClick={() => nav(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="explore__title">FoodMap</span>
      </header>

      <div className="explore__content">
        <div className="explore__search-wrap">
          <span className="material-symbols-outlined explore__search-icon">search</span>
          <input
            className="explore__search"
            placeholder="Search for friends..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <div className="explore__section-header">
          <h2 className="explore__section-title">Suggested Friends</h2>
          <button className="explore__view-all">VIEW ALL</button>
        </div>

        <div className="explore__list">
          {filtered.map(user => (
            <div key={user.id} className="explore__card">
              <img src={user.avatar} alt={user.name} className="explore__card-avatar" />
              <div className="explore__card-info">
                <span className="explore__card-name">{user.name}</span>
                <span className="explore__card-role">{user.role}</span>
              </div>
              <button
                className="explore__card-link"
                onClick={() => { trackEvent('explore', 'view_user_profile', user.name); nav(userRoute(user.id)) }}
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>

      <Navbar />
    </div>
  )
}