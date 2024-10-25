import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { toPx } from '@/shared/utils/toPx'

interface ContainerProps extends PropsWithChildren {
  mode?: 'hug'
  withVertical?: boolean
  gutterSize?: 'default' | 'medium' | number
  className?: string
}

export const Container: FC<ContainerProps> = ({
  className,
  children,
  gutterSize = 'default',
  mode = 'default',
  withVertical
}) => {
  const gutter =
    typeof gutterSize === 'number'
      ? toPx(gutterSize)
      : { default: 'var(--gutter-default)', medium: 'var(--gutter-medium)' }[gutterSize]

  return (
    <div
      className={cn(styles.root, className, styles[mode], {
        [styles.withVertical]: withVertical
      })}
      style={{
        '--gutter-size': gutter
      }}
      data-testid='Container'
    >
      {children}
    </div>
  )
}
