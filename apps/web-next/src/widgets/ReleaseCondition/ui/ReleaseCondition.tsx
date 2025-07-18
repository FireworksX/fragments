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
import { ConditionGet, ConditionSetGet, ReleaseConditionGet, ReleaseConditionPost } from '@/__generated__/types'
import { useReleaseCondition } from '@/widgets/ReleaseCondition/hooks/useReleaseCondition'

interface ReleaseConditionProps {
  releaseCondition: ReleaseConditionGet
  className?: string
}

export const ReleaseCondition: FC<ReleaseConditionProps> = ({ className, releaseCondition }) => {
  const { devices, updateDevices, osTypes } = useReleaseCondition(releaseCondition)
  // if (conditionSet.filterData?.__typename === 'FilterDeviceTypeGet') {
  //   conditionSet.filterData.deviceTypes
  // }

  return (
    <div className={cn(styles.root, className)}>
      <FilterDevices
        value={devices}
        onChange={next => {
          updateDevices(next)
        }}
      />
      <FilterOperationals value={osTypes} />

      {/*{condition.deviceTypes && <FilterDevices value={condition.deviceTypes} />}*/}
      {/*<FilterDevices />*/}
      {/*<Dropdown*/}
      {/*  trigger='click'*/}
      {/*  options={*/}
      {/*    <DropdownGroup>*/}
      {/*      <DropdownOption>Location</DropdownOption>*/}
      {/*      <DropdownOption>Device type</DropdownOption>*/}
      {/*      <DropdownOption>OS type</DropdownOption>*/}
      {/*    </DropdownGroup>*/}
      {/*  }*/}
      {/*>*/}
      {/*  <Chip>*/}
      {/*    <PlusIcon />*/}
      {/*    Add filter*/}
      {/*  </Chip>*/}
      {/*</Dropdown>*/}
    </div>
  )
}
