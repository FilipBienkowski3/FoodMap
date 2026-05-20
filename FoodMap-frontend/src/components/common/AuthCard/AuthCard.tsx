import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import { APP_NAME } from '../../../constants/app'
import './AuthCard.css'

interface Props {
  children: ReactNode
}

export default function AuthCard({ children }: Props) {
  const nav = useNavigate()
  return (
    <div className="auth-card">
      <button className="auth-card__back" onClick={() => nav(ROUTES.HOME)}>
        ← {APP_NAME}
      </button>
      {children}
    </div>
  )
}