import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Spinner } from '@/shared/ui/Spinner'
import { Button } from '@/shared/ui/Button'

interface IntegrationMissMatchProps {
  className?: string
}

export const IntegrationMissMatch: FC<IntegrationMissMatchProps> = ({ className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <Spinner size={20} color='var(--text-color-accent)' />
      This area has no events yet. Go to the onboarding wizard.
      <Button className={styles.button}>Integrate</Button>
    </div>
  )
}
