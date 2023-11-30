import { ReactNode } from 'react'

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[url('/bg-peakes.svg')] bg-no-repeat bg-cover w-full">
      {children}
    </div>
  )
}
