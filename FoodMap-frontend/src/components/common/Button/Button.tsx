import type { ReactNode } from 'react'
import './Button.css'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'outline' | 'none'
  disabled?: boolean
  fullWidth?: boolean
  className?: string
}

export function Button({ children, onClick, type = 'button', variant = 'primary', disabled, fullWidth, className = '' }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variant !== 'none' ? `btn btn--${variant}` : ''} ${fullWidth ? 'btn--full' : ''} ${className}`.trim()}
    >
      {children}
    </button>
  )
}