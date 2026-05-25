import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './context/useAuth'
import Home        from './pages/Home/Home'
import Login       from './pages/Auth/Login/Login'
import Register    from './pages/Auth/Register/Register'
import Map         from './pages/Map/Map'
import Explore     from './pages/Explore/Explore'
import Activity    from './pages/Activity/Activity'
import Profile     from './pages/Profile/Profile'
import Vote        from './pages/Vote/Vote'
import UserProfile       from './pages/UserProfile/UserProfile'
import RestaurantDetails from './pages/RestaurantDetails/RestaurantDetails'
import Review            from './pages/Review/Review'
import { ROUTES }        from './constants/routes'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  return user ? <>{children}</> : <Navigate to={ROUTES.LOGIN} replace />
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME}     element={<Home />} />
        <Route path={ROUTES.LOGIN}    element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.MAP}      element={<ProtectedRoute><Map /></ProtectedRoute>} />
        <Route path={ROUTES.EXPLORE}  element={<ProtectedRoute><Explore /></ProtectedRoute>} />
        <Route path={ROUTES.ACTIVITY} element={<ProtectedRoute><Activity /></ProtectedRoute>} />
        <Route path={ROUTES.PROFILE}  element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path={ROUTES.VOTE}     element={<ProtectedRoute><Vote /></ProtectedRoute>} />
        <Route path={ROUTES.USER}       element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path={ROUTES.RESTAURANT_REVIEW} element={<ProtectedRoute><Review /></ProtectedRoute>} />
        <Route path={ROUTES.RESTAURANT}       element={<ProtectedRoute><RestaurantDetails /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}