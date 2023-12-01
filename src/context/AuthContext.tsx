'use client'

import { api } from '@/services/axios'
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
  signIn: (credentials: SignInCredentials) => Promise<void>
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

    if (token) {
      api
        .get('/me')
        .then((res) => {
          console.log(res.data)
        })
        .catch(() => {
          console.log('ve se caiu em errror')
          destroyCookie(undefined, 'chat.token')
          destroyCookie(undefined, 'chat.refreshToken')

          router.push('/')
        })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
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
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
