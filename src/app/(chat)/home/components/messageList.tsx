'use client'

import { CartMessage } from '@/app/components/cartMessage'
import SendMessage from '@/app/components/sendMessage'
import Spin from '@/app/components/spin'
import { env } from '@/env'
import { api } from '@/services/axios'

import jwt from 'jsonwebtoken'
import { Wifi, WifiOff } from 'lucide-react'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'

type Message = {
  id: string
  text: string
  userId: string
  created_at: Date
  user: {
    name: string
  }
}

const cookies = parseCookies()
const { 'chat.token': token } = cookies

let userId = ''

if (token) {
  const decodedToken = jwt.decode(token)
  if (decodedToken?.sub) {
    userId = String(decodedToken.sub)
  }
}

const messagesQueue: Message[] = []
let isOnlineSocket = false

const socket = new WebSocket(
  `${env.NEXT_PUBLIC_SOCKET_SECURY}chat?username=${userId}`,
)

socket.onopen = async () => {
  socket.onmessage = (event) => {
    const eventData = JSON.parse(event.data)

    const { type, message } = eventData

    if (type === 'joined') {
      if (message === userId) {
        isOnlineSocket = true
      }
    }

    if (type === 'submit') {
      if (message.user && message.user.name) {
        const data = {
          id: message.id,
          created_at: message.created_at,
          text: message.text,
          userId: message.user_id,
          user: { name: message.user.name },
        }

        messagesQueue.push(data)
        console.log('chegou nova mensagem')
      }
    }
  }
}

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    api.get('/messages').then((response) => {
      setMessages(response.data.messages.messages)
    })
  }, [])

  useEffect(() => {
    const intervalId = setTimeout(function updateMessages() {
      if (messagesQueue.length >= 1) {
        setMessages((prevMessages) => prevMessages.concat(messagesQueue))
        messagesQueue.shift()
      }
      setTimeout(updateMessages, 3000)
    }, 3000)

    return () => clearTimeout(intervalId)
  }, [messages])

  return (
    <div className="overflow-y-auto">
      <div className="w-full h-[70vh] flex flex-col gap-5 bg-slate-100 bg-opacity-70 rounded-lg p-8 justify-end overflow-y-auto">
        {messages.map((item) => {
          return (
            <CartMessage
              key={item.id}
              name={item.user.name}
              message={item.text}
            />
          )
        })}
      </div>
      <SendMessage />
      <div className="flex ml-2 mt-2 gap-2">
        {isOnlineSocket ? (
          <>
            <Wifi />
            <p>Conectado.</p>
          </>
        ) : (
          <>
            <p>Conectando.</p>
          </>
        )}
      </div>
    </div>
  )
}
