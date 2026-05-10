import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:3000' })

export const loginUser = (email: string, password: string) =>
  api.post('/login', { email, password }).then(r => r.data)

export const registerUser = (email: string, password: string, name: string) =>
  api.post('/register', { email, password, name }).then(r => r.data)

export const getRestaurants = () =>
  api.get('/restaurants').then(r => r.data)