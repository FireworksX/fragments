import styles from './page.module.css'
import { redirect } from 'next/navigation'
import { Container } from '@/shared/ui/Container'
import { Link } from './widgets/Link/Link'
import { Button } from '@/shared/ui/Button'

export default function Home() {
  redirect('/login')
  return (
    <Container className={styles.main}>
      <Link type='login'>
        <Button size='large'>Login</Button>
      </Link>

      <Link type='signup'>
        <Button size='large' mode='secondary'>
          Sign Up
        </Button>
      </Link>
    </Container>
  )
}
