import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useSignOut } from '@/shared/hooks/useSignOut'
import { useRequest } from '@/shared/hooks/requests/useRequest'
import { requestType } from '@/shared/hooks/requests/requestConfig'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { Container } from '@/shared/ui/Container'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { useCurrentUser } from '@/shared/hooks/useCurrentUser'

interface CurrentProfileDropdownProps {
  className?: string
}

export const CurrentProfileDropdown: FC<CurrentProfileDropdownProps> = ({ className }) => {
  const { trigger } = useSignOut()
  const { data, loading, error } = useCurrentUser()

  if (loading || error) return

  return (
    <div className={cn(styles.root, className)} data-testid='CurrentProfileDropdown'>
      <DropdownGroup>
        <Container className={styles.user} gutterSize={12}>
          <div className={styles.name}>
            {data?.profile.user.firstName} {data?.profile.user.firstName}
          </div>
        </Container>

        <DropdownOption>Account Settings</DropdownOption>
        <DropdownOption onClick={trigger}>Log Out</DropdownOption>
      </DropdownGroup>
    </div>
  )
}
