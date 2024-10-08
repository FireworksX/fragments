import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import { TippyProps } from '@tippyjs/react'
import styles from './styles.module.css'
import './styles.css'
import Popover, { Instance, PopoverProps } from '../Popover/Popover'

export interface DropdownProps extends PropsWithChildren {
  options?: ReactNode | ReactNode[]
  className?: string
  disabled?: boolean
  trigger?: PopoverProps['trigger']
  appendTo?: PopoverProps['appendTo']
  placement?: TippyProps['placement']
  hideOnClick?: TippyProps['hideOnClick']
  arrow?: TippyProps['arrow']
  onCreate?: (instance: Instance) => void
}

const Dropdown: FC<DropdownProps> = ({
  className,
  children,
  placement,
  trigger,
  appendTo,
  hideOnClick,
  disabled,
  options,
  arrow,
  onCreate
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
      content={<div>{options}</div>}
      hideOnClick={hideOnClick}
      onCreate={onCreate}
    >
      {children}
    </Popover>
  )
}

export default Dropdown
