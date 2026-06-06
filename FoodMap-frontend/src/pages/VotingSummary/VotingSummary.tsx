import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/common/Navbar/Navbar'
import { Button } from '../../components/common/Button/Button'
import { getRestaurants, readRestaurantsCache, type MapSpot } from '../../api/foodmapApi'
import { MOCK_USERS } from '../../data/users'
import { restaurantRoute, ROUTES } from '../../constants/routes'
import { trackEvent } from '../../config/analytics'
import './VotingSummary.css'

const CUISINE_BY_ICON: Record<string, string> = {
  ramen_dining: 'Japanese',
  set_meal: 'Japanese',
  local_pizza: 'Italian',
  local_cafe: 'Café',
  restaurant: 'Fine Dining',
}

function priceTier(price: number) {
  if (price <= 25) return '$'
  if (price <= 50) return '$$'
  return '$$$'
}

function isOpenNow(hours: string) {
  const [open, close] = hours.split('–').map(t => {
    const [h, m] = t.trim().split(':').map(Number)
    return h * 60 + m
  })
  const now = new Date()
  const cur = now.getHours() * 60 + now.getMinutes()
  return cur >= open && cur < close
}

function haversine(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

const ATTENDEES = MOCK_USERS
const SHOWN = 4

export default function VotingSummary() {
  const nav = useNavigate()
  const [spots, setSpots] = useState<MapSpot[]>(() => readRestaurantsCache() ?? [])
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (spots.length === 0) getRestaurants().then(setSpots).catch(() => {})
  }, [spots.length])

  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      p => setUserPos({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => {},
      { timeout: 10000, maximumAge: 120000, enableHighAccuracy: false }
    )
  }, [])

  const winner = spots.length
    ? spots.reduce((best, s) => (s.rating > best.rating ? s : best), spots[0])
    : null

  const distance =
    winner && userPos ? `${haversine(userPos.lat, userPos.lng, winner.lat, winner.lng).toFixed(1)} km` : null

  const extra = Math.max(0, ATTENDEES.length - SHOWN)

  const shareWithGroup = async () => {
    trackEvent('vote_summary', 'share_with_group', winner?.name)
    const link = `${window.location.origin}${ROUTES.VOTE_SUMMARY}`
    try {
      await navigator.clipboard.writeText(link)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = link
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <div className="vs">
      <header className="vs__header">
        <button className="vs__back" onClick={() => nav(-1)} aria-label="Go back">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="vs__title">VOTING SUMMARY</span>
      </header>

      <div className="vs__scroll">
        <div className="vs__intro">
          <h1 className="vs__winner">The Winner is...</h1>
          <p className="vs__sub">Your group has decided!</p>
        </div>

        {winner && (
          <>
            <article className="vs__card">
              <div className="vs__media">
                <img src={winner.img} alt={winner.name} className="vs__img" />
                <span className="vs__rating">
                  <span className="material-symbols-outlined vs__rating-star">star</span>
                  {winner.rating}
                </span>
              </div>
              <div className="vs__card-body">
                <h2 className="vs__name">{winner.name}</h2>
                <p className="vs__meta">
                  {CUISINE_BY_ICON[winner.icon] ?? 'Restaurant'} <span className="vs__dot">·</span>{' '}
                  {priceTier(winner.price)}
                  {distance && (
                    <>
                      {' '}
                      <span className="vs__dot">·</span>
                      <span className="material-symbols-outlined vs__meta-pin">location_on</span>
                      {distance}
                    </>
                  )}
                </p>
              </div>
            </article>

            <div className="vs__slot">
              <span className="vs__slot-icon material-symbols-outlined">schedule</span>
              <div className="vs__slot-info">
                <span className="vs__slot-label">Open Hours</span>
                <span className="vs__slot-date">{winner.hours}</span>
                <span className={`vs__slot-time${isOpenNow(winner.hours) ? ' vs__slot-time--open' : ''}`}>
                  {isOpenNow(winner.hours) ? 'Open now' : 'Closed now'}
                </span>
              </div>
            </div>
          </>
        )}

        {!winner && <p className="vs__loading">Loading results…</p>}

        <section className="vs__coming">
          <h3 className="vs__section-title">Who's Coming</h3>
          <div className="vs__avatars">
            {ATTENDEES.slice(0, SHOWN).map((u, i) => (
              <img
                key={u.id}
                src={u.avatar}
                alt={u.name}
                title={u.name}
                className="vs__avatar"
                style={{ zIndex: SHOWN - i }}
              />
            ))}
            {extra > 0 && <span className="vs__avatar vs__avatar--more">+{extra}</span>}
          </div>
        </section>

        <div className="vs__actions">
          <Button
            variant="primary"
            fullWidth
            className="vs__btn"
            onClick={() => {
              trackEvent('vote_summary', 'map_directions', winner?.name)
              winner ? nav(restaurantRoute(winner.id)) : nav(ROUTES.MAP)
            }}
          >
            <span className="material-symbols-outlined vs__btn-icon">explore</span>
            MAP &amp; DIRECTIONS
          </Button>
          <Button
            variant="outline"
            fullWidth
            className="vs__btn vs__btn--share"
            onClick={shareWithGroup}
          >
            <span className="material-symbols-outlined vs__btn-icon">share</span>
            SHARE WITH GROUP
          </Button>
        </div>
      </div>

      {copied && (
        <div className="vs__toast" role="status">
          <span className="material-symbols-outlined vs__toast-icon">check_circle</span>
          Link copied to clipboard
        </div>
      )}

      <Navbar />
    </div>
  )
}
