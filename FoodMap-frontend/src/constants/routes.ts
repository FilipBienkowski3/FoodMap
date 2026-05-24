export const ROUTES = {
  HOME:     '/',
  LOGIN:    '/login',
  REGISTER: '/register',
  MAP:      '/map',
  EXPLORE:  '/explore',
  ACTIVITY: '/activity',
  PROFILE:  '/profile',
  VOTE:     '/vote',
  USER:     '/user/:id',
} as const

export const userRoute = (id: string) => `/user/${id}`