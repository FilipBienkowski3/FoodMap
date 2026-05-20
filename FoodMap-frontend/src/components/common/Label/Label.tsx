import type { ReactNode } from 'react'
import './Label.css'

interface LabelProps {
  htmlFor?: string
  children: ReactNode
}

export function Label({ htmlFor, children }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="label">
      {children}
    </label>
  )
}