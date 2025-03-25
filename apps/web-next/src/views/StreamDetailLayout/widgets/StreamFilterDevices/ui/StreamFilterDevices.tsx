import { FC } from 'react'
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
import { noop } from '@fragments/utils'

interface StreamFilterDevicesProps {
  isEdit?: boolean
  value?: DeviceType[]
  className?: string
  onChange?: (nextValue: DeviceType[]) => void
}

export const StreamFilterDevices: FC<StreamFilterDevicesProps> = ({
  className,
  isEdit,
  value = [],
  onChange = noop
}) => {
  const [executeQuery, { data, loading }] = useStreamDevicesFilterLazyQuery()
  const list = data?.filter?.deviceTypes ?? []
  const t = (value: string) => capitalize(value.toLowerCase())

  const toggleValue = (valueType: DeviceType) => {
    const nextValue = value.includes(valueType) ? value.filter(v => v !== valueType) : [...value, valueType]
    onChange?.(nextValue)
  }

  return (
    <Dropdown
      trigger='click'
      disabled={!isEdit}
      placement='bottom-end'
      isLoading={loading}
      onShow={() => executeQuery()}
      options={
        <>
          <DropdownGroup>
            {list.map(type => (
              <DropdownOptionSelect key={type} isActive={value.includes(type)} onClick={() => toggleValue(type)}>
                {t(type)}
              </DropdownOptionSelect>
            ))}
          </DropdownGroup>
          <DropdownGroup>
            <DropdownOption mode='danger'>Remove filter</DropdownOption>
          </DropdownGroup>
        </>
      }
    >
      <Chip className={className} prefix='Device type:'>
        {(value?.length ? value : ['Any']).map(t).join(', ')} {isEdit && <EditIcon className={styles.editIcon} />}
      </Chip>
    </Dropdown>
  )
}
