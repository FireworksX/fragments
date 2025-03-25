'use client'
import { Dropdown } from '@/shared/ui/Dropdown'
import { FC } from 'react'
import { Touchable } from '@/shared/ui/Touchable'
import { Avatar } from '@/shared/ui/Avatar'
import { CurrentProfileDropdown } from './CurrentProfileDropdown'
import { useCurrentUser } from '@/shared/hooks/useCurrentUser'

export const CurrentProfileTarget: FC = () => {
  const { data } = useCurrentUser()

  return (
    <Dropdown trigger='click' options={<CurrentProfileDropdown />}>
      <Touchable TagName='button'>
        <Avatar
          size={34}
          uniqueId={data?.profile?.user?.email}
          firstName={data?.profile?.user?.firstName}
          lastName={data?.profile?.user?.lastName}
        />
      </Touchable>
    </Dropdown>
  )
}
