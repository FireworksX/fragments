import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import DropdownGroup from '@/app/components/Dropdown/components/DropdownGroup/DropdownGroup'
import DropdownOption from '@/app/components/Dropdown/components/DropdownOption/DropdownOption'
import { Container } from '@/app/components/Container/Container'

interface CurrentProfileDropdownProps {
  className?: string
}

export const CurrentProfileDropdown: FC<CurrentProfileDropdownProps> = ({ className }) => (
  <div className={cn(styles.root, className)} data-testid='CurrentProfileDropdown'>
    <DropdownGroup>
      <Container className={styles.user}>
        <div className={styles.name}>Arthur</div>
        <div className={styles.email}>fireworksxs@gmail.com</div>
      </Container>

      <DropdownOption size='large'>Account Settings</DropdownOption>
      <DropdownOption size='large'>Log Out</DropdownOption>
    </DropdownGroup>
  </div>
)
