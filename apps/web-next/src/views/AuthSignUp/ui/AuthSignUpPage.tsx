'use client'
import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { AuthTitle } from '@/widgets/AuthTitle'
import { InputText } from '@/shared/ui/InputText'
import { Button } from '@/shared/ui/Button'
import { useAuthSignUp } from '@/views/AuthSignUp/hooks/useAuthSignUp'
import Logo from '@/shared/icons/next/logo.svg'

interface SignUpProps {
  className?: string
}

export const Page: FC<SignUpProps> = ({ className }) => {
  const { firstNameField, emailField, passwordField, loading, handleSubmit } = useAuthSignUp()

  return (
    <div className={cn(styles.page, className)} data-testid='Login'>
      <Logo className={styles.logo} />
      <AuthTitle>
        Create Your <br /> Fragments Account
      </AuthTitle>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputText placeholder='Your Name' mode='secondary' size='large' type='text' {...firstNameField} />
        <InputText placeholder='Email Address' mode='secondary' size='large' type='email' {...emailField} />
        <InputText placeholder='Password' mode='secondary' size='large' type='password' {...passwordField} />
        <Button size='large' loading={loading}>
          Sign Up
        </Button>
      </form>
    </div>
  )
}

export default Page
