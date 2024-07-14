import { Label } from '@radix-ui/react-label'
import { Input as CustonInput } from '../ui/input'
import { ComponentProps, forwardRef } from 'react'

interface InputProps extends ComponentProps<'input'> {
  name: string
  placeholder?: string
  label?: string
  type?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, placeholder, label, type, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor={name}>{label}</Label>
        <CustonInput
          ref={ref}
          {...props}
          className={`border ${error ? 'border-red-500' : ''}`}
          type={type}
          id={name}
          placeholder={placeholder}
          name={name}
        />
        {error && (
          <p className="text-red-500 font-medium text-xs pt-1">{error}</p>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'
