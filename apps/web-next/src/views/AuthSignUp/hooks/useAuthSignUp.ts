import { SubmitHandler, useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import { useAuthSignUpMutation } from '@/views/AuthSignUp/queries/AuthSignUp.generated'

interface Inputs {
  firstName: string
  email: string
  password: string
}

export const useAuthSignUp = () => {
  const router = useRouter()
  const [executeSignUp, { loading }] = useAuthSignUpMutation()
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
