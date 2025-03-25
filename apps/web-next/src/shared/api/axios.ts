import axiosLib from 'axios'
import { getSession } from 'next-auth/react'

export const axios = axiosLib.create({ baseURL: 'http://localhost:3000/backend' })

axios.interceptors.request.use(async config => {
  const session = await getSession()
  const accessToken = session?.accessToken

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})
