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
import { useStreamOperationalsFilterLazyQuery } from '../queries/StreamOperationalsFilter.generated'
import { noop } from '@fragments/utils'

interface StreamFilterOperationalsProps {
  value?: OsType[]
  className?: string
  onChange?: (nextValue: OsType[]) => void
}

export const StreamFilterOperationals: FC<StreamFilterOperationalsProps> = ({
  className,
  value = [],
  onChange = noop
}) => {
  const [executeQuery, { data, loading }] = useStreamOperationalsFilterLazyQuery()
  const list = data?.filter?.osTypes ?? []
  const t = (value: string) => capitalize(value.toLowerCase())

  const toggleValue = (valueType: OsType) => {
    const nextValue = value.includes(valueType) ? value.filter(v => v !== valueType) : [...value, valueType]
    onChange?.(nextValue)
  }

  return (
    <Dropdown
      trigger='click'
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
      <Chip className={className} prefix='OS type:'>
        {(value?.length ? value : ['all']).map(t).join(', ')} <EditIcon className={styles.editIcon} />
      </Chip>
    </Dropdown>
  )
}
