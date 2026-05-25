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

export const getRestaurants = () =>
  api.get<MapSpot[]>('/restaurants').then(r => r.data)

export const getRestaurant = (id: number) =>
  api.get<Restaurant>(`/restaurants/${id}`).then(r => r.data)