import { FC } from 'react'
import Popover, { PopoverProps } from 'src/components/Popover/Popover'

interface TooltipProps extends PopoverProps {
  className?: string
}

const Tooltip: FC<TooltipProps> = ({ className, children, ...restProps }) => {
  return (
    <Popover {...restProps}>
      <div className={className}>{children}</div>
    </Popover>
  )
}

export default Tooltip
