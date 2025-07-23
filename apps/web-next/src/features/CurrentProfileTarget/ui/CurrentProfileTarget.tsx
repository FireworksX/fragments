'use client'
import { Dropdown } from '@/shared/ui/Dropdown'
import { FC } from 'react'
import { Touchable } from '@/shared/ui/Touchable'
import { Avatar } from '@/shared/ui/Avatar'
import { CurrentProfileDropdown } from './CurrentProfileDropdown'
import { useCurrentUser } from '@/shared/hooks/useCurrentUser'
import { CommonLogo } from '@/shared/ui/CommonLogo'

export const CurrentProfileTarget: FC = () => {
  const { data } = useCurrentUser()

  return (
    <Dropdown trigger='click' placement='bottom-end' options={<CurrentProfileDropdown />}>
      <Touchable TagName='button'>
        <CommonLogo size={34} withRadius src={data?.profile.user?.logo?.publicPath} />
      </Touchable>
    </Dropdown>
  )
}
