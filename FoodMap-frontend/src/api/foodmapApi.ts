import axios from 'axios'
import type { Restaurant } from '../constants/restaurant'

const api = axios.create({ baseURL: 'http://localhost:3000' })

export type MapSpot = Pick<
  Restaurant,
  'id' | 'lat' | 'lng' | 'icon' | 'name' | 'price' | 'rating' | 'hours' | 'img'
>

export const loginUser = (email: string, password: string) =>
  api.post('/login', { email, password }).then(r => r.data)

export const registerUser = (email: string, password: string, name: string) =>
  api.post('/register', { email, password, name }).then(r => r.data)

const RESTAURANTS_CACHE_KEY = 'foodmap:restaurants'

export const readRestaurantsCache = (): MapSpot[] | null => {
  try {
    const raw = sessionStorage.getItem(RESTAURANTS_CACHE_KEY)
    return raw ? (JSON.parse(raw) as MapSpot[]) : null
  } catch {
    return null
  }
}

export const getRestaurants = () =>
  api.get<MapSpot[]>('/restaurants').then(r => {
    try {
      sessionStorage.setItem(RESTAURANTS_CACHE_KEY, JSON.stringify(r.data))
    } catch { /* quota / private mode */ }
    return r.data
  })

/** Warm cache after login so the map route feels instant. */
export const prefetchRestaurants = () => {
  getRestaurants().catch(() => {})
}

export const getRestaurant = (id: number) =>
  api.get<Restaurant>(`/restaurants/${id}`).then(r => r.data)