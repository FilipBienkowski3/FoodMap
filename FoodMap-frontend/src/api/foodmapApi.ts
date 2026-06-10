import type { Restaurant } from '../constants/restaurant'
import { restaurants, toMapSpot } from '../data/restaurants'

export type MapSpot = Pick<
  Restaurant,
  'id' | 'lat' | 'lng' | 'icon' | 'name' | 'price' | 'rating' | 'hours' | 'img'
>

const RESTAURANTS_CACHE_KEY = 'foodmap:restaurants'

export const readRestaurantsCache = (): MapSpot[] | null => {
  try {
    const raw = sessionStorage.getItem(RESTAURANTS_CACHE_KEY)
    return raw ? (JSON.parse(raw) as MapSpot[]) : null
  } catch {
    return null
  }
}

const cacheRestaurants = (data: MapSpot[]) => {
  try {
    sessionStorage.setItem(RESTAURANTS_CACHE_KEY, JSON.stringify(data))
  } catch { /* quota / private mode */ }
}

export const getRestaurants = () => {
  const data = restaurants.map(toMapSpot)
  cacheRestaurants(data)
  return Promise.resolve(data)
}

/** Warm cache after login so the map route feels instant. */
export const prefetchRestaurants = () => {
  getRestaurants().catch(() => {})
}

export const getRestaurant = (id: number) => {
  const restaurant = restaurants.find(r => r.id === id)
  if (!restaurant) return Promise.reject(new Error('Restaurant not found'))
  return Promise.resolve(restaurant)
}
