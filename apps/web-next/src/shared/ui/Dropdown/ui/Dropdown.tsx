import { ComponentRef, FC, PropsWithChildren, ReactNode, useRef, useState } from 'react'
import cn from 'classnames'
import { TippyProps } from '@tippyjs/react'
import styles from './styles.module.css'
import './styles.css'
import Popover, { Instance, PopoverProps } from '../../Popover/ui/Popover'
import { Spinner } from '@/shared/ui/Spinner'

export interface DropdownProps extends PropsWithChildren {
  options?: ReactNode | ReactNode[]
  isLoading?: boolean
  className?: string
  disabled?: boolean
  header?: ReactNode
  width?: number | 'contentSize'
  trigger?: PopoverProps['trigger']
  appendTo?: PopoverProps['appendTo']
  placement?: TippyProps['placement']
  hideOnClick?: TippyProps['hideOnClick']
  arrow?: TippyProps['arrow']
  onCreate?: (instance: Instance) => void
  onShow?: (instance: Instance) => void
  onHide?: (instance: Instance) => void
  stopPropagation?: PopoverProps['stopPropagation']
}

const Dropdown: FC<DropdownProps> = ({
  className,
  children,
  header,
  isLoading,
  placement,
  width,
  trigger,
  appendTo,
  hideOnClick,
  disabled,
  options,
  arrow,
  stopPropagation,
  onCreate,
  onShow,
  onHide
}) => {
  const [optionsWidth, setOptionsWidth] = useState(typeof width === 'number' ? width : undefined)

  const onCreateProxy = (instance: Instance) => {
    if (width === 'contentSize' && instance.reference) {
      setOptionsWidth(instance.reference?.getBoundingClientRect()?.width)
    }

    onCreate?.(instance)
  }

  return (
    <Popover
      className={cn(styles.root, className)}
      disabled={disabled}
      trigger={trigger}
      interactive
      placement={placement}
      appendTo={appendTo}
      arrow={arrow}
      content={
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
      }
      hideOnClick={hideOnClick}
      stopPropagation={stopPropagation}
      onCreate={onCreateProxy}
      onShown={onShow}
      onHide={onHide}
    >
      {children}
    </Popover>
  )
}

export default Dropdown
