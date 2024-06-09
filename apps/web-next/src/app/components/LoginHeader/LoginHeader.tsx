import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import FragmentsLogoFull from '@/app/svg/fragments-logo-full.svg'
import Button from '@/app/components/Button'
import { Container } from '@/app/components/Container/Container'

interface LoginHeaderProps {
  withoutSignUp?: boolean
  className?: string
}

export const LoginHeader: FC<LoginHeaderProps> = ({ className, withoutSignUp }) => (
  <Container className={cn(styles.root, className)} data-testid='LoginHeader'>
    <FragmentsLogoFull width={120} height={40} />
    {!withoutSignUp && <Button mode='outline'>Sign Up</Button>}
  </Container>
)
