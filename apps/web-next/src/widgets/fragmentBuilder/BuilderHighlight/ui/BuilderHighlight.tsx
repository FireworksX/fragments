import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import { animated } from '@react-spring/web'
import styles from './styles.module.css'
import { useBuilderHighlight } from '../hooks/useBuilderHighlight'
import { useBreakpoints } from '@/shared/hooks/fragmentBuilder/useBreakpoints'
import { LayerHighlightNode } from '@/features/fragmentBuilder/LayerHighlightNode'
import { LayerSelectedResize } from '@/features/fragmentBuilder/LayerSelectedResize'

interface BuilderLayerHighlightProps extends PropsWithChildren {
  className?: string
}

const BuilderHighlight: FC<BuilderLayerHighlightProps> = ({ className, children }) => {
  const { breakpointKeys } = useBreakpoints()
  const { opacity } = useBuilderHighlight()

  return (
    <animated.div className={cn(className, styles.root)} style={{ opacity }}>
      {children}
      {breakpointKeys.map(breakpointKey => (
        <LayerHighlightNode key={breakpointKey} layerKey={breakpointKey} resizeNode={<LayerSelectedResize />} />
      ))}
    </animated.div>
  )
}

export default BuilderHighlight
