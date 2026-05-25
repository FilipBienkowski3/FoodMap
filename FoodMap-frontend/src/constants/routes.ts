export const ROUTES = {
  HOME:     '/',
  LOGIN:    '/login',
  REGISTER: '/register',
  MAP:      '/map',
  EXPLORE:  '/explore',
  ACTIVITY: '/activity',
  PROFILE:  '/profile',
  VOTE:     '/vote',
  USER:       '/user/:id',
  RESTAURANT: '/restaurant/:id',
} as const

export const userRoute = (id: string) => `/user/${id}`
export const restaurantRoute = (id: number | string) => `/restaurant/${id}`