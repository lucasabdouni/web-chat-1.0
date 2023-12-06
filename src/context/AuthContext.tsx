'use client'

import { api } from '@/services/axios'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { ReactNode, createContext, useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void | string>
  signOut: () => Promise<void>
  user: User
  isAuthenticated: boolean
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const isAuthenticated = !!user
  const router = useRouter()

  useEffect(() => {
    const { 'chat.token': token } = parseCookies()

    const fetchData = async () => {
      if (token) {
        try {
          const response = await api.get('/me')
          setUser(response.data.user)
          router.push('/home')
        } catch (error) {
          destroyCookie(undefined, 'chat.token')
          destroyCookie(undefined, 'chat.refreshToken')
          router.push('/')
        }
      }
    }

    fetchData()
  }, [])

  async function signIn({
    email,
    password,
  }: SignInCredentials): Promise<string | undefined> {
    try {
      const response = await api.post('/sessions', {
        email,
        password,
      })

      const { token, refreshToken } = response.data

      setCookie(undefined, 'chat.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })

      setCookie(undefined, 'chat.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })

      api.defaults.headers.Authorization = `Bearer ${token}`

      const responseGetUser = await api.get('/me')

      setUser(responseGetUser.data)

      router.push('/home')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (
          err.response?.status === 400 &&
          err.response?.data.message === 'Invalid Credential.'
        ) {
          return 'Verifique os dados informados.'
        }
      } else {
        return 'Ocorreu um erro. Por favor, tente novamente.'
      }
    }
  }

  async function signOut() {
    try {
      destroyCookie(undefined, 'chat.token')
      destroyCookie(undefined, 'chat.refreshToken')

      router.push('/')
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn, isAuthenticated, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
