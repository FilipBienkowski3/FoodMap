import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './context/useAuth'
import Home     from './pages/Home/Home'
import Login    from './pages/Auth/Login/Login'
import Register from './pages/Auth/Register/Register'
import Map      from './pages/Map/Map'
import { ROUTES } from './constants/routes'

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
          <Route path={ROUTES.MAP}      element={
            <ProtectedRoute><Map /></ProtectedRoute>
          } />
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