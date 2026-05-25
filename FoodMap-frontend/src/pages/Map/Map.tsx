import { useState, useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMapEvents } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import { ROUTES, restaurantRoute } from '../../constants/routes'
import { KRAKOW_CENTER, MAP_TILE_ATTRIBUTION, MAP_TILE_URL } from '../../constants/map'
import { getRestaurants, readRestaurantsCache, type MapSpot } from '../../api/foodmapApi'
import Navbar from '../../components/common/Navbar/Navbar'
import { Button } from '../../components/common/Button/Button'
import { Input } from '../../components/common/Input/Input'
import { Label } from '../../components/common/Label/Label'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './Map.css'

const makePinIcon = (icon: string, active = false) =>
  L.divIcon({
    className: '',
    html: `<div class="map-pin${active ? ' map-pin--active' : ''}"><span class="material-symbols-outlined map-pin__icon${active ? ' map-pin__icon--active' : ''}">${icon}</span></div>`,
    iconSize:    [44, 44],
    iconAnchor:  [22, 44],
    popupAnchor: [0, -50],
  })

function haversine(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
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

const FILTERS = [
  { label: 'Open Now',    pre: 'schedule', post: '' },
  { label: 'Rating 4.0+', pre: '',         post: '' },
  { label: 'Price',       pre: 'payments', post: '' },
  { label: 'Distance',    pre: 'near_me',  post: '' },
]

function MapClickDismiss({ onDismiss }: { onDismiss: () => void }) {
  useMapEvents({ popupclose: onDismiss })
  return null
}

export default function Map() {
  const nav = useNavigate()
  const [spots, setSpots]           = useState<MapSpot[]>(() => readRestaurantsCache() ?? [])
  const [activePin, setActivePin]   = useState<number | null>(null)
  const [activeFilters, setFilters] = useState<Set<string>>(new Set())
  const [searchTag, setSearchTag]   = useState('')
  const [query, setQuery]           = useState('')
  const [userPos, setUserPos]         = useState<{ lat: number; lng: number } | null>(null)
  const [mapCenter, setMapCenter]     = useState<[number, number]>(KRAKOW_CENTER)
  const [showTune, setShowTune]       = useState(false)
  const [priceInput, setPriceInput]   = useState('60')
  const [distInput, setDistInput]     = useState('2')
  const [priceLimit, setPriceLimit]   = useState<number | null>(null)
  const [distLimit, setDistLimit]     = useState<number | null>(null)

  useEffect(() => { getRestaurants().then(setSpots) }, [])

  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      p => {
        setUserPos({ lat: p.coords.latitude, lng: p.coords.longitude })
        setMapCenter([p.coords.latitude, p.coords.longitude])
      },
      () => {},
      { timeout: 10000, maximumAge: 120000, enableHighAccuracy: false }
    )
  }, [])

  const pinIcons = useMemo(() => {
    const cache: Record<string, L.DivIcon> = {}
    return (icon: string, active: boolean) => {
      const key = `${icon}:${active}`
      if (!cache[key]) cache[key] = makePinIcon(icon, active)
      return cache[key]
    }
  }, [])

  const toggleFilter = (label: string) => {
    setFilters(prev => {
      const next = new Set(prev)
      if (next.has(label)) {
        next.delete(label)
      } else {
        next.add(label)
        if (label === 'Price') {
          const p = parseFloat(priceInput)
          setPriceLimit(!isNaN(p) && p > 0 ? p : null)
        }
        if (label === 'Distance') {
          const d = parseFloat(distInput)
          setDistLimit(!isNaN(d) && d > 0 ? d : null)
        }
      }
      return next
    })
  }

  const applyTune = () => {
    const p = parseFloat(priceInput)
    const d = parseFloat(distInput)
    setPriceLimit(!isNaN(p) && p > 0 ? p : null)
    setDistLimit(!isNaN(d) && d > 0 ? d : null)
    setShowTune(false)
  }

  const dist = (spot: MapSpot) =>
    userPos ? haversine(userPos.lat, userPos.lng, spot.lat, spot.lng) : 0

  const fmtDist = (spot: MapSpot) =>
    userPos ? `${haversine(userPos.lat, userPos.lng, spot.lat, spot.lng).toFixed(1)} km` : '—'

  const visibleSpots = spots
    .filter(s => !searchTag                         || s.name.toLowerCase().includes(searchTag.toLowerCase()))
    .filter(s => !activeFilters.has('Open Now')     || isOpenNow(s.hours))
    .filter(s => !activeFilters.has('Rating 4.0+')  || s.rating >= 4.0)
    .filter(s => !activeFilters.has('Price')    || priceLimit === null || s.price <= priceLimit)
    .filter(s => !activeFilters.has('Distance') || distLimit === null  || (userPos !== null && dist(s) <= distLimit))

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      setSearchTag(query.trim()); setQuery(''); setActivePin(null)
    }
  }

  return (
    <div className="mp">
      <main className="mp__canvas">
        <MapContainer center={mapCenter} zoom={userPos ? 15 : 14} className="mp__leaflet" zoomControl={false}>
          <TileLayer attribution={MAP_TILE_ATTRIBUTION} url={MAP_TILE_URL} />
          <MapClickDismiss onDismiss={() => setActivePin(null)} />
          {userPos && (
            <CircleMarker
              center={[userPos.lat, userPos.lng]}
              radius={8}
              pathOptions={{ color: '#fff', weight: 2, fillColor: '#4285F4', fillOpacity: 1 }}
            />
          )}
          {visibleSpots.map(spot => (
            <Marker
              key={spot.id}
              position={[spot.lat, spot.lng]}
              icon={pinIcons(spot.icon, activePin === spot.id)}
              eventHandlers={{ click: (e) => { setActivePin(spot.id); e.target.openPopup() } }}
            >
              <Popup closeButton={false} className="mp__popup-wrap">
                <div
                  className="mp__card mp__card--clickable"
                  role="button"
                  tabIndex={0}
                  onClick={() => nav(restaurantRoute(spot.id))}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nav(restaurantRoute(spot.id)) } }}
                >
                  <div className="mp__card-img-wrap">
                    <img src={spot.img} alt={spot.name} className="mp__card-img" loading="lazy" decoding="async" />
                    <div className="mp__card-badge">
                      <span className="material-symbols-outlined mp__card-star">star</span>
                      {spot.rating}
                    </div>
                  </div>
                  <div className="mp__card-body">
                    <span className="mp__card-name">{spot.name}</span>
                    <span className="mp__card-meta">{spot.price} zł · {fmtDist(spot)}</span>
                    <span className="mp__card-hours">
                      <span className="material-symbols-outlined mp__card-hours-icon">schedule</span>
                      {spot.hours}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <div className="mp__float">
          <div className="mp__search">
            <Button variant="none" className="mp__search-icon-btn" onClick={() => { if (query.trim()) { setSearchTag(query.trim()); setQuery(''); setActivePin(null) } }}>
              <span className="material-symbols-outlined mp__search-icon">search</span>
            </Button>
            {searchTag && (
              <div className="mp__tag">
                <span className="mp__tag-label">{searchTag}</span>
                <Button variant="none" className="mp__tag-x" onClick={() => setSearchTag('')}>
                  <span className="material-symbols-outlined">close</span>
                </Button>
              </div>
            )}
            <Input
              className="mp__search-input"
              placeholder="Find a dish..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <div className="mp__tune-wrap">
              <Button
                variant="none"
                className={`mp__search-tune${showTune ? ' mp__search-tune--active' : ''}`}
                onClick={() => setShowTune(v => !v)}
              >
                <span className="material-symbols-outlined">tune</span>
              </Button>
              {showTune && (
                <div className="mp__tune-panel">
                  <div className="mp__tune-row">
                    <Label className="mp__tune-label">Max price</Label>
                    <div className="mp__tune-field">
                      <Input
                        className="mp__tune-input"
                        type="number" min={1}
                        value={priceInput}
                        onChange={e => setPriceInput(e.target.value)}
                      />
                      <span className="mp__tune-unit">zł</span>
                    </div>
                  </div>
                  <div className="mp__tune-row">
                    <Label className="mp__tune-label">Max distance</Label>
                    <div className="mp__tune-field">
                      <Input
                        className="mp__tune-input"
                        type="number" min={0.1} step={0.1}
                        value={distInput}
                        onChange={e => setDistInput(e.target.value)}
                      />
                      <span className="mp__tune-unit">km</span>
                    </div>
                  </div>
                  <Button variant="none" className="mp__tune-apply" onClick={applyTune}>Apply</Button>
                </div>
              )}
            </div>
          </div>

          <div className="mp__chips">
            {FILTERS.map(f => (
              <Button
                key={f.label}
                variant="none"
                className={`mp__chip${activeFilters.has(f.label) ? ' mp__chip--active' : ''}`}
                onClick={() => toggleFilter(f.label)}
              >
                {f.pre && <span className="material-symbols-outlined mp__chip-icon">{f.pre}</span>}
                {f.label}
                {f.post && <span className="material-symbols-outlined mp__chip-icon">{f.post}</span>}
              </Button>
            ))}
          </div>
        </div>

        <div className="mp__fab-wrap">
          <Button variant="none" className="mp__fab" onClick={() => nav(ROUTES.VOTE)}>
            <span className="material-symbols-outlined">groups</span>
            Start Group Vote
          </Button>
        </div>
      </main>

      <Navbar />
    </div>
  )
}
