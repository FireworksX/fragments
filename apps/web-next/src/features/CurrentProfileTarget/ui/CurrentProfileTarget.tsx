'use client'
import { Dropdown } from '@/shared/ui/Dropdown'
import { FC } from 'react'
import { Touchable } from '@/shared/ui/Touchable'
import { Avatar } from '@/shared/ui/Avatar'
import { CurrentProfileDropdown } from './CurrentProfileDropdown'
import { useQuery } from '@apollo/client'
import { CURRENT_USER } from '@/shared/queries/currentUser'

export const CurrentProfileTarget: FC = () => {
  const { data } = useQuery(CURRENT_USER)

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
