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
import { noop, omit } from '@fragmentsx/utils'
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
  const list = (data?.filter?.geoLocations ?? []).map(el => omit(el, '__typename'))
  const t = (value: string, index: number, arr?: unknown[]) => (
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

  const toggleValue = (item: { country: string }) => {
    const nextValue = checkIsActive(item) ? local.filter(v => v !== item) : [...local, item]
    setLocal(nextValue)
  }

  const checkIsActive = item => local.findIndex(el => el.country === item.country) !== -1

  if (!editable && !value?.length) return null

  return (
    <Dropdown
      trigger='click'
      placement='bottom-end'
      isLoading={loading}
      header={!!list?.length && <SearchInput value={search} placeholder='Search' mode='tiny' onChange={setSearch} />}
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
                isActive={checkIsActive(item)}
                onClick={() => toggleValue(item)}
              >
                {t(item?.country, 0)}
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
      <Chip className={cn(className, styles.chip)} prefix='Location:'>
        {(local?.length ? local : [{ country: 'Any' }]).map((item, index, arr) => t(item.country, index, arr))}
      </Chip>
    </Dropdown>
  )
}
