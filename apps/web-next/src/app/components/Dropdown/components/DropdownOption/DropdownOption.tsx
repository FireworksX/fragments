import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Touchable from '@/app/components/Touchable'
import CaretRight from '@/app/svg/caret-right.svg'

export interface DropdownOptionProps extends PropsWithChildren {
  size?: 'large' | 'medium'
  description?: string
  className?: string
  disabled?: boolean
  hasNested?: boolean
  suffix?: ReactNode
  onClick?: () => void
}

const DropdownOption: FC<DropdownOptionProps> = ({
  className,
  size = 'medium',
  disabled,
  hasNested,
  children,
  description,
  suffix,
  onClick
}) => {
  return (
    <Touchable
      TagName='button'
      disabled={disabled}
      className={cn(styles.root, className, styles[size], {
        [styles.disabled]: disabled
      })}
      onClick={onClick}
    >
      <div>
        {children} <div className={styles.description}>{description}</div>
      </div>

      {(suffix || hasNested) && (
        <div>
          {suffix && <div>{suffix}</div>}
          {hasNested && <CaretRight className={styles.arrow} width={13} height={13} />}
        </div>
      )}
    </Touchable>
  )
}

export default DropdownOption
