import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Button } from '@/shared/ui/Button'
import { Container } from '@/shared/ui/Container'
import Logo from '@/shared/icons/next/logo.svg'
import CaretDown from '@/shared/icons/next/chevron-down.svg'

interface HomeProps {
  className?: string
}

export const Home: FC<HomeProps> = ({ className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.event}>
        Fragments now in public beta
        <Button size='small' mode='secondary'>
          Join free
        </Button>
      </div>
      <header className={styles.header}>
        <Container className={styles.headerContainer}>
          <div className={styles.logo}>
            <Logo width={24} height={24} />
            fragments
          </div>

          <nav className={styles.navigation}>
            <div className={styles.navigationItem}>
              Product <CaretDown />
            </div>
          </nav>
        </Container>
      </header>
    </div>
  )
}
