import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { animated } from '@react-spring/web'
import { HeaderBreakpoint } from '@/features/fragmentBuilder/HeaderBreakpoint'
import { useBuilderHighlightHeaders } from '../hooks/useBuilderHighlightHeaders'

interface BuilderHighlightHeadersProps {
  className?: string
}

export const BuilderHighlightHeaders: FC<BuilderHighlightHeadersProps> = ({ className }) => {
  const { breakpoints, activeWidths, handleNewBreakpoint, handleCustomBreakpoint } = useBuilderHighlightHeaders()

  return (
    <div className={cn(styles.root, className)} data-testid='LayerHighlightHeaders'>
      {breakpoints.map(({ style, breakpoint }, index) => (
        <animated.div key={index} className={cn(styles.header, styles.breakpointHeader)} style={style}>
          <HeaderBreakpoint
            name={breakpoint?.name || breakpoint?._id}
            width={style?.width}
            activeWidths={activeWidths}
            onClickBreakpoint={handleNewBreakpoint}
            onClickCustom={handleCustomBreakpoint}
          />
        </animated.div>
      ))}
    </div>
  )
}
