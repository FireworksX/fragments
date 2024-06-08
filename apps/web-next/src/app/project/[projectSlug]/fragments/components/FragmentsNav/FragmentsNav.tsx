import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { SearchInput } from '@/app/components/SearchInput/SearchInput'
import Select from '@/app/components/Select/Select'
import TabsSelector from '@/app/components/TabsSelector'
import Button from '@/app/components/Button'
import { Container } from '@/app/components/Container/Container'
import SelectMimicry from '@/app/components/SelectMimicry/SelectMimicry'
import CaretDown from '@/app/svg/caret-down.svg'

interface FragmentsNavProps {
  className?: string
}

export const FragmentsNav: FC<FragmentsNavProps> = ({ className }) => (
  <Container>
    <div className={cn(styles.root, className)} data-testid='FragmentsNav'>
      <SearchInput className={styles.search} size='large' placeholder='Serach fragments' />
      <SelectMimicry classNameInner={styles.sort}>Sort by activity</SelectMimicry>
      <Button size='large'>Create fragment</Button>
    </div>
  </Container>
)
