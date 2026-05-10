import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../../context/useAuth'
import { loginUser } from '../../../api/foodmapApi'
import Button from '../../../components/Button/Button'
import { ROUTES } from '../../../constants/routes'
import './Login.css'

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
      if (data.ok) {
        login(data.user)
        nav(ROUTES.HOME)
      } else {
        setError(data.message)
      }
    } catch {
      setError('Błąd połączenia z serwerem')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-card__title">Zaloguj się</h1>
        <p className="auth-card__sub">Witaj z powrotem w FoodMap</p>
        {error && <div className="auth-card__error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-form__label">Email
            <input className="auth-form__input" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="ty@email.pl"/>
          </label>
          <label className="auth-form__label">Hasło
            <input className="auth-form__input" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"/>
          </label>
          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Logowanie...' : 'Zaloguj'}
          </Button>
        </form>
        <p className="auth-card__footer">
          Nie masz konta? <Link to={ROUTES.REGISTER}>Zarejestruj się</Link>
        </p>
      </div>
    </div>
  )
}