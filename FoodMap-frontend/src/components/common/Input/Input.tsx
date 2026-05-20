import './Input.css'

interface InputProps {
  id?: string
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  required?: boolean
  minLength?: number
  min?: number
  step?: number
  className?: string
}

export function Input({ id, type = 'text', placeholder, value, onChange, onKeyDown, required, minLength, min, step, className = '' }: InputProps) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      required={required}
      minLength={minLength}
      min={min}
      step={step}
      className={`input ${className}`.trim()}
    />
  )
}