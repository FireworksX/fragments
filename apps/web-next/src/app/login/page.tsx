'use client'
import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import InputText from '@/app/components/InputText/InputText'
import { LoginTitle } from '@/app/components/LoginTitle/LoginTitle'
import Button from '@/app/components/Button'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

interface LoginProps {
  className?: string
}

export const Page: FC<LoginProps> = ({ className }) => {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const credentials = Object.fromEntries(formData)
    const callbackUrl = searchParams.get('callbackUrl') || '/'

    signIn('credentials', { ...credentials, callbackUrl })
  }

  return (
    <div className={cn(styles.page, className)} data-testid='Login'>
      <LoginTitle>Log in to Fragments</LoginTitle>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputText name='email' placeholder='Email Address' mode='secondary' size='large' type='email' />
        <InputText name='password' placeholder='Password' mode='secondary' size='large' type='password' />
        <Button type='submit' size='large'>
          Continue with Email
        </Button>
      </form>
    </div>
  )
}

export default Page
