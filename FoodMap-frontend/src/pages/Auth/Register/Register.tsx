import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../../config/firebase'
import { useAuth } from '../../../context/useAuth'
import { Button } from '../../../components/common/Button/Button'
import { Label } from '../../../components/common/Label/Label'
import { Input } from '../../../components/common/Input/Input'
import AuthCard from '../../../components/common/AuthCard/AuthCard'
import { ROUTES } from '../../../constants/routes'
import '../Auth.css'

export default function Register() {
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const nav = useNavigate()

  const handleSubmit = async () => {
    if (password !== confirm) { setError('Passwords do not match'); return }
    setLoading(true)
    setError('')
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(user, { displayName: name })
      login({ id: user.uid, name, email: user.email })
      nav(ROUTES.HOME)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Connection error')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
      nav(ROUTES.HOME)
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message)
    }
  }

  return (
    <div className="auth-page">
      <AuthCard>
        <h2 className="auth-page__title">Join the hunt.</h2>
        <p className="auth-page__sub">Start your journey through the city's finest flavors.</p>

        {error && <div className="auth-page__error">{error}</div>}

        <div className="auth-page__form">
          <div className="auth-page__field">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="auth-page__field">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="hello@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="auth-page__field">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="auth-page__field">
            <Label htmlFor="confirm">Confirm Password</Label>
            <Input
              id="confirm"
              type="password"
              placeholder="••••••••"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
            />
          </div>

          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={loading}
            className="auth-page__submit"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </div>

        <div className="auth-page__divider">
          <span className="auth-page__divider-line" />
          <span className="auth-page__divider-text">OR CONTINUE WITH</span>
          <span className="auth-page__divider-line" />
        </div>

        <div className="auth-page__social">
          <button className="auth-page__social-btn" onClick={handleGoogle} type="button">
            <svg className="auth-page__social-icon" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <button className="auth-page__social-btn" type="button">
            <svg className="auth-page__social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Apple
          </button>
        </div>

        <p className="auth-page__footer">
          Already a member? <Link to={ROUTES.LOGIN}>Login to your account</Link>
        </p>
      </AuthCard>
    </div>
  )
}