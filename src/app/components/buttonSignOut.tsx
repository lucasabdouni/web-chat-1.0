'use client'

import { AuthContext } from '@/context/AuthContext'
import { LogOut } from 'lucide-react'
import { useContext } from 'react'

export default function ButtonSignOut() {
  const { signOut } = useContext(AuthContext)

  return (
    <>
      <button
        onClick={signOut}
        className="flex justify-center items-center border-2 rounded-md p-2 border-white gap-2 text-sm"
      >
        <LogOut className="w-4" /> Sair
      </button>
    </>
  )
}
