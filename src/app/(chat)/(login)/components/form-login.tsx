'use client'

import Input from '@/app/components/input'
import InputPassword from '@/app/components/inputPassword'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, LogIn, UserRoundPlus } from 'lucide-react'
import Link from 'next/link'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AuthContext } from '@/context/AuthContext'

const registerFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function FormLogin() {
  const { signIn } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  async function handleRegister(data: RegisterFormData) {
    await signIn(data)
  }

  return (
    <form
      className="flex flex-col mt-12 gap-2"
      onSubmit={handleSubmit(handleRegister)}
    >
      <Input
        title="E-mail"
        placeholder="johndoe@email.com"
        {...register('email')}
      />
      <InputPassword
        title="Senha"
        placeholder="Digite sua senha"
        {...register('password')}
      />

      {errors.email || errors.password ? (
        <p className="flex justify-center items-center gap-2 p-2 bg-rose-500 text-sm">
          <AlertCircle />
          Verifique os dados inseridos.
        </p>
      ) : (
        ''
      )}

      <button
        className="mt-7 p-2 flex justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 hover:ease-linear"
        type="submit"
        disabled={isSubmitting}
      >
        <LogIn /> Entrar
      </button>
      <Link
        href="/register"
        className="p-2 flex justify-center items-center border-[1px] border-emerald-800 gap-2 text-sm text-emerald-800"
      >
        <UserRoundPlus /> Criar uma conta
      </Link>
    </form>
  )
}
