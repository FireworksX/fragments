'use client'
import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useLoginPage } from '@/views/AuthLogin/lib/useLoginPage'
import { AuthTitle } from '@/widgets/AuthTitle'
import { InputText } from '@/shared/ui/InputText'
import { Button } from '@/shared/ui/Button'

interface LoginProps {
  className?: string
}

export const Page: FC<LoginProps> = ({ className }) => {
  const { handleSubmit } = useLoginPage()

  return (
    <div className={cn(styles.page, className)} data-testid='Login'>
      <AuthTitle>Log in to Fragments</AuthTitle>
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
