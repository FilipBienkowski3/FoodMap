export const ROUTES = {
  HOME:     '/',
  LOGIN:    '/login',
  REGISTER: '/register',
  MAP:      '/map',
  EXPLORE:  '/explore',
  ACTIVITY: '/activity',
  PROFILE:  '/profile',
  VOTE:     '/vote',
  VOTE_SUMMARY: '/vote/summary',
  USER:       '/user/:id',
  RESTAURANT:       '/restaurant/:id',
  RESTAURANT_REVIEW: '/restaurant/:id/review',
} as const

export const userRoute = (id: string) => `/user/${id}`
export const restaurantRoute = (id: number | string) => `/restaurant/${id}`
export const restaurantReviewRoute = (id: number | string, dishKey?: number | string) =>
  dishKey != null ? `/restaurant/${id}/review?dish=${dishKey}` : `/restaurant/${id}/review`