import cn from 'classnames'
import styles from './styles.module.css'
import { FC } from 'react'
import { Button } from '@/shared/ui/Button'
import { SearchInput } from '@/shared/ui/SearchInput'
import { SelectMimicry } from '@/shared/ui/SelectMimicry'

interface FragmentTreeHeaderProps {
  className?: string
  onCreate?: () => void
}

export const FragmentTreeHeader: FC<FragmentTreeHeaderProps> = ({ className, onCreate }) => {
  return (
    <div className={cn(styles.root, className)} data-testid='FragmentsNav'>
      <SearchInput className={styles.search} size='large' placeholder='Serach fragments' />
      <SelectMimicry classNameInner={styles.sort}>Sort by activity</SelectMimicry>
      <Button size='large' onClick={onCreate}>
        Create fragment
      </Button>
    </div>
  )
}
