import { useState } from 'react'
import Navbar from '../../components/common/Navbar/Navbar'
import { Button } from '../../components/common/Button/Button'
import { DishCard } from '../../components/common/DishCard/DishCard'
import { useAuth } from '../../context/useAuth'
import { trackEvent } from '../../config/analytics'
import type { ProfileDish } from '../../data/users'
import './Profile.css'

const VISITED_DISHES: ProfileDish[] = [
  {
    id: 1,
    name: 'Tonkotsu Ramen',
    restaurant: 'Ramen Ichiraku',
    restaurantId: 1,
    price: '42 zł',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    name: 'Margherita DOC',
    restaurant: 'Mamma Mia Pizza',
    restaurantId: 2,
    price: '32 zł',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
  },
]

const WANT_DISHES: ProfileDish[] = [
  {
    id: 3,
    name: 'Omakase Set',
    restaurant: 'Sushi Kyo',
    restaurantId: 3,
    price: '120 zł',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
  },
]

export default function Profile() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'visited' | 'want'>('visited')

  return (
    <div className="profile">
      <div className="profile__container">
        <header className="profile__header">
          <div className="profile__avatar-wrapper">
            <img
              src={user?.photoURL || "https://i.pravatar.cc/150?u=alex"}
              alt={user?.name || "User"}
              className="profile__avatar"
            />
            <div className="profile__avatar-edit">
              <span className="material-symbols-outlined">smartphone</span>
            </div>
          </div>
          <h1 className="profile__name">{user?.name || "User"}</h1>
          <p className="profile__bio">
            "Exploring the city one noodle bowl at a time..."
          </p>
          <Button variant="outline" className="profile__edit-btn">
            Edit Profile
          </Button>
        </header>

        <section className="profile__map-section">
          <h2 className="profile__section-title">My Food Map</h2>
          <div className="profile__map-placeholder">
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
              alt="Map"
            />
          </div>
        </section>

        <nav className="profile__tabs">
          <button
            className={`profile__tab ${activeTab === 'visited' ? 'profile__tab--active' : ''}`}
            onClick={() => { setActiveTab('visited'); trackEvent('profile', 'tab_switch', 'visited') }}
          >
            Visited
          </button>
          <button
            className={`profile__tab ${activeTab === 'want' ? 'profile__tab--active' : ''}`}
            onClick={() => { setActiveTab('want'); trackEvent('profile', 'tab_switch', 'want_to_visit') }}
          >
            Want to Visit
          </button>
        </nav>

        <div className="profile__dish-list">
          {activeTab === 'visited' && VISITED_DISHES.map(dish => (
            <DishCard key={dish.id} {...dish} />
          ))}
          {activeTab === 'want' && WANT_DISHES.map(dish => (
            <DishCard key={dish.id} {...dish} />
          ))}
        </div>
      </div>
      <Navbar />
    </div>
  )
}

