'use client'
import { FC, Suspense } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { AuthTitle } from '@/widgets/AuthTitle'
import { InputText } from '@/shared/ui/InputText'
import { Button } from '@/shared/ui/Button'
import { useAuthLogin } from '@/views/AuthLogin/hooks/useAuthLogin'
import Logo from '@/shared/icons/next/logo.svg'
import { ConfigureFeatureFlagVariant } from '@/widgets/modals/ConfigureFeatureFlagVariant'
import { modalNames } from '@/shared/data'
import { ModalCollector } from '@/widgets/ModalCollector'
import { useModal } from '@/shared/hooks/useModal'

interface LoginProps {
  className?: string
}

export const InitialPage: FC<LoginProps> = ({ className }) => {
  const { emailField, passwordField, loading, handleSubmit } = useAuthLogin()

  return (
    <div className={cn(styles.page, className)} data-testid='Login'>
      <Logo className={styles.logo} />
      <AuthTitle>Log in to Fragments</AuthTitle>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputText
          name='email'
          placeholder='Email Address'
          mode='secondary'
          size='large'
          type='email'
          {...emailField}
        />
        <InputText
          name='password'
          placeholder='Password'
          mode='secondary'
          size='large'
          type='password'
          {...passwordField}
        />
        <Button type='submit' size='large' loading={loading}>
          Continue with Email
        </Button>
      </form>
    </div>
  )
}

export const Page = () => (
  <Suspense>
    <InitialPage />
  </Suspense>
)
