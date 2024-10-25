import { redirect } from 'next/navigation'
import { Container } from '@/shared/ui/Container'
import { Button } from '@/shared/ui/Button'

export default function Home() {
  redirect('/login')
  return <h1>he</h1>
}
