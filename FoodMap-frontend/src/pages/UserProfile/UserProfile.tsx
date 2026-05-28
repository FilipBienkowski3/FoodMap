import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/common/Navbar/Navbar'
import { DishCard } from '../../components/common/DishCard/DishCard'
import { Button } from '../../components/common/Button/Button'
import { MOCK_USERS } from '../../data/users'
import './UserProfile.css'

export default function UserProfile() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const [activeTab, setActiveTab] = useState<'visited' | 'want'>('visited')

  const user = MOCK_USERS.find(u => u.id === id)

  if (!user) return (
    <div className="uprofile">
      <p style={{ textAlign: 'center', padding: '40px', color: '#6b6b6b' }}>User not found.</p>
      <Navbar />
    </div>
  )

  return (
    <div className="uprofile">
      <header className="uprofile__topbar">
        <button className="uprofile__back" onClick={() => nav(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="uprofile__topbar-title">FoodMap</span>
      </header>

      <div className="uprofile__container">
        <div className="uprofile__hero">
          <img src={user.avatar} alt={user.name} className="uprofile__avatar" />
          <h1 className="uprofile__name">{user.name}</h1>
          <p className="uprofile__bio">{user.bio}</p>

          <div className="uprofile__badges">
            {user.badges.map(b => (
              <span key={b} className="uprofile__badge">{b}</span>
            ))}
          </div>

          <div className="uprofile__actions">
            <Button variant="primary" className="uprofile__btn">Follow</Button>
            <Button variant="outline" className="uprofile__btn">Message</Button>
          </div>
        </div>

        <section className="uprofile__map-section">
          <h2 className="uprofile__section-title">My Food Map</h2>
          <div className="uprofile__map-placeholder">
            <img
              src="https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=800&q=80"
              alt="Map"
            />
          </div>
        </section>

        <nav className="uprofile__tabs">
          <button
            className={`uprofile__tab ${activeTab === 'visited' ? 'uprofile__tab--active' : ''}`}
            onClick={() => setActiveTab('visited')}
          >
            Visited
          </button>
          <button
            className={`uprofile__tab ${activeTab === 'want' ? 'uprofile__tab--active' : ''}`}
            onClick={() => setActiveTab('want')}
          >
            Want to Visit
          </button>
        </nav>

        <div className="uprofile__dish-list">
          {activeTab === 'visited' && user.visitedDishes.map(dish => (
            <DishCard key={dish.id} {...dish} />
          ))}
          {activeTab === 'want' && user.wantDishes.length > 0 && user.wantDishes.map(dish => (
            <DishCard key={dish.id} {...dish} />
          ))}
          {activeTab === 'want' && user.wantDishes.length === 0 && (
            <p style={{ textAlign: 'center', color: '#6b6b6b', marginTop: '20px' }}>
              Nothing in the wishlist yet.
            </p>
          )}
        </div>

        <section className="uprofile__activity">
          <h2 className="uprofile__section-title">Friends Activity</h2>
          {user.friendsActivity.map(a => (
            <div key={a.id} className="uprofile__activity-item">
              <img src={a.avatar} alt="" className="uprofile__activity-avatar" />
              <div className="uprofile__activity-text">
                <span>{a.text}</span>
                <span className="uprofile__activity-rating">
                  <span className="material-symbols-outlined uprofile__star">star</span>
                  {a.rating}
                </span>
              </div>
            </div>
          ))}
        </section>
      </div>

      <Navbar />
    </div>
  )
}