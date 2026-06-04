import { createContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { auth } from '../config/firebase'
import { prefetchRestaurants } from '../api/foodmapApi'
import { trackEvent } from '../config/analytics'
import { onAuthStateChanged, signOut } from 'firebase/auth'

interface User {
  id: string
  name: string | null
  email: string | null
  photoURL?: string | null
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (user: User) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL
        })
        prefetchRestaurants()
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const login = (u: User) => setUser(u)
  const logout = async () => {
    trackEvent('auth', 'logout')
    await signOut(auth)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}