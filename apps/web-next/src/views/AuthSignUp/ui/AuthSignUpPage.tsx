import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { AuthTitle } from '@/widgets/AuthTitle'
import { InputText } from '@/shared/ui/InputText'
import { Button } from '@/shared/ui/Button'

interface SignUpProps {
  className?: string
}

export const Page: FC<SignUpProps> = ({ className }) => {
  return (
    <div className={cn(styles.page, className)} data-testid='Login'>
      <AuthTitle>
        Create Your <br /> Fragments Account
      </AuthTitle>
      <form className={styles.form} action=''>
        <InputText placeholder='Your Name' mode='secondary' size='large' type='text' />
        <InputText placeholder='Email Address' mode='secondary' size='large' type='email' />
        <Button size='large'>Sign Up</Button>
      </form>
    </div>
  )
}

export default Page
