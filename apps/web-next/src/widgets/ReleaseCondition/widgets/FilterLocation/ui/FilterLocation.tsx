import { FC, useDeferredValue, useMemo, useState } from 'react'
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
import { SearchInput } from '@/shared/ui/SearchInput'

interface StreamFilterLocationProps {
  value: { country: string }[]
  className?: string
  editable?: boolean
  onChange?: (nextValue: unknown[]) => void
}

export const FilterLocation: FC<StreamFilterLocationProps> = ({ className, value = [], editable, onChange = noop }) => {
  const [local, setLocal] = useState(value)
  const [executeQuery, { data, loading }] = useStreamLocationFilterLazyQuery()
  const list = data?.filter?.geoLocations ?? []
  const t = (value: string, index: number, arr: unknown[]) => (
    <span className={Array.isArray(arr) ? styles.chipPart : ''}>
      {capitalize(value.toLowerCase())}
      {Array.isArray(arr) && index !== arr?.length - 1 ? ', ' : ''}
    </span>
  )
  const hasReset = value?.length > 0 && list?.length > 0

  const [search, setSearch] = useState('')
  const differedSearch = useDeferredValue(search)
  const filterList = useMemo(
    () => list?.filter(item => item?.country?.toLowerCase().search(differedSearch?.toLowerCase()) !== -1),
    [differedSearch, list]
  )

  const toggleValue = (valueType: OsType) => {
    const nextValue = value.includes(valueType) ? value.filter(v => v !== valueType) : [...value, valueType]
    onChange?.(nextValue)
  }

  if (!editable && !value?.length) return null

  return (
    <Dropdown
      trigger='click'
      placement='bottom-end'
      isLoading={loading}
      header={<SearchInput value={search} placeholder='Search' mode='tiny' onChange={setSearch} />}
      onShow={() => executeQuery()}
      onHide={() => onChange(local)}
      width={230}
      options={
        <>
          <DropdownGroup>
            {filterList.map(item => (
              <DropdownOptionSelect
                key={item?.country}
                className={styles.option}
                isActive={local.includes(item?.country)}
                onClick={() => toggleValue(item?.country)}
              >
                {t(item?.country)}
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
      <Chip className={className} prefix='Location:'>
        {(value?.length ? value : ['Any']).map(t)}
      </Chip>
    </Dropdown>
  )
}
