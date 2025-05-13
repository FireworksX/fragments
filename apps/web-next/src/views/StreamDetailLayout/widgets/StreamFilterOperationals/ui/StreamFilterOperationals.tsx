import { FC, useState } from 'react'
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
  const [local, setLocal] = useState(value)
  const [executeQuery, { data, loading }] = useStreamOperationalsFilterLazyQuery()
  const list = data?.filter?.osTypes ?? []
  const t = (value: string) => capitalize(value.toLowerCase())

  const toggleValue = (valueType: OsType) => {
    const nextValue = local.includes(valueType) ? local.filter(v => v !== valueType) : [...local, valueType]
    setLocal(nextValue)
  }

  return (
    <Dropdown
      trigger='click'
      placement='bottom-end'
      isLoading={loading}
      onShow={() => executeQuery()}
      onHide={() => onChange(local)}
      options={
        <>
          <DropdownGroup>
            {list.map(type => (
              <DropdownOptionSelect key={type} isActive={local.includes(type)} onClick={() => toggleValue(type)}>
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
        {(local?.length ? local : ['Any']).map(t).join(', ')}
      </Chip>
    </Dropdown>
  )
}
