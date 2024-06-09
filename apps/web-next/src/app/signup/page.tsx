import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import InputText from '@/app/components/InputText/InputText'
import { LoginTitle } from '@/app/components/LoginTitle/LoginTitle'
import Button from '@/app/components/Button'

interface LoginProps {
  className?: string
}

export const Page: FC<LoginProps> = ({ className }) => {
  return (
    <div className={cn(styles.page, className)} data-testid='Login'>
      <LoginTitle>
        Create Your <br /> Fragments Account
      </LoginTitle>
      <form className={styles.form} action=''>
        <InputText placeholder='Your Name' mode='secondary' size='large' type='text' />
        <InputText placeholder='Email Address' mode='secondary' size='large' type='email' />
        <Button size='large'>Sign Up</Button>
      </form>
    </div>
  )
}

export default Page
