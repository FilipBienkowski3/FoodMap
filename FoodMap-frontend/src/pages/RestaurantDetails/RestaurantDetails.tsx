import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getRestaurant } from '../../api/foodmapApi'
import { RestaurantDishCard } from '../../components/restaurant/RestaurantDishCard/RestaurantDishCard'
import { Button } from '../../components/common/Button/Button'
import Navbar from '../../components/common/Navbar/Navbar'
import { MENU_TABS, type MenuCategory, type Restaurant } from '../../constants/restaurant'
import './RestaurantDetails.css'

function isOpenNow(hours: string) {
  const [open, close] = hours.split('–').map(t => {
    const [h, m] = t.trim().split(':').map(Number)
    return h * 60 + m
  })
  const now = new Date()
  const cur = now.getHours() * 60 + now.getMinutes()
  return cur >= open && cur < close
}

export default function RestaurantDetails() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<MenuCategory>('starters')
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  useEffect(() => {
    const restaurantId = Number(id)
    if (!id || Number.isNaN(restaurantId)) {
      setError('Invalid restaurant')
      setLoading(false)
      return
    }

    setLoading(true)
    setError('')
    getRestaurant(restaurantId)
      .then(setRestaurant)
      .catch(() => setError('Could not load restaurant'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="rd">
        <p className="rd__status">Loading...</p>
        <Navbar />
      </div>
    )
  }

  if (error || !restaurant) {
    return (
      <div className="rd">
        <header className="rd__topbar">
          <button type="button" className="rd__icon-btn" onClick={() => nav(-1)} aria-label="Go back">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="rd__topbar-title">Restaurant Details</span>
          <span className="rd__topbar-spacer" />
        </header>
        <p className="rd__status">{error || 'Restaurant not found'}</p>
        <Navbar />
      </div>
    )
  }

  const open = isOpenNow(restaurant.hours)
  const menuItems = restaurant.menu[activeTab] ?? []

  return (
    <div className="rd">
      <header className="rd__topbar">
        <button type="button" className="rd__icon-btn" onClick={() => nav(-1)} aria-label="Go back">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="rd__topbar-title">Restaurant Details</span>
        <button
          type="button"
          className={`rd__icon-btn rd__favorite${favorite ? ' rd__favorite--active' : ''}`}
          onClick={() => setFavorite(v => !v)}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <span className="material-symbols-outlined">{favorite ? 'favorite' : 'favorite_border'}</span>
        </button>
      </header>

      <section className="rd__hero">
        <img src={restaurant.img} alt={restaurant.name} className="rd__hero-img" />
        <div className="rd__hero-overlay" />
        <div className="rd__hero-content">
          {open && <span className="rd__badge">OPEN NOW</span>}
          <h1 className="rd__hero-name">{restaurant.name}</h1>
          <p className="rd__hero-rating">
            <span className="material-symbols-outlined rd__hero-star">star</span>
            {restaurant.rating} ({restaurant.reviewCount.toLocaleString()} Reviews)
          </p>
        </div>
      </section>

      <div className="rd__content">
        <section className="rd__section">
          <h2 className="rd__section-title">Top Rated Dishes</h2>
          <p className="rd__section-sub">Our chef&apos;s highly recommended selections</p>
          <div className="rd__dish-list">
            {restaurant.topDishes.map(dish => (
              <RestaurantDishCard key={dish.id} dish={dish} />
            ))}
          </div>
        </section>

        <section className="rd__section">
          <h2 className="rd__section-title">Full Menu</h2>
          <nav className="rd__tabs">
            {MENU_TABS.map(tab => (
              <button
                key={tab.key}
                type="button"
                className={`rd__tab${activeTab === tab.key ? ' rd__tab--active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <ul className="rd__menu">
            {menuItems.map(item => (
              <li key={item.id} className="rd__menu-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rd__menu-img"
                  loading="lazy"
                />
                <div className="rd__menu-body">
                  <div className="rd__menu-header">
                    <h3 className="rd__menu-name">{item.name}</h3>
                    <span className="rd__menu-price">{item.price} zł</span>
                  </div>
                  <p className="rd__menu-desc">{item.description}</p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="rd__menu-tags">
                      {item.tags.map(tag => (
                        <span key={tag} className="rd__menu-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rd__cta">
          <h2 className="rd__cta-title">Enjoyed your visit?</h2>
          <p className="rd__cta-text">
            Share your experience with the community. Your feedback helps us maintain the {restaurant.name} standard.
          </p>
          <Button variant="primary" fullWidth className="rd__cta-btn">
            WRITE A REVIEW
          </Button>
        </section>
      </div>

      <Navbar />
    </div>
  )
}
