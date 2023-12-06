'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { parseCookies } from 'nookies'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import jwt from 'jsonwebtoken'

const cookies = parseCookies()
const { 'chat.token': token } = cookies

let userId = ''

if (token) {
  const decodedToken = jwt.decode(token)
  if (decodedToken?.sub) {
    userId = String(decodedToken.sub)
  }
}

const messageFormSchema = z.object({
  message: z.string(),
})

const socket = new WebSocket(
  `wss://chat-1-0-api.onrender.com/chat?username=${userId}`,
)

type MessageFormData = z.infer<typeof messageFormSchema>

export default function SendMessage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageFormSchema),
  })

  async function handleMessageSubmit(data: MessageFormData) {
    const { message } = data

    socket.send(
      JSON.stringify({
        message,
      }),
    )

    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(handleMessageSubmit)}
      className="w-full flex gap-1 mt-2"
    >
      <textarea
        className="flex-1 flex item-center justify-center p-2 h-12 bg-slate-100 text-teal-600 placeholder:text-teal-600 bg-opacity-70 rounded-lg"
        placeholder="Digite aqui sua mensagem..."
        {...register('message')}
      />
      <button
        type="submit"
        className="bg-slate-100 bg-opacity-70 text-teal-600 px-4 rounded-lg"
      >
        <Send />
      </button>
    </form>
  )
}
