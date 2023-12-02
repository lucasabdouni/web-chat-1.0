'use client'

import { AuthContext } from '@/context/AuthContext'
import { LogOut } from 'lucide-react'
import { useContext } from 'react'

export default function Header() {
  const { user, signOut } = useContext(AuthContext)

  console.log(user.name)

  return (
    <header className="flex items-center justify-between p-8">
      <h1 className="text-4lg">Olá, {user.name}</h1>
      <button
        onClick={signOut}
        className="flex justify-center items-center border-2 rounded-md p-2 border-white gap-2 text-sm"
      >
        <LogOut className="w-4" /> Sair
      </button>
    </header>
  )
}
