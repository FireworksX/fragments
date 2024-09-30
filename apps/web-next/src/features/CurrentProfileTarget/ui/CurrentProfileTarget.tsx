'use client'
import { Dropdown } from '@/shared/ui/Dropdown'
import { FC } from 'react'
import { Touchable } from '@/shared/ui/Touchable'
import { Avatar } from '@/shared/ui/Avatar'
import { useRequest } from '@/shared/hooks/requests/useRequest'
import { requestType } from '@/shared/hooks/requests/requestConfig'
import { CurrentProfileDropdown } from './CurrentProfileDropdown'

export const CurrentProfileTarget: FC = () => {
  const { data: currentUser } = useRequest(requestType.profile)

  return (
    <Dropdown trigger='click' options={<CurrentProfileDropdown />}>
      <Touchable TagName='button'>
        <Avatar
          size={34}
          uniqueId={currentUser?.email}
          firstName={currentUser?.first_name}
          lastName={currentUser?.last_name}
        />
      </Touchable>
    </Dropdown>
  )
}
