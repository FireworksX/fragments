import { ComponentRef, FC, PropsWithChildren, ReactNode, useRef, useState } from 'react'
import cn from 'classnames'
import { TippyProps } from '@tippyjs/react'
import styles from './styles.module.css'
import './styles.css'
import Popover, { Instance, PopoverProps } from '../../Popover/ui/Popover'
import { Spinner } from '@/shared/ui/Spinner'

export interface DropdownProps extends PopoverProps {
  options?: ReactNode | ReactNode[]
  isLoading?: boolean
  className?: string
  pause?: boolean
  header?: ReactNode
  width?: number | 'contentSize'
}

const Dropdown: FC<DropdownProps> = ({
  className,
  children,
  header,
  isLoading,
  pause = false,
  width,
  options,
  onCreate,
  ...restProps
}) => {
  const [optionsWidth, setOptionsWidth] = useState(typeof width === 'number' ? width : undefined)

  const onCreateProxy = (instance: Instance) => {
    if (width === 'contentSize' && instance.reference) {
      setOptionsWidth(instance.reference?.getBoundingClientRect()?.width)
    }

    onCreate?.(instance)
  }

  const Content = (
    <div className={cn(styles.root, className)}>
      <div className={styles.content}>
        {header && !isLoading && <div className={styles.header}>{header}</div>}
        <div className={styles.options} style={{ width: optionsWidth }}>
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <Spinner size={14} color='var(--text-color-accent)' />
            </div>
          ) : (
            options
          )}
        </div>
      </div>
    </div>
  )

  if (pause) {
    return Content
  }

  return (
    <Popover interactive {...restProps} content={Content} onCreate={onCreateProxy}>
      {children}
    </Popover>
  )
}

export default Dropdown
