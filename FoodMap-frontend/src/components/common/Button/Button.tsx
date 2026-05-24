import type { ReactNode } from 'react'
import './Button.css'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'outline' | 'none' | 'nav-link' | 'nav-register' | 'ghost'
  disabled?: boolean
  fullWidth?: boolean
  className?: string
}

export function Button({
  children, onClick, type = 'button', variant = 'primary',
  disabled, fullWidth, className = '',
}: ButtonProps) {
  const variantClass = variant !== 'none' ? `btn btn--${variant}` : ''
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variantClass} ${fullWidth ? 'btn--full' : ''} ${className}`.trim()}
    >
      {children}
    </button>
  )
}