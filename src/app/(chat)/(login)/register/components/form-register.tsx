'use client'

import Input from '@/app/components/input'
import ErrorMessage from '@/app/components/errorMessage'
import InputPassword from '@/app/components/inputPassword'
import { api } from '@/services/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Send, UserRoundPlus } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const registerFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()
  const [messageError, setMessageError] = useState('')

  async function handleRegister(data: RegisterFormData) {
    const { name, email, password } = data
    try {
      const response = await api.post('/register', {
        name,
        email,
        password,
      })

      if (response.status === 201) {
        router.push('/')
      }
    } catch (err) {
      console.error('Erro na chamada da API:', err)

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          setMessageError('E-mail já cadastrado.')
        } else {
          setMessageError(
            'Ocorreu um erro ao registrar. Por favor, tente novamente.',
          )
        }
      }
    }
  }

  return (
    <form
      className="flex flex-col mt-12 gap-2"
      onSubmit={handleSubmit(handleRegister)}
    >
      <Input title="Nome" placeholder="John Doe" {...register('name')} />
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

      {messageError ? (
        <p className="w-80 flex justify-center items-center gap-2 p-2 bg-rose-500 text-sm">
          <ErrorMessage message={messageError} />
        </p>
      ) : (
        ''
      )}

      {errors.email || errors.password || errors.name ? (
        <ErrorMessage message="Verifique os dados" />
      ) : (
        ''
      )}

      {errors.password &&
      errors.password?.message !== 'A senha deve ter no mínimo 6 caracteres' ? (
        <ErrorMessage message={errors.password.message} />
      ) : (
        ''
      )}

      <button
        className="mt-7 p-2 flex justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 hover:ease-linear"
        type="submit"
        disabled={isSubmitting}
      >
        <Send /> Cadastrar
      </button>
      <Link
        href="/"
        className="p-2 flex justify-center items-center border-[1px] border-emerald-800 gap-2 text-sm text-emerald-800"
      >
        <UserRoundPlus /> Voltar
      </Link>
    </form>
  )
}
