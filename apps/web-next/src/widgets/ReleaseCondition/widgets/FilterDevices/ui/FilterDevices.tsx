import { FC, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { capitalize } from '@/shared/utils/capitalize'
import { Chip } from '@/shared/ui/Chip'
import EditIcon from '@/shared/icons/next/pencil.svg'
import { Dropdown } from '@/shared/ui/Dropdown'
import { useStreamDevicesFilterLazyQuery } from '../queries/StreamDevicesFilter.generated'
import DropdownOptionSelect from '@/shared/ui/DropdownOptionSelect/ui/DropdownOptionSelect'
import { DeviceType } from '@/graphql/types'
import { noop } from '@fragmentsx/utils'

interface StreamFilterDevicesProps {
  value?: DeviceType[]
  className?: string
  editable?: boolean
  onChange?: (nextValue: DeviceType[]) => void
}

export const FilterDevices: FC<StreamFilterDevicesProps> = ({ className, value = [], editable, onChange = noop }) => {
  const [local, setLocal] = useState(value)
  const [executeQuery, { data, loading }] = useStreamDevicesFilterLazyQuery()
  const list = data?.filter?.deviceTypes ?? []
  const t = (value: string, index: number, arr?: unknown[]) => (
    <span className={Array.isArray(arr) ? styles.chipPart : ''}>
      {capitalize(value.toLowerCase())}
      {Array.isArray(arr) && index !== arr?.length - 1 ? ', ' : ''}
    </span>
  )
  const hasReset = local?.length > 0 && list?.length > 0

  const toggleValue = (valueType: DeviceType) => {
    const nextValue = local.includes(valueType) ? local.filter(v => v !== valueType) : [...local, valueType]
    setLocal(nextValue)
  }

  if (!editable && !value?.length) return null

  return (
    <Dropdown
      trigger='click'
      placement='bottom-end'
      isLoading={loading}
      disabled={!editable}
      width={120}
      onShow={() => executeQuery()}
      onHide={() => onChange?.(local)}
      options={
        <>
          <DropdownGroup>
            {list.map(type => (
              <DropdownOptionSelect key={type} isActive={local.includes(type)} onClick={() => toggleValue(type)}>
                {t(type, 100)}
              </DropdownOptionSelect>
            ))}
          </DropdownGroup>
          {hasReset && (
            <DropdownGroup>
              <DropdownOption mode='danger' onClick={() => setLocal([])}>
                Remove filter
              </DropdownOption>
            </DropdownGroup>
          )}
        </>
      }
    >
      <Chip className={cn(className, styles.chip)}>
        <span className={styles.chipPart}>Device type:</span>
        {(local?.length ? local : ['Any']).map(t)}
      </Chip>
    </Dropdown>
  )
}
