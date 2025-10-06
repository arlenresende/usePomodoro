import { Label } from '@radix-ui/react-label'

import { ComponentProps, forwardRef } from 'react'
import { Textarea as CustomTextarea } from '@/components/ui/textarea'
interface TextAreaProps extends ComponentProps<'textarea'> {
  name: string
  placeholder?: string
  label?: string
  error?: string
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ name, placeholder, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor={name}>{label}</Label>
        <CustomTextarea
          ref={ref}
          {...props}
          className={`border ${error ? 'border-red-500' : ''}`}
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
TextArea.displayName = 'TextArea'
