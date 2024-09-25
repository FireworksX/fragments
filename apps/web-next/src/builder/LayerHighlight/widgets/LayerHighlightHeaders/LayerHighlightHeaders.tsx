import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useLayerHighlightHeaders } from '@/builder/LayerHighlight/widgets/LayerHighlightHeaders/hooks/useLayerHighlightHeaders'
import { animated } from '@react-spring/web'
import BreakpointTitle from '@/builder/LayerHighlight/widgets/LayerHighlightHeaders/components/BreakpointTitle/BreakpointTitle'

interface LayerHighlightHeadersProps {
  className?: string
}

export const LayerHighlightHeaders: FC<LayerHighlightHeadersProps> = ({ className }) => {
  const { breakpoints, activeWidths, handleNewBreakpoint, handleCustomBreakpoint } = useLayerHighlightHeaders()

  return (
    <div className={cn(styles.root, className)} data-testid='LayerHighlightHeaders'>
      {breakpoints.map(({ style, breakpoint }, index) => (
        <animated.div key={index} className={cn(styles.header, styles.breakpointHeader)} style={style}>
          <BreakpointTitle
            name={breakpoint?.name || breakpoint?._id}
            width={breakpoint?.width}
            activeWidths={activeWidths}
            onClickBreakpoint={handleNewBreakpoint}
            onClickCustom={handleCustomBreakpoint}
          />
        </animated.div>
      ))}
    </div>
  )
}
