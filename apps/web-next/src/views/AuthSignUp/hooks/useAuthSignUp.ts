import { useMutation } from '@apollo/client'
import { AUTH_SIGN_UP } from '@/views/AuthSignUp/lib/authSignUp'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

interface Inputs {
  firstName: string
  email: string
  password: string
}

export const useAuthSignUp = () => {
  const router = useRouter()
  const [executeSignUp, { loading }] = useMutation(AUTH_SIGN_UP)
  const { register, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const response = await executeSignUp({ variables: data })

    if (!response.errors?.length) {
      const signInResponse = await signIn('credentials', {
        redirect: false,
        ...data
      })

      if (signInResponse?.ok) {
        router.replace('/project')
        redirect('/project')
      }
    }
  }

  return {
    loading,
    firstNameField: register('firstName', { required: true }),
    emailField: register('email', { required: true }),
    passwordField: register('password', { required: true }),
    handleSubmit: handleSubmit(onSubmit)
  }
}
