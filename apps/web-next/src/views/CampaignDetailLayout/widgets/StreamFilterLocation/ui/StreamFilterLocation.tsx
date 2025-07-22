import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { capitalize } from '@/shared/utils/capitalize'
import { OsType } from '@/graphql/types'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import DropdownOptionSelect from '@/shared/ui/DropdownOptionSelect/ui/DropdownOptionSelect'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { Chip } from '@/shared/ui/Chip'
import EditIcon from '@/shared/icons/next/pencil.svg'
import { useStreamLocationFilterLazyQuery } from '../queries/StreamLocationFilter.generated'
import { noop } from '@fragmentsx/utils'

interface StreamFilterLocationProps {
  isEdit?: boolean
  value: { country: string }[]
  className?: string
  onChange?: (nextValue: unknown[]) => void
}

export const StreamFilterLocation: FC<StreamFilterLocationProps> = ({
  className,
  isEdit,
  value = [],
  onChange = noop
}) => {
  const [executeQuery, { data, loading }] = useStreamLocationFilterLazyQuery()
  const list = data?.filter?.geoLocations ?? []
  const t = (value: string) => capitalize(value.toLowerCase())

  const toggleValue = (valueType: OsType) => {
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
            {list.map(item => (
              <DropdownOptionSelect
                key={item?.country}
                isActive={value.includes(item?.country)}
                onClick={() => toggleValue(item?.country)}
              >
                {t(item?.country)}
              </DropdownOptionSelect>
            ))}
          </DropdownGroup>
          <DropdownGroup>
            <DropdownOption mode='danger'>Remove filter</DropdownOption>
          </DropdownGroup>
        </>
      }
    >
      <Chip className={className} prefix='Location:'>
        {(value?.length ? value : ['Any']).map(t).join(', ')} {isEdit && <EditIcon className={styles.editIcon} />}
      </Chip>
    </Dropdown>
  )
}
