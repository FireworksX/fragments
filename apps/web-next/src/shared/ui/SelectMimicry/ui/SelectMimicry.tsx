import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import CaretDown from '@/shared/icons/caret-down.svg'
import { Touchable } from '@/shared/ui/Touchable'

interface SelectProps extends PropsWithChildren {
  icon?: ReactNode
  className?: string
  disabled?: boolean
  classNameInner?: string
  onClick?: () => void
}

const SelectMimicry: FC<SelectProps> = ({ className, icon, disabled, classNameInner, children, onClick }) => {
  return (
    <Touchable className={cn(styles.root, className, { [styles.disabled]: disabled })} onClick={onClick}>
      <div className={cn(styles.inner, classNameInner)}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <div className={styles.content}>{children}</div>
      </div>
      <CaretDown className={styles.caret} width={11} />
    </Touchable>
  )
}

export default SelectMimicry
