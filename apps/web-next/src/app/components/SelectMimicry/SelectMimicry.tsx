import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import CaretDown from '@/app/svg/caret-down.svg'

interface SelectProps extends PropsWithChildren {
  className?: string
  onClick?: () => void
}

const SelectMimicry: FC<SelectProps> = ({ className, children, onClick }) => {
  return (
    <div className={cn(styles.root, className)}>
      <CaretDown className={styles.caret} width={11} />
      <div className={styles.inner} onClick={onClick}>
        {children}
      </div>
    </div>
  )
}

export default SelectMimicry
