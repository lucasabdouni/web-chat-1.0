import { AuthProvider } from '@/context/AuthContext'
import { ReactNode } from 'react'

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <div className="bg-[url('/bg-peakes.svg')] bg-no-repeat bg-cover">
        {children}
      </div>
    </AuthProvider>
  )
}
