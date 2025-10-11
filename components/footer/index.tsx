import { Mail } from 'lucide-react'

export default function Footer() {
  return (
    <div className="flex justify-between items-center text-gray-500 text-sm lg:text-base py-4">
      <div>
        usepomodoro@2025.
        <br className="block lg:hidden" />
        All rights reserved.
      </div>
      <a
        href="mailto:arlenaraujo12@gmail.com"
        className="flex items-center gap-2 hover:text-gray-700 transition-colors"
        title="Enviar email"
      >
        <Mail size={20} />
      </a>
    </div>
  )
}
