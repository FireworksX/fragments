import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { FilterLocation } from '../widgets/FilterLocation'
import { FilterDevices } from '../widgets/FilterDevices'
import { FilterOperationals } from '../widgets/FilterOperationals'
import { ConditionGet, ConditionSetGet, ReleaseConditionGet, ReleaseConditionPost } from '@/__generated__/types'
import { useReleaseCondition } from '../hooks/useReleaseCondition'
import { Chip } from '@/shared/ui/Chip'

interface ReleaseConditionProps {
  editable?: boolean
  releaseCondition: ReleaseConditionGet
  className?: string
}

export const ReleaseCondition: FC<ReleaseConditionProps> = ({ className, editable, releaseCondition }) => {
  const { currentFilters, updateFilter } = useReleaseCondition(releaseCondition)

  if (!editable && !releaseCondition?.conditionSets?.length) {
    return <Chip className={styles.emptyChip}>Without filters</Chip>
  }

  return (
    <div className={cn(styles.root, className)}>
      <FilterDevices
        editable={editable}
        value={currentFilters.deviceTypes}
        onChange={next => updateFilter('deviceTypes', next)}
      />
      <FilterOperationals
        editable={editable}
        value={currentFilters.osTypes}
        onChange={next => updateFilter('osTypes', next)}
      />
      <FilterLocation editable={editable} />

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
