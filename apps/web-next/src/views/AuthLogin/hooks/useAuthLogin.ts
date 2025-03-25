import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'

interface Inputs {
  email: string
  password: string
}

export const useAuthLogin = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<Inputs>()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<Inputs> = async data => {
    setLoading(true)

    const callbackUrl = searchParams.get('callbackUrl') || '/'
    const response = await signIn('credentials', { ...data, callbackUrl, redirect: false })

    setLoading(false)

    if (response?.ok) {
      router.replace('/project')
    }
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    loading,
    emailField: register('email', { required: true }),
    passwordField: register('password', { required: true })
  }
}
