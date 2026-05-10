import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../../context/useAuth'
import { registerUser } from '../../../api/foodmapApi'
import Button from '../../../components/Button/Button'
import { ROUTES } from '../../../constants/routes'
import './Register.css'

export default function Register() {
  const [name, setName]             = useState('')
  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const [confirm, setConfirm]       = useState('')
  const [error, setError]           = useState('')
  const [loading, setLoading]       = useState(false)
  const { login } = useAuth()
  const nav = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      setError('Hasła nie są takie same')
      return
    }
    setLoading(true)
    setError('')
    try {
      const data = await registerUser(email, password, name)
      if (data.ok) {
        // po rejestracji od razu logujemy (bez bazy tworzymy usera lokalnie)
        login({ id: Date.now(), name, email })
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
        <h1 className="auth-card__title">Utwórz konto</h1>
        <p className="auth-card__sub">Dołącz do FoodMap za darmo</p>
        {error && <div className="auth-card__error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-form__label">Imię
            <input
              className="auth-form__input"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="Jan"
            />
          </label>
          <label className="auth-form__label">Email
            <input
              className="auth-form__input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="ty@email.pl"
            />
          </label>
          <label className="auth-form__label">Hasło
            <input
              className="auth-form__input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="min. 6 znaków"
              minLength={6}
            />
          </label>
          <label className="auth-form__label">Potwierdź hasło
            <input
              className="auth-form__input"
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              placeholder="••••••••"
            />
          </label>
          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Tworzenie konta...' : 'Zarejestruj się'}
          </Button>
        </form>
        <p className="auth-card__footer">
          Masz już konto? <Link to={ROUTES.LOGIN}>Zaloguj się</Link>
        </p>
      </div>
    </div>
  )
}