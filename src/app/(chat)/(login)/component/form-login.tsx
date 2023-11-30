'use client'

import Input from '@/app/components/input'
import InputPassword from '@/app/components/inputPassword'
import { LogIn, UserRoundPlus } from 'lucide-react'

export default function FormLogin() {
  return (
    <form className="flex flex-col mt-12 gap-2">
      <Input title="E-mail" placeholder="johndoe@email.com" />
      <InputPassword title="Senha" placeholder="Digite sua senha" />
      <button className="mt-7 p-2 flex justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 hover:ease-linear">
        <LogIn /> Entrar
      </button>
      <button className="p-2 flex justify-center items-center border-[1px] border-emerald-800 gap-2 text-sm text-emerald-800">
        <UserRoundPlus /> Criar uma conta
      </button>
    </form>
  )
}
