import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../../context/useAuth'
import { registerUser } from '../../../api/foodmapApi'
import { Button }from '../../../components/common/Button/Button'
import { Label} from '../../../components/common/Label/Label'
import { Input }from '../../../components/common/Input/Input'
import AuthCard from '../../../components/common/AuthCard/AuthCard'
import { ROUTES } from '../../../constants/routes'
import '../Auth.css'

export default function Register() {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const { login } = useAuth()
  const nav = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    setError('')
    try {
      const data = await registerUser(email, password, name)
      if (data.ok) {
        login({ id: Date.now(), name, email })
        nav(ROUTES.HOME)
      } else {
        setError(data.message)
      }
    } catch {
      setError('Connection error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <AuthCard>
        <h2 className="auth-page__title">Join the hunt.</h2>
        <p className="auth-page__sub">Start your journey through the city's finest flavors.</p>

        {error && <div className="auth-page__error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-page__form">
          <div className="auth-page__field">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" type="text" placeholder="Enter your name"
              value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="auth-page__field">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="hello@example.com"
              value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="auth-page__field">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
          </div>
          <div className="auth-page__field">
            <Label htmlFor="confirm">Confirm Password</Label>
            <Input id="confirm" type="password" placeholder="••••••••"
              value={confirm} onChange={e => setConfirm(e.target.value)} required />
          </div>

          <Button type="submit" disabled={loading} className="auth-page__submit">
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <div className="auth-page__divider"><span>OR CONTINUE WITH</span></div>

        <div className="auth-page__social">
          <button className="auth-page__social-btn">Google</button>
          <button className="auth-page__social-btn">Apple</button>
        </div>

        <p className="auth-page__footer">
          Already a member? <Link to={ROUTES.LOGIN}>Login to your account</Link>
        </p>
      </AuthCard>
    </div>
  )
}