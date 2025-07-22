import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import CaretDown from '@/shared/icons/caret-down.svg'

interface SelectProps extends PropsWithChildren {
  className?: string
  disabled?: boolean
  classNameInner?: string
  onClick?: () => void
}

const SelectMimicry: FC<SelectProps> = ({ className, disabled, classNameInner, children, onClick }) => {
  return (
    <div className={cn(styles.root, className, { [styles.disabled]: disabled })}>
      <CaretDown className={styles.caret} width={11} />
      <div className={cn(styles.inner, classNameInner)} onClick={onClick}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}

export default SelectMimicry
