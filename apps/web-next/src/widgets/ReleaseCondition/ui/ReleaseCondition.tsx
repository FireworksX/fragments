import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { FilterDevices } from '@/widgets/ReleaseCondition/widgets/FilterDevices'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { Chip } from '@/shared/ui/Chip'
import PlusIcon from '@/shared/icons/next/Plus.svg'
import { FilterOperationals } from '@/widgets/ReleaseCondition/widgets/FilterOperationals'
import { ConditionGet } from '@/__generated__/types'

interface ReleaseConditionProps {
  condition: ConditionGet
  className?: string
}

export const ReleaseCondition: FC<ReleaseConditionProps> = ({ className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <FilterDevices />
      <FilterOperationals />
      <Dropdown
        trigger='click'
        options={
          <DropdownGroup>
            <DropdownOption>Location</DropdownOption>
            <DropdownOption>Device type</DropdownOption>
            <DropdownOption>OS type</DropdownOption>
          </DropdownGroup>
        }
      >
        <Chip>
          <PlusIcon />
          Add filter
        </Chip>
      </Dropdown>
    </div>
  )
}
