import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Touchable, { TouchableProps } from '@/app/components/Touchable'
import CaretRight from '@/app/svg/caret-right.svg'
import { animated } from '@react-spring/web'

export interface DropdownOptionProps extends PropsWithChildren, TouchableProps {
  size?: 'large' | 'medium'
  description?: string
  indicator?: string | number
  className?: string
  disabled?: boolean
  fetching?: boolean
  hasNested?: boolean
  suffix?: ReactNode
  onClick?: () => void
}

const DropdownOption: FC<DropdownOptionProps> = animated(
  ({
    className,
    size = 'medium',
    indicator,
    disabled,
    hasNested,
    children,
    fetching,
    description,
    suffix,
    ...touchableProps
  }) => {
    return (
      <Touchable
        TagName='button'
        disabled={disabled}
        className={cn(styles.root, className, styles[size], {
          [styles.disabled]: disabled
        })}
        {...touchableProps}
      >
        <div className={styles.body}>
          {children} <div className={styles.description}>{indicator}</div>
        </div>
        {description && <div className={styles.description}>{description}</div>}

        {(suffix || hasNested || fetching) && (
          <div>
            {fetching && <div></div>}
            {suffix && <div>{suffix}</div>}
            {hasNested && <CaretRight className={styles.arrow} width={13} height={13} />}
          </div>
        )}
      </Touchable>
    )
  }
)

export default DropdownOption
