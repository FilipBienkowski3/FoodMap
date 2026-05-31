import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '../config/analytics'

const STATIC_TITLES: Record<string, string> = {
  '/': 'Home',
  '/login': 'Login',
  '/register': 'Register',
  '/map': 'Map',
  '/explore': 'Explore',
  '/activity': 'Activity',
  '/profile': 'Profile',
  '/vote': 'Group Vote',
}

/** Maps a pathname to a human-readable screen name, handling dynamic routes. */
function resolveTitle(pathname: string): string {
  if (STATIC_TITLES[pathname]) return STATIC_TITLES[pathname]
  if (/^\/restaurant\/[^/]+\/review$/.test(pathname)) return 'Write Review'
  if (/^\/restaurant\/[^/]+$/.test(pathname)) return 'Restaurant Details'
  if (/^\/user\/[^/]+$/.test(pathname)) return 'User Profile'
  return 'FoodMap'
}

/** Sends a GA pageview on every route change (SPA navigation). */
export function usePageTracking() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    const title = `FoodMap – ${resolveTitle(pathname)}`
    document.title = title
    trackPageView(pathname + search, title)
  }, [pathname, search])
}
