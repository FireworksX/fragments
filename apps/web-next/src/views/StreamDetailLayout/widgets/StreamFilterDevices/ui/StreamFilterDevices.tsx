import { FC, useEffect, useState } from 'react'
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
  onChange?: (nextValue: DeviceType[]) => void
}

export const StreamFilterDevices: FC<StreamFilterDevicesProps> = ({ className, value = [], onChange = noop }) => {
  const [local, setLocal] = useState(value)
  const [executeQuery, { data, loading }] = useStreamDevicesFilterLazyQuery()
  const list = data?.filter?.deviceTypes ?? []
  const t = (value: string) => capitalize(value.toLowerCase())

  const toggleValue = (valueType: DeviceType) => {
    const nextValue = local.includes(valueType) ? local.filter(v => v !== valueType) : [...local, valueType]
    setLocal(nextValue)
  }

  return (
    <Dropdown
      trigger='click'
      placement='bottom-end'
      isLoading={loading}
      onShow={() => executeQuery()}
      onHide={() => {
        onChange?.(local)
      }}
      options={
        <>
          <DropdownGroup>
            {list.map(type => (
              <DropdownOptionSelect key={type} isActive={local.includes(type)} onClick={() => toggleValue(type)}>
                {t(type)}
              </DropdownOptionSelect>
            ))}
          </DropdownGroup>
          {!!list?.length && (
            <DropdownGroup>
              <DropdownOption mode='danger' onClick={() => setLocal([])}>
                Remove filter
              </DropdownOption>
            </DropdownGroup>
          )}
        </>
      }
    >
      <Chip className={className} prefix='Device type:'>
        {(local?.length ? local : ['Any']).map(t).join(', ')}
      </Chip>
    </Dropdown>
  )
}
