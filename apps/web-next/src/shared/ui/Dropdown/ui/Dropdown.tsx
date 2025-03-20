import { FC, PropsWithChildren, ReactNode } from 'react'
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
  isLoading,
  placement,
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
        <div className={styles.options}>
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <Spinner size={14} color='var(--text-color-accent)' />
            </div>
          ) : (
            options
          )}
        </div>
      }
      hideOnClick={hideOnClick}
      stopPropagation={stopPropagation}
      onCreate={onCreate}
      onShown={onShow}
      onHide={onHide}
    >
      {children}
    </Popover>
  )
}

export default Dropdown
