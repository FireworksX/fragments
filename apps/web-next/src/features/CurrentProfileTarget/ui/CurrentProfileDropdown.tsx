import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useSignOut } from '@/shared/hooks/useSignOut'
import { useRequest } from '@/shared/hooks/requests/useRequest'
import { requestType } from '@/shared/hooks/requests/requestConfig'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { Container } from '@/shared/ui/Container'
import { DropdownOption } from '@/shared/ui/DropdownOption'

interface CurrentProfileDropdownProps {
  className?: string
}

export const CurrentProfileDropdown: FC<CurrentProfileDropdownProps> = ({ className }) => {
  const { fetching, trigger } = useSignOut()
  const { data: currentUser } = useRequest(requestType.profile)

  if (!currentUser) return

  return (
    <div className={cn(styles.root, className)} data-testid='CurrentProfileDropdown'>
      <DropdownGroup>
        <Container className={styles.user}>
          <div className={styles.name}>
            {currentUser.first_name} {currentUser.lastname}
          </div>
          <div className={styles.email}>{currentUser.email}</div>
        </Container>

        <DropdownOption>Account Settings</DropdownOption>
        <DropdownOption fetching={fetching} onClick={trigger}>
          Log Out
        </DropdownOption>
      </DropdownGroup>
    </div>
  )
}
