import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import { animated } from '@react-spring/web'
import styles from './styles.module.css'
import { useBuilderHighlight } from '../hooks/useBuilderHighlight'
import { useBreakpoints } from '@/shared/hooks/fragmentBuilder/useBreakpoints'
import { LayerHighlightNode } from '@/features/fragmentBuilder/LayerHighlightNode'
import { LayerSelectedResize } from '@/features/fragmentBuilder/LayerSelectedResize'
import { HeaderBreakpoint } from '@/features/fragmentBuilder/HeaderBreakpoint'
import { nodes } from '@fragments/plugin-state'

interface BuilderLayerHighlightProps extends PropsWithChildren {
  className?: string
}

const BuilderHighlight: FC<BuilderLayerHighlightProps> = ({ className, children }) => {
  const { breakpointKeys, breakpointValues } = useBreakpoints()
  const { opacity } = useBuilderHighlight()

  return (
    <animated.div className={cn(className, styles.root)} style={{ opacity }}>
      {breakpointKeys.map(breakpointKey => (
        <LayerHighlightNode
          key={breakpointKey}
          layerKey={breakpointKey}
          resizeNode={<LayerSelectedResize />}
          renderChildren={layerNode =>
            layerNode?._type === nodes.Breakpoint && (
              <HeaderBreakpoint className={styles.breakpointWrapper} layerKey={breakpointKey} />
            )
          }
        />
      ))}
    </animated.div>
  )
}

export default BuilderHighlight
