import React, { FC, ReactNode, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Frame } from '@/widgets/renderer/Frame/Frame'
import { useBreakpoints } from '@/shared/hooks/fragmentBuilder/useBreakpoints'

interface BuilderDisplayBreakpointsProps {
  className?: string
}

const DisplayBreakpoints: FC<BuilderDisplayBreakpointsProps> = ({ className }) => {
  const { breakpointValues } = useBreakpoints()

  return (
    <div className={cn(styles.root, className)}>
      {breakpointValues.map(breakpoint => (
        <Frame {...breakpoint} />
      ))}
    </div>
  )
}

export default DisplayBreakpoints
