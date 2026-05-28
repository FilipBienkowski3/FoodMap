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
        <span className="material-symbols-outlined">arrow_back</span>
        <span className="auth-card__back-logo">{APP_NAME}</span>
      </button>
      {children}
    </div>
  )
}