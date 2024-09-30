import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import FragmentsLogoFull from '@/shared/icons/fragments-logo-full.svg'
import { Container } from '@/shared/ui/Container'
import { Button } from '@/shared/ui/Button'

interface LoginHeaderProps {
  withoutSignUp?: boolean
  className?: string
}

export const AuthHeader: FC<LoginHeaderProps> = ({ className, withoutSignUp }) => (
  <Container className={cn(styles.root, className)} data-testid='LoginHeader'>
    <FragmentsLogoFull width={120} height={40} />
    {!withoutSignUp && <Button mode='outline'>Sign Up</Button>}
  </Container>
)
