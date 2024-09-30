import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

export const useLoginPage = () => {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const credentials = Object.fromEntries(formData)
    const callbackUrl = searchParams.get('callbackUrl') || '/'

    signIn('credentials', { ...credentials, callbackUrl })
  }

  return {
    handleSubmit
  }
}
