import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../../context/useAuth'
import { loginUser } from '../../../api/foodmapApi'
import {Button }from '../../../components/common/Button/Button'
import {Label} from '../../../components/common/Label/Label'
import { Input }from '../../../components/common/Input/Input'
import AuthCard from '../../../components/common/AuthCard/AuthCard'
import { ROUTES } from '../../../constants/routes'
import '../Auth.css'

export default function Login() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const { login } = useAuth()
  const nav = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await loginUser(email, password)
      if (data.ok) { login(data.user); nav(ROUTES.HOME) }
      else setError(data.message)
    } catch { setError('Błąd połączenia z serwerem') }
    finally { setLoading(false) }
  }

  return (
    <div className="auth-page">
      <AuthCard>
        <h2 className="auth-page__title">Welcome back.</h2>
        <p className="auth-page__sub">Log in to your account to continue your journey.</p>

        {error && <div className="auth-page__error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-page__form">
          <div className="auth-page__field">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="name@example.com"
              value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="auth-page__field">
            <div className="auth-page__label-row">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="auth-page__forgot">Forgot Password?</a>
            </div>
            <Input id="password" type="password" placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)} required />
          </div>

          <Button type="submit" disabled={loading} className="auth-page__submit">
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="auth-page__divider"><span>OR CONTINUE WITH</span></div>

        <div className="auth-page__social">
          <button className="auth-page__social-btn">Google</button>
          <button className="auth-page__social-btn">Apple</button>
        </div>

        <p className="auth-page__footer">
          Don't have an account? <Link to={ROUTES.REGISTER}>Join FoodMap</Link>
        </p>
      </AuthCard>
    </div>
  )
}