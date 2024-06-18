import styles from './page.module.css'
import { Container } from '@/app/components/Container/Container'
import Button from '@/app/components/Button'
import { Link } from '@/app/widgets/Link/Link'
import { redirect } from 'next/navigation'

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
