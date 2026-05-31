import ReactGA from 'react-ga4'

const MEASUREMENT_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID as string | undefined

let initialized = false

export const isAnalyticsEnabled = () => initialized

export function initAnalytics() {
  if (initialized || !MEASUREMENT_ID) return
  ReactGA.initialize(MEASUREMENT_ID)
  initialized = true
}

export function trackPageView(path: string, title?: string) {
  if (!initialized) return
  ReactGA.send({ hitType: 'pageview', page: path, title })
}

export function trackEvent(category: string, action: string, label?: string) {
  if (!initialized) return
  ReactGA.event({ category, action, label })
}
