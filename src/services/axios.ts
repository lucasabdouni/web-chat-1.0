import axios, { AxiosError } from 'axios'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { redirect } from 'next/navigation'

interface FailedRequest {
  onSuccess: (token: string) => void
  onFailure: (err: AxiosError) => void
}

const cookies = parseCookies()
let isRefreshing = false
let failedRequestsQueue: FailedRequest[] = []

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['chat.token']}`,
  },
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      if (error.response?.data.code === 'token.expired') {
        const cookies = parseCookies()

        const originalConfig = error.config
        const { 'chat.refreshToken': refreshToken } = cookies

        if (!isRefreshing) {
          isRefreshing = true

          api
            .patch(
              'token/refresh',
              {},
              {
                headers: {
                  Authorization: `Bearer ${refreshToken}`,
                },
              },
            )
            .then((response) => {
              const { token } = response.data

              setCookie(undefined, 'chat.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
              })

              setCookie(
                undefined,
                'chat.refreshToken',
                response.data.refreshToken,
                {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: '/',
                },
              )

              api.defaults.headers.Authorization = `Bearer ${token}`

              failedRequestsQueue.forEach((request) => request.onSuccess(token))
              failedRequestsQueue = []
            })
            .catch((err) => {
              failedRequestsQueue.forEach((request) => request.onFailure(err))
              failedRequestsQueue = []
            })
            .finally(() => {
              isRefreshing = false
            })
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers.Authorization = `Bearer ${token}`

              resolve(api(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            },
          })
        })
      }
    } else {
      destroyCookie(undefined, 'chat.token')
      destroyCookie(undefined, 'chat.refreshToken')

      redirect('/')
    }

    return Promise.reject(error)
  },
)
