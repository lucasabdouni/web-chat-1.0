'use client'

import { AuthContext } from '@/context/AuthContext'
import { LogOut } from 'lucide-react'
import { useContext } from 'react'
import { Skeleton } from './skeleton'

export default function Header() {
  const { user, signOut } = useContext(AuthContext)

  return (
    <header className="flex items-center justify-between p-8">
      {user.name ? (
        <h1 className="text-4lg">Olá, {user.name}</h1>
      ) : (
        <Skeleton className="w-400" />
      )}

      <button
        onClick={signOut}
        className="flex justify-center items-center border-2 rounded-md p-2 border-white gap-2 text-sm"
      >
        <LogOut className="w-4" /> Sair
      </button>
    </header>
  )
}
