'use client'
import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import DropdownGroup from '@/app/components/Dropdown/components/DropdownGroup/DropdownGroup'
import DropdownOption from '@/app/components/Dropdown/components/DropdownOption/DropdownOption'
import { Container } from '@/app/components/Container/Container'
import { requestConfig, requestType } from '@/app/hooks/requests/requestConfig'
import { useMutation } from '@/app/hooks/requests/useMutation'
import { signOut } from 'next-auth/react'
import { useSignOut } from '@/app/hooks/useSignOut'
import { useRequest } from '@/app/hooks/requests/useRequest'

interface CurrentProfileDropdownProps {
  className?: string
}

export const CurrentProfileDropdown: FC<CurrentProfileDropdownProps> = ({ className }) => {
  const { fetching, trigger } = useSignOut()
  const { data: currentUser } = useRequest(requestType.profile)

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
